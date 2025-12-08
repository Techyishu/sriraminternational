# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully set up

## 2. Run Database Migration

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_create_page_content.sql`
4. Run the SQL script

## 3. Set Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Found in Project Settings > API
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Found in Project Settings > API
   - `SUPABASE_SERVICE_ROLE_KEY`: Found in Project Settings > API (keep this secret!)
3. Set admin credentials:
   - `ADMIN_PASSWORD`: Your admin login password
   - `JWT_SECRET`: A random secret string for JWT tokens

## 4. Create Admin User

Run this SQL in Supabase SQL Editor to create your first admin user:

```sql
-- Replace 'your-email@example.com' and hash your password using bcrypt
-- You can use an online bcrypt generator or Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = await bcrypt.hash('your-password', 10);

INSERT INTO admin_users (email, password_hash)
VALUES ('your-email@example.com', '$2a$10$your-bcrypt-hash-here');
```

Or use the ADMIN_PASSWORD environment variable for initial login (less secure, for testing only).

## 5. Access Admin Panel

1. Start your Next.js development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin`
3. Login with your admin credentials
4. Start editing content!

## Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for admin accounts
- Change JWT_SECRET to a random string in production
- Consider implementing additional security measures like rate limiting

