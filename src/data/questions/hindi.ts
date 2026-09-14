import { generatedQuestions } from './generated';

// Temporary stable fallback while the verified Hindi bank is assembled in full.
// Keeps the application buildable and prevents startup failure.
export const hindiQuestions = generatedQuestions.filter((q) => q.subjectId === 'sub_hin');
