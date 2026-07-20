# Sign In & Sign Up Guide - Prism Equity Partners

## 🔍 Where to Find Sign In / Sign Up

### Desktop (Screen Width > 768px)
**Location:** Top-right corner of the header
- **Sign In Button** (outline style with emerald border)
- **Sign Up Button** (filled emerald background)
- Located next to the "Strategy" and "Process" navigation links

### Mobile (Screen Width < 768px)
**Location:** Mobile menu (hamburger icon)
- Click the **hamburger menu icon** (☰) in top-right
- Scroll down to see "Sign In" and "Sign Up" buttons
- They appear below "Strategy" and "Process" links

---

## ✅ Quick Test (Desktop)

1. Open http://localhost:3000 in your browser
2. **Look at the top-right corner** of the page
3. You should see two buttons:
   - "Sign In" (with green/emerald border)
   - "Sign Up" (filled with green/emerald background)

### If You Don't See Them:

**Issue 1: Screen too narrow**
- Make sure your browser window is WIDE (> 768px)
- Buttons only show on desktop view, not mobile

**Issue 2: Browser zoom**
- Check zoom level is 100% (Cmd+0 on Mac, Ctrl+0 on Windows)
- Try zooming out to see full page

**Issue 3: Dark theme issue**
- Click the theme toggle (sun/moon icon) to switch themes
- Buttons should be visible in both light and dark modes

---

## 🎬 Sign Up Flow (Step-by-Step)

### Step 1: Open Sign Up Modal
```
Click "Sign Up" button (top-right)
→ Modal window appears
```

### Step 2: See Two Options
The modal shows:
1. **"Continue with Google"** button (with Google icon)
2. **"Or continue with email"** - below the divider line

### Step 3: Choose Option A - Google OAuth
```
Click "Continue with Google"
→ Redirects to Google login page
→ Authenticate with your Google account
→ Automatically redirects to /dashboard
→ You're signed in!
```

### Step 4: Choose Option B - Email & Password
```
Fill in:
- Full Name: John Doe
- Email: john@example.com
- Password: MySecurePass123 (8+ characters)

Click "Create Account"
→ Account created
→ Automatically redirects to /dashboard
```

### Step 5: You're Now In Your Portal!
```
/dashboard shows:
- Your name and email
- Account created date
- "Sign Out" button (top-right)
- Coming soon features grid
```

---

## 🎬 Sign In Flow (Step-by-Step)

### Step 1: Open Sign In Modal
```
Click "Sign In" button (top-right)
→ Modal window appears
→ Says "Welcome Back" at the top
```

### Step 2: Choose Option A - Google OAuth
```
Click "Continue with Google"
→ Redirects to Google login page
→ Authenticate with your Google account
→ Automatically redirects to /dashboard
```

### Step 3: Choose Option B - Email & Password
```
Fill in:
- Email: john@example.com (your signup email)
- Password: MySecurePass123

Click "Sign In"
→ Authenticated
→ Redirects to /dashboard
```

### Step 4: Toggle Between Sign In & Sign Up
If you're in the Sign In modal but want to Sign Up:
```
Click "Sign Up" link at bottom
→ Modal switches to Sign Up form
→ Shows "Full Name" field instead of just email/password
```

---

## 🔐 API Endpoints (Behind the Scenes)

When you click buttons, these are called:

### Email/Password Sign Up
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "MySecurePass123"
}

