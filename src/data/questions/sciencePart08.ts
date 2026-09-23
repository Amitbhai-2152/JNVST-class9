import type { Question } from '../../types';

export const scienceQuestionsPart08: Question[] = [
{
    id: 'q_sci_b2_05_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_16', topicId: 'top_sci_01_05',
    textPlain: "परावर्तन के नियमों के अनुसार यदि कोई प्रकाश किरण समतल दर्पण पर 30° का आपतन कोण (Angle of incidence) बनाती है, तो परावर्तन कोण कितना होगा?",
    options: [
      { id: 'opt_1', text: '60°' },
      { id: 'opt_2', text: '90°' },
      { id: 'opt_3', text: '30°' },
      { id: 'opt_4', text: '0°' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "परावर्तन के प्रथम नियमानुसार, आपतन कोण (∠i) सदैव परावर्तन कोण (∠r) के बराबर होता है। अतः ∠r = 30°।",
    difficulty: 'easy',
    tags: ['light', 'laws-of-reflection']
  },
{
    id: 'q_sci_b2_05_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_16', topicId: 'top_sci_01_05',
    textPlain: "जब प्रकाश की समानांतर किरणें किसी खुरदरे (Rough) पृष्ठ से टकराकर विभिन्न दिशाओं में परावर्तित होती हैं, तो इसे क्या कहते हैं?",
    options: [
      { id: 'opt_1', text: 'नियमित परावर्तन (Regular reflection)' },
      { id: 'opt_2', text: 'विस्तृत/विसरित परावर्तन (Diffused reflection)' },
      { id: 'opt_3', text: 'अपवर्तन (Refraction)' },
      { id: 'opt_4', text: 'प्रकीर्णन (Scattering)' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "खुरदरे पृष्ठों से होने वाले परावर्तन को विसरित या विस्तृत (Diffused) परावर्तन कहते हैं। इसमें किरणें समानांतर नहीं रहतीं, जिसके कारण हम किसी वस्तु को विभिन्न कोणों से देख पाते हैं।",
    difficulty: 'medium',
    tags: ['light', 'types-of-reflection']
  },
{
    id: 'q_sci_b2_05_003',
    type: 'true-false',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_16', topicId: 'top_sci_01_05',
    textPlain: "सत्य/असत्य: समतल दर्पण के सामने यदि आप अपना दायाँ हाथ उठाते हैं, तो प्रतिबिंब में ऐसा प्रतीत होता है कि बायाँ हाथ उठाया गया है। इस घटना को पार्श्व परावर्तन (Lateral inversion) कहते हैं।",
    options: [
      { id: 'opt_true', text: 'सत्य' },
      { id: 'opt_false', text: 'असत्य' }
    ],
    correctOptionIds: ['opt_true'],
    explanationPlain: "सत्य। समतल दर्पण में बायाँ भाग दायाँ और दायाँ भाग बायाँ दिखाई देता है। इसे ही पार्श्व परावर्तन (Lateral inversion) कहा जाता है।",
    difficulty: 'medium',
    tags: ['light', 'lateral-inversion']
  },
{
    id: 'q_sci_b2_05_004',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_16', topicId: 'top_sci_01_05',
    textPlain: "मानव नेत्र का वह कौन-सा भाग है जो प्रकाश सुग्राही (Light-sensitive) होता है और जहाँ वस्तु का प्रतिबिंब (Image) बनता है?",
    options: [
      { id: 'opt_1', text: 'कॉर्निया (Cornea)' },
      { id: 'opt_2', text: 'रेटिना (दृष्टिपटल)' },
      { id: 'opt_3', text: 'परितारिका (Iris)' },
      { id: 'opt_4', text: 'पुतली (Pupil)' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "रेटिना (दृष्टिपटल) नेत्र के पिछले भाग में एक स्क्रीन की तरह कार्य करता है। इसमें प्रकाश सुग्राही कोशिकाएँ (शंकु और शलाकाएँ) होती हैं जो प्रतिबिंब को विद्युत संकेतों में बदलकर मस्तिष्क तक भेजती हैं।",
    difficulty: 'hard',
    tags: ['light', 'retina']
  },
{
    id: 'q_sci_b2_05_005',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_16', topicId: 'top_sci_01_05',
    textPlain: "यदि दो समतल दर्पणों को एक-दूसरे से 90° के कोण पर रखा जाए, तो उनके बीच रखी वस्तु के कुल कितने प्रतिबिंब (Images) बनेंगे?",
    options: [
      { id: 'opt_1', text: '2' },
      { id: 'opt_2', text: '3' },
      { id: 'opt_3', text: '4' },
      { id: 'opt_4', text: 'अनंत' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "प्रतिबिंबों की संख्या n = (360°/θ) - 1 होती है। θ = 90° रखने पर: n = (360/90) - 1 = 4 - 1 = 3 प्रतिबिंब।",
    difficulty: 'challenge',
    tags: ['light', 'multiple-images']
  },
{
    id: 'q_sci_b2_06_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_15', topicId: 'top_sci_01_06',
    textPlain: "तड़ित (Lightning) मुख्य रूप से क्या है?",
    options: [
      { id: 'opt_1', text: 'हवा के आपस में टकराने की आवाज़' },
      { id: 'opt_2', text: 'बादलों और पृथ्वी या बादलों के बीच विद्युत आवेश का भारी विसर्जन (Electric Discharge)' },
      { id: 'opt_3', text: 'बादलों में आग लगना' },
      { id: 'opt_4', text: 'सूर्य की किरणों का बादलों से टकराना' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "तड़ित वास्तव में बादलों में एकत्रित विपरीत आवेशों के मिलने से होने वाला विशाल विद्युत विसर्जन (Electric Discharge) है।",
    difficulty: 'easy',
    tags: ['natural-phenomena', 'lightning']
  },
{
    id: 'q_sci_b2_06_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_15', topicId: 'top_sci_01_06',
    textPlain: "सजातीय (Like) आवेश एक-दूसरे को ____ करते हैं, और विजातीय (Unlike) आवेश एक-दूसरे को ____ करते हैं।",
    options: [
      { id: 'opt_1', text: 'आकर्षित (Attract) ; प्रतिकर्षित (Repel)' },
      { id: 'opt_2', text: 'प्रतिकर्षित (Repel) ; आकर्षित (Attract)' },
      { id: 'opt_3', text: 'नष्ट (Destroy) ; सुरक्षित (Protect)' },
      { id: 'opt_4', text: 'प्रतिकर्षित ; प्रतिकर्षित' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "विद्युत आवेश का मूलभूत नियम है कि समान प्रकार के आवेश (जैसे + और +) एक-दूसरे से दूर भागते हैं (Repel), जबकि विपरीत आवेश (+ और -) एक-दूसरे को अपनी ओर खींचते हैं (Attract)।",
    difficulty: 'medium',
    tags: ['natural-phenomena', 'charges']
  },
{
    id: 'q_sci_b2_06_003',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_15', topicId: 'top_sci_01_06',
    textPlain: "पृथ्वी के भीतर वह स्थान जहाँ से भूकंप की तरंगें उत्पन्न होती हैं (गहराई में), क्या कहलाता है?",
    options: [
      { id: 'opt_1', text: 'अधिकेंद्र (Epicenter)' },
      { id: 'opt_2', text: 'भूकंप नाभि या उद्गम केंद्र (Focus / Hypocenter)' },
      { id: 'opt_3', text: 'फॉल्ट ज़ोन (Fault zone)' },
      { id: 'opt_4', text: 'क्रस्ट (Crust)' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "भूकंप की उत्पत्ति पृथ्वी के अंदर गहराई में जिस बिंदु पर होती है उसे भूकंप नाभि (Focus) कहते हैं। इसके ठीक ऊपर पृथ्वी की सतह पर स्थित बिंदु अधिकेंद्र (Epicenter) कहलाता है।",
    difficulty: 'hard',
    tags: ['natural-phenomena', 'earthquake-focus']
  },
{
    id: 'q_sci_b2_06_004',
    type: 'multiple-select',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_15', topicId: 'top_sci_01_06',
    textPlain: "भूकंप के दौरान यदि आप घर के अंदर हैं, तो सुरक्षित रहने के लिए किन उपायों का पालन करना चाहिए? (एक से अधिक सही हो सकते हैं)",
    options: [
      { id: 'opt_1', text: 'मज़बूत मेज़ या डेस्क के नीचे छिप जाएँ।' },
      { id: 'opt_2', text: 'ऊँची और भारी अलमारियों से दूर रहें।' },
      { id: 'opt_3', text: 'तुरंत लिफ्ट का उपयोग करके नीचे भागें।' },
      { id: 'opt_4', text: 'खिड़कियों और काँच के पास खड़े हो जाएँ।' }
    ],
    correctOptionIds: ['opt_1', 'opt_2'],
    explanationPlain: "भूकंप में मेज़ के नीचे छिपना (Drop, Cover, Hold) और भारी वस्तुओं से दूर रहना सुरक्षित है। लिफ्ट का उपयोग और काँच के पास खड़े होना अत्यंत खतरनाक है।",
    difficulty: 'hard',
    tags: ['natural-phenomena', 'earthquake-safety']
  },
{
    id: 'q_sci_b2_06_005',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_15', topicId: 'top_sci_01_06',
    textPlain: "भूकंपीय तरंगों (Seismic waves) को रिकॉर्ड करने वाले उपकरण को क्या कहा जाता है?",
    options: [
      { id: 'opt_1', text: 'बैरोमीटर' },
      { id: 'opt_2', text: 'भूकंपलेखी (Seismograph)' },
      { id: 'opt_3', text: 'इलेक्ट्रोस्कोप' },
      { id: 'opt_4', text: 'पॉलीग्राफ' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "भूकंप के कारण उत्पन्न होने वाली तरंगों को ग्राफ के रूप में रिकॉर्ड करने के लिए भूकंपलेखी (Seismograph) उपकरण का उपयोग किया जाता है।",
    difficulty: 'challenge',
    tags: ['natural-phenomena', 'seismograph']
  },
{
    id: 'q_sci_b2_07_001',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_17', topicId: 'top_sci_01_07',
    textPlain: "सौर परिवार का वह पिंड क्या कहलाता है जो ग्रहों की परिक्रमा करता है?",
    options: [
      { id: 'opt_1', text: 'तारा (Star)' },
      { id: 'opt_2', text: 'उपग्रह (Satellite / Moon)' },
      { id: 'opt_3', text: 'क्षुद्रग्रह (Asteroid)' },
      { id: 'opt_4', text: 'धूमकेतु (Comet)' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "ग्रह सूर्य की परिक्रमा करते हैं, और जो खगोलीय पिंड ग्रहों की परिक्रमा करते हैं, उन्हें उपग्रह (Satellite) कहते हैं (जैसे पृथ्वी का उपग्रह चंद्रमा)।",
    difficulty: 'easy',
    tags: ['solar-system', 'satellites']
  },
{
    id: 'q_sci_b2_07_002',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_17', topicId: 'top_sci_01_07',
    textPlain: "रात्रि के आकाश में सबसे अधिक चमकीला ग्रह (Brightest Planet) कौन-सा है, जिसे अक्सर भोर का तारा या साँझ का तारा भी कहा जाता है?",
    options: [
      { id: 'opt_1', text: 'मंगल (Mars)' },
      { id: 'opt_2', text: 'बृहस्पति (Jupiter)' },
      { id: 'opt_3', text: 'शुक्र (Venus)' },
      { id: 'opt_4', text: 'बुध (Mercury)' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "शुक्र (Venus) पृथ्वी का निकटतम पड़ोसी ग्रह है और यह आकाश में सबसे चमकीला प्राकृतिक पिंड (सूर्य और चंद्रमा के बाद) है।",
    difficulty: 'medium',
    tags: ['solar-system', 'venus']
  },
{
    id: 'q_sci_b2_07_003',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_17', topicId: 'top_sci_01_07',
    textPlain: "अंतरिक्ष में लंबी दूरियों (जैसे तारों के बीच की दूरी) को मापने के लिए किस इकाई का उपयोग किया जाता है?",
    options: [
      { id: 'opt_1', text: 'किलोमीटर' },
      { id: 'opt_2', text: 'प्रकाश वर्ष (Light Year)' },
      { id: 'opt_3', text: 'मीटर प्रति सेकंड' },
      { id: 'opt_4', text: 'मेगामीटर' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "प्रकाश द्वारा एक वर्ष में तय की गई दूरी को प्रकाश वर्ष कहते हैं। यह दूरी मापने की इकाई है, समय की नहीं।",
    difficulty: 'medium',
    tags: ['solar-system', 'light-year']
  },
{
    id: 'q_sci_b2_07_004',
    type: 'true-false',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_17', topicId: 'top_sci_01_07',
    textPlain: "सत्य/असत्य: चंद्रमा की कलाओं (Phases of the Moon) का कारण यह है कि हम चंद्रमा का केवल वह भाग ही देख पाते हैं जो सूर्य के प्रकाश को हमारी ओर परावर्तित करता है।",
    options: [
      { id: 'opt_true', text: 'सत्य' },
      { id: 'opt_false', text: 'असत्य' }
    ],
    correctOptionIds: ['opt_true'],
    explanationPlain: "सत्य। चंद्रमा का अपना प्रकाश नहीं होता। जब वह पृथ्वी की परिक्रमा करता है, तो सूर्य के प्रकाश से प्रकाशित हिस्सा बदलता रहता है, जिससे हमें कलाएँ दिखती हैं।",
    difficulty: 'hard',
    tags: ['solar-system', 'moon-phases']
  },
{
    id: 'q_sci_b2_07_005',
    type: 'mcq',
    subjectId: 'sub_sci',
    chapterId: 'chap_sci_17', topicId: 'top_sci_01_07',
    textPlain: "क्षुद्रग्रह (Asteroids) मुख्य रूप से किन दो ग्रहों की कक्षाओं के बीच पाए जाते हैं?",
    options: [
      { id: 'opt_1', text: 'पृथ्वी और मंगल' },
      { id: 'opt_2', text: 'मंगल और बृहस्पति (Mars and Jupiter)' },
      { id: 'opt_3', text: 'बृहस्पति और शनि' },
      { id: 'opt_4', text: 'शुक्र और पृथ्वी' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "क्षुद्रग्रह (Asteroids) चट्टानी मलबे हैं जो मुख्य रूप से मंगल (Mars) और बृहस्पति (Jupiter) की कक्षाओं के बीच एक विस्तृत पट्टी (Asteroid belt) में सूर्य की परिक्रमा करते हैं।",
    difficulty: 'hard',
    tags: ['solar-system', 'asteroids']
  }
];
