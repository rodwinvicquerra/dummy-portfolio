import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

/**
 * Sanitize HTML input to prevent XSS attacks
 * Removes all potentially dangerous HTML tags and attributes
 */
export function sanitizeHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // Remove all HTML tags
    ALLOWED_ATTR: [], // Remove all attributes
    KEEP_CONTENT: true, // Keep text content
  });
}

/**
 * Sanitize user input for text fields
 * Removes HTML but preserves newlines and basic formatting
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  
  // First sanitize HTML
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
  
  // Trim and limit length
  return cleaned.trim().substring(0, 10000); // Max 10k chars
}

/**
 * Sanitize email to prevent injection
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';
  
  // Remove any HTML first
  const cleaned = sanitizeText(email);
  
  // Basic email validation and sanitization
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleaned) ? cleaned.toLowerCase() : '';
}

/**
 * Validate and sanitize chat message
 */
export const chatMessageSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().min(1).max(5000).transform(sanitizeText),
    })
  ).min(1).max(50), // Limit conversation history
});

/**
 * Validate and sanitize contact form
 */
export const contactFormSchema = z.object({
  name: z.string().min(1).max(100).transform(sanitizeText),
  email: z.string().email().transform(sanitizeEmail),
  message: z.string().min(10).max(5000).transform(sanitizeText),
  website: z.string().optional(), // Honeypot field
});

/**
 * Environment variables validation
 */
export const envSchema = z.object({
  // Clerk Auth
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  
  // Groq API (optional - only for Vercel)
  GROQ_API_KEY: z.string().optional(),
  
  // Database (optional)
  POSTGRES_URL: z.string().optional(),
  
  // Vercel
  VERCEL: z.string().optional(),
  NEXT_PUBLIC_VERCEL_URL: z.string().optional(),
});

/**
 * Validate environment variables on startup
 */
export function validateEnv() {
  try {
    envSchema.parse(process.env);
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      
      // Only throw in production to prevent deployment with missing vars
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Missing required environment variables');
      }
    }
  }
}

/**
 * Sanitize object keys and values recursively
 */
export function sanitizeObject(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return typeof obj === 'string' ? sanitizeText(obj) : obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const cleanKey = sanitizeText(key);
    sanitized[cleanKey] = sanitizeObject(value);
  }
  
  return sanitized;
}

/**
 * Check if string contains potential SQL injection patterns
 */
export function containsSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
    /(--|\#|\/\*|\*\/)/g, // SQL comments
    /('|";|";--|' OR '1'='1)/gi, // Common injection patterns
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Check if string contains potential XSS patterns
 */
export function containsXss(input: string): boolean {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // Event handlers
    /<iframe/gi,
    /eval\(/gi,
  ];
  
  return xssPatterns.some(pattern => pattern.test(input));
}
