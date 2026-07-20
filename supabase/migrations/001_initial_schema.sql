-- Migration: Initial Schema Setup
-- This migration creates all tables and RLS policies for the Prism Equity Partners portal

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text not null,
  company_name text,
  role text default 'user',
  avatar_url text,
  phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Teams table
create table if not exists public.teams (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  owner_id uuid not null references public.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Team members
create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role text default 'member',
  created_at timestamp with time zone default now(),
  unique(team_id, user_id)
);

-- Documents
create table if not exists public.documents (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references public.teams(id) on delete cascade,
  uploaded_by uuid not null references public.users(id),
  name text not null,
  description text,
  file_url text not null,
  file_type text,
  file_size integer,
  category text,
  status text default 'pending',
  reviewed_by uuid references public.users(id),
  reviewed_at timestamp with time zone,
  review_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Consultations
create table if not exists public.consultations (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references public.teams(id) on delete cascade,
  requested_by uuid not null references public.users(id),
  advisor_id uuid references public.users(id),
  title text not null,
  description text,
  scheduled_at timestamp with time zone,
  duration_minutes integer default 60,
  status text default 'requested',
  meeting_link text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Consultation notes
create table if not exists public.consultation_notes (
  id uuid primary key default uuid_generate_v4(),
  consultation_id uuid not null references public.consultations(id) on delete cascade,
  created_by uuid not null references public.users(id),
  content text not null,
  action_items text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Reports
create table if not exists public.reports (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid not null references public.teams(id) on delete cascade,
  created_by uuid not null references public.users(id),
  title text not null,
  description text,
  report_type text,
  content jsonb,
  pdf_url text,
  status text default 'draft',
  reviewed_by uuid references public.users(id),
  reviewed_at timestamp with time zone,
  finalized_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Audit logs
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id),
  team_id uuid references public.teams(id),
  action text not null,
  table_name text not null,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  created_at timestamp with time zone default now()
);

-- Indexes
create index idx_users_email on public.users(email);
create index idx_teams_owner_id on public.teams(owner_id);
create index idx_team_members_team_id on public.team_members(team_id);
create index idx_team_members_user_id on public.team_members(user_id);
create index idx_documents_team_id on public.documents(team_id);
create index idx_documents_uploaded_by on public.documents(uploaded_by);
create index idx_documents_created_at on public.documents(created_at);
create index idx_consultations_team_id on public.consultations(team_id);
create index idx_consultations_status on public.consultations(status);
create index idx_consultations_scheduled_at on public.consultations(scheduled_at);
create index idx_reports_team_id on public.reports(team_id);
create index idx_reports_status on public.reports(status);
create index idx_audit_logs_user_id on public.audit_logs(user_id);
create index idx_audit_logs_team_id on public.audit_logs(team_id);

-- Enable RLS
alter table public.users enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.documents enable row level security;
alter table public.consultations enable row level security;
alter table public.consultation_notes enable row level security;
alter table public.reports enable row level security;
alter table public.audit_logs enable row level security;

-- RLS Policies
create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can read their teams"
  on public.teams for select
  using (
    owner_id = auth.uid()
    or exists (
      select 1 from public.team_members
      where team_id = id and user_id = auth.uid()
    )
  );

create policy "Team owners can insert"
  on public.teams for insert
  with check (owner_id = auth.uid());

create policy "Team owners can update"
  on public.teams for update
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "Team members can read members"
  on public.team_members for select
  using (
    exists (
      select 1 from public.teams
      where id = team_id
      and (owner_id = auth.uid() or exists (
        select 1 from public.team_members tm2
        where tm2.team_id = teams.id and tm2.user_id = auth.uid()
      ))
    )
  );

create policy "Team owners can manage members"
  on public.team_members for all
  using (
    exists (
      select 1 from public.teams
      where id = team_id and owner_id = auth.uid()
    )
  );

create policy "Team members can read documents"
  on public.documents for select
  using (
    exists (
      select 1 from public.team_members
      where team_id = documents.team_id and user_id = auth.uid()
    )
  );

create policy "Team members can upload documents"
  on public.documents for insert
  with check (
    uploaded_by = auth.uid()
    and exists (
      select 1 from public.team_members
      where team_id = documents.team_id and user_id = auth.uid()
    )
  );

create policy "Team members can read consultations"
  on public.consultations for select
  using (
    exists (
      select 1 from public.team_members
      where team_id = consultations.team_id and user_id = auth.uid()
    )
  );

create policy "Team members can book consultations"
  on public.consultations for insert
  with check (
    requested_by = auth.uid()
    and exists (
      select 1 from public.team_members
      where team_id = consultations.team_id and user_id = auth.uid()
    )
  );

create policy "Team members can read notes"
  on public.consultation_notes for select
  using (
    exists (
      select 1 from public.consultations c
      join public.team_members tm on tm.team_id = c.team_id
      where c.id = consultation_notes.consultation_id
      and tm.user_id = auth.uid()
    )
  );

create policy "Team members can read reports"
  on public.reports for select
  using (
    exists (
      select 1 from public.team_members
      where team_id = reports.team_id and user_id = auth.uid()
    )
  );

create policy "Advisors can create reports"
  on public.reports for insert
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.team_members
      where team_id = reports.team_id
      and user_id = auth.uid()
      and role in ('advisor', 'admin')
    )
  );
