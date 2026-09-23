import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const questionDir = path.join(root, 'src', 'data', 'questions');
const read = (file) => fs.readFileSync(path.join(questionDir, file), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error('Hindi mastery audit failed: ' + message);
};

const legacySources = ['hindiPart1.ts','hindiPart2.ts','hindiPart3.ts','hindiPart4.ts'];
const legacyIds = legacySources.flatMap((file) =>
  [...read(file).matchAll(/\bid:\s*['"](q_hin_b\d+_\d+_\d+)['"]/g)].map((m) => m[1]),
);
assert(legacyIds.length === 110, 'expected 110 legacy Hindi questions, found ' + legacyIds.length);
assert(new Set(legacyIds).size === 110, 'duplicate legacy Hindi question IDs');

const expansionSource = read('hindiExpansion.ts');
const expansionIds = [...expansionSource.matchAll(/\bid:\s*['"](q_hin_x_\d+_\d+)['"]/g)].map((m) => m[1]);
const expansionTopics = [...expansionSource.matchAll(/\btopicId:\s*['"](top_hin_\d+_\d+)['"]/g)].map((m) => m[1]);
assert(expansionIds.length === 55, 'expected 55 Hindi expansion questions, found ' + expansionIds.length);
assert(new Set(expansionIds).size === 55, 'duplicate Hindi expansion question IDs');
assert(expansionTopics.length === 55, 'expected 55 Hindi expansion topic mappings, found ' + expansionTopics.length);
const expansionRecords = [...expansionSource.matchAll(/make\(\{([\s\S]*?)\}\)/g)];
assert(expansionRecords.length === 55, 'could not fully audit Hindi expansion question records');
for (const [, record] of expansionRecords) {
  const optionText = record.match(/options:\[([^\]]+)\]/)?.[1] ?? '';
  const options = [...optionText.matchAll(/'([^']*)'/g)].map((match) => match[1]);
  assert(options.length === 4, 'every Hindi expansion MCQ must contain exactly four options');
  assert(new Set(options.map((option) => option.trim().toLowerCase())).size === 4, 'Hindi expansion MCQs contain duplicate option text');
  const correct = Number(record.match(/correct:(\d)/)?.[1] ?? -1);
  assert(correct >= 0 && correct <= 3, 'Hindi expansion MCQ has invalid correct option index');
}
assert(expansionIds.every((id) => !new Set(legacyIds).has(id)), 'Hindi expansion overlaps legacy IDs');

const topicCounts = new Map();
for (const topicId of expansionTopics) topicCounts.set(topicId, (topicCounts.get(topicId) ?? 0) + 1);
const officialTopics = [
  'top_hin_01_01','top_hin_02_01','top_hin_02_02','top_hin_02_03',
  'top_hin_03_01','top_hin_03_02','top_hin_04_01','top_hin_04_02',
  'top_hin_05_01','top_hin_05_02','top_hin_06_01',
];
const legacyTopicCounts = new Map();
for (const file of legacySources) {
  for (const match of read(file).matchAll(/\btopicId:\s*['"](top_hin_\d+_\d+)['"]/g)) {
    const topicId = match[1];
    legacyTopicCounts.set(topicId, (legacyTopicCounts.get(topicId) ?? 0) + 1);
  }
}
for (const topicId of officialTopics) {
  const total = (legacyTopicCounts.get(topicId) ?? 0) + (topicCounts.get(topicId) ?? 0);
  assert(total === 15, topicId + ' should contain exactly 15 questions, found ' + total);
}

const challengerSource = fs.readFileSync(path.join(questionDir, 'hindiChapterChallengers.ts'), 'utf8');
const challengerIds = [...challengerSource.matchAll(/make\(\{id:'(q_hin_ch_\d+_\d+)'/g)].map((m) => m[1]);
assert(challengerIds.length === 120, 'expected exactly 120 dedicated Hindi Challenger questions, found ' + challengerIds.length);
assert(new Set(challengerIds).size === 120, 'duplicate Hindi Challenger IDs');
const challengerRecords = [...challengerSource.matchAll(/make\(\{id:'(q_hin_ch_\d+_\d+)'[\s\S]*?options:\[([^\]]+)\],correct:(\d)/g)];
assert(challengerRecords.length === 120, 'could not fully audit Hindi Challenger option records');
for (const [, id, options, correct] of challengerRecords) {
  assert((options.match(/'/g) ?? []).length === 8, id + ' must have exactly four string options');
  assert(Number(correct) >= 0 && Number(correct) <= 3, id + ' has invalid correct option index');
}
for (const chapter of ['01','02','03','04','05','06']) {
  const count = challengerIds.filter((id) => id.startsWith('q_hin_ch_' + chapter + '_')).length;
  assert(count === 20, 'Chapter ' + chapter + ' must have exactly 20 dedicated Hindi Challenger questions');
}

const topicChallengerSource = read('hindiTopicChallengers.ts');
const topicChallengerIds = [...topicChallengerSource.matchAll(/make\(\{id:'(q_hin_tc_\d+_\d+_\d+)'/g)].map((m) => m[1]);
const topicChallengerTopics = [...topicChallengerSource.matchAll(/topicId:'(top_hin_\d+_\d+)'/g)].map((m) => m[1]);
assert(topicChallengerIds.length === 100, 'expected 100 new dedicated Hindi topic Challenger questions, found ' + topicChallengerIds.length);
assert(new Set(topicChallengerIds).size === 100, 'duplicate Hindi topic Challenger IDs');
assert(topicChallengerTopics.length === 100, 'expected 100 Hindi topic Challenger topic mappings, found ' + topicChallengerTopics.length);
const allHindiTopicChallengerCounts = new Map();
for (const id of challengerIds) {
  const topicMatch = [...challengerSource.matchAll(new RegExp("topicId:'(top_hin_" + id.slice(9, 11) + "_\\\\d+)'"))][0];
}
const combinedTopicChallengerCounts = new Map();
for (const match of challengerSource.matchAll(/chapterId:'chap_hin_(\d+)',topicId:'(top_hin_\d+_\d+)'/g)) {
  const topicId = match[2];
  combinedTopicChallengerCounts.set(topicId, (combinedTopicChallengerCounts.get(topicId) ?? 0) + 1);
}
for (const topicId of topicChallengerTopics) {
  combinedTopicChallengerCounts.set(topicId, (combinedTopicChallengerCounts.get(topicId) ?? 0) + 1);
}
for (const topicId of officialTopics) {
  assert((combinedTopicChallengerCounts.get(topicId) ?? 0) === 20, topicId + ' must have exactly 20 dedicated Challenger questions');
}
const topicChallengerRecords = [...topicChallengerSource.matchAll(/make\(\{id:'(q_hin_tc_\d+_\d+_\d+)'[\s\S]*?options:\[([^\]]+)\],correct:(\d)/g)];
assert(topicChallengerRecords.length === 100, 'could not fully audit Hindi topic Challenger option records');
for (const [, id, options, correct] of topicChallengerRecords) {
  assert((options.match(/'/g) ?? []).length === 8, id + ' must have exactly four string options');
  const optionTexts = [...options.matchAll(/'([^']*)'/g)].map((m) => m[1]);
  assert(new Set(optionTexts.map((x) => x.trim().toLowerCase())).size === 4, id + ' has duplicate option text');
  assert(Number(correct) >= 0 && Number(correct) <= 3, id + ' has invalid correct option index');
}

const unseenSource = fs.readFileSync(path.join(root, 'src', 'data', 'hindiUnseenPassages.ts'), 'utf8');
const passageIds = [...unseenSource.matchAll(/\bid:"(hup-\d+)"/g)].map((m) => m[1]);
const passageQuestionIds = [...unseenSource.matchAll(/\bid:"(hup-\d+-q\d+)"/g)].map((m) => m[1]);
assert(passageIds.length === 10, 'expected 10 Hindi unseen passages, found ' + passageIds.length);
assert(new Set(passageIds).size === 10, 'duplicate Hindi unseen passage IDs');
assert(passageQuestionIds.length === 50, 'expected 50 Hindi unseen passage questions, found ' + passageQuestionIds.length);
assert(new Set(passageQuestionIds).size === 50, 'duplicate Hindi unseen passage question IDs');
assert((unseenSource.match(/options:\[/g) ?? []).length === 50, 'each Hindi unseen question should have four options');
for (const level of ['Beginner','Basic','JNVST','Challenge']) {
  assert(unseenSource.includes('level:"' + level + '"'), 'Hindi unseen passage level missing: ' + level);
}

console.log('Hindi mastery audit passed.');
console.log('Legacy Hindi questions:', legacyIds.length);
console.log('Expanded Hindi questions:', expansionIds.length);
console.log('Hindi questions by topic:', Object.fromEntries(officialTopics.map((id) => [id, (legacyTopicCounts.get(id) ?? 0) + (topicCounts.get(id) ?? 0)])));
console.log('Dedicated Hindi Challenger questions:', challengerIds.length);
console.log('Dedicated Hindi topic Challenger questions:', topicChallengerIds.length);
console.log('Hindi Challenger questions by topic:', Object.fromEntries(officialTopics.map((id) => [id, combinedTopicChallengerCounts.get(id) ?? 0])));
console.log('Hindi unseen passages:', passageIds.length);
console.log('Hindi unseen passage questions:', passageQuestionIds.length);
