# Prism Equity Partners - Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### 1. Clone & Install (1 min)
```bash
# Already done - you're in the repo
npm install
```

### 2. Create Supabase Project (2 min)
```bash
# Visit https://supabase.com
# - Click "New Project"
# - Choose region, set database password
# - Wait for initialization (5-10 min in background)
```

### 3. Setup Environment (1 min)
```bash
# Copy template
cp .env.example .env.local

# Edit .env.local and add:
# From Supabase dashboard → Settings → API:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# From Google Cloud Console (optional for testing):
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Initialize Database (1 min)
```bash
# Option A: Supabase SQL Editor (easiest)
# - Go to supabase.com dashboard
# - Click "SQL Editor" → "New query"
# - Copy contents from: supabase/schema.sql
# - Paste into editor → Click "Run"

# Option B: CLI (advanced)
# npm install -g supabase
# supabase link
# supabase migration up
```

### 5. Start Dev Server (instant)
```bash
npm run dev
```

Open **http://localhost:3000** in your browser

---

## 📋 What You Get

### Pages Ready to Use
- **`/`** — Premium landing page (Sign In/Up buttons top right)
- **`/auth/signin`** — Email/password sign in + Google OAuth
- **`/auth/signup`** — Create account with email, name, password
- **`/dashboard`** — Protected portal showing user info (redirects to / if not signed in)

### Features Implemented
✅ Authentication (email/password + Google OAuth)
✅ Session management (HTTP-only cookies)
✅ Row-level security (multi-tenant access control)
✅ Document management (upload, review, approve)
✅ Consultations (book, schedule, notes)
✅ Reports (create, review, finalize)
✅ Audit logging (compliance)
✅ Team management (invite, roles)

### Database Ready
✅ 8 tables (users, teams, team_members, documents, consultations, consultation_notes, reports, audit_logs)
✅ 25+ indexes for performance
✅ RLS policies for security
✅ Audit trail for compliance

---

## 🧪 Test It Out

### 1. Sign Up
```
1. Click "Sign Up" (top right)
2. Enter email, name, password (8+ chars)
3. Click "Create Account"
4. Auto-redirects to /dashboard
5. You're now in your team workspace
```

### 2. Try Google OAuth (if configured)
```
1. Click "Sign In" (top right)
2. Click "Continue with Google"
3. Authenticate with Google
4. Auto-redirects to /dashboard
5. Google OAuth complete
```

### 3. Sign Out
```
1. Click your name (top right, after signin)
2. Click "Sign Out"
3. Redirects to home page
4. Try signing in again
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **SUPABASE_SETUP.md** | Detailed Supabase setup guide |
| **DATABASE_GUIDE.md** | Architecture, schema, user flows, deployment |
| **API_REFERENCE.md** | Complete API endpoints, examples, error codes |
| **.env.example** | Environment variable template |
| **supabase/schema.sql** | Database schema (run in Supabase SQL Editor) |

---

## 🔧 Project Structure

```
prism/
├── app/
│   ├── api/auth/                 # Auth endpoints
│   ├── auth/                     # Auth pages (signin, signup)
│   ├── dashboard/                # Protected dashboard
│   └── page.tsx                  # Landing page
├── components/
│   ├── Header.tsx               # Sign In/Up buttons
│   ├── AuthModal.tsx            # Auth modal overlay
│   └── ...
├── lib/
│   ├── supabase.ts              # Supabase client
│   ├── auth-context.tsx         # Auth state management
│   ├── hooks/
│   │   └── useSupabaseAuth.ts   # Supabase auth hook
│   ├── api/
│   │   └── supabase-helpers.ts  # Database helpers
│   └── auth-config.ts           # Auth configuration
├── supabase/
│   ├── schema.sql               # Complete schema
│   └── migrations/              # Migration files
└── public/                      # Static assets
```

---

## 🚢 Deploy to Vercel

### Before Deployment
1. Verify build passes: `npm run build`
2. Test all auth flows locally
3. Create Supabase project (if not done)

### Deploy Steps
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Import project in Vercel
# - Go to vercel.com → New Project
# - Connect GitHub repo
# - Click "Deploy"

# 3. Add environment variables in Vercel
# - Project Settings → Environment Variables
# - Add all from .env.local

# 4. Redeploy with env vars
# - Go to Deployments
# - Click "Redeploy" on latest

# 5. Update Supabase URL configuration
# - Supabase dashboard → Settings → Auth → URL Configuration
# - Site URL: https://your-domain.vercel.app
# - Redirect URLs: add /dashboard, /auth/signin, /auth/signup
```

---

## 🆘 Common Issues

### "Missing Supabase environment variables"
```bash
# Check .env.local exists
ls -la .env.local

# Verify variables (no spaces around =)
cat .env.local | grep SUPABASE

# Restart dev server
npm run dev
```

### "Sign up works but redirect fails"
```bash
# Check Supabase Auth → URL Configuration
# - Site URL should match your domain/localhost
# - Add /dashboard to Redirect URLs

# For development: http://localhost:3000/dashboard
# For production: https://your-domain.vercel.app/dashboard
```

---

## ✅ Checklist Before Going Live

- [ ] All environment variables set
- [ ] Supabase database initialized
- [ ] Google OAuth credentials (if using)
- [ ] Build passes: `npm run build`
- [ ] Local signup/signin works
- [ ] Deploy to Vercel succeeds
- [ ] Verify deployed app signs up/signs in
- [ ] Supabase URL configuration updated

---

## 🚀 You're All Set!

Your B2B portal is ready. The authentication system is working, the database is secure, and you can start building portal features.

**Next:** Follow SUPABASE_SETUP.md to initialize your database, then run `npm run dev` and start testing!
