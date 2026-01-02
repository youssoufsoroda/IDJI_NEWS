# Supabase Setup Guide

This guide will help you set up Supabase for IDJINKOUNDZI NEWS application.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Step 1: Create a New Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: IDJINKOUNDZI NEWS
   - **Database Password**: Choose a strong password (save it securely)
   - **Region**: Select the closest region to your users
4. Click "Create new project"

Wait for the project to finish setting up (this may take a few minutes).

## Step 2: Get Your Project Credentials

1. Once your project is ready, go to **Project Settings** > **API**
2. Copy the following values:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema

This will create all necessary tables, indexes, and Row Level Security (RLS) policies.

## Step 4: Configure Environment Variables

1. Open the `.env` file in the root of your project
2. Update the following values with your Supabase credentials:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
```

## Step 5: Configure Storage (Optional)

If you want to enable image uploads for news:

1. Go to **Storage** in your Supabase dashboard
2. Click "Create a new bucket"
3. Name it `news-images`
4. Set it to **Public** bucket
5. Click "Create bucket"

### Storage Policies

Add these policies to the `news-images` bucket:

**Policy for public read access:**
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');
```

**Policy for admin uploads:**
```sql
CREATE POLICY "Admin can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'news-images' AND
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
);
```

## Step 6: Create Admin User

After setting up authentication in the app:

1. Register a new user through the app
2. Go to **Authentication** > **Users** in Supabase dashboard
3. Find your user and copy their UUID
4. Go to **Table Editor** > **users**
5. Find your user record and change the `role` column from `user` to `admin`

Now this user will have admin privileges to create news and manage content.

## Step 7: Test the Connection

1. Run your app: `npm start`
2. Try to register a new user
3. Check the **Authentication** section in Supabase to see if the user was created
4. Check the **Table Editor** to verify the user profile was created in the `users` table

## Database Schema Overview

### Tables

- **services**: Available event types (Grand mariage, Mdhoihiricho, etc.)
- **users**: User profiles (extends Supabase auth.users)
- **news**: News articles with optional images and service association
- **messages**: Contact form submissions
- **appointments**: User appointment bookings

### Row Level Security

All tables have RLS enabled with appropriate policies:
- Public read access for news and services
- Users can only manage their own appointments
- Admins have full access to everything
- Anyone can submit contact messages

## Troubleshooting

### Connection Issues

- Verify your SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check that your internet connection is stable
- Ensure Supabase project is not paused (free tier pauses after 1 week of inactivity)

### Authentication Issues

- Check that email confirmations are disabled for development:
  - Go to **Authentication** > **Settings** > **Auth Providers**
  - Disable "Confirm email" for testing

### RLS Policy Issues

- If you can't access data, check the RLS policies in **Table Editor**
- For debugging, you can temporarily disable RLS (not recommended for production)

## Production Checklist

Before deploying to production:

- [ ] Enable email confirmations
- [ ] Set up custom SMTP for emails (Authentication > Settings)
- [ ] Review and test all RLS policies
- [ ] Set up database backups
- [ ] Configure rate limiting
- [ ] Add custom domain (optional)
- [ ] Enable 2FA for admin accounts

## Support

For more information, visit:
- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
