import { chapters, topics } from '../curriculum';
import { scienceLessonsData } from '../lessons/science';
import { scienceQuestions } from './science';

const scienceSubjectId = 'sub_sci';
const scienceChapters = chapters.filter((chapter) => chapter.subjectId === scienceSubjectId);
const scienceTopics = topics.filter((topic) => topic.chapterId.startsWith('chap_sci_'));

const lessonCounts = Object.fromEntries(scienceTopics.map((topic) => [
  topic.id, scienceLessonsData.filter((lesson) => lesson.topicId === topic.id).length,
]));
const questionCounts = Object.fromEntries(scienceTopics.map((topic) => [
  topic.id, scienceQuestions.filter((question) => question.topicId === topic.id).length,
]));
const targetQuestionsPerTopic = 15;

const missingLessons = scienceTopics.filter((topic) => (lessonCounts[topic.id] ?? 0) < 1).map((topic) => topic.id);
const emptyQuestionTopics = scienceTopics.filter((topic) => (questionCounts[topic.id] ?? 0) === 0).map((topic) => topic.id);
const belowQuestionTarget = scienceTopics
  .filter((topic) => (questionCounts[topic.id] ?? 0) < targetQuestionsPerTopic)
  .map((topic) => ({ topicId: topic.id, questionCount: questionCounts[topic.id] ?? 0 }));
const mappingProblems = scienceLessonsData
  .filter((lesson) => !scienceTopics.some((topic) => topic.id === lesson.topicId))
  .map((lesson) => ({ lessonId: lesson.id, topicId: lesson.topicId }));
const scienceMcqCount = scienceQuestions.filter((question) => question.type === 'mcq').length;
const scienceJnvstCount = scienceQuestions.filter((question) =>
  question.type === 'mcq' && question.options.length === 4 && question.correctOptionIds.length === 1,
).length;

export const jnvstScienceQualityAudit = {
  विषय: 'विज्ञान',
  अध्याय: scienceChapters.length,
  आधिकारिक_विषयांश: scienceTopics.length,
  स्रोत_पाठ: scienceLessonsData.length,
  कुल_प्रश्न: scienceQuestions.length,
  MCQ: scienceMcqCount,
  JNVST_अनुकूल_MCQ: scienceJnvstCount,
  विषयांश_वार_प्रश्न: questionCounts,
  विषयांश_वार_पाठ: lessonCounts,
  अनुपलब्ध_पाठ_विषयांश: missingLessons,
  शून्य_प्रश्न_विषयांश: emptyQuestionTopics,
  गलत_मैपिंग: mappingProblems,
  न्यूनतम_प्रश्न_लक्ष्य: targetQuestionsPerTopic,
  प्रश्न_लक्ष्य_से_कम: belowQuestionTarget,
};

export const jnvstScienceQualityStatus = {
  स्थिति: missingLessons.length || emptyQuestionTopics.length || mappingProblems.length || belowQuestionTarget.length
    ? 'समीक्षा आवश्यक'
    : 'जाँच पूर्ण',
  टिप्पणी: 'Science syllabus, lesson mapping और topic-wise question coverage को 18 curriculum topics पर source-level checks से जाँचा जाता है।',
};
