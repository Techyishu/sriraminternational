import { NextRequest, NextResponse } from 'next/server';
import { supabase, createServerClient } from '@/lib/supabase';
import { verifyAuth, handleApiError } from '@/lib/auth';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('music_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Music fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    return NextResponse.json({
      enabled: data?.enabled ?? false,
      music_url: data?.music_url ?? '',
      image_url: data?.image_url ?? '',
      volume: data?.volume ?? 0.5,
      loop: data?.loop ?? true,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    verifyAuth(request);
    const body = await request.json();
    const supabaseAdmin = createServerClient();

    const { data: existing } = await supabaseAdmin
      .from('music_settings')
      .select('id')
      .limit(1)
      .single();

    const payload = {
      enabled: body.enabled,
      music_url: body.music_url || '',
      image_url: body.image_url || '',
      volume: body.volume ?? 0.5,
      loop: body.loop ?? true,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (existing) {
      const { data, error } = await supabaseAdmin
        .from('music_settings')
        .update(payload)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) {
        console.error('Music update error:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
      }
      result = data;
    } else {
      const { data, error } = await supabaseAdmin
        .from('music_settings')
        .insert(payload)
        .select()
        .single();
      if (error) {
        console.error('Music insert error:', error);
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
      }
      result = data;
    }

    return NextResponse.json({ success: true, settings: result });
  } catch (error) {
    return handleApiError(error);
  }
}
