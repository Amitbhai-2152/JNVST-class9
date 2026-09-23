import { Question } from '../../types';
import { hindiQuestionsPart1 } from './hindiPart1';
import { hindiQuestionsPart2 } from './hindiPart2';
import { hindiQuestionsPart3 } from './hindiPart3';
import { hindiQuestionsPart4 } from './hindiPart4';

export const hindiQuestions: Question[] = [
  ...hindiQuestionsPart1,
  ...hindiQuestionsPart2,
  ...hindiQuestionsPart3,
  ...hindiQuestionsPart4,
];
