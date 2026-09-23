import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ID, MockTestResult, ProgressState, QuestionAttempt, EnglishLabAttempt, HindiUnseenLabAttempt } from '../types';

type Store = ProgressState & {
  replaceProgress: (progress: ProgressState) => void;
  completeLesson: (id: ID, title: string) => void;
  markInProgress: (id: ID, title: string) => void;
  toggleBookmarkQuestion: (id: ID) => void;
  toggleBookmarkLesson: (id: ID) => void;
  recordAttempt: (id: ID, attempt: QuestionAttempt) => void;
  recordAttempts: (attempts: Array<{ id: ID; attempt: QuestionAttempt }>) => void;
  recordStudy: (id: ID, title: string, type: 'lesson' | 'topic') => void;
  saveMockResult: (result: MockTestResult) => void;
  recordEnglishLabAttempt: (id: ID, attempt: EnglishLabAttempt) => void;
  recordHindiUnseenAttempt: (id: ID, attempt: HindiUnseenLabAttempt) => void;
};

const recent = (current: ProgressState['recentlyStudied'], item: ProgressState['recentlyStudied'][number]) =>
  [item, ...current.filter((x) => x.id !== item.id)].slice(0, 8);

export const emptyProgressState: ProgressState = {
  lessonActivity: {},
  questionAttempts: {},
  bookmarks: { questionIds: [], lessonIds: [] },
  revisionHistory: [],
  recentlyStudied: [],
  mockTestResults: [],
  englishLabAttempts: {},
  hindiUnseenAttempts: {},
};

export const getProgressSnapshot = (): ProgressState => {
  const state = useProgressStore.getState();
  return {
    lessonActivity: state.lessonActivity ?? {},
    questionAttempts: state.questionAttempts ?? {},
    bookmarks: {
      questionIds: state.bookmarks?.questionIds ?? [],
      lessonIds: state.bookmarks?.lessonIds ?? [],
    },
    revisionHistory: state.revisionHistory ?? [],
    recentlyStudied: state.recentlyStudied ?? [],
    mockTestResults: state.mockTestResults ?? [],
    englishLabAttempts: state.englishLabAttempts ?? {},
    hindiUnseenAttempts: state.hindiUnseenAttempts ?? {},
  };
};

export const useProgressStore = create<Store>()(
  persist(
    (set) => ({
      ...emptyProgressState,
      replaceProgress: (nextProgress) => set(() => ({
        lessonActivity: nextProgress.lessonActivity ?? {},
        questionAttempts: nextProgress.questionAttempts ?? {},
        bookmarks: {
          questionIds: nextProgress.bookmarks?.questionIds ?? [],
          lessonIds: nextProgress.bookmarks?.lessonIds ?? [],
        },
        revisionHistory: nextProgress.revisionHistory ?? [],
        recentlyStudied: nextProgress.recentlyStudied ?? [],
        mockTestResults: nextProgress.mockTestResults ?? [],
        englishLabAttempts: nextProgress.englishLabAttempts ?? {},
        hindiUnseenAttempts: nextProgress.hindiUnseenAttempts ?? {},
      })),
      completeLesson: (id, title) => set((state) => ({
        lessonActivity: { ...state.lessonActivity, [id]: { status: 'completed', lastAccessed: Date.now() } },
        recentlyStudied: recent(state.recentlyStudied ?? [], { id, title, type: 'lesson', timestamp: Date.now() }),
        revisionHistory: [...(state.revisionHistory ?? []), { entityType: 'lesson', entityId: id, timestamp: Date.now() }],
      })),
      markInProgress: (id, title) => set((state) => ({
        lessonActivity: {
          ...(state.lessonActivity ?? {}),
          [id]: {
            status: state.lessonActivity?.[id]?.status === 'completed' ? 'completed' : 'in-progress',
            lastAccessed: Date.now(),
          },
        },
        recentlyStudied: recent(state.recentlyStudied ?? [], { id, title, type: 'lesson', timestamp: Date.now() }),
      })),
      toggleBookmarkQuestion: (id) => set((state) => {
        const bookmarks = state.bookmarks ?? { questionIds: [], lessonIds: [] };
        return { bookmarks: { ...bookmarks, questionIds: bookmarks.questionIds.includes(id) ? bookmarks.questionIds.filter((x) => x !== id) : [...bookmarks.questionIds, id] } };
      }),
      toggleBookmarkLesson: (id) => set((state) => {
        const bookmarks = state.bookmarks ?? { questionIds: [], lessonIds: [] };
        return { bookmarks: { ...bookmarks, lessonIds: bookmarks.lessonIds.includes(id) ? bookmarks.lessonIds.filter((x) => x !== id) : [...bookmarks.lessonIds, id] } };
      }),
      recordAttempt: (id, attempt) => set((state) => ({
        questionAttempts: { ...(state.questionAttempts ?? {}), [id]: [...(state.questionAttempts?.[id] ?? []), attempt] },
        revisionHistory: [...(state.revisionHistory ?? []), { entityType: 'question', entityId: id, timestamp: attempt.timestamp }],
      })),
      recordAttempts: (items) => set((state) => {
        const questionAttempts = { ...(state.questionAttempts ?? {}) };
        const history = [...(state.revisionHistory ?? [])];

        items.forEach(({ id, attempt }) => {
          questionAttempts[id] = [...(questionAttempts[id] ?? []), attempt];
          history.push({ entityType: 'question', entityId: id, timestamp: attempt.timestamp });
        });

        return { questionAttempts, revisionHistory: history };
      }),
      recordStudy: (id, title, type) => set((state) => ({
        recentlyStudied: recent(state.recentlyStudied ?? [], { id, title, type, timestamp: Date.now() }),
      })),
      saveMockResult: (result) => set((state) => ({
        mockTestResults: [result, ...(state.mockTestResults ?? []).filter((x) => x.id !== result.id)].slice(0, 20),
        revisionHistory: [...(state.revisionHistory ?? []), { entityType: 'mock-test', entityId: result.id, timestamp: result.timestamp }],
      })),
      recordEnglishLabAttempt: (id, attempt) => set((state) => ({
        englishLabAttempts: {
          ...(state.englishLabAttempts ?? {}),
          [id]: [...(state.englishLabAttempts?.[id] ?? []), attempt].slice(-30),
        },
      })),
      recordHindiUnseenAttempt: (id, attempt) => set((state) => ({
        hindiUnseenAttempts: {
          ...(state.hindiUnseenAttempts ?? {}),
          [id]: [...(state.hindiUnseenAttempts?.[id] ?? []), attempt].slice(-30),
        },
      })),
    }),
    {
      name: 'jnvst-class9-progress-v2',
      version: 4,
      migrate: (persistedState) => {
        const previous = (persistedState ?? {}) as Partial<ProgressState>;
        return {
          ...emptyProgressState,
          ...previous,
          lessonActivity: { ...emptyProgressState.lessonActivity, ...(previous.lessonActivity ?? {}) },
          questionAttempts: { ...emptyProgressState.questionAttempts, ...(previous.questionAttempts ?? {}) },
          bookmarks: {
            questionIds: previous.bookmarks?.questionIds ?? [],
            lessonIds: previous.bookmarks?.lessonIds ?? [],
          },
          revisionHistory: previous.revisionHistory ?? [],
          recentlyStudied: previous.recentlyStudied ?? [],
          mockTestResults: previous.mockTestResults ?? [],
          englishLabAttempts: previous.englishLabAttempts ?? {},
          hindiUnseenAttempts: previous.hindiUnseenAttempts ?? {},
        };
      },
    },
  ),
);
