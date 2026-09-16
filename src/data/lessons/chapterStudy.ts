import type { Chapter, ContentBlock, Lesson } from '../../types';

const splitText = (text: string): string[] => {
  const normalized = text.replace(/\r/g, '').trim();
  if (!normalized) return [];
  const lines = normalized.split(/\n+/).map((x) => x.trim()).filter(Boolean);
  const sentences = lines.flatMap((line) => {
    const pieces = line.match(/[^.!?।]+[.!?।]?/g) || [line];
    return pieces.map((x) => x.trim()).filter(Boolean);
  });
  return sentences.flatMap((sentence) => {
    const words = sentence.split(/\s+/);
    if (words.length <= 42) return [sentence];
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += 34) chunks.push(words.slice(i, i + 34).join(' '));
    return chunks;
  });
};

const atomize = (block: ContentBlock): ContentBlock[] => {
  switch (block.type) {
    case 'heading':
    case 'formula':
    case 'image':
    case 'table':
      return [block];
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

const pageTitle = (chapter: Chapter, pageNumber: number, source?: Lesson): ContentBlock => ({
  type: 'heading',
  level: 2,
  text: `अध्ययन पृष्ठ ${pageNumber} — ${chapter.title}${source ? ` · ${source.title}` : ''}`,
});

export const getChapterStudyPages = (
  chapter: Chapter,
  lessons: Lesson[],
  minimumPages = 12,
): ContentBlock[][] => {
  const chapterTopicIds = new Set(chapter.topicIds);
  const chapterLessons = lessons.filter((lesson) => chapterTopicIds.has(lesson.topicId));
  const atoms = chapterLessons.flatMap((lesson) => [
    { lessonId: lesson.id, block: { type: 'heading', level: 3 as const, text: lesson.title } as ContentBlock },
    ...lesson.content.flatMap(atomize).map((block) => ({ lessonId: lesson.id, block })),
  ]);

  if (!atoms.length) return Array.from({ length: minimumPages }, (_, i) => [pageTitle(chapter, i + 1)]);

  const targetPages = Math.min(minimumPages, atoms.length);
  const baseSize = Math.floor(atoms.length / targetPages);
  const remainder = atoms.length % targetPages;
  const pages: ContentBlock[][] = [];
  let cursor = 0;

  for (let pageIndex = 0; pageIndex < targetPages; pageIndex += 1) {
    const size = baseSize + (pageIndex < remainder ? 1 : 0);
    const slice = atoms.slice(cursor, cursor + size);
    cursor += size;
    const source = chapterLessons.find((lesson) => lesson.id === slice[0]?.lessonId);
    pages.push([pageTitle(chapter, pageIndex + 1, source), ...slice.map((x) => x.block)]);
  }

  return pages;
};

export const getChapterStudyWordCount = (chapter: Chapter, lessons: Lesson[]) => {
  const pages = getChapterStudyPages(chapter, lessons, 1);
  return pages.flat().reduce((total, block) => {
    switch (block.type) {
      case 'paragraph':
      case 'callout':
        return total + block.text.split(/\s+/).filter(Boolean).length;
      case 'list':
        return total + block.items.join(' ').split(/\s+/).filter(Boolean).length;
      case 'step-by-step':
        return total + block.steps.join(' ').split(/\s+/).filter(Boolean).length;
      case 'heading':
        return total + block.text.split(/\s+/).filter(Boolean).length;
      case 'formula':
        return total + block.expression.split(/\s+/).filter(Boolean).length;
      case 'table':
        return total + block.rows.flat().join(' ').split(/\s+/).filter(Boolean).length;
      default:
        return total;
    }
  }, 0);
};
