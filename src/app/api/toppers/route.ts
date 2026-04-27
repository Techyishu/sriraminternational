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
      .from('toppers')
      .select('*')
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Toppers fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch toppers' }, { status: 500 });
    }
    return NextResponse.json({ toppers: data || [] });
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
      .from('toppers')
      .insert({
        name: sanitize(body.name),
        class: sanitize(body.class) || '',
        percentage: sanitize(body.percentage) || '',
        year: sanitize(body.year) || '',
        achievement: sanitize(body.achievement) || '',
        image_url: sanitize(body.image_url) || '',
        display_order: typeof body.display_order === 'number' ? body.display_order : 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Toppers insert error:', error);
      return NextResponse.json({ error: 'Failed to add topper' }, { status: 500 });
    }
    return NextResponse.json({ success: true, topper: data });
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
    const { error } = await supabaseAdmin.from('toppers').delete().eq('id', id);

    if (error) {
      console.error('Toppers delete error:', error);
      return NextResponse.json({ error: 'Failed to delete topper' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
