import { NextRequest, NextResponse } from 'next/server';
import { supabase, createServerClient } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('music_settings')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return default settings if no record exists
    return NextResponse.json({
      enabled: data?.enabled ?? false,
      music_url: data?.music_url ?? '',
      volume: data?.volume ?? 0.5,
      loop: data?.loop ?? true
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { verify } = await import('jsonwebtoken');
    verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

    const body = await request.json();
    const supabaseAdmin = createServerClient();

    // Check if settings exist
    const { data: existing } = await supabaseAdmin
      .from('music_settings')
      .select('id')
      .limit(1)
      .single();

    let result;
    if (existing) {
      // Update existing
      const { data, error } = await supabaseAdmin
        .from('music_settings')
        .update({
          enabled: body.enabled,
          music_url: body.music_url || '',
          volume: body.volume ?? 0.5,
          loop: body.loop ?? true,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data;
    } else {
      // Insert new
      const { data, error } = await supabaseAdmin
        .from('music_settings')
        .insert({
          enabled: body.enabled,
          music_url: body.music_url || '',
          volume: body.volume ?? 0.5,
          loop: body.loop ?? true
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data;
    }

    return NextResponse.json({ success: true, settings: result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

