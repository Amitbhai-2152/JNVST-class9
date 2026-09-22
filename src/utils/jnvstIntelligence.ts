import type { ID, ProgressState, Question } from '../types';
import { chapters, subjects, topics } from '../data/curriculum';
import { jnvstExamQuestions } from '../data/questions';

export interface TopicPerformance {
  topicId: ID;
  topicTitle: string;
  subjectId: ID;
  subjectTitle: string;
  attempts: number;
  correct: number;
  accuracy: number;
  unseenQuestions: number;
  priority: 'उच्च' | 'मध्यम' | 'सामान्य';
}

export interface SmartRecommendation {
  topicId: ID;
  topicTitle: string;
  subjectTitle: string;
  reason: string;
  action: 'अभ्यास' | 'पुनरावृत्ति' | 'सीखना';
  score: number;
}

const topicById = new Map(topics.map((topic) => [topic.id, topic]));
const chapterById = new Map(chapters.map((chapter) => [chapter.id, chapter]));
const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));

export const getTopicPerformances = (progress: ProgressState): TopicPerformance[] =>
  topics
    .map((topic) => {
      const questions = jnvstExamQuestions.filter((question) => question.topicId === topic.id);
      if (!questions.length) return null;

      const attempts = questions.flatMap((question) => progress.questionAttempts?.[question.id] ?? []);
      const correct = attempts.filter((attempt) => attempt.isCorrect).length;
      const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
      const unseenQuestions = questions.filter((question) => !(progress.questionAttempts?.[question.id]?.length)).length;
      const priority: TopicPerformance['priority'] =
        !attempts.length ? 'सामान्य' : accuracy < 60 ? 'उच्च' : accuracy < 80 ? 'मध्यम' : 'सामान्य';

      const chapter = chapterById.get(topic.chapterId);
      const subject = chapter ? subjectById.get(chapter.subjectId) : undefined;

      return {
        topicId: topic.id,
        topicTitle: topic.title,
        subjectId: chapter?.subjectId ?? '',
        subjectTitle: subject?.title ?? 'विषय',
        attempts: attempts.length,
        correct,
        accuracy,
        unseenQuestions,
        priority,
      };
    })
    .filter((topic): topic is TopicPerformance => Boolean(topic));

export const getWeakTopics = (progress: ProgressState, limit = 4): TopicPerformance[] =>
  getTopicPerformances(progress)
    .filter((topic) => topic.attempts > 0 && topic.accuracy < 80)
    .sort((a, b) => {
      const priorityWeight = { उच्च: 3, मध्यम: 2, सामान्य: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority] || a.accuracy - b.accuracy || b.attempts - a.attempts;
    })
    .slice(0, limit);

export const getRevisionTopics = (progress: ProgressState, limit = 4, now = Date.now()): TopicPerformance[] => {
  const week = 7 * 24 * 60 * 60 * 1000;

  return getTopicPerformances(progress)
    .map((topic) => {
      const questionIds = jnvstExamQuestions
        .filter((question) => question.topicId === topic.topicId)
        .map((question) => question.id);
      const lastAttempt = Math.max(
        0,
        ...questionIds.flatMap((id) => (progress.questionAttempts?.[id] ?? []).map((attempt) => attempt.timestamp)),
      );
      return { topic, lastAttempt };
    })
    .filter(({ topic, lastAttempt }) => topic.attempts > 0 && lastAttempt > 0 && now - lastAttempt >= week)
    .sort((a, b) => a.lastAttempt - b.lastAttempt || a.topic.accuracy - b.topic.accuracy)
    .slice(0, limit)
    .map(({ topic }) => topic);
};

