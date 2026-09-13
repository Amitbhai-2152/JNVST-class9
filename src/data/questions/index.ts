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

const counts = {
  sub_eng: englishQuestions.length,
  sub_hin: hindiQuestions.length,
  sub_math: mathQuestions.length,
  sub_sci: scienceQuestions.length,
};
if (counts.sub_eng !== 100 || counts.sub_hin !== 110 || counts.sub_math !== 110 || counts.sub_sci !== 170 || allQuestions.length !== 490) {
  throw new Error(`Question bank integrity check failed: ${JSON.stringify(counts)} total=${allQuestions.length}`);
}

export const getQuestion = (id: string) => allQuestions.find((q) => q.id === id);
export const getQuestionsByTopic = (topicId: string) => allQuestions.filter((q) => q.topicId === topicId);
export const getQuestionsBySubject = (subjectId: string) => allQuestions.filter((q) => q.subjectId === subjectId);
