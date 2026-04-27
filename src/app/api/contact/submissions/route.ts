import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyAuth, handleApiError } from '@/lib/auth';
import { isValidUUID } from '@/lib/sanitize';

export async function GET(request: NextRequest) {
  try {
    verifyAuth(request);
    const supabaseAdmin = createServerClient();

    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      console.error('Submissions fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
    }
    return NextResponse.json({ submissions: data || [] });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    verifyAuth(request);
    const body = await request.json();

    if (!body.id || !isValidUUID(body.id)) {
      return NextResponse.json({ error: 'Valid ID is required' }, { status: 400 });
    }

    const supabaseAdmin = createServerClient();

    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .update({ read: body.read })
      .eq('id', body.id)
      .select()
      .single();

    if (error) {
      console.error('Submissions update error:', error);
      return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
    }
    return NextResponse.json({ success: true, submission: data });
  } catch (error) {
    return handleApiError(error);
  }
}
