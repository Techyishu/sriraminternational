-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create toppers table
CREATE TABLE IF NOT EXISTS toppers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  class TEXT,
  percentage TEXT,
  year TEXT,
  achievement TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT,
  qualification TEXT,
  experience TEXT,
  bio TEXT,
  image_url TEXT,
  email TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_toppers_order ON toppers(display_order);
CREATE INDEX IF NOT EXISTS idx_staff_order ON staff(display_order);
CREATE INDEX IF NOT EXISTS idx_activities_order ON activities(display_order);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_read ON contact_submissions(read);

-- Create updated_at triggers
CREATE TRIGGER update_gallery_images_updated_at 
  BEFORE UPDATE ON gallery_images 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_toppers_updated_at 
  BEFORE UPDATE ON toppers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at 
  BEFORE UPDATE ON staff 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at 
  BEFORE UPDATE ON activities 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE toppers ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies: Anyone can read, only admins can modify
CREATE POLICY "Anyone can read gallery_images" 
  ON gallery_images FOR SELECT 
  USING (true);

CREATE POLICY "Admins can modify gallery_images" 
  ON gallery_images FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Anyone can read toppers" 
  ON toppers FOR SELECT 
  USING (true);

CREATE POLICY "Admins can modify toppers" 
  ON toppers FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Anyone can read staff" 
  ON staff FOR SELECT 
  USING (true);

CREATE POLICY "Admins can modify staff" 
  ON staff FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Anyone can read activities" 
  ON activities FOR SELECT 
  USING (true);

CREATE POLICY "Admins can modify activities" 
  ON activities FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

-- Anyone can insert contact submissions, only admins can read
CREATE POLICY "Anyone can submit contact" 
  ON contact_submissions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can read contact_submissions" 
  ON contact_submissions FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Admins can update contact_submissions" 
  ON contact_submissions FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

