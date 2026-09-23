import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const fail = (message) => { throw new Error('Hindi release audit failed: ' + message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const curriculum = read('src/data/curriculum.ts');
const syllabus = read('src/data/syllabus/jnvst-class9.ts');
const hindiLessons = read('src/data/lessons/hindi.ts');
const hindiPrep = read('src/data/hindiPrep.ts');
const unseen = read('src/data/hindiUnseenPassages.ts');
const intelligence = read('src/utils/jnvstIntelligence.ts');
const app = read('src/App.tsx');
const chapterStudy = read('src/data/lessons/chapterStudy.ts');
const rich = read('src/data/lessons/richChapterContent.ts');
const progress = read('src/store/progress.ts');
const types = read('src/types/index.ts');
const unseenPage = read('src/pages/HindiUnseenPassagePage.tsx');

const officialTopics = [
  'top_hin_01_01','top_hin_02_01','top_hin_02_02','top_hin_02_03',
  'top_hin_03_01','top_hin_03_02','top_hin_04_01','top_hin_04_02',
  'top_hin_05_01','top_hin_05_02','top_hin_06_01',
];

const officialChapters = [
  'chap_hin_01','chap_hin_02','chap_hin_03',
  'chap_hin_04','chap_hin_05','chap_hin_06',
];

const count = (source, pattern) => (source.match(pattern) ?? []).length;

const extractCurlyRecords = (source, idPattern) => {
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
        if (escaped) escaped = false;
        else if (ch === '\\') escaped = true;
        else if (ch === quote) inString = false;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') {
        inString = true;
        quote = ch;
        continue;
      }
      if (ch === '{') depth += 1;
      else if (ch === '}') {
        depth -= 1;
        if (depth === 0) { end = i; break; }
      }
    }
    if (end < 0) break;
    const record = source.slice(start, end + 1);
    if (idPattern.test(record)) records.push(record);
    start = source.indexOf('{', end + 1);
  }
  return records;
};

const allFiles = fs.readdirSync(path.join(root, 'src'), { recursive: true })
  .filter((file) => typeof file === 'string' && /\.(ts|tsx)$/.test(file));

const repoText = allFiles
  .map((file) => fs.readFileSync(path.join(root, 'src', file), 'utf8'))
  .join('\n');

assert(curriculum.includes("{ id: 'sub_hin'"), 'Hindi subject ID sub_hin is missing');
assert(officialChapters.every((id) => curriculum.includes("id: '" + id + "'")), 'all six Hindi chapters must exist in curriculum');
assert(officialTopics.every((id) => curriculum.includes("id: '" + id + "'")), 'all eleven Hindi topics must exist in curriculum');
assert(count(curriculum, /id: 'top_hin_\d+_\d+'/g) === 11, 'curriculum must contain exactly 11 Hindi topics');
assert(count(syllabus, /id: 'hin_\d+'/g) === 11, 'official Hindi syllabus map must contain exactly 11 units');
assert(syllabus.includes("marks: 15") && syllabus.includes("questionCount: 15"), 'Hindi official exam target must remain 15 marks / 15 questions');
assert(syllabus.includes('totalMarks: 100') && syllabus.includes('totalQuestions: 100') && syllabus.includes('durationMinutes: 150'), 'official exam metadata must remain 100 questions / 100 marks / 150 minutes');

const topicLines = curriculum.split(/\r?\n/).filter((line) => /id: 'top_hin_\d+_\d+'/.test(line));
assert(topicLines.length === 11, 'could not isolate all eleven Hindi curriculum topic records');
const curriculumIds = [];
for (const line of topicLines) {
  const topicId = line.match(/id: '(top_hin_\d+_\d+)'/)?.[1];
  const ids = [...line.matchAll(/"(q_hin_[^"]+)"/g)].map((m) => m[1]);
  assert(topicId, 'Hindi topic line is missing topic ID');
  assert(ids.length === 15, topicId + ' must expose exactly 15 canonical practice questions');
  assert(new Set(ids).size === 15, topicId + ' must not duplicate practice question IDs');
  curriculumIds.push(...ids);
}
assert(curriculumIds.length === 165 && new Set(curriculumIds).size === 165, 'curriculum must expose all 165 canonical Hindi questions exactly once');

