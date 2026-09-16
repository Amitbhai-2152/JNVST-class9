import type { ContentBlock, Lesson } from '../../types';
import { chapters } from '../curriculum';
import { getChapterStudyPages } from './chapterStudy';
import { englishLessonsData } from './english';
import { hindiLessonsData } from './hindi';
import { mathLessonsData } from './math';
import { scienceLessonsData } from './science';

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
    case 'paragraph':
      return splitText(block.text).map((text) => ({ type: 'paragraph', text }));
    case 'callout':
      return splitText(block.text).map((text, i) => ({
        type: 'callout',
        style: block.style,
        title: i === 0 ? block.title : undefined,
        text,
      }));
    case 'list':
      return block.items.flatMap((item) => splitText(item).map((text) => ({
        type: 'list',
        style: block.style,
        items: [text],
      })));
    case 'step-by-step':
      return block.steps.flatMap((step) => splitText(step).map((text) => ({
        type: 'step-by-step',
        steps: [text],
      })));
    default:
      return [block];
  }
};

const paginateLesson = (lesson: Lesson): Lesson => {
  const alreadyPaged = lesson.content.some(
    (block) => block.type === 'heading' && /^अध्ययन पृष्ठ\s+\d+/.test(block.text),
  );
  if (alreadyPaged) return lesson;

  const atoms = lesson.content.flatMap(atomize);
  const source = atoms.length ? atoms : [{ type: 'paragraph', text: lesson.title } satisfies ContentBlock];
  const perPage = Math.max(1, Math.ceil(source.length / PAGE_COUNT));
  const pages: ContentBlock[] = [];

  for (let pageIndex = 0; pageIndex < PAGE_COUNT; pageIndex += 1) {
    const start = pageIndex * perPage;
    const slice = source.slice(start, start + perPage);
    const content = slice.length ? slice : [source[pageIndex % source.length]];
    const objective = lesson.objectives[pageIndex % Math.max(1, lesson.objectives.length)];

    pages.push({
      type: 'heading',
      level: 2,
      text: `अध्ययन पृष्ठ ${pageIndex + 1} — ${lesson.title}`,
    });
    if (objective) {
      pages.push({
        type: 'callout',
        style: 'info',
        title: 'इस पृष्ठ का लक्ष्य',
        text: objective,
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
