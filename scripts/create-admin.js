/**
 * Script to create an admin user in Supabase
 * 
 * Usage: node scripts/create-admin.js <email> <password>
 * 
 * Make sure to set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
  process.exit(1);
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: node scripts/create-admin.js <email> <password>');
  process.exit(1);
}

async function createAdmin() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Insert admin user
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email: email,
        password_hash: passwordHash
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        console.error('Error: Admin user with this email already exists');
      } else {
        console.error('Error creating admin:', error);
      }
      process.exit(1);
    }

    console.log('✅ Admin user created successfully!');
    console.log('Email:', data.email);
    console.log('ID:', data.id);
    console.log('\nYou can now login at /admin');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();

