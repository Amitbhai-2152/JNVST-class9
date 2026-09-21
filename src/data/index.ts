import { allQuestions, getQuestion, getQuestionsByTopic, getQuestionsBySubject } from './questions';
import { allLessons, getLesson, getLessonsByTopic } from './lessons';
import { subjects, chapters, topics } from './curriculum';
import { jnvstClass9Syllabus } from './syllabus/jnvst-class9';
import { jnvstClass9Audit, jnvstClass9AuditSummary, jnvstClass9ExtraCurrentTopics } from './syllabus/jnvst-class9-audit';
import { jnvstClass9ContentAudit, jnvstTopicContentAudit, jnvstClass9ContentAuditSummary, jnvstClass9ContentAuditBySubject } from './syllabus/jnvst-class9-content-audit';

export { subjects, chapters, topics, allQuestions, allLessons, getQuestion, getLesson, getLessonsByTopic, getQuestionsByTopic, getQuestionsBySubject, jnvstClass9Syllabus, jnvstClass9Audit, jnvstClass9AuditSummary, jnvstClass9ExtraCurrentTopics, jnvstClass9ContentAudit, jnvstTopicContentAudit, jnvstClass9ContentAuditSummary, jnvstClass9ContentAuditBySubject };

export const getSubject = (id: string) => subjects.find((subject) => subject.id === id);
export const getChapters = (subjectId: string) => chapters.filter((chapter) => chapter.subjectId === subjectId).sort((a, b) => a.order - b.order);
export const getTopics = (chapterId: string) => topics.filter((topic) => topic.chapterId === chapterId).sort((a, b) => a.order - b.order);
