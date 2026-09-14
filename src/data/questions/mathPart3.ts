import { Question } from '../../types';
export const mathQuestionsPart3: Question[] = [
{
id: 'q_math_b2_01_002',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_01',
topicId: 'top_math_01_01',
textPlain: "दो परिमेय संख्याओं का गुणनफल -15/28 है। यदि उनमें से एक संख्या -5/7 है, तो दूसरी संख्या क्या होगी?",
options: [{ id: 'opt_1', text: '3/4' }, { id: 'opt_2', text: '-3/4' }, { id: 'opt_3', text: '5/4' }, { id: 'opt_4', text: '-5/4' }],
correctOptionIds: ['opt_1'],
explanationPlain: "माना दूसरी संख्या x है। (-5/7) × x = -15/28 ⇒ x = (-15/28) ÷ (-5/7) = (-15/28) × (-7/5) = 3/4।",
difficulty: 'medium', tags: ['rational-numbers', 'operations']
},
{
id: 'q_math_b2_01_003',
type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_01',
textPlain: "वितरण नियम (Distributivity) का उपयोग करके मान ज्ञात करें: (7/5) × (-3/12) + (7/5) × (5/12)",
options: [{ id: 'opt_1', text: '14/60' }, { id: 'opt_2', text: '7/30' }, { id: 'opt_3', text: '7/15' }, { id: 'opt_4', text: '-7/30' }],
correctOptionIds: ['opt_2'],
explanationPlain: "a × b + a × c = a × (b + c) नियम से: (7/5) × [(-3/12) + (5/12)] = (7/5) × (2/12) = (7/5) × (1/6) = 7/30।",
difficulty: 'medium', tags: ['rational-numbers', 'distributive-property']
},
{
id: 'q_math_b2_01_004', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_01',
textPlain: "परिमेय संख्याओं -2/5 और 1/2 के ठीक बीच (मध्य) की परिमेय संख्या क्या होगी?",
options: [{ id: 'opt_1', text: '1/20' }, { id: 'opt_2', text: '1/10' }, { id: 'opt_3', text: '-1/20' }, { id: 'opt_4', text: '-3/10' }],
correctOptionIds: ['opt_1'],
explanationPlain: "दो संख्याओं a और b के ठीक बीच की संख्या (a + b) / 2 होती है। [-2/5 + 1/2] / 2 = [(-4 + 5)/10] / 2 = 1/20।",
difficulty: 'hard', tags: ['rational-numbers', 'finding-numbers']
},
{
id: 'q_math_b2_01_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_01',
textPlain: "एक बर्तन में 40 लीटर मिश्रण है जिसमें दूध और पानी का अनुपात 5:3 है। यदि इसमें 8 लीटर पानी और मिला दिया जाए, तो नए मिश्रण में दूध की मात्रा पूरे मिश्रण का कौन-सा भाग (भिन्न) होगी?",
options: [{ id: 'opt_1', text: '5/8' }, { id: 'opt_2', text: '1/2' }, { id: 'opt_3', text: '25/48' }, { id: 'opt_4', text: '5/11' }],
correctOptionIds: ['opt_3'],
explanationPlain: "प्रारंभिक दूध = (5/8) × 40 = 25 लीटर। पानी = 15 लीटर। नया कुल मिश्रण = 48 लीटर। दूध की मात्रा वही रही। अतः नया भाग = 25/48।",
difficulty: 'challenge', tags: ['rational-numbers', 'ratio-application']
},
{
id: 'q_math_b2_02_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_02',
textPlain: "क्रमागत विषम संख्याओं के योग के नियम का उपयोग करते हुए, पहली 15 विषम प्राकृत संख्याओं का योगफल (Sum) क्या होगा?",
options: [{ id: 'opt_1', text: '210' }, { id: 'opt_2', text: '225' }, { id: 'opt_3', text: '196' }, { id: 'opt_4', text: '256' }],
correctOptionIds: ['opt_2'],
explanationPlain: "प्रथम n विषम प्राकृत संख्याओं का योग हमेशा n² होता है। अतः 15 विषम संख्याओं का योग = 15² = 225।",
difficulty: 'easy', tags: ['squares', 'properties-odd-numbers']
},
{
id: 'q_math_b2_02_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_02',
textPlain: "एक माली 1024 पौधों को इस प्रकार लगाना चाहता है कि पंक्तियों (rows) की संख्या और प्रत्येक पंक्ति में पौधों की संख्या समान रहे। प्रत्येक पंक्ति में कितने पौधे होंगे?",
options: [{ id: 'opt_1', text: '32' }, { id: 'opt_2', text: '34' }, { id: 'opt_3', text: '36' }, { id: 'opt_4', text: '42' }],
correctOptionIds: ['opt_1'],
explanationPlain: "पंक्तियों की संख्या × पंक्ति में पौधे = x × x = x² = 1024। 1024 का वर्गमूल 32 है।",
difficulty: 'medium', tags: ['squares', 'word-problem']
},
{
id: 'q_math_b2_02_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_02',
textPlain: "दशमलव संख्या 42.25 का वर्गमूल (Square Root) ज्ञात करें।",
options: [{ id: 'opt_1', text: '6.05' }, { id: 'opt_2', text: '6.5' }, { id: 'opt_3', text: '7.5' }, { id: 'opt_4', text: '6.25' }],
correctOptionIds: ['opt_2'],
explanationPlain: "42.25 को 4225/100 लिखा जा सकता है। 4225 का वर्गमूल 65 है। अतः 65/10 = 6.5।",
difficulty: 'hard', tags: ['squares', 'decimals']
},
{
id: 'q_math_b2_02_004', type: 'multiple-select', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_02',
textPlain: "निम्नलिखित में से कौन-से कथन पूर्ण वर्गों (Perfect Squares) के बारे में सत्य हैं? (एक से अधिक सही हो सकते हैं)",
options: [{ id: 'opt_1', text: 'किसी भी सम संख्या का वर्ग हमेशा सम होता है।' }, { id: 'opt_2', text: 'किसी पूर्ण वर्ग संख्या के अंत में शून्यों (zeros) की संख्या हमेशा विषम (odd) होती है।' }, { id: 'opt_3', text: 'दो क्रमागत पूर्ण वर्गों n² और (n+1)² के बीच 2n अपूर्ण वर्ग संख्याएँ होती हैं।' }, { id: 'opt_4', text: 'विषम संख्या का वर्गमूल हमेशा एक सम संख्या होता है।' }],
correctOptionIds: ['opt_1', 'opt_3'],
explanationPlain: "कथन 1 और 3 सत्य हैं। पूर्ण वर्ग में शून्यों की संख्या हमेशा सम (even) होती है, और विषम संख्या का वर्गमूल विषम ही होता है।",
difficulty: 'hard', tags: ['squares', 'properties-multiple-select']
},
{
id: 'q_math_b2_02_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_02',
textPlain: "वह सबसे छोटी प्राकृत संख्या ज्ञात कीजिए जिसे 5607 में से घटाने पर एक पूर्ण वर्ग प्राप्त हो। प्राप्त पूर्ण वर्ग का वर्गमूल भी क्या होगा?",
options: [{ id: 'opt_1', text: '131 घटाएँ, वर्गमूल 74' }, { id: 'opt_2', text: '131 घटाएँ, वर्गमूल 76' }, { id: 'opt_3', text: '131 घटाएँ, वर्गमूल 75' }, { id: 'opt_4', text: '136 घटाएँ, वर्गमूल 74' }],
correctOptionIds: ['opt_1'],
explanationPlain: "74² = 5476 और 75² = 5625। 5607 - 5476 = 131। अतः 131 घटाने पर 5476 प्राप्त होगा, जिसका वर्गमूल 74 है।",
difficulty: 'challenge', tags: ['squares', 'division-method']
},
{
id: 'q_math_b2_03_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_03',
textPlain: "हार्डी-रामानुजन संख्या (Hardy-Ramanujan Number) 1729 की क्या विशेषता है?",
options: [{ id: 'opt_1', text: 'यह वह सबसे छोटी संख्या है जिसे तीन अलग-अलग घनों के योग के रूप में लिखा जा सकता है।' }, { id: 'opt_2', text: 'यह वह सबसे छोटी संख्या है जिसे दो अलग-अलग घनों के योग के रूप में दो भिन्न प्रकार से लिखा जा सकता है।' }, { id: 'opt_3', text: 'यह 17 और 29 का गुणनफल है जो पूर्ण घन है।' }, { id: 'opt_4', text: 'यह सबसे बड़ी 4 अंकों की पूर्ण घन संख्या है।' }],
correctOptionIds: ['opt_2'],
explanationPlain: "1729 = 10³ + 9³ = 12³ + 1³, और यह सबसे छोटी संख्या है जिसे दो घनों के योग के रूप में दो अलग-अलग तरीकों से व्यक्त किया जा सकता है।",
difficulty: 'easy', tags: ['cubes', 'hardy-ramanujan']
},
{
id: 'q_math_b2_03_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_03',
textPlain: "यदि किसी घन (Cube) की प्रत्येक भुजा को दुगुना (double) कर दिया जाए, तो उसका नया आयतन मूल आयतन का कितने गुना हो जाएगा?",
options: [{ id: 'opt_1', text: '2 गुना' }, { id: 'opt_2', text: '4 गुना' }, { id: 'opt_3', text: '6 गुना' }, { id: 'opt_4', text: '8 गुना' }],
correctOptionIds: ['opt_4'],
explanationPlain: "मूल आयतन a³ और नया आयतन (2a)³ = 8a³ है। अतः आयतन 8 गुना हो जाएगा।",
difficulty: 'medium', tags: ['cubes', 'volume-ratio']
},
{
id: 'q_math_b2_03_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_03',
textPlain: "संख्या 392 को किस सबसे छोटी प्राकृत संख्या से गुणा किया जाए कि यह एक पूर्ण घन बन जाए?",
options: [{ id: 'opt_1', text: '2' }, { id: 'opt_2', text: '4' }, { id: 'opt_3', text: '7' }, { id: 'opt_4', text: '14' }],
correctOptionIds: ['opt_3'],
explanationPlain: "392 = 2³ × 7²। 7 का त्रिक पूरा करने के लिए 7 से गुणा करना आवश्यक है।",
difficulty: 'medium', tags: ['cubes', 'factorisation']
},
{
id: 'q_math_b2_03_004', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_03',
textPlain: "∛(-1000) × ∛(343) का मान क्या होगा?",
options: [{ id: 'opt_1', text: '-70' }, { id: 'opt_2', text: '70' }, { id: 'opt_3', text: '-30' }, { id: 'opt_4', text: '30' }],
correctOptionIds: ['opt_1'],
explanationPlain: "∛(-1000) = -10 और ∛343 = 7। अतः -10 × 7 = -70।",
difficulty: 'hard', tags: ['cubes', 'negative-cubes']
},
{
id: 'q_math_b2_03_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_03',
textPlain: "एक धातु के तीन ठोस घनों, जिनकी भुजाएँ क्रमशः 3 सेमी, 4 सेमी और 5 सेमी हैं, को पिघलाकर एक नया बड़ा घन बनाया गया। इस नए घन का पृष्ठीय क्षेत्रफल (Surface Area) ज्ञात कीजिए।",
options: [{ id: 'opt_1', text: '216 वर्ग सेमी' }, { id: 'opt_2', text: '144 वर्ग सेमी' }, { id: 'opt_3', text: '180 वर्ग सेमी' }, { id: 'opt_4', text: '256 वर्ग सेमी' }],
correctOptionIds: ['opt_1'],
explanationPlain: "कुल आयतन = 3³ + 4³ + 5³ = 216 घन सेमी। नया घन 6 सेमी भुजा का है। कुल पृष्ठीय क्षेत्रफल = 6 × 6² = 216 वर्ग सेमी।",
difficulty: 'challenge', tags: ['cubes', 'mensuration-integration']
},
{
id: 'q_math_b2_04_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_04',
textPlain: "घातांक नियमों का प्रयोग करते हुए सरल कीजिए: (2³)⁴",
options: [{ id: 'opt_1', text: '2⁷' }, { id: 'opt_2', text: '2¹²' }, { id: 'opt_3', text: '8⁴' }, { id: 'opt_4', text: 'विकल्प 2 और 3 दोनों' }],
correctOptionIds: ['opt_4'],
explanationPlain: "(a^m)^n = a^(m×n) से 2¹²। साथ ही 2³ = 8, इसलिए 8⁴ भी। अतः विकल्प 2 और 3 दोनों सत्य हैं।",
difficulty: 'easy', tags: ['exponents', 'power-of-power']
},
{
id: 'q_math_b2_04_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_04',
textPlain: "मान ज्ञात कीजिए: (5⁻¹ × 2⁻¹) ÷ 6⁻¹",
options: [{ id: 'opt_1', text: '3/5' }, { id: 'opt_2', text: '5/3' }, { id: 'opt_3', text: '1/60' }, { id: 'opt_4', text: '60' }],
correctOptionIds: ['opt_1'],
explanationPlain: "(1/5 × 1/2) ÷ 1/6 = 1/10 × 6 = 3/5।",
difficulty: 'medium', tags: ['exponents', 'negative-powers']
},
{
id: 'q_math_b2_04_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_04',
textPlain: "पृथ्वी का द्रव्यमान लगभग 5.97 × 10²⁴ kg है और चंद्रमा का द्रव्यमान 7.35 × 10²² kg है। दोनों का कुल द्रव्यमान कितना है?",
options: [{ id: 'opt_1', text: '13.32 × 10²² kg' }, { id: 'opt_2', text: '6.0435 × 10²⁴ kg' }, { id: 'opt_3', text: '6.705 × 10²⁴ kg' }, { id: 'opt_4', text: '13.32 × 10²⁴ kg' }],
correctOptionIds: ['opt_2'],
explanationPlain: "7.35 × 10²² = 0.0735 × 10²⁴। कुल = (5.97 + 0.0735) × 10²⁴ = 6.0435 × 10²⁴ kg।",
difficulty: 'hard', tags: ['exponents', 'standard-form']
},
{
id: 'q_math_b2_04_004', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_04',
textPlain: "m का वह मान ज्ञात कीजिए जिसके लिए: (-3)^(m+1) × (-3)^5 = (-3)^7",
options: [{ id: 'opt_1', text: '2' }, { id: 'opt_2', text: '1' }, { id: 'opt_3', text: '-1' }, { id: 'opt_4', text: '0' }],
correctOptionIds: ['opt_2'],
explanationPlain: "घातें जोड़ने पर (m+1)+5=7 ⇒ m=1।",
difficulty: 'hard', tags: ['exponents', 'equations']
},
{
id: 'q_math_b2_04_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_01', topicId: 'top_math_01_04',
textPlain: "यदि 2^x = 4^y = 8^z और xyz = 288 है, तो (1/2x + 1/4y + 1/8z) का मान क्या होगा?",
options: [{ id: 'opt_1', text: '11/96' }, { id: 'opt_2', text: '1/4' }, { id: 'opt_3', text: '11/48' }, { id: 'opt_4', text: '1/8' }],
correctOptionIds: ['opt_1'],
explanationPlain: "x=12, y=6, z=4 पाने पर व्यंजक = 1/24 + 1/24 + 1/32 = 11/96।",
difficulty: 'challenge', tags: ['exponents', 'advanced-equations']
},
{
id: 'q_math_b2_05_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_01',
textPlain: "यदि एक मशीन 5 मिनट में 150 बोतलें भरती है, तो 12 मिनट में वह कितनी बोतलें भरेगी?",
options: [{ id: 'opt_1', text: '300' }, { id: 'opt_2', text: '360' }, { id: 'opt_3', text: '420' }, { id: 'opt_4', text: '250' }],
correctOptionIds: ['opt_2'],
explanationPlain: "1 मिनट में 30 बोतलें, इसलिए 12 मिनट में 360 बोतलें।",
difficulty: 'easy', tags: ['proportion', 'direct']
},
{
id: 'q_math_b2_05_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_01',
textPlain: "6 पाइप एक टंकी को 1 घंटे 20 मिनट में भर सकते हैं। यदि उसी प्रकार के 5 पाइपों का उपयोग किया जाए, तो टंकी भरने में कितना समय लगेगा?",
options: [{ id: 'opt_1', text: '1 घंटा 30 मिनट' }, { id: 'opt_2', text: '1 घंटा 36 मिनट' }, { id: 'opt_3', text: '1 घंटा 45 मिनट' }, { id: 'opt_4', text: '2 घंटे' }],
correctOptionIds: ['opt_2'],
explanationPlain: "80 मिनट × 6 = 5 × x ⇒ x = 96 मिनट = 1 घंटा 36 मिनट।",
difficulty: 'medium', tags: ['proportion', 'inverse']
},
{
id: 'q_math_b2_05_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_01',
textPlain: "एक नक्शे का पैमाना 1:30,000,000 दिया गया है। यदि नक्शे में दो शहरों के बीच की दूरी 4 सेमी है, तो उनके बीच की वास्तविक दूरी किलोमीटर (km) में क्या होगी?",
options: [{ id: 'opt_1', text: '120 km' }, { id: 'opt_2', text: '1200 km' }, { id: 'opt_3', text: '12000 km' }, { id: 'opt_4', text: '12 km' }],
correctOptionIds: ['opt_2'],
explanationPlain: "4 × 30,000,000 = 120,000,000 सेमी = 1200 किमी।",
difficulty: 'hard', tags: ['proportion', 'map-scale']
},
{
id: 'q_math_b2_05_004', type: 'multiple-select', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_01',
textPlain: "निम्नलिखित में से कौन-सी स्थितियाँ प्रतिलोम समानुपात (Inverse Proportion) का उदाहरण हैं? (एक से अधिक सही हो सकते हैं)",
options: [{ id: 'opt_1', text: 'खरीदी गई पुस्तकों की संख्या और उनका कुल मूल्य' }, { id: 'opt_2', text: 'किसी कार्य को पूरा करने वाले मजदूरों की संख्या और उसमें लगने वाला समय' }, { id: 'opt_3', text: 'समान दूरी तय करने के लिए वाहन की चाल (Speed) और लगा हुआ समय' }, { id: 'opt_4', text: 'एक बैंक में जमा राशि और उस पर मिलने वाला ब्याज' }],
correctOptionIds: ['opt_2', 'opt_3'],
explanationPlain: "अधिक मजदूर = कम समय और अधिक चाल = कम समय, इसलिए विकल्प 2 और 3।",
difficulty: 'hard', tags: ['proportion', 'concept-identification']
},
{
id: 'q_math_b2_05_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_01',
textPlain: "एक छात्रावास में 100 छात्रों के लिए 20 दिन का भोजन है। 5 दिन बाद, 25 छात्र और आ जाते हैं। बचा हुआ भोजन अब कितने दिन और चलेगा?",
options: [{ id: 'opt_1', text: '15 दिन' }, { id: 'opt_2', text: '12 दिन' }, { id: 'opt_3', text: '10 दिन' }, { id: 'opt_4', text: '18 दिन' }],
correctOptionIds: ['opt_2'],
explanationPlain: "5 दिन बाद 15 दिन का भोजन बचा। 100 × 15 = 125 × x ⇒ x = 12 दिन।",
difficulty: 'challenge', tags: ['proportion', 'advanced-inverse']
},
{
id: 'q_math_b2_06_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_02',
textPlain: "एक कक्षा में 50 छात्र हैं जिनमें से 60% लड़कियाँ हैं। कक्षा में लड़कों की संख्या कितनी है?",
options: [{ id: 'opt_1', text: '20' }, { id: 'opt_2', text: '30' }, { id: 'opt_3', text: '10' }, { id: 'opt_4', text: '40' }],
correctOptionIds: ['opt_1'],
explanationPlain: "लड़के 40% हैं और 50 का 40% = 20।",
difficulty: 'easy', tags: ['comparing-quantities', 'percentage']
},
{
id: 'q_math_b2_06_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_02',
textPlain: "एक सोफ़ा सेट ₹10,000 में खरीदा गया और मरम्मत पर ₹1,200 खर्च किए गए। इसके बाद इसे ₹13,440 में बेच दिया गया। लाभ का प्रतिशत क्या होगा?",
options: [{ id: 'opt_1', text: '15%' }, { id: 'opt_2', text: '20%' }, { id: 'opt_3', text: '25%' }, { id: 'opt_4', text: '10%' }],
correctOptionIds: ['opt_2'],
explanationPlain: "कुल CP ₹11200, लाभ ₹2240, अतः लाभ% = 20%।",
difficulty: 'medium', tags: ['comparing-quantities', 'profit-loss-overhead']
},
{
id: 'q_math_b2_06_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_02',
textPlain: "यदि ₹10,000 की राशि 10% वार्षिक चक्रवृद्धि ब्याज (Compound Interest) की दर से 1 वर्ष के लिए उधार दी जाती है, और ब्याज छमाही (Half-Yearly) संयोजित होता है, तो 1 वर्ष बाद कितनी राशि लौटानी होगी?",
options: [{ id: 'opt_1', text: '₹11,000' }, { id: 'opt_2', text: '₹11,025' }, { id: 'opt_3', text: '₹12,100' }, { id: 'opt_4', text: '₹10,500' }],
correctOptionIds: ['opt_2'],
explanationPlain: "दर 5% प्रति छमाही और 2 अवधियों पर A = 10000(1.05)² = ₹11025।",
difficulty: 'hard', tags: ['comparing-quantities', 'compound-interest-half-yearly']
},
];