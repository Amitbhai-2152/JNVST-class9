import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const englishSource = fs.readFileSync(path.join(root, 'src', 'data', 'questions', 'english.ts'), 'utf8');
const challengerSource = fs.readFileSync(path.join(root, 'src', 'data', 'questions', 'englishChallengers.ts'), 'utf8');
const labSource = fs.readFileSync(path.join(root, 'src', 'data', 'englishLabs.ts'), 'utf8');

const assert = (condition, message) => {
  if (!condition) throw new Error('English mastery audit failed: ' + message);
};

const extractCreateQuestionBlocks = (source) => {
  const blocks = [];
  const marker = 'createQuestion({';
  let cursor = 0;
  while (true) {
    const start = source.indexOf(marker, cursor);
    if (start < 0) break;
    let depth = 0;
    let inString = false;
    let quote = '';
    let escaped = false;
    let end = -1;
    for (let i = start + marker.length - 1; i < source.length; i += 1) {
      const char = source[i];
      if (inString) {
        if (escaped) escaped = false;
        else if (char === '\\') escaped = true;
        else if (char === quote) inString = false;
        continue;
      }
      if (char === "'" || char === '"' || char === '`') {
        inString = true;
        quote = char;
        continue;
      }
      if (char === '{') depth += 1;
      if (char === '}') {
        depth -= 1;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end < 0) break;
    blocks.push(source.slice(start, end + 1));
    cursor = end + 1;
  }
  return blocks;
};

const blocks = extractCreateQuestionBlocks(englishSource);
assert(blocks.length >= 100, 'expected at least 100 English createQuestion records, found ' + blocks.length);

const chapterCounts = new Map();
const eligibleByChapter = new Map();
const ids = new Set();

for (const block of blocks) {
  const id = block.match(/\bid:\s*['"]([^'"]+)['"]/)?.[1];
  const chapterId = block.match(/\bchapterId:\s*['"]([^'"]+)['"]/)?.[1];
  const type = block.match(/\btype:\s*['"]([^'"]+)['"]/)?.[1];
  if (!id || !chapterId) continue;
  assert(!ids.has(id), 'duplicate English question ID ' + id);
  ids.add(id);
  chapterCounts.set(chapterId, (chapterCounts.get(chapterId) ?? 0) + 1);

  const optionCount = (block.match(/options:\s*\[/)?.[0] ? (block.match(/\{\s*id:\s*['"]opt_/g) ?? []).length : 0);
  const correctCount = (block.match(/correctOptionIds:\s*\[/)?.[0] ? (block.match(/correctOptionIds:\s*\[([^\]]*)\]/)?.[1].match(/['"]opt_/g) ?? []).length : 0);
  if (type === 'mcq' && optionCount === 4 && correctCount === 1) {
    eligibleByChapter.set(chapterId, (eligibleByChapter.get(chapterId) ?? 0) + 1);
  }
}

assert(ids.size >= 100, 'English IDs are not unique');
for (const chapter of ['chap_eng_01', 'chap_eng_02', 'chap_eng_03', 'chap_eng_04']) {
  assert((eligibleByChapter.get(chapter) ?? 0) >= 15, chapter + ' has fewer than 15 bank MCQs eligible for Challenger');
}

const challengerIds = [...challengerSource.matchAll(/make\(\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
assert(challengerIds.length >= 20, 'English chapter Challenger source must contain at least 20 dedicated questions');
assert(new Set(challengerIds).size === challengerIds.length, 'duplicate dedicated Challenger IDs');
const optionArrays = [...challengerSource.matchAll(/make\([^]*?\[\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\]/g)];
assert(optionArrays.length >= 20, 'dedicated Challenger options could not be audited');

const translationIds = [...labSource.matchAll(/\{ id:'(tr_[^']+)'/g)].map((match) => match[1]);
const vocabularyIds = [...labSource.matchAll(/\{id:'(v_[^']+)'/g)].map((match) => match[1]);
assert(translationIds.length >= 30, 'Translation Lab needs at least 30 controlled items');
assert(new Set(translationIds).size === translationIds.length, 'duplicate Translation Lab IDs');
assert(vocabularyIds.length >= 40, 'Vocabulary Lab needs at least 40 controlled words');
assert(new Set(vocabularyIds).size === vocabularyIds.length, 'duplicate Vocabulary Lab IDs');

for (let level = 1; level <= 6; level += 1) {
  assert(new RegExp('level:' + level + ',').test(labSource), 'Translation Lab missing level ' + level);
}
for (const level of ['beginner','basic','intermediate','jnvst','challenge']) {
  assert(labSource.includes("level:'" + level + "'"), 'Vocabulary Lab missing level ' + level);
}

console.log('English mastery audit passed.');
console.log('Eligible bank MCQs:', Object.fromEntries(eligibleByChapter));
console.log('Dedicated English Challenger questions:', challengerIds.length);
console.log('Translation Lab items:', translationIds.length);
console.log('Vocabulary Lab items:', vocabularyIds.length);
