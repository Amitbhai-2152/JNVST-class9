import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');

const app = read('src/App.tsx');
const css = read('src/index.css');
const questionBankCss = read('src/question-bank.css');

const checks = [
  ['route scroll reset', app.includes('window.scrollTo({ top: 0, left: 0, behavior: \'auto\' })')],
  ['mobile menu aria-controls', app.includes('aria-controls="primary-navigation-panel"')],
  ['primary navigation panel id', app.includes('id="primary-navigation-panel"')],
  ['skip link', app.includes('className="skip-link"') && app.includes('id="main-content"')],
  ['question bank no stale phase label', !app.includes('QUESTION BANK • PHASE 6')],
  ['global horizontal overflow guard', css.includes('overflow-x: clip')],
  ['mobile touch interaction guard', css.includes('touch-action: manipulation')],
  ['mobile 820 breakpoint', css.includes('@media (max-width: 820px)')],
  ['mobile 560 breakpoint', css.includes('@media (max-width: 560px)')],
  ['narrow 390 breakpoint', css.includes('@media (max-width: 390px)')],
  ['mobile lesson single column', css.includes('.lesson-layout,\n  .science-study-layout,\n  .math-mock-layout,\n  .full-mock-layout,\n  .mock-body {\n    grid-template-columns: 1fr;')],
  ['mobile quiz action grid', css.includes('.quiz-actions {\n    display: grid;')],
  ['mobile answer target sizing', css.includes('.option {\n    min-height: 50px;')],
  ['question bank 16px select sizing', questionBankCss.includes('.question-bank-filters select {\n    min-height: 48px;\n    font-size: 16px;')],
  ['question bank mobile palette', questionBankCss.includes('.question-bank-palette-grid {\n    gap: 6px;')],
];

const failures = checks.filter(([, ok]) => !ok);
for (const [name, ok] of checks) {
  console.log((ok ? 'PASS' : 'FAIL') + ' — ' + name);
}

if (failures.length) {
  console.error('\nPhase 9 UX verification failed: ' + failures.map(([name]) => name).join(', '));
  process.exit(1);
}

console.log('\nPhase 9 UX verification passed: ' + checks.length + ' checks.');
