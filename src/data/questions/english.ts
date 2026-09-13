import { generatedQuestions } from './generated';
export const englishQuestions = generatedQuestions.filter(q => q.subjectId === 'sub_eng');
