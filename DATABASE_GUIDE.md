# Prism Equity Partners - Database & Infrastructure Guide

## System Architecture

### Frontend (Next.js 16 + React 19)
- **Authentication**: Supabase Auth + Google OAuth
- **State Management**: React Context API
- **Styling**: Tailwind CSS 4.3.3 with Fintech Premium design system
- **Animations**: Framer Motion
- **Real-time**: Supabase Realtime (optional)

### Backend
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage (documents, files)
- **Auth**: Supabase Auth with RLS
- **API Routes**: Next.js API routes (deployed to Vercel)

### Infrastructure
- **Hosting**: Vercel (frontend + API routes)
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth + Google OAuth
- **File Storage**: Supabase Storage

## Database Schema

### Overview
```
Users (extends auth.users)
├── Teams (ownership)
│   ├── Team Members (many-to-many)
│   ├── Documents (storage + versioning)
│   ├── Consultations (bookings + notes)
│   └── Reports (analysis + finalization)
└── Audit Logs (compliance)
```

### Table Details

#### users
- **Purpose**: User profiles extending Supabase auth
- **Key Fields**: id, email, name, company_name, role, avatar_url, phone
- **Relationships**: Teams (owner), TeamMembers, Documents (uploaded), Consultations, Reports
- **RLS**: Users can read/update own profile

#### teams
- **Purpose**: Organization workspace (B2B customer account)
- **Key Fields**: id, name, description, owner_id
- **Relationships**: Owner (users), Members (team_members), Documents, Consultations, Reports
- **RLS**: Owner and members can access

#### team_members
- **Purpose**: Multi-role team membership
- **Key Fields**: id, team_id, user_id, role (owner, admin, advisor, member)
- **Relationships**: Teams, Users
- **RLS**: Only team owner can manage

#### documents
- **Purpose**: Tax returns, financial statements, compliance docs
- **Key Fields**: id, team_id, uploaded_by, name, file_url, file_type, category, status
- **Status Workflow**: pending → reviewed → approved/rejected
- **Audit Trail**: uploaded_by, reviewed_by, reviewed_at, review_notes
- **RLS**: Team members can upload/read, advisors can review

#### consultations
- **Purpose**: Tax strategy consultation bookings and scheduling
- **Key Fields**: id, team_id, requested_by, advisor_id, title, scheduled_at, status
- **Status Workflow**: requested → scheduled → completed/cancelled
- **Meeting Integration**: meeting_link (Zoom, Google Meet, etc.)
- **RLS**: Team members can book, only advisor/requester can update

#### consultation_notes
- **Purpose**: Notes and action items from consultations
- **Key Fields**: id, consultation_id, created_by, content, action_items
- **Relationships**: Consultations, Users
- **RLS**: Team members can read, participants can add notes

#### reports
- **Purpose**: Tax strategy analysis and recommendations
- **Key Fields**: id, team_id, created_by, title, report_type, content, pdf_url
- **Report Types**: tax_strategy, audit, planning, optimization
- **Status Workflow**: draft → review → finalized
- **PDF Generation**: pdf_url (generated server-side)
- **RLS**: Team members can read, advisors can create/update

#### audit_logs
- **Purpose**: Compliance logging for all data changes
- **Key Fields**: id, user_id, team_id, action, table_name, old_values, new_values, ip_address
- **Retention**: Permanent (compliance requirement)
- **RLS**: Only admins can read

## Setup Instructions

### Step 1: Create Supabase Project
```bash
# Visit supabase.com and create a new project
# Note your credentials in .env.local
```

### Step 2: Initialize Database
```bash
# Option A: Supabase SQL Editor (simplest)
# Copy supabase/schema.sql → run in dashboard

# Option B: Command Line
npm install -g supabase
supabase link
supabase migration up
```

### Step 3: Configure Environment
```bash
# Copy .env.example to .env.local and fill in:
cp .env.example .env.local

# Edit .env.local with:
# - Supabase project URL and keys
# - Google OAuth credentials
# - NextAuth URL
```

