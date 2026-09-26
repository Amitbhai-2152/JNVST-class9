import { createServer } from 'vite';

const vite = await createServer({ root: process.cwd(), logLevel: 'error' });

try {
  const curriculum = await vite.ssrLoadModule('/src/data/curriculum.ts');
  const questionsModule = await vite.ssrLoadModule('/src/data/questions/index.ts');
  const lessonsModule = await vite.ssrLoadModule('/src/data/lessons/index.ts');
  const challengers = await vite.ssrLoadModule('/src/utils/questionBankChallengers.ts');
  const mathMastery = await vite.ssrLoadModule('/src/data/mathMastery.ts');
  const sciencePrep = await vite.ssrLoadModule('/src/data/sciencePrep.ts');
  const englishPrep = await vite.ssrLoadModule('/src/data/englishPrep.ts');
  const hindiPrep = await vite.ssrLoadModule('/src/data/hindiPrep.ts');

  const { subjects, chapters, topics } = curriculum;
  const questions = questionsModule.allQuestions;
  const lessons = lessonsModule.allLessons;
  const chapterStudyPages = lessonsModule.chapterStudyPages;
  const challengerCounts = challengers.getDedicatedChallengerCounts();

  const fail = [];
  const info = [];

  const subjectById = new Map(subjects.map((x) => [x.id, x]));
  const chapterById = new Map(chapters.map((x) => [x.id, x]));
  const topicById = new Map(topics.map((x) => [x.id, x]));
  const questionById = new Map(questions.map((x) => [x.id, x]));
  const lessonByTopic = new Map();
  for (const lesson of lessons) {
    lessonByTopic.set(lesson.topicId, [...(lessonByTopic.get(lesson.topicId) ?? []), lesson]);
  }

  const masteryTopics = [
    ...(englishPrep.englishMasteryUnits ?? []).map((x) => x.topicId),
    ...(hindiPrep.hindiMasteryUnits ?? []).map((x) => x.topicId),
    ...(mathMastery.mathMasteryUnits ?? []).map((x) => x.topicId),
    ...(sciencePrep.scienceMasteryUnits ?? []).map((x) => x.topicId),
  ];
  const masterySet = new Set(masteryTopics);

  const expectedQuestionsPerTopic = {
    sub_eng: 15,
    sub_hin: 15,
    sub_math: 20,
    sub_sci: 20,
  };

  if (subjects.length !== 4) fail.push('Expected exactly 4 official subjects; found ' + subjects.length);
  if (chapters.length !== 33) fail.push('Expected exactly 33 official chapters; found ' + chapters.length);
  if (topics.length !== 50) fail.push('Expected exactly 50 official topics; found ' + topics.length);
  if (questions.length !== 895) fail.push('Canonical question total must remain 895; found ' + questions.length);
  if (lessons.length < topics.length) fail.push('Expected at least one authoritative lesson per official topic; found ' + lessons.length + ' lessons for ' + topics.length + ' topics');

  const curriculumQuestionIds = [];
  for (const subject of subjects) {
    if (!subjectById.has(subject.id)) fail.push('Subject index mismatch: ' + subject.id);
    for (const chapterId of subject.chapterIds) {
      const chapter = chapterById.get(chapterId);
      if (!chapter) {
        fail.push('Subject points to missing chapter: ' + subject.id + ' -> ' + chapterId);
        continue;
      }
      if (chapter.subjectId !== subject.id) fail.push('Chapter subject mismatch: ' + chapter.id);
      if (!chapter.topicIds.length) fail.push('Chapter has no topics: ' + chapter.id);
      for (const topicId of chapter.topicIds) {
        const topic = topicById.get(topicId);
        if (!topic) {
          fail.push('Chapter points to missing topic: ' + chapter.id + ' -> ' + topicId);
          continue;
        }
        if (topic.chapterId !== chapter.id) fail.push('Topic chapter mismatch: ' + topic.id);
        if (topic.lessonIds.length === 0) fail.push('Topic has no lesson mapping: ' + topic.id);

        const expectedCount = expectedQuestionsPerTopic[subject.id];
        const linkedIds = topic.practiceQuestionIds ?? [];
        if (linkedIds.length !== expectedCount) {
          fail.push(topic.id + ' must expose exactly ' + expectedCount + ' canonical practice questions; found ' + linkedIds.length);
        }
        const linkedSet = new Set(linkedIds);
        if (linkedSet.size !== linkedIds.length) fail.push('Duplicate practice question IDs in ' + topic.id);
        curriculumQuestionIds.push(...linkedIds);

        for (const qid of linkedIds) {
          const question = questionById.get(qid);
          if (!question) {
            fail.push(topic.id + ' references missing canonical question ' + qid);
            continue;
          }
          if (question.subjectId !== subject.id || question.chapterId !== chapter.id || question.topicId !== topic.id) {
            fail.push('Question taxonomy mismatch: ' + qid + ' linked from ' + topic.id);
          }
        }

        const topicLessons = lessonByTopic.get(topic.id) ?? [];
        if (topicLessons.length < 1) fail.push(topic.id + ' must map to at least one authoritative lesson; found ' + topicLessons.length);
        if (!masterySet.has(topic.id)) fail.push('Missing mastery/preparation content for topic ' + topic.id);
        const studyPages = chapterStudyPages[chapter.id] ?? [];
        if (studyPages.length !== 12) fail.push(chapter.id + ' must expose exactly 12 chapter-study pages; found ' + studyPages.length);
      }
    }
  }

  const curriculumSet = new Set(curriculumQuestionIds);
  if (curriculumQuestionIds.length !== 895 || curriculumSet.size !== 895) {
    fail.push('Curriculum-linked canonical question IDs must cover all 895 questions exactly once.');
  }
  for (const question of questions) {
    if (!curriculumSet.has(question.id)) fail.push('Canonical question is orphaned from curriculum practice lists: ' + question.id);
  }

  for (const topic of topics) {
    const dedicatedCount = challengerCounts.byTopic?.[topic.id] ?? 0;
    if (dedicatedCount < 20) {
      fail.push(topic.id + ' has only ' + dedicatedCount + ' dedicated Challenger questions; minimum is 20.');
    }
  }

  const dedicatedQuestions = challengers.dedicatedChallengerQuestions ?? [];
  const dedicatedIds = dedicatedQuestions.map((question) => question.id);
  if (new Set(dedicatedIds).size !== dedicatedIds.length) {
    fail.push('Dedicated Challenger question IDs must be unique.');
  }
  if (dedicatedQuestions.length < 1010) {
    fail.push('Dedicated Challenger bank must contain at least 1010 questions after Phase 11; found ' + dedicatedQuestions.length);
  }
  for (const question of dedicatedQuestions) {
    if (question.type !== 'mcq' || question.options.length !== 4 || question.correctOptionIds.length !== 1) {
      fail.push('Invalid dedicated Challenger structure: ' + question.id);
    }
    if (new Set(question.options.map((option) => option.text.trim().toLowerCase())).size !== 4) {
      fail.push('Duplicate dedicated Challenger option text: ' + question.id);
    }
    const isPhase11Question = /^(q_eng_tc_|q_sci_tc_)/.test(question.id);
    const explanationText = (question.explanation ?? [])
      .map((block) => 'text' in block ? block.text : 'expression' in block ? block.expression : '')
      .join(' ')
      .trim();
    if (isPhase11Question && explanationText.length < 15) {
      fail.push('Phase 11 Challenger explanation too short: ' + question.id);
    }
  }

  const subjectsSummary = {};
  for (const subject of subjects) {
    const subjectTopics = topics.filter((topic) => topic.chapterId.startsWith(subject.id === 'sub_eng' ? 'chap_eng_' : subject.id === 'sub_hin' ? 'chap_hin_' : subject.id === 'sub_math' ? 'chap_math_' : 'chap_sci_'));
    subjectsSummary[subject.id] = {
      chapters: chapters.filter((chapter) => chapter.subjectId === subject.id).length,
      topics: subjectTopics.length,
      canonicalQuestions: questions.filter((q) => q.subjectId === subject.id).length,
      lessons: subjectTopics.filter((topic) => (lessonByTopic.get(topic.id) ?? []).length >= 1).length,
      dedicatedChallengerTopics: subjectTopics.filter((topic) => (challengerCounts.byTopic?.[topic.id] ?? 0) >= 20).length,
    };
  }

  info.push('Subjects: ' + subjects.length);
  info.push('Chapters: ' + chapters.length);
  info.push('Topics: ' + topics.length);
  info.push('Lessons: ' + lessons.length);
  info.push('Canonical questions: ' + questions.length);
  info.push('Curriculum-linked question references: ' + curriculumQuestionIds.length + ' unique=' + curriculumSet.size);
  info.push('Dedicated Challenger total: ' + (challengerCounts.total ?? 0));
  info.push('Subject summary: ' + JSON.stringify(subjectsSummary));

  if (fail.length) {
    console.error('Phase 11 Content Completion FAILED.');
    for (const message of fail.slice(0, 120)) console.error('✗ ' + message);
    if (fail.length > 120) console.error('... and ' + (fail.length - 120) + ' more failures');
    process.exitCode = 1;
  } else {
    console.log('Phase 11 Content Completion PASSED.');
  }

  for (const message of info) console.log('• ' + message);
} finally {
  await vite.close();
}
