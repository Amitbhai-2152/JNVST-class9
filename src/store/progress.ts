import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ID, MockTestResult, ProgressState, QuestionAttempt } from '../types';

type Store = ProgressState & {
  completeLesson: (id: ID, title: string) => void;
  markInProgress: (id: ID, title: string) => void;
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

const recent = (current: ProgressState['recentlyStudied'], item: ProgressState['recentlyStudied'][number]) =>
  [item, ...current.filter((x) => x.id !== item.id)].slice(0, 8);

export const useProgressStore = create<Store>()(
  persist(
    (set) => ({
      ...initial,
      completeLesson: (id, title) => set((state) => ({
        lessonActivity: { ...state.lessonActivity, [id]: { status: 'completed', lastAccessed: Date.now() } },
        recentlyStudied: recent(state.recentlyStudied, { id, title, type: 'lesson', timestamp: Date.now() }),
        revisionHistory: [...state.revisionHistory, { entityType: 'lesson', entityId: id, timestamp: Date.now() }],
      })),
      markInProgress: (id, title) => set((state) => ({
        lessonActivity: {
          ...state.lessonActivity,
          [id]: {
            status: state.lessonActivity[id]?.status === 'completed' ? 'completed' : 'in-progress',
            lastAccessed: Date.now(),
          },
        },
        recentlyStudied: recent(state.recentlyStudied, { id, title, type: 'lesson', timestamp: Date.now() }),
      })),
      toggleBookmarkQuestion: (id) => set((state) => ({
        bookmarks: {
          ...state.bookmarks,
          questionIds: state.bookmarks.questionIds.includes(id)
            ? state.bookmarks.questionIds.filter((x) => x !== id)
            : [...state.bookmarks.questionIds, id],
        },
      })),
      toggleBookmarkLesson: (id) => set((state) => ({
        bookmarks: {
          ...state.bookmarks,
          lessonIds: state.bookmarks.lessonIds.includes(id)
            ? state.bookmarks.lessonIds.filter((x) => x !== id)
            : [...state.bookmarks.lessonIds, id],
        },
      })),
      recordAttempt: (id, attempt) => set((state) => ({
        questionAttempts: { ...state.questionAttempts, [id]: [...(state.questionAttempts[id] ?? []), attempt] },
        revisionHistory: [...state.revisionHistory, { entityType: 'question', entityId: id, timestamp: attempt.timestamp }],
      })),
      recordStudy: (id, title, type) => set((state) => ({
        recentlyStudied: recent(state.recentlyStudied, { id, title, type, timestamp: Date.now() }),
      })),
      saveMockResult: (result) => set((state) => ({
        mockTestResults: [result, ...state.mockTestResults.filter((x) => x.id !== result.id)].slice(0, 20),
        revisionHistory: [...state.revisionHistory, { entityType: 'mock-test', entityId: result.id, timestamp: result.timestamp }],
      })),
    }),
    { name: 'jnvst-class9-progress' },
  ),
);
