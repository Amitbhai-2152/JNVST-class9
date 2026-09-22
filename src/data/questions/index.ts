import type { Question } from "../../types";
import { englishQuestions } from "./english";
import { hindiQuestions } from "./hindi";
import { mathQuestions } from "./math";
import { scienceQuestions } from "./science";
import { topics } from "../curriculum";
import { jnvstClass9Audit } from "../syllabus/jnvst-class9-audit";
import { phase5Enhancements } from "../lessons/phase5Content";

export const rawQuestions: Question[] = [
  ...englishQuestions,
  ...hindiQuestions,
  ...mathQuestions,
  ...scienceQuestions,
];

const skillMap: Record<string, string> = {
  comprehension: 'पठन-बोध',
  'main-idea': 'मुख्य विचार पहचानना',
  inference: 'निष्कर्ष निकालना',
  vocabulary: 'शब्दार्थ पहचानना',
  'critical-reading': 'आलोचनात्मक पठन',
  'parts-of-speech': 'पद पहचानना',
  adjective: 'विशेषण पहचानना',
  adverb: 'क्रिया-विशेषण पहचानना',
  'sentence-structure': 'वाक्य संरचना समझना',
  fragments: 'वाक्य-पूर्णता पहचानना',
  imperative: 'आज्ञार्थक वाक्य पहचानना',
  spelling: 'शुद्ध वर्तनी पहचानना',
  'jumbled-words': 'वाक्य क्रम-विन्यास',
  'sentence-order': 'वाक्य क्रम पहचानना',
  tenses: 'काल का सही प्रयोग',
  modals: 'सहायक क्रियाओं का प्रयोग',
  prepositions: 'पूर्वसर्ग का प्रयोग',
  'passive-voice': 'वाच्य परिवर्तन',
  'reported-speech': 'अप्रत्यक्ष कथन',
  'degrees-of-comparison': 'तुलना की डिग्री',
  'rational-numbers': 'परिमेय संख्या गणना',
  squares: 'वर्ग और वर्गमूल',
  cubes: 'घन और घनमूल',
  exponents: 'घातांक के नियम',
  proportion: 'समानुपात',
  'comparing-quantities': 'राशियों की तुलना',
  'profit-loss': 'लाभ-हानि',
  discount: 'छूट',
  'compound-interest': 'चक्रवृद्धि ब्याज',
  'factorisation': 'गुणनखंडन',
  algebra: 'बीजीय तर्क',
  'linear-equations': 'रैखिक समीकरण',
  mensuration: 'क्षेत्रमिति',
  'data-handling': 'आँकड़ों का प्रबंधन',
  probability: 'प्रायिकता',
  conservation: 'संरक्षण',
  habitat: 'प्राकृतिक आवास',
  biodiversity: 'जैव विविधता',
  deforestation: 'वनों की कटाई के प्रभाव',
  reasoning: 'तार्किक विश्लेषण',
};

const officialTopicIds = new Set(
  jnvstClass9Audit
    .filter((row) => row.status === 'पूर्ण' && row.currentTopicId)
    .map((row) => row.currentTopicId as string),
);

const topicTitleById = new Map(topics.map((topic) => [topic.id, topic.title]));

const firstMatchingSkill = (question: Question): string => {
  const tag = question.tags.find((candidate) => skillMap[candidate]);
  if (tag) return skillMap[tag];
  return question.type === 'mcq' ? 'अवधारणा आधारित बहुविकल्पीय अभ्यास' : 'अवधारणा जाँच';
};

const cognitiveLevelFor = (question: Question): NonNullable<Question['metadata']>['cognitiveLevel'] => {
  if (question.tags.some((tag) => ['numerical', 'word-problem', 'application', 'reasoning', 'inference', 'algebraic-application', 'percentage-integration'].includes(tag))) {
    return 'अनुप्रयोग';
  }
  if (question.tags.some((tag) => ['critical-reading', 'transformation', 'advanced-transformation', 'complex', 'multiple-select'].includes(tag))) {
    return 'तर्क';
  }
  if (question.tags.some((tag) => ['properties', 'definitions', 'units', 'types', 'parts-of-speech'].includes(tag))) {
    return 'समझ';
  }
  return 'स्मरण';
};

const estimatedSecondsFor = (question: Question): number => {
  const difficultyBase: Record<Question['difficulty'], number> = {
    easy: 25,
    medium: 35,
    hard: 45,
    challenge: 55,
  };
  const typeExtra = question.type === 'multiple-select' ? 10 : question.type === 'true-false' ? -8 : question.type === 'passage' ? 20 : 0;
  return Math.max(15, difficultyBase[question.difficulty] + typeExtra);
};

const smartEnrich = (question: Question): Question => ({
  ...question,
  metadata: {
    ...question.metadata,
    examRelevance: officialTopicIds.has(question.topicId) ? 'मुख्य' : 'सहायक',
    skill: question.metadata?.skill ?? firstMatchingSkill(question),
    concept: question.metadata?.concept ?? topicTitleById.get(question.topicId) ?? question.topicId,
    cognitiveLevel: question.metadata?.cognitiveLevel ?? cognitiveLevelFor(question),
    estimatedSeconds: question.metadata?.estimatedSeconds ?? estimatedSecondsFor(question),
    commonTrap: question.metadata?.commonTrap ?? phase5Enhancements[question.topicId]?.trap,
    jnvstCompatible: question.type === 'mcq' && question.options.length === 4 && question.correctOptionIds.length === 1,
  },
});

export const allQuestions: Question[] = rawQuestions.map(smartEnrich);

const counts = {
  sub_eng: englishQuestions.length,
  sub_hin: hindiQuestions.length,
  sub_math: mathQuestions.length,
  sub_sci: scienceQuestions.length,
};

const expectedCounts = { sub_eng: 100, sub_hin: 110, sub_math: 220, sub_sci: 390, total: 820 };

// Never crash the entire app because of a content-count mismatch.
// Keep the integrity check visible in the console so content issues can be fixed
// without turning the UI into a blank screen.
if (counts.sub_eng !== expectedCounts.sub_eng || counts.sub_hin !== expectedCounts.sub_hin || counts.sub_math !== expectedCounts.sub_math || counts.sub_sci !== expectedCounts.sub_sci || allQuestions.length !== expectedCounts.total) {
  console.error("Question bank integrity check failed", { counts, total: allQuestions.length, expected: expectedCounts });
}

export const jnvstExamQuestions: Question[] = allQuestions.filter((question) => question.metadata?.jnvstCompatible);

export const getJnvstQuestionsBySubject = (subjectId: string) =>
  jnvstExamQuestions.filter((question) => question.subjectId === subjectId);

export const getJnvstQuestionsByTopic = (topicId: string) =>
  jnvstExamQuestions.filter((question) => question.topicId === topicId);

export const getQuestion = (id: string) => allQuestions.find((q) => q.id === id);
export const getQuestionsByTopic = (topicId: string) => allQuestions.filter((q) => q.topicId === topicId);
export const getQuestionsBySubject = (subjectId: string) => allQuestions.filter((q) => q.subjectId === subjectId);
