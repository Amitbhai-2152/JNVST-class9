import type { Lesson } from '../../types';
import { englishLessonsData } from './english';
import { hindiLessonsData } from './hindi';
import { mathLessonsData } from './math';
import { scienceLessonsData } from './science';
import { expandLessons } from './expansion-fixed';

const baseLessons: Lesson[] = [
  ...englishLessonsData,
  ...hindiLessonsData,
  ...mathLessonsData,
  ...scienceLessonsData,
];

// Every topic receives a deep, structured study sequence. Normalize the
// sequence so the existing study reader sees exactly 15 numbered pages.
export const allLessons: Lesson[] = expandLessons(baseLessons);

export const getLesson = (id: string) => allLessons.find((lesson) => lesson.id === id);
export const getLessonsByTopic = (topicId: string) => allLessons.filter((lesson) => lesson.topicId === topicId);
