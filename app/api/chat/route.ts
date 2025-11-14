import { NextResponse } from 'next/server';
import { portfolioContext } from '@/lib/portfolio-context';
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { chatMessageSchema, containsXss, containsSqlInjection } from '@/lib/security';
import Groq from 'groq-sdk';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Rate limiting - 10 requests per minute
    const rateLimitResult = await rateLimit(req, 'chat');
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: `Rate limit exceeded. Please wait ${rateLimitResult.reset} seconds.` },
        { 
          status: 429,
          headers: getRateLimitHeaders(rateLimitResult)
        }
      );
    }

    const body = await req.json();

    // Validate and sanitize input
    const validationResult = chatMessageSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request format. Please check your message.' },
        { status: 400 }
      );
    }

    const { messages } = validationResult.data;

    // Additional security checks
    for (const msg of messages) {
      if (containsXss(msg.content)) {
        return NextResponse.json(
          { error: 'Message contains potentially harmful content.' },
          { status: 400 }
        );
      }
      
      if (containsSqlInjection(msg.content)) {
        return NextResponse.json(
          { error: 'Message contains suspicious patterns.' },
          { status: 400 }
        );
      }
    }

    // Prepare messages with system context
    const chatMessages = [
      {
        role: 'system',
        content: portfolioContext,
      },
      ...messages,
    ];

    // Check if we're on Vercel (production) or localhost  
    const groqApiKey = process.env.GROQ_API_KEY;
    const isVercel = process.env.VERCEL === '1';
    const useGroq = isVercel && groqApiKey;

    if (useGroq) {
      // Use Groq for Vercel deployment (FREE!)
      console.log('Using Groq API on Vercel');
      
      try {
        const groq = new Groq({
          apiKey: groqApiKey,
        });

        console.log('Groq client created, calling API...');
        
        const completion = await groq.chat.completions.create({
          model: 'llama-3.1-8b-instant',
          messages: chatMessages as any,
          temperature: 0.7,
          max_tokens: 300,
        });

        console.log('Groq API response received');
        const assistantMessage = completion.choices[0]?.message?.content;

        if (!assistantMessage) {
          console.error('No message in response:', completion);
          return NextResponse.json(
            { error: 'No response from AI' },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { message: assistantMessage },
          { headers: getRateLimitHeaders(rateLimitResult) }
        );
      } catch (error: any) {
        console.error('Groq error:', error);
        return NextResponse.json(
          { error: `AI Error: ${error?.message || 'Unknown error'}` },
          { status: 500 }
        );
      }
    } else {
      // Use Ollama for local development
      console.log('Using Ollama for localhost');
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.2',
          messages: chatMessages,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 500,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Ollama API error:', errorData);
        return NextResponse.json(
          { 
            error: 'Ollama is not running. Please start Ollama or deploy to Vercel with Groq API key.' 
          },
          { status: response.status }
        );
      }

      const data = await response.json();
      const assistantMessage = data.message?.content;

      if (!assistantMessage) {
        return NextResponse.json(
          { error: 'No response from AI' },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: assistantMessage },
        { headers: getRateLimitHeaders(rateLimitResult) }
      );
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
