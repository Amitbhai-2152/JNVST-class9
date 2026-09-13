import type { Question } from "../../types";
import { createQuestion } from "../../utils/questionFactory";

export const scienceQuestions: Question[] = [
  createQuestion({
    id: "q_sci_seed_001",
    type: "mcq",
    subjectId: "sub_sci",
    chapterId: "chap_sci_01",
    topicId: "top_sci_01_01",
    textPlain: "दाब का SI मात्रक क्या है?",
    options: [
      { id: "opt_1", text: "न्यूटन" },
      { id: "opt_2", text: "पास्कल" },
      { id: "opt_3", text: "जूल" },
      { id: "opt_4", text: "वाट" }
    ],
    correctOptionIds: ["opt_2"],
    explanationPlain: "दाब का SI मात्रक पास्कल (Pa) है और 1 Pa = 1 N/m²।",
    difficulty: "easy",
    tags: ["बल तथा दाब"]
  })
];
