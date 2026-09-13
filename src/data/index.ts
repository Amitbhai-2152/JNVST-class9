import { allQuestions, getQuestion, getQuestionsByTopic, getQuestionsBySubject } from './questions';
import { allLessons, getLesson, getLessonsByTopic } from './lessons';
import { subjects, chapters, topics } from './curriculum';

export { subjects, chapters, topics, allQuestions, allLessons, getQuestion, getLesson, getLessonsByTopic, getQuestionsByTopic, getQuestionsBySubject };

export const getSubject = (id: string) => subjects.find((subject) => subject.id === id);
export const getChapters = (subjectId: string) => chapters.filter((chapter) => chapter.subjectId === subjectId).sort((a, b) => a.order - b.order);
export const getTopics = (chapterId: string) => topics.filter((topic) => topic.chapterId === chapterId).sort((a, b) => a.order - b.order);
