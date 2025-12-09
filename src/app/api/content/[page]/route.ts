import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_slug', page);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data into a more usable format
    const content: Record<string, any> = {};
    data?.forEach((item) => {
      content[item.section] = item.content;
    });

    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

