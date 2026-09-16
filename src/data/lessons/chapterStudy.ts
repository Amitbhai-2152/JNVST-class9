import type { Chapter, ContentBlock, Lesson, Topic } from '../../types';

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

const pageTitle = (chapter: Chapter, pageNumber: number, source?: Lesson) => ({
  type: 'heading' as const,
  level: 2 as const,
  text: `अध्ययन पृष्ठ ${pageNumber} — ${chapter.title}${source ? ` · ${source.title}` : ''}`,
});

export const getChapterStudyPages = (
  chapter: Chapter,
  topicList: Topic[],
  lessons: Lesson[],
  minimumPages = 12,
): ContentBlock[][] => {
  const chapterTopicIds = new Set(chapter.topicIds);
  const chapterLessons = lessons.filter((lesson) => chapterTopicIds.has(lesson.topicId));
  const atoms = chapterLessons.flatMap((lesson) => atomize({
    type: 'heading', level: 3, text: lesson.title,
  } as ContentBlock).concat(lesson.content.flatMap(atomize)).map((block) => ({
    lessonId: lesson.id,
    block,
  })));

  if (!atoms.length) return Array.from({ length: minimumPages }, (_, i) => [pageTitle(chapter, i + 1)]);

  const targetPages = Math.max(minimumPages, Math.min(atoms.length, Math.ceil(atoms.length / 2)));
  const pages: ContentBlock[][] = [];
  const perPage = Math.ceil(atoms.length / targetPages);
  for (let i = 0; i < atoms.length && pages.length < targetPages; i += perPage) {
    const slice = atoms.slice(i, i + perPage);
    const first = chapterLessons.find((lesson) => lesson.id === slice[0]?.lessonId);
    pages.push([pageTitle(chapter, pages.length + 1, first), ...slice.map((x) => x.block)]);
  }

  while (pages.length < minimumPages) {
    const source = chapterLessons[pages.length % Math.max(1, chapterLessons.length)];
    const existing = atoms[(pages.length - 1) % atoms.length];
    pages.push([
      pageTitle(chapter, pages.length + 1, source),
      existing.block,
    ]);
  }

  // Keep the navigation count stable and never expose an empty page.
  return pages.map((page, i) => [
    page[0]?.type === 'heading' && /^अध्ययन पृष्ठ\s+\d+/.test(page[0].text)
      ? { ...page[0], text: `अध्ययन पृष्ठ ${i + 1} — ${chapter.title}${page[0].text.includes(' · ') ? page[0].text.slice(page[0].text.indexOf(' · ')) : ''}` }
      : pageTitle(chapter, i + 1),
    ...page.slice(1),
  ]);
};

export const getChapterStudyWordCount = (
  chapter: Chapter,
  topicList: Topic[],
  lessons: Lesson[],
) => getChapterStudyPages(chapter, topicList, lessons, 1)
  .flat()
  .filter((block): block is Extract<ContentBlock, { type: 'paragraph' | 'callout' | 'list' | 'step-by-step' }> => ['paragraph', 'callout', 'list', 'step-by-step'].includes(block.type))
  .reduce((total, block) => {
    if (block.type === 'paragraph' || block.type === 'callout') return total + block.text.split(/\s+/).filter(Boolean).length;
    if (block.type === 'list') return total + block.items.join(' ').split(/\s+/).filter(Boolean).length;
    return total + block.steps.join(' ').split(/\s+/).filter(Boolean).length;
  }, 0);
