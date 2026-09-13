import { generatedQuestions } from './generated';
export const mathQuestions = generatedQuestions.filter(q => q.subjectId === 'sub_math');
