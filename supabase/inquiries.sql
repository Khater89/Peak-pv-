-- Inquiries table for INQUIRY_STORE=supabase.
-- Inserts come only from the Next.js server using the service-role key;
-- RLS stays enabled with no public policies, so anon/browser clients cannot read or write.
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  name text not null,
  phone text not null,
  email text not null,
  company text,
  project_type text not null,
  service_interest text not null,
  location text,
  message text,
  source_page text,
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
