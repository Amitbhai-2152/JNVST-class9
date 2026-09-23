# Supabase setup for JNVST Class 9

This project now supports authenticated student accounts with cloud-saved progress.

## What is stored

The app syncs the complete ProgressState, including lesson activity, question attempts, bookmarks, revision history, recently studied items, mock-test results, English lab attempts, and Hindi unseen-passage attempts.

The browser keeps the existing Zustand/Local Storage cache for resilience. On first login, local progress is merged with the cloud record instead of blindly overwriting either side.

## 1. Create a Supabase project

Create a project at Supabase and open its SQL Editor.

## 2. Create the progress table

Run supabase/schema.sql.

The table has one row per authenticated user. Row Level Security is enabled and every select/insert/update/delete policy checks auth.uid() = user_id.

Do not put a service-role key in this frontend repository. The frontend only needs the browser-safe publishable key.

## 3. Configure email authentication

In Supabase Authentication settings, enable Email provider. Keep email confirmation on if you want students to confirm ownership of their email address.

The app supports email + password sign up and login.

## 4. Configure GitHub Actions

Add these repository secrets:

- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY

The Pages build reads them at build time. Do not commit the real key to the repository.

## 5. Test

1. Open the site and create a student account.
2. Complete a lesson and answer a few questions.
3. Refresh the page and confirm the progress remains.
4. Sign out and sign in again.
5. Open the same account on another browser/device and confirm the same cloud progress loads.

The existing local progress on the first device is imported into the account during the first authenticated load.
