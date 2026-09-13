import { generatedQuestions } from './generated';
export const scienceQuestions = generatedQuestions.filter(q => q.subjectId === 'sub_sci');
