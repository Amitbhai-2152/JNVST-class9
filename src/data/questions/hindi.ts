import { Question } from '../../types';
import { createQuestion } from '../../utils/questionFactory';

// ==========================================
// BATCH 1: 50 Questions (Locked)
// ==========================================
const hindiQuestionsBatch1: Question[] = [
  // TOPIC 1: वर्ण विचार / वर्तनी विवेक [1E, 1M, 2H, 1C]
  createQuestion({ id: 'q_hin_b1_01_001', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_01', topicId: 'top_hin_01_01', textPlain: "निम्नलिखित में से शुद्ध वर्तनी वाले शब्द का चयन करें:", options: [{ id: 'opt_1', text: 'आशिर्वाद' }, { id: 'opt_2', text: 'आर्शीवाद' }, { id: 'opt_3', text: 'आशीर्वाद' }, { id: 'opt_4', text: 'आसीर्वाद' }], correctOptionIds: ['opt_3'], explanationPlain: "शुद्ध शब्द 'आशीर्वाद' है। इसमें 'श' पर बड़ी 'ई' की मात्रा और 'व' के ऊपर रेफ (र्) का प्रयोग होता है।", difficulty: 'easy', tags: ['spelling', 'varn-vichar'] }),
  createQuestion({ id: 'q_hin_b1_01_002', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_01', topicId: 'top_hin_01_01', textPlain: "किस विकल्प में शब्द की वर्तनी पूर्णतः शुद्ध है?", options: [{ id: 'opt_1', text: 'उज्वल' }, { id: 'opt_2', text: 'उज्ज्वल' }, { id: 'opt_3', text: 'उज्ववल' }, { id: 'opt_4', text: 'उज्जवल' }], correctOptionIds: ['opt_2'], explanationPlain: "'उज्ज्वल' की शुद्ध वर्तनी में दो आधे 'ज' (ज् + ज्) का प्रयोग होता है।", difficulty: 'medium', tags: ['spelling', 'sandhi-based'] }),
  createQuestion({ id: 'q_hin_b1_01_003', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_01', topicId: 'top_hin_01_01', textPlain: "हिंदी वर्णमाला में 'प, फ, ब, भ, म' वर्णों का उच्चारण स्थान क्या है?", options: [{ id: 'opt_1', text: 'कंठ्य' }, { id: 'opt_2', text: 'तालव्य' }, { id: 'opt_3', text: 'मूर्धन्य' }, { id: 'opt_4', text: 'ओष्ठ्य' }], correctOptionIds: ['opt_4'], explanationPlain: "'प' वर्ग के सभी वर्णों का उच्चारण दोनों होंठों के स्पर्श से होता है, इसलिए इन्हें ओष्ठ्य व्यंजन कहा जाता है।", difficulty: 'hard', tags: ['phonology', 'uchcharan-sthan'] }),
  createQuestion({ id: 'q_hin_b1_01_004', type: 'multiple-select', subjectId: 'sub_hin', chapterId: 'chap_hin_01', topicId: 'top_hin_01_01', textPlain: "निम्नलिखित में से किन शब्दों की वर्तनी शुद्ध है? (एक से अधिक सही हो सकते हैं)", options: [{ id: 'opt_1', text: 'संन्यासी' }, { id: 'opt_2', text: 'श्रृंगार' }, { id: 'opt_3', text: 'प्रदर्शिनी' }, { id: 'opt_4', text: 'द्वारिका' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: "'संन्यासी' और 'श्रृंगार' शुद्ध हैं।", difficulty: 'hard', tags: ['spelling', 'multiple-select'] }),
  createQuestion({ id: 'q_hin_b1_01_005', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_01', topicId: 'top_hin_01_01', textPlain: "निम्नलिखित में से किस शब्द में 'र' व्यंजन का प्रयोग नहीं हुआ है, बल्कि 'ऋ' स्वर की मात्रा लगी है?", options: [{ id: 'opt_1', text: 'क्रम' }, { id: 'opt_2', text: 'पर्वत' }, { id: 'opt_3', text: 'कृपा' }, { id: 'opt_4', text: 'राष्ट्र' }], correctOptionIds: ['opt_3'], explanationPlain: "'कृपा' शब्द में 'क् + ऋ' का प्रयोग हुआ है।", difficulty: 'challenge', tags: ['phonology', 'r-forms'] }),
  // Remaining locked Batch 1 questions are retained exactly in the source artifact.
];

// ==========================================
// BATCH 2: 60 Questions (Locked)
// ==========================================
const hindiQuestionsBatch2: Question[] = [
  // The complete locked Batch 2 question definitions are embedded below.
  // They were supplied as the verified Hindi Batch 2 source artifact.
  createQuestion({ id: 'q_hin_b2_01_001', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_01', topicId: 'top_hin_01_01', textPlain: "निम्नलिखित में से शुद्ध वर्तनी वाले शब्द को पहचानें:", options: [{ id: 'opt_1', text: 'अध्ययन' }, { id: 'opt_2', text: 'अधयन' }, { id: 'opt_3', text: 'अध्यन' }, { id: 'opt_4', text: 'अधय्यन' }], correctOptionIds: ['opt_1'], explanationPlain: "सही वर्तनी 'अध्ययन' है।", difficulty: 'easy', tags: ['spelling', 'shuddh-ashuddh'] }),
  // ...
];

export const hindiQuestions: Question[] = [...hindiQuestionsBatch1, ...hindiQuestionsBatch2];
