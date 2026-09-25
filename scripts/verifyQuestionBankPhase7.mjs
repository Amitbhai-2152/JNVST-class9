import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const vite = await createServer({
  root,
  logLevel: 'error',
});
try {
  const questionsModule = await vite.ssrLoadModule('/src/data/questions/index.ts');
  const curriculumModule = await vite.ssrLoadModule('/src/data/curriculum.ts');
  const challengerModule = await vite.ssrLoadModule('/src/utils/questionBankChallengers.ts');

  const questions = questionsModule.allQuestions;
  const chapters = curriculumModule.chapters;
  const topics = curriculumModule.topics;
  const subjects = curriculumModule.subjects;
  const dedicatedChallengers = challengerModule.dedicatedChallengerQuestions;

  const normalize = (value) =>
    String(value ?? '')
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[“”‘’]/g, "'")
      .replace(/\s+/g, ' ')
      .trim();

  const textOf = (question) => {
    if (question.textPlain) return question.textPlain;
    return (question.text ?? [])
      .map((block) => block.type === 'paragraph' ? block.text : '')
      .filter(Boolean)
      .join(' ');
  };

  const explanationOf = (question) => {
    if (question.explanationPlain) return question.explanationPlain;
    return (question.explanation ?? [])
      .map((block) => block.type === 'paragraph' ? block.text : '')
      .filter(Boolean)
      .join(' ');
  };

  const fail = [];
  const warnings = [];
  const info = [];

  const expectedCounts = { sub_eng: 150, sub_hin: 165, sub_math: 220, sub_sci: 360 };
  const subjectTitle = new Map(subjects.map((subject) => [subject.id, subject.title]));
  const chapterById = new Map(chapters.map((chapter) => [chapter.id, chapter]));
  const topicById = new Map(topics.map((topic) => [topic.id, topic]));

  if (questions.length !== 895) fail.push('Canonical question count must remain exactly 895.');

  const ids = new Set();
  const fingerprints = new Map();
  const stemKeys = new Map();
  const counts = {};
  const difficultyCounts = {};
  const answerPositions = {};
  const chapterCounts = new Map();
  const topicCounts = new Map();

  for (const question of questions) {
    if (ids.has(question.id)) fail.push('Duplicate canonical question ID: ' + question.id);
    ids.add(question.id);

    counts[question.subjectId] = (counts[question.subjectId] ?? 0) + 1;
    difficultyCounts[question.subjectId] ??= { easy: 0, medium: 0, hard: 0, challenge: 0 };
    difficultyCounts[question.subjectId][question.difficulty] += 1;

    chapterCounts.set(question.chapterId, (chapterCounts.get(question.chapterId) ?? 0) + 1);
    topicCounts.set(question.topicId, (topicCounts.get(question.topicId) ?? 0) + 1);

    if (!chapterById.has(question.chapterId)) fail.push('Unknown chapter: ' + question.id);
    if (!topicById.has(question.topicId)) fail.push('Unknown topic: ' + question.id);
    if (question.chapterId && question.topicId && topicById.get(question.topicId)?.chapterId !== question.chapterId) {
      fail.push('Chapter/topic mismatch: ' + question.id);
    }
    if (chapterById.get(question.chapterId)?.subjectId !== question.subjectId) {
      fail.push('Subject/chapter mismatch: ' + question.id);
    }

    if (question.type !== 'mcq') warnings.push('Non-MCQ canonical question: ' + question.id);

    if (question.options.length !== 4) {
      fail.push('Canonical question must have exactly 4 options: ' + question.id);
    }

    const normalizedOptions = question.options.map((option) => normalize(option.text));
    if (normalizedOptions.some((option) => !option)) {
      fail.push('Blank option: ' + question.id);
    }
    if (new Set(normalizedOptions).size !== normalizedOptions.length) {
      fail.push('Duplicate option text: ' + question.id);
    }
    if (normalizedOptions.some((option) => /^[a-d](?:[.)]|-|:)?$/.test(option))) {
      fail.push('Guessable label-only option: ' + question.id);
    }

    if (question.correctOptionIds.length !== 1) {
      fail.push('Canonical question must have exactly one correct option: ' + question.id);
    } else {
      const answerIndex = question.options.findIndex((option) => option.id === question.correctOptionIds[0]);
      if (answerIndex < 0) fail.push('Correct option ID missing: ' + question.id);
      if (answerIndex >= 0) {
        answerPositions[question.subjectId] ??= [0, 0, 0, 0];
        answerPositions[question.subjectId][answerIndex] += 1;
      }
    }

    const text = textOf(question);
    const explanation = explanationOf(question);
    if (normalize(text).length < 8) fail.push('Question text is too short: ' + question.id);
    if (normalize(explanation).length < 10) fail.push('Explanation is missing/too short: ' + question.id);

    for (const field of ['examRelevance', 'skill', 'concept', 'cognitiveLevel', 'estimatedSeconds', 'jnvstCompatible']) {
      if (question.metadata?.[field] === undefined || question.metadata?.[field] === null || question.metadata?.[field] === '') {
        fail.push('Missing metadata ' + field + ': ' + question.id);
      }
    }
    if (question.metadata?.jnvstCompatible !== true) {
      fail.push('Canonical question is not marked JNVST-compatible: ' + question.id);
    }

    const fingerprint = [
      question.subjectId,
      question.chapterId,
      question.topicId,
      normalize(text),
      normalizedOptions.join('||'),
      [...question.correctOptionIds].sort().join(','),
    ].join('|');
    if (fingerprints.has(fingerprint)) {
      fail.push('Duplicate canonical question content: ' + fingerprints.get(fingerprint) + ' = ' + question.id);
    } else {
      fingerprints.set(fingerprint, question.id);
    }

    const stemKey = [question.subjectId, question.chapterId, question.topicId, normalize(text)].join('|');
    const existingStem = stemKeys.get(stemKey) ?? [];
    existingStem.push(question.id);
    stemKeys.set(stemKey, existingStem);
  }

  for (const [subjectId, expected] of Object.entries(expectedCounts)) {
    if (counts[subjectId] !== expected) {
      fail.push('Subject count mismatch for ' + subjectId + ': expected ' + expected + ', found ' + (counts[subjectId] ?? 0));
    }

    const distribution = answerPositions[subjectId] ?? [0, 0, 0, 0];
    const spread = Math.max(...distribution) - Math.min(...distribution);
    if (spread > 1) {
      fail.push('Answer-position distribution is imbalanced for ' + subjectId + ': ' + distribution.join('/'));
    }

    const difficulty = difficultyCounts[subjectId] ?? { easy: 0, medium: 0, hard: 0, challenge: 0 };
    const activeDifficultyBands = Object.values(difficulty).filter((count) => count > 0).length;
    const dominantShare = Math.max(...Object.values(difficulty)) / (expected || 1);
    if (activeDifficultyBands < 3) {
      warnings.push('Only ' + activeDifficultyBands + ' difficulty bands in ' + subjectTitle.get(subjectId));
    }
    if (dominantShare > 0.8) {
      warnings.push('One difficulty band exceeds 80% in ' + subjectTitle.get(subjectId) + ': ' + JSON.stringify(difficulty));
    }

    info.push(subjectTitle.get(subjectId) + ': answer positions ' + distribution.join('/') + '; difficulty ' + JSON.stringify(difficulty));
  }

  const missingChapters = chapters.filter((chapter) => !chapterCounts.has(chapter.id));
  if (missingChapters.length) {
    fail.push('Canonical bank has zero questions in chapters: ' + missingChapters.map((chapter) => chapter.id).join(', '));
  }

  const zeroTopicIds = topics.filter((topic) => !topicCounts.has(topic.id)).map((topic) => topic.id);
  const thinTopicIds = topics.filter((topic) => (topicCounts.get(topic.id) ?? 0) > 0 && (topicCounts.get(topic.id) ?? 0) < 3).map((topic) => topic.id);
  if (zeroTopicIds.length) warnings.push('Topics with zero canonical questions (Phase 11 content-completion target): ' + zeroTopicIds.join(', '));
  if (thinTopicIds.length) warnings.push('Topics with fewer than 3 canonical questions: ' + thinTopicIds.join(', '));

  const repeatedStems = [...stemKeys.entries()].filter(([, idsForStem]) => idsForStem.length > 1);
  if (repeatedStems.length) {
    warnings.push('Repeated question stems with different answer sets: ' + repeatedStems.length);
  }

  const challengerFingerprints = new Map();
  for (const question of dedicatedChallengers) {
    const text = textOf(question);
    const normalizedOptions = question.options.map((option) => normalize(option.text));
    const fingerprint = [
      question.subjectId,
      question.chapterId,
      question.topicId,
      normalize(text),
      normalizedOptions.join('||'),
      [...question.correctOptionIds].sort().join(','),
    ].join('|');
    challengerFingerprints.set(fingerprint, question.id);
  }
  const crossBankDuplicates = [];
  for (const [fingerprint, id] of fingerprints.entries()) {
    if (challengerFingerprints.has(fingerprint)) crossBankDuplicates.push(id + ' <> ' + challengerFingerprints.get(fingerprint));
  }
  if (crossBankDuplicates.length) {
    fail.push('Canonical/Challenger content duplicates detected: ' + crossBankDuplicates.slice(0, 20).join(', '));
  }

  const runLengths = [];
  for (const subjectId of Object.keys(answerPositions)) {
    const subjectQuestions = questions.filter((question) =>
      question.subjectId === subjectId &&
      question.type === 'mcq' &&
      question.options.length === 4 &&
      question.correctOptionIds.length === 1,
    );
    let previous = -1;
    let currentRun = 0;
    let longestRun = 0;
    for (const question of subjectQuestions) {
      const position = question.options.findIndex((option) => option.id === question.correctOptionIds[0]);
      if (position === previous) currentRun += 1;
      else currentRun = 1;
      previous = position;
      longestRun = Math.max(longestRun, currentRun);
    }
    runLengths.push([subjectId, longestRun]);
    if (longestRun > 3) fail.push('Answer-position pattern has a run longer than 3 in ' + subjectId + ': ' + longestRun);
  }

  info.push('Canonical fingerprints: ' + fingerprints.size);
  info.push('Canonical/Challenger duplicate fingerprints: ' + crossBankDuplicates.length);
  info.push('Dedicated Challenger questions audited: ' + dedicatedChallengers.length);
  info.push('Answer-position longest runs: ' + JSON.stringify(runLengths));

  if (fail.length) {
    console.error('Question Bank Phase 7 FAILED.');
    for (const item of fail.slice(0, 80)) console.error('✗ ' + item);
    process.exitCode = 1;
  } else {
    console.log('Question Bank Phase 7 quality and distribution audit PASSED.');
  }

  for (const item of info) console.log('• ' + item);
  for (const item of warnings) console.log('⚠ ' + item);

} finally {
  await vite.close();
}
