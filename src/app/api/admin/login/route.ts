import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getJwtSecret } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Rate limit by IP + email
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const limiter = rateLimit(`login:${ip}:${email}`, 5, 15 * 60 * 1000);
    if (!limiter.allowed) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    let supabase;
    try {
      supabase = createServerClient();
    } catch {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('id, email, password_hash')
      .eq('email', email)
      .single();

    if (error || !admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Only allow bcrypt-hashed passwords — no plaintext fallback
    if (!admin.password_hash) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await compare(password, admin.password_hash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const jwtSecret = getJwtSecret();
    const token = sign(
      { email: admin.email, id: admin.id },
      jwtSecret,
      { expiresIn: '24h' }
    );

    const response = NextResponse.json({
      success: true,
      user: { email: admin.email, id: admin.id },
    });

    // Set httpOnly cookie — not accessible via JavaScript
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
