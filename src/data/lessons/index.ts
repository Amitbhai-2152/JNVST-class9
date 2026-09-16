import type { Lesson } from '../../types';
import { chapters } from '../curriculum';
import { getChapterStudyPages } from './chapterStudy';
import { englishLessonsData } from './english';
import { hindiLessonsData } from './hindi';
import { mathLessonsData } from './math';
import { scienceLessonsData } from './science';

export const allLessons: Lesson[] = [
  ...englishLessonsData,
  ...hindiLessonsData,
  ...mathLessonsData,
  ...scienceLessonsData,
];

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
