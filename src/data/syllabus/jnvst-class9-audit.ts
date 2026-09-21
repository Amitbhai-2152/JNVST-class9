import { chapters, topics } from '../curriculum';
import { jnvstClass9Syllabus, jnvstSyllabusSubjectIds } from './jnvst-class9';

export type CoverageStatus = 'पूर्ण' | 'आंशिक' | 'अनुपलब्ध' | 'अतिरिक्त';

export interface SyllabusAuditRow {
  subject: string;
  syllabusTopic: string;
  currentTopicId?: string;
  currentTopicTitle?: string;
  status: CoverageStatus;
  note: string;
}

const currentTopicsForSubject = (subjectId: string) => {
  const subjectChapters = chapters.filter((chapter) => chapter.subjectId === subjectId);
  return topics.filter((topic) => subjectChapters.some((chapter) => chapter.id === topic.chapterId));
};

const normalized = (value: string) =>
  value.toLowerCase().replace(/[\s—–-]+/g, ' ').trim();

const aliases: Record<string, string[]> = {
  'math_01': ['परिमेय संख्याएँ'],
  'math_02': ['वर्ग और वर्गमूल'],
  'math_03': ['घन और घनमूल'],
  'math_04': ['घातांक और घात'],
  'math_05': ['प्रत्यक्ष और प्रतिलोम समानुपात'],
  'math_06': ['राशियों की तुलना'],
  'math_07': ['बीजीय व्यंजक और सर्वसमिकाएँ'],
  'math_08': ['एक चर वाले रैखिक समीकरण'],
  'math_09': ['चतुर्भुजों को समझना'],
  'math_10': ['क्षेत्रमिति'],
  'math_11': ['आँकड़ों का प्रबंधन'],
  'sci_01': ['फसल उत्पादन एवं प्रबंध'],
  'sci_02': ['सूक्ष्मजीव: मित्र एवं शत्रु'],
  'sci_03': ['कोयला और पेट्रोलियम'],
  'sci_04': ['दहन और ज्वाला'],
  'sci_05': ['पौधों और जंतुओं का संरक्षण'],
  'sci_06': ['जंतुओं में जनन'],
  'sci_07': ['किशोरावस्था की ओर'],
  'sci_08': ['बल तथा दाब'],
  'sci_09': ['घर्षण'],
  'sci_10': ['ध्वनि'],
  'sci_11': ['विद्युत धारा के रासायनिक प्रभाव'],
  'sci_12': ['कुछ प्राकृतिक परिघटनाएँ'],
  'sci_13': ['प्रकाश'],
  'eng_01': ['Comprehension (Unseen Passage)', 'अपठित गद्यांश'],
  'eng_02': ['Word and Sentence Structure', 'शब्द और वाक्य संरचना'],
  'eng_03': ['Spelling Rules', 'वर्तनी'],
  'eng_04': ['Rearranging Jumbled Words', 'क्रम-विन्यास — उलझे हुए शब्दों को सही क्रम में लगाना'],
  'eng_05': ['Passivation (Active & Passive)', 'कर्तृवाच्य और कर्मवाच्य'],
  'eng_06': ['Use of Degrees of Comparison', 'तुलना की डिग्रियों का प्रयोग'],
  'eng_07': ['Modal Auxiliaries', 'सहायक क्रियाएँ'],
  'eng_08': ['Use of Prepositions', 'पूर्वसर्ग का प्रयोग'],
  'eng_09': ['Tense Forms', 'काल के रूप'],
  'eng_10': ['Reported Speech', 'प्रत्यक्ष और अप्रत्यक्ष कथन'],
  'hin_01': ['वर्ण विचार / वर्तनी विवेक', 'वर्ण विचार और वर्तनी विवेक'],
  'hin_02': ['शब्दभेद (स्रोत/उत्पत्ति)', 'शब्द-भेद — स्रोत/उत्पत्ति'],
  'hin_03': ['पर्यायवाची और विलोम'],
  'hin_04': ['शब्द विवेक'],
  'hin_05': ['पद भेद'],
  'hin_06': ['पद परिचय'],
  'hin_07': ['अशुद्ध वाक्य शोधन'],
  'hin_08': ['वाक्य रचनान्तर (सरल/संयुक्त/मिश्र)'],
  'hin_09': ['मुहावरे'],
  'hin_10': ['लोकोक्तियाँ'],
  'hin_11': ['अपठित बोधात्मक प्रश्न'],
};

