import type { ID, ProgressState, Question } from '../types';
import { chapters, subjects, विषयांशs } from '../data/curriculum';
import { jnvstExamQuestions } from '../data/questions';

export interface विषयांशPerformance {
  विषयांशId: ID;
  विषयांशTitle: string;
  subjectId: ID;
  subjectTitle: string;
  attempts: number;
  correct: number;
  accuracy: number;
  unseenQuestions: number;
  priority: 'उच्च' | 'मध्यम' | 'सामान्य';
}

export interface SmartRecommendation {
  विषयांशId: ID;
  विषयांशTitle: string;
  subjectTitle: string;
  reason: string;
  action: 'अभ्यास' | 'पुनरावृत्ति' | 'सीखना';
  score: number;
}

const विषयांशById = new Map(विषयांशs.map((विषयांश) => [विषयांश.id, विषयांश]));
const chapterById = new Map(chapters.map((chapter) => [chapter.id, chapter]));
const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));

export const getविषयांशPerformances = (progress: ProgressState): विषयांशPerformance[] =>
  विषयांशs.map((विषयांश) => {
    const questions = jnvstExamQuestions.filter((question) => question.विषयांशId === विषयांश.id);
    if (!questions.length) return null;
    const attempts = questions.flatMap((question) => progress.questionAttempts?.[question.id] ?? []);
    const correct = attempts.filter((attempt) => attempt.isCorrect).length;
    const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
    const unseenQuestions = questions.filter((question) => !(progress.questionAttempts?.[question.id]?.length)).length;
    const priority: विषयांशPerformance['priority'] =
      !attempts.length ? 'सामान्य' : accuracy < 60 ? 'उच्च' : accuracy < 80 ? 'मध्यम' : 'सामान्य';

    const chapter = chapterById.get(विषयांश.chapterId);
    const subject = chapter ? subjectById.get(chapter.subjectId) : undefined;

    return {
      विषयांशId: विषयांश.id,
      विषयांशTitle: विषयांश.title,
      subjectId: chapter?.subjectId ?? '',
      subjectTitle: subject?.title ?? 'विषय',
      attempts: attempts.length,
      correct,
      accuracy,
      unseenQuestions,
      priority,
    };
  }).filter((विषयांश): विषयांश is विषयांशPerformance => Boolean(विषयांश));

export const getWeakविषयांशs = (progress: ProgressState, limit = 4): विषयांशPerformance[] =>
  getविषयांशPerformances(progress)
    .filter((विषयांश) => विषयांश.attempts > 0 && विषयांश.accuracy < 80)
    .sort((a, b) => {
      const priorityWeight = { उच्च: 3, मध्यम: 2, सामान्य: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority] || a.accuracy - b.accuracy || b.attempts - a.attempts;
    })
    .slice(0, limit);

export const getRevisionविषयांशs = (progress: ProgressState, limit = 4, now = Date.now()): विषयांशPerformance[] => {
  const week = 7 * 24 * 60 * 60 * 1000;

  return getविषयांशPerformances(progress)
    .map((विषयांश) => {
      const questionIds = jnvstExamQuestions
        .filter((question) => question.विषयांशId === विषयांश.विषयांशId)
        .map((question) => question.id);
      const lastAttempt = Math.max(
        0,
        ...questionIds.flatMap((id) => (progress.questionAttempts?.[id] ?? []).map((attempt) => attempt.timestamp)),
      );
      return { विषयांश, lastAttempt };
    })
    .filter(({ विषयांश, lastAttempt }) => विषयांश.attempts > 0 && lastAttempt > 0 && now - lastAttempt >= week)
    .sort((a, b) => a.lastAttempt - b.lastAttempt || a.विषयांश.accuracy - b.विषयांश.accuracy)
    .slice(0, limit)
    .map(({ विषयांश }) => विषयांश);
};

