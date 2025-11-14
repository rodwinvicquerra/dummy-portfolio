import type { NextRequest } from "next/server";
import { NextResponse } from 'next/server';
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { contactFormSchema, containsXss, containsSqlInjection } from '@/lib/security';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - 5 requests per 10 minutes
    const rateLimitResult = await rateLimit(req, 'contact');
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { message: `Too many requests. Please try again in ${rateLimitResult.reset} seconds.` },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult)
        }
      );
    }

    const body = await req.json();

    // Honeypot check (should be done before validation)
    if (typeof body.website === "string" && body.website.trim().length > 0) {
      // Bot detected - pretend success
      return NextResponse.json(
        { ok: true },
        { 
          status: 200,
          headers: getRateLimitHeaders(rateLimitResult)
        }
      );
    }

    // Validate and sanitize input
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => e.message).join(', ');
      return NextResponse.json(
        { message: `Validation failed: ${errors}` },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Additional security checks
    const userInputs = [name, email, message];
    for (const input of userInputs) {
      if (containsXss(input)) {
        return NextResponse.json(
          { message: 'Input contains potentially harmful content.' },
          { status: 400 }
        );
      }
      
      if (containsSqlInjection(input)) {
        return NextResponse.json(
          { message: 'Input contains suspicious patterns.' },
          { status: 400 }
        );
      }
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { message: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // In a real system, send email or store in DB here.
    console.log("Contact submission (sanitized):", { 
      name, 
      email, 
      messagePreview: message.substring(0, 50) + '...',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { ok: true },
      { 
        status: 200,
        headers: getRateLimitHeaders(rateLimitResult)
      }
    );
  } catch (e) {
    console.error('Contact API error:', e);
    return NextResponse.json(
      { message: "Unexpected error. Please try again later." },
      { status: 500 }
    );
  }
}


