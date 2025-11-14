import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/neon';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const users = await getAllUsers();

    return NextResponse.json({
      users,
      count: users.length
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
