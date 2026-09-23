import { Question } from '../../types';
export const mathQuestionsPart4: Question[] = [
{
id: 'q_math_b2_06_004', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_02',
textPlain: "एक दुकानदार अपनी वस्तुओं पर क्रय मूल्य से 20% अधिक मूल्य अंकित करता है। फिर वह ग्राहकों को 10% की छूट देता है। उसका वास्तविक लाभ प्रतिशत क्या है?",
options: [{ id: 'opt_1', text: '10%' }, { id: 'opt_2', text: '8%' }, { id: 'opt_3', text: '12%' }, { id: 'opt_4', text: '0%' }],
correctOptionIds: ['opt_2'],
explanationPlain: "माना CP = 100। MP = 120। 10% छूट के बाद SP = 108। लाभ = 8, अतः लाभ% = 8%।",
difficulty: 'hard', tags: ['comparing-quantities', 'mark-up-discount']
},
{
id: 'q_math_b2_06_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_02', topicId: 'top_math_02_02',
textPlain: "एक मशीन का मूल्य प्रतिवर्ष 10% की दर से घटता (Depreciate) है। यदि वर्तमान में मशीन का मूल्य ₹81,000 है, तो 2 वर्ष पूर्व इसका मूल्य क्या था?",
options: [{ id: 'opt_1', text: '₹1,00,000' }, { id: 'opt_2', text: '₹90,000' }, { id: 'opt_3', text: '₹95,000' }, { id: 'opt_4', text: '₹1,20,000' }],
correctOptionIds: ['opt_1'],
explanationPlain: "81000 = P(0.9)² = 0.81P, इसलिए P = ₹1,00,000।",
difficulty: 'challenge', tags: ['comparing-quantities', 'depreciation']
},
{
id: 'q_math_b2_07_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_01',
textPlain: "यदि a एकपदीय व्यंजक है और (b+c) एक द्विपदीय व्यंजक है, तो a(b+c) का विस्तारित रूप क्या होगा?",
options: [{ id: 'opt_1', text: 'ab + ac' }, { id: 'opt_2', text: 'a + b + c' }, { id: 'opt_3', text: 'ab + bc' }, { id: 'opt_4', text: 'a² + bc' }],
correctOptionIds: ['opt_1'],
explanationPlain: "वितरण गुणधर्म से a(b+c)=ab+ac। इसलिए सही उत्तर ab+ac है।",
difficulty: 'easy', tags: ['algebra', 'basics']
},
{
id: 'q_math_b2_07_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_01',
textPlain: "सर्वसमिका का उपयोग करके मान ज्ञात करें: 102 × 103",
options: [{ id: 'opt_1', text: '10506' }, { id: 'opt_2', text: '10605' }, { id: 'opt_3', text: '10505' }, { id: 'opt_4', text: '10006' }],
correctOptionIds: ['opt_1'],
explanationPlain: "(100+2)(100+3)=10000+500+6=10506।",
difficulty: 'medium', tags: ['algebra', 'identities-numerical']
},
{
id: 'q_math_b2_07_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_01',
textPlain: "गुणनखंडन (Factorise) करें: m² - 256",
options: [{ id: 'opt_1', text: '(m - 16)²' }, { id: 'opt_2', text: '(m - 16)(m + 16)' }, { id: 'opt_3', text: '(m - 14)(m + 14)' }, { id: 'opt_4', text: '(m + 16)²' }],
correctOptionIds: ['opt_2'],
explanationPlain: "m²-16²=(m-16)(m+16)।",
difficulty: 'medium', tags: ['algebra', 'factorisation']
},
{
id: 'q_math_b2_07_004', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_01',
textPlain: "मध्य पद को विभक्त करके गुणनखंड (Factorise) करें: y² - 7y + 12",
options: [{ id: 'opt_1', text: '(y - 4)(y - 3)' }, { id: 'opt_2', text: '(y + 4)(y + 3)' }, { id: 'opt_3', text: '(y - 6)(y - 2)' }, { id: 'opt_4', text: '(y - 12)(y + 1)' }],
correctOptionIds: ['opt_1'],
explanationPlain: "-4 और -3 का योग -7 तथा गुणनफल 12 है; इसलिए (y-4)(y-3)।",
difficulty: 'hard', tags: ['algebra', 'splitting-middle-term']
},
{
id: 'q_math_b2_07_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_01',
textPlain: "विभाजन (Division) करें: (44x⁴ - 11x²) ÷ 11x²",
options: [{ id: 'opt_1', text: '4x² - 1' }, { id: 'opt_2', text: '4x² + 1' }, { id: 'opt_3', text: '4x²' }, { id: 'opt_4', text: 'x² - 4' }],
correctOptionIds: ['opt_1'],
explanationPlain: "11x²(4x²-1) को 11x² से भाग देने पर 4x²-1 मिलता है।",
difficulty: 'challenge', tags: ['algebra', 'polynomial-division']
},
{
id: 'q_math_b2_08_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_02',
textPlain: "एक चर वाले रैखिक समीकरण (Linear Equation in one variable) की घात (Degree) हमेशा क्या होती है?",
options: [{ id: 'opt_1', text: '0' }, { id: 'opt_2', text: '1' }, { id: 'opt_3', text: '2' }, { id: 'opt_4', text: 'परिभाषित नहीं' }],
correctOptionIds: ['opt_2'],
explanationPlain: "रैखिक समीकरण में चर की अधिकतम घात 1 होती है।",
difficulty: 'easy', tags: ['linear-equations', 'basics']
},
{
id: 'q_math_b2_08_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_02',
textPlain: "समीकरण हल करें: 8x + 4 = 3(x - 1) + 7",
options: [{ id: 'opt_1', text: '1' }, { id: 'opt_2', text: '-1' }, { id: 'opt_3', text: '0' }, { id: 'opt_4', text: '2' }],
correctOptionIds: ['opt_3'],
explanationPlain: "8x+4=3x+4 ⇒ 5x=0 ⇒ x=0।",
difficulty: 'medium', tags: ['linear-equations', 'solving']
},
{
id: 'q_math_b2_08_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_02',
textPlain: "एक आयत का परिमाप 13 सेमी है और उसकी चौड़ाई 2¾ सेमी है। इसकी लंबाई क्या होगी?",
options: [{ id: 'opt_1', text: '3¾ सेमी' }, { id: 'opt_2', text: '4¼ सेमी' }, { id: 'opt_3', text: '4¾ सेमी' }, { id: 'opt_4', text: '3½ सेमी' }],
correctOptionIds: ['opt_1'],
explanationPlain: "l=15/4=3¾ सेमी।",
difficulty: 'hard', tags: ['linear-equations', 'geometry-application']
},
{
id: 'q_math_b2_08_004', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_02',
textPlain: "अरुण और वरुण की वर्तमान आयु का अनुपात 4:5 है। 8 वर्ष बाद उनकी आयु का अनुपात 5:6 हो जाएगा। वरुण की वर्तमान आयु क्या है?",
options: [{ id: 'opt_1', text: '32 वर्ष' }, { id: 'opt_2', text: '40 वर्ष' }, { id: 'opt_3', text: '45 वर्ष' }, { id: 'opt_4', text: '35 वर्ष' }],
correctOptionIds: ['opt_2'],
explanationPlain: "6(4x+8)=5(5x+8) से x=8। वरुण=5x=40 वर्ष।",
difficulty: 'hard', tags: ['linear-equations', 'ratio-age']
},
{
id: 'q_math_b2_08_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_03', topicId: 'top_math_03_02',
textPlain: "एक परिमेय संख्या का हर (Denominator) उसके अंश (Numerator) से 8 अधिक है। यदि अंश में 17 जोड़ दिया जाए और हर में से 1 घटा दिया जाए, तो संख्या 3/2 बन जाती है। वह परिमेय संख्या क्या है?",
options: [{ id: 'opt_1', text: '13/21' }, { id: 'opt_2', text: '7/15' }, { id: 'opt_3', text: '11/19' }, { id: 'opt_4', text: '9/17' }],
correctOptionIds: ['opt_1'],
explanationPlain: "(x+17)/(x+7)=3/2 से x=13 और हर 21। संख्या 13/21।",
difficulty: 'challenge', tags: ['linear-equations', 'fraction-word-problem']
},
{
id: 'q_math_b2_09_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_01',
textPlain: "एक समबहुभुज (Regular Polygon) का प्रत्येक बाह्य कोण 60° है। इस बहुभुज की भुजाओं की संख्या क्या है?",
options: [{ id: 'opt_1', text: '5' }, { id: 'opt_2', text: '6' }, { id: 'opt_3', text: '8' }, { id: 'opt_4', text: '12' }],
correctOptionIds: ['opt_2'],
explanationPlain: "n=360/60=6।",
difficulty: 'easy', tags: ['quadrilaterals', 'polygon']
},
{
id: 'q_math_b2_09_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_01',
textPlain: "एक समांतर चतुर्भुज के दो सम्मुख कोण (Opposite angles) (3x - 2)° और (50 - x)° हैं। x का मान क्या होगा?",
options: [{ id: 'opt_1', text: '10' }, { id: 'opt_2', text: '12' }, { id: 'opt_3', text: '13' }, { id: 'opt_4', text: '15' }],
correctOptionIds: ['opt_3'],
explanationPlain: "3x-2=50-x ⇒ x=13।",
difficulty: 'medium', tags: ['quadrilaterals', 'parallelogram-angles']
},
{
id: 'q_math_b2_09_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_01',
textPlain: "वह चतुर्भुज जिसकी सभी भुजाएँ बराबर हों, लेकिन विकर्ण असमान (unequal) हों, क्या कहलाता है?",
options: [{ id: 'opt_1', text: 'वर्ग (Square)' }, { id: 'opt_2', text: 'समचतुर्भुज (Rhombus)' }, { id: 'opt_3', text: 'आयत (Rectangle)' }, { id: 'opt_4', text: 'समलंब (Trapezium)' }],
correctOptionIds: ['opt_2'],
explanationPlain: "यह समचतुर्भुज है।",
difficulty: 'medium', tags: ['quadrilaterals', 'properties']
},
{
id: 'q_math_b2_09_004', type: 'true-false', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_01',
textPlain: "सत्य या असत्य: सभी आयत वर्ग होते हैं।",
options: [{ id: 'opt_true', text: 'सत्य' }, { id: 'opt_false', text: 'असत्य' }],
correctOptionIds: ['opt_false'],
explanationPlain: "असत्य। सभी वर्ग आयत होते हैं, लेकिन सभी आयत वर्ग नहीं होते।",
difficulty: 'hard', tags: ['quadrilaterals', 'logic']
},
{
id: 'q_math_b2_09_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_01',
textPlain: "एक चतुर्भुज के कोण 3:4:5:6 के अनुपात में हैं। इस चतुर्भुज के सबसे बड़े और सबसे छोटे कोण का अंतर कितना होगा?",
options: [{ id: 'opt_1', text: '30°' }, { id: 'opt_2', text: '60°' }, { id: 'opt_3', text: '40°' }, { id: 'opt_4', text: '80°' }],
correctOptionIds: ['opt_2'],
explanationPlain: "18x=360°, x=20°। अंतर = 120°-60°=60°।",
difficulty: 'challenge', tags: ['quadrilaterals', 'angles-ratio']
},
{
id: 'q_math_b2_10_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_02',
textPlain: "एक समचतुर्भुज (Rhombus) का क्षेत्रफल 240 वर्ग सेमी है। यदि इसका एक विकर्ण 16 सेमी है, तो दूसरा विकर्ण ज्ञात कीजिए।",
options: [{ id: 'opt_1', text: '30 सेमी' }, { id: 'opt_2', text: '15 सेमी' }, { id: 'opt_3', text: '20 सेमी' }, { id: 'opt_4', text: '40 सेमी' }],
correctOptionIds: ['opt_1'],
explanationPlain: "240=1/2×16×d₂, इसलिए d₂=30 सेमी।",
difficulty: 'easy', tags: ['mensuration', 'rhombus-area']
},
{
id: 'q_math_b2_10_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_02',
textPlain: "एक बेलन (Cylinder) का आयतन 3080 घन सेमी है। यदि इसके आधार की त्रिज्या 7 सेमी है, तो बेलन की ऊँचाई क्या होगी? (π = 22/7)",
options: [{ id: 'opt_1', text: '10 सेमी' }, { id: 'opt_2', text: '15 सेमी' }, { id: 'opt_3', text: '20 सेमी' }, { id: 'opt_4', text: '25 सेमी' }],
correctOptionIds: ['opt_3'],
explanationPlain: "3080=(22/7)×7²×h=154h, इसलिए h=20 सेमी।",
difficulty: 'medium', tags: ['mensuration', 'cylinder-volume']
},
{
id: 'q_math_b2_10_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_02',
textPlain: "11 सेमी × 4 सेमी वाले एक आयताकार कागज़ को बिना मोड़े (overlap) लंबाई के अनुदिश लपेटकर 4 सेमी ऊँचाई का एक बेलन बनाया गया है। इस बेलन का आयतन क्या होगा? (π = 22/7)",
options: [{ id: 'opt_1', text: '38.5 घन सेमी' }, { id: 'opt_2', text: '44 घन सेमी' }, { id: 'opt_3', text: '154 घन सेमी' }, { id: 'opt_4', text: '77 घन सेमी' }],
correctOptionIds: ['opt_1'],
explanationPlain: "2πr=11 से r=7/4 सेमी। V=πr²h=38.5 घन सेमी।",
difficulty: 'medium', tags: ['mensuration', 'paper-folding']
},
{
id: 'q_math_b2_10_004', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_02',
textPlain: "एक घन (Cube) का पृष्ठीय क्षेत्रफल (Surface Area) 600 वर्ग मीटर है। इस घन का आयतन ज्ञात कीजिए।",
options: [{ id: 'opt_1', text: '1000 घन मीटर' }, { id: 'opt_2', text: '100 घन मीटर' }, { id: 'opt_3', text: '6000 घन मीटर' }, { id: 'opt_4', text: '1200 घन मीटर' }],
correctOptionIds: ['opt_1'],
explanationPlain: "6a²=600 ⇒ a=10 और V=1000 घन मीटर।",
difficulty: 'hard', tags: ['mensuration', 'cube']
},
{
id: 'q_math_b2_10_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_04', topicId: 'top_math_04_02',
textPlain: "एक घनाभ के आकार के कमरे का आंतरिक माप 12m × 8m × 4m है। यदि सफेदी करने की लागत ₹5 प्रति वर्ग मीटर है, तो कमरे की चारों दीवारों को सफेदी कराने का कुल खर्च क्या होगा? (छत और फर्श को छोड़कर)",
options: [{ id: 'opt_1', text: '₹600' }, { id: 'opt_2', text: '₹800' }, { id: 'opt_3', text: '₹1200' }, { id: 'opt_4', text: '₹1600' }],
correctOptionIds: ['opt_2'],
explanationPlain: "चारों दीवारें =2×4×(12+8)=160 m²। खर्च=160×5=₹800।",
difficulty: 'challenge', tags: ['mensuration', 'cost-calculation']
},
{
id: 'q_math_b2_11_001', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_05', topicId: 'top_math_05_01',
textPlain: "एक सिक्के को उछाले जाने पर 'चित' (Head) आने की प्रायिकता क्या है?",
options: [{ id: 'opt_1', text: '1' }, { id: 'opt_2', text: '1/2' }, { id: 'opt_3', text: '0' }, { id: 'opt_4', text: '1/4' }],
correctOptionIds: ['opt_2'],
explanationPlain: "दो समान संभावित परिणामों में एक Head है, इसलिए प्रायिकता 1/2।",
difficulty: 'easy', tags: ['data-handling', 'probability-coins']
},
{
id: 'q_math_b2_11_002', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_05', topicId: 'top_math_05_01',
textPlain: "यदि किसी परिवार के मासिक खर्च (कुल ₹36,000) को पाई चार्ट द्वारा दर्शाया गया है, और भोजन पर खर्च का केंद्रीय कोण 120° है, तो भोजन पर कितना खर्च होता है?",
options: [{ id: 'opt_1', text: '₹12,000' }, { id: 'opt_2', text: '₹10,000' }, { id: 'opt_3', text: '₹15,000' }, { id: 'opt_4', text: '₹14,000' }],
correctOptionIds: ['opt_1'],
explanationPlain: "(120/360)×36000=₹12000।",
difficulty: 'medium', tags: ['data-handling', 'pie-chart-calc']
},
{
id: 'q_math_b2_11_003', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_05', topicId: 'top_math_05_01',
textPlain: "एक थैले में 4 लाल, 5 हरी और 3 नीली गेंदें हैं। बिना देखे एक गेंद निकालने पर, उसके 'हरे रंग का न होने' की प्रायिकता क्या होगी?",
options: [{ id: 'opt_1', text: '5/12' }, { id: 'opt_2', text: '7/12' }, { id: 'opt_3', text: '1/3' }, { id: 'opt_4', text: '3/12' }],
correctOptionIds: ['opt_2'],
explanationPlain: "कुल 12 गेंदें, हरी नहीं = 7; प्रायिकता 7/12।",
difficulty: 'hard', tags: ['data-handling', 'probability-balls']
},
{
id: 'q_math_b2_11_004', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_05', topicId: 'top_math_05_01',
textPlain: "वर्ग अंतराल (Class Interval) 10-20, 20-30 आदि में, संख्या 20 को किस अंतराल में गिना जाएगा?",
options: [{ id: 'opt_1', text: '10-20' }, { id: 'opt_2', text: '20-30' }, { id: 'opt_3', text: 'दोनों में' }, { id: 'opt_4', text: 'किसी में नहीं' }],
correctOptionIds: ['opt_2'],
explanationPlain: "निरंतर वर्ग अंतराल में उच्च सीमा अगले वर्ग की निम्न सीमा होती है, इसलिए 20-30 में।",
difficulty: 'hard', tags: ['data-handling', 'class-intervals']
},
{
id: 'q_math_b2_11_005', type: 'mcq', subjectId: 'sub_math', chapterId: 'chap_math_05', topicId: 'top_math_05_01',
textPlain: "दो पासों (Dice) को एक साथ उछाला जाता है। दोनों पासों पर आने वाली संख्याओं का योग (Sum) 8 होने की प्रायिकता क्या है?",
options: [{ id: 'opt_1', text: '5/36' }, { id: 'opt_2', text: '1/6' }, { id: 'opt_3', text: '4/36' }, { id: 'opt_4', text: '1/12' }],
correctOptionIds: ['opt_1'],
explanationPlain: "योग 8 के 5 अनुकूल परिणाम हैं और कुल 36, इसलिए प्रायिकता 5/36।",
difficulty: 'challenge', tags: ['data-handling', 'probability-two-dice']
}
];