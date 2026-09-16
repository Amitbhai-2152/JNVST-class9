import type { Lesson } from '../../types';
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

export const getLesson = (id: string) => allLessons.find((lesson) => lesson.id === id);
export const getLessonsByTopic = (topicId: string) => allLessons.filter((lesson) => lesson.topicId === topicId);
