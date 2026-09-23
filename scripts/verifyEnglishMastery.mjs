import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const englishSource = fs.readFileSync(path.join(root, 'src', 'data', 'questions', 'english.ts'), 'utf8');
const englishExpansionSource = fs.readFileSync(path.join(root, 'src', 'data', 'questions', 'englishExpansion.ts'), 'utf8');
const challengerSource = fs.readFileSync(path.join(root, 'src', 'data', 'questions', 'englishChallengers.ts'), 'utf8');
const challengerExtraSource = fs.readFileSync(path.join(root, 'src', 'data', 'questions', 'englishChapterChallengersExtra.ts'), 'utf8');
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

const expansionIds = [...englishExpansionSource.matchAll(/\bid:\s*['"](q_eng_x_\d+_\d+)['"]/g)].map((match) => match[1]);
const expansionTopicIds = [...englishExpansionSource.matchAll(/\btopicId:\s*['"](top_eng_\d+_\d+)['"]/g)].map((match) => match[1]);

assert(blocks.length >= 100, 'expected at least 100 legacy English createQuestion records, found ' + blocks.length);
assert(expansionIds.length === 50, 'expected exactly 50 English expansion IDs, found ' + expansionIds.length);
assert(new Set(expansionIds).size === 50, 'duplicate English expansion question IDs');
assert(expansionTopicIds.length === 50, 'expected exactly 50 English expansion topic mappings, found ' + expansionTopicIds.length);

const countValues = (values) => {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
};
const expansionTopics = countValues(expansionTopicIds);
for (const topicId of [
  'top_eng_01_01','top_eng_02_01','top_eng_02_02','top_eng_02_03',
  'top_eng_03_01','top_eng_03_02','top_eng_03_03',
  'top_eng_04_01','top_eng_04_02','top_eng_04_03',
]) {
  assert((expansionTopics.get(topicId) ?? 0) === 5, topicId + ' should receive exactly 5 expansion questions');
}


const chapterCounts = new Map();
const eligibleByChapter = new Map();
const topicCounts = new Map();
const eligibleByTopic = new Map();
const ids = new Set();

for (const block of blocks) {
  const id = block.match(/\bid:\s*['"]([^'"]+)['"]/)?.[1];
  const chapterId = block.match(/\bchapterId:\s*['"]([^'"]+)['"]/)?.[1];
  const topicId = block.match(/\btopicId:\s*['"]([^'"]+)['"]/)?.[1];
  const type = block.match(/\btype:\s*['"]([^'"]+)['"]/)?.[1];
  if (!id || !chapterId) continue;
  assert(!ids.has(id), 'duplicate English question ID ' + id);
  ids.add(id);
  chapterCounts.set(chapterId, (chapterCounts.get(chapterId) ?? 0) + 1);
  if (topicId) topicCounts.set(topicId, (topicCounts.get(topicId) ?? 0) + 1);

  const optionCount = (block.match(/options:\s*\[/)?.[0] ? (block.match(/\{\s*id:\s*['"]opt_/g) ?? []).length : 0);
  const correctCount = (block.match(/correctOptionIds:\s*\[/)?.[0] ? (block.match(/correctOptionIds:\s*\[([^\]]*)\]/)?.[1].match(/['"]opt_/g) ?? []).length : 0);
  if (type === 'mcq' && optionCount === 4 && correctCount === 1) {
    eligibleByChapter.set(chapterId, (eligibleByChapter.get(chapterId) ?? 0) + 1);
    if (topicId) eligibleByTopic.set(topicId, (eligibleByTopic.get(topicId) ?? 0) + 1);
  }
}

assert(ids.size === 100, 'legacy English bank should contain exactly 100 unique IDs, found ' + ids.size);
const combinedTopicCounts = new Map(topicCounts);
for (const topicId of expansionTopicIds) combinedTopicCounts.set(topicId, (combinedTopicCounts.get(topicId) ?? 0) + 1);
assert([...expansionIds].every((id) => !ids.has(id)), 'English expansion IDs overlap with legacy IDs');
for (const topicId of [
  'top_eng_01_01','top_eng_02_01','top_eng_02_02','top_eng_02_03',
  'top_eng_03_01','top_eng_03_02','top_eng_03_03',
  'top_eng_04_01','top_eng_04_02','top_eng_04_03',
]) {
  assert((combinedTopicCounts.get(topicId) ?? 0) === 15, topicId + ' should contain exactly 15 total questions');
}
for (const topicId of [
  'top_eng_01_01','top_eng_02_01','top_eng_02_02','top_eng_02_03',
  'top_eng_03_01','top_eng_03_02','top_eng_03_03',
  'top_eng_04_01','top_eng_04_02','top_eng_04_03',
]) {
  assert((eligibleByTopic.get(topicId) ?? 0) + (expansionTopics.get(topicId) ?? 0) >= 10, topicId + ' should contain at least 10 JNVST-compatible MCQs');
}
for (const chapter of ['chap_eng_01', 'chap_eng_02', 'chap_eng_03', 'chap_eng_04']) {
  assert((eligibleByChapter.get(chapter) ?? 0) >= 20, chapter + ' has fewer than 20 Challenger-eligible questions in the combined bank');
}

const challengerSources = [challengerSource, challengerExtraSource];
const challengerIds = challengerSources.flatMap((source) =>
  [...source.matchAll(/make\(\s*['"]([^'"]+)['"]/g)].map((match) => match[1]),
);
assert(challengerIds.length === 80, 'English chapter Challenger source must contain exactly 80 dedicated questions, found ' + challengerIds.length);
assert(new Set(challengerIds).size === challengerIds.length, 'duplicate dedicated Challenger IDs');

const optionArrays = challengerSources.flatMap((source) =>
  [...source.matchAll(/make\([^]*?\[\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*,\s*'([^']*)'\s*\]/g)],
);
assert(optionArrays.length === 80, 'dedicated Challenger options could not be fully audited');
for (const chapterNumber of ['01','02','03','04']) {
  const count = challengerIds.filter((id) => id.startsWith('q_eng_ch_' + chapterNumber + '_')).length;
  assert(count === 20, 'Chapter ' + chapterNumber + ' dedicated Challenger bank must contain exactly 20 questions; found ' + count);
}

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
console.log('English questions by topic:', Object.fromEntries(combinedTopicCounts));
const combinedEligibleByTopic = new Map(eligibleByTopic);
for (const topicId of expansionTopicIds) combinedEligibleByTopic.set(topicId, (combinedEligibleByTopic.get(topicId) ?? 0) + 1);
console.log('JNVST-compatible English MCQs by topic:', Object.fromEntries(combinedEligibleByTopic));
console.log('Translation Lab items:', translationIds.length);
console.log('Vocabulary Lab items:', vocabularyIds.length);
