import type { Question } from "../../types";
import { englishQuestions } from "./english";
import { hindiQuestions } from "./hindi";
import { mathQuestions } from "./math";
import { scienceQuestions } from "./science";

export const allQuestions: Question[] = [
  ...englishQuestions,
  ...hindiQuestions,
  ...mathQuestions,
  ...scienceQuestions,
];

export const getQuestion = (id: string) => allQuestions.find((q) => q.id === id);
export const getQuestionsByTopic = (topicId: string) => allQuestions.filter((q) => q.topicId === topicId);
export const getQuestionsBySubject = (subjectId: string) => allQuestions.filter((q) => q.subjectId === subjectId);
