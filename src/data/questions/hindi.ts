import type { Question } from "../../types";
import { createQuestion } from "../../utils/questionFactory";

export const hindiQuestions: Question[] = [
  createQuestion({
    id: "q_hin_seed_001",
    type: "mcq",
    subjectId: "sub_hin",
    chapterId: "chap_hin_01",
    topicId: "top_hin_01_01",
    textPlain: "‘विद्यालय’ शब्द की शुद्ध वर्तनी चुनिए।",
    options: [
      { id: "opt_1", text: "विद्यालय" },
      { id: "opt_2", text: "विध्यालय" },
      { id: "opt_3", text: "विदयालय" },
      { id: "opt_4", text: "विद्धालय" }
    ],
    correctOptionIds: ["opt_1"],
    explanationPlain: "‘विद्यालय’ मानक और शुद्ध वर्तनी है।",
    difficulty: "easy",
    tags: ["वर्तनी"]
  })
];