export const getSmartRecommendations = (progress: ProgressState, limit = 4): SmartRecommendation[] =>
  getTopicPerformances(progress)
    .map((topic) => {
      const chapter = topicById.get(topic.topicId)?.chapterId;
      const subject = chapter ? subjectById.get(chapterById.get(chapter)?.subjectId ?? '') : undefined;

      if (topic.attempts === 0) {
        return {
          topicId: topic.topicId,
          topicTitle: topic.topicTitle,
          subjectTitle: subject?.title ?? topic.subjectTitle,
          reason: 'इस विषयांश पर अभी आपका कोई प्रयास दर्ज नहीं है। पहले अवधारणा पढ़कर अभ्यास करें।',
          action: 'सीखना' as const,
          score: 60 + Math.min(20, topic.unseenQuestions),
        };
      }

      if (topic.accuracy < 60) {
        return {
          topicId: topic.topicId,
          topicTitle: topic.topicTitle,
          subjectTitle: topic.subjectTitle,
          reason: 'सटीकता ' + topic.accuracy + '% है। पहले इसी विषयांश पर लक्षित अभ्यास करें।',
          action: 'अभ्यास' as const,
          score: 100 - topic.accuracy,
        };
      }

      if (topic.accuracy < 80) {
        return {
          topicId: topic.topicId,
          topicTitle: topic.topicTitle,
          subjectTitle: topic.subjectTitle,
          reason: 'सटीकता ' + topic.accuracy + '% है। इसे 80% या उससे अधिक तक मजबूत करने के लिए अभ्यास करें।',
          action: 'अभ्यास' as const,
          score: 80 - topic.accuracy + 25,
        };
      }

      return {
        topicId: topic.topicId,
        topicTitle: topic.topicTitle,
        subjectTitle: topic.subjectTitle,
        reason: 'आपकी पकड़ अच्छी है। अब पुनरावृत्ति से इसे बनाए रखें।',
        action: 'पुनरावृत्ति' as const,
        score: 20,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

const stableHash = (value: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const topicOrder = new Map(topics.map((topic) => [topic.id, topic.order]));
const chapterOrder = new Map(chapters.map((chapter) => [chapter.id, chapter.order]));

const buildDiversifiedPractice = (
  progress: ProgressState,
  candidates: Question[],
  limit: number,
  seed: string,
): Question[] => {
  const weakTopicIds = new Set(
    getWeakTopics(progress, Math.max(4, topics.length))
      .map((topic) => topic.topicId),
  );

  const scored = candidates.map((question) => {
    const attempts = progress.questionAttempts?.[question.id] ?? [];
    const latest = attempts[attempts.length - 1];
    const daysSinceAttempt = latest ? (Date.now() - latest.timestamp) / (24 * 60 * 60 * 1000) : Infinity;
    let score = stableHash(seed + question.id) % 25;

    if (!attempts.length) score += 70;
    if (weakTopicIds.has(question.topicId)) score += 55;
    if (latest && !latest.isCorrect) score += 65;
    if (latest?.isCorrect) score += 12;
    if (daysSinceAttempt >= 7) score += 20;
    if (question.difficulty === 'hard') score += 8;
    if (question.difficulty === 'challenge') score += 12;

    return { question, score };
  }).sort((a, b) => b.score - a.score || a.question.id.localeCompare(b.question.id));

  const result: Question[] = [];
  const used = new Set<string>();
  const perTopic = new Map<ID, number>();

  // First pass: breadth. Never let one weak topic consume the whole set.
  for (const item of scored) {
    if (result.length >= limit) break;
    const count = perTopic.get(item.question.topicId) ?? 0;
    if (count >= 2) continue;
    result.push(item.question);
    used.add(item.question.id);
    perTopic.set(item.question.topicId, count + 1);
  }

  // Second pass: fill remaining slots using the strongest unseen candidates.
  for (const item of scored) {
    if (result.length >= limit) break;
    if (used.has(item.question.id)) continue;
    result.push(item.question);
  }

  return result;
};

export const getSmartPracticeQuestionsForSubject = (
  progress: ProgressState,
  subjectId: ID,
  limit = 10,
): Question[] => {
  const candidates = jnvstExamQuestions.filter((question) => question.subjectId === subjectId);
  return buildDiversifiedPractice(progress, candidates, limit, 'jnvst-smart-' + subjectId);
};

export const getSmartPracticeQuestions = (progress: ProgressState, limit = 10): Question[] =>
  buildDiversifiedPractice(progress, jnvstExamQuestions, limit, 'jnvst-smart-all');

export const getMathSmartPracticeQuestions = (progress: ProgressState, limit = 12, seed = 'jnvst-math-smart'): Question[] => {
  const mathTopics = topics
    .filter((topic) => chapterOrder.has(topic.chapterId))
    .filter((topic) => topic.chapterId.startsWith('chap_math_'))
    .sort((a, b) => (chapterOrder.get(a.chapterId)! - chapterOrder.get(b.chapterId)!) || (a.order - b.order));

  const candidates = jnvstExamQuestions.filter((question) => question.subjectId === 'sub_math');
  const scored = candidates.map((question) => {
    const attempts = progress.questionAttempts?.[question.id] ?? [];
    const latest = attempts[attempts.length - 1];
    const daysSinceAttempt = latest ? (Date.now() - latest.timestamp) / (24 * 60 * 60 * 1000) : Infinity;
    let score = stableHash(seed + ':' + question.id) % 30;

    if (!attempts.length) score += 80;
    if (latest && !latest.isCorrect) score += 90;
    if (daysSinceAttempt >= 7) score += 25;
    if (question.difficulty === 'hard') score += 8;
    if (question.difficulty === 'challenge') score += 12;

    const topicPerformance = getTopicPerformances(progress).find((topic) => topic.topicId === question.topicId);
    if (topicPerformance?.attempts && topicPerformance.accuracy < 80) score += 55;
    if (!topicPerformance?.attempts) score += 20;

    return { question, score };
  }).sort((a, b) => b.score - a.score || a.question.id.localeCompare(b.question.id));

  const result: Question[] = [];
  const used = new Set<ID>();

  // First guarantee: every official Math unit gets one adaptive question.
  for (const topic of mathTopics) {
    const item = scored.find((entry) => entry.question.topicId === topic.id && !used.has(entry.question.id));
    if (!item) continue;
    result.push(item.question);
    used.add(item.question.id);
    if (result.length >= limit) return result;
  }

  // Then use the remaining slots for the student's weakest/recently wrong questions.
  for (const item of scored) {
    if (result.length >= limit) break;
    if (used.has(item.question.id)) continue;
    result.push(item.question);
    used.add(item.question.id);
  }

  return result;
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

export const buildMathMockPaper = (seed = 'jnvst-math-2027'): Question[] => {
  const mathTopics = topics
    .filter((topic) => topic.chapterId.startsWith('chap_math_'))
    .sort((a, b) => (chapterOrder.get(a.chapterId)! - chapterOrder.get(b.chapterId)!) || (topicOrder.get(a.id)! - topicOrder.get(b.id)!));

  const buckets = mathTopics.map((topic) => {
    const questions = jnvstExamQuestions
      .filter((question) => question.topicId === topic.id)
      .sort((a, b) => stableHash(seed + topic.id + a.id) - stableHash(seed + topic.id + b.id));
    return questions.slice(0, 3);
  });

  const base = buckets.flat();
  const used = new Set(base.map((question) => question.id));
  const extras = jnvstExamQuestions
    .filter((question) => question.subjectId === 'sub_math' && !used.has(question.id))
    .sort((a, b) => stableHash(seed + ':extra:' + a.id) - stableHash(seed + ':extra:' + b.id))
    .slice(0, 35 - base.length);

  return [...base, ...extras];
};

export const getPerformanceSummary = (progress: ProgressState) => {
  const attempts = Object.values(progress.questionAttempts ?? {}).flat();
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const performances = getTopicPerformances(progress);

  return {
    totalAttempts: attempts.length,
    overallAccuracy: attempts.length ? Math.round((correct / attempts.length) * 100) : 0,
    attemptedTopics: performances.filter((topic) => topic.attempts > 0).length,
    totalTopics: performances.length,
    weakTopics: performances.filter((topic) => topic.priority === 'उच्च').length,
    practiceReadyQuestions: jnvstExamQuestions.length,
  };
};

export const jnvstClass9Phase4Complete = {
  चरण: 'चरण 4 — व्यक्तिगत तैयारी बुद्धिमत्ता',
  स्थिति: 'पूरा',
  सुविधाएँ: [
    'विषयांश-स्तर प्रदर्शन विश्लेषण',
    'कमजोर क्षेत्रों की पहचान',
    'स्वचालित पुनरावृत्ति सूची',
    'व्यक्तिगत अगला-अध्ययन सुझाव',
    'गलत और अनदेखे प्रश्नों पर लक्षित स्मार्ट अभ्यास',
    'JNVST वितरण के अनुसार 100-प्रश्न मॉक पेपर निर्माण',
    'विषय-विशेष स्मार्ट अभ्यास और गणित-only 35-प्रश्न मॉक पेपर',
  ],
  निर्णय_नियम: 'सुझाव प्रयास, सटीकता, अनदेखे प्रश्न, पिछली पुनरावृत्ति के समय और topic-breadth पर आधारित हैं।',
};
