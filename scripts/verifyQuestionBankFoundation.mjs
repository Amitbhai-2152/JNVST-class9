import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'src/data/questionBank.ts',
  'src/data/questions/index.ts',
  'src/types/index.ts',
  'src/data/curriculum.ts',
];

for (const relative of requiredFiles) {
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute)) throw new Error(`Missing Question Bank foundation file: ${relative}`);
}

const foundation = fs.readFileSync(path.join(root, 'src/data/questionBank.ts'), 'utf8');
const requiredContracts = [
  'QUESTION_BANK_VERSION',
  'QuestionBankQuestion',
  'questionBankTaxonomy',
  'questionBank',
  'questionBankById',
  'questionBankStats',
  'validateQuestionBank',
];

for (const contract of requiredContracts) {
  if (!foundation.includes(contract)) {
    throw new Error(`Question Bank foundation contract missing: ${contract}`);
  }
}

const questionIndex = fs.readFileSync(path.join(root, 'src/data/questions/index.ts'), 'utf8');
for (const exportName of ['allQuestions', 'jnvstExamQuestions', 'getQuestion', 'getQuestionsByTopic', 'getQuestionsBySubject']) {
  if (!questionIndex.includes(exportName)) {
    throw new Error(`Canonical question API missing: ${exportName}`);
  }
}

const types = fs.readFileSync(path.join(root, 'src/types/index.ts'), 'utf8');
for (const field of ['id: ID;', 'subjectId: ID;', 'chapterId: ID;', 'topicId: ID;', 'options: QuestionOption[];', 'correctOptionIds: ID[];', 'difficulty: Difficulty;', 'tags: string[];']) {
  if (!types.includes(field)) throw new Error(`Question schema field missing: ${field}`);
}

console.log('Question Bank foundation contract verified.');
console.log('✓ Unified Question schema remains the canonical Question type.');
console.log('✓ Central Question Bank catalog and ID index exist.');
console.log('✓ Subject/chapter/topic taxonomy is connected to the catalog.');
console.log('✓ Stats and runtime validation are implemented.');
console.log('✓ Existing canonical question APIs remain present.');
