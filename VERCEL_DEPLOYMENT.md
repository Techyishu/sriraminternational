# Vercel Deployment Guide for Admin Panel

## Common Issues & Solutions

### Issue: Admin Panel Not Accessible on Vercel

The admin panel should be accessible at `https://yourdomain.com/admin` after deployment. If it's not working, check the following:

## ✅ Required Environment Variables in Vercel

Go to your Vercel project settings and add these environment variables:

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Admin Configuration
```
ADMIN_PASSWORD=your-admin-password
JWT_SECRET=your-random-secret-key-min-32-characters
```

### How to Add Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Go to **Environment Variables**
4. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: Your actual value
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your application for changes to take effect

## ✅ Post-Deployment Checklist

1. **Verify Environment Variables**
   - All 5 variables are set in Vercel
   - Variables are available in all environments (Production, Preview, Development)

2. **Test Admin Panel Access**
   - Navigate to `https://yourdomain.com/admin`
   - Should see login page (not error page)
   - Login should work with admin credentials

3. **Verify Database Connection**
   - Try logging in
   - If login fails, check Supabase credentials
   - Check Vercel function logs for errors

4. **Check Build Logs**
   - Go to Vercel Dashboard > Deployments
   - Check if build completed successfully
   - Look for any environment variable warnings

## 🔧 Troubleshooting

### Problem: "SUPABASE_SERVICE_ROLE_KEY is not set" error

**Solution:**
- Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables
- Redeploy the application

### Problem: Admin panel shows blank page or error

**Solution:**
1. Check Vercel function logs for errors
2. Verify all environment variables are set
3. Ensure Supabase project is active
4. Check browser console for client-side errors

### Problem: Login fails even with correct credentials

**Solution:**
1. Verify admin user exists in Supabase `admin_users` table
2. Check that `JWT_SECRET` is set in Vercel
3. Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
4. Check Vercel function logs for detailed error messages

### Problem: Images not uploading

**Solution:**
1. Verify storage bucket `images` exists in Supabase
2. Check storage bucket is set to **Public**
3. Verify storage policies are set (run migration 004)
4. Check file size limits (5MB max)

## 📝 Environment Variable Checklist

Before deploying to Vercel, ensure you have:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon/public key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (secret!)
- [ ] `ADMIN_PASSWORD` - Admin login password (optional, for fallback)
- [ ] `JWT_SECRET` - Random secret for JWT tokens (min 32 characters)

## 🚀 Deployment Steps

1. **Push code to GitHub/GitLab/Bitbucket**
2. **Connect repository to Vercel** (if not already connected)
3. **Add environment variables** in Vercel dashboard
4. **Deploy** (automatic on push, or manual)
5. **Test admin panel** at `https://yourdomain.com/admin`
6. **Verify functionality** - Login, add items, test uploads

## 🔒 Security Notes for Production

- Never commit environment variables to git
- Use strong, unique `JWT_SECRET` (generate with: `openssl rand -base64 32`)
- Keep `SUPABASE_SERVICE_ROLE_KEY` secret
- Use strong admin passwords
- Consider IP whitelisting for admin panel (advanced)
- Enable Vercel's DDoS protection

## 📞 Support

If issues persist:
1. Check Vercel function logs
2. Check Supabase logs
3. Verify all migrations are run
4. Test locally with same environment variables
5. Check browser console for client-side errors

