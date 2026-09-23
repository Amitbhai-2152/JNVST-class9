import type { Question } from '../../types';
import { createQuestion } from '../../utils/questionFactory';

type HindiExpansionSpec = {
  id: string;
  chapterId: string;
  topicId: string;
  textPlain: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  difficulty: Question['difficulty'];
  tags: string[];
  explanationPlain: string;
};

const make = (spec: HindiExpansionSpec): Question =>
  createQuestion({
    id: spec.id,
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: spec.chapterId,
    topicId: spec.topicId,
    textPlain: spec.textPlain,
    options: spec.options.map((text, index) => ({ id: 'opt_' + (index + 1), text })),
    correctOptionIds: ['opt_' + (spec.correct + 1)],
    explanationPlain: spec.explanationPlain,
    difficulty: spec.difficulty,
    tags: spec.tags,
  });

export const hindiExpansionQuestions: Question[] = [
  make({
    id:'q_hin_x_01_001', chapterId:'chap_hin_01', topicId:'top_hin_01_01',
    textPlain:"निम्नलिखित में से शुद्ध वर्तनी वाला शब्द चुनिए।",
    options:['आवश्यक्ता','आवश्यकता','आवाश्यकता','आवसयकता'], correct:1, difficulty:'easy',
    tags:['spelling','varn-vichar'],
    explanationPlain:"शुद्ध वर्तनी 'आवश्यकता' है। इसमें 'शक' वाला संयुक्त रूप नहीं, बल्कि आवश्यक + ता का सही रूप है।"
  }),
  make({
    id:'q_hin_x_01_002', chapterId:'chap_hin_01', topicId:'top_hin_01_01',
    textPlain:"'कँपना' शब्द में कौन-सा चिह्न अनुनासिकता का बोध कराता है?",
    options:['अनुस्वार (ं)','अनुनासिक (ँ)','विसर्ग (ः)','हलंत (्)'], correct:1, difficulty:'medium',
    tags:['phonology','anusvara-anunasika'],
    explanationPlain:"'कँपना' में 'ँ' चंद्रबिंदु अनुनासिक उच्चारण का संकेत देता है।"
  }),
  make({
    id:'q_hin_x_01_003', chapterId:'chap_hin_01', topicId:'top_hin_01_01',
    textPlain:"'ज्ञान' शब्द में कौन-सा संयुक्त व्यंजन प्रमुख है?",
    options:['ज्ञ','क्ष','त्र','श्र'], correct:0, difficulty:'medium',
    tags:['phonology','joint-consonants'],
    explanationPlain:"'ज्ञान' का आरंभिक संयुक्त रूप 'ज्ञ' है, जिसे ज् + ञ के संयुक्त रूप के रूप में पढ़ाया जाता है।"
  }),
  make({
    id:'q_hin_x_01_004', chapterId:'chap_hin_01', topicId:'top_hin_01_01',
    textPlain:"निम्नलिखित में से कौन-सा शब्द शुद्ध है?",
    options:['निशब्द','निःशब्द','निश्शब्द','निस्शब्द'], correct:1, difficulty:'hard',
    tags:['spelling','visarga'],
    explanationPlain:"मानक रूप 'निःशब्द' है, जिसमें विसर्ग का प्रयोग होता है।"
  }),
  make({
    id:'q_hin_x_01_005', chapterId:'chap_hin_01', topicId:'top_hin_01_01',
    textPlain:"'त्र' किस प्रकार का वर्ण-समूह है?",
    options:['एक स्वर','संयुक्त व्यंजन','अनुस्वार','विसर्ग'], correct:1, difficulty:'challenge',
    tags:['phonology','joint-consonants'],
    explanationPlain:"'त्र' दो व्यंजनों के संयुक्त रूप से बना संयुक्त व्यंजन है।"
  }),

  make({
    id:'q_hin_x_02_001', chapterId:'chap_hin_02', topicId:'top_hin_02_01',
    textPlain:"निम्नलिखित में से कौन-सा तत्सम-तद्भव युग्म सही है?",
    options:['दुग्ध — दूध','अग्नि — अनल','सूरज — सूर्य','दंत — कान'], correct:0, difficulty:'easy',
    tags:['shabdbhed','tatsam','tadbhav'],
    explanationPlain:"'दुग्ध' तत्सम और उसका प्रचलित तद्भव रूप 'दूध' है।"
  }),
  make({
    id:'q_hin_x_02_002', chapterId:'chap_hin_02', topicId:'top_hin_02_01',
    textPlain:"'कागज़' शब्द को सामान्यतः किस स्रोत-भेद में रखा जाता है?",
    options:['तत्सम','तद्भव','विदेशज','देशज'], correct:2, difficulty:'medium',
    tags:['shabdbhed','videshi'],
    explanationPlain:"'कागज़' हिंदी में विदेशी स्रोत, विशेषतः फ़ारसी/अरबी परंपरा से आया शब्द माना जाता है।"
  }),
  make({
    id:'q_hin_x_02_003', chapterId:'chap_hin_02', topicId:'top_hin_02_01',
    textPlain:"दो अलग भाषाओं के शब्दों के मेल से बने शब्द को क्या कहते हैं?",
    options:['तत्सम','संकर','तद्भव','रूढ़'], correct:1, difficulty:'easy',
    tags:['shabdbhed','sankar'],
    explanationPlain:"दो अलग भाषाई स्रोतों के मेल से बने शब्द संकर कहलाते हैं।"
  }),
  make({
    id:'q_hin_x_02_004', chapterId:'chap_hin_02', topicId:'top_hin_02_01',
    textPlain:"निम्नलिखित में से कौन-सा शब्द तत्सम है?",
    options:['दूध','सूरज','नयन','आग'], correct:2, difficulty:'hard',
    tags:['shabdbhed','tatsam'],
    explanationPlain:"'नयन' संस्कृत के मूल रूप में हिंदी में प्रयुक्त है, इसलिए यह तत्सम है।"
  }),
  make({
    id:'q_hin_x_02_005', chapterId:'chap_hin_02', topicId:'top_hin_02_01',
    textPlain:"'रेलगाड़ी' किस प्रकार का शब्द है?",
    options:['संकर','तत्सम','तद्भव','देशज'], correct:0, difficulty:'challenge',
    tags:['shabdbhed','sankar'],
    explanationPlain:"विद्यालयी हिंदी में 'लालटेन' को दो भाषाई स्रोतों से बने संकर शब्द के उदाहरण के रूप में दिया जाता है।"
  }),

  make({
    id:'q_hin_x_03_001', chapterId:'chap_hin_02', topicId:'top_hin_02_02',
    textPlain:"'सूर्य' का उपयुक्त पर्यायवाची कौन-सा है?",
    options:['रवि','पवन','पंकज','पावक'], correct:0, difficulty:'easy',
    tags:['synonyms','vocabulary'],
    explanationPlain:"'रवि' सूर्य का पर्यायवाची है।"
  }),
  make({
    id:'q_hin_x_03_002', chapterId:'chap_hin_02', topicId:'top_hin_02_02',
    textPlain:"'आरंभ' का सही विलोम कौन-सा है?",
    options:['प्रारंभ','मध्य','अंत','उदय'], correct:2, difficulty:'easy',
    tags:['antonyms','vocabulary'],
    explanationPlain:"'आरंभ' का विपरीत अर्थ 'अंत' है।"
  }),
  make({
    id:'q_hin_x_03_003', chapterId:'chap_hin_02', topicId:'top_hin_02_02',
    textPlain:"'पृथ्वी' का पर्यायवाची चुनिए।",
    options:['धरती','गगन','सलिल','अनल'], correct:0, difficulty:'medium',
    tags:['synonyms','vocabulary'],
    explanationPlain:"'धरती' पृथ्वी का प्रचलित पर्यायवाची है।"
  }),
  make({
    id:'q_hin_x_03_004', chapterId:'chap_hin_02', topicId:'top_hin_02_02',
    textPlain:"निम्नलिखित में से कौन-सा विलोम युग्म सही है?",
    options:['लाभ — फायदा','उत्थान — पतन','जल — नीर','सुंदर — मनोहर'], correct:1, difficulty:'hard',
    tags:['antonyms','error-identification'],
    explanationPlain:"'उत्थान' का विपरीत 'पतन' है। अन्य विकल्प समानार्थी या निकटार्थी हैं।"
  }),
  make({
    id:'q_hin_x_03_005', chapterId:'chap_hin_02', topicId:'top_hin_02_02',
    textPlain:"'विनय' का निकटतम पर्यायवाची क्या है?",
    options:['अहंकार','नम्रता','क्रोध','विरोध'], correct:1, difficulty:'challenge',
    tags:['synonyms','vocabulary'],
    explanationPlain:"'विनय' का अर्थ नम्रता या शिष्टता है; इसलिए 'नम्रता' उपयुक्त पर्याय है।"
  }),

  make({
    id:'q_hin_x_04_001', chapterId:'chap_hin_02', topicId:'top_hin_02_03',
    textPlain:"सही शब्द चुनिए: 'उसने मेरी ______ नहीं की, बल्कि मेरी ______ रखी।'",
    options:['उपेक्षा — अपेक्षा','अपेक्षा — उपेक्षा','प्रतीक्षा — अपेक्षा','उपेक्षा — प्रतीक्षा'], correct:0, difficulty:'medium',
    tags:['shabd-vivek','context'],
    explanationPlain:"'उपेक्षा' का अर्थ अनदेखी करना है और 'अपेक्षा' का अर्थ उम्मीद। वाक्य के अर्थ में यही क्रम सही है।"
  }),
  make({
    id:'q_hin_x_04_002', chapterId:'chap_hin_02', topicId:'top_hin_02_03',
    textPlain:"'अंश' और 'अंस' के अर्थ क्रमशः क्या हैं?",
    options:['कंधा — भाग','भाग — कंधा','आग — हवा','हवा — आग'], correct:1, difficulty:'easy',
    tags:['shabd-vivek','homonyms'],
    explanationPlain:"'अंश' का अर्थ भाग और 'अंस' का अर्थ कंधा होता है।"
  }),
  make({
    id:'q_hin_x_04_003', chapterId:'chap_hin_02', topicId:'top_hin_02_03',
    textPlain:"रिक्त स्थान के लिए सही शब्द चुनिए: 'वह प्रतिदिन बस की ______ करता था।'",
    options:['प्रतीक्षा','अपेक्षा','उपेक्षा','उपदेश'], correct:0, difficulty:'medium',
    tags:['shabd-vivek','context'],
    explanationPlain:"बस आने की प्रतीक्षा की जाती है, इसलिए 'प्रतीक्षा' सही है।"
  }),
  make({
    id:'q_hin_x_04_004', chapterId:'chap_hin_02', topicId:'top_hin_02_03',
    textPlain:"'अनल' और 'अनिल' का सही अर्थ-युग्म कौन-सा है?",
    options:['हवा — आग','आग — हवा','आकाश — जल','जल — आकाश'], correct:1, difficulty:'hard',
    tags:['shabd-vivek','homonyms'],
    explanationPlain:"'अनल' = आग और 'अनिल' = हवा।"
  }),
  make({
    id:'q_hin_x_04_005', chapterId:'chap_hin_02', topicId:'top_hin_02_03',
    textPlain:"'कुल' और 'कूल' का सही अर्थ-भेद क्या है?",
    options:['वंश/परिवार — किनारा','किनारा — वंश/परिवार','आग — हवा','दिन — रात'], correct:0, difficulty:'challenge',
    tags:['shabd-vivek','homonyms'],
    explanationPlain:"'कुल' का अर्थ वंश/परिवार और 'कूल' का अर्थ किनारा होता है।"
  }),

  make({
    id:'q_hin_x_05_001', chapterId:'chap_hin_03', topicId:'top_hin_03_01',
    textPlain:"वाक्य 'सीमा सुंदर गीत गाती है।' में 'सुंदर' कौन-सा पद है?",
    options:['संज्ञा','सर्वनाम','विशेषण','क्रिया'], correct:2, difficulty:'easy',
    tags:['pad-bhed','adjective'],
    explanationPlain:"'सुंदर' गीत की विशेषता बता रहा है, इसलिए यह विशेषण है।"
  }),
  make({
    id:'q_hin_x_05_002', chapterId:'chap_hin_03', topicId:'top_hin_03_01',
    textPlain:"वाक्य 'वे कल आएँगे।' में 'वे' कौन-सा पद है?",
    options:['सर्वनाम','क्रिया','विशेषण','अव्यय'], correct:0, difficulty:'easy',
    tags:['pad-bhed','pronoun'],
    explanationPlain:"'वे' संज्ञा के स्थान पर प्रयुक्त हुआ है, इसलिए यह सर्वनाम है।"
  }),
  make({
    id:'q_hin_x_05_003', chapterId:'chap_hin_03', topicId:'top_hin_03_01',
    textPlain:"'राम धीरे चलता है।' में 'धीरे' कौन-सा पद है?",
    options:['संज्ञा','क्रिया-विशेषण','विशेषण','सर्वनाम'], correct:1, difficulty:'medium',
    tags:['pad-bhed','adverb'],
    explanationPlain:"'धीरे' चलने की रीति बताता है, इसलिए यह क्रिया-विशेषण है।"
  }),
  make({
    id:'q_hin_x_05_004', chapterId:'chap_hin_03', topicId:'top_hin_03_01',
    textPlain:"'पाँच विद्यार्थी उपस्थित थे।' में 'पाँच' किस प्रकार का विशेषण है?",
    options:['गुणवाचक','परिमाणवाचक','संख्यावाचक','सार्वनामिक'], correct:2, difficulty:'hard',
    tags:['pad-bhed','adjective','number'],
    explanationPlain:"'पाँच' विद्यार्थियों की संख्या बताता है, इसलिए यह संख्यावाचक विशेषण है।"
  }),
  make({
    id:'q_hin_x_05_005', chapterId:'chap_hin_03', topicId:'top_hin_03_01',
    textPlain:"'वह धीरे बोलता है।' में 'धीरे' किस पद का काम कर रहा है?",
    options:['संज्ञा','क्रिया-विशेषण','सर्वनाम','संबंधबोधक'], correct:1, difficulty:'challenge',
    tags:['pad-bhed','adverb'],
    explanationPlain:"'बहुत' 'तेज' की मात्रा/तीव्रता बढ़ा रहा है और वाक्य में क्रिया-विशेषणीय कार्य कर रहा है।"
  }),
  make({
    id:'q_hin_x_05_006', chapterId:'chap_hin_03', topicId:'top_hin_03_01',
    textPlain:"वाक्य 'यह मेरी पुस्तक है।' में 'मेरी' किस प्रकार का पद है?",
    options:['सार्वनामिक विशेषण','क्रिया','संज्ञा','अव्यय'], correct:0, difficulty:'medium',
    tags:['pad-bhed','pronoun','adjective'],
    explanationPlain:"'मेरी' पुस्तक के साथ संबंध और विशेषता बता रहा है; इसलिए यह सार्वनामिक विशेषण के रूप में प्रयुक्त है।"
  }),

  make({
    id:'q_hin_x_06_001', chapterId:'chap_hin_03', topicId:'top_hin_03_02',
    textPlain:"'रमा ने पत्र लिखा।' में 'रमा' का कारक कौन-सा है?",
    options:['कर्ता','कर्म','करण','अपादान'], correct:0, difficulty:'easy',
    tags:['pad-parichay','karak'],
    explanationPlain:"'रमा' कार्य करने वाली है, इसलिए 'ने' के साथ यह कर्ता कारक है।"
  }),
  make({
    id:'q_hin_x_06_002', chapterId:'chap_hin_03', topicId:'top_hin_03_02',
    textPlain:"'राम ने गेंद फेंकी।' में 'गेंद' का पद-परिचय किस रूप में होगा?",
    options:['पुल्लिंग, बहुवचन, कर्ता','स्त्रीलिंग, एकवचन, कर्म','स्त्रीलिंग, बहुवचन, कर्ता','पुल्लिंग, एकवचन, कर्म'], correct:1, difficulty:'medium',
    tags:['pad-parichay','gender-number','karak'],
    explanationPlain:"'गेंद' स्त्रीलिंग, एकवचन है और फेंकने की क्रिया का कर्म है।"
  }),
  make({
    id:'q_hin_x_06_003', chapterId:'chap_hin_03', topicId:'top_hin_03_02',
    textPlain:"'लड़कियाँ मैदान में खेल रही हैं।' में 'लड़कियाँ' का वचन क्या है?",
    options:['एकवचन','बहुवचन','द्विवचन','अविकारी'], correct:1, difficulty:'easy',
    tags:['pad-parichay','number'],
    explanationPlain:"'लड़कियाँ' एक से अधिक का बोध कराता है, इसलिए बहुवचन है।"
  }),
  make({
    id:'q_hin_x_06_004', chapterId:'chap_hin_03', topicId:'top_hin_03_02',
    textPlain:"'सीमा ने सुनीता को बुलाया।' में 'सुनीता' का कारक कौन-सा है?",
    options:['कर्ता','कर्म','करण','अपादान'], correct:1, difficulty:'hard',
    tags:['pad-parichay','karak'],
    explanationPlain:"जिसे बुलाया गया है वह क्रिया का कर्म है; इसलिए 'सुनीता' कर्म कारक में है।"
  }),

  make({
    id:'q_hin_x_07_001', chapterId:'chap_hin_04', topicId:'top_hin_04_01',
    textPlain:"निम्नलिखित में से शुद्ध वाक्य चुनिए।",
    options:['बच्चियाँ खेल रहा है।','बच्चियाँ खेल रही हैं।','बच्चियाँ खेल रहे है।','बच्चियाँ खेलती हैं था।'], correct:1, difficulty:'easy',
    tags:['sentence-correction','agreement'],
    explanationPlain:"'बच्चियाँ' स्त्रीलिंग बहुवचन है, इसलिए क्रिया 'खेल रही हैं' होगी।"
  }),
  make({
    id:'q_hin_x_07_002', chapterId:'chap_hin_04', topicId:'top_hin_04_01',
    textPlain:"निम्नलिखित में से शुद्ध वाक्य चुनिए।",
    options:['मोहन को पत्र लिखा।','मोहन ने पत्र लिखा।','मोहन से पत्र लिखा।','मोहन में पत्र लिखा।'], correct:1, difficulty:'medium',
    tags:['sentence-correction','karak'],
    explanationPlain:"पत्र लिखने वाला कर्ता 'मोहन' है; इसलिए 'ने' का प्रयोग होगा।"
  }),
  make({
    id:'q_hin_x_07_003', chapterId:'chap_hin_04', topicId:'top_hin_04_01',
    textPlain:"निम्नलिखित में से शुद्ध वाक्य चुनिए।",
    options:['उसने आवाज़ दिया।','उसने आवाज़ दी।','उसने आवाज़ दिए।','उसने आवाज़ देने।'], correct:1, difficulty:'easy',
    tags:['sentence-correction','gender-agreement'],
    explanationPlain:"'आवाज़' स्त्रीलिंग शब्द है, इसलिए 'दी' का प्रयोग सही है।"
  }),
  make({
    id:'q_hin_x_07_004', chapterId:'chap_hin_04', topicId:'top_hin_04_01',
    textPlain:"निम्नलिखित में से शुद्ध वाक्य चुनिए।",
    options:['मेरे दोनों हाथ दुखता है।','मेरे दोनों हाथ दुखते हैं।','मेरे दोनों हाथ दुखता हैं।','मेरे दोनों हाथ दुखते है।'], correct:1, difficulty:'hard',
    tags:['sentence-correction','number-agreement'],
    explanationPlain:"'दोनों हाथ' बहुवचन है; इसलिए 'दुखते हैं' सही है।"
  }),
  make({
    id:'q_hin_x_07_005', chapterId:'chap_hin_04', topicId:'top_hin_04_01',
    textPlain:"निम्नलिखित में से शुद्ध वाक्य कौन-सा है?",
    options:['मुझे दो रोटी चाहिए।','मुझे दो रोटियाँ चाहिए।','मुझे दो रोटियाँ चाहिएँ।','मुझे दो रोटी चाहिए हैं।'], correct:1, difficulty:'challenge',
    tags:['sentence-correction','number-agreement'],
    explanationPlain:"सामान्य मानक रूप 'मुझे दो रोटियाँ चाहिए।' है; मात्रा और संज्ञा का वचन ठीक रखा गया है।"
  }),

  make({
    id:'q_hin_x_08_001', chapterId:'chap_hin_04', topicId:'top_hin_04_02',
    textPlain:"'राम पढ़ता है और श्याम खेलता है।' किस प्रकार का वाक्य है?",
    options:['सरल','संयुक्त','मिश्र','विस्मयादिबोधक'], correct:1, difficulty:'easy',
    tags:['sentence-transformation','compound'],
    explanationPlain:"यह दो स्वतंत्र उपवाक्यों को 'और' से जोड़ता है, इसलिए संयुक्त वाक्य है।"
  }),
  make({
    id:'q_hin_x_08_002', chapterId:'chap_hin_04', topicId:'top_hin_04_02',
    textPlain:"'जब वर्षा रुकी, तब बच्चे बाहर गए।' किस प्रकार का वाक्य है?",
    options:['सरल','संयुक्त','मिश्र','आज्ञार्थक'], correct:2, difficulty:'medium',
    tags:['sentence-transformation','complex'],
    explanationPlain:"'जब वर्षा रुकी' आश्रित उपवाक्य है और 'बच्चे बाहर गए' प्रधान उपवाक्य; इसलिए मिश्र वाक्य है।"
  }),
  make({
    id:'q_hin_x_08_003', chapterId:'chap_hin_04', topicId:'top_hin_04_02',
    textPlain:"'सूरज निकला और पक्षी चहके।' का सरल रूप चुनिए।",
    options:['सूरज निकलते ही पक्षी चहके।','क्योंकि सूरज निकला, इसलिए पक्षी चहके।','सूरज निकला क्योंकि पक्षी चहके।','पक्षी चहकते हैं और सूरज निकला।'], correct:0, difficulty:'hard',
    tags:['sentence-transformation','simple'],
    explanationPlain:"'सूरज निकलते ही पक्षी चहके' एक ही मुख्य संरचना में वही क्रमिक अर्थ व्यक्त करता है।"
  }),
  make({
    id:'q_hin_x_08_004', chapterId:'chap_hin_04', topicId:'top_hin_04_02',
    textPlain:"'मैं जानता हूँ कि वह ईमानदार है।' में आश्रित उपवाक्य कौन-सा है?",
    options:['मैं जानता हूँ','कि वह ईमानदार है','मैं','वह ईमानदार'], correct:1, difficulty:'medium',
    tags:['sentence-transformation','subordinate-clause'],
    explanationPlain:"'कि वह ईमानदार है' प्रधान कथन पर आश्रित है, इसलिए यही आश्रित उपवाक्य है।"
  }),

  make({
    id:'q_hin_x_09_001', chapterId:'chap_hin_05', topicId:'top_hin_05_01',
    textPlain:"'हाथ-पाँव फूलना' मुहावरे का अर्थ क्या है?",
    options:['बहुत घबरा जाना','बहुत तेज दौड़ना','बहुत खुश होना','बीमार हो जाना'], correct:0, difficulty:'easy',
    tags:['idiom','meaning'],
    explanationPlain:"'हाथ-पाँव फूलना' का अर्थ बहुत घबरा जाना है।"
  }),
  make({
    id:'q_hin_x_09_002', chapterId:'chap_hin_05', topicId:'top_hin_05_01',
    textPlain:"'दाँत खट्टे करना' मुहावरा किस स्थिति में उपयुक्त है?",
    options:['किसी को खाना खिलाना','किसी को बुरी तरह हरा देना','किसी की मदद करना','किसी से डर जाना'], correct:1, difficulty:'medium',
    tags:['idiom','context'],
    explanationPlain:"'दाँत खट्टे करना' का भावार्थ किसी को बुरी तरह पराजित करना है।"
  }),
  make({
    id:'q_hin_x_09_003', chapterId:'chap_hin_05', topicId:'top_hin_05_01',
    textPlain:"'आँखों का तारा' का सही अर्थ क्या है?",
    options:['आँख में चमक','बहुत प्रिय व्यक्ति','बहुत क्रोधित व्यक्ति','बहुत दूर का व्यक्ति'], correct:1, difficulty:'easy',
    tags:['idiom','meaning'],
    explanationPlain:"'आँखों का तारा' बहुत प्रिय व्यक्ति के लिए कहा जाता है।"
  }),
  make({
    id:'q_hin_x_09_004', chapterId:'chap_hin_05', topicId:'top_hin_05_01',
    textPlain:"रिक्त स्थान भरिए: 'रिज़ल्ट देखते ही मेरे ________ फूल गए।'",
    options:['हाथ-पाँव','आँखों का तारा','दाँत खट्टे','कान भरना'], correct:0, difficulty:'hard',
    tags:['idiom','context'],
    explanationPlain:"रिज़ल्ट का तनाव या घबराहट बताने के लिए 'हाथ-पाँव फूलना' उपयुक्त मुहावरा है।"
  }),
  make({
    id:'q_hin_x_09_005', chapterId:'chap_hin_05', topicId:'top_hin_05_01',
    textPlain:"'नाक कटना' मुहावरे का सही भावार्थ कौन-सा है?",
    options:['शरीर को चोट लगना','अपमान होना','जल्दी भाग जाना','बहुत गुस्सा होना'], correct:1, difficulty:'challenge',
    tags:['idiom','meaning'],
    explanationPlain:"'नाक कटना' का भावार्थ अपमान होना या प्रतिष्ठा खराब होना है।"
  }),

  make({
    id:'q_hin_x_10_001', chapterId:'chap_hin_05', topicId:'top_hin_05_02',
    textPlain:"'जहाँ चाह वहाँ राह' का आशय क्या है?",
    options:['हर रास्ता बंद है','दृढ़ इच्छा से मार्ग निकल सकता है','यात्रा हमेशा कठिन होती है','रास्ता केवल धन से मिलता है'], correct:1, difficulty:'easy',
    tags:['proverbs','meaning'],
    explanationPlain:"यह लोकोक्ति बताती है कि दृढ़ इच्छा और प्रयास से मार्ग निकाला जा सकता है।"
  }),
  make({
    id:'q_hin_x_10_002', chapterId:'chap_hin_05', topicId:'top_hin_05_02',
    textPlain:"'नाच न जाने आँगन टेढ़ा' कब कहा जाता है?",
    options:['जब कोई अपनी कमी का दोष दूसरों पर डाले','जब कोई अच्छा नाच करे','जब आँगन छोटा हो','जब कोई घर बनाए'], correct:0, difficulty:'medium',
    tags:['proverbs','context'],
    explanationPlain:"यह लोकोक्ति अपनी कमी या अयोग्यता का दोष दूसरे कारणों पर डालने की स्थिति में कही जाती है।"
  }),
  make({
    id:'q_hin_x_10_003', chapterId:'chap_hin_05', topicId:'top_hin_05_02',
    textPlain:"कम ज्ञान होने पर भी बहुत दिखावा करने वाले के लिए कौन-सी लोकोक्ति उपयुक्त है?",
    options:['जहाँ चाह वहाँ राह','अधजल गगरी छलकत जाए','एकता में बल है','घर का भेदी लंका ढाए'], correct:1, difficulty:'hard',
    tags:['proverbs','context'],
    explanationPlain:"'अधजल गगरी छलकत जाए' कम ज्ञान या गुण वाले व्यक्ति के अधिक दिखावे को दर्शाती है।"
  }),
  make({
    id:'q_hin_x_10_004', chapterId:'chap_hin_05', topicId:'top_hin_05_02',
    textPlain:"'एकता में बल है' का संदेश किससे संबंधित है?",
    options:['अकेले रहने से सफलता','मिल-जुलकर काम करने की शक्ति','बहुत धन कमाना','समय नष्ट करना'], correct:1, difficulty:'easy',
    tags:['proverbs','meaning'],
    explanationPlain:"यह लोकोक्ति सामूहिकता और सहयोग की शक्ति बताती है।"
  }),

  make({
    id:'q_hin_x_11_001', chapterId:'chap_hin_06', topicId:'top_hin_06_01',
    textPlain:"गद्यांश पढ़िए: 'समय का सही उपयोग विद्यार्थी को नियमित बनाता है। जो छात्र प्रतिदिन थोड़ा-थोड़ा पढ़ते हैं, वे परीक्षा के समय अनावश्यक दबाव से बचते हैं।' गद्यांश का मुख्य विचार क्या है?",
    options:['परीक्षा बहुत कठिन होती है','समय का सदुपयोग पढ़ाई को व्यवस्थित बनाता है','विद्यार्थियों को केवल परीक्षा से पहले पढ़ना चाहिए','नियमित पढ़ाई से समय बढ़ता है'], correct:1, difficulty:'easy',
    tags:['comprehension','main-idea'],
    explanationPlain:"दोनों वाक्य नियमित अध्ययन और समय के सही उपयोग के लाभ पर केंद्रित हैं।"
  }),
  make({
    id:'q_hin_x_11_002', chapterId:'chap_hin_06', topicId:'top_hin_06_01',
    textPlain:"गद्यांश पढ़िए: 'गाँव के लोगों ने मिलकर एक छोटी पुस्तकालय बनाई। बच्चों ने पुरानी उपयोगी पुस्तकें इकट्ठी कीं और युवाओं ने कमरा साफ किया।' पुस्तकालय बनाने में किसकी भूमिका रही?",
    options:['केवल बच्चों की','केवल युवाओं की','गाँव के विभिन्न लोगों की','केवल अध्यापक की'], correct:2, difficulty:'medium',
    tags:['comprehension','factual','inference'],
    explanationPlain:"गद्यांश में बच्चों और युवाओं दोनों सहित गाँव के लोगों की संयुक्त भूमिका बताई गई है।"
  }),
  make({
    id:'q_hin_x_11_003', chapterId:'chap_hin_06', topicId:'top_hin_06_01',
    textPlain:"गद्यांश पढ़िए: 'रवि रोज़ पौधों को देखता था। उसने सूखी मिट्टी में पानी दिया और टूटे पौधे को सहारा बाँधा। कुछ सप्ताह बाद पौधे फिर हरे हो गए।' रवि के बारे में क्या निष्कर्ष निकलता है?",
    options:['वह पौधों की देखभाल नहीं करता','वह धैर्यवान और जिम्मेदार है','वह केवल फूल तोड़ता है','वह पौधों से डरता है'], correct:1, difficulty:'medium',
    tags:['comprehension','inference'],
    explanationPlain:"रवि ने नियमित देखभाल की और टूटे पौधे की मदद की; इससे जिम्मेदारी और धैर्य का संकेत मिलता है।"
  }),
  make({
    id:'q_hin_x_11_004', chapterId:'chap_hin_06', topicId:'top_hin_06_01',
    textPlain:"गद्यांश पढ़िए: 'बारिश रुकने के बाद बच्चे बाहर निकले। रास्ते में पानी भरा था, इसलिए उन्होंने लंबा लेकिन सूखा रास्ता चुना।' बच्चों ने लंबा रास्ता क्यों चुना?",
    options:['उन्हें खेलना था','छोटा रास्ता बंद था','उन्होंने पानी से भरे रास्ते से बचने का निर्णय लिया','वे घर भूल गए थे'], correct:2, difficulty:'hard',
    tags:['comprehension','cause-effect','inference'],
    explanationPlain:"गद्यांश सीधे बताता है कि रास्ते में पानी भरा था, इसलिए बच्चों ने सूखा रास्ता चुना।"
  }),
  make({
    id:'q_hin_x_11_005', chapterId:'chap_hin_06', topicId:'top_hin_06_01',
    textPlain:"गद्यांश पढ़िए: 'पुस्तक पढ़ते समय मीना कठिन शब्दों के नीचे पेंसिल से निशान लगाती और बाद में शब्दकोश में उनके अर्थ देखती थी।' वह पेंसिल से निशान क्यों लगाती थी?",
    options:['पुस्तक सजाने के लिए','कठिन शब्दों को बाद में खोजने के लिए','शब्द मिटाने के लिए','पृष्ठ गिनने के लिए'], correct:1, difficulty:'challenge',
    tags:['comprehension','purpose','vocabulary'],
    explanationPlain:"वह कठिन शब्दों को पहचानकर बाद में शब्दकोश में देखने के लिए निशान लगाती थी।"
  }),
];

  make({
    id:'q_hin_x_08_005', chapterId:'chap_hin_04', topicId:'top_hin_04_02',
    textPlain:"'बारिश रुकी और बच्चे मैदान में गए।' को मिश्र वाक्य में बदलने का उपयुक्त रूप कौन-सा है?",
    options:['जब बारिश रुकी, तब बच्चे मैदान में गए।','बारिश रुकते ही बच्चे मैदान में गए।','बारिश और बच्चे मैदान में गए।','बच्चे मैदान में गए और बारिश रुकी।'], correct:0, difficulty:'hard',
    tags:['sentence-transformation','complex'],
    explanationPlain:"'जब बारिश रुकी, तब बच्चे मैदान में गए' में 'जब बारिश रुकी' आश्रित उपवाक्य है; इसलिए यह मिश्र वाक्य है।"
  }),
  make({
    id:'q_hin_x_10_005', chapterId:'chap_hin_05', topicId:'top_hin_05_02',
    textPlain:"“दूर के ढोल सुहावने” का सही प्रयोग किस वाक्य में है?",
    options:['दूर की नई जगह बहुत अच्छी लग रही है, पर वहाँ की असली कठिनाइयाँ देखने पर समझ आएँगी।','ढोल की आवाज़ पास आकर और मधुर हो गई।','गाँव में सभी लोग ढोल बजा रहे थे।','ढोल हमेशा दूर से ही बजते हैं।'], correct:0, difficulty:'challenge',
    tags:['proverbs','context'],
    explanationPlain:"यह लोकोक्ति दूर की चीज़ को वास्तविकता से अधिक आकर्षक मान लेने की स्थिति में प्रयोग होती है।"
  }),

export const hindiExpansionAudit = {
  addedQuestionCount: hindiExpansionQuestions.length,
  topics: [...new Set(hindiExpansionQuestions.map((question) => question.topicId))],
};
