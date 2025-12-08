import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = createServerClient();
    } catch (clientError: any) {
      console.error('Supabase client error:', clientError);
      return NextResponse.json(
        { error: 'Database configuration error. Please check your Supabase environment variables.' },
        { status: 500 }
      );
    }
    
    try {
      // Get admin user
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !admin) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Verify password
      let isValid = false;
      
      if (admin.password_hash) {
        isValid = await compare(password, admin.password_hash);
      } else {
        // Fallback: check against environment variable for initial setup
        isValid = password === process.env.ADMIN_PASSWORD;
      }

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
      if (jwtSecret === 'your-secret-key-change-in-production') {
        console.warn('⚠️ Using default JWT_SECRET. Please set a secure JWT_SECRET in production.');
      }

      const token = sign(
        { email: admin.email, id: admin.id },
        jwtSecret,
        { expiresIn: '7d' }
      );

      return NextResponse.json({ 
        success: true, 
        token,
        user: { email: admin.email, id: admin.id }
      });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database connection error. Please check your Supabase configuration.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
