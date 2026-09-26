-- JNVST Class 9 Learning Hub: student accounts, cloud progress and privacy-conscious product analytics
-- Run this once in the Supabase SQL Editor.

create table if not exists public.student_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  analytics_consent boolean not null default false,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  first_utm_source text,
  first_utm_medium text,
  first_utm_campaign text,
  first_utm_content text,
  first_utm_term text,
  device_type text,
  constraint student_profiles_display_name_length check (display_name is null or char_length(display_name) between 1 and 100),
  constraint student_profiles_utm_length check (
    (first_utm_source is null or char_length(first_utm_source) <= 100)
    and (first_utm_medium is null or char_length(first_utm_medium) <= 100)
    and (first_utm_campaign is null or char_length(first_utm_campaign) <= 100)
    and (first_utm_content is null or char_length(first_utm_content) <= 100)
    and (first_utm_term is null or char_length(first_utm_term) <= 100)
  )
);

create table if not exists public.student_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint student_progress_object check (jsonb_typeof(progress) = 'object')
);

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  event_name text not null,
  route text,
  device_type text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  referrer_host text,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint analytics_event_name_allowed check (
    event_name in ('page_view','sign_up','login','lesson_opened','topic_opened','lesson_completed','question_attempted','questions_batch_attempted','mock_completed','lab_attempted')
  ),
  constraint analytics_route_length check (route is null or char_length(route) <= 200),
  constraint analytics_properties_object check (jsonb_typeof(properties) = 'object'),
  constraint analytics_device_type_allowed check (device_type is null or device_type in ('mobile','tablet','desktop'))
);

alter table public.student_profiles enable row level security;
alter table public.student_progress enable row level security;
alter table public.analytics_events enable row level security;

revoke all on table public.student_profiles from anon, authenticated;
revoke all on table public.student_progress from anon, authenticated;
revoke all on table public.analytics_events from anon, authenticated;

grant select, insert, update, delete on table public.student_profiles to authenticated;
grant select, insert, update, delete on table public.student_progress to authenticated;
grant insert, delete on table public.analytics_events to authenticated;

drop policy if exists "Students can read their own profile" on public.student_profiles;
create policy "Students can read their own profile" on public.student_profiles
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Students can create their own profile" on public.student_profiles;
create policy "Students can create their own profile" on public.student_profiles
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Students can update their own profile" on public.student_profiles;
create policy "Students can update their own profile" on public.student_profiles
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "Students can delete their own profile" on public.student_profiles;
create policy "Students can delete their own profile" on public.student_profiles
  for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Students can read their own progress" on public.student_progress;
create policy "Students can read their own progress" on public.student_progress
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Students can create their own progress" on public.student_progress;
create policy "Students can create their own progress" on public.student_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Students can update their own progress" on public.student_progress;
create policy "Students can update their own progress" on public.student_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "Students can delete their own progress" on public.student_progress;
create policy "Students can delete their own progress" on public.student_progress
  for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Students can create their own analytics events" on public.analytics_events;
create policy "Students can create their own analytics events" on public.analytics_events
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Students can delete their own analytics events" on public.analytics_events;
create policy "Students can delete their own analytics events" on public.analytics_events
  for delete to authenticated using ((select auth.uid()) = user_id);

create index if not exists student_progress_updated_at_idx on public.student_progress(updated_at desc);
create index if not exists analytics_events_created_at_idx on public.analytics_events(created_at desc);
create index if not exists analytics_events_event_name_idx on public.analytics_events(event_name);
create index if not exists analytics_events_user_id_idx on public.analytics_events(user_id);
create index if not exists analytics_events_campaign_idx on public.analytics_events(utm_source, utm_campaign);

comment on table public.student_profiles is 'Minimal account/profile data. Optional analytics consent controls product analytics and campaign attribution.';
comment on table public.analytics_events is 'Consent-gated product analytics. Do not store passwords, message content, exact location, DOB, phone numbers, school names, or other sensitive student data here.';


-- Student issue / mistake reports.
-- Reports are insert-only for students and are intentionally not readable from the public client.
create table if not exists public.student_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  report_type text not null,
  subject_id text,
  chapter_id text,
  topic_id text,
  question_id text,
  page_url text,
  source_page text not null default 'contact',
  description text not null,
  suggested_correction text,
  student_name text,
  contact_email text,
  device_type text,
  user_agent text,
  status text not null default 'new',
  admin_note text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  constraint student_reports_type_allowed check (
    report_type in ('wrong-question','wrong-answer','explanation-error','duplicate-question','typo','website-bug','login-progress','mobile-ui','other')
  ),
  constraint student_reports_description_length check (char_length(description) between 10 and 4000),
  constraint student_reports_correction_length check (suggested_correction is null or char_length(suggested_correction) <= 2500),
  constraint student_reports_name_length check (student_name is null or char_length(student_name) <= 100),
  constraint student_reports_email_length check (contact_email is null or char_length(contact_email) <= 160),
  constraint student_reports_question_id_length check (question_id is null or char_length(question_id) <= 120),
  constraint student_reports_page_url_length check (page_url is null or char_length(page_url) <= 500),
  constraint student_reports_source_page_length check (char_length(source_page) <= 80),
  constraint student_reports_device_type_allowed check (device_type is null or device_type in ('mobile','tablet','desktop')),
  constraint student_reports_status_allowed check (status in ('new','reviewing','fixed','rejected'))
);

alter table public.student_reports enable row level security;
revoke all on table public.student_reports from anon, authenticated;
grant insert on table public.student_reports to anon, authenticated;

drop policy if exists "Students can submit issue reports" on public.student_reports;
create policy "Students can submit issue reports" on public.student_reports
  for insert to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

create index if not exists student_reports_created_at_idx on public.student_reports(created_at desc);
create index if not exists student_reports_status_idx on public.student_reports(status);
create index if not exists student_reports_question_id_idx on public.student_reports(question_id);
create index if not exists student_reports_type_idx on public.student_reports(report_type);

comment on table public.student_reports is 'Student-submitted website/question issue reports. Public clients can insert but cannot read or enumerate reports.';
