# Supabase Setup Guide for Prism Equity Partners

## Quick Start

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Click "New Project"
- Select your organization and region
- Set a strong database password
- Wait for initialization (5-10 minutes)

### 2. Get Your Credentials
From your Supabase project dashboard:
1. Go to **Settings → API**
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configure Environment Variables

Create `.env.local` in your project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000

# Application
NODE_ENV=development
```

### 4. Run Database Migration

Option A: Using Supabase SQL Editor (Easiest for first-time setup)
1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New query**
3. Copy contents from `supabase/schema.sql`
4. Paste into the SQL editor
5. Click **Run**

Option B: Using Supabase CLI (Recommended for production)
```bash
npm install -g supabase

# Link your project
supabase link

# Run migrations
supabase migration up
```

### 5. Set Up Google OAuth (Optional but Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials (Authorized redirect URIs):
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
3. Add credentials to `.env.local`

### 6. Enable Auth in Supabase

1. Go to **Authentication → Providers**
2. Enable **Email** (enabled by default)
3. Enable **Google OAuth** (optional):
   - Add your Google Client ID
   - Add your Google Client Secret
4. Go to **Authentication → URL Configuration**
5. Set Site URL: `http://localhost:3000` (dev) or your domain (prod)
6. Add Redirect URLs:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/auth/signin`
   - `http://localhost:3000/auth/signup`

## Database Schema Overview

### Core Tables

**users**
- Extends Supabase `auth.users`
- Stores user profile: name, company, role, avatar

**teams**
- Organization workspace
- Single owner, multiple members
- Tracks ownership and timestamps

**team_members**
- Many-to-many relationship between users and teams
- Each member has a role: owner, admin, advisor, member

**documents**
- Tax returns, financial statements, forms
- Upload status tracking: pending → reviewed → approved
- Audit trail: who uploaded, who reviewed, notes

**consultations**
- Tax strategy consultation bookings
- Status tracking: requested → scheduled → completed
- Optional meeting link and advisor assignment

**consultation_notes**
- Notes and action items from consultations
- Linked to consultation and creator

**reports**
- Tax strategy reports and analysis
- Types: tax_strategy, audit, planning, optimization
- JSON content storage for flexibility
- Workflow: draft → review → finalized

**audit_logs**
- Compliance logging of all data changes
- Tracks user, action, old/new values
- IP address logging for security

## Row Level Security (RLS)

All tables have RLS enabled. Key policies:

- **Users**: Can read their own profile and team members
- **Teams**: Can read teams they own or are members of
- **Documents**: Only team members can access
- **Consultations**: Only team members can read; only requestor/advisor can update
- **Reports**: Only team members can read; only advisors can create/update
- **Audit Logs**: Only admins can read

## Testing the Connection

After setup, test the connection:

```bash
npm run dev
```

Visit `http://localhost:3000/auth/signin` and sign up with email/password.

## Production Deployment

### Before Going Live

1. **Environment Variables**: Add all secrets to your hosting platform
2. **SSL/HTTPS**: Enable in Supabase dashboard
3. **RLS Policies**: Review all policies for security
4. **Backups**: Configure automated backups in Supabase dashboard
5. **Monitoring**: Set up alerts for unusual activity
6. **Rate Limiting**: Configure in Supabase → Settings → Rate Limiting

### Vercel Deployment

```bash
# Set environment variables in Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET

# Deploy
vercel deploy --prod
```

### Update Supabase URL Configuration

After deploying to Vercel:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Update Site URL to your Vercel domain: `https://your-domain.vercel.app`
3. Add Redirect URLs:
   - `https://your-domain.vercel.app/dashboard`
   - `https://your-domain.vercel.app/auth/signin`
   - `https://your-domain.vercel.app/auth/signup`

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists
- Verify variable names match exactly
- Restart dev server: `npm run dev`

### "ANON_KEY is not valid"
- Copy anon key again from Supabase dashboard
- Make sure it's the `anon public` key, not service role

### "Cross-Origin Request Blocked"
- Go to Supabase → Project Settings → API
- Add your frontend domain to CORS settings
- For development: should auto-include `localhost:3000`

### "User not found after sign-up"
- Check that the `users` table RLS policies are correct
- Verify auth.users has a matching row
- Check browser console for errors

## Useful Supabase Links

- [Supabase Dashboard](https://app.supabase.com)
- [Documentation](https://supabase.com/docs)
- [API Reference](https://supabase.com/docs/guides/api)
- [JavaScript Client](https://supabase.com/docs/reference/javascript)
- [SQL Editor Guide](https://supabase.com/docs/guides/database/sql-editor)
