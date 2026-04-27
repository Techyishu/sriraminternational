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
      .from('staff')
      .select('*')
      .order('display_order', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Staff fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch staff' }, { status: 500 });
    }
    return NextResponse.json({ staff: data || [] });
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
      .from('staff')
      .insert({
        name: sanitize(body.name),
        designation: sanitize(body.designation) || '',
        qualification: sanitize(body.qualification) || '',
        experience: sanitize(body.experience) || '',
        bio: sanitize(body.bio) || '',
        image_url: sanitize(body.image_url) || '',
        email: sanitize(body.email) || '',
        display_order: typeof body.display_order === 'number' ? body.display_order : 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Staff insert error:', error);
      return NextResponse.json({ error: 'Failed to add staff member' }, { status: 500 });
    }
    return NextResponse.json({ success: true, staff: data });
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
    const { error } = await supabaseAdmin.from('staff').delete().eq('id', id);

    if (error) {
      console.error('Staff delete error:', error);
      return NextResponse.json({ error: 'Failed to delete staff member' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
