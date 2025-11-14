import { NextResponse } from 'next/server';
import { portfolioContext } from '@/lib/portfolio-context';
import Groq from 'groq-sdk';

// Simple rate limiting (in-memory for demo - use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 10) {
    // 10 messages per minute
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    // Get IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait a minute.' },
        { status: 429 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
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
    const groqApiKey = process.env.GROQ_API_KEY; // Reading from GROQ_API_KEY
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
          model: 'llama-3.1-8b-instant', // Updated model
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

        return NextResponse.json({
          message: assistantMessage,
        });
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
      response = await fetch('http://localhost:11434/api/chat', {
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

      return NextResponse.json({
        message: assistantMessage,
      });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
