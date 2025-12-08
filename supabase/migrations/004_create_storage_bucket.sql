-- Create storage bucket for images
-- Note: This needs to be run in Supabase Dashboard > Storage
-- Or via Supabase CLI/MCP

-- Storage bucket policies (run after creating bucket manually)
-- Bucket name: 'images'

-- Policy: Anyone can read images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Policy: Only authenticated admins can upload
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

-- Policy: Only authenticated admins can delete
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.jwt() ->> 'email'
  )
);

-- Note: To create the bucket, use Supabase Dashboard:
-- 1. Go to Storage
-- 2. Create new bucket named 'images'
-- 3. Set it to Public
-- 4. Set allowed MIME types: image/png, image/jpeg, image/jpg, image/gif, image/webp
-- 5. Set file size limit (e.g., 5MB)

