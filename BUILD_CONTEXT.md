# JNVST Class 9 Learning Hub — Build Context

This repository is being built as a production-style Class 9 JNVST lateral-entry learning hub.

## Locked priorities
- Accuracy > quantity
- Reliability > flashy features
- Student experience > decoration
- Verified content > AI guessing
- Preserve locked question content unless a substantive defect is proven

## Locked question-bank totals
English 100 + Hindi 110 + Mathematics 110 + Science 170 = 490.

## Main product flow
Dashboard → Subject → Chapter → Topic → Lesson / Practice → Result → Revision.

## Practice requirements
Topic practice, mixed practice, wrong-answer revision, bookmarks, immediate explanations, progress and difficulty-aware questions.

## Mock-test requirements
JNVST-style 100-question / 100-mark / 150-minute full test, palette, flags, navigation, manual submit, auto-submit, scoring, persistence, result analysis, answer review and retry.

## Architecture constraints
No backend/auth/database in first version. Use the existing React + TypeScript + React Router + Zustand + LocalStorage architecture. Avoid unnecessary architectural redesign.

## Current urgent issue
The live site was previously stuck on the initial loading fallback. The build/deployment pipeline must be verified end-to-end so the browser receives the actual compiled application.