const findCurrentTopic = (subjectId: string, syllabusTopicId: string) => {
  const current = currentTopicsForSubject(subjectId);
  const candidates = aliases[syllabusTopicId] ?? [];
  return current.find((topic) =>
    candidates.some((candidate) => normalized(topic.title).includes(normalized(candidate)) || normalized(candidate).includes(normalized(topic.title))),
  );
};

export const jnvstClass9Audit: SyllabusAuditRow[] = jnvstClass9Syllabus.subjects.flatMap((subject) =>
  subject.topics.map((syllabusTopic) => {
    const current = findCurrentTopic(jnvstSyllabusSubjectIds[subject.id], syllabusTopic.id);
    const status: CoverageStatus = current ? 'पूर्ण' : 'अनुपलब्ध';
    return {
      subject: subject.title,
      syllabusTopic: syllabusTopic.title,
      currentTopicId: current?.id,
      currentTopicTitle: current?.title,
      status,
      note: current ? 'वर्तमान पाठ्यक्रम में संबंधित विषय मौजूद है।' : 'वर्तमान पाठ्यक्रम में अलग से मैप किया हुआ विषय नहीं मिला।',
    };
  }),
);

const officialTopicIds = new Set(
  jnvstClass9Syllabus.subjects.flatMap((subject) => subject.topics.map((topic) => topic.id)),
);

const auditBySubject = (subjectId: string) => {
  const subject = jnvstClass9Syllabus.subjects.find((item) => jnvstSyllabusSubjectIds[item.id] === subjectId);
  return subject ? jnvstClass9Audit.filter((row) => row.subject === subject.title) : [];
};

export const jnvstClass9ExtraCurrentTopics: SyllabusAuditRow[] = ([
  ...currentTopicsForSubject('sub_hin').map((topic) => ({ subject: 'हिंदी', topic })),
  ...currentTopicsForSubject('sub_eng').map((topic) => ({ subject: 'अंग्रेज़ी', topic })),
  ...currentTopicsForSubject('sub_math').map((topic) => ({ subject: 'गणित', topic })),
  ...currentTopicsForSubject('sub_sci').map((topic) => ({ subject: 'विज्ञान', topic })),
])
  .filter(({ subject, topic }) => {
    const rows = jnvstClass9Audit.filter((row) => row.subject === subject);
    return !rows.some((row) => row.currentTopicId === topic.id);
  })
  .map(({ subject, topic }) => ({
    subject,
    syllabusTopic: topic.title,
    currentTopicId: topic.id,
    currentTopicTitle: topic.title,
    status: 'अतिरिक्त',
    note: 'यह विषय वर्तमान पाठ्यक्रम में है, लेकिन Phase 1 की आधिकारिक JNVST सूची में इसका सीधा मिलान नहीं मिला। इसे हटाया नहीं गया है; पहले सामग्री की जाँच की जाएगी।',
  }));

export const jnvstClass9AuditSummary = {
  कुल_आधिकारिक_विषय: jnvstClass9Syllabus.subjects.length,
  कुल_आधिकारिक_इकाइयाँ: jnvstClass9Syllabus.subjects.reduce((sum, subject) => sum + subject.topics.length, 0),
  पूर्ण_मैपिंग: jnvstClass9Audit.filter((row) => row.status === 'पूर्ण').length,
  अनुपलब्ध_मैपिंग: jnvstClass9Audit.filter((row) => row.status === 'अनुपलब्ध').length,
  वर्तमान_अतिरिक्त_विषय: jnvstClass9ExtraCurrentTopics.length,
  विषयवार: Object.fromEntries(
    jnvstClass9Syllabus.subjects.map((subject) => {
      const rows = auditBySubject(jnvstSyllabusSubjectIds[subject.id]);
      return [
        subject.title,
        {
          आधिकारिक_इकाइयाँ: rows.length,
          पूर्ण: rows.filter((row) => row.status === 'पूर्ण').length,
          अनुपलब्ध: rows.filter((row) => row.status === 'अनुपलब्ध').length,
        },
      ];
    }),
  ),
};

export const jnvstClass9Phase1Complete = {
  चरण: 'चरण 1 — आधिकारिक पाठ्यक्रम मानचित्र और सामग्री ऑडिट',
  स्थिति: 'पूरा',
  स्रोत_डेटा: 'src/data/syllabus/jnvst-class9.ts',
  ऑडिट_डेटा: 'src/data/syllabus/jnvst-class9-audit.ts',
  महत्वपूर्ण_नियम: 'ऑडिट में किसी मौजूदा विषय या प्रश्न को अपने-आप हटाया नहीं गया है। अतिरिक्त सामग्री की समीक्षा अगले चरण में होगी।',
};
