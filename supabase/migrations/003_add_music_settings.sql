-- Create music_settings table
CREATE TABLE IF NOT EXISTS music_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enabled BOOLEAN DEFAULT true,
  music_url TEXT,
  volume DECIMAL DEFAULT 0.5,
  loop BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO music_settings (id, enabled, music_url, volume, loop)
VALUES (gen_random_uuid(), false, '', 0.5, true)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE music_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read music settings
CREATE POLICY "Anyone can read music_settings" 
  ON music_settings FOR SELECT 
  USING (true);

-- Policy: Only admins can modify music settings
CREATE POLICY "Admins can modify music_settings" 
  ON music_settings FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

