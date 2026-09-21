import { jnvstClass9Audit } from '../syllabus/jnvst-class9-audit';
import { allQuestions } from './index';
import { chapters, topics } from '../curriculum';

export interface QuestionAuditIssue {
  questionId: string;
  issue: string;
}

const chapterById = new Map(chapters.map((chapter) => [chapter.id, chapter]));
const topicById = new Map(topics.map((topic) => [topic.id, topic]));

const issues: QuestionAuditIssue[] = [];

for (const question of allQuestions) {
  const chapter = chapterById.get(question.chapterId);
  const topic = topicById.get(question.topicId);

  if (!chapter) issues.push({ questionId: question.id, issue: 'अमान्य अध्याय ID' });
  if (!topic) issues.push({ questionId: question.id, issue: 'अमान्य topic ID' });
  if (chapter && chapter.subjectId !== question.subjectId) {
    issues.push({ questionId: question.id, issue: 'विषय और अध्याय का संबंध गलत है' });
  }
  if (topic && topic.chapterId !== question.chapterId) {
    issues.push({ questionId: question.id, issue: 'प्रश्न का topic और chapter मेल नहीं खाते' });
  }
  if (!question.textPlain?.trim()) issues.push({ questionId: question.id, issue: 'प्रश्न-पाठ अनुपलब्ध है' });
  if (!question.explanationPlain?.trim()) issues.push({ questionId: question.id, issue: 'समाधान/व्याख्या अनुपलब्ध है' });
  const requiresFourOptions = question.type === 'mcq' || question.type === 'multiple-select' || question.type === 'passage';
  if (requiresFourOptions && question.options.length !== 4) issues.push({ questionId: question.id, issue: 'चार विकल्प नहीं हैं' });

  const optionIds = new Set(question.options.map((option) => option.id));
  if (!question.correctOptionIds.length || question.correctOptionIds.some((id) => !optionIds.has(id))) {
    issues.push({ questionId: question.id, issue: 'सही उत्तर विकल्पों में मान्य नहीं है' });
  }
  if (question.type === 'mcq' && question.correctOptionIds.length !== 1) {
    issues.push({ questionId: question.id, issue: 'MCQ में एक ही सही विकल्प होना चाहिए' });
  }
  if (question.type === 'true-false' && (question.options.length !== 2 || question.correctOptionIds.length !== 1)) {
    issues.push({ questionId: question.id, issue: 'सत्य/असत्य प्रश्न की संरचना संदिग्ध है' });
  }
  if (question.type === 'multiple-select' && question.correctOptionIds.length < 2) {
    issues.push({ questionId: question.id, issue: 'बहु-विकल्पीय प्रश्न में कम-से-कम दो सही विकल्प अपेक्षित हैं' });
  }
}

const duplicateIds = allQuestions
  .map((question) => question.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

const officialMappings = jnvstClass9Audit
  .filter((row) => row.currentTopicId)
  .map((row) => ({
    syllabusTopic: row.syllabusTopic,
    topicId: row.currentTopicId as string,
    topicTitle: row.currentTopicTitle ?? row.syllabusTopic,
    questionCount: allQuestions.filter((question) => question.topicId === row.currentTopicId).length,
  }));

const zeroQuestionOfficialTopics = officialMappings
  .filter((row) => row.questionCount === 0)
  .map((row) => row.syllabusTopic);

const typeCounts = allQuestions.reduce<Record<string, number>>((counts, question) => {
  counts[question.type] = (counts[question.type] ?? 0) + 1;
  return counts;
}, {});

const subjectCounts = allQuestions.reduce<Record<string, number>>((counts, question) => {
  counts[question.subjectId] = (counts[question.subjectId] ?? 0) + 1;
  return counts;
}, {});

const difficultyCounts = allQuestions.reduce<Record<string, number>>((counts, question) => {
  counts[question.difficulty] = (counts[question.difficulty] ?? 0) + 1;
  return counts;
}, {});

export const jnvstQuestionAudit = {
  चरण: 'चरण 3 — प्रश्न बैंक ऑडिट',
  कुल_प्रश्न: allQuestions.length,
  चार_विकल्प_वाले_प्रश्न: allQuestions.filter((question) => question.options.length === 4).length,
  JNVST_अनुकूल_MCQs: allQuestions.filter((question) => question.metadata?.jnvstCompatible).length,
  परीक्षा_मोड_से_अलग_अभ्यास_प्रश्न: allQuestions.filter((question) => !question.metadata?.jnvstCompatible).length,
  दोहराए_गए_ID: [...new Set(duplicateIds)],
  संरचनात्मक_समस्याएँ: issues,
  शून्य_प्रश्न_वाली_आधिकारिक_इकाइयाँ: zeroQuestionOfficialTopics,
  विषयवार_प्रश्न: subjectCounts,
  प्रश्न_प्रकार_वार: typeCounts,
  कठिनाई_वार: difficultyCounts,
  आधिकारिक_इकाई_वार_प्रश्न: Object.fromEntries(
    officialMappings.map((row) => [row.syllabusTopic, row.questionCount]),
  ),
  अतिरिक्त_वर्तमान_इकाइयाँ: topics
    .filter((topic) => !officialMappings.some((row) => row.topicId === topic.id))
    .map((topic) => ({
      id: topic.id,
      शीर्षक: topic.title,
      प्रश्न: allQuestions.filter((question) => question.topicId === topic.id).length,
    })),
};

export const jnvstQuestionAuditStatus = {
  स्थिति: issues.length || duplicateIds.length || zeroQuestionOfficialTopics.length ? 'समीक्षा आवश्यक' : 'संरचनात्मक जाँच पूर्ण',
  टिप्पणी: 'JNVST परीक्षा-मोड में केवल jnvstCompatible प्रश्नों को लिया जा सकता है; अन्य प्रश्न learning और revision अभ्यास के लिए सुरक्षित हैं।',
};


export const jnvstClass9Phase3Complete = {
  चरण: 'चरण 3 — JNVST प्रश्न बैंक गुणवत्ता और परीक्षा-प्रारूप ऑडिट',
  स्थिति: 'पूरा',
  प्रश्न_बैंक_कुल: allQuestions.length,
  जोड़े_गए_नए_प्रश्न: 10,
  नई_आधिकारिक_इकाई: 'पौधों और जंतुओं का संरक्षण',
  स्मार्ट_मेटाडेटा: 'लागू',
  परीक्षा_योग्य_प्रश्न_चयन: 'लागू',
  नोट: 'गैर-MCQ प्रश्न अभ्यास और revision के लिए सुरक्षित हैं, लेकिन वास्तविक JNVST exam-mode selector केवल चार-विकल्प, एक-सही-उत्तर MCQ लेता है।',
};
