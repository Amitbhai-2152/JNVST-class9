import { chapters, topics } from '../curriculum';
import { scienceLessonsData } from '../lessons/science';
import { scienceQuestions } from './science';
import { scienceLessonEnhancementStats } from '../scienceLessonEnhancements';
import { scienceLessonCore } from '../scienceLessonCore';

const scienceSubjectId = 'sub_sci';
const scienceChapters = chapters.filter((chapter) => chapter.subjectId === scienceSubjectId);
const scienceTopics = topics.filter((topic) => topic.chapterId.startsWith('chap_sci_'));

const lessonCounts = Object.fromEntries(scienceTopics.map((topic) => [
  topic.id, scienceLessonsData.filter((lesson) => lesson.topicId === topic.id).length,
]));
const questionCounts = Object.fromEntries(scienceTopics.map((topic) => [
  topic.id, scienceQuestions.filter((question) => question.topicId === topic.id).length,
]));
const targetQuestionsPerTopic = 20;
const minimumLessonBlocks = 12;
const expectedCoreSections = 6;

const missingLessons = scienceTopics.filter((topic) => (lessonCounts[topic.id] ?? 0) < 1).map((topic) => topic.id);
const coreStructureProblems = scienceTopics
  .filter((topic) => {
    const blocks = scienceLessonCore[topic.id] ?? [];
    const sectionHeadings = blocks.filter((block) => block.type === 'heading' && block.level === 2);
    return sectionHeadings.length !== expectedCoreSections;
  })
  .map((topic) => ({
    topicId: topic.id,
    coreSections: (scienceLessonCore[topic.id] ?? []).filter((block) => block.type === 'heading' && block.level === 2).length,
  }));

const emptyQuestionTopics = scienceTopics.filter((topic) => (questionCounts[topic.id] ?? 0) === 0).map((topic) => topic.id);
const belowQuestionTarget = scienceTopics
  .filter((topic) => (questionCounts[topic.id] ?? 0) < targetQuestionsPerTopic)
  .map((topic) => ({ topicId: topic.id, questionCount: questionCounts[topic.id] ?? 0 }));
const mappingProblems = scienceLessonsData
  .filter((lesson) => !scienceTopics.some((topic) => topic.id === lesson.topicId))
  .map((lesson) => ({ lessonId: lesson.id, topicId: lesson.topicId }));
const questionMappingProblems = scienceQuestions
  .map((question) => {
    const topic = scienceTopics.find((item) => item.id === question.topicId);
    return topic && topic.chapterId === question.chapterId ? null : {
      questionId: question.id,
      topicId: question.topicId,
      questionChapterId: question.chapterId,
      topicChapterId: topic?.chapterId ?? 'missing-topic',
    };
  })
  .filter(Boolean);

const orderedScienceChapters = scienceChapters.slice().sort((a, b) => a.order - b.order);
const chapterOrderProblems = orderedScienceChapters
  .filter((chapter, index) =>
    chapter.order !== index + 1 ||
    chapter.topicIds.length !== 1 ||
    !scienceTopics.some((topic) => topic.id === chapter.topicIds[0] && topic.chapterId === chapter.id),
  )
  .map((chapter) => ({ chapterId: chapter.id, order: chapter.order, topicIds: chapter.topicIds }));


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
  content_coverage: contentCoverage,
  guided_enhancement_blocks: scienceLessonEnhancementStats.totalBlocks,
  अनुपलब्ध_पाठ_विषयांश: missingLessons,
  शून्य_प्रश्न_विषयांश: emptyQuestionTopics,
  गलत_मैपिंग: mappingProblems,
  प्रश्न_अध्याय_मैपिंग_समस्या: questionMappingProblems,
  अध्याय_क्रम_समस्या: chapterOrderProblems,
  न्यूनतम_प्रश्न_लक्ष्य: targetQuestionsPerTopic,
  प्रश्न_लक्ष्य_से_कम: belowQuestionTarget,
  न्यूनतम_पाठ_ब्लॉक_लक्ष्य: minimumLessonBlocks,
  कम_सामग्री_वाले_पाठ: shortLessons,
  core_structure_problems: coreStructureProblems,
  guided_layers_missing: missingGuidedLayers,
};

export const jnvstScienceQualityStatus = {
  स्थिति: missingLessons.length || emptyQuestionTopics.length || mappingProblems.length || questionMappingProblems.length || chapterOrderProblems.length || belowQuestionTarget.length || shortLessons.length || missingGuidedLayers.length || coreStructureProblems.length
    ? 'समीक्षा आवश्यक'
    : 'जाँच पूर्ण',
  टिप्पणी: 'Science syllabus, lesson mapping और topic-wise question coverage को 18 curriculum topics पर source-level checks से जाँचा जाता है।',
};
