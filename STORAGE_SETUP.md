# Supabase Storage Setup Guide

## Supported Image MIME Types

Supabase Storage supports the following image MIME types:
- `image/png`
- `image/jpeg`
- `image/jpg`
- `image/gif`
- `image/webp`
- `image/svg+xml`

## Setup Steps

### 1. Create Storage Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **New bucket**
4. Configure the bucket:
   - **Name**: `images`
   - **Public bucket**: ✅ Yes (so images can be accessed via public URLs)
   - **File size limit**: 5242880 (5MB in bytes)
   - **Allowed MIME types**: 
     ```
     image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml
     ```

### 2. Set Up Storage Policies

After creating the bucket, run the SQL from `supabase/migrations/004_create_storage_bucket.sql` in the Supabase SQL Editor to set up Row Level Security policies:

- **Public Access**: Anyone can read/view images
- **Admin Upload**: Only authenticated admins can upload
- **Admin Delete**: Only authenticated admins can delete

### 3. Verify Setup

1. The bucket should be visible in Storage
2. Try uploading a test image through the admin panel
3. Check that the image URL is generated correctly

## How It Works

1. **Upload Flow**:
   - Admin selects an image file in the admin panel
   - File is validated (type and size)
   - File is uploaded to Supabase Storage bucket `images`
   - Public URL is returned and saved to database

2. **File Organization**:
   - Images are organized in folders:
     - `gallery/` - Gallery images
     - `toppers/` - Topper photos
     - `staff/` - Staff photos
     - `activities/` - Activity images

3. **File Naming**:
   - Files are automatically renamed with timestamp and random string
   - Format: `{folder}/{timestamp}-{random}.{extension}`
   - Example: `gallery/1703123456789-abc123def456.jpg`

## API Endpoint

**POST `/api/upload`**
- **Auth**: Required (JWT token)
- **Body**: FormData with `file` and `folder`
- **Response**: `{ success: true, url: "...", path: "...", size: ..., type: "..." }`

## Features

- ✅ Direct file upload (no URL input needed)
- ✅ Image preview before saving
- ✅ File type validation
- ✅ File size validation (5MB max)
- ✅ Automatic file naming
- ✅ Organized folder structure
- ✅ Public URL generation
- ✅ Error handling

## Troubleshooting

### "Bucket not found" error
- Make sure the bucket is named exactly `images`
- Check that the bucket exists in Supabase Dashboard

### "Policy violation" error
- Run the storage policies SQL from migration 004
- Verify admin user exists and is authenticated

### "Invalid MIME type" error
- Check that the file is a supported image type
- Verify bucket MIME type restrictions match the allowed types

### Images not displaying
- Ensure bucket is set to **Public**
- Check that the public URL is correctly generated
- Verify the image URL in the database

