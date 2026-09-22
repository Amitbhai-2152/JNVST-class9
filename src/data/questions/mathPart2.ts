import { Question } from '../../types';
export const mathQuestionsPart2: Question[] = [
{
id: 'q_math_b1_06_004',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_02',
topicId: 'top_math_02_02',
textPlain: "किसी वस्तु के मूल्य में पहले 20% की वृद्धि की गई और फिर 20% की कमी की गई। वस्तु के मूल्य में कुल प्रतिशत परिवर्तन क्या होगा?",
options: [
{ id: 'opt_1', text: '0% परिवर्तन' },
{ id: 'opt_2', text: '4% वृद्धि' },
{ id: 'opt_3', text: '4% कमी' },
{ id: 'opt_4', text: '2% कमी' }
],
correctOptionIds: ['opt_3'],
explanationPlain: "समान प्रतिशत x की वृद्धि और कमी होने पर हमेशा x²/100 प्रतिशत की कमी होती है। अतः 20²/100 = 400/100 = 4% की कमी।",
difficulty: 'hard',
tags: ['comparing-quantities', 'successive-percentage']
},
{
id: 'q_math_b1_06_005',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_02',
topicId: 'top_math_02_02',
textPlain: "एक निश्चित धनराशि पर 10% वार्षिक दर से 2 वर्ष के साधारण ब्याज (SI) और चक्रवृद्धि ब्याज (CI) का अंतर ₹40 है। वह धनराशि (Principal) क्या है?",
options: [
{ id: 'opt_1', text: '₹4000' },
{ id: 'opt_2', text: '₹3600' },
{ id: 'opt_3', text: '₹4200' },
{ id: 'opt_4', text: '₹5000' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "2 वर्ष के लिए CI और SI का अंतर D = P(r/100)² होता है। 40 = P × (10/100)² = P × (1/100)। अतः P = 40 × 100 = ₹4000।",
difficulty: 'challenge',
tags: ['comparing-quantities', 'ci-si-difference']
},
{
id: 'q_math_b1_07_001',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_01',
textPlain: "व्यंजक 3x²y + 5xy² - 2x²y + xy² को सरल करने पर क्या प्राप्त होगा?",
options: [
{ id: 'opt_1', text: '5x²y + 6xy²' },
{ id: 'opt_2', text: 'x²y + 6xy²' },
{ id: 'opt_3', text: 'x²y + 4xy²' },
{ id: 'opt_4', text: '7x²y' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "समान पदों (Like terms) को जोड़ने/घटाने पर: (3x²y - 2x²y) + (5xy² + xy²) = x²y + 6xy²।",
difficulty: 'easy',
tags: ['algebra', 'simplification']
},
{
id: 'q_math_b1_07_002',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_01',
textPlain: "सर्वसमिका का उपयोग करते हुए (2x + 3y)² का विस्तार (Expansion) क्या होगा?",
options: [
{ id: 'opt_1', text: '4x² + 9y²' },
{ id: 'opt_2', text: '4x² + 6xy + 9y²' },
{ id: 'opt_3', text: '4x² + 12xy + 9y²' },
{ id: 'opt_4', text: '2x² + 12xy + 3y²' }
],
correctOptionIds: ['opt_3'],
explanationPlain: "(a + b)² = a² + 2ab + b²। अतः (2x)² + 2(2x)(3y) + (3y)² = 4x² + 12xy + 9y²।",
difficulty: 'medium',
tags: ['algebra', 'identities']
},
{
id: 'q_math_b1_07_003',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_01',
textPlain: "गुणनखंडन (Factorise) करें: a² - 2ab + b² - c²",
options: [
{ id: 'opt_1', text: '(a - b - c)(a - b + c)' },
{ id: 'opt_2', text: '(a + b - c)(a + b + c)' },
{ id: 'opt_3', text: '(a - b - c)²' },
{ id: 'opt_4', text: '(a - b + c)²' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "प्रथम तीन पद सर्वसमिका (a-b)² बनाते हैं। अतः व्यंजक (a-b)² - c² हो जाता है। अब x² - y² = (x-y)(x+y) लगाने पर (a - b - c)(a - b + c) प्राप्त होता है।",
difficulty: 'hard',
tags: ['algebra', 'factorisation']
},
{
id: 'q_math_b1_07_004',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_01',
textPlain: "यदि x + (1/x) = 4 है, तो x² + (1/x²) का मान क्या होगा?",
options: [
{ id: 'opt_1', text: '16' },
{ id: 'opt_2', text: '14' },
{ id: 'opt_3', text: '18' },
{ id: 'opt_4', text: '12' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "(x + 1/x)² = x² + 1/x² + 2(x)(1/x) = x² + 1/x² + 2। 4² = x² + 1/x² + 2 ⇒ 16 = x² + 1/x² + 2 ⇒ x² + 1/x² = 14।",
difficulty: 'hard',
tags: ['algebra', 'identities-application']
},
{
id: 'q_math_b1_07_005',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_01',
textPlain: "द्विपदों का गुणा करें और x² का गुणांक (Coefficient) ज्ञात करें: (3x - 5)(2x + 7)",
options: [
{ id: 'opt_1', text: '6' },
{ id: 'opt_2', text: '11' },
{ id: 'opt_3', text: '5' },
{ id: 'opt_4', text: '21' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "गुणा करने पर: (3x)(2x) + (3x)(7) - (5)(2x) - (5)(7) = 6x² + 21x - 10x - 35 = 6x² + 11x - 35। यहाँ x² का गुणांक 6 है।",
difficulty: 'challenge',
tags: ['algebra', 'polynomial-multiplication']
},
{
id: 'q_math_b1_08_001',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_02',
textPlain: "समीकरण को हल करें: 3x - 5 = 10",
options: [
{ id: 'opt_1', text: '3' },
{ id: 'opt_2', text: '5' },
{ id: 'opt_3', text: '15' },
{ id: 'opt_4', text: '8' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "3x = 10 + 5 ⇒ 3x = 15 ⇒ x = 5।",
difficulty: 'easy',
tags: ['linear-equations', 'solving']
},
{
id: 'q_math_b1_08_002',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_02',
textPlain: "एक संख्या के तीन गुने में 11 जोड़ने पर 32 प्राप्त होता है। वह संख्या क्या है?",
options: [
{ id: 'opt_1', text: '9' },
{ id: 'opt_2', text: '7' },
{ id: 'opt_3', text: '6' },
{ id: 'opt_4', text: '8' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "समीकरण: 3x + 11 = 32 ⇒ 3x = 21 ⇒ x = 7।",
difficulty: 'medium',
tags: ['linear-equations', 'word-problem']
},
{
id: 'q_math_b1_08_003',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_02',
textPlain: "समीकरण को हल करें: (x/2) - (1/5) = (x/3) + (1/4)",
options: [
{ id: 'opt_1', text: '2.7' },
{ id: 'opt_2', text: '27/10' },
{ id: 'opt_3', text: '10/27' },
{ id: 'opt_4', text: '2.5' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "चर एक तरफ: (x/2) - (x/3) = (1/4) + (1/5)। LCM लेने पर: (3x - 2x)/6 = (5 + 4)/20 ⇒ x/6 = 9/20 ⇒ x = (9 × 6) / 20 = 54/20 = 27/10।",
difficulty: 'medium',
tags: ['linear-equations', 'fractions']
},
{
id: 'q_math_b1_08_004',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_02',
textPlain: "पिता की वर्तमान आयु पुत्र की वर्तमान आयु की तीन गुनी है। 5 वर्ष बाद, उनकी आयु का योग 70 वर्ष होगा। पुत्र की वर्तमान आयु कितनी है?",
options: [
{ id: 'opt_1', text: '10 वर्ष' },
{ id: 'opt_2', text: '15 वर्ष' },
{ id: 'opt_3', text: '20 वर्ष' },
{ id: 'opt_4', text: '12 वर्ष' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "माना पुत्र की आयु x है, तो पिता की 3x होगी। 5 वर्ष बाद: (x + 5) + (3x + 5) = 70 ⇒ 4x + 10 = 70 ⇒ 4x = 60 ⇒ x = 15 वर्ष।",
difficulty: 'hard',
tags: ['linear-equations', 'age-problem']
},
{
id: 'q_math_b1_08_005',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_03',
topicId: 'top_math_03_02',
textPlain: "दो अंकों वाली एक संख्या के अंकों का योग 9 है। यदि इस संख्या के अंकों के स्थान बदल दिए जाएँ, तो प्राप्त नई संख्या मूल संख्या से 27 अधिक होती है। मूल संख्या क्या है?",
options: [
{ id: 'opt_1', text: '63' },
{ id: 'opt_2', text: '36' },
{ id: 'opt_3', text: '45' },
{ id: 'opt_4', text: '54' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "माना इकाई का अंक x और दहाई का अंक (9-x) है। मूल संख्या = 10(9-x) + x = 90 - 9x। नई संख्या = 10x + (9-x) = 9x + 9। प्रश्नानुसार: 9x + 9 = (90 - 9x) + 27 ⇒ 18x = 108 ⇒ x = 6। अतः इकाई=6, दहाई=3, संख्या=36।",
difficulty: 'challenge',
tags: ['linear-equations', 'digit-problem']
},
{
id: 'q_math_b1_09_001',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_01',
textPlain: "एक बहुभुज (Polygon) के सभी बाह्य कोणों (Exterior angles) का योगफल हमेशा कितना होता है?",
options: [
{ id: 'opt_1', text: '180°' },
{ id: 'opt_2', text: '360°' },
{ id: 'opt_3', text: '540°' },
{ id: 'opt_4', text: 'बहुभुज की भुजाओं पर निर्भर करता है' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "किसी भी उत्तल बहुभुज (Convex Polygon) के सभी बाह्य कोणों का योग हमेशा 360° होता है, चाहे उसमें कितनी भी भुजाएँ हों।",
difficulty: 'easy',
tags: ['quadrilaterals', 'angles']
},
{
id: 'q_math_b1_09_002',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_01',
textPlain: "एक समांतर चतुर्भुज (Parallelogram) के दो आसन्न कोणों (Adjacent angles) का अनुपात 4:5 है। छोटे कोण की माप क्या होगी?",
options: [
{ id: 'opt_1', text: '80°' },
{ id: 'opt_2', text: '100°' },
{ id: 'opt_3', text: '40°' },
{ id: 'opt_4', text: '60°' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "समांतर चतुर्भुज के आसन्न कोण संपूरक (Supplementary) होते हैं। 4x + 5x = 180° ⇒ 9x = 180° ⇒ x = 20°। छोटा कोण = 4 × 20° = 80°।",
difficulty: 'medium',
tags: ['quadrilaterals', 'parallelogram']
},
{
id: 'q_math_b1_09_003',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_01',
textPlain: "एक समचतुर्भुज (Rhombus) के विकर्ण (Diagonals) 16 सेमी और 12 सेमी लंबे हैं। इस समचतुर्भुज की एक भुजा की लंबाई क्या होगी?",
options: [
{ id: 'opt_1', text: '10 सेमी' },
{ id: 'opt_2', text: '14 सेमी' },
{ id: 'opt_3', text: '8 सेमी' },
{ id: 'opt_4', text: '20 सेमी' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "समचतुर्भुज के विकर्ण एक-दूसरे को समकोण पर समद्विभाजित करते हैं। इससे 8 सेमी और 6 सेमी भुजाओं वाला एक समकोण त्रिभुज बनता है। कर्ण (भुजा) = √(8² + 6²) = √(64+36) = √100 = 10 सेमी।",
difficulty: 'hard',
tags: ['quadrilaterals', 'rhombus']
},
{
id: 'q_math_b1_09_004',
type: 'multiple-select',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_01',
textPlain: "निम्नलिखित में से कौन-सी आकृतियों के विकर्ण (Diagonals) हमेशा लंबाई में बराबर होते हैं? (एक से अधिक सही हो सकते हैं)",
options: [
{ id: 'opt_1', text: 'समांतर चतुर्भुज (Parallelogram)' },
{ id: 'opt_2', text: 'आयत (Rectangle)' },
{ id: 'opt_3', text: 'समचतुर्भुज (Rhombus)' },
{ id: 'opt_4', text: 'वर्ग (Square)' }
],
correctOptionIds: ['opt_2', 'opt_4'],
explanationPlain: "केवल आयत और वर्ग में विकर्णों की लंबाई हमेशा बराबर होती है। सामान्य समांतर चतुर्भुज और समचतुर्भुज में विकर्ण असमान हो सकते हैं।",
difficulty: 'hard',
tags: ['quadrilaterals', 'properties']
},
{
id: 'q_math_b1_09_005',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_01',
textPlain: "एक समबहुभुज (Regular Polygon) का प्रत्येक अंतःकोण (Interior angle) उसके बाह्य कोण का 3 गुना है। इस बहुभुज में कितनी भुजाएँ हैं?",
options: [
{ id: 'opt_1', text: '6' },
{ id: 'opt_2', text: '8' },
{ id: 'opt_3', text: '10' },
{ id: 'opt_4', text: '12' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "अंतःकोण + बाह्य कोण = 180°। यदि बाह्य कोण x है, तो अंतःकोण 3x है। x + 3x = 180° ⇒ 4x = 180° ⇒ x = 45°। भुजाओं की संख्या n = 360° / बाह्य कोण = 360/45 = 8।",
difficulty: 'challenge',
tags: ['quadrilaterals', 'polygon-angles']
},
{
id: 'q_math_b1_10_001',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_02',
textPlain: "एक समलंब चतुर्भुज (Trapezium) की समांतर भुजाएँ क्रमशः 10 सेमी और 14 सेमी हैं, तथा उनके बीच की लंबवत दूरी (ऊंचाई) 5 सेमी है। इसका क्षेत्रफल क्या होगा?",
options: [
{ id: 'opt_1', text: '60 वर्ग सेमी' },
{ id: 'opt_2', text: '120 वर्ग सेमी' },
{ id: 'opt_3', text: '50 वर्ग सेमी' },
{ id: 'opt_4', text: '70 वर्ग सेमी' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "समलंब का क्षेत्रफल = 1/2 × (समांतर भुजाओं का योग) × ऊँचाई = 1/2 × (10 + 14) × 5 = 1/2 × 24 × 5 = 60 वर्ग सेमी।",
difficulty: 'easy',
tags: ['mensuration', 'trapezium']
},
{
id: 'q_math_b1_10_002',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_02',
textPlain: "एक बेलन (Cylinder) की त्रिज्या 7 सेमी और ऊँचाई 10 सेमी है। इसका वक्र पृष्ठीय क्षेत्रफल (Curved Surface Area) ज्ञात कीजिए। (π = 22/7)",
options: [
{ id: 'opt_1', text: '440 वर्ग सेमी' },
{ id: 'opt_2', text: '1540 वर्ग सेमी' },
{ id: 'opt_3', text: '748 वर्ग सेमी' },
{ id: 'opt_4', text: '220 वर्ग सेमी' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "CSA = 2πrh = 2 × (22/7) × 7 × 10 = 44 × 10 = 440 वर्ग सेमी।",
difficulty: 'medium',
tags: ['mensuration', 'cylinder']
},
{
id: 'q_math_b1_10_003',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_02',
textPlain: "एक घनाभ (Cuboid) की विमाएँ (dimensions) 60 सेमी × 54 सेमी × 30 सेमी हैं। इस घनाभ के अंदर 6 सेमी भुजा वाले कितने छोटे घन (Cubes) रखे जा सकते हैं?",
options: [
{ id: 'opt_1', text: '450' },
{ id: 'opt_2', text: '500' },
{ id: 'opt_3', text: '350' },
{ id: 'opt_4', text: '400' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "घनाभ का आयतन = 60 × 54 × 30। एक घन का आयतन = 6 × 6 × 6। घनों की संख्या = (60/6) × (54/6) × (30/6) = 10 × 9 × 5 = 450।",
difficulty: 'medium',
tags: ['mensuration', 'volume']
},
{
id: 'q_math_b1_10_004',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_02',
textPlain: "14 मीटर आंतरिक व्यास और 10 मीटर गहराई वाला एक कुआँ खोदा गया। इसमें से निकली मिट्टी को कुएँ के चारों ओर 7 मीटर चौड़े एक वृत्ताकार वलय (Ring) के रूप में समान रूप से फैलाकर एक चबूतरा बनाया गया। चबूतरे की ऊँचाई ज्ञात करें। (π = 22/7)",
options: [
{ id: 'opt_1', text: '2 मीटर' },
{ id: 'opt_2', text: '2.5 मीटर' },
{ id: 'opt_3', text: '3 मीटर' },
{ id: 'opt_4', text: '3.33 मीटर' }
],
correctOptionIds: ['opt_4'],
explanationPlain: "मिट्टी का आयतन = π × r² × h = π × 7² × 10 = 490π। चबूतरे का क्षेत्रफल = π(R² - r²) जहाँ R = 7+7 = 14, r = 7। क्षेत्रफल = π(14² - 7²) = π(196 - 49) = 147π। ऊँचाई = आयतन / क्षेत्रफल = 490π / 147π = 490/147 = 10/3 = 3.33 मीटर।",
difficulty: 'hard',
tags: ['mensuration', 'volume-transformation']
},
{
id: 'q_math_b1_10_005',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_04',
topicId: 'top_math_04_02',
textPlain: "एक कमरे की लंबाई, चौड़ाई और ऊँचाई का अनुपात 5:4:3 है। यदि इसके फर्श का क्षेत्रफल 500 वर्ग मीटर है, तो कमरे की चारों दीवारों और छत को पेंट करने का क्षेत्रफल क्या होगा?",
options: [
{ id: 'opt_1', text: '1850 वर्ग मीटर' },
{ id: 'opt_2', text: '1400 वर्ग मीटर' },
{ id: 'opt_3', text: '1500 वर्ग मीटर' },
{ id: 'opt_4', text: '1800 वर्ग मीटर' }
],
correctOptionIds: ['opt_1'],
explanationPlain: "l=5x, b=4x, h=3x। फर्श = l×b = 20x² = 500 ⇒ x² = 25 ⇒ x = 5। अतः l=25, b=20, h=15। पेंट का क्षेत्रफल = चारों दीवारें + छत = 2h(l+b) + lb = 2(15)(25+20) + 500 = 30(45) + 500 = 1350 + 500 = 1850 वर्ग मीटर।",
difficulty: 'challenge',
tags: ['mensuration', 'surface-area-ratio']
},
{
id: 'q_math_b1_11_001',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_05',
topicId: 'top_math_05_01',
textPlain: "एक पाई चार्ट (Pie Chart) में किसी वृत्त का संपूर्ण केंद्रीय कोण (Total central angle) कितना होता है?",
options: [
{ id: 'opt_1', text: '90°' },
{ id: 'opt_2', text: '180°' },
{ id: 'opt_3', text: '360°' },
{ id: 'opt_4', text: '100°' }
],
correctOptionIds: ['opt_3'],
explanationPlain: "पाई चार्ट एक वृत्त पर आधारित होता है, और वृत्त के केंद्र पर बनने वाला संपूर्ण कोण 360° होता है।",
difficulty: 'easy',
tags: ['data-handling', 'pie-chart-basics']
},
{
id: 'q_math_b1_11_002',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_05',
topicId: 'top_math_05_01',
textPlain: "एक पासा (Dice) फेंका जाता है। एक अभाज्य संख्या (Prime number) आने की प्रायिकता (Probability) क्या होगी?",
options: [
{ id: 'opt_1', text: '1/3' },
{ id: 'opt_2', text: '1/2' },
{ id: 'opt_3', text: '1/6' },
{ id: 'opt_4', text: '2/3' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "पासे पर कुल परिणाम = {1, 2, 3, 4, 5, 6} (कुल 6)। अभाज्य संख्याएँ = {2, 3, 5} (कुल 3)। प्रायिकता = 3/6 = 1/2।",
difficulty: 'easy',
tags: ['data-handling', 'probability']
},
{
id: 'q_math_b1_11_003',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_05',
topicId: 'top_math_05_01',
textPlain: "वर्ग अंतराल (Class Interval) 20-30 की उच्च सीमा (Upper limit) और वर्ग माप (Class size) क्रमशः क्या हैं?",
options: [
{ id: 'opt_1', text: '20 और 10' },
{ id: 'opt_2', text: '30 और 10' },
{ id: 'opt_3', text: '30 और 50' },
{ id: 'opt_4', text: '10 और 30' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "20-30 अंतराल में 30 उच्च सीमा है। वर्ग माप (Upper - Lower limit) = 30 - 20 = 10 है।",
difficulty: 'medium',
tags: ['data-handling', 'statistics-basics']
},
{
id: 'q_math_b1_11_004',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_05',
topicId: 'top_math_05_01',
textPlain: "52 ताश के पत्तों की एक गड्डी में से यादृच्छिक रूप (randomly) से एक पत्ता निकाला जाता है। इसकी क्या प्रायिकता है कि वह पत्ता काले रंग का बादशाह (Black King) होगा?",
options: [
{ id: 'opt_1', text: '1/13' },
{ id: 'opt_2', text: '1/52' },
{ id: 'opt_3', text: '1/26' },
{ id: 'opt_4', text: '2/13' }
],
correctOptionIds: ['opt_3'],
explanationPlain: "गड्डी में कुल पत्ते 52 होते हैं। काले रंग (हुकुम और चिड़ी) के 2 बादशाह होते हैं। प्रायिकता = अनुकूल परिणाम / कुल परिणाम = 2/52 = 1/26।",
difficulty: 'hard',
tags: ['data-handling', 'probability-cards']
},
{
id: 'q_math_b1_11_005',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_05',
topicId: 'top_math_05_01',
textPlain: "किसी स्कूल के 720 छात्रों द्वारा पसंद किए जाने वाले खेलों का पाई चार्ट बनाया गया। यदि क्रिकेट को दर्शाने वाले त्रिज्यखंड (Sector) का केंद्रीय कोण 140° है, तो क्रिकेट पसंद करने वाले छात्रों की संख्या क्या है?",
options: [
{ id: 'opt_1', text: '140' },
{ id: 'opt_2', text: '280' },
{ id: 'opt_3', text: '320' },
{ id: 'opt_4', text: '240' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "360° कोण कुल 720 छात्रों को निरूपित करता है। इसलिए 1° = 720/360 = 2 छात्र। अतः 140° = 140 × 2 = 280 छात्र।",
difficulty: 'challenge',
tags: ['data-handling', 'pie-chart-calc']
},
{
id: 'q_math_b2_01_001',
type: 'mcq',
subjectId: 'sub_math',
chapterId: 'chap_math_01',
topicId: 'top_math_01_01',
textPlain: "निम्नलिखित में से कौन-सी परिमेय संख्या अपने ही गुणात्मक प्रतिलोम (Multiplicative Inverse) के बराबर है?",
options: [
{ id: 'opt_1', text: '0' },
{ id: 'opt_2', text: '-1' },
{ id: 'opt_3', text: '2' },
{ id: 'opt_4', text: '-2' }
],
correctOptionIds: ['opt_2'],
explanationPlain: "-1 अपने गुणात्मक प्रतिलोम के बराबर है क्योंकि (-1) × (-1) = 1। दिए गए विकल्पों में 1 शामिल नहीं है, इसलिए यहाँ सही विकल्प -1 है।",
difficulty: 'easy',
tags: ['rational-numbers', 'inverses']
},
];