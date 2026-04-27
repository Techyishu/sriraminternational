import { NextRequest, NextResponse } from 'next/server';
import { supabase, createServerClient } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('slc_records')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ records: data || [] });
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

    try {
      const { verify } = await import('jsonwebtoken');
      verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const serverSupabase = createServerClient();

    const { data, error } = await serverSupabase
      .from('slc_records')
      .insert({
        student_name: body.student_name,
        father_name: body.father_name || null,
        class: body.class || null,
        section: body.section || null,
        admission_no: body.admission_no || null,
        slc_no: body.slc_no || null,
        date_of_issue: body.date_of_issue || null,
        reason: body.reason || null,
        academic_year: body.academic_year || null,
        remarks: body.remarks || null,
        display_order: body.display_order || 0,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, record: data });
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

    try {
      const { verify } = await import('jsonwebtoken');
      verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const serverSupabase = createServerClient();

    const { error } = await serverSupabase
      .from('slc_records')
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
