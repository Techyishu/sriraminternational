import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { verify } = await import('jsonwebtoken');
    verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

    const supabaseAdmin = createServerClient();

    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ submissions: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { verify } = await import('jsonwebtoken');
    verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

    const body = await request.json();
    const supabaseAdmin = createServerClient();

    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .update({ read: body.read })
      .eq('id', body.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, submission: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

