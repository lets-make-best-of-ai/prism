import { supabase, supabaseAdmin } from '@/lib/supabase'
import type { NextRequest } from 'next/server'

// Get user from request headers
export async function getUserFromRequest(request: NextRequest) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token)

  if (error || !user) {
    return null
  }

  return user
}

// Get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

// Create user profile (after signup)
export async function createUserProfile(
  userId: string,
  email: string,
  name: string,
  companyName?: string
) {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
        email,
        name,
        company_name: companyName,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Create team
export async function createTeam(ownerId: string, name: string, description?: string) {
  const { data, error } = await supabase
    .from('teams')
    .insert([
      {
        owner_id: ownerId,
        name,
        description,
      },
    ])
    .select()
    .single()

  if (error) throw error

  // Add owner as admin member
  await supabase.from('team_members').insert([
    {
      team_id: data.id,
      user_id: ownerId,
      role: 'admin',
    },
  ])

  return data
}

// Get user teams
export async function getUserTeams(userId: string) {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .or(`owner_id.eq.${userId},team_members.user_id.eq.${userId}`)

  if (error) throw error
  return data
}

// Add team member
export async function addTeamMember(teamId: string, userId: string, role: string = 'member') {
  const { data, error } = await supabase
    .from('team_members')
    .insert([
      {
        team_id: teamId,
        user_id: userId,
        role,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Get team members
export async function getTeamMembers(teamId: string) {
  const { data, error } = await supabase
    .from('team_members')
    .select('*, users(*)')
    .eq('team_id', teamId)

  if (error) throw error
  return data
}

// Upload document
export async function uploadDocument(
  teamId: string,
  uploadedBy: string,
  name: string,
  fileUrl: string,
  fileType: string,
  fileSize: number,
  category: string,
  description?: string
) {
  const { data, error } = await supabase
    .from('documents')
    .insert([
      {
        team_id: teamId,
        uploaded_by: uploadedBy,
        name,
        file_url: fileUrl,
        file_type: fileType,
        file_size: fileSize,
        category,
        description,
        status: 'pending',
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Get team documents
export async function getTeamDocuments(teamId: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*, uploaded_by:users(name, email), reviewed_by:users(name, email)')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Review document
export async function reviewDocument(
  documentId: string,
  reviewedBy: string,
  status: string,
  notes?: string
) {
  const { data, error } = await supabase
    .from('documents')
    .update({
      status,
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
      review_notes: notes,
    })
    .eq('id', documentId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Create consultation
export async function createConsultation(
  teamId: string,
  requestedBy: string,
  title: string,
  description?: string,
  advisorId?: string,
  scheduledAt?: string
) {
  const { data, error } = await supabase
    .from('consultations')
    .insert([
      {
        team_id: teamId,
        requested_by: requestedBy,
        title,
        description,
        advisor_id: advisorId,
        scheduled_at: scheduledAt,
        status: advisorId ? 'scheduled' : 'requested',
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Get team consultations
export async function getTeamConsultations(teamId: string) {
  const { data, error } = await supabase
    .from('consultations')
    .select('*, requested_by:users(name, email), advisor_id:users(name, email)')
    .eq('team_id', teamId)
    .order('scheduled_at', { ascending: false })

  if (error) throw error
  return data
}

// Create report
export async function createReport(
  teamId: string,
  createdBy: string,
  title: string,
  reportType: string,
  description?: string,
  content?: object
) {
  const { data, error } = await supabase
    .from('reports')
    .insert([
      {
        team_id: teamId,
        created_by: createdBy,
        title,
        description,
        report_type: reportType,
        content,
        status: 'draft',
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Get team reports
export async function getTeamReports(teamId: string) {
  const { data, error } = await supabase
    .from('reports')
    .select('*, created_by:users(name, email), reviewed_by:users(name, email)')
    .eq('team_id', teamId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Log audit event
export async function logAuditEvent(
  userId: string,
  action: string,
  tableName: string,
  recordId?: string,
  oldValues?: object,
  newValues?: object,
  teamId?: string,
  ipAddress?: string
) {
  const { error } = await supabaseAdmin
    .from('audit_logs')
    .insert([
      {
        user_id: userId,
        action,
        table_name: tableName,
        record_id: recordId,
        old_values: oldValues,
        new_values: newValues,
        team_id: teamId,
        ip_address: ipAddress,
      },
    ])

  if (error) {
    console.error('Failed to log audit event:', error)
  }
}
