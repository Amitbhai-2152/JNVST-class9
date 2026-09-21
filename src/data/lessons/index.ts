import type { ContentBlock, Lesson } from '../../types';
import { chapters } from '../curriculum';
import { allQuestions } from '../questions';
import { getChapterStudyPages } from './chapterStudy';
import { englishLessonsData } from './english';
import { hindiLessonsData } from './hindi';
import { mathLessonsData } from './math';
import { scienceLessonsData } from './science';
import { getPhase5Enhancement } from './phase5Content';

const PAGE_COUNT = 12;

const splitText = (text: string, maxWords = 28): string[] => {
  const normalized = text.replace(/\r/g, '').trim();
  if (!normalized) return [];
  const sentences = normalized.split(/(?<=[.!?।])\s+/).filter(Boolean);
  return sentences.flatMap((sentence) => {
    const words = sentence.split(/\s+/);
    if (words.length <= maxWords) return [sentence];
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += maxWords) chunks.push(words.slice(i, i + maxWords).join(' '));
    return chunks;
  });
};

const atomize = (block: ContentBlock): ContentBlock[] => {
  switch (block.type) {
    case 'paragraph': return splitText(block.text).map((text) => ({ type: 'paragraph', text }));
    case 'callout': return splitText(block.text).map((text, i) => ({ type: 'callout', style: block.style, title: i === 0 ? block.title : undefined, text }));
    case 'list': return block.items.flatMap((item) => splitText(item).map((text) => ({ type: 'list', style: block.style, items: [text] })));
    case 'step-by-step': return block.steps.flatMap((step) => splitText(step).map((text) => ({ type: 'step-by-step', steps: [text] })));
    default: return [block];
  }
};

const questionUnits = (lesson: Lesson): ContentBlock[] => {
  const questions = allQuestions.filter((question) => question.topicId === lesson.topicId);
  return questions.flatMap((question, index) => {
    const correct = question.correctOptionIds
      .map((id) => question.options.find((option) => option.id === id)?.text)
      .filter((text): text is string => Boolean(text))
      .join(' | ');
    return [
      { type: 'heading', level: 3, text: `अभ्यास से समझें — प्रश्न ${index + 1}` } satisfies ContentBlock,
      { type: 'paragraph', text: question.textPlain ?? (question.options.map((option) => option.text).join(' | ') || 'प्रश्न पाठ उपलब्ध नहीं है।') } satisfies ContentBlock,
      { type: 'list', style: 'bullet', items: question.options.map((option) => `${option.id}: ${option.text}`) } satisfies ContentBlock,
      { type: 'callout', style: 'example', title: 'सही उत्तर', text: correct || 'उत्तर उपलब्ध' } satisfies ContentBlock,
      { type: 'callout', style: 'info', title: 'समाधान और कारण', text: question.explanationPlain ?? 'इस प्रश्न में जाँची गई अवधारणा को lesson content से दोबारा पढ़ें।' } satisfies ContentBlock,
    ];
  });
};

const isStudyMarker = (block: ContentBlock): boolean =>
  block.type === 'heading' && /^अध्ययन पृष्ठ\s+\d+/.test(block.text);

const paginateLesson = (lesson: Lesson): Lesson => {
  // Source lessons remain authoritative. Phase 5 adds an upgrade layer before
  // question-based practice content so every curriculum topic gets the same
  // concept/example/trap/exam-recall treatment without deleting existing material.
  const lessonSource = lesson.content.filter((block) => !isStudyMarker(block));
  const phase5Source = getPhase5Enhancement(lesson.topicId);
  const lessonAtoms = lessonSource.flatMap(atomize);
  const phase5Atoms = phase5Source.flatMap(atomize);
  const questionAtoms = questionUnits(lesson);
  const source = [...lessonAtoms, ...phase5Atoms, ...questionAtoms];

  if (!source.length) {
    const fallback: ContentBlock[] = lesson.objectives.length
      ? lesson.objectives.map((objective) => ({ type: 'callout', style: 'info', title: 'अध्ययन लक्ष्य', text: objective }))
      : [{ type: 'paragraph', text: lesson.title }];
    source.push(...fallback);
  }

  const pageSize = Math.max(1, Math.ceil(source.length / PAGE_COUNT));
  const pages: ContentBlock[] = [];

  for (let pageIndex = 0; pageIndex < PAGE_COUNT; pageIndex += 1) {
    const start = pageIndex * pageSize;
    const slice = source.slice(start, start + pageSize);
    const content: ContentBlock[] = slice.length
      ? slice
      : [{ type: 'callout', style: 'info', title: 'अध्याय पुनरावृत्ति', text: `इस lesson के मुख्य learning objectives: ${lesson.objectives.join(' · ') || lesson.title}` }];

    pages.push({
      type: 'heading',
      level: 2,
      text: `अध्ययन पृष्ठ ${pageIndex + 1} — ${lesson.title}`,
    });
    if (lesson.objectives.length) {
      pages.push({
        type: 'callout',
        style: 'info',
        title: `पृष्ठ ${pageIndex + 1} का लक्ष्य`,
        text: lesson.objectives[pageIndex % lesson.objectives.length] ?? lesson.title,
      });
    }
    pages.push(...content);
  }

  return { ...lesson, content: pages };
};

export const allLessons: Lesson[] = [
  ...englishLessonsData,
  ...hindiLessonsData,
  ...mathLessonsData,
  ...scienceLessonsData,
].map(paginateLesson);

const underPageLessons = allLessons.filter(
  (lesson) => lesson.content.filter(isStudyMarker).length < PAGE_COUNT,
);
if (underPageLessons.length) {
  throw new Error(`Lesson study coverage error: ${underPageLessons.map((lesson) => lesson.id).join(', ')} have fewer than ${PAGE_COUNT} pages.`);
}

export const chapterStudyPages = Object.fromEntries(
  chapters.map((chapter) => [chapter.id, getChapterStudyPages(chapter, allLessons, 12)]),
) as Record<string, ReturnType<typeof getChapterStudyPages>>;

const underPageChapters = chapters.filter((chapter) => chapterStudyPages[chapter.id].length < 12);
if (underPageChapters.length) {
  throw new Error(`Chapter study coverage error: ${underPageChapters.map((chapter) => chapter.id).join(', ')} have fewer than 12 pages.`);
}

export const getLesson = (id: string) => allLessons.find((lesson) => lesson.id === id);
export const getLessonsByTopic = (topicId: string) => allLessons.filter((lesson) => lesson.topicId === topicId);
export const getChapterStudy = (chapterId: string) => chapterStudyPages[chapterId] ?? [];
