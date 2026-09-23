# Supabase setup for JNVST Class 9

The app supports authenticated student accounts, cloud-saved progress, and optional consent-gated product analytics.

## What is stored

The student account uses Supabase Auth. The app syncs the complete learning ProgressState: lesson activity, question attempts, bookmarks, revision history, recently studied items, mock-test results, English lab attempts, and Hindi unseen-passage attempts.

## Growth data

With the student's optional analytics consent, the app records page views, learning milestones, practice activity, mock completion, device class, first-touch UTM source/medium/campaign, and referrer hostname.

The system deliberately does not collect phone numbers, exact location, date of birth, school name, passwords, or learning-question text for growth reporting.

Use supabase/growth.sql in the Supabase SQL Editor to create owner-facing growth views for student totals, daily engagement, and campaign attribution.

## Security

Run supabase/schema.sql. RLS is enabled for every exposed table. Students can only access their own profile/progress rows. Analytics events are client-insert only and are not readable by the authenticated client.

Keep the Supabase publishable key in the frontend only after RLS and grants are correctly configured. Never commit a service-role key.

## Promotion links

Use UTM tags on links you control, for example:

?utm_source=youtube&utm_medium=video&utm_campaign=jnvst_launch

The reporting view lets you compare campaign sources with students who actually complete a lesson or a mock, instead of only counting clicks.

## Test checklist

1. Run supabase/schema.sql.
2. Run supabase/growth.sql.
3. Configure VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY as GitHub Actions secrets.
4. Create a test account.
5. Complete a lesson, some questions, and a mock.
6. Verify the learning state appears in student_progress.
7. Verify consented events appear in analytics_events.
8. Query growth_overview, growth_daily_summary, and growth_campaign_summary.
9. Sign out and back in; verify progress remains.
10. Open the same account on another browser/device; verify the cloud progress loads.
11. Create a second account and verify the first account's progress is not visible.
