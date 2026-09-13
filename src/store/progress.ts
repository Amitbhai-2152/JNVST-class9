import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ID, MockTestResult, ProgressState, QuestionAttempt } from '../types';

type Store = ProgressState & {
  completeLesson: (id: ID, title: string) => void;
  markInProgress: (id: ID, title?: string) => void;
  toggleBookmarkQuestion: (id: ID) => void;
  toggleBookmarkLesson: (id: ID) => void;
  recordAttempt: (id: ID, attempt: QuestionAttempt) => void;
  recordStudy: (id: ID, title: string, type: 'lesson' | 'topic') => void;
  saveMockResult: (result: MockTestResult) => void;
};

const initial: ProgressState = {
  lessonActivity: {},
  questionAttempts: {},
  bookmarks: { questionIds: [], lessonIds: [] },
  revisionHistory: [],
  recentlyStudied: [],
  mockTestResults: [],
};

export const useProgressStore = create<Store>()(
  persist(
    (set) => ({
      ...initial,
      completeLesson: (id, title) =>
        set((s) => ({
          lessonActivity: {
            ...s.lessonActivity,
            [id]: { status: 'completed', lastAccessed: Date.now() },
          },
          recentlyStudied: [
            { id, title, type: 'lesson', timestamp: Date.now() },
            ...s.recentlyStudied.filter((x) => x.id !== id),
          ].slice(0, 8),
          revisionHistory: [
            ...s.revisionHistory,
            { entityType: 'lesson', entityId: id, timestamp: Date.now() },
          ].slice(-50),
        })),
      markInProgress: (id, title) =>
        set((s) => ({
          lessonActivity: {
            ...s.lessonActivity,
            [id]: {
              status: s.lessonActivity[id]?.status === 'completed' ? 'completed' : 'in-progress',
              lastAccessed: Date.now(),
            },
          },
          recentlyStudied: title
            ? [
                { id, title, type: 'lesson', timestamp: Date.now() },
                ...s.recentlyStudied.filter((x) => x.id !== id),
              ].slice(0, 8)
            : s.recentlyStudied,
        })),
      toggleBookmarkQuestion: (id) =>
        set((s) => ({
          bookmarks: {
            ...s.bookmarks,
            questionIds: s.bookmarks.questionIds.includes(id)
              ? s.bookmarks.questionIds.filter((x) => x !== id)
              : [...s.bookmarks.questionIds, id],
          },
        })),
      toggleBookmarkLesson: (id) =>
        set((s) => ({
          bookmarks: {
            ...s.bookmarks,
            lessonIds: s.bookmarks.lessonIds.includes(id)
              ? s.bookmarks.lessonIds.filter((x) => x !== id)
              : [...s.bookmarks.lessonIds, id],
          },
        })),
      recordAttempt: (id, attempt) =>
        set((s) => ({
          questionAttempts: {
            ...s.questionAttempts,
            [id]: [...(s.questionAttempts[id] || []), attempt],
          },
          revisionHistory: [
            ...s.revisionHistory,
            { entityType: 'question', entityId: id, timestamp: attempt.timestamp },
          ].slice(-100),
        })),
      recordStudy: (id, title, type) =>
        set((s) => ({
          recentlyStudied: [
            { id, title, type, timestamp: Date.now() },
            ...s.recentlyStudied.filter((x) => x.id !== id),
          ].slice(0, 8),
        })),
      saveMockResult: (result) =>
        set((s) => ({
          mockTestResults: [result, ...s.mockTestResults.filter((x) => x.timestamp !== result.timestamp)].slice(0, 20),
        })),
    }),
    { name: 'jnvst-class9-progress' },
  ),
);
