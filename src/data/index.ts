import { allQuestions, jnvstExamQuestions, getQuestion, getQuestionsByTopic, getQuestionsBySubject, getJnvstQuestionsBySubject, getJnvstQuestionsByTopic } from './questions';
import { allLessons, getLesson, getLessonsByTopic } from './lessons';
import { subjects, chapters, topics } from './curriculum';
import { jnvstClass9Syllabus } from './syllabus/jnvst-class9';
import { jnvstClass9Audit, jnvstClass9AuditSummary, jnvstClass9ExtraCurrentTopics } from './syllabus/jnvst-class9-audit';
import { jnvstClass9ContentAudit, jnvstTopicContentAudit, jnvstClass9ContentAuditSummary, jnvstClass9ContentAuditBySubject } from './syllabus/jnvst-class9-content-audit';
import { jnvstQuestionAudit, jnvstQuestionAuditStatus } from './questions/questionAudit';
import { jnvstClass9Phase4Complete } from '../utils/jnvstIntelligence';
import { phase5Enhancements, jnvstClass9Phase5Complete } from './lessons/phase5Content';

export { subjects, chapters, topics, allQuestions, jnvstExamQuestions, allLessons, getQuestion, getLesson, getLessonsByTopic, getQuestionsByTopic, getQuestionsBySubject, getJnvstQuestionsBySubject, getJnvstQuestionsByTopic, jnvstClass9Syllabus, jnvstClass9Audit, jnvstClass9AuditSummary, jnvstClass9ExtraCurrentTopics, jnvstClass9ContentAudit, jnvstTopicContentAudit, jnvstClass9ContentAuditSummary, jnvstClass9ContentAuditBySubject, jnvstQuestionAudit, jnvstQuestionAuditStatus, jnvstClass9Phase4Complete, phase5Enhancements, jnvstClass9Phase5Complete };

export const getSubject = (id: string) => subjects.find((subject) => subject.id === id);
export const getChapters = (subjectId: string) => chapters.filter((chapter) => chapter.subjectId === subjectId).sort((a, b) => a.order - b.order);
export const getTopics = (chapterId: string) => topics.filter((topic) => topic.chapterId === chapterId).sort((a, b) => a.order - b.order);
