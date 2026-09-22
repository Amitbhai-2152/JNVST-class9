import type { Question } from '../../types';

export const scienceQuestionsPart02: Question[] = [
{
    id: 'q_sci_b1_04_001',
    type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_14', topicId: 'top_sci_01_04',
    textPlain: "साधारणतः आसुत जल (Distilled water) विद्युत का सुचालक (Good conductor) नहीं होता। इसे सुचालक बनाने के लिए इसमें क्या मिलाया जाना चाहिए?",
    options: [{ id: 'opt_1', text: 'थोड़ा अम्ल, क्षार या लवण (Acid, Base, or Salt)' }, { id: 'opt_2', text: 'चीनी (Sugar)' }, { id: 'opt_3', text: 'तेल (Oil)' }, { id: 'opt_4', text: 'शुद्ध ऑक्सीजन' }],
    correctOptionIds: ['opt_1'], explanationPlain: "आसुत जल में लवण/आयन नहीं होते, इसलिए यह हीन चालक है। इसमें थोड़ा सा अम्ल, क्षार या नमक मिलाने से आयन बन जाते हैं और यह सुचालक हो जाता है। चीनी या तेल आयन नहीं बनाते।", difficulty: 'easy', tags: ['chemical-effects','conduction']
  },
{
    id: 'q_sci_b1_04_002', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_14', topicId: 'top_sci_01_04',
    textPlain: "विद्युत लेपन (Electroplating) प्रक्रिया का उपयोग किस लिए किया जाता है?",
    options: [{ id: 'opt_1', text: 'केवल धातु को भारी बनाने के लिए' }, { id: 'opt_2', text: 'लोहे को जंग से बचाने और वस्तुओं को चमकदार बनाने के लिए' }, { id: 'opt_3', text: 'प्लास्टिक को पिघलाने के लिए' }, { id: 'opt_4', text: 'पानी को शुद्ध करने के लिए' }],
    correctOptionIds: ['opt_2'], explanationPlain: "विद्युत लेपन द्वारा किसी धातु पर दूसरी धातु (जैसे क्रोमियम या जिंक) की परत चढ़ाई जाती है, जिससे वह जंग से सुरक्षित रहता है और आकर्षक दिखता है।", difficulty: 'medium', tags: ['chemical-effects','electroplating']
  },
{
    id: 'q_sci_b1_04_003', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_14', topicId: 'top_sci_01_04',
    textPlain: "जब किसी चालक विलयन (Conducting solution) से विद्युत धारा प्रवाहित की जाती है, तो इलेक्ट्रोडों पर गैस के बुलबुले बनते हैं। यह किस प्रभाव का उदाहरण है?",
    options: [{ id: 'opt_1', text: 'विद्युत धारा का तापीय प्रभाव (Heating effect)' }, { id: 'opt_2', text: 'विद्युत धारा का चुम्बकीय प्रभाव (Magnetic effect)' }, { id: 'opt_3', text: 'विद्युत धारा का रासायनिक प्रभाव (Chemical effect)' }, { id: 'opt_4', text: 'विद्युत धारा का प्रकाशिक प्रभाव' }],
    correctOptionIds: ['opt_3'], explanationPlain: "चालक विलयन में विद्युत धारा प्रवाहित होने पर रासायनिक अभिक्रियाएँ होती हैं, जिसके परिणामस्वरूप गैस के बुलबुले बन सकते हैं या इलेक्ट्रोड पर धातु जमा हो सकती है। इसे रासायनिक प्रभाव कहते हैं।", difficulty: 'medium', tags: ['chemical-effects','basics']
  },
{
    id: 'q_sci_b1_04_004', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_14', topicId: 'top_sci_01_04',
    textPlain: "कॉपर सल्फेट (CuSO₄) के विलयन में कॉपर की प्लेटों का उपयोग करके विद्युत लेपन करते समय, कॉपर धातु किस इलेक्ट्रोड पर जमा (Deposit) होती है?",
    options: [{ id: 'opt_1', text: 'बैटरी के धन टर्मिनल (Positive terminal / Anode) से जुड़े इलेक्ट्रोड पर' }, { id: 'opt_2', text: 'बैटरी के ऋण टर्मिनल (Negative terminal / Cathode) से जुड़े इलेक्ट्रोड पर' }, { id: 'opt_3', text: 'दोनों इलेक्ट्रोडों पर समान रूप से' }, { id: 'opt_4', text: 'पात्र की तली पर' }],
    correctOptionIds: ['opt_2'], explanationPlain: "कॉपर सल्फेट विलयन में कॉपर आयन धनावेशित (Cu²⁺) होते हैं। इसलिए वे ऋण टर्मिनल (Cathode) की ओर आकर्षित होते हैं और उसी इलेक्ट्रोड पर जमा हो जाते हैं।", difficulty: 'hard', tags: ['chemical-effects','electroplating-details']
  },
{
    id: 'q_sci_b1_04_005', type: 'true-false', subjectId: 'sub_sci', chapterId: 'chap_sci_14', topicId: 'top_sci_01_04',
    textPlain: "सत्य/असत्य: एल ई डी (LED) का प्रयोग परिपथ में विद्युत धारा की उपस्थिति जाँचने के लिए इसलिए किया जाता है क्योंकि यह अत्यंत क्षीण (weak) विद्युत धारा प्रवाहित होने पर भी दीप्त (glow) हो जाता है।",
    options: [{ id: 'opt_true', text: 'सत्य' }, { id: 'opt_false', text: 'असत्य' }], correctOptionIds: ['opt_true'], explanationPlain: "सत्य। पारंपरिक बल्ब दुर्बल धारा पर फिलामेंट के पर्याप्त गर्म न होने के कारण प्रकाश नहीं देते। लेकिन LED बहुत कम धारा पर भी प्रकाश उत्पन्न करने में सक्षम होते हैं।", difficulty: 'challenge', tags: ['chemical-effects','led']
  },
{
    id: 'q_sci_b1_05_001', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_15', topicId: 'top_sci_01_05',
    textPlain: "परावर्तन के नियमों (Laws of Reflection) के अनुसार, आपतन कोण (Angle of incidence) और परावर्तन कोण (Angle of reflection) के बीच क्या संबंध होता है?",
    options: [{ id: 'opt_1', text: 'आपतन कोण हमेशा परावर्तन कोण से बड़ा होता है।' }, { id: 'opt_2', text: 'आपतन कोण और परावर्तन कोण हमेशा बराबर होते हैं।' }, { id: 'opt_3', text: 'आपतन कोण हमेशा परावर्तन कोण का आधा होता है।' }, { id: 'opt_4', text: 'दोनों कोणों का योग हमेशा 90° होता है।' }], correctOptionIds: ['opt_2'], explanationPlain: "परावर्तन का पहला नियम स्पष्ट करता है कि आपतन कोण (∠i) सदैव परावर्तन कोण (∠r) के बराबर होता है।", difficulty: 'easy', tags: ['light','reflection']
  },
{
    id: 'q_sci_b1_05_002', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_15', topicId: 'top_sci_01_05',
    textPlain: "एक स्वस्थ मानव नेत्र के लिए स्पष्ट दृष्टि की न्यूनतम दूरी (Near point) लगभग कितनी होती है?",
    options: [{ id: 'opt_1', text: '25 मिलीमीटर' }, { id: 'opt_2', text: '25 सेंटीमीटर' }, { id: 'opt_3', text: '25 मीटर' }, { id: 'opt_4', text: 'अनंत (Infinity)' }], correctOptionIds: ['opt_2'], explanationPlain: "एक सामान्य स्वस्थ नेत्र बिना किसी तनाव के वस्तुओं को स्पष्ट रूप से 25 सेंटीमीटर (cm) की दूरी से पढ़ और देख सकता है। इसे स्पष्ट दृष्टि की न्यूनतम दूरी कहते हैं।", difficulty: 'easy', tags: ['light','human-eye']
  },
{
    id: 'q_sci_b1_05_003', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_15', topicId: 'top_sci_01_05',
    textPlain: "समतल दर्पण (Plane mirror) द्वारा बनने वाले प्रतिबिंब की विशेषता क्या होती है?",
    options: [{ id: 'opt_1', text: 'प्रतिबिंब वास्तविक (Real), उल्टा और वस्तु से बड़ा होता है।' }, { id: 'opt_2', text: 'प्रतिबिंब आभासी (Virtual), सीधा, वस्तु के बराबर और पार्श्व परावर्तित (Laterally inverted) होता है।' }, { id: 'opt_3', text: 'प्रतिबिंब वास्तविक, सीधा और वस्तु से छोटा होता है।' }, { id: 'opt_4', text: 'प्रतिबिंब आभासी, उल्टा और वस्तु के बराबर होता है।' }], correctOptionIds: ['opt_2'], explanationPlain: "समतल दर्पण में प्रतिबिंब हमेशा आभासी बनता है (पर्दे पर प्राप्त नहीं किया जा सकता), सीधा होता है, आकार में वस्तु के बराबर होता है, और इसमें दायाँ भाग बायाँ तथा बायाँ भाग दायाँ दिखाई देता है (पार्श्व परावर्तन)।", difficulty: 'medium', tags: ['light','plane-mirror']
  },
{
    id: 'q_sci_b1_05_004', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_15', topicId: 'top_sci_01_05',
    textPlain: "मानव नेत्र में प्रकाश के प्रवेश की मात्रा को नियंत्रित करने का कार्य कौन करता है?",
    options: [{ id: 'opt_1', text: 'कॉर्निया (Cornea)' }, { id: 'opt_2', text: 'रेटिना (Retina)' }, { id: 'opt_3', text: 'परितारिका (Iris)' }, { id: 'opt_4', text: 'दृक् तंत्रिका (Optic nerve)' }], correctOptionIds: ['opt_3'], explanationPlain: "नेत्र का रंगीन भाग 'परितारिका' (Iris) होता है, जो पुतली (Pupil) के आकार को छोटा या बड़ा करके नेत्र में प्रवेश करने वाले प्रकाश की मात्रा को नियंत्रित करता है।", difficulty: 'hard', tags: ['light','human-eye-parts']
  },
{
    id: 'q_sci_b1_05_005', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_15', topicId: 'top_sci_01_05',
    textPlain: "यदि दो समतल दर्पण एक-दूसरे के समांतर (Parallel) रखे हों, तो उनके बीच रखी वस्तु के कितने प्रतिबिंब बनेंगे?",
    options: [{ id: 'opt_1', text: '0' }, { id: 'opt_2', text: '1' }, { id: 'opt_3', text: '2' }, { id: 'opt_4', text: 'अनंत (Infinite)' }], correctOptionIds: ['opt_4'], explanationPlain: "जब दो समतल दर्पण समांतर (0° कोण पर) रखे जाते हैं, तो प्रकाश के अनगिनत बार परावर्तित होने के कारण वस्तु के अनंत प्रतिबिंब (Infinite images) बनते हैं।", difficulty: 'challenge', tags: ['light','multiple-reflections']
  },
{
    id: 'q_sci_b1_06_001', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_16', topicId: 'top_sci_01_06',
    textPlain: "भूकंप की शक्ति के परिमाण को मापने के लिए सामान्यतः किस पैमाने (Scale) का उपयोग किया जाता है?",
    options: [{ id: 'opt_1', text: 'केल्विन पैमाना' }, { id: 'opt_2', text: 'रिक्टर पैमाना (Richter Scale)' }, { id: 'opt_3', text: 'डेसिबल पैमाना' }, { id: 'opt_4', text: 'बैरोमीटर' }], correctOptionIds: ['opt_2'], explanationPlain: "भूकंप की तीव्रता या विनाशी ऊर्जा को मापने के लिए पारंपरिक रूप से रिक्टर पैमाने का उपयोग किया जाता है (यद्यपि आधुनिक भूकंप विज्ञान में मोमेंट मैग्निट्यूड स्केल भी प्रयुक्त होता है)।", difficulty: 'easy', tags: ['natural-phenomena','earthquake']
  },
{
    id: 'q_sci_b1_06_002', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_16', topicId: 'top_sci_01_06',
    textPlain: "जब काँच की छड़ को रेशम के कपड़े से रगड़ा जाता है, तो छड़ पर कौन-सा आवेश उत्पन्न होता है?",
    options: [{ id: 'opt_1', text: 'छड़ धनावेशित (Positively charged) हो जाती है।' }, { id: 'opt_2', text: 'छड़ ऋणावेशित (Negatively charged) हो जाती है।' }, { id: 'opt_3', text: 'छड़ पर कोई आवेश नहीं आता।' }, { id: 'opt_4', text: 'छड़ चुम्बकीय हो जाती है।' }], correctOptionIds: ['opt_1'], explanationPlain: "परिपाटी के अनुसार, काँच की छड़ को रेशम से रगड़ने पर काँच से इलेक्ट्रॉन रेशम पर चले जाते हैं। अतः काँच की छड़ धनावेशित (Positive) और रेशम ऋणावेशित हो जाता है।", difficulty: 'medium', tags: ['natural-phenomena','static-electricity']
  },
{
    id: 'q_sci_b1_06_003', type: 'multiple-select', subjectId: 'sub_sci', chapterId: 'chap_sci_16', topicId: 'top_sci_01_06',
    textPlain: "तड़ित (Lightning) से सुरक्षा के लिए निम्नलिखित में से कौन-से उपाय सुरक्षित हैं? (एक से अधिक सही हो सकते हैं)",
    options: [{ id: 'opt_1', text: 'तूफान के समय खुले मैदान या ऊँचे पेड़ों के नीचे खड़ा होना।' }, { id: 'opt_2', text: 'गरज सुनते ही सुरक्षित इमारत या पक्के मकान के अंदर चले जाना।' }, { id: 'opt_3', text: 'बाहर होने पर किसी कार या बस के अंदर शीशे बंद करके बैठे रहना।' }, { id: 'opt_4', text: 'तार वाले टेलीफोन का प्रयोग करना।' }], correctOptionIds: ['opt_2','opt_3'], explanationPlain: "सुरक्षित इमारत के अंदर या बंद वाहन में रहना सुरक्षित है। खुले मैदान, ऊँचे पेड़, और तार वाले टेलीफोन बिजली गिरने (तड़ित) के समय अत्यंत खतरनाक होते हैं।", difficulty: 'hard', tags: ['natural-phenomena','lightning-safety']
  },
{
    id: 'q_sci_b1_06_004', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_16', topicId: 'top_sci_01_06',
    textPlain: "ऊँची इमारतों को तड़ित (Lightning) के प्रभाव से बचाने के लिए उपयोग किए जाने वाले 'तड़ित चालक' (Lightning Conductor) का निर्माण कैसे किया जाता है?",
    options: [{ id: 'opt_1', text: 'इमारत की छत पर प्लास्टिक का एक मोटा खंभा लगाया जाता है।' }, { id: 'opt_2', text: 'इमारत से ऊँची एक धातु की छड़ लगाई जाती है जिसका निचला सिरा गहराई में ज़मीन में दबा होता है।' }, { id: 'opt_3', text: 'इमारत को पूरी तरह काँच से ढँक दिया जाता है।' }, { id: 'opt_4', text: 'छत पर एक बड़ा चुंबक रखा जाता है।' }], correctOptionIds: ['opt_2'], explanationPlain: "तड़ित चालक एक मोटी धातु की पट्टी या छड़ होती है जो इमारत के सबसे ऊपरी हिस्से से शुरू होकर सीधे पृथ्वी के अंदर गहराई में तांबे की प्लेट से जुड़ी होती है। यह विद्युत आवेश को बिना इमारत को नुकसान पहुँचाए धरती में विसर्जित कर देती है।", difficulty: 'hard', tags: ['natural-phenomena','lightning-conductor']
  },
{
    id: 'q_sci_b1_06_005', type: 'true-false', subjectId: 'sub_sci', chapterId: 'chap_sci_16', topicId: 'top_sci_01_06',
    textPlain: "सत्य/असत्य: रिक्टर पैमाने पर 6.0 तीव्रता वाला भूकंप 4.0 तीव्रता वाले भूकंप की तुलना में केवल 2 गुना अधिक विनाशकारी ऊर्जा उत्पन्न करता है।",
    options: [{ id: 'opt_true', text: 'सत्य' }, { id: 'opt_false', text: 'असत्य' }], correctOptionIds: ['opt_false'], explanationPlain: "असत्य। रिक्टर पैमाना रैखिक (linear) नहीं बल्कि लघुगणकीय (logarithmic) होता है। पैमाने पर 2 अंक की वृद्धि का अर्थ है लगभग 1000 गुना अधिक विनाशी ऊर्जा।", difficulty: 'challenge', tags: ['natural-phenomena','earthquake-scale']
  }
];
