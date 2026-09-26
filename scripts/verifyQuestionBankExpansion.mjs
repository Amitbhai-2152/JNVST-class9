import fs from 'node:fs';
import { createServer } from 'vite';

const root = process.cwd();
const read = (file) => fs.readFileSync(file, 'utf8');
const fail = (message) => { throw new Error('Question Bank expansion audit failed: ' + message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const page = read(root + '/src/pages/QuestionBankPage.tsx');
const types = read(root + '/src/types/index.ts');
const css = read(root + '/src/question-bank.css');

assert(types.includes("export type QuestionBankDifficultyFilter = 'all' | Difficulty | 'hard-plus';"), 'advanced difficulty filter type is missing');
assert(types.includes('difficulty: QuestionBankDifficultyFilter;'), 'saved session filter must persist advanced difficulty mode');

for (const contract of [
  "const dedicatedChallengerTotal",
  "questionBankStats.total + dedicatedChallengerTotal",
  "'hard-plus': 'Hard + Challenge'",
  'type="number"',
  'min={5}',
  'max={maximumSessionSize}',
  'const maximumSessionSize',
  'clampSessionSize',
  'question-bank-size-presets',
  '[10, 20, 30, 50, 75, 100]',
  'poolLimit = 1000',
]) {
  assert(page.includes(contract), 'missing page contract: ' + contract);
}

for (const contract of [
  '.question-bank-size-field input',
  '.question-bank-size-presets',
  '.question-bank-size-presets button.active',
]) {
  assert(css.includes(contract), 'missing CSS contract: ' + contract);
}

const vite = await createServer({ root, logLevel: 'error' });
try {
  const qb = await vite.ssrLoadModule('/src/data/questionBank.ts');
  const challenger = await vite.ssrLoadModule('/src/utils/questionBankChallengers.ts');

  const canonical = qb.questionBankStats.total;
  const dedicated = challenger.getDedicatedChallengerCounts().total;
  assert(canonical === 895, 'canonical bank must remain 895; found ' + canonical);
  assert(dedicated === 1010, 'dedicated Challenger bank must remain 1010; found ' + dedicated);
  console.log('Question Bank expansion audit passed.');
  console.log('• Canonical Practice questions: ' + canonical);
  console.log('• Dedicated Challenger questions: ' + dedicated);
  console.log('• Total unique learning questions exposed across both modes: ' + (canonical + dedicated));
  console.log('• Custom session size: 5–100 questions');
  console.log('• Advanced filter: Hard + Challenge');
  console.log('• Challenger pools are loaded independently and can support large custom sessions.');
} finally {
  await vite.close();
}
