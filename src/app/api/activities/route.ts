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
      .from('activities')
      .select('*')
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Activities fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
    }
    return NextResponse.json({ activities: data || [] });
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
      .from('activities')
      .insert({
        title: sanitize(body.title),
        description: sanitize(body.description) || '',
        icon: sanitize(body.icon) || '',
        image_url: sanitize(body.image_url) || '',
        display_order: typeof body.display_order === 'number' ? body.display_order : 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Activities insert error:', error);
      return NextResponse.json({ error: 'Failed to add activity' }, { status: 500 });
    }
    return NextResponse.json({ success: true, activity: data });
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
    const { error } = await supabaseAdmin.from('activities').delete().eq('id', id);

    if (error) {
      console.error('Activities delete error:', error);
      return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
