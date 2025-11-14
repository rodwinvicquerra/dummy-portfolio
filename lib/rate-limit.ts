import { RateLimiterMemory } from 'rate-limiter-flexible';
import type { NextRequest } from 'next/server';

/**
 * Get client IP address from request headers
 */
export function getClientIp(req: NextRequest | Request): string {
  if (req instanceof NextRequest) {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    return forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
  }
  
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  return forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
}

/**
 * Rate limiter configurations for different endpoints
 */
const rateLimiters = {
  // Chat API: 10 requests per minute
  chat: new RateLimiterMemory({
    points: 10, // Number of requests
    duration: 60, // Per 60 seconds
  }),
  
  // Contact form: 5 requests per 10 minutes
  contact: new RateLimiterMemory({
    points: 5,
    duration: 600, // 10 minutes
  }),
  
  // Admin API: 30 requests per minute
  admin: new RateLimiterMemory({
    points: 30,
    duration: 60,
  }),
  
  // General API: 60 requests per minute
  general: new RateLimiterMemory({
    points: 60,
    duration: 60,
  }),
};

/**
 * Rate limit middleware for API routes
 */
export async function rateLimit(
  req: NextRequest | Request,
  type: keyof typeof rateLimiters = 'general'
): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  const ip = getClientIp(req);
  const limiter = rateLimiters[type];
  
  try {
    const result = await limiter.consume(ip);
    
    return {
      success: true,
      limit: limiter.points,
      remaining: result.remainingPoints,
      reset: Math.ceil(result.msBeforeNext / 1000),
    };
  } catch (error: any) {
    // Rate limit exceeded
    return {
      success: false,
      limit: limiter.points,
      remaining: 0,
      reset: Math.ceil(error.msBeforeNext / 1000),
    };
  }
}

/**
 * Create rate limit headers for response
 */
export function getRateLimitHeaders(result: {
  limit?: number;
  remaining?: number;
  reset?: number;
}): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit || 0),
    'X-RateLimit-Remaining': String(result.remaining || 0),
    'X-RateLimit-Reset': String(result.reset || 0),
  };
}

/**
 * Simple in-memory rate limiter (fallback for edge cases)
 */
class SimpleRateLimiter {
  private requests = new Map<string, number[]>();
  
  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}
  
  check(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    // Cleanup old entries periodically
    if (this.requests.size > 10000) {
      this.cleanup();
    }
    
    return true;
  }
  
  private cleanup() {
    const now = Date.now();
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(time => now - time < this.windowMs);
      if (validRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, validRequests);
      }
    }
  }
}

// Simple rate limiters as backup
export const simpleRateLimiters = {
  chat: new SimpleRateLimiter(10, 60000), // 10 per minute
  contact: new SimpleRateLimiter(5, 600000), // 5 per 10 minutes
  admin: new SimpleRateLimiter(30, 60000), // 30 per minute
  general: new SimpleRateLimiter(60, 60000), // 60 per minute
};
