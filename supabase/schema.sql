-- JNVST Class 9 Learning Hub: per-student cloud progress
-- Run this once in Supabase SQL Editor.

create table if not exists public.student_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint student_progress_object check (jsonb_typeof(progress) = 'object')
);

alter table public.student_progress enable row level security;

revoke all on table public.student_progress from anon, authenticated;
grant select, insert, update, delete on table public.student_progress to authenticated;

drop policy if exists "Students can read their own progress" on public.student_progress;
create policy "Students can read their own progress"
  on public.student_progress
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students can create their own progress" on public.student_progress;
create policy "Students can create their own progress"
  on public.student_progress
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Students can update their own progress" on public.student_progress;
create policy "Students can update their own progress"
  on public.student_progress
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Students can delete their own progress" on public.student_progress;
create policy "Students can delete their own progress"
  on public.student_progress
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create index if not exists student_progress_updated_at_idx
  on public.student_progress(updated_at desc);