### Step 4: Install Dependencies
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm run dev
```

### Step 5: Test Authentication
```bash
# Visit http://localhost:3000
# Click "Sign In" → "Sign Up"
# Create account with email/password or Google
# Should redirect to /dashboard after signup
```

## User Flows

### Signup Flow
1. User visits landing page
2. Clicks "Sign Up" button (top right)
3. AuthModal or full signup page appears
4. User enters name, email, password
5. POST /api/auth/signup creates user in Supabase
6. Automatic team creation (user = owner)
7. Redirect to /dashboard
8. User can invite team members

### Signin Flow
1. User visits /auth/signin
2. Option 1: Email + password
3. Option 2: Google OAuth
4. Session stored in Supabase auth
5. Redirect to /dashboard

### Team Invitation Flow
1. Team owner navigates to team settings
2. Enters team member email
3. POST /api/teams/invite sends invitation
4. Invitee receives email
5. Clicks link, joins team
6. Can now access team documents, consultations, reports

### Document Upload Flow
1. Team member navigates to Documents
2. Uploads tax return / financial statement
3. File stored in Supabase Storage
4. Document record created (status: pending)
5. Advisor reviews and approves/rejects
6. Status updates automatically
7. Audit log recorded

### Consultation Booking Flow
1. Team member clicks "Book Consultation"
2. Selects date, time, topic
3. Creates consultation record (status: requested)
4. Advisor receives notification (optional: email)
5. Advisor confirms and adds meeting link
6. Status changes to scheduled
7. User receives calendar invite
8. After meeting, advisor adds notes + action items

### Report Generation Flow
1. Advisor creates new report
2. Enters title, description, report type
3. Analyzes team data (documents, consultations)
4. Generates tax strategy recommendations
5. Saves as draft
6. Reviews and finalizes
7. System generates PDF
8. Team can download/share

## Deployment Checklist

### Pre-Deployment
- [ ] Test signup/signin/signout flows
- [ ] Test document upload
- [ ] Test consultation booking
- [ ] Verify RLS policies block unauthorized access
- [ ] Set up email notifications
- [ ] Configure backup strategy

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

# Update Supabase URL Config
# Settings → Auth → URL Configuration
# - Site URL: https://your-domain.vercel.app
# - Redirect URLs: /dashboard, /auth/signin, /auth/signup
```

### Production Verification
- [ ] Verify database backups running
- [ ] Test email verification
- [ ] Test password reset flow
- [ ] Verify RLS blocks cross-team access
- [ ] Monitor error logs
- [ ] Set up uptime monitoring

## Performance Optimization

### Database Queries
- **Indexes**: All commonly-queried fields indexed
- **Soft Deletes**: Not used (hard delete for compliance)
- **Connection Pooling**: Supabase handles automatically

### File Storage
- **Compression**: GZIP for text files
- **CDN**: Supabase Storage via Cloudflare CDN
- **Signed URLs**: Temporary access for private documents

### API Optimization
- **Pagination**: Implement for large lists
- **Caching**: Next.js ISR for public pages
- **Real-time**: Optional Supabase Realtime subscriptions

## Monitoring & Maintenance

### Health Checks
```bash
# Verify database connectivity
curl http://localhost:3000/api/auth/me

# Check auth status
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/auth/me
```

### Logging
- Application logs: Vercel dashboard
- Database logs: Supabase dashboard
- Audit logs: `audit_logs` table (queryable)

### Backups
- **Frequency**: Daily (Supabase Pro plan)
- **Retention**: 7 days (configurable)
- **Recovery**: Supabase provides point-in-time recovery

## Troubleshooting

### Auth Issues

**Problem**: "User not found after signup"
- Check `users` table has RLS policies
- Verify token is valid in Supabase dashboard

**Problem**: "Google OAuth redirect fails"
- Verify redirect URI in Google Cloud Console
- Check NEXTAUTH_URL in .env.local
- Verify Supabase URL configuration

### Database Issues

**Problem**: "Permission denied" errors
- Review RLS policies for the table
- Verify user belongs to team
- Check role-based access (advisor vs member)

**Problem**: "Connection timeout"
- Verify network/firewall allows Supabase
- Check connection pool limits
- Review database logs in Supabase dashboard

## Security Best Practices

1. **RLS Policies**: Never SELECT without RLS
2. **API Keys**: Separate anon key (frontend) and service role (backend)
3. **Passwords**: Minimum 8 characters + complexity (frontend validation)
4. **HTTPS**: Required in production
5. **Audit Logging**: All data mutations logged
6. **Rate Limiting**: Enabled on auth endpoints
7. **CORS**: Configured in Supabase

## Next Steps

1. **Email Notifications**: Configure Supabase email templates
2. **Document Processing**: Add PDF/image processing pipeline
3. **Real-time Updates**: Enable Supabase Realtime for live updates
4. **Analytics**: Add session tracking and feature usage
5. **Compliance**: Configure data retention and GDPR data export
6. **Integrations**: Connect to Stripe for payments (future)
7. **Advanced Features**: Role-based access, bulk operations, exports
