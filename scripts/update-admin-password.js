/**
 * Script to update an admin user's password in Supabase
 * 
 * Usage: node scripts/update-admin-password.js <email> <new-password>
 * 
 * Make sure to set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file
 */

// Load environment variables from .env.local
const fs = require('fs');
const path = require('path');

// Load .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  console.error('You can set them in your .env.local file or as environment variables');
  process.exit(1);
}

const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.error('Usage: node scripts/update-admin-password.js <email> <new-password>');
  console.error('\nExample:');
  console.error('  node scripts/update-admin-password.js admin@example.com MyNewPassword123');
  process.exit(1);
}

async function updateAdminPassword() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Check if admin user exists
    const { data: existingAdmin, error: fetchError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !existingAdmin) {
      console.error(`Error: Admin user with email "${email}" not found`);
      process.exit(1);
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    // Update admin user password
    const { data, error } = await supabase
      .from('admin_users')
      .update({
        password_hash: passwordHash
      })
      .eq('email', email)
      .select()
      .single();

    if (error) {
      console.error('Error updating password:', error.message);
      process.exit(1);
    }

    console.log('✅ Admin password updated successfully!');
    console.log('Email:', data.email);
    console.log('ID:', data.id);
    console.log('\nYou can now login with the new password at /admin');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

updateAdminPassword();

