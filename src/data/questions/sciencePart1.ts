import type { Question } from '../../types';

export const scienceQuestionsPart01: Question[] = [
{
    id: 'q_sci_b1_01_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_01',
    textPlain: "भौतिक एवं रासायनिक परिवर्तन में मुख्य अंतर क्या है?",
    options: [
      { id: 'opt_1', text: 'भौतिक परिवर्तन में नया पदार्थ बनता है, रासायनिक में नहीं' },
      { id: 'opt_2', text: 'रासायनिक परिवर्तन में नया पदार्थ बनता है, भौतिक में सामान्यतः नहीं' },
      { id: 'opt_3', text: 'दोनों में हमेशा नया पदार्थ बनता है' },
      { id: 'opt_4', text: 'दोनों में कभी नया पदार्थ नहीं बनता' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "रासायनिक परिवर्तन में पदार्थ की रासायनिक संरचना बदलकर नया पदार्थ बनता है, जबकि भौतिक परिवर्तन में सामान्यतः केवल अवस्था, आकार या रूप बदलता है।",
    difficulty: 'easy',
    tags: ['physical-change', 'chemical-change']
  },
{
    id: 'q_sci_b1_01_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_01',
    textPlain: "बर्फ का पिघलना किस प्रकार का परिवर्तन है?",
    options: [
      { id: 'opt_1', text: 'रासायनिक परिवर्तन' },
      { id: 'opt_2', text: 'भौतिक परिवर्तन' },
      { id: 'opt_3', text: 'परमाणु परिवर्तन' },
      { id: 'opt_4', text: 'जैविक परिवर्तन' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "बर्फ पिघलकर जल बनती है और पदार्थ वही रहता है, इसलिए यह भौतिक परिवर्तन है।",
    difficulty: 'easy',
    tags: ['changes-of-state']
  },
{
    id: 'q_sci_b1_01_003',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_01',
    textPlain: "लोहे में जंग लगना किसका उदाहरण है?",
    options: [
      { id: 'opt_1', text: 'भौतिक परिवर्तन' },
      { id: 'opt_2', text: 'रासायनिक परिवर्तन' },
      { id: 'opt_3', text: 'आवर्त परिवर्तन' },
      { id: 'opt_4', text: 'अवस्था परिवर्तन' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "लोहे की सतह पर ऑक्सीजन और नमी की उपस्थिति में नया पदार्थ आयरन ऑक्साइड बनता है, इसलिए यह रासायनिक परिवर्तन है।",
    difficulty: 'medium',
    tags: ['rusting', 'chemical-change']
  },
{
    id: 'q_sci_b1_01_004',
    type: 'multiple-select',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_01',
    textPlain: "निम्नलिखित में से भौतिक परिवर्तनों का चयन करें: (एक से अधिक सही हो सकते हैं)",
    options: [
      { id: 'opt_1', text: 'कागज का फटना' },
      { id: 'opt_2', text: 'लकड़ी का जलना' },
      { id: 'opt_3', text: 'जल का जमना' },
      { id: 'opt_4', text: 'दूध का दही बनना' }
    ],
    correctOptionIds: ['opt_1', 'opt_3'],
    explanationPlain: "कागज का फटना और जल का जमना भौतिक परिवर्तन हैं क्योंकि नया पदार्थ नहीं बनता।",
    difficulty: 'medium',
    tags: ['physical-change', 'multiple-select']
  },
{
    id: 'q_sci_b1_01_005',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_01',
    textPlain: "किस परिवर्तन को प्रतिवर्ती (reversible) कहा जाता है?",
    options: [
      { id: 'opt_1', text: 'जिसे मूल अवस्था में वापस लाया जा सके' },
      { id: 'opt_2', text: 'जिसमें हमेशा गैस बने' },
      { id: 'opt_3', text: 'जिसमें नया पदार्थ बने' },
      { id: 'opt_4', text: 'जिसे कभी बदला न जा सके' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: "प्रतिवर्ती परिवर्तन वह है जिसमें उपयुक्त परिस्थिति बदलने पर पदार्थ को फिर से उसकी मूल अवस्था में लाया जा सकता है।",
    difficulty: 'hard',
    tags: ['reversible-change']
  },
{
    id: 'q_sci_b1_02_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_02',
    textPlain: "किसी पदार्थ का वह सबसे छोटा कण जो उसके रासायनिक गुण बनाए रखता है, क्या कहलाता है?",
    options: [
      { id: 'opt_1', text: 'कोशिका' },
      { id: 'opt_2', text: 'अणु' },
      { id: 'opt_3', text: 'ऊतक' },
      { id: 'opt_4', text: 'क्रिस्टल' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "अणु किसी पदार्थ का ऐसा सूक्ष्म कण है जो उस पदार्थ के रासायनिक गुणों को बनाए रख सकता है।",
    difficulty: 'easy',
    tags: ['molecules']
  },
{
    id: 'q_sci_b1_02_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_02',
    textPlain: "तत्व का वह सूक्ष्मतम कण जो रासायनिक अभिक्रियाओं में भाग लेता है, क्या कहलाता है?",
    options: [
      { id: 'opt_1', text: 'परमाणु' },
      { id: 'opt_2', text: 'अणु' },
      { id: 'opt_3', text: 'कोशिका' },
      { id: 'opt_4', text: 'आयन' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: "तत्व के रासायनिक गुणों का आधार उसका परमाणु है, जो रासायनिक अभिक्रियाओं में भाग ले सकता है।",
    difficulty: 'easy',
    tags: ['atoms']
  },
{
    id: 'q_sci_b1_02_003',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_02',
    textPlain: "परमाणु का धनावेशित कण कौन-सा है?",
    options: [
      { id: 'opt_1', text: 'इलेक्ट्रॉन' },
      { id: 'opt_2', text: 'प्रोटॉन' },
      { id: 'opt_3', text: 'न्यूट्रॉन' },
      { id: 'opt_4', text: 'फोटॉन' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "प्रोटॉन पर +1 का विद्युत आवेश होता है, जबकि इलेक्ट्रॉन पर -1 और न्यूट्रॉन पर कोई विद्युत आवेश नहीं होता।",
    difficulty: 'medium',
    tags: ['subatomic-particles']
  },
{
    id: 'q_sci_b1_02_004',
    type: 'multiple-select',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_02',
    textPlain: "परमाणु की संरचना के बारे में सही कथनों का चयन करें: (एक से अधिक सही हो सकते हैं)",
    options: [
      { id: 'opt_1', text: 'प्रोटॉन नाभिक में पाए जाते हैं।' },
      { id: 'opt_2', text: 'न्यूट्रॉन का विद्युत आवेश शून्य होता है।' },
      { id: 'opt_3', text: 'इलेक्ट्रॉन नाभिक के बाहर पाए जाते हैं।' },
      { id: 'opt_4', text: 'प्रोटॉन ऋणावेशित होते हैं।' }
    ],
    correctOptionIds: ['opt_1', 'opt_2', 'opt_3'],
    explanationPlain: "प्रोटॉन और न्यूट्रॉन नाभिक में होते हैं तथा इलेक्ट्रॉन नाभिक के बाहर पाए जाते हैं। प्रोटॉन धनावेशित होता है।",
    difficulty: 'hard',
    tags: ['atomic-structure', 'multiple-select']
  },
{
    id: 'q_sci_b1_02_005',
    type: 'true-false',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_02',
    textPlain: "सत्य/असत्य: किसी उदासीन परमाणु में प्रोटॉनों की संख्या इलेक्ट्रॉनों की संख्या के बराबर होती है।",
    options: [
      { id: 'opt_true', text: 'सत्य' },
      { id: 'opt_false', text: 'असत्य' }
    ],
    correctOptionIds: ['opt_true'],
    explanationPlain: "उदासीन परमाणु में धनावेश और ऋणावेश बराबर होते हैं, इसलिए प्रोटॉन और इलेक्ट्रॉन की संख्या समान होती है।",
    difficulty: 'medium',
    tags: ['atomic-structure', 'true-false']
  },
{
    id: 'q_sci_b1_03_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_03',
    textPlain: "बल का SI मात्रक क्या है?",
    options: [
      { id: 'opt_1', text: 'जूल' },
      { id: 'opt_2', text: 'न्यूटन' },
      { id: 'opt_3', text: 'वाट' },
      { id: 'opt_4', text: 'पास्कल' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "बल का SI मात्रक न्यूटन (N) है।",
    difficulty: 'easy',
    tags: ['force', 'units']
  },
{
    id: 'q_sci_b1_03_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_03',
    textPlain: "न्यूटन के प्रथम नियम को किस नाम से जाना जाता है?",
    options: [
      { id: 'opt_1', text: 'जड़त्व का नियम' },
      { id: 'opt_2', text: 'ऊर्जा संरक्षण का नियम' },
      { id: 'opt_3', text: 'दाब का नियम' },
      { id: 'opt_4', text: 'गुरुत्वाकर्षण का नियम' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: "न्यूटन का प्रथम नियम जड़त्व का नियम कहलाता है।",
    difficulty: 'medium',
    tags: ['newtons-laws', 'inertia']
  },
{
    id: 'q_sci_b1_03_003',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_03',
    textPlain: "यदि किसी वस्तु का द्रव्यमान 2 kg और त्वरण 3 m/s² है, तो उस पर लगने वाला बल कितना होगा?",
    options: [
      { id: 'opt_1', text: '5 N' },
      { id: 'opt_2', text: '6 N' },
      { id: 'opt_3', text: '9 N' },
      { id: 'opt_4', text: '12 N' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "F = ma = 2 × 3 = 6 N।",
    difficulty: 'medium',
    tags: ['force', 'newtons-second-law', 'numerical']
  },
{
    id: 'q_sci_b1_03_004',
    type: 'multiple-select',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_03',
    textPlain: "न्यूटन के गति के नियमों से संबंधित सही कथनों का चयन करें: (एक से अधिक सही हो सकते हैं)",
    options: [
      { id: 'opt_1', text: 'द्वितीय नियम F = ma से व्यक्त किया जा सकता है।' },
      { id: 'opt_2', text: 'तृतीय नियम में क्रिया और प्रतिक्रिया बल समान तथा विपरीत होते हैं।' },
      { id: 'opt_3', text: 'प्रथम नियम जड़त्व से संबंधित है।' },
      { id: 'opt_4', text: 'तृतीय नियम केवल स्थिर वस्तुओं पर लागू होता है।' }
    ],
    correctOptionIds: ['opt_1', 'opt_2', 'opt_3'],
    explanationPlain: "पहले तीन कथन सही हैं। तृतीय नियम स्थिर तक सीमित नहीं है; यह परस्पर क्रिया करने वाली वस्तुओं पर लागू होता है।",
    difficulty: 'hard',
    tags: ['newtons-laws', 'multiple-select']
  },
{
    id: 'q_sci_b1_03_005',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_01',
    topicId: 'top_sci_01_03',
    textPlain: "जड़त्व किस पर निर्भर करता है?",
    options: [
      { id: 'opt_1', text: 'रंग पर' },
      { id: 'opt_2', text: 'द्रव्यमान पर' },
      { id: 'opt_3', text: 'तापमान पर ही' },
      { id: 'opt_4', text: 'आकार पर ही' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "किसी वस्तु का द्रव्यमान जितना अधिक होगा, उसकी गति की अवस्था में परिवर्तन का विरोध अर्थात् जड़त्व उतना अधिक होगा।",
    difficulty: 'challenge',
    tags: ['inertia', 'mass']
  },
];