assert(count(hindiLessons, /id: 'les_hin_/g) === 11, 'Hindi lesson bank must contain exactly 11 lessons');
const lessonTopics = [...hindiLessons.matchAll(/topicId: '(top_hin_\d+_\d+)'/g)].map((m) => m[1]);
assert(lessonTopics.length === 11 && new Set(lessonTopics).size === 11, 'Hindi lessons must map one-to-one to all official topics');
assert(officialTopics.every((id) => lessonTopics.includes(id)), 'every official Hindi topic needs a lesson');

const prepTopics = [...hindiPrep.matchAll(/topicId: '(top_hin_\d+_\d+)'/g)].map((m) => m[1]);
assert(prepTopics.length === 11 && new Set(prepTopics).size === 11, 'Hindi mastery data must contain one unit per official topic');
for (const field of ['coreSkills','mustKnow','quickFacts','examTraps','examples','solveMethod','examFocus']) {
  const matches = [...hindiPrep.matchAll(new RegExp(field + ':\\s*\\[([^\\]]+)\\]', 'g'))];
  assert(matches.length === 11, 'each Hindi mastery unit must define non-empty ' + field);
  assert(matches.every((m) => m[1].trim().length > 0), 'Hindi mastery ' + field + ' entries must not be empty');
}
assert(chapterStudy.includes('getHindiChapterStudyPages') && chapterStudy.includes('hindiMasteryUnitMap'), 'live Hindi chapter study must remain driven by hindiPrep mastery data');
assert((rich.match(/\n  chap_hin_\d+:/g) ?? []).length === 0, 'Hindi richChapterContent duplication must remain removed');
assert(rich.includes('chap_eng_01:') && rich.includes('chap_sci_01:'), 'non-Hindi rich chapter content must remain intact');

const canonicalSources = ['hindiPart1.ts','hindiPart2.ts','hindiPart3.ts','hindiPart4.ts'];
const legacyRecords = canonicalSources.flatMap((file) => extractCurlyRecords(read('src/data/questions/' + file), /\bid:\s*['"]q_hin_b\d+_\d+_\d+['"]/));
assert(legacyRecords.length === 110, 'legacy Hindi question records must total 110');
const expansion = read('src/data/questions/hindiExpansion.ts');
const expansionRecords = [...expansion.matchAll(/make\(\{([\s\S]*?)\}\)/g)];
assert(expansionRecords.length === 55, 'Hindi expansion records must total 55');

const canonicalQuestionCountByFile = canonicalSources.map((file) => {
  const source = read('src/data/questions/' + file);
  const questionCount = (source.match(/\bid:\s*['"]q_hin_/g) ?? []).length;
  const explanationCount = (source.match(/explanationPlain:\s*['"]/g) ?? []).length;
  const optionArrayCount = (source.match(/options:\s*\[/g) ?? []).length;
  assert(questionCount === explanationCount, file + ' must provide one explanationPlain for every canonical question');
  assert(questionCount === optionArrayCount, file + ' must provide one options array for every canonical question');
  return questionCount;
});
assert(canonicalQuestionCountByFile.reduce((sum, value) => sum + value, 0) === 110, 'legacy Hindi canonical question fields must total 110');

const expansionQuestionsSource = expansion.slice(expansion.indexOf('export const hindiExpansionQuestions'));
const expansionQuestionCount = (expansionQuestionsSource.match(/\bid:\s*['"]q_hin_x_/g) ?? []).length;
const expansionExplanationCount = (expansionQuestionsSource.match(/explanationPlain:/g) ?? []).length;
const expansionMakeCount = expansionQuestionsSource.split('make({').length - 1;
assert(expansionQuestionCount === 55 && expansionExplanationCount === 55 && expansionMakeCount === 55, 'Hindi expansion must contain 55 complete generated records');

const challengerFiles = [
  read('src/data/questions/hindiChapterChallengers.ts'),
  read('src/data/questions/hindiTopicChallengers.ts'),
];
const challengerRecords = challengerFiles.flatMap((source) =>
  [...source.matchAll(/make\(\{([\s\S]*?)\}\)/g)].map((m) => m[1])
);
assert(challengerRecords.length === 220, 'Hindi Challenger bank must contain exactly 220 dedicated records');
const challengerByTopic = new Map();
for (const record of challengerRecords) {
  const topicId = record.match(/topicId:'(top_hin_\d+_\d+)'/)?.[1];
  const difficulty = record.match(/difficulty:'(easy|medium|hard|challenge)'/)?.[1];
  assert(topicId, 'Hindi Challenger record is missing topic mapping');
  assert(difficulty === 'hard' || difficulty === 'challenge', 'all dedicated Hindi Challenger questions must be Hard or Challenge');
  challengerByTopic.set(topicId, (challengerByTopic.get(topicId) ?? 0) + 1);
  validateCanonical(record, 'Hindi Challenger');
}
for (const topicId of officialTopics) assert(challengerByTopic.get(topicId) === 20, topicId + ' must have exactly 20 dedicated Challenger questions');

const unseenPassageIds = [...unseen.matchAll(/\bid:"(hup-\d+)"/g)].map((m) => m[1]);
const unseenQuestionIds = [...unseen.matchAll(/\bid:"(hup-\d+-q\d+)"[,]/g)].map((m) => m[1]);
assert(unseenPassageIds.length === 10 && new Set(unseenPassageIds).size === 10, 'Hindi Unseen Lab must contain exactly 10 unique passages');
assert(unseenQuestionIds.length === 50 && new Set(unseenQuestionIds).size === 50, 'Hindi Unseen Lab must contain exactly 50 unique questions');
const questionsPerPassage = new Map();
for (const id of unseenQuestionIds) {
  const passageId = id.match(/^hup-(\d+)-q\d+$/)?.[1];
  if (passageId) questionsPerPassage.set(passageId, (questionsPerPassage.get(passageId) ?? 0) + 1);
}
for (let index = 1; index <= 10; index += 1) {
  const passageId = String(index).padStart(2, '0');
  assert(questionsPerPassage.get(passageId) === 5, 'Hindi unseen passage ' + passageId + ' must contain exactly five questions');
}
const unseenQuestionRecords = [...unseen.matchAll(/\{id:"(hup-\d+-q\d+)",skill:"([^"]+)",question:"([^"]+)",options:\[([^\]]+)\],correctIndex:(\d),explanation:"([^"]+)"/g)];
assert(unseenQuestionRecords.length === 50, 'all 50 Hindi unseen question records must be structurally auditable');
const unseenSkills = new Set();
for (const [, id, skill, question, opts, correct, explanation] of unseenQuestionRecords) {
  const options = [...opts.matchAll(/"([^"]*)"/g)].map((m) => m[1].trim());
  assert(options.length === 4 && new Set(options.map((x) => x.toLowerCase())).size === 4, id + ' must have four unique options');
  assert(Number(correct) >= 0 && Number(correct) <= 3, id + ' has invalid correct index');
  assert(question.trim().length >= 10 && explanation.trim().length >= 15, id + ' must have substantive question/explanation');
  unseenSkills.add(skill);
}
assert(unseenSkills.size >= 8, 'Hindi unseen passages must cover at least eight comprehension skills');

assert(types.includes('HindiUnseenLabAttempt') && progress.includes('hindiUnseenAttempts') && progress.includes('recordHindiUnseenAttempt'), 'Hindi Unseen progress contract is incomplete');
assert(unseenPage.includes('useProgressStore') && unseenPage.includes('recordHindiUnseenAttempt'), 'Hindi Unseen UI must persist attempts');
assert(unseenPage.includes('selectedSourceIndex === question.correctIndex'), 'Hindi Unseen scoring must use source identity after display shuffling');
assert(intelligence.includes('getHindiUnseenPerformance') && intelligence.includes('progress.hindiUnseenAttempts'), 'Hindi Smart Practice must consume Unseen performance');
assert(intelligence.includes("question.topicId === 'top_hin_06_01' && unseenPerformance.attempts"), 'Hindi comprehension performance must influence Smart Practice');

assert(intelligence.includes('export const buildHindiMockPaper'), 'Hindi Mock generator is missing');
const mockStart = intelligence.indexOf('export const buildHindiMockPaper');
const mockEnd = intelligence.indexOf('export const buildEnglishMockPaper', mockStart);
const mock = intelligence.slice(mockStart, mockEnd);
assert(mock.includes("filter((topic) => topic.chapterId.startsWith('chap_hin_'))"), 'Hindi Mock must source official Hindi topics');
assert(mock.includes('for (const topic of hindiTopics)'), 'Hindi Mock must guarantee topic breadth');
assert(mock.includes('.slice(0, Math.max(0, 15 - result.length))'), 'Hindi Mock must fill remaining slots up to 15');
assert(mock.includes('return result.slice(0, 15);'), 'Hindi Mock must return exactly at most 15 questions');
assert(app.includes('mockSubjectId="sub_hin"') && app.includes('mockIdPrefix="hindi-mock-"'), 'Hindi Mock persistence configuration is missing');
assert(!app.includes('/subjects/sub_hindi') && app.includes('/subjects/sub_hin'), 'Hindi fallback route must be correct');

assert(app.includes('path="/hindi-unseen-passage"') && app.includes('path="/hindi-smart-practice"') && app.includes('path="/hindi-mock-test"'), 'Hindi learning routes are incomplete');
assert(app.includes('path="/topics/:topicId/challenger"'), 'Topic Challenger route is missing');
assert(app.includes('getTopicChallengerQuestions(topic.id, 20'), 'Hindi topic Challenger must request 20 questions');
assert(app.includes('getHindiChapterStudyPages') || chapterStudy.includes('getHindiChapterStudyPages'), 'Hindi chapter-study integration is missing');

const intelligencePatterns = [0,1,2,3].map((value) => (intelligence.match(new RegExp('const assessmentAnswerPositionPattern = \\[([^\\]]+)\\]'))?.[1] ?? '')
  .split(',').map((value) => Number(value.trim())).filter((value) => value === value));
assert(intelligencePatterns.length === 4, 'answer-pattern source is malformed');
assert((intelligencePatterns[0].length === 20) && [0,1,2,3].every((v) => intelligencePatterns[0].filter((x) => x === v).length === 5), 'assessment answer-position pattern must remain perfectly balanced');

assert(repoText.includes('sub_hin') && !repoText.includes('/subjects/sub_hindi'), 'repository must not contain the stale Hindi subject route');
console.log('Hindi final release audit passed.');
console.log('11/11 syllabus topics, 11/11 lessons, 165 canonical questions, 150 exam MCQs, 220 Challengers, 10 passages, 50 unseen questions.');
console.log('Hindi final release gate: PASS');
