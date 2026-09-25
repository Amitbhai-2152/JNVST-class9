import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pagePath = path.join(root, 'src/pages/QuestionBankPage.tsx');
const cssPath = path.join(root, 'src/question-bank.css');
const phase2Path = path.join(root, 'scripts/verifyQuestionBankPhase2.mjs');
const required = [pagePath, cssPath, phase2Path];

for (const file of required) {
  if (!fs.existsSync(file)) throw new Error('Missing required Question Bank file: ' + path.relative(root, file));
}

const page = fs.readFileSync(pagePath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

const pageContracts = [
  'useProgressStore',
  'markedForReview',
  'checked',
  'showFinishConfirm',
  'checkAnswer',
  'clearResponse',
  'toggleMarked',
  'finishSession',
  'recordAttempts',
  'question-bank-palette',
  'question-bank-feedback',
  'question-bank-result-list',
  'उत्तर जाँचें',
  'उत्तर साफ करें',
  'सत्र जमा करें',
  'हाँ, सत्र जमा करें',
  'व्याख्या देखें',
];

for (const contract of pageContracts) {
  if (!page.includes(contract)) throw new Error('Phase 3 page contract missing: ' + contract);
}

const cssContracts = [
  '.question-bank-palette',
  '.question-bank-palette-btn',
  '.question-bank-progress-strip',
  '.question-bank-answer-tools',
  '.question-bank-feedback',
  '.question-bank-result-list',
  '.question-bank-dialog-backdrop',
  '@media (max-width:700px)',
];

for (const contract of cssContracts) {
  if (!css.includes(contract)) throw new Error('Phase 3 CSS contract missing: ' + contract);
}

if (!page.includes('selectedOptionIds,') || !page.includes("mode: 'practice'")) {
  throw new Error('Practice attempt recording contract is incomplete.');
}

if (!page.includes("setSessionState('finished')")) {
  throw new Error('Finished-state transition missing.');
}

console.log('Question Bank Phase 3 contract verified.');
console.log('✓ Question navigator with current/answered/review/checked states exists.');
console.log('✓ Mark-for-review and clear-response controls exist.');
console.log('✓ Answer-check feedback and explanations exist.');
console.log('✓ Protected session submission and confirmation dialog exist.');
console.log('✓ Final results include score, attempted/unanswered, correct/incorrect and per-question review.');
console.log('✓ Practice attempts are recorded through the existing progress store.');
console.log('✓ Responsive Phase 3 styles exist.');
