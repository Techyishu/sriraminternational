import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sanitize } from '@/lib/sanitize';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP — 10 submissions per 15 minutes
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const limiter = rateLimit(`contact:${ip}`, 10, 15 * 60 * 1000);
    if (!limiter.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const subject = sanitize(body.subject);
    const message = sanitize(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Honeypot check — if 'website' field is filled, it's likely a bot
    if (body.website) {
      // Silently accept to not tip off bots
      return NextResponse.json({ success: true });
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({ name, email, subject: subject || '', message })
      .select()
      .single();

    if (error) {
      console.error('Contact submit error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true, submission: data });
  } catch (error) {
    console.error('Contact submit error:', error);
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
