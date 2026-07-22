# 🚀 Supabase Integration - Setup Instructions

## ✅ Your Credentials Are Ready

Your `.env.local` file now contains your Supabase credentials and Google OAuth keys.

## Next: Initialize Database Schema

### Complete Step-by-Step Guide

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Log in to your account

2. **Select Your Project**
   - Click on your Prism project

3. **Navigate to SQL Editor**
   - Left sidebar → **SQL Editor** → **+ New query**

4. **Copy Database Schema**
   - Open file in project: `supabase/schema.sql`
   - Copy ALL the SQL code

5. **Paste into Supabase**
   - Paste into SQL Editor text area

6. **Execute the Schema**
   - Click **Run** button (green play icon)
   - Wait for: ✅ Query executed successfully

7. **Verify Tables Created**
   - Left sidebar → **Table Editor**
   - You should see 8 new tables created

8. **Configure Google OAuth** (Optional)
   - Supabase → **Authentication → Providers → Google**
   - Add your credentials from `.env.local`
   - Save

9. **Configure URL Settings**
   - Supabase → **Authentication → URL Configuration**
   - Site URL: `http://localhost:3000`
   - Add Redirect URLs:
     - `http://localhost:3000/dashboard`
     - `http://localhost:3000/auth/signin`
     - `http://localhost:3000/auth/signup`

10. **Restart Your App**
    ```bash
    npm run dev
    ```

## 📊 Database Tables Created

- **users** - User profiles
- **teams** - Organization workspaces
- **team_members** - Team roles and permissions
- **documents** - File uploads
- **consultations** - Meeting bookings
- **consultation_notes** - Follow-up notes
- **reports** - Tax analysis
- **audit_logs** - Compliance tracking

## 🧪 Test the Integration

1. Visit: http://localhost:3000
2. Click "Sign Up" button
3. Fill in details and sign up
4. Check Supabase → Table Editor → users table
5. Your account should be there!

## 🔒 Security Features Enabled

✅ Row-Level Security (RLS)
✅ Multi-tenant isolation
✅ Role-based access control
✅ Audit logging
✅ HTTP-only cookies
✅ Google OAuth

## ⚙️ Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL
  → Your Supabase project URL

NEXT_PUBLIC_SUPABASE_ANON_KEY
  → Client key (safe for frontend)

SUPABASE_SERVICE_ROLE_KEY
  → Admin key (keep secret!)

NEXT_PUBLIC_GOOGLE_CLIENT_ID
  → Google OAuth app ID

GOOGLE_CLIENT_SECRET
  → Google OAuth secret

NEXTAUTH_URL
  → Your app URL (http://localhost:3000)
```

## 🚨 Common Issues

**"Table already exists"** - Normal! Just run schema again.

**"Connection refused"** - Verify credentials in .env.local and restart server.

**Sign up works but no user in DB** - Check Supabase dashboard in Table Editor.

**Google OAuth not working** - Verify provider is enabled in Supabase and credentials are correct.

## 📞 Next Steps

1. ✅ Sign up/login with real Supabase database
2. Build document upload feature
3. Implement consultation booking
4. Create tax report generation
5. Deploy to Vercel

See SIGNIN_WORKING.md for complete feature guide.