export const getSmartRecommendations = (progress: ProgressState, limit = 4): SmartRecommendation[] =>
  getविषयांशPerformances(progress)
    .map((विषयांश) => {
      const chapter = विषयांशById.get(विषयांश.विषयांशId)?.chapterId;
      const subject = chapter ? subjectById.get(chapterById.get(chapter)?.subjectId ?? '') : undefined;

      if (विषयांश.attempts === 0) {
        return {
          विषयांशId: विषयांश.विषयांशId,
          विषयांशTitle: विषयांश.विषयांशTitle,
          subjectTitle: subject?.title ?? विषयांश.subjectTitle,
          reason: 'इस विषयांश पर अभी आपका कोई प्रयास दर्ज नहीं है। पहले अवधारणा पढ़कर अभ्यास करें।',
          action: 'सीखना' as const,
          score: 60 + Math.min(20, विषयांश.unseenQuestions),
        };
      }

      if (विषयांश.accuracy < 60) {
        return {
          विषयांशId: विषयांश.विषयांशId,
          विषयांशTitle: विषयांश.विषयांशTitle,
          subjectTitle: विषयांश.subjectTitle,
          reason: 'सटीकता ' + विषयांश.accuracy + '% है। पहले इसी विषयांश पर लक्षित अभ्यास करें।',
          action: 'अभ्यास' as const,
          score: 100 - विषयांश.accuracy,
        };
      }

      if (विषयांश.accuracy < 80) {
        return {
          विषयांशId: विषयांश.विषयांशId,
          विषयांशTitle: विषयांश.विषयांशTitle,
          subjectTitle: विषयांश.subjectTitle,
          reason: 'सटीकता ' + विषयांश.accuracy + '% है। इसे 80% या उससे अधिक तक मजबूत करने के लिए अभ्यास करें।',
          action: 'अभ्यास' as const,
          score: 80 - विषयांश.accuracy + 25,
        };
      }

      return {
        विषयांशId: विषयांश.विषयांशId,
        विषयांशTitle: विषयांश.विषयांशTitle,
        subjectTitle: विषयांश.subjectTitle,
        reason: 'आपकी पकड़ अच्छी है। अब पुनरावृत्ति से इसे बनाए रखें।',
        action: 'पुनरावृत्ति' as const,
        score: 20,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

export const getSmartPracticeQuestions = (progress: ProgressState, limit = 10): Question[] => {
  const weakविषयांशIds = new Set(getWeakविषयांशs(progress, 4).map((विषयांश) => विषयांश.विषयांशId));

  return jnvstExamQuestions
    .map((question) => {
      const attempts = progress.questionAttempts?.[question.id] ?? [];
      const latest = attempts[attempts.length - 1];
      let score = 0;

      if (!attempts.length) score += 40;
      if (weakविषयांशIds.has(question.विषयांशId)) score += 45;
      if (latest && !latest.isCorrect) score += 35;
      if (question.difficulty === 'hard' || question.difficulty === 'challenge') score += 5;

      return { question, score };
    })
    .sort((a, b) => b.score - a.score || a.question.id.localeCompare(b.question.id))
    .slice(0, limit)
    .map(({ question }) => question);
};

const stableHash = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const buildJnvstMockPaper = (seed = 'jnvst-2027'): Question[] => {
  const sectionTargets: Record<string, number> = {
    sub_hin: 15,
    sub_eng: 15,
    sub_math: 35,
    sub_sci: 35,
  };

  return Object.entries(sectionTargets).flatMap(([subjectId, target]) =>
    jnvstExamQuestions
      .filter((question) => question.subjectId === subjectId)
      .sort((a, b) => stableHash(seed + a.id) - stableHash(seed + b.id))
      .slice(0, target),
  );
};

export const getPerformanceSummary = (progress: ProgressState) => {
  const attempts = Object.values(progress.questionAttempts ?? {}).flat();
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const performances = getविषयांशPerformances(progress);

  return {
    totalAttempts: attempts.length,
    overallAccuracy: attempts.length ? Math.round((correct / attempts.length) * 100) : 0,
    attemptedविषयांशs: performances.filter((विषयांश) => विषयांश.attempts > 0).length,
    totalविषयांशs: performances.length,
    weakविषयांशs: performances.filter((विषयांश) => विषयांश.priority === 'उच्च').length,
    practiceReadyQuestions: jnvstExamQuestions.length,
  };
};
