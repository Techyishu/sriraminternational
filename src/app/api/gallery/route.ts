import { NextRequest, NextResponse } from 'next/server';
import { supabase, createServerClient } from '@/lib/supabase';
import { verifyAuth, handleApiError } from '@/lib/auth';
import { sanitize, isValidUUID } from '@/lib/sanitize';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500);
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Gallery fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
    return NextResponse.json({ images: data || [] });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    verifyAuth(request);
    const body = await request.json();
    const supabaseAdmin = createServerClient();

    const { data, error } = await supabaseAdmin
      .from('gallery_images')
      .insert({
        image_url: sanitize(body.image_url),
        alt_text: sanitize(body.alt_text) || '',
        display_order: typeof body.display_order === 'number' ? body.display_order : 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Gallery insert error:', error);
      return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
    }
    return NextResponse.json({ success: true, image: data });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    verifyAuth(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || !isValidUUID(id)) {
      return NextResponse.json({ error: 'Valid ID is required' }, { status: 400 });
    }

    const supabaseAdmin = createServerClient();
    const { error } = await supabaseAdmin.from('gallery_images').delete().eq('id', id);

    if (error) {
      console.error('Gallery delete error:', error);
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
