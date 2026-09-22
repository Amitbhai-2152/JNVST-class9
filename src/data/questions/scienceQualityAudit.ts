import { chapters, topics } from '../curriculum';
import { scienceLessonsData } from '../lessons/science';
import { scienceQuestions } from './science';
import { scienceLessonEnhancementStats } from '../scienceLessonEnhancements';
import { scienceLessonCore } from '../scienceLessonCore';
import { getScienceChapterStudyPages } from '../lessons/chapterStudy';
import { scienceChapterChallengers } from './scienceChapterChallengers';

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
const minimumLessonBlocks = 30;
const expectedCoreSections = 6;
const expectedScienceStudyPages = 12;

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

const scienceStudyPageCounts = Object.fromEntries(scienceChapters.map((chapter) => [
  chapter.id, getScienceChapterStudyPages(chapter).length,
]));
const scienceStudyPageProblems = scienceChapters
  .filter((chapter) => scienceStudyPageCounts[chapter.id] !== expectedScienceStudyPages)
  .map((chapter) => ({ chapterId: chapter.id, pages: scienceStudyPageCounts[chapter.id] ?? 0 }));

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


const challengerDuplicateIds = scienceChapterChallengers
  .map((question) => question.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

const challengerStructureProblems = scienceChapterChallengers
  .filter((question) =>
    question.type !== 'mcq' ||
    question.options.length !== 4 ||
    new Set(question.options.map((option) => option.text.trim().toLowerCase())).size !== 4 ||
    question.correctOptionIds.length !== 1 ||
    !question.options.some((option) => question.correctOptionIds.includes(option.id)),
  )
  .map((question) => question.id);

const challengerWeakDistractors = scienceChapterChallengers
  .filter((question) => question.options.some((option) =>
    /वायु का रंग|पहियों का रंग|गुरुत्वाकर्षण समाप्त|अपने आप नई प्रजाति|फिलामेंट.*पानी|केवल कोशिका का रंग|केवल पानी का रंग|केवल कोशिका की गंध|केवल त्वचा का रंग|ईंधन अपने आप जल बन जाता|वस्तु का रंग हमेशा/i.test(option.text)
  ))
  .map((question) => question.id);

const challengerChapterCounts = Object.fromEntries(scienceChapters.map((chapter) => [
  chapter.id,
  scienceChapterChallengers.filter((question) => question.chapterId === chapter.id).length,
]));

const scienceMcqCount = scienceQuestions.filter((question) => question.type === 'mcq').length;
const scienceJnvstCount = scienceQuestions.filter((question) =>
  question.type === 'mcq' && question.options.length === 4 && question.correctOptionIds.length === 1,
).length;

const contentCoverage = Object.fromEntries(scienceTopics.map((topic) => {
  const lesson = scienceLessonsData.find((item) => item.topicId === topic.id);
  const blocks = lesson?.content ?? [];
  return [topic.id, {
    blocks: blocks.length,
    hasTable: blocks.some((block) => block.type === 'table'),
    hasGuidedSteps: blocks.some((block) => block.type === 'step-by-step'),
    hasExamCallout: blocks.some((block) => block.type === 'callout' && ['warning','important','example'].includes(block.style)),
  }];
}));

const shortLessons = scienceTopics
  .filter((topic) => (contentCoverage[topic.id]?.blocks ?? 0) < minimumLessonBlocks)
  .map((topic) => ({ topicId: topic.id, blocks: contentCoverage[topic.id]?.blocks ?? 0 }));

const missingGuidedLayers = scienceTopics
  .filter((topic) => {
    const row = contentCoverage[topic.id];
    return !row?.hasTable || !row?.hasGuidedSteps || !row?.hasExamCallout;
  })
  .map((topic) => ({ topicId: topic.id, coverage: contentCoverage[topic.id] }));

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
  न्यूनतम_समृद्ध_पाठ_ब्लॉक: minimumLessonBlocks,
  guided_enhancement_blocks: scienceLessonEnhancementStats.totalBlocks,
  अनुपलब्ध_पाठ_विषयांश: missingLessons,
  शून्य_प्रश्न_विषयांश: emptyQuestionTopics,
  गलत_मैपिंग: mappingProblems,
  प्रश्न_अध्याय_मैपिंग_समस्या: questionMappingProblems,
  अध्याय_क्रम_समस्या: chapterOrderProblems,
  न्यूनतम_प्रश्न_लक्ष्य: targetQuestionsPerTopic,
  प्रश्न_लक्ष्य_से_कम: belowQuestionTarget,
  न्यूनतम_पाठ_ब्लॉक_लक्ष्य: minimumLessonBlocks,
  अध्याय_अध्ययन_पृष्ठ_लक्ष्य: expectedScienceStudyPages,
  अध्याय_अध्ययन_पृष्ठ_गणना: scienceStudyPageCounts,
  अध्याय_अध्ययन_पृष्ठ_समस्या: scienceStudyPageProblems,
  कम_सामग्री_वाले_पाठ: shortLessons,
  core_structure_problems: coreStructureProblems,
  guided_layers_missing: missingGuidedLayers,
  challenger_count: scienceChapterChallengers.length,
  challenger_duplicate_ids: challengerDuplicateIds,
  challenger_structure_problems: challengerStructureProblems,
  challenger_weak_distractors: challengerWeakDistractors,
  challenger_chapter_counts: challengerChapterCounts,
};

export const jnvstScienceQualityStatus = {
  स्थिति: missingLessons.length || emptyQuestionTopics.length || mappingProblems.length || questionMappingProblems.length || chapterOrderProblems.length || belowQuestionTarget.length || shortLessons.length || missingGuidedLayers.length || coreStructureProblems.length || scienceStudyPageProblems.length || challengerDuplicateIds.length || challengerStructureProblems.length || challengerWeakDistractors.length
    ? 'समीक्षा आवश्यक'
    : 'जाँच पूर्ण',
  टिप्पणी: 'Science syllabus, lesson mapping और topic-wise question coverage को 18 curriculum topics पर source-level checks से जाँचा जाता है।',
};
