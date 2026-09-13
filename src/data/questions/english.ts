import type { Question } from "../../types";
import { createQuestion } from "../../utils/questionFactory";

export const englishQuestions: Question[] = [
  createQuestion({
    id: "q_eng_seed_001",
    type: "mcq",
    subjectId: "sub_eng",
    chapterId: "chap_eng_01",
    topicId: "top_eng_01_01",
    textPlain: "Read the sentence: The sun rises in the east. Which tense is used?",
    options: [
      { id: "opt_1", text: "Simple Present" },
      { id: "opt_2", text: "Simple Past" },
      { id: "opt_3", text: "Present Continuous" },
      { id: "opt_4", text: "Simple Future" }
    ],
    correctOptionIds: ["opt_1"],
    explanationPlain: "The sentence states a general fact, so Simple Present is used.",
    difficulty: "easy",
    tags: ["tense"]
  })
];
