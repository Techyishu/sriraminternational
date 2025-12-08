-- Create page_content table
CREATE TABLE IF NOT EXISTS page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_slug, section)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_page_content_slug ON page_content(page_slug);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_page_content_updated_at 
  BEFORE UPDATE ON page_content 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read page_content
CREATE POLICY "Anyone can read page_content" 
  ON page_content FOR SELECT 
  USING (true);

-- Policy: Only authenticated admins can modify page_content
CREATE POLICY "Admins can modify page_content" 
  ON page_content FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Policy: Only authenticated admins can access admin_users
CREATE POLICY "Admins can access admin_users" 
  ON admin_users FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

