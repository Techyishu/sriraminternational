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
      .from('slc_records')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('SLC fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
    }
    return NextResponse.json({ records: data || [] });
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
      .from('slc_records')
      .insert({
        student_name: sanitize(body.student_name),
        father_name: sanitize(body.father_name) || null,
        class: sanitize(body.class) || null,
        section: sanitize(body.section) || null,
        admission_no: sanitize(body.admission_no) || null,
        slc_no: sanitize(body.slc_no) || null,
        date_of_issue: sanitize(body.date_of_issue) || null,
        reason: sanitize(body.reason) || null,
        academic_year: sanitize(body.academic_year) || null,
        remarks: sanitize(body.remarks) || null,
        display_order: typeof body.display_order === 'number' ? body.display_order : 0,
      })
      .select()
      .single();

    if (error) {
      console.error('SLC insert error:', error);
      return NextResponse.json({ error: 'Failed to add record' }, { status: 500 });
    }
    return NextResponse.json({ success: true, record: data });
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
    const { error } = await serverSupabase.from('slc_records').delete().eq('id', id);

    if (error) {
      console.error('SLC delete error:', error);
      return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error);
  }
}
