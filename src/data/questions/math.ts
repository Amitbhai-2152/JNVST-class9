import type { Question } from "../../types";
import { createQuestion } from "../../utils/questionFactory";

export const mathQuestions: Question[] = [
  createQuestion({
    id: "q_math_seed_001",
    type: "mcq",
    subjectId: "sub_math",
    chapterId: "chap_math_01",
    topicId: "top_math_01_01",
    textPlain: "1/2 + 1/3 का मान क्या है?",
    options: [
      { id: "opt_1", text: "5/6" },
      { id: "opt_2", text: "2/5" },
      { id: "opt_3", text: "1/6" },
      { id: "opt_4", text: "3/5" }
    ],
    correctOptionIds: ["opt_1"],
    explanationPlain: "हर का LCM 6 है। इसलिए 1/2 = 3/6 और 1/3 = 2/6; योग 5/6 है।",
    difficulty: "easy",
    tags: ["परिमेय संख्याएँ"]
  })
];
