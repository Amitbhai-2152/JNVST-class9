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

// Never crash the entire app because of a content-count mismatch.
// Keep the integrity check visible in the console so content issues can be fixed
// without turning the UI into a blank screen.
if (counts.sub_eng !== 100 || counts.sub_hin !== 110 || counts.sub_math !== 110 || counts.sub_sci !== 170 || allQuestions.length !== 490) {
  console.error("Question bank integrity check failed", { counts, total: allQuestions.length });
}

export const getQuestion = (id: string) => allQuestions.find((q) => q.id === id);
export const getQuestionsByTopic = (topicId: string) => allQuestions.filter((q) => q.topicId === topicId);
export const getQuestionsBySubject = (subjectId: string) => allQuestions.filter((q) => q.subjectId === subjectId);
