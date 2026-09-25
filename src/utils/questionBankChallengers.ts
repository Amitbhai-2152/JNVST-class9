import type { ID, Question } from '../types';
import { chapters, topics } from '../data/curriculum';
import { englishChapterChallengers } from '../data/questions/englishChallengers';
import { englishChapterChallengersExtra } from '../data/questions/englishChapterChallengersExtra';
import { hindiChapterChallengers } from '../data/questions/hindiChapterChallengers';
import { hindiTopicChallengers } from '../data/questions/hindiTopicChallengers';
import { mathChapterChallengers } from '../data/questions/mathChapterChallengers';
import { mathTopicChallengersV2 } from '../data/questions/mathTopicChallengersV2';
import { scienceChapterChallengers } from '../data/questions/scienceChapterChallengers';

export const dedicatedChallengerQuestions: readonly Question[] = [
  ...englishChapterChallengers,
  ...englishChapterChallengersExtra,
  ...hindiChapterChallengers,
  ...hindiTopicChallengers,
  ...mathChapterChallengers,
  ...mathTopicChallengersV2,
  ...scienceChapterChallengers,
];

const eligible = (question: Question): boolean =>
  question.type === 'mcq' &&
  question.options.length === 4 &&
  question.correctOptionIds.length === 1 &&
  new Set(question.options.map((option) => option.text.trim().toLowerCase())).size === 4;

const unique = (questions: Question[]): Question[] =>
  [...new Map(questions.filter(eligible).map((question) => [question.id, question])).values()];

const shuffle = <T,>(items: T[], seed = ''): T[] => {
  const copy = [...items];
  let hash = 2166136261;
  for (const char of seed) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  for (let index = copy.length - 1; index > 0; index -= 1) {
    hash ^= index;
    hash = Math.imul(hash, 16777619);
    const swapIndex = Math.abs(hash >>> 0) % (index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
};

const chapterPool = (chapterId: ID): Question[] =>
  unique(dedicatedChallengerQuestions.filter((question) => question.chapterId === chapterId));

const topicPool = (topicId: ID): Question[] =>
  unique(dedicatedChallengerQuestions.filter((question) => question.topicId === topicId));

export const getDedicatedTopicChallengers = (topicId: ID, limit = 20, seed = 'question-bank-topic-challenger'): Question[] => {
  const pool = topicPool(topicId);
  if (pool.length < 20) return [];
  return shuffle(pool, seed + ':' + topicId).slice(0, Math.min(limit, pool.length));
};

export const getDedicatedChapterChallengers = (chapterId: ID, limit = 20, seed = 'question-bank-chapter-challenger'): Question[] => {
  const pool = chapterPool(chapterId);
  if (pool.length < 20) return [];
  return shuffle(pool, seed + ':' + chapterId).slice(0, Math.min(limit, pool.length));
};

export const getDedicatedSubjectChallengers = (subjectId: ID, limit = 20, seed = 'question-bank-subject-challenger'): Question[] => {
  const chapterIds = chapters
    .filter((chapter) => chapter.subjectId === subjectId)
    .sort((a, b) => a.order - b.order)
    .map((chapter) => chapter.id);

  const chapterPools = chapterIds
    .map((chapterId) => ({ chapterId, questions: chapterPool(chapterId) }))
    .filter((entry) => entry.questions.length > 0);

  if (!chapterPools.length) return [];

  const selected: Question[] = [];
  const selectedIds = new Set<ID>();

  // Give every chapter a chance before filling remaining positions.
  let cursor = 0;
  while (selected.length < Math.min(limit, 20) && chapterPools.length) {
    const entry = chapterPools[cursor % chapterPools.length];
    const next = shuffle(entry.questions, seed + ':' + subjectId + ':' + entry.chapterId + ':' + cursor)
      .find((question) => !selectedIds.has(question.id));
    if (next) {
      selected.push(next);
      selectedIds.add(next.id);
    }
    cursor += 1;
    if (cursor > chapterPools.length * 30) break;
  }

  const remaining = shuffle(
    chapterPools.flatMap((entry) => entry.questions).filter((question) => !selectedIds.has(question.id)),
    seed + ':' + subjectId + ':fill',
  );

  for (const question of remaining) {
    if (selected.length >= Math.min(limit, 20)) break;
    selected.push(question);
  }

  return selected;
};

export const getDedicatedChallengerCounts = () => ({
  total: unique([...dedicatedChallengerQuestions]).length,
  bySubject: Object.fromEntries(
    ['sub_eng', 'sub_hin', 'sub_math', 'sub_sci'].map((subjectId) => [
      subjectId,
      unique(dedicatedChallengerQuestions.filter((question) => question.subjectId === subjectId)).length,
    ]),
  ),
  byChapter: Object.fromEntries(
    chapters.map((chapter) => [chapter.id, chapterPool(chapter.id).length]),
  ),
  byTopic: Object.fromEntries(
    topics.map((topic) => [topic.id, topicPool(topic.id).length]),
  ),
});

export const hasDedicatedChallengerForScope = (scope: 'subject' | 'chapter' | 'topic', id: ID): boolean => {
  if (scope === 'topic') return topicPool(id).length >= 20;
  if (scope === 'chapter') return chapterPool(id).length >= 20;
  return getDedicatedSubjectChallengers(id, 20).length >= 20;
};

export const getDedicatedChallengerScopeLabel = (scope: 'subject' | 'chapter' | 'topic'): string =>
  scope === 'topic' ? 'विषयांश' : scope === 'chapter' ? 'अध्याय' : 'विषय';
