import type { Question } from '../../types';
import { mathQuestionsPart1 } from './mathPart1';
import { mathQuestionsPart2 } from './mathPart2';
import { mathQuestionsPart3 } from './mathPart3';
import { mathQuestionsPart4 } from './mathPart4';
import { mathQuestionsPart5 } from './mathPart5';

export const mathQuestions: Question[] = [
  ...mathQuestionsPart1,
  ...mathQuestionsPart2,
  ...mathQuestionsPart3,
  ...mathQuestionsPart4,
  ...mathQuestionsPart5,
];