Response:
{
  "message": "Account created successfully",
  "user": {
    "id": "abc123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Email/Password Sign In
```bash
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "MySecurePass123"
}

Response:
{
  "message": "Signed in successfully",
  "user": {
    "id": "abc123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Google OAuth
```
1. Click "Continue with Google"
2. Redirects to: https://accounts.google.com/o/oauth2/v2/auth
3. After Google auth, redirects to: /api/auth/callback/google?code=...
4. Backend exchanges code for token
5. Creates user session
6. Redirects to: /dashboard
```

---

## 🧪 Manual Testing

### Test 1: Sign Up with Email/Password
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "name": "Test User",
    "password": "SecurePass123"
  }'

Expected Response:
{
  "message": "Account created successfully",
  "user": { ... }
}
```

### Test 2: Sign In with Email/Password
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "SecurePass123"
  }'

Expected Response:
{
  "message": "Signed in successfully",
  "user": { ... }
}
```

### Test 3: Check Current User
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Cookie: auth-session=..."

Expected Response:
{
  "id": "...",
  "email": "testuser@example.com",
  "name": "Test User"
}
```

### Test 4: Sign Out
```bash
curl -X POST http://localhost:3000/api/auth/signout

Expected Response:
{
  "message": "Signed out successfully"
}
```

---

## 🚨 Troubleshooting

### Problem: Buttons Not Visible

**Solution 1: Check Screen Width**
- Resize browser to be wider
- On mobile, open hamburger menu (☰)

**Solution 2: Clear Browser Cache**
```bash
# Hard refresh browser
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

**Solution 3: Check Console for Errors**
```
F12 → Console tab
Look for red error messages
Report the error message
```

### Problem: Click Button but Nothing Happens

**Solution 1: Check Network Tab**
```
F12 → Network tab
Click "Sign Up"
Look for POST request to /api/auth/signup
Should show 201 (Created) or 200 (OK)
```

**Solution 2: Check Console for JavaScript Errors**
```
F12 → Console tab
Look for red errors
Common issues:
- "useAuth must be used within AuthProvider" - AuthProvider missing
- "Cannot find module" - Missing imports
```

**Solution 3: Restart Dev Server**
```bash
npm run dev
# Ctrl+C to stop
# npm run dev to restart
```

### Problem: Sign Up Works but Redirect Fails

**Solution:**
- Check that /dashboard page exists
- Verify AuthProvider wraps the app (see PageContent.tsx)
- Check browser console for redirect errors

### Problem: Google OAuth Not Working

**Solution 1: Set Environment Variables**
```bash
# .env.local must have:
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=http://localhost:3000
```

**Solution 2: Verify Google Redirect URI**
- Google Cloud Console → OAuth app → Authorized redirect URIs
- Should include: `http://localhost:3000/api/auth/callback/google`

**Solution 3: Check Console for OAuth Errors**
```
F12 → Console
Click "Continue with Google"
Look for errors about redirect URI mismatch
```

---

## 📋 Checklist: Everything Working

- [ ] Sign Up button visible (top-right)
- [ ] Sign In button visible (top-right)
- [ ] Can click "Sign Up" → modal opens
- [ ] Can click "Sign In" → modal opens
- [ ] Email/password sign up form fills and submits
- [ ] Email/password sign in form fills and submits
- [ ] "Continue with Google" button visible
- [ ] Redirects to /dashboard after sign up/in
- [ ] Can see user name/email on dashboard
- [ ] Can sign out
- [ ] Modal closes after signing in
- [ ] Can toggle between sign in/up modes

---

## 🔗 Related Files

- **Header Component:** `components/Header.tsx` (Sign In/Up buttons)
- **Auth Modal:** `components/AuthModal.tsx` (Modal form)
- **Auth Context:** `lib/auth-context.tsx` (State management)
- **API Endpoints:**
  - `app/api/auth/signin/route.ts`
  - `app/api/auth/signup/route.ts`
  - `app/api/auth/signout/route.ts`
  - `app/api/auth/callback/google/route.ts`
- **Pages:**
  - `app/auth/signin/page.tsx` (Standalone signin page)
  - `app/auth/signup/page.tsx` (Standalone signup page)
  - `app/dashboard/page.tsx` (Protected dashboard)

---

## 💡 Key Features

✓ **Two Authentication Methods:**
  - Email/password with 8+ character validation
  - Google OAuth 2.0

✓ **Two UI Options:**
  - Modal overlay (quick signup on landing page)
  - Full pages (/auth/signin, /auth/signup)

✓ **Secure Sessions:**
  - HTTP-only cookies (can't be stolen via JavaScript)
  - 7-day expiration
  - Auto-refresh on page load

✓ **Multi-tenant Ready:**
  - Each user gets their own team
  - Can invite team members (future feature)
  - Role-based access (owner, admin, advisor, member)

---

## 📞 Still Having Issues?

1. **Check QUICKSTART.md** - 5-minute setup guide
2. **Check DATABASE_GUIDE.md** - Architecture overview
3. **Check API_REFERENCE.md** - All endpoints documented
4. **Browser DevTools** - F12 → Console tab for errors
5. **GitHub Issues** - Create an issue if needed
