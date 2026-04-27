import { NextRequest, NextResponse } from 'next/server';
import { supabase, createServerClient } from '@/lib/supabase';
import { verifyAuth, handleApiError } from '@/lib/auth';
import { sanitize, isValidUUID } from '@/lib/sanitize';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '200'), 500);
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error } = await supabase
      .from('mandatory_disclosures')
      .select('*')
      .order('category', { ascending: true })
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Disclosures fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch disclosures' }, { status: 500 });
    }
    return NextResponse.json({ disclosures: data || [] });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    verifyAuth(request);
    const body = await request.json();
    const serverSupabase = createServerClient();

    const { data, error } = await serverSupabase
      .from('mandatory_disclosures')
      .insert({
        category: sanitize(body.category),
        title: sanitize(body.title),
        value: sanitize(body.value),
        display_order: typeof body.display_order === 'number' ? body.display_order : 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Disclosures insert error:', error);
      return NextResponse.json({ error: 'Failed to add disclosure' }, { status: 500 });
    }
    return NextResponse.json({ success: true, disclosure: data });
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

    const serverSupabase = createServerClient();
    const { error } = await serverSupabase.from('mandatory_disclosures').delete().eq('id', id);

    if (error) {
      console.error('Disclosures delete error:', error);
      return NextResponse.json({ error: 'Failed to delete disclosure' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
