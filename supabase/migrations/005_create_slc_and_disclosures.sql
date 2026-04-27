-- Create slc_records table (School Leaving Certificate)
CREATE TABLE IF NOT EXISTS slc_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  father_name TEXT,
  class TEXT,
  section TEXT,
  admission_no TEXT,
  slc_no TEXT,
  date_of_issue TEXT,
  reason TEXT,
  academic_year TEXT,
  remarks TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mandatory_disclosures table
CREATE TABLE IF NOT EXISTS mandatory_disclosures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  value TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_slc_records_order ON slc_records(display_order);
CREATE INDEX IF NOT EXISTS idx_slc_records_name ON slc_records(student_name);
CREATE INDEX IF NOT EXISTS idx_mandatory_disclosures_order ON mandatory_disclosures(display_order);
CREATE INDEX IF NOT EXISTS idx_mandatory_disclosures_category ON mandatory_disclosures(category);

-- Create updated_at triggers
CREATE TRIGGER update_slc_records_updated_at 
  BEFORE UPDATE ON slc_records 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mandatory_disclosures_updated_at 
  BEFORE UPDATE ON mandatory_disclosures 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE slc_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE mandatory_disclosures ENABLE ROW LEVEL SECURITY;

-- Policies: Anyone can read, only admins can modify
CREATE POLICY "Anyone can read slc_records" 
  ON slc_records FOR SELECT 
  USING (true);

CREATE POLICY "Admins can modify slc_records" 
  ON slc_records FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );

CREATE POLICY "Anyone can read mandatory_disclosures" 
  ON mandatory_disclosures FOR SELECT 
  USING (true);

CREATE POLICY "Admins can modify mandatory_disclosures" 
  ON mandatory_disclosures FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );
