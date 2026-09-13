import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ID, ProgressState } from "../types";

type Store = ProgressState & {
  completeLesson: (id: ID, title: string) => void;
  markInProgress: (id: ID) => void;
  toggleBookmarkQuestion: (id: ID) => void;
  recordAttempt: (id: ID, selected: ID[], correct: boolean, mode?: "practice" | "mock-test" | "revision") => void;
  recordStudy: (id: ID, title: string, type: "lesson" | "topic") => void;
  saveMockResult: (id: ID, score: number, totalMarks: number) => void;
};

const initial: ProgressState = { lessonActivity: {}, questionAttempts: {}, bookmarks: { questionIds: [], lessonIds: [] }, revisionHistory: [], recentlyStudied: [], mockTestResults: [] };

export const useProgressStore = create<Store>()(persist((set) => ({
  ...initial,
  completeLesson: (id, title) => set((s) => ({
    lessonActivity: { ...s.lessonActivity, [id]: { status: "completed", lastAccessed: Date.now() } },
    recentlyStudied: ([{ id, title, type: "lesson", timestamp: Date.now() }, ...s.recentlyStudied.filter((x) => x.id !== id)].slice(0, 8)) as ProgressState["recentlyStudied"],
  })),
  markInProgress: (id) => set((s) => ({ lessonActivity: { ...s.lessonActivity, [id]: { status: "in-progress", lastAccessed: Date.now() } } })),
  toggleBookmarkQuestion: (id) => set((s) => ({ bookmarks: { ...s.bookmarks, questionIds: s.bookmarks.questionIds.includes(id) ? s.bookmarks.questionIds.filter((x) => x !== id) : [...s.bookmarks.questionIds, id] } })),
  recordAttempt: (id, selected, correct, mode = "practice") => set((s) => ({ questionAttempts: { ...s.questionAttempts, [id]: [...(s.questionAttempts[id] || []), { selectedOptionIds: selected, isCorrect: correct, timestamp: Date.now(), mode }] } })),
  recordStudy: (id, title, type) => set((s) => ({
    recentlyStudied: ([{ id, title, type, timestamp: Date.now() }, ...s.recentlyStudied.filter((x) => x.id !== id)].slice(0, 8)) as ProgressState["recentlyStudied"],
  })),
  saveMockResult: (id, score, totalMarks) => set((s) => {
    const latest = s.mockTestResults[0];
    if (latest?.id === id && latest.score === score && latest.totalMarks === totalMarks) return s;
    return { mockTestResults: [{ id, score, totalMarks, timestamp: Date.now() }, ...s.mockTestResults].slice(0, 20) };
  }),
}), { name: "jnvst-class9-progress" }));