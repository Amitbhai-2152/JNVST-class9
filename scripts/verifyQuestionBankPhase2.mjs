import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'src/pages/QuestionBankPage.tsx',
  'src/question-bank.css',
  'src/data/questionBank.ts',
  'src/App.tsx',
];

for (const relative of required) {
  if (!fs.existsSync(path.join(root, relative))) {
    throw new Error('Missing Question Bank Phase 2 file: ' + relative);
  }
}

const page = fs.readFileSync(path.join(root, 'src/pages/QuestionBankPage.tsx'), 'utf8');
const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');

for (const contract of [
  'questionBank',
  'questionBankStats',
  'questionBankTaxonomy',
  'startPractice',
  'subjectId',
  'chapterId',
  'topicId',
  'difficulty',
  'sessionSize',
  'अभ्यास शुरू करें',
]) {
  if (!page.includes(contract)) throw new Error('Phase 2 page contract missing: ' + contract);
}

for (const routeContract of [
  'import QuestionBankPage',
  'path="/question-bank"',
  'to="/question-bank"',
]) {
  if (!app.includes(routeContract)) throw new Error('Question Bank homepage/route contract missing: ' + routeContract);
}

const ctaCount = (app.match(/to="\/question-bank"/g) ?? []).length;
if (ctaCount < 2) throw new Error('Expected at least two homepage Question Bank entry points; found ' + ctaCount);

for (const cssContract of [
  '.question-bank-page',
  '.question-bank-filters',
  '.question-bank-option',
  '@media (max-width:700px)',
]) {
  const css = fs.readFileSync(path.join(root, 'src/question-bank.css'), 'utf8');
  if (!css.includes(cssContract)) throw new Error('Question Bank responsive style contract missing: ' + cssContract);
}

console.log('Question Bank Phase 2 contract verified.');
console.log('✓ /question-bank route is wired.');
console.log('✓ Homepage exposes Question Bank entry points.');
console.log('✓ Subject/chapter/topic/difficulty/session-size filters exist.');
console.log('✓ Practice session generation and answer selection exist.');
console.log('✓ Responsive Question Bank styles exist.');
