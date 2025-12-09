import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Supported image MIME types
const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/webp',
  'image/svg+xml'
];

// Supported audio MIME types
const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/ogg',
  'audio/wav',
  'audio/webm',
  'audio/m4a',
  'audio/aac'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB (increased for audio files)

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { verify } = await import('jsonwebtoken');
    verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'general';
    const fileType = formData.get('fileType') as string || 'image'; // 'image' or 'audio'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type based on fileType parameter
    const allowedTypes = fileType === 'audio' ? ALLOWED_AUDIO_TYPES : ALLOWED_IMAGE_TYPES;
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed ${fileType} types: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let supabaseAdmin;
    try {
      supabaseAdmin = createServerClient();
    } catch (error: any) {
      console.error('Supabase client error:', error);
      return NextResponse.json(
        { error: 'Storage configuration error. Please check your Supabase environment variables.' },
        { status: 500 }
      );
    }

    // Determine storage bucket based on file type
    const bucketName = fileType === 'audio' ? 'images' : 'images'; // Using same bucket for now, can be separated later
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: fileName,
      size: file.size,
      type: file.type
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}

