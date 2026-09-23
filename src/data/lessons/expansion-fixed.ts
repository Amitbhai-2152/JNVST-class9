import type { ContentBlock, Lesson } from '../../types';
import { expandLessons as expandBaseLessons } from './expansion';

const isStudyPageHeading = (block: ContentBlock) =>
  block.type === 'heading' && /^अध्ययन पृष्ठ\s+\d+/.test(block.text);

const normalizeStudyPages = (lesson: Lesson): Lesson => {
  const markerIndex = lesson.content.findIndex(isStudyPageHeading);
  if (markerIndex <= 0) return lesson;

  // The original lesson blocks currently come before the generated 15-page
  // sequence. Move the first page marker to the front so the existing reader
  // splits the lesson into exactly 15 study pages instead of creating a hidden
  // extra page for the preface material.
  const firstMarker = lesson.content[markerIndex];
  const content = [firstMarker, ...lesson.content.slice(0, markerIndex), ...lesson.content.slice(markerIndex + 1)];
  return { ...lesson, content };
};

export const expandLessons = (lessons: Lesson[]): Lesson[] =>
  expandBaseLessons(lessons).map(normalizeStudyPages);
