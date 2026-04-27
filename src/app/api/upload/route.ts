import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { verifyAuth, handleApiError } from '@/lib/auth';
import { sanitizeFilename } from '@/lib/sanitize';

// SVG removed — it can contain embedded scripts (XSS vector)
const ALLOWED_IMAGE_TYPES = [
  'image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp',
];

const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/wav', 'audio/webm', 'audio/m4a', 'audio/aac',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Allowed folder names — prevent path traversal
const ALLOWED_FOLDERS = ['gallery', 'toppers', 'staff', 'activities', 'music', 'general'];

export async function POST(request: NextRequest) {
  try {
    verifyAuth(request);

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'general';
    const fileType = formData.get('fileType') as string || 'image';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate folder name against whitelist
    if (!ALLOWED_FOLDERS.includes(folder)) {
      return NextResponse.json({ error: 'Invalid upload folder' }, { status: 400 });
    }

    const allowedTypes = fileType === 'audio' ? ALLOWED_AUDIO_TYPES : ALLOWED_IMAGE_TYPES;
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    // Safe filename — use sanitized extension only
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const safeExt = sanitizeFilename(file.name);
    const fileName = `${folder}/${timestamp}-${randomString}.${safeExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let supabaseAdmin;
    try {
      supabaseAdmin = createServerClient();
    } catch {
      return NextResponse.json({ error: 'Storage configuration error' }, { status: 500 });
    }

    const { error: uploadError } = await supabaseAdmin.storage
      .from('images')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage.from('images').getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: fileName,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
