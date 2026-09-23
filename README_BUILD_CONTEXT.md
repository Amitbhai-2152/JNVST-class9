# JNVST Class 9 Learning Hub — Product Context

This repository implements a Class 9 JNVST lateral-entry learning hub.

## Locked product goals
- Accuracy > quantity
- Reliability > flashy features
- Student experience > decoration
- Verified content > AI guessing
- Preserve locked question content unless a substantive error is proven

## Locked bank size
English 100 + Hindi 110 + Mathematics 110 + Science 170 = 490 questions.

## Student flow
Dashboard → Subject → Chapter → Topic → Lesson / Practice → Result → Revision.

## Practice
Topic, mixed, wrong-answer revision, bookmarks, explanations, progress and difficulty-aware practice.

## Mock test
100 questions, 100 marks, 150 minutes; palette, flags, navigation, submit/timeout, scoring, persistence, results, review and retry.

## Technical constraints
React + TypeScript + React Router + Zustand + LocalStorage. No backend/auth/database for v1. Avoid unnecessary architectural redesign.

## Release rule
The live deployment must render the compiled application rather than the static loading fallback, and production build/deployment must be verified before declaring the site ready.
