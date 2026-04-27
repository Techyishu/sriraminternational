import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyAuth, handleApiError } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ page: string; section: string }> }
) {
  try {
    verifyAuth(request);
    const { page, section } = await params;
    const body = await request.json();

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('page_content')
      .upsert(
        {
          page_slug: page,
          section: section,
          content: body.content,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'page_slug,section' }
      )
      .select()
      .single();

    if (error) {
      console.error('Content update error:', error);
      return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return handleApiError(error);
  }
}
