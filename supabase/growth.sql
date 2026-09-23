create or replace view public.growth_overview
with (security_invoker = true)
as
select
  (select count(*) from public.student_profiles) as total_students,
  (select count(*) from public.student_profiles where first_seen_at >= now() - interval '7 days') as new_students_7d,
  (select count(distinct user_id) from public.analytics_events where created_at >= now() - interval '7 days') as active_students_7d,
  (select count(distinct user_id) from public.analytics_events where created_at >= now() - interval '30 days') as active_students_30d,
  (select count(*) from public.analytics_events where event_name = 'lesson_completed' and created_at >= now() - interval '30 days') as lessons_completed_30d,
  (select count(*) from public.analytics_events where event_name in ('question_attempted','questions_batch_attempted') and created_at >= now() - interval '30 days') as practice_events_30d,
  (select count(*) from public.analytics_events where event_name = 'mock_completed' and created_at >= now() - interval '30 days') as mocks_completed_30d;

create or replace view public.growth_daily_summary
with (security_invoker = true)
as
select
  date_trunc('day', created_at)::date as day,
  count(distinct user_id) as active_students,
  count(*) filter (where event_name = 'page_view') as page_views,
  count(*) filter (where event_name = 'lesson_completed') as lessons_completed,
  count(*) filter (where event_name in ('question_attempted','questions_batch_attempted')) as practice_events,
  count(*) filter (where event_name = 'mock_completed') as mocks_completed
from public.analytics_events
group by 1
order by 1 desc;

create or replace view public.growth_campaign_summary
with (security_invoker = true)
as
select
  coalesce(nullif(first_utm_source, ''), 'not_attributed') as source,
  coalesce(nullif(first_utm_medium, ''), 'not_attributed') as medium,
  coalesce(nullif(first_utm_campaign, ''), 'not_attributed') as campaign,
  count(*) as students,
  count(*) filter (where exists (
    select 1 from public.analytics_events e
    where e.user_id = student_profiles.user_id and e.event_name = 'lesson_completed'
  )) as students_with_completed_lesson,
  count(*) filter (where exists (
    select 1 from public.analytics_events e
    where e.user_id = student_profiles.user_id and e.event_name = 'mock_completed'
  )) as students_with_completed_mock
from public.student_profiles
group by 1,2,3
order by students desc, source, campaign;
