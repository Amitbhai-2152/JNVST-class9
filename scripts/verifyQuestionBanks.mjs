import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const questionDir = path.join(root, 'src', 'data', 'questions');

// Only scan canonical question-bank sources. Aggregators (index.ts, hindi.ts,
// math.ts, science.ts) and legacy generated.ts must not be counted again.
const files = fs.readdirSync(questionDir).filter((file) =>
  file === 'english.ts' ||
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
const expected = { eng: 100, hin: 110, math: 110, sci: 170 };
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
}

for (const [subject, expectedCount] of Object.entries(expected)) {
  if (counts[subject] !== expectedCount) {
    throw new Error(`Question bank count mismatch for ${subject}: expected ${expectedCount}, found ${counts[subject]}`);
  }
}

const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
if (total !== 490) throw new Error(`Total question count mismatch: expected 490, found ${total}`);

console.log(`Question banks verified: ENG ${counts.eng}, HIN ${counts.hin}, MATH ${counts.math}, SCI ${counts.sci}, TOTAL ${total}`);
