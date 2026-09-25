import type { Difficulty, ID, Question, QuestionAttempt } from '../types';

export type QuestionBankSelectionMode = 'smart' | 'random';

type SelectionHistory = Record<ID, QuestionAttempt[]>;

export interface QuestionNeedProfile {
  questionId: ID;
  topicId: ID;
  attempts: number;
  accuracy: number;
  lastAttemptAt: number | null;
  daysSinceAttempt: number | null;
  needScore: number;
  difficultyFit: number;
}

export interface SmartSelectionResult {
  questions: Question[];
  profiles: QuestionNeedProfile[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

const getPracticeAttempts = (history: SelectionHistory, questionId: ID) =>
  (history[questionId] ?? []).filter((attempt) => attempt.mode === 'practice');

const profileFor = (
  question: Question,
  history: SelectionHistory,
  now: number,
): QuestionNeedProfile => {
  const attempts = getPracticeAttempts(history, question.id);
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
  const lastAttemptAt = attempts.length
    ? Math.max(...attempts.map((attempt) => attempt.timestamp))
    : null;
  const daysSinceAttempt = lastAttemptAt === null
    ? null
    : Math.max(0, (now - lastAttemptAt) / DAY_MS);

  let needScore = 0;

  if (!attempts.length) needScore += 140;
  else if (accuracy < 50) needScore += 90;
  else if (accuracy < 70) needScore += 65;
  else if (accuracy < 85) needScore += 35;
  else needScore += 10;

  if (daysSinceAttempt !== null) {
    if (daysSinceAttempt >= 30) needScore += 45;
    else if (daysSinceAttempt >= 14) needScore += 30;
    else if (daysSinceAttempt >= 7) needScore += 20;
    else if (daysSinceAttempt >= 2) needScore += 8;
  }

  let difficultyFit = 0;
  if (!attempts.length) {
    difficultyFit = question.difficulty === 'medium' ? 20 : question.difficulty === 'easy' ? 12 : question.difficulty === 'hard' ? 7 : 3;
  } else if (accuracy < 60) {
    difficultyFit = question.difficulty === 'easy' ? 18 : question.difficulty === 'medium' ? 14 : question.difficulty === 'hard' ? 6 : 2;
  } else if (accuracy < 80) {
    difficultyFit = question.difficulty === 'medium' ? 18 : question.difficulty === 'hard' ? 12 : question.difficulty === 'easy' ? 10 : 5;
  } else {
    difficultyFit = question.difficulty === 'hard' ? 18 : question.difficulty === 'challenge' ? 16 : question.difficulty === 'medium' ? 11 : 6;
  }

  return {
    questionId: question.id,
    topicId: question.topicId,
    attempts: attempts.length,
    accuracy,
    lastAttemptAt,
    daysSinceAttempt,
    needScore,
    difficultyFit,
  };
};

const compareProfiles = (a: QuestionNeedProfile, b: QuestionNeedProfile) =>
  (b.needScore + b.difficultyFit) - (a.needScore + a.difficultyFit);

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
};

const tieShuffle = (profiles: QuestionNeedProfile[]) => {
  const grouped = new Map<number, QuestionNeedProfile[]>();
  profiles.forEach((profile) => {
    const key = profile.needScore + profile.difficultyFit;
    grouped.set(key, [...(grouped.get(key) ?? []), profile]);
  });
  return Array.from(grouped.entries())
    .sort((a, b) => b[0] - a[0])
    .flatMap(([, group]) => shuffle(group));
};

export const rankQuestionNeed = (
  questions: readonly Question[],
  history: SelectionHistory,
  now = Date.now(),
): QuestionNeedProfile[] =>
  tieShuffle(
    questions.map((question) => profileFor(question, history, now)),
  );

const balancedPick = (
  rankedQuestions: Question[],
  profilesById: ReadonlyMap<ID, QuestionNeedProfile>,
  size: number,
) => {
  if (!rankedQuestions.length || size <= 0) return [];

  const topicQueues = new Map<ID, Question[]>();
  rankedQuestions.forEach((question) => {
    const queue = topicQueues.get(question.topicId) ?? [];
    queue.push(question);
    topicQueues.set(question.topicId, queue);
  });

  const topicOrder = Array.from(topicQueues.keys()).sort((topicA, topicB) => {
    const scoreA = Math.max(...(topicQueues.get(topicA) ?? []).map((question) => {
      const profile = profilesById.get(question.id);
      return profile ? profile.needScore + profile.difficultyFit : 0;
    }));
    const scoreB = Math.max(...(topicQueues.get(topicB) ?? []).map((question) => {
      const profile = profilesById.get(question.id);
      return profile ? profile.needScore + profile.difficultyFit : 0;
    }));
    return scoreB - scoreA || topicA.localeCompare(topicB);
  });

  const selected: Question[] = [];
  let cursor = 0;

  while (selected.length < size && topicOrder.length) {
    const topicId = topicOrder[cursor % topicOrder.length];
    const queue = topicQueues.get(topicId) ?? [];
    if (queue.length) selected.push(queue.shift()!);
    if (!queue.length) topicOrder.splice(cursor % topicOrder.length, 1);
    else cursor += 1;
  }

  return selected;
};

export const selectQuestionBankSession = (
  candidates: readonly Question[],
  history: SelectionHistory,
  size: number,
  mode: QuestionBankSelectionMode,
  now = Date.now(),
): SmartSelectionResult => {
  const safeSize = Math.min(Math.max(size, 0), candidates.length);
  if (!safeSize) return { questions: [], profiles: [] };

  if (mode === 'random') {
    const randomized = shuffle([...candidates]).slice(0, safeSize);
    return {
      questions: randomized,
      profiles: randomized.map((question) => profileFor(question, history, now)),
    };
  }

  const profiles = rankQuestionNeed(candidates, history, now);
  const profilesById = new Map(profiles.map((profile) => [profile.questionId, profile]));
  const rankedQuestions = profiles
    .map((profile) => candidates.find((question) => question.id === profile.questionId))
    .filter((question): question is Question => Boolean(question));

  const selected = balancedPick(rankedQuestions, profilesById, safeSize);
  return {
    questions: selected,
    profiles: profiles.filter((profile) => selected.some((question) => question.id === profile.questionId)),
  };
};

export const getSelectionRationale = (profile: QuestionNeedProfile): string => {
  if (profile.attempts === 0) return 'पहली बार अभ्यास';
  if (profile.accuracy < 50) return 'कम accuracy';
  if (profile.accuracy < 70) return 'कमजोर क्षेत्र';
  if (profile.daysSinceAttempt !== null && profile.daysSinceAttempt >= 14) return 'काफी समय से दोहराव नहीं';
  if (profile.daysSinceAttempt !== null && profile.daysSinceAttempt >= 7) return 'पुनरावृत्ति बाकी';
  return 'अनुकूली अभ्यास';
};
