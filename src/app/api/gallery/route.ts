import { NextRequest, NextResponse } from 'next/server';
import { supabase, createServerClient } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ images: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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
      .from('gallery_images')
      .insert({
        image_url: body.image_url,
        alt_text: body.alt_text || '',
        display_order: body.display_order || 0
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, image: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { verify } = await import('jsonwebtoken');
    verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const supabaseAdmin = createServerClient();

    const { error } = await supabaseAdmin
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

