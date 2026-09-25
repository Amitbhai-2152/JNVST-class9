import type { Difficulty, ID, ProgressState } from '../types';
import type { QuestionBankTaxonomy } from '../data/questionBank';

export interface QuestionBankPerformanceBucket {
  id: ID;
  label: string;
  attemptedQuestions: number;
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  accuracy: number;
}

export interface QuestionBankProgressSummary {
  attemptedQuestions: number;
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  accuracy: number;
  lastAttemptAt: number | null;
  byTopic: QuestionBankPerformanceBucket[];
  byChapter: QuestionBankPerformanceBucket[];
  byDifficulty: QuestionBankPerformanceBucket[];
}

const emptyBucket = (id: ID, label: string): QuestionBankPerformanceBucket => ({
  id, label, attemptedQuestions: 0, totalAttempts: 0, correctAttempts: 0, incorrectAttempts: 0, accuracy: 0,
});

const finalize = (bucket: QuestionBankPerformanceBucket): QuestionBankPerformanceBucket => ({
  ...bucket,
  accuracy: bucket.totalAttempts ? Math.round((bucket.correctAttempts / bucket.totalAttempts) * 100) : 0,
});

const sortBuckets = (buckets: QuestionBankPerformanceBucket[]) =>
  buckets
    .filter((bucket) => bucket.totalAttempts > 0)
    .sort((a, b) =>
      a.accuracy - b.accuracy ||
      b.attemptedQuestions - a.attemptedQuestions ||
      b.totalAttempts - a.totalAttempts ||
      a.label.localeCompare(b.label),
    );

export const getQuestionBankProgressSummary = (
  progress: Pick<ProgressState, 'questionAttempts'>,
  questionById: ReadonlyMap<ID, { subjectId: ID; chapterId: ID; topicId: ID; difficulty: Difficulty }>,
  taxonomy: QuestionBankTaxonomy,
): QuestionBankProgressSummary => {
  const topicMap = new Map(taxonomy.topics.map((topic) => [topic.id, topic.title]));
  const chapterMap = new Map(taxonomy.chapters.map((chapter) => [chapter.id, chapter.title]));

  const byTopic = new Map<ID, QuestionBankPerformanceBucket>();
  const byChapter = new Map<ID, QuestionBankPerformanceBucket>();
  const byDifficulty = new Map<Difficulty, QuestionBankPerformanceBucket>();
  const attemptedQuestionIds = new Set<ID>();

  let totalAttempts = 0;
  let correctAttempts = 0;
  let incorrectAttempts = 0;
  let lastAttemptAt: number | null = null;

  Object.entries(progress.questionAttempts ?? {}).forEach(([questionId, rawAttempts]) => {
    const question = questionById.get(questionId);
    if (!question) return;

    const practiceAttempts = rawAttempts.filter((attempt) => attempt.mode === 'practice');
    if (!practiceAttempts.length) return;

    attemptedQuestionIds.add(questionId);

    const topic = byTopic.get(question.topicId) ?? emptyBucket(question.topicId, topicMap.get(question.topicId) ?? question.topicId);
    const chapter = byChapter.get(question.chapterId) ?? emptyBucket(question.chapterId, chapterMap.get(question.chapterId) ?? question.chapterId);
    const difficulty = byDifficulty.get(question.difficulty) ?? emptyBucket(question.difficulty, question.difficulty);

    topic.attemptedQuestions = Math.max(topic.attemptedQuestions, 1);
    chapter.attemptedQuestions = Math.max(chapter.attemptedQuestions, 1);
    difficulty.attemptedQuestions = Math.max(difficulty.attemptedQuestions, 1);

    practiceAttempts.forEach((attempt) => {
      totalAttempts += 1;
      if (attempt.isCorrect) {
        correctAttempts += 1;
        topic.correctAttempts += 1;
        chapter.correctAttempts += 1;
        difficulty.correctAttempts += 1;
      } else {
        incorrectAttempts += 1;
        topic.incorrectAttempts += 1;
        chapter.incorrectAttempts += 1;
        difficulty.incorrectAttempts += 1;
      }

      topic.totalAttempts += 1;
      chapter.totalAttempts += 1;
      difficulty.totalAttempts += 1;

      if (lastAttemptAt === null || attempt.timestamp > lastAttemptAt) lastAttemptAt = attempt.timestamp;
    });

    byTopic.set(question.topicId, topic);
    byChapter.set(question.chapterId, chapter);
    byDifficulty.set(question.difficulty, difficulty);
  });

  return {
    attemptedQuestions: attemptedQuestionIds.size,
    totalAttempts,
    correctAttempts,
    incorrectAttempts,
    accuracy: totalAttempts ? Math.round((correctAttempts / totalAttempts) * 100) : 0,
    lastAttemptAt,
    byTopic: sortBuckets(Array.from(byTopic.values())).map(finalize),
    byChapter: sortBuckets(Array.from(byChapter.values())).map(finalize),
    byDifficulty: sortBuckets(Array.from(byDifficulty.values())).map(finalize),
  };
};

export const getQuestionPerformance = (progress: ProgressState, questionId: ID) => {
  const attempts = (progress.questionAttempts?.[questionId] ?? []).filter((attempt) => attempt.mode === 'practice');
  const correctAttempts = attempts.filter((attempt) => attempt.isCorrect).length;
  return {
    totalAttempts: attempts.length,
    correctAttempts,
    incorrectAttempts: attempts.length - correctAttempts,
    accuracy: attempts.length ? Math.round((correctAttempts / attempts.length) * 100) : 0,
    lastAttempt: attempts.length ? attempts[attempts.length - 1] : null,
  };
};
