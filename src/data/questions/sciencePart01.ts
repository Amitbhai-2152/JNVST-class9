import type { Question } from '../../types';

export const scienceQuestionsPart01: Question[] = [
{
    id: 'q_sci_b1_01_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_11',
    topicId: 'top_sci_01_01',
    textPlain: "दाब (Pressure) की मानक SI इकाई क्या है?",
    options: [
      { id: 'opt_1', text: 'न्यूटन (N)' },
      { id: 'opt_2', text: 'जूल (J)' },
      { id: 'opt_3', text: 'पास्कल (Pa)' },
      { id: 'opt_4', text: 'वाट (W)' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "दाब की SI इकाई पास्कल (Pa) होती है, जहाँ 1 Pa = 1 N/m² (एक न्यूटन प्रति वर्ग मीटर) होता है।",
    difficulty: 'easy',
    tags: ['force-pressure', 'units']
  },
{
    id: 'q_sci_b1_01_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_11',
    topicId: 'top_sci_01_01',
    textPlain: "एक लोहे की कील का सिरा नुकीला क्यों बनाया जाता है?",
    options: [
      { id: 'opt_1', text: 'ताकि वह देखने में सुंदर लगे।' },
      { id: 'opt_2', text: 'क्षेत्रफल कम होने से उसी बल पर दाब बढ़ जाता है, जिससे वह आसानी से धँस जाती है।' },
      { id: 'opt_3', text: 'क्षेत्रफल कम होने से बल का मान बढ़ जाता है।' },
      { id: 'opt_4', text: 'ताकि उस पर जंग न लगे।' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "दाब = बल/क्षेत्रफल। सिरा नुकीला होने से संपर्क क्षेत्रफल कम हो जाता है, अतः समान बल लगाने पर भी बहुत अधिक दाब उत्पन्न होता है और कील आसानी से धँस जाती है।",
    difficulty: 'medium',
    tags: ['force-pressure', 'application']
  },
{
    id: 'q_sci_b1_01_003',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_11',
    topicId: 'top_sci_01_01',
    textPlain: "निम्नलिखित में से कौन-सा बल 'असम्पर्क बल' (Non-contact force) का उदाहरण नहीं है?",
    options: [
      { id: 'opt_1', text: 'गुरुत्वाकर्षण बल (Gravitational force)' },
      { id: 'opt_2', text: 'चुम्बकीय बल (Magnetic force)' },
      { id: 'opt_3', text: 'पेशीय बल (Muscular force)' },
      { id: 'opt_4', text: 'स्थिर-विद्युत बल (Electrostatic force)' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "पेशीय बल लगाने के लिए वस्तु के साथ शारीरिक संपर्क आवश्यक है, अतः यह 'सम्पर्क बल' है। अन्य तीनों बल दूर से ही कार्य कर सकते हैं।",
    difficulty: 'hard',
    tags: ['force-pressure', 'types-of-force']
  },
{
    id: 'q_sci_b1_01_004',
    type: 'multiple-select',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_11',
    topicId: 'top_sci_01_01',
    textPlain: "तरलों (Liquids/Gases) द्वारा लगाए जाने वाले दाब के संबंध में सत्य कथन चुनें: (एक से अधिक सही हो सकते हैं)",
    options: [
      { id: 'opt_1', text: 'द्रव बर्तन की दीवारों पर दाब डालते हैं।' },
      { id: 'opt_2', text: 'समान गहराई पर द्रव सभी दिशाओं में समान दाब डालता है।' },
      { id: 'opt_3', text: 'द्रव का दाब गहराई बढ़ने पर कम होता जाता है।' },
      { id: 'opt_4', text: 'वायुमंडल हमारे ऊपर बहुत अधिक दाब डालता है, परंतु हम पिचकते नहीं क्योंकि हमारे शरीर के अंदर का दाब वायुमंडलीय दाब के बराबर होता है।' }
    ],
    correctOptionIds: ['opt_1', 'opt_2', 'opt_4'],
    explanationPlain: "कथन 1, 2 और 4 पूर्णतः सत्य हैं। कथन 3 गलत है क्योंकि गहराई बढ़ने के साथ-साथ द्रव का दाब हमेशा बढ़ता है।",
    difficulty: 'hard',
    tags: ['force-pressure', 'fluids', 'multiple-select']
  },
{
    id: 'q_sci_b1_01_005',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_11',
    topicId: 'top_sci_01_01',
    textPlain: "20 न्यूटन (N) का बल 0.5 m² क्षेत्रफल पर लंबवत लगाया जाता है। उत्पन्न दाब की गणना कीजिए।",
    options: [
      { id: 'opt_1', text: '10 Pa' },
      { id: 'opt_2', text: '40 Pa' },
      { id: 'opt_3', text: '100 Pa' },
      { id: 'opt_4', text: '25 Pa' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "दाब (P) = बल (F) / क्षेत्रफल (A)। अतः P = 20 / 0.5 = 40 Pa।",
    difficulty: 'challenge',
    tags: ['force-pressure', 'numerical']
  },
{
    id: 'q_sci_b1_02_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_12',
    topicId: 'top_sci_01_02',
    textPlain: "वाहनों के टायरों को खाँचेदार (Treaded) क्यों बनाया जाता है?",
    options: [
      { id: 'opt_1', text: 'वाहन का वजन कम करने के लिए' },
      { id: 'opt_2', text: 'टायरों की सुंदरता बढ़ाने के लिए' },
      { id: 'opt_3', text: 'घर्षण (Friction) बढ़ाने के लिए ताकि वाहन सड़क पर न फिसले' },
      { id: 'opt_4', text: 'घर्षण को पूरी तरह शून्य करने के लिए' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "खाँचेदार टायर सड़क की सतह के साथ बेहतर पकड़ (grip) बनाते हैं, जिससे घर्षण बढ़ जाता है और वाहन के फिसलने का खतरा कम होता है।",
    difficulty: 'easy',
    tags: ['friction', 'application']
  },
{
    id: 'q_sci_b1_02_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_12',
    topicId: 'top_sci_01_02',
    textPlain: "निम्नलिखित में से घर्षण कम करने का तरीका कौन-सा नहीं है?",
    options: [
      { id: 'opt_1', text: 'स्नेहक (Lubricant) का प्रयोग करना' },
      { id: 'opt_2', text: 'बॉल-बियरिंग (Ball-bearing) का प्रयोग करना' },
      { id: 'opt_3', text: 'सतह पर मिट्टी या रेत डालना' },
      { id: 'opt_4', text: 'सतह को पॉलिश करना' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "मिट्टी या रेत डालने से सतह खुरदरी हो जाती है जिससे घर्षण बढ़ जाता है। स्नेहक, पॉलिश और बॉल-बियरिंग घर्षण कम करने के साधन हैं।",
    difficulty: 'medium',
    tags: ['friction', 'reducing-friction']
  },
{
    id: 'q_sci_b1_02_003',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_12',
    topicId: 'top_sci_01_02',
    textPlain: "घर्षण बलों को उनके मान के बढ़ते क्रम में सही ढंग से कैसे व्यवस्थित किया जाएगा?",
    options: [
      { id: 'opt_1', text: 'लोटनिक < सर्पी < स्थैतिक (Rolling < Sliding < Static)' },
      { id: 'opt_2', text: 'स्थैतिक < सर्पी < लोटनिक (Static < Sliding < Rolling)' },
      { id: 'opt_3', text: 'लोटनिक < स्थैतिक < सर्पी (Rolling < Static < Sliding)' },
      { id: 'opt_4', text: 'सर्पी < लोटनिक < स्थैतिक (Sliding < Rolling < Static)' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: "लोटनिक घर्षण (Rolling friction) सबसे कम होता है। सर्पी घर्षण (Sliding) उससे अधिक होता है, और सीमांत स्थैतिक घर्षण (Maximum Static friction) सबसे अधिक होता है।",
    difficulty: 'medium',
    tags: ['friction', 'types']
  },
{
    id: 'q_sci_b1_02_004',
    type: 'true-false',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_12',
    topicId: 'top_sci_01_02',
    textPlain: "सत्य/असत्य: किसी भारी बक्से को खिसकाते समय, जब बक्सा एक बार चलना शुरू कर देता है, तो उसे गतिमान रखने के लिए आवश्यक बल उस बल से कम होता है जो बक्से को विरामावस्था से खिसकाने के लिए आवश्यक था।",
    options: [
      { id: 'opt_true', text: 'सत्य' },
      { id: 'opt_false', text: 'असत्य' }
    ],
    correctOptionIds: ['opt_true'],
    explanationPlain: "सत्य। बक्से को विराम अवस्था से चलाने के लिए स्थैतिक घर्षण (अधिकतम) को पार करना होता है, जबकि गतिमान रहने पर सर्पी घर्षण लगता है जो स्थैतिक घर्षण से थोड़ा कम होता है।",
    difficulty: 'hard',
    tags: ['friction', 'static-vs-sliding']
  },
{
    id: 'q_sci_b1_02_005',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_12',
    topicId: 'top_sci_01_02',
    textPlain: "तरल कर्षण (Fluid Friction/Drag) को कम करने के लिए हवाई जहाज़ों और मछलियों के शरीर की बनावट कैसी होती है?",
    options: [
      { id: 'opt_1', text: 'चौकोर (Square-shaped)' },
      { id: 'opt_2', text: 'धारारेखीय (Streamlined)' },
      { id: 'opt_3', text: 'गोलाकार (Perfectly spherical)' },
      { id: 'opt_4', text: 'अंडाकार (Oval)' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "तरल (वायु या जल) में गति करने वाली वस्तुओं पर लगने वाले घर्षण बल (Drag) को कम करने के लिए उनके शरीर को विशेष 'धारारेखीय' (Streamlined) आकार दिया जाता है, जिससे तरल उनके ऊपर से आसानी से बह सके।",
    difficulty: 'challenge',
    tags: ['friction', 'fluid-friction']
  },
{
    id: 'q_sci_b1_03_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_13',
    topicId: 'top_sci_01_03',
    textPlain: "ध्वनि के संचरण (Propagation of Sound) के लिए निम्नलिखित में से किसकी आवश्यकता होती है?",
    options: [
      { id: 'opt_1', text: 'केवल वायु' },
      { id: 'opt_2', text: 'निर्वात (Vacuum)' },
      { id: 'opt_3', text: 'माध्यम (ठोस, द्रव या गैस)' },
      { id: 'opt_4', text: 'केवल प्रकाश' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "ध्वनि एक यांत्रिक तरंग (Mechanical wave) है। इसे एक स्थान से दूसरे स्थान तक जाने के लिए किसी न किसी माध्यम (ठोस, द्रव या गैस) की आवश्यकता होती है। यह निर्वात में नहीं चल सकती।",
    difficulty: 'easy',
    tags: ['sound', 'medium']
  },
{
    id: 'q_sci_b1_03_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_13',
    topicId: 'top_sci_01_03',
    textPlain: "ध्वनि की प्रबलता (Loudness) और तारत्व (Pitch) क्रमशः किन भौतिक राशियों पर निर्भर करते हैं?",
    options: [
      { id: 'opt_1', text: 'आयाम (Amplitude) और आवृत्ति (Frequency)' },
      { id: 'opt_2', text: 'आवृत्ति (Frequency) और आयाम (Amplitude)' },
      { id: 'opt_3', text: 'वेग (Velocity) और तरंगदैर्ध्य (Wavelength)' },
      { id: 'opt_4', text: 'आयाम (Amplitude) और वेग (Velocity)' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: "ध्वनि की प्रबलता कंपन के आयाम (Amplitude) के वर्ग के अनुक्रमानुपाती होती है, और ध्वनि का तारत्व (Pitch/Shrillness) कंपन की आवृत्ति (Frequency) पर निर्भर करता है।",
    difficulty: 'medium',
    tags: ['sound', 'characteristics']
  },
{
    id: 'q_sci_b1_03_003',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_13',
    topicId: 'top_sci_01_03',
    textPlain: "मानव कान के लिए श्रव्य आवृत्ति का परास (Audible Range of Frequency) लगभग कितना है?",
    options: [
      { id: 'opt_1', text: '20 Hz से 200 Hz' },
      { id: 'opt_2', text: '200 Hz से 20,000 Hz' },
      { id: 'opt_3', text: '20 Hz से 20,000 Hz' },
      { id: 'opt_4', text: '2 Hz से 2000 Hz' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "मनुष्य सामान्यतः 20 कंपन प्रति सेकंड (Hz) से लेकर 20,000 कंपन प्रति सेकंड (Hz) के बीच की आवृत्तियों वाली ध्वनियाँ ही सुन सकता है।",
    difficulty: 'hard',
    tags: ['sound', 'audible-range']
  },
{
    id: 'q_sci_b1_03_004',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_13',
    topicId: 'top_sci_01_03',
    textPlain: "जब किसी मच्छर के पंख एक सेकंड में 500 बार कंपन करते हैं, तो उत्पन्न ध्वनि की आवृत्ति और आवर्तकाल (Time period) क्या होंगे?",
    options: [
      { id: 'opt_1', text: 'आवृत्ति = 500 Hz, आवर्तकाल = 0.02 s' },
      { id: 'opt_2', text: 'आवृत्ति = 500 Hz, आवर्तकाल = 0.002 s' },
      { id: 'opt_3', text: 'आवृत्ति = 1/500 Hz, आवर्तकाल = 500 s' },
      { id: 'opt_4', text: 'आवृत्ति = 250 Hz, आवर्तकाल = 0.004 s' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "1 सेकंड में कंपनों की संख्या आवृत्ति होती है (500 Hz)। एक कंपन में लगा समय आवर्तकाल (T = 1/f) होता है। अतः T = 1/500 = 0.002 सेकंड।",
    difficulty: 'hard',
    tags: ['sound', 'numerical']
  },
{
    id: 'q_sci_b1_03_005',
    type: 'multiple-select',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_13',
    topicId: 'top_sci_01_03',
    textPlain: "निम्नलिखित में से किन परिघटनाओं का कारण ध्वनि का कंपन (Vibration) है? (एक से अधिक सही हो सकते हैं)",
    options: [
      { id: 'opt_1', text: 'जब हम बोलते हैं, तो गले में स्थित वाक्‌तंतु (Vocal cords) कंपन करते हैं।' },
      { id: 'opt_2', text: 'सितार का तार खींचने पर ध्वनि उत्पन्न होना।' },
      { id: 'opt_3', text: 'निर्वात में दो पत्थरों के टकराने पर तेज़ आवाज़ आना।' },
      { id: 'opt_4', text: 'जल से भरे बर्तन के किनारे को पीटने पर जल की सतह पर लहरें उत्पन्न होना।' }
    ],
    correctOptionIds: ['opt_1', 'opt_2', 'opt_4'],
    explanationPlain: "कथन 1, 2 और 4 ध्वनि के कंपन के सही उदाहरण हैं। कथन 3 गलत है क्योंकि निर्वात (Vacuum) में ध्वनि संचरित ही नहीं हो सकती।",
    difficulty: 'challenge',
    tags: ['sound', 'vibration', 'multiple-select']
  }
];
