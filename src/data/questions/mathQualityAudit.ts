import { chapters, topics } from '../curriculum';
import { mathLessonsData } from '../lessons/math';
import { mathQuestions } from './math';
import { mathChapterChallengers } from './mathChapterChallengers';

const mathSubjectId = 'sub_math';
const mathChapters = chapters.filter((chapter) => chapter.subjectId === mathSubjectId);
const mathTopics = topics.filter((topic) => mathChapters.some((chapter) => chapter.id === topic.chapterId));
const mathLessons = mathLessonsData;

const lessonTopicIds = new Set(mathLessons.map((lesson) => lesson.topicId));
const questionCounts = Object.fromEntries(
  mathTopics.map((topic) => [topic.id, mathQuestions.filter((question) => question.topicId === topic.id).length]),
);
const lessonCounts = Object.fromEntries(
  mathTopics.map((topic) => [topic.id, mathLessons.filter((lesson) => lesson.topicId === topic.id).length]),
);

const missingTopics = mathTopics
  .filter((topic) => !lessonTopicIds.has(topic.id))
  .map((topic) => topic.id);

const emptyQuestionTopics = mathTopics
  .filter((topic) => (questionCounts[topic.id] ?? 0) === 0)
  .map((topic) => topic.id);

const mappingProblems = mathLessons
  .filter((lesson) => !mathTopics.some((topic) => topic.id === lesson.topicId))
  .map((lesson) => ({ lessonId: lesson.id, topicId: lesson.topicId }));

const weakLessonCoverage = mathTopics
  .filter((topic) => (lessonCounts[topic.id] ?? 0) < 1)
  .map((topic) => ({ topicId: topic.id, lessonCount: lessonCounts[topic.id] ?? 0 }));

const mathMcqCount = mathQuestions.filter((question) => question.type === 'mcq').length;
const targetQuestionsPerTopic = 20;
const belowQuestionTarget = mathTopics
  .filter((topic) => (questionCounts[topic.id] ?? 0) < targetQuestionsPerTopic)
  .map((topic) => ({ topicId: topic.id, questionCount: questionCounts[topic.id] ?? 0 }));

const mathJnvstCount = mathQuestions.filter((question) =>
  question.type === 'mcq' &&
  question.options.length === 4 &&
  question.correctOptionIds.length === 1,
).length;

const challengerQuestions = [...mathQuestions, ...mathChapterChallengers];
const challengerCountByChapter = Object.fromEntries(
  mathChapters.map((chapter) => [
    chapter.id,
    challengerQuestions.filter((question) =>
      question.chapterId === chapter.id &&
      question.type === 'mcq' &&
      question.options.length === 4 &&
      question.correctOptionIds.length === 1 &&
      new Set(question.options.map((option) => option.text.trim().toLowerCase())).size === 4,
    ).length,
  ]),
);
const chaptersBelowChallengerTarget = mathChapters
  .filter((chapter) => (challengerCountByChapter[chapter.id] ?? 0) < 20)
  .map((chapter) => ({ chapterId: chapter.id, count: challengerCountByChapter[chapter.id] ?? 0 }));

export const jnvstMathQualityAudit = {
  विषय: 'गणित',
  अध्याय: mathChapters.length,
  आधिकारिक_मुख्य_विषयांश: mathTopics.length,
  स्रोत_पाठ: mathLessons.length,
  कुल_प्रश्न: mathQuestions.length,
  MCQ: mathMcqCount,
  JNVST_अनुकूल_MCQ: mathJnvstCount,
  विषयांश_वार_प्रश्न: questionCounts,
  विषयांश_वार_पाठ: lessonCounts,
  अनुपलब्ध_पाठ_विषयांश: missingTopics,
  शून्य_प्रश्न_विषयांश: emptyQuestionTopics,
  गलत_मैपिंग: mappingProblems,
  कम_पाठ_कवरेज: weakLessonCoverage,
  न्यूनतम_प्रश्न_लक्ष्य: targetQuestionsPerTopic,
  प्रश्न_लक्ष्य_से_कम: belowQuestionTarget,
  Challenger_प्रश्न_वार_अध्याय: challengerCountByChapter,
  Challenger_20_लक्ष्य_से_कम: chaptersBelowChallengerTarget,
  सूत्र_पुनरावृत्ति: 'MathFormulaSheetPage में सभी 11 मुख्य गणित इकाइयाँ शामिल हैं।',
};

export const jnvstMathQualityStatus = {
  स्थिति: missingTopics.length || emptyQuestionTopics.length || mappingProblems.length || belowQuestionTarget.length || chaptersBelowChallengerTarget.length ? 'समीक्षा आवश्यक' : 'जाँच पूर्ण',
  टिप्पणी: 'गणित की content, topic mapping, question depth और JNVST-compatible coverage को source-level checks से जाँचा जाता है।',
};
