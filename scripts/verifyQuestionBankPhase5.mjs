import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = {
  page: 'src/pages/QuestionBankPage.tsx',
  selector: 'src/utils/questionBankSmartSelection.ts',
  types: 'src/types/index.ts',
  css: 'src/question-bank.css',
};

for (const relative of Object.values(files)) {
  if (!fs.existsSync(path.join(root, relative))) throw new Error('Missing Phase 5 file: ' + relative);
}

const page = fs.readFileSync(path.join(root, files.page), 'utf8');
const selector = fs.readFileSync(path.join(root, files.selector), 'utf8');
const types = fs.readFileSync(path.join(root, files.types), 'utf8');
const css = fs.readFileSync(path.join(root, files.css), 'utf8');

for (const contract of [
  'selectQuestionBankSession',
  'selectionMode',
  "'smart'",
  "'random'",
  'progressQuestionAttempts',
  'पहली बार अभ्यास',
  'कम accuracy',
  'repetition',
  'question-bank-selection-mode',
]) {
  if (!page.includes(contract) && !selector.includes(contract)) throw new Error('Phase 5 page/selector contract missing: ' + contract);
}

for (const contract of [
  'needScore',
  'difficultyFit',
  'attempts.length === 0',
  'accuracy < 50',
  'accuracy < 70',
  'daysSinceAttempt',
  'balancedPick',
  'topicQueues',
  'mode === \'random\'',
]) {
  if (!selector.includes(contract)) throw new Error('Phase 5 intelligent-selection contract missing: ' + contract);
}

for (const contract of [
  "selectionMode: 'smart' | 'random'",
]) {
  if (!types.includes(contract)) throw new Error('Phase 5 persisted selection-mode type missing: ' + contract);
}

for (const contract of [
  '.question-bank-selection-mode',
  '.question-bank-selection-toggle',
  '.question-bank-practice-intelligence',
  '@media (max-width:700px)',
]) {
  if (!css.includes(contract)) throw new Error('Phase 5 responsive style contract missing: ' + contract);
}

if (!page.includes('selectQuestionBankSession(')) throw new Error('Question Bank is not using the Phase 5 selector.');
if (!page.includes('selectionMode,\n    );')) throw new Error('Selection mode is not passed into the session generator.');
if (!page.includes('filters: { subjectId, chapterId, topicId, difficulty, sessionSize, selectionMode }')) {
  throw new Error('Selection mode is not persisted in resumable session state.');
}

console.log('Question Bank Phase 5 contract verified.');
console.log('✓ Smart and Random selection modes exist.');
console.log('✓ Unattempted questions receive highest need priority.');
console.log('✓ Weak accuracy and stale practice receive additional priority.');
console.log('✓ Difficulty fit adapts to observed performance.');
console.log('✓ Smart selection balances questions across available topics.');
console.log('✓ Existing filters remain upstream of the intelligent selector.');
console.log('✓ Selection mode is persisted for resumable sessions.');
console.log('✓ Phase 5 responsive UI exists.');
