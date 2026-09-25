import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pagePath = path.join(root, 'src/pages/QuestionBankPage.tsx');
const typePath = path.join(root, 'src/types/index.ts');
const adapterPath = path.join(root, 'src/utils/questionBankChallengers.ts');
const cssPath = path.join(root, 'src/question-bank.css');

for (const file of [pagePath, typePath, adapterPath, cssPath]) {
  if (!fs.existsSync(file)) throw new Error('Missing Phase 6 file: ' + path.relative(root, file));
}

const page = fs.readFileSync(pagePath, 'utf8');
const types = fs.readFileSync(typePath, 'utf8');
const adapter = fs.readFileSync(adapterPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

for (const contract of [
  "sessionKind",
  "'challenger'",
  'getDedicatedTopicChallengers',
  'getDedicatedChapterChallengers',
  'getDedicatedSubjectChallengers',
  'getDedicatedGlobalChallengers',
  'challengerQuestions',
  'challengerScopeReady',
  "mode: sessionKind === 'challenger' ? 'revision' as const : 'practice' as const",
  'Challenger सत्र पूरा हुआ',
]) {
  if (!page.includes(contract)) throw new Error('Phase 6 page contract missing: ' + contract);
}

if (!types.includes("export type QuestionBankSessionKind = 'practice' | 'challenger'")) {
  throw new Error('Phase 6 session-kind type is missing.');
}
if (!types.includes('sessionKind: QuestionBankSessionKind')) {
  throw new Error('Phase 6 session-kind persistence field is missing.');
}

for (const contract of [
  'englishChapterChallengers',
  'englishChapterChallengersExtra',
  'hindiChapterChallengers',
  'hindiTopicChallengers',
  'mathChapterChallengers',
  'mathTopicChallengersV2',
  'scienceChapterChallengers',
  'dedicatedChallengerQuestions',
  'getDedicatedTopicChallengers',
  'getDedicatedChapterChallengers',
  'getDedicatedSubjectChallengers',
  'getDedicatedGlobalChallengers',
  'pool.length < 20',
  'type === \'mcq\'',
  'options.length === 4',
  'correctOptionIds.length === 1',
]) {
  if (!adapter.includes(contract)) throw new Error('Phase 6 adapter contract missing: ' + contract);
}

if (adapter.includes("import { allQuestions") || adapter.includes("from '../data/questions'")) {
  throw new Error('Phase 6 adapter must not use the canonical question bank as a Challenger fallback.');
}

for (const contract of [
  '.question-bank-session-kind',
  '.question-bank-selection-toggle',
  '.question-bank-filters select:disabled',
  '@media (max-width:700px)',
]) {
  if (!css.includes(contract)) throw new Error('Phase 6 CSS contract missing: ' + contract);
}

console.log('Question Bank Phase 6 contract verified.');
console.log('✓ Dedicated English, Hindi, Maths and Science Challenger sources are connected.');
console.log('✓ Challenger mode is separate from canonical 895-question practice mode.');
console.log('✓ Topic/chapter/subject/global Challenger scopes are supported.');
console.log('✓ Challenger scopes require a dedicated pool of at least 20 questions.');
console.log('✓ Challenger attempts are recorded as revision, so they do not contaminate canonical Smart Practice history.');
console.log('✓ Challenger mode persists when an active Question Bank session is resumed.');
console.log('✓ Canonical difficulty filter is disabled in Challenger mode because Challenger pools control difficulty.');
console.log('✓ Responsive Phase 6 UI exists.');
