# Dynamic Content & Admin Panel Setup Guide

This guide will help you set up Supabase for dynamic content management and the admin panel.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js installed on your machine

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized (takes a few minutes)

## Step 3: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the file `supabase/migrations/001_create_page_content.sql`
3. Copy the entire SQL content
4. Paste it into the SQL Editor in Supabase
5. Click **Run** to execute the migration

This will create:
- `page_content` table for storing dynamic page content
- `admin_users` table for admin authentication
- Required indexes and triggers
- Row Level Security policies

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root directory
2. Add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Configuration
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-random-secret-key-min-32-characters
```

### Where to find these values:

- **NEXT_PUBLIC_SUPABASE_URL**: Project Settings > API > Project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Project Settings > API > anon public key
- **SUPABASE_SERVICE_ROLE_KEY**: Project Settings > API > service_role key (keep this secret!)

## Step 5: Create Admin User

You have two options:

### Option A: Using the Setup Script (Recommended)

```bash
# Set environment variables temporarily
export SUPABASE_URL=your-project-url
export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Run the script
node scripts/create-admin.js admin@yourdomain.com your-secure-password
```

### Option B: Using SQL Editor

1. Generate a bcrypt hash for your password (use an online tool or Node.js)
2. Go to Supabase SQL Editor
3. Run this SQL (replace with your email and hashed password):

```sql
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@yourdomain.com', '$2a$10$your-bcrypt-hash-here');
```

### Option C: Using Environment Variable (Temporary, for testing only)

If you set `ADMIN_PASSWORD` in `.env.local`, you can login with that password for any email in the admin_users table. This is less secure and should only be used for initial testing.

## Step 6: Start Development Server

```bash
npm run dev
```

## Step 7: Access Admin Panel

1. Navigate to `http://localhost:3000/admin`
2. Login with your admin credentials
3. Start editing content!

## How It Works

### Admin Panel Features

- **Page Selection**: Choose which page to edit from the sidebar
- **Section Selection**: Each page has multiple sections (hero, content, etc.)
- **JSON Editor**: Edit content in JSON format
- **Save Changes**: Click "Save Changes" to update the database

### Making Pages Dynamic

To make a page dynamic, use the `usePageContent` hook:

```tsx
import { usePageContent } from "@/hooks/usePageContent";

export default function MyPage() {
  const { content, loading } = usePageContent('page-slug');
  
  if (loading) return <div>Loading...</div>;
  
  const heroContent = content.hero || defaultContent.hero;
  
  return (
    <div>
      <h1>{heroContent.title}</h1>
      <p>{heroContent.description}</p>
    </div>
  );
}
```

### Content Structure

Content is stored as JSON in the database. Example structure:

```json
{
  "title": "Page Title",
  "description": "Page description",
  "subtitle": "Optional subtitle"
}
```

You can store any JSON structure that fits your needs.

## Security Notes

- **Never commit `.env.local`** to version control
- **Change JWT_SECRET** to a strong random string in production
- **Use strong passwords** for admin accounts
- **Keep SUPABASE_SERVICE_ROLE_KEY secret** - it has full database access
- Consider implementing additional security:
  - Rate limiting
  - IP whitelisting
  - Two-factor authentication
  - Session management

## Troubleshooting

### "Unauthorized" error when saving
- Check that your JWT token is valid
- Verify JWT_SECRET matches in both `.env.local` and your server

### "Invalid credentials" on login
- Verify admin user exists in database
- Check password hash is correct (if using SQL method)
- Try using ADMIN_PASSWORD environment variable for testing

### Content not loading
- Check Supabase connection in browser console
- Verify environment variables are set correctly
- Check Row Level Security policies in Supabase

## Next Steps

1. Update your pages to use `usePageContent` hook
2. Add more sections to pages as needed
3. Customize the admin panel UI if desired
4. Set up production environment variables
5. Deploy and test!

