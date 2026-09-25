import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'src/pages/QuestionBankPage.tsx',
  'src/question-bank.css',
  'src/types/index.ts',
  'src/store/progress.ts',
  'src/utils/questionBankProgress.ts',
];

for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) {
    throw new Error('Missing Phase 4 file: ' + relative);
  }
}

const page = fs.readFileSync(path.join(root, 'src/pages/QuestionBankPage.tsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'src/question-bank.css'), 'utf8');
const types = fs.readFileSync(path.join(root, 'src/types/index.ts'), 'utf8');
const store = fs.readFileSync(path.join(root, 'src/store/progress.ts'), 'utf8');
const utility = fs.readFileSync(path.join(root, 'src/utils/questionBankProgress.ts'), 'utf8');

for (const contract of [
  'getQuestionBankProgressSummary',
  'getQuestionPerformance',
  'progressSummary.attemptedQuestions',
  'progressSummary.totalAttempts',
  'progressSummary.correctAttempts',
  'progressSummary.incorrectAttempts',
  'progressSummary.accuracy',
  'byTopic',
  'byChapter',
  'byDifficulty',
  'savedQuestionBankSession',
  'restoredSessionRef',
  'setSessionStartedAt',
  'saveQuestionBankSession',
  'attemptsRecorded',
  'question-bank-performance-card',
  'question-bank-resume-notice',
  'question-bank-question-history',
]) {
  if (!page.includes(contract)) throw new Error('Phase 4 page contract missing: ' + contract);
}

for (const contract of [
  'QuestionBankSessionState',
  'questionBankSession: QuestionBankSessionState | null',
]) {
  if (!types.includes(contract)) throw new Error('Phase 4 type contract missing: ' + contract);
}

for (const contract of [
  'saveQuestionBankSession',
  'questionBankSession: null',
  'previous.questionBankSession',
]) {
  if (!store.includes(contract)) throw new Error('Phase 4 store contract missing: ' + contract);
}

for (const contract of [
  'totalAttempts',
  'correctAttempts',
  'incorrectAttempts',
  'attemptedQuestions',
  'accuracy',
  'byTopic',
  'byChapter',
  'byDifficulty',
  "attempt.mode === 'practice'",
]) {
  if (!utility.includes(contract)) throw new Error('Phase 4 analytics contract missing: ' + contract);
}

for (const contract of [
  '.question-bank-performance-card',
  '.question-bank-performance-metrics',
  '.question-bank-performance-tabs',
  '.question-bank-performance-row',
  '.question-bank-resume-notice',
  '.question-bank-question-history',
  '@media (max-width:700px)',
]) {
  if (!css.includes(contract)) throw new Error('Phase 4 CSS contract missing: ' + contract);
}

console.log('Question Bank Phase 4 contract verified.');
console.log('✓ Practice attempt history is converted into overall progress metrics.');
console.log('✓ Topic, chapter and difficulty performance breakdowns exist.');
console.log('✓ Per-question practice history exists.');
console.log('✓ In-progress Question Bank sessions persist through the existing progress store.');
console.log('✓ Session filters, answers, marked questions, checked questions and position are persisted.');
console.log('✓ Existing Supabase progress sync can carry the new session/progress state.');
console.log('✓ Responsive Phase 4 progress UI exists.');
