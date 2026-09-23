import type { ContentBlock, Lesson } from '../../types';
import { topics } from '../curriculum';
import { englishLessonsData } from '../lessons/english';
import { hindiLessonsData } from '../lessons/hindi';
import { mathLessonsData } from '../lessons/math';
import { scienceLessonsData } from '../lessons/science';
import { jnvstClass9Audit, jnvstClass9ExtraCurrentTopics } from './jnvst-class9-audit';
import { jnvstClass9Syllabus } from './jnvst-class9';

const sourceLessons: Lesson[] = [
  ...englishLessonsData,
  ...hindiLessonsData,
  ...mathLessonsData,
  ...scienceLessonsData,
];

const blockText = (block: ContentBlock): string => {
  switch (block.type) {
    case 'heading': return block.text;
    case 'paragraph': return block.text;
    case 'list': return block.items.join(' ');
    case 'formula': return block.expression;
    case 'table': return [block.headers.join(' '), ...block.rows.map((row) => row.join(' '))].join(' ');
    case 'image': return [block.alt, block.caption ?? ''].join(' ');
    case 'callout': return [block.title ?? '', block.text].join(' ');
    case 'step-by-step': return block.steps.join(' ');
  }
};

const wordCount = (lesson: Lesson) =>
  lesson.content
    .map(blockText)
    .join(' ')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean)
    .length;

const blockCount = (lesson: Lesson) => lesson.content.length;

export interface JnvstLessonContentAudit {
  lessonId: string;
  topicId: string;
  title: string;
  अनुमानित_शब्द: number;
  सामग्री_खंड: number;
  उद्देश्य: number;
  सामग्री_गहराई: 'संक्षिप्त' | 'मानक' | 'विस्तृत';
  स्थिति: 'सुधार आवश्यक' | 'कार्यशील' | 'अच्छी आधार सामग्री';
}

export interface JnvstTopicContentAudit {
  syllabusTopicId: string;
  subject: string;
  syllabusTopic: string;
  currentTopicId?: string;
  currentTopicTitle?: string;
  lessonCount: number;
  lessonWordCount: number;
  status: 'सामग्री उपलब्ध' | 'सामग्री अनुपलब्ध' | 'सामग्री उपलब्ध, विस्तार आवश्यक';
  note: string;
};

const depthFor = (words: number): JnvstLessonContentAudit['सामग्री_गहराई'] =>
  words < 100 ? 'संक्षिप्त' : words < 180 ? 'मानक' : 'विस्तृत';

const statusFor = (words: number): JnvstLessonContentAudit['स्थिति'] =>
  words < 100 ? 'सुधार आवश्यक' : words < 180 ? 'कार्यशील' : 'अच्छी आधार सामग्री';

export const jnvstLessonContentAudit: JnvstLessonContentAudit[] = sourceLessons.map((lesson) => {
  const words = wordCount(lesson);
  return {
    lessonId: lesson.id,
    topicId: lesson.topicId,
    title: lesson.title,
    अनुमानित_शब्द: words,
    सामग्री_खंड: blockCount(lesson),
    उद्देश्य: lesson.objectives.length,
    सामग्री_गहराई: depthFor(words),
    स्थिति: statusFor(words),
  };
});

export const jnvstTopicContentAudit: JnvstTopicContentAudit[] = jnvstClass9Syllabus.subjects.flatMap((subject) =>
  subject.topics.map((syllabusTopic) => {
    const mapRow = jnvstClass9Audit.find((row) => row.syllabusTopic === syllabusTopic.title);
    const currentTopic = mapRow?.currentTopicId
      ? topics.find((topic) => topic.id === mapRow.currentTopicId)
      : undefined;
    const lessons = currentTopic
      ? sourceLessons.filter((lesson) => lesson.topicId === currentTopic.id)
      : [];

    const totalWords = lessons.reduce((sum, lesson) => sum + wordCount(lesson), 0);
    const status: JnvstTopicContentAudit['status'] =
      !lessons.length
        ? 'सामग्री अनुपलब्ध'
        : totalWords < 100
          ? 'सामग्री उपलब्ध, विस्तार आवश्यक'
          : 'सामग्री उपलब्ध';

    return {
      syllabusTopicId: syllabusTopic.id,
      subject: subject.title,
      syllabusTopic: syllabusTopic.title,
      currentTopicId: currentTopic?.id,
      currentTopicTitle: currentTopic?.title,
      lessonCount: lessons.length,
      lessonWordCount: totalWords,
      status,
      note: !lessons.length
        ? 'इस आधिकारिक इकाई के लिए अभी lesson source नहीं मिला।'
        : totalWords < 100
          ? 'मूल lesson मौजूद है, लेकिन अवधारणा-स्तर की व्याख्या और उदाहरण बढ़ाने की आवश्यकता है।'
          : 'मूल lesson source उपलब्ध है; अगले चरण में प्रश्न-स्तर और गहराई की समीक्षा होगी।',
    };
  }),
);

export const jnvstClass9ContentAuditSummary = {
  चरण: 'चरण 2 — सामग्री कवरेज ऑडिट',
  आधिकारिक_इकाइयाँ: jnvstClass9Syllabus.subjects.reduce((sum, subject) => sum + subject.topics.length, 0),
  स्रोत_लेसन: jnvstLessonContentAudit.length,
  उपलब्ध_आधिकारिक_इकाइयाँ: jnvstTopicContentAudit.filter((row) => row.status !== 'सामग्री अनुपलब्ध').length,
  अनुपलब्ध_आधिकारिक_इकाइयाँ: jnvstTopicContentAudit.filter((row) => row.status === 'सामग्री अनुपलब्ध').length,
  विस्तार_आवश्यक_इकाइयाँ: jnvstTopicContentAudit.filter((row) => row.status === 'सामग्री उपलब्ध, विस्तार आवश्यक').length,
  संक्षिप्त_लेसन: jnvstLessonContentAudit.filter((row) => row.सामग्री_गहराई === 'संक्षिप्त').length,
  मानक_लेसन: jnvstLessonContentAudit.filter((row) => row.सामग्री_गहराई === 'मानक').length,
  विस्तृत_लेसन: jnvstLessonContentAudit.filter((row) => row.सामग्री_गहराई === 'विस्तृत').length,
  वर्तमान_अतिरिक्त_इकाइयाँ: jnvstClass9ExtraCurrentTopics.length,
};

export const jnvstClass9ContentAuditBySubject = Object.fromEntries(
  jnvstClass9Syllabus.subjects.map((subject) => [
    subject.title,
    jnvstTopicContentAudit.filter((row) => row.subject === subject.title),
  ]),
);

export const jnvstClass9Phase2Complete = {
  चरण: 'चरण 2 — JNVST सामग्री कवरेज ऑडिट',
  स्थिति: 'पूरा',
  नियम: 'ऑडिट मौजूदा सामग्री को हटाता नहीं है। आधिकारिक syllabus में अनुपलब्ध सामग्री को पहले जोड़ा जाता है और syllabus से बाहर की सामग्री को अलग चिन्हित रखा जाता है।',
  अतिरिक्त_इकाइयाँ: jnvstClass9ExtraCurrentTopics.map((row) => ({
    विषय: row.subject,
    शीर्षक: row.syllabusTopic,
    स्थिति: 'समीक्षा आवश्यक',
  })),
};
