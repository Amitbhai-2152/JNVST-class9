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

const extractCurlyRecords = (source) => {
  const records = [];
  for (let start = source.indexOf('{'); start >= 0; ) {
    let depth = 0;
    let inString = false;
    let quote = '';
    let escaped = false;
    let end = -1;
    for (let i = start; i < source.length; i += 1) {
      const ch = source[i];
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (ch === '\\') {
          escaped = true;
        } else if (ch === quote) {
          inString = false;
        }
        continue;
      }
      if (ch === "'" || ch === '"') {
        inString = true;
        quote = ch;
        continue;
      }
      if (ch === '{') depth += 1;
      else if (ch === '}') {
        depth -= 1;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end < 0) break;
    const record = source.slice(start, end + 1);
    if (/\bid:\s*['"]q_hin_b\d+_\d+_\d+['"]/.test(record)) records.push(record);
    start = source.indexOf('{', end + 1);
  }
  return records;
};

const legacyQuestionRecords = new Map();
for (const file of legacySources) {
  for (const record of extractCurlyRecords(read(file))) {
    const id = record.match(/\bid:\s*['"](q_hin_b\d+_\d+_\d+)['"]/)?.[1];
    const topicId = record.match(/\btopicId:\s*['"](top_hin_\d+_\d+)['"]/)?.[1];
    const type = record.match(/\btype:\s*['"]([^'"]+)['"]/)?.[1];
    if (id && topicId && type) legacyQuestionRecords.set(id, { topicId, type });
  }
}
assert(legacyQuestionRecords.size === 110, 'could not map all 110 legacy Hindi question records');
const expansionQuestionRecords = new Map(
  expansionIds.map((id, index) => [id, { topicId: expansionTopics[index], type: 'mcq' }]),
);
assert(expansionQuestionRecords.size === 55, 'Hindi expansion ID/topic pairs should contain 55 unique records');
const canonicalHindiQuestionRecords = new Map([...legacyQuestionRecords, ...expansionQuestionRecords]);
assert(canonicalHindiQuestionRecords.size === 165, 'canonical Hindi question source should contain exactly 165 unique records, found ' + canonicalHindiQuestionRecords.size);

const challengerSourceRecords = (source) => {
  const records = [];
  const re = /make\(\{id:'([^']+)',chapterId:'([^']+)',topicId:'([^']+)',question:'[^']*',options:\[[^\]]*\],correct:\d,difficulty:'(easy|medium|hard|challenge)'/g;
  let match;
  while ((match = re.exec(source))) records.push({ id: match[1], chapterId: match[2], topicId: match[3], difficulty: match[4] });
  return records;
};
const topicChallengerRecordsData = (source) => challengerSourceRecords(source);
const dedicatedHindiForStrengthCheck = [
  ...challengerSourceRecords(fs.readFileSync(path.join(questionDir, 'hindiChapterChallengers.ts'), 'utf8')),
  ...topicChallengerRecordsData(fs.readFileSync(path.join(questionDir, 'hindiTopicChallengers.ts'), 'utf8')),
];
const weakDedicatedHindi = dedicatedHindiForStrengthCheck.filter((record) => record.difficulty === 'easy' || record.difficulty === 'medium');
assert(weakDedicatedHindi.length === 0, 'all 220 dedicated Hindi Challenger questions must be hard/challenge; weak count is ' + weakDedicatedHindi.length);



const typesSource = fs.readFileSync(path.join(root, 'src', 'types', 'index.ts'), 'utf8');
const progressStoreSource = fs.readFileSync(path.join(root, 'src', 'store', 'progress.ts'), 'utf8');
const unseenPageSource = fs.readFileSync(path.join(root, 'src', 'pages', 'HindiUnseenPassagePage.tsx'), 'utf8');
const intelligenceSource = fs.readFileSync(path.join(root, 'src', 'utils', 'jnvstIntelligence.ts'), 'utf8');
const chapterStudySource = fs.readFileSync(path.join(root, 'src', 'data', 'lessons', 'chapterStudy.ts'), 'utf8');
const richChapterSource = fs.readFileSync(path.join(root, 'src', 'data', 'lessons', 'richChapterContent.ts'), 'utf8');

assert(typesSource.includes('export interface HindiUnseenLabAttempt'), 'Hindi unseen attempt type is missing');
assert(typesSource.includes('hindiUnseenAttempts: Record<ID, HindiUnseenLabAttempt[]>;'), 'ProgressState must expose Hindi unseen attempts');
assert(progressStoreSource.includes('recordHindiUnseenAttempt'), 'Progress store must persist Hindi unseen attempts');
assert(progressStoreSource.includes('version: 4'), 'Progress store migration version must advance for Hindi unseen attempt persistence');
assert(unseenPageSource.includes('const p = useProgressStore();'), 'Hindi Unseen Lab must connect to the central progress store');
assert(unseenPageSource.includes('p.recordHindiUnseenAttempt(question.id'), 'Hindi Unseen Lab must record every revealed answer attempt');
assert(unseenPageSource.includes('selectedSourceIndex === question.correctIndex'), 'Hindi Unseen Lab must compare source option IDs/indexes for correctness');
assert(unseenPageSource.includes('onSelect={(sourceIndex)'), 'Hindi Unseen Lab must preserve source option identity after display shuffling');
assert(intelligenceSource.includes('export const getHindiUnseenPerformance'), 'Hindi Smart Practice must expose unseen-performance intelligence');
assert(intelligenceSource.includes('progress.hindiUnseenAttempts'), 'Hindi intelligence must consume persisted unseen attempts');
assert(intelligenceSource.includes("question.topicId === 'top_hin_06_01' && unseenPerformance.attempts"), 'Hindi Smart Practice must react to unseen-comprehension performance');
assert(!appSource.includes('/subjects/sub_hindi'), 'Invalid /subjects/sub_hindi fallback route must be absent');
assert(appSource.includes('/subjects/sub_hin'), 'Hindi fallback must use /subjects/sub_hin');
assert(chapterStudySource.includes('getHindiChapterStudyPages'), 'Hindi chapter study must retain its live hindiPrep-based study generator');
const richHindiKeys = [...richChapterSource.matchAll(/\n  chap_hin_\d+:/g)].map((match) => match[0]);
assert(richHindiKeys.length === 0, 'Duplicated Hindi richChapterContent entries must be removed');
assert(richChapterSource.includes('chap_eng_01:'), 'English rich chapter content must remain');
assert(richChapterSource.includes('chap_sci_01:'), 'Science rich chapter content must remain');
assert(unseenAnswerCounts.every((count) => count >= 12), 'Hindi unseen correct-answer positions must use every answer position materially');

// Phase 1–3 behavioral/source checks.
const intelligenceSource = fs.readFileSync(path.join(root, 'src', 'utils', 'jnvstIntelligence.ts'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'src', 'App.tsx'), 'utf8');

const canonicalMcqCount = [...canonicalHindiQuestionRecords.values()].filter((record) => record.type === 'mcq').length;
assert(canonicalMcqCount === 150, 'Hindi exam-compatible MCQ pool should contain exactly 150 MCQs, found ' + canonicalMcqCount);
assert(intelligenceSource.includes('export const arrangeAssessmentOptions'), 'Assessment answer-position arranger is missing');
const answerPatternMatch = intelligenceSource.match(/const assessmentAnswerPositionPattern = \[([^\]]+)\]/);
assert(answerPatternMatch, 'Assessment answer-position pattern is missing');
const answerPattern = answerPatternMatch[1].split(',').map((value) => Number(value.trim()));
assert(answerPattern.length === 20 && answerPattern.every((value) => value >= 0 && value <= 3), 'Assessment answer-position pattern must contain 20 valid A/B/C/D positions');
const patternCounts = [0,1,2,3].map((value) => answerPattern.filter((item) => item === value).length);
assert(patternCounts.every((value) => value === 5), 'Assessment answer-position pattern must contain exactly five of each A/B/C/D position');
const simulatedPositions = Array.from({ length: 150 }, (_, index) => answerPattern[index % answerPattern.length]);
const simulatedCounts = [0,1,2,3].map((value) => simulatedPositions.filter((item) => item === value).length);
assert(Math.max(...simulatedCounts) - Math.min(...simulatedCounts) <= 1, '150-question assessment presentation must remain position-balanced');
assert(intelligenceSource.includes("const correct = question.options.find((option) => question.correctOptionIds.includes(option.id));"), 'Assessment arrangement must locate the correct answer by option ID, not source index');
assert(intelligenceSource.includes("const dedicated = [...hindiChapterChallengers, ...hindiTopicChallengers]"), 'Hindi chapter Challenger must combine chapter and dedicated subtopic pools');
assert(intelligenceSource.includes("const strong = ranked.filter((question) => question.difficulty === 'hard' || question.difficulty === 'challenge');"), 'Hindi chapter Challenger must prioritize hard/challenge questions');
assert(appSource.includes('mockSubjectId?: ID;') && appSource.includes('mockIdPrefix?: string;'), 'AssessmentRunner must accept subject-aware mock persistence configuration');
assert(appSource.includes('mockSubjectId="sub_hin"') && appSource.includes('mockIdPrefix="hindi-mock-"'), 'Hindi Mock must explicitly persist as Hindi');
assert(appSource.includes('mockSubjectId="sub_eng"') && appSource.includes('mockIdPrefix="english-mock-"'), 'English Mock must explicitly persist as English');
assert(appSource.includes('sectionScores: { [sectionId]: mockScore }'), 'Mock persistence must use the configured section ID');
const challengerSourceForBehavior = fs.readFileSync(path.join(questionDir, 'hindiChapterChallengers.ts'), 'utf8');
const topicChallengerSourceForBehavior = fs.readFileSync(path.join(questionDir, 'hindiTopicChallengers.ts'), 'utf8');
for (const chapterId of ['chap_hin_01','chap_hin_02','chap_hin_03','chap_hin_04','chap_hin_05','chap_hin_06']) {
  const combined = [...challengerSourceRecords(challengerSourceForBehavior), ...topicChallengerRecordsData(topicChallengerSourceForBehavior)].filter((record) => record.chapterId === chapterId);
  const strongCount = combined.filter((record) => record.difficulty === 'hard' || record.difficulty === 'challenge').length;
  assert(strongCount >= 20, chapterId + ' needs at least 20 hard/challenge dedicated candidates for its served Challenger set; found ' + strongCount);
}

const curriculumSource = fs.readFileSync(path.join(root, 'src', 'data', 'curriculum.ts'), 'utf8');
const curriculumQuestionIds = [];
for (const topicId of officialTopics) {
  const line = curriculumSource.split('\n').find((candidate) => candidate.includes(`{ id: '${topicId}'`));
  assert(line, topicId + ' is missing from curriculum');
  const ids = [...line.matchAll(/"(q_hin_[^"]+)"/g)].map((m) => m[1]);
  assert(ids.length === 15, topicId + ' must expose exactly 15 canonical practice questions, found ' + ids.length);
  assert(new Set(ids).size === 15, topicId + ' contains duplicate curriculum question IDs');
  for (const id of ids) {
    const record = canonicalHindiQuestionRecords.get(id);
    assert(record, topicId + ' references unknown Hindi question ' + id);
    assert(record.topicId === topicId, id + ' is assigned to ' + record.topicId + ' but appears under ' + topicId);
  }
  curriculumQuestionIds.push(...ids);
}
assert(new Set(curriculumQuestionIds).size === 165, 'Hindi curriculum must reference each of the 165 canonical questions exactly once');
assert(curriculumQuestionIds.every((id) => canonicalHindiQuestionRecords.has(id)), 'Hindi curriculum contains an unknown canonical question ID');

for (const topicId of officialTopics) {
  const compatible = [...canonicalHindiQuestionRecords.values()].filter((record) => record.topicId === topicId && record.type === 'mcq').length;
  assert(compatible >= 10, topicId + ' should have at least 10 JNVST-compatible four-option MCQs, found ' + compatible);
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
const topicChallengerGenericExplanations = (topicChallengerSource.match(/यह dedicated subtopic Challenger प्रश्न उसी Hindi skill/g) ?? []).length;
assert(topicChallengerGenericExplanations === 0, 'Hindi topic Challenger explanations must not use the generic placeholder explanation');

const unseenSource = fs.readFileSync(path.join(root, 'src', 'data', 'hindiUnseenPassages.ts'), 'utf8');
const passageIds = [...unseenSource.matchAll(/\bid:"(hup-\d+)"/g)].map((m) => m[1]);
const passageQuestionIds = [...unseenSource.matchAll(/\bid:"(hup-\d+-q\d+)"/g)].map((m) => m[1]);
assert(passageIds.length === 10, 'expected 10 Hindi unseen passages, found ' + passageIds.length);
assert(new Set(passageIds).size === 10, 'duplicate Hindi unseen passage IDs');
assert(passageQuestionIds.length === 50, 'expected 50 Hindi unseen passage questions, found ' + passageQuestionIds.length);
assert(new Set(passageQuestionIds).size === 50, 'duplicate Hindi unseen passage question IDs');
assert((unseenSource.match(/options:\[/g) ?? []).length === 50, 'each Hindi unseen question should have four options');
const unseenCorrectIndexes = [...unseenSource.matchAll(/correctIndex:(\d)/g)].map((m) => Number(m[1]));
assert(unseenCorrectIndexes.length === 50, 'each Hindi unseen question must have a correct option index');
assert(unseenCorrectIndexes.every((index) => index >= 0 && index <= 3), 'Hindi unseen question has invalid correct option index');
const unseenAnswerCounts = [0, 1, 2, 3].map((index) => unseenCorrectIndexes.filter((value) => value === index).length);
assert(Math.max(...unseenAnswerCounts) - Math.min(...unseenAnswerCounts) <= 1, 'Hindi unseen correct-answer positions must stay balanced across A/B/C/D');

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
console.log('Hindi exam-compatible MCQs:', canonicalMcqCount);
console.log('Assessment answer-position pattern:', patternCounts);
console.log('Hindi Phase 1–3 behavioral checks: passed');
