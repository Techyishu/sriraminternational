import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, handleApiError } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request);
    return NextResponse.json({ authenticated: true, user: { email: user.email } });
  } catch (error) {
    return handleApiError(error);
  }
}
