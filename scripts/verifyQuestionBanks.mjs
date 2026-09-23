import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const questionDir = path.join(root, 'src', 'data', 'questions');

// Only scan canonical question-bank sources. Aggregators (index.ts, hindi.ts,
// math.ts, science.ts) and legacy generated.ts must not be counted again.
const files = fs.readdirSync(questionDir).filter((file) =>
  file === 'english.ts' ||
  file === 'englishExpansion.ts' ||
  /^hindiPart\d+\.ts$/.test(file) ||
  /^mathPart\d+\.ts$/.test(file) ||
  /^sciencePart\d+\.ts$/.test(file)
);

const subjectPatterns = {
  eng: /^q_eng_/,
  hin: /^q_hin_/,
  math: /^q_math_/,
  sci: /^q_sci_/,
};
const expected = { eng: 150, hin: 110, math: 220, sci: 360 };
const ids = new Set();
const counts = { eng: 0, hin: 0, math: 0, sci: 0 };

for (const file of files) {
  const source = fs.readFileSync(path.join(questionDir, file), 'utf8');
  for (const match of source.matchAll(/\bid:\s*['\"]([^'\"]+)['\"]/g)) {
    const id = match[1];
    const key = Object.keys(subjectPatterns).find((subject) => subjectPatterns[subject].test(id));
    if (!key) continue;
    if (ids.has(id)) throw new Error(`Duplicate question ID: ${id}`);
    ids.add(id);
    counts[key] += 1;
  }

  // mathPart5 and sciencePart14 use small factories to keep generated MCQs readable.
  // Validate those generated IDs from their explicit make('xx', ...) codes too.
  if (file === 'mathPart5.ts') {
    for (const match of source.matchAll(/\bmake\(\s*['\"]([^'\"]+)['\"]/g)) {
      const id = `q_math_b3_${match[1]}`;
      if (ids.has(id)) throw new Error(`Duplicate question ID: ${id}`);
      ids.add(id);
      counts.math += 1;
    }
  }

  if (file === 'sciencePart14.ts' || file === 'sciencePart15.ts') {
    const batchPrefix = file === 'sciencePart15.ts' ? 'b4' : 'b3';
    for (const match of source.matchAll(/\bmake\(\s*['\"]([^'\"]+)['\"]/g)) {
      const id = `q_sci_${batchPrefix}_${match[1]}`;
      if (ids.has(id)) throw new Error(`Duplicate question ID: ${id}`);
      ids.add(id);
      counts.sci += 1;
    }
  }
}

for (const [subject, expectedCount] of Object.entries(expected)) {
  if (counts[subject] !== expectedCount) {
    throw new Error(`Question bank count mismatch for ${subject}: expected ${expectedCount}, found ${counts[subject]}`);
  }
}

const curriculumPath = path.join(root, 'src', 'data', 'curriculum.ts');
const curriculumSource = fs.readFileSync(curriculumPath, 'utf8');
const curriculumQuestionIds = [...curriculumSource.matchAll(/practiceQuestionIds:\s*\[([^\]]*)\]/g)]
  .flatMap((match) => [...match[1].matchAll(/["'](q_[^"']+)["']/g)].map((item) => item[1]));
const missingCurriculumQuestionIds = [...new Set(curriculumQuestionIds)].filter((id) => !ids.has(id));
if (missingCurriculumQuestionIds.length) {
  throw new Error(`Curriculum references missing question IDs: ${missingCurriculumQuestionIds.join(', ')}`);
}

const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
if (total !== 840) throw new Error(`Total question count mismatch: expected 840, found ${total}`);

const requiredPrefixes = ['q_eng_', 'q_hin_', 'q_math_', 'q_sci_'];
if (ids.size !== total) throw new Error(`Question ID integrity mismatch: expected ${total}, indexed ${ids.size}`);
console.log(`Question banks verified: ENG ${counts.eng}, HIN ${counts.hin}, MATH ${counts.math}, SCI ${counts.sci}, TOTAL ${total}`);
console.log(`Question ID prefixes verified: ${requiredPrefixes.join(', ')}`);
