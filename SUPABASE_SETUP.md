# Supabase setup for JNVST Class 9

The app supports authenticated student accounts, cloud-saved progress, and optional consent-gated product analytics.

## Student account and progress

Supabase Auth handles the account. The app syncs the complete learning ProgressState to the student's own row in student_progress. Existing local progress is merged on first login so it is not blindly overwritten.

## Growth data collected only after optional analytics consent

The app can record page views, lesson/topic opens, lesson completion, practice activity, mock completion, lab usage, device class, referrer hostname, and first-touch UTM attribution.

UTM attribution includes:
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

Example promotion link:
?utm_source=youtube&utm_medium=video&utm_campaign=jnvst_launch&utm_content=short_01

This lets you compare promotion sources and individual campaign creatives against students who actually complete a lesson or mock.

The app deliberately does not collect phone numbers, exact location, DOB, school name, passwords, or question text for growth reporting.

## Security

Run supabase/schema.sql. RLS is enabled on every exposed table. Students can only access their own profile/progress rows. Analytics events are insert-only for normal use and are not readable by the authenticated client; when analytics is turned off, the student's previously stored analytics events are removed.

Run supabase/growth.sql as the project owner/admin. The growth views are not granted to authenticated users.

Never put a service-role key in the frontend.

## Growth metrics

growth_overview provides total students, new students, recently logged-in students, analytics opt-in count, and recent learning-event totals.

growth_daily_summary provides analytics-consenting engagement by day.

growth_campaign_summary provides first-touch campaign/content attribution and the number of attributed students who completed a lesson or a mock.

## GitHub Actions

Configure these repository secrets:
- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY

## Final test

1. Run supabase/schema.sql.
2. Run supabase/growth.sql.
3. Configure the GitHub Actions secrets.
4. Create a test account.
5. Test both analytics OFF and ON.
6. With analytics ON, complete a lesson, answer questions, and finish a mock.
7. Verify student_progress contains the learning state.
8. Verify analytics_events contains only the allowed event names.
9. Verify growth_* views return expected aggregate data.
10. Turn analytics OFF and verify the student's analytics events are deleted.
11. Sign out/in and verify progress remains.
12. Open the same account on a second device/browser and verify progress loads.
13. Create another account and verify accounts cannot read one another's progress.
