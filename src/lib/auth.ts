import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export interface AuthPayload {
  email: string;
  id: string;
}

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required. Set it in .env.local');
  }
  return secret;
}

export function verifyAuth(request: NextRequest): AuthPayload {
  const cookieToken = request.cookies.get('admin_token')?.value;
  const authHeader = request.headers.get('authorization');
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = cookieToken || headerToken;

  if (!token) {
    throw new AuthError('Unauthorized');
  }

  try {
    return verify(token, getJwtSecret()) as AuthPayload;
  } catch {
    throw new AuthError('Invalid or expired token');
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  console.error('API Error:', error);
  return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
}
