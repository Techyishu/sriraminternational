import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verify } from 'jsonwebtoken';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ page: string; section: string }> }
) {
  try {
    const { page, section } = await params;
    const body = await request.json();
    
    // Authentication check
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    try {
      const { verify } = await import('jsonwebtoken');
      verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('page_content')
      .upsert({
        page_slug: page,
        section: section,
        content: body.content,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'page_slug,section'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

