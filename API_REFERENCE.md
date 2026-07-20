# Prism Equity Partners - API Reference

## Authentication Endpoints

### POST /api/auth/signin
Sign in with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Signed in successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "image": null,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Errors:**
- `400`: Email and password required
- `401`: Invalid credentials
- `500`: Server error

---

### POST /api/auth/signup
Create a new account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "name": "Jane Doe",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "Account created successfully",
  "user": {
    "id": "uuid",
    "email": "newuser@example.com",
    "name": "Jane Doe",
    "image": null,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Errors:**
- `400`: Missing required fields or password < 8 characters
- `409`: Email already registered
- `500`: Server error

---

### POST /api/auth/signout
Sign out current user.

**Request:**
No body required. Must be authenticated.

**Response (200 OK):**
```json
{
  "message": "Signed out successfully"
}
```

---

### GET /api/auth/callback/google
Google OAuth callback handler.

**Query Parameters:**
- `code`: Authorization code from Google
- `error`: Error from Google (if applicable)
- `state`: CSRF protection token

**Response:**
Redirects to `/dashboard` on success or `/auth/signin?error=...` on failure.

---

### GET /api/auth/me
Get current authenticated user.

**Request Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "aud": "authenticated",
  "email_verified": true
}
```

**Errors:**
- `401`: Unauthorized (no token or invalid token)
- `404`: User not found
- `500`: Server error

---

## Teams API

### POST /api/teams
Create a new team.

**Request:**
```json
{
  "name": "Acme Corporation",
  "description": "Tax strategy and wealth building"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "name": "Acme Corporation",
  "description": "Tax strategy and wealth building",
  "owner_id": "user-uuid",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- `400`: Missing required fields
- `401`: Unauthorized
- `500`: Server error

---

### GET /api/teams
Get user's teams.

**Response (200 OK):**
```json
{
  "teams": [
    {
      "id": "uuid",
      "name": "Acme Corporation",
      "description": "...",
      "owner_id": "user-uuid",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### GET /api/teams/[teamId]
Get team details.

**Response (200 OK):**
```json
{
  "id": "uuid",
  "name": "Acme Corporation",
  "description": "...",
  "owner_id": "user-uuid",
  "members_count": 3,
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### POST /api/teams/[teamId]/members
Add member to team.

**Request:**
```json
{
  "user_id": "uuid",
  "role": "advisor"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "team_id": "team-uuid",
  "user_id": "user-uuid",
  "role": "advisor",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### GET /api/teams/[teamId]/members
Get team members.

**Response (200 OK):**
```json
{
  "members": [
    {
      "id": "uuid",
      "user_id": "user-uuid",
      "role": "owner",
      "user": {
        "id": "user-uuid",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ]
}
```

---

## Documents API

### POST /api/documents
Upload a document.

**Request (multipart/form-data):**
```
file: <binary>
team_id: uuid
category: tax_return | financial_statement | form | other
description: Optional description
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "team_id": "team-uuid",
  "uploaded_by": "user-uuid",
  "name": "2024_tax_return.pdf",
  "file_url": "https://storage.example.com/...",
  "file_type": "pdf",
  "file_size": 2048000,
  "category": "tax_return",
  "status": "pending",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### GET /api/documents?team_id=uuid
List team documents.

**Query Parameters:**
- `team_id`: (required) Team ID
- `category`: Filter by category
- `status`: Filter by status (pending, reviewed, approved, rejected)
- `limit`: Pagination limit (default 20)
- `offset`: Pagination offset

**Response (200 OK):**
```json
{
  "documents": [
    {
      "id": "uuid",
      "team_id": "team-uuid",
      "name": "2024_tax_return.pdf",
      "category": "tax_return",
      "status": "approved",
      "uploaded_by": { "name": "John Doe", "email": "john@example.com" },
      "reviewed_by": { "name": "Jane Advisor", "email": "jane@example.com" },
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 5
}
```

---

### POST /api/documents/[documentId]/review
Review a document.

**Request:**
```json
{
  "status": "approved",
  "notes": "All documents in order, ready for filing."
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "status": "approved",
  "reviewed_by": "user-uuid",
  "reviewed_at": "2024-01-15T11:30:00Z",
  "review_notes": "All documents in order, ready for filing."
}
```

---

## Consultations API

### POST /api/consultations
Book a consultation.

**Request:**
```json
{
  "team_id": "uuid",
  "title": "Q1 Tax Planning Strategy",
  "description": "Discussion of year-end tax optimization strategies",
  "scheduled_at": "2024-02-15T14:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "team_id": "team-uuid",
  "requested_by": "user-uuid",
  "title": "Q1 Tax Planning Strategy",
  "status": "requested",
  "scheduled_at": "2024-02-15T14:00:00Z",
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### GET /api/consultations?team_id=uuid
List team consultations.

**Query Parameters:**
- `team_id`: (required) Team ID
- `status`: Filter by status (requested, scheduled, completed, cancelled)
- `limit`: Pagination limit (default 20)
- `offset`: Pagination offset

**Response (200 OK):**
```json
{
  "consultations": [
    {
      "id": "uuid",
      "team_id": "team-uuid",
      "title": "Q1 Tax Planning Strategy",
      "status": "scheduled",
      "scheduled_at": "2024-02-15T14:00:00Z",
      "requested_by": { "name": "John Doe" },
      "advisor_id": { "name": "Jane Advisor" },
      "meeting_link": "https://zoom.us/j/..."
    }
  ]
}
```

---

### POST /api/consultations/[consultationId]/notes
Add notes to consultation.

**Request:**
```json
{
  "content": "Discussion covered Q1-Q2 planning...",
  "action_items": "1. File Form ABC\n2. Prepare expense documentation"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "consultation_id": "consultation-uuid",
  "created_by": "user-uuid",
  "content": "Discussion covered Q1-Q2 planning...",
  "action_items": "1. File Form ABC\n2. Prepare expense documentation",
  "created_at": "2024-02-15T15:00:00Z"
}
```

---

## Reports API

### POST /api/reports
Create a new report.

**Request:**
```json
{
  "team_id": "uuid",
  "title": "2024 Tax Strategy Analysis",
  "report_type": "tax_strategy",
  "description": "Comprehensive tax optimization strategy for the year",
  "content": {
    "executive_summary": "...",
    "recommendations": [...],
    "estimated_savings": 50000
  }
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "team_id": "team-uuid",
  "created_by": "user-uuid",
  "title": "2024 Tax Strategy Analysis",
  "report_type": "tax_strategy",
  "status": "draft",
  "content": { ... },
  "created_at": "2024-01-15T10:30:00Z"
}
```

---

### GET /api/reports?team_id=uuid
List team reports.

**Query Parameters:**
- `team_id`: (required) Team ID
- `report_type`: Filter by type
- `status`: Filter by status (draft, review, finalized)
- `limit`: Pagination limit (default 20)
- `offset`: Pagination offset

**Response (200 OK):**
```json
{
  "reports": [
    {
      "id": "uuid",
      "title": "2024 Tax Strategy Analysis",
      "report_type": "tax_strategy",
      "status": "finalized",
      "created_by": { "name": "Jane Advisor" },
      "pdf_url": "https://storage.example.com/...",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### POST /api/reports/[reportId]/finalize
Finalize a report.

**Request:**
```json
{
  "pdf_url": "https://storage.example.com/report.pdf"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "status": "finalized",
  "pdf_url": "https://storage.example.com/report.pdf",
  "finalized_at": "2024-01-15T12:00:00Z"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error code",
  "message": "Human-readable error message",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| UNAUTHORIZED | 401 | Missing or invalid authentication |
| FORBIDDEN | 403 | User lacks permission for resource |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource already exists (e.g., duplicate email) |
| VALIDATION_ERROR | 400 | Invalid request data |
| RATE_LIMITED | 429 | Too many requests |
| SERVER_ERROR | 500 | Internal server error |

---

## Authentication

All endpoints except `/api/auth/signin`, `/api/auth/signup`, and `/api/auth/callback/google` require authentication.

**Methods:**

1. **Cookie-based (Recommended)**
   - Automatic with Supabase client
   - Stored as HTTP-only cookie

2. **Bearer Token**
   ```
   Authorization: Bearer <access_token>
   ```

---

## Rate Limiting

- Auth endpoints: 5 requests per minute per IP
- API endpoints: 100 requests per minute per user
- Document upload: 10 files per minute per user

---

## Pagination

List endpoints support pagination:

```
GET /api/documents?team_id=uuid&limit=20&offset=0
```

Response includes:
```json
{
  "items": [...],
  "total": 45,
  "limit": 20,
  "offset": 0,
  "hasMore": true
}
```

---

## WebHooks (Future)

Coming soon:
- Document reviewed event
- Consultation scheduled event
- Report finalized event
- Team member added event

---

## SDK Usage Examples

### Node.js / Browser

```javascript
import { supabase } from '@/lib/supabase'

// Sign up
const { user, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123',
})

// Sign in
const { session, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123',
})

// Create team
const { data, error } = await supabase
  .from('teams')
  .insert([{ name: 'Acme', owner_id: user.id }])

// List documents
const { data, error } = await supabase
  .from('documents')
  .select('*')
  .eq('team_id', teamId)
  .order('created_at', { ascending: false })
```

### React Hook

```typescript
import { useSupabaseAuth } from '@/lib/hooks/useSupabaseAuth'

export function MyComponent() {
  const { user, signInWithGoogle, signOut } = useSupabaseAuth()

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  )
}
```

---

## Support

For issues or questions:
1. Check DATABASE_GUIDE.md
2. Review SUPABASE_SETUP.md
3. Check Supabase documentation: https://supabase.com/docs
4. Open an issue on GitHub
