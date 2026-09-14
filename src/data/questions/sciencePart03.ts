import type { Question } from '../../types';

export const scienceQuestionsPart03: Question[] = [
{
    id: 'q_sci_b1_07_001', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_01', topicId: 'top_sci_01_07',
    textPlain: "सूर्य के प्रकाश को पृथ्वी तक पहुँचने में लगभग कितना समय लगता है?",
    options: [{id:'opt_1',text:'8 सेकंड'},{id:'opt_2',text:'8 मिनट'},{id:'opt_3',text:'1 प्रकाश वर्ष'},{id:'opt_4',text:'24 घंटे'}], correctOptionIds:['opt_2'], explanationPlain:"सूर्य से पृथ्वी की दूरी लगभग 15 करोड़ किलोमीटर है। प्रकाश की गति 3,00,000 किमी/सेकंड है। अतः प्रकाश को आने में लगभग 8 मिनट (500 सेकंड) का समय लगता है।", difficulty:'easy', tags:['solar-system','sun']
  },
{
    id: 'q_sci_b1_07_002', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_01', topicId: 'top_sci_01_07',
    textPlain: "पृथ्वी को 'नीला ग्रह' (Blue Planet) क्यों कहा जाता है?",
    options: [{id:'opt_1',text:'क्योंकि यहाँ का आकाश हमेशा नीला होता है।'},{id:'opt_2',text:'क्योंकि यहाँ के वन नीले रंग की गैस छोड़ते हैं।'},{id:'opt_3',text:'क्योंकि अंतरिक्ष से देखने पर इसके पृष्ठ पर जल की अधिकता (लगभग 71%) के कारण यह नीली दिखाई देती है।'},{id:'opt_4',text:'क्योंकि पृथ्वी के वायुमंडल में केवल नीले रंग का प्रकाश प्रवेश कर पाता है।'}], correctOptionIds:['opt_3'], explanationPlain:"पृथ्वी की सतह का अधिकांश भाग (जलमंडल) समुद्रों और महासागरों से ढका है। जल प्रकाश का परावर्तन और प्रकीर्णन करता है, जिससे अंतरिक्ष से पृथ्वी नीली प्रतीत होती है।", difficulty:'medium', tags:['solar-system','earth']
  },
{
    id: 'q_sci_b1_07_003', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_01', topicId: 'top_sci_01_07',
    textPlain: "सप्तर्षि (Ursa Major) तारामंडल की सहायता से रात के समय आकाश में किस तारे की स्थिति ज्ञात की जा सकती है?",
    options: [{id:'opt_1',text:'सीरियस (Sirius)'},{id:'opt_2',text:'ध्रुव तारा (Pole Star)'},{id:'opt_3',text:'ओरियन (Orion)'},{id:'opt_4',text:'शुक्र (Venus)'}], correctOptionIds:['opt_2'], explanationPlain:"सप्तर्षि तारामंडल के सिरे के दो तारों को मिलाने वाली काल्पनिक रेखा को उत्तर दिशा में आगे बढ़ाने पर वह ध्रुव तारे की ओर संकेत करती है। ध्रुव तारा हमेशा उत्तर दिशा में स्थिर प्रतीत होता है।", difficulty:'medium', tags:['solar-system','constellations']
  },
{
    id: 'q_sci_b1_07_004', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_01', topicId: 'top_sci_01_07',
    textPlain: "सौर परिवार के ग्रहों में से किस ग्रह का घनत्व (Density) पानी से भी कम है, अर्थात् यदि इसे पानी के विशाल बर्तन में रखा जाए तो यह तैरने लगेगा?",
    options: [{id:'opt_1',text:'बृहस्पति (Jupiter)'},{id:'opt_2',text:'शनि (Saturn)'},{id:'opt_3',text:'मंगल (Mars)'},{id:'opt_4',text:'बुध (Mercury)'}], correctOptionIds:['opt_2'], explanationPlain:"शनि ग्रह का औसत घनत्व सभी ग्रहों में सबसे कम है। इसका घनत्व जल के घनत्व से भी कम है, जिस कारण सैद्धांतिक रूप से यह जल पर तैर सकता है।", difficulty:'hard', tags:['solar-system','planets']
  },
{
    id: 'q_sci_b1_07_005', type: 'true-false', subjectId: 'sub_sci', chapterId: 'chap_sci_01', topicId: 'top_sci_01_07',
    textPlain: "सत्य/असत्य: उल्कापिंड (Meteoroids) वास्तव में टूटते हुए तारे (Shooting stars) होते हैं जो तारों के विखंडन से पृथ्वी के वायुमंडल में प्रवेश करते हैं।",
    options: [{id:'opt_true',text:'सत्य'},{id:'opt_false',text:'असत्य'}], correctOptionIds:['opt_false'], explanationPlain:"असत्य। उल्कापिंड पत्थर या धातु के छोटे टुकड़े होते हैं, न कि असली तारे। जब वे वायुमंडल में तेज़ी से प्रवेश करते हैं, तो घर्षण के कारण जल उठते हैं, जिसे हम आम बोलचाल में 'टूटता तारा' कहते हैं।", difficulty:'challenge', tags:['solar-system','meteors']
  },
{
    id: 'q_sci_b1_08_001', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_01',
    textPlain: "निम्नलिखित में से कौन-सा प्राकृतिक रेशा (Natural fibre) नहीं है, बल्कि एक संश्लेषित (Synthetic) रेशा है?",
    options: [{id:'opt_1',text:'कपास (Cotton)'},{id:'opt_2',text:'ऊन (Wool)'},{id:'opt_3',text:'रेयॉन (Rayon)'},{id:'opt_4',text:'रेशम (Silk)'}], correctOptionIds:['opt_3'], explanationPlain:"कपास, ऊन और रेशम पौधों तथा जंतुओं से प्राप्त होते हैं (प्राकृतिक)। रेयॉन को काष्ठ लुगदी (wood pulp) के रासायनिक उपचार से बनाया जाता है, इसलिए इसे कृत्रिम रेशम या संश्लेषित रेशा कहा जाता है।", difficulty:'easy', tags:['synthetic-fibres','classification']
  },
{
    id: 'q_sci_b1_08_002', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_01',
    textPlain: "पेट (PET) एक बहुत सुपरिचित प्रकार का पॉलिएस्टर है। इसका उपयोग मुख्य रूप से किस काम के लिए किया जाता है?",
    options: [{id:'opt_1',text:'बोतलें, बर्तन और फिल्म (film) बनाने के लिए'},{id:'opt_2',text:'लोहे के पुल बनाने के लिए'},{id:'opt_3',text:'केवल दवाइयों के रूप में'},{id:'opt_4',text:'लकड़ी का फर्नीचर बनाने के लिए'}], correctOptionIds:['opt_1'], explanationPlain:"PET (Polyethylene terephthalate) का उपयोग प्लास्टिक की बोतलें, बर्तन, तार, फिल्म तथा अन्य उपयोगी उत्पादों को बनाने में किया जाता है।", difficulty:'medium', tags:['synthetic-fibres','pet']
  },
{
    id: 'q_sci_b1_08_003', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_01',
    textPlain: "रसोईघर में या प्रयोगशाला में काम करते समय संश्लेषित (Synthetic) कपड़े पहनना खतरनाक क्यों माना जाता है?",
    options: [{id:'opt_1',text:'क्योंकि ये कपड़े बहुत महंगे होते हैं।'},{id:'opt_2',text:'क्योंकि आग लगने पर ये पिघलकर शरीर से चिपक जाते हैं और गंभीर रूप से जला सकते हैं।'},{id:'opt_3',text:'क्योंकि इनमें पसीना अधिक आता है।'},{id:'opt_4',text:'क्योंकि ये आग को पूरी तरह बुझा देते हैं।'}], correctOptionIds:['opt_2'], explanationPlain:"संश्लेषित रेशे गर्म होने पर पिघलने लगते हैं। यदि इनमें आग लग जाए तो कपड़ा पिघलकर व्यक्ति के शरीर (त्वचा) से चिपक जाता है, जो अत्यधिक खतरनाक है।", difficulty:'hard', tags:['synthetic-fibres','safety']
  },
{
    id: 'q_sci_b1_08_004', type: 'multiple-select', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_01',
    textPlain: "प्लास्टिक के संदर्भ में 'थर्मोप्लास्टिक' और 'थर्मोसेटिंग प्लास्टिक' के बीच अंतर दर्शाने वाले सही कथन चुनें: (एक से अधिक सही हो सकते हैं)",
    options: [{id:'opt_1',text:'थर्मोप्लास्टिक को गर्म करने पर वह आसानी से विकृत (नरम) हो जाता है।'},{id:'opt_2',text:'बैकेलाइट और मेलामाइन थर्मोप्लास्टिक के उदाहरण हैं।'},{id:'opt_3',text:'थर्मोसेटिंग प्लास्टिक को एक बार सांचे में ढालने के बाद ऊष्मा देकर नरम नहीं किया जा सकता।'},{id:'opt_4',text:'पॉलीथीन और पीवीसी थर्मोसेटिंग प्लास्टिक हैं।'}], correctOptionIds:['opt_1','opt_3'], explanationPlain:"कथन 1 और 3 सत्य हैं। कथन 2 और 4 गलत हैं क्योंकि बैकेलाइट/मेलामाइन 'थर्मोसेटिंग' हैं, जबकि पॉलीथीन/पीवीसी 'थर्मोप्लास्टिक' हैं।", difficulty:'hard', tags:['synthetic-fibres','plastics','multiple-select']
  },
{
    id: 'q_sci_b1_08_005', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_01',
    textPlain: "निम्नलिखित में से कौन-सा पदार्थ पूर्णतः कृत्रिम (Fully Synthetic) रेशा है, जिसे बनाने में पौधे या जंतु से प्राप्त किसी भी कच्चे माल का उपयोग नहीं किया गया था?",
    options: [{id:'opt_1',text:'रेयॉन (Rayon)'},{id:'opt_2',text:'नायलॉन (Nylon)'},{id:'opt_3',text:'कपास (Cotton)'},{id:'opt_4',text:'रेशम (Silk)'}], correctOptionIds:['opt_2'], explanationPlain:"नायलॉन प्रथम पूर्ण रूप से संश्लेषित रेशा था। इसका निर्माण कोयला, जल और वायु से किया गया था, इसमें किसी भी प्राकृतिक (पौधे/जंतु) कच्चे माल का प्रयोग नहीं हुआ था। (रेयॉन लकड़ी की लुगदी से बनता है)।", difficulty:'challenge', tags:['synthetic-fibres','nylon']
  },
{
    id: 'q_sci_b1_09_001', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_02',
    textPlain: "धातुओं के उस गुण को क्या कहते हैं जिसके कारण उन्हें पीटकर पतली चादरों (Sheets) में बदला जा सकता है?",
    options: [{id:'opt_1',text:'तन्यता (Ductility)'},{id:'opt_2',text:'आघातवर्ध्यता (Malleability)'},{id:'opt_3',text:'ध्वानिकता (Sonority)'},{id:'opt_4',text:'सुचालकता (Conductivity)'}], correctOptionIds:['opt_2'], explanationPlain:"धातुओं को पीटकर पतली चादर (sheet) बनाने का गुण आघातवर्ध्यता (Malleability) कहलाता है। जबकि खींचकर तार बनाने का गुण तन्यता (Ductility) कहलाता है।", difficulty:'easy', tags:['metals-nonmetals','physical-properties']
  },
{
    id: 'q_sci_b1_09_002', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_02',
    textPlain: "कौन-सी एकमात्र अधातु (Non-metal) है जो कमरे के तापमान पर द्रव अवस्था (Liquid state) में पाई जाती है?",
    options: [{id:'opt_1',text:'पारा (Mercury)'},{id:'opt_2',text:'ब्रोमीन (Bromine)'},{id:'opt_3',text:'सोडियम (Sodium)'},{id:'opt_4',text:'कार्बन (Carbon)'}], correctOptionIds:['opt_2'], explanationPlain:"ब्रोमीन एक अधातु है जो द्रव अवस्था में रहती है। (पारा द्रव है, लेकिन वह धातु है)।", difficulty:'medium', tags:['metals-nonmetals','exceptions']
  },
{
    id: 'q_sci_b1_09_003', type: 'mcq', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_02',
    textPlain: "सामान्यतः धातुओं के ऑक्साइड की प्रकृति कैसी होती है?",
    options: [{id:'opt_1',text:'अम्लीय (Acidic)'},{id:'opt_2',text:'क्षारीय (Basic)'},{id:'opt_3',text:'उदासीन (Neutral)'},{id:'opt_4',text:'हमेशा उभयधर्मी (Amphoteric)'}], correctOptionIds:['opt_2'], explanationPlain:"अधिकांश धातु ऑक्साइड जल के साथ क्षार बनाते हैं या अम्ल के साथ अभिक्रिया करके लवण और जल बनाते हैं, इसलिए सामान्यतः वे क्षारीय होते हैं।", difficulty:'hard', tags:['metals-nonmetals','oxides']
  },
{
    id: 'q_sci_b1_09_004', type: 'multiple-select', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_02',
    textPlain: "निम्नलिखित में से किन धातुओं को चाकू से काटा जा सकता है? (एक से अधिक सही हो सकते हैं)",
    options: [{id:'opt_1',text:'सोडियम (Sodium)'},{id:'opt_2',text:'पोटैशियम (Potassium)'},{id:'opt_3',text:'लोहा (Iron)'},{id:'opt_4',text:'मैग्नीशियम (Magnesium)'}], correctOptionIds:['opt_1','opt_2'], explanationPlain:"सोडियम और पोटैशियम बहुत नरम धातुएँ हैं और उन्हें चाकू से काटा जा सकता है।", difficulty:'hard', tags:['metals-nonmetals','soft-metals','multiple-select']
  },
{
    id: 'q_sci_b1_09_005', type: 'true-false', subjectId: 'sub_sci', chapterId: 'chap_sci_02', topicId: 'top_sci_02_02',
    textPlain: "सत्य/असत्य: ग्रेफाइट एक अधातु है, फिर भी यह विद्युत का सुचालक है।",
    options: [{id:'opt_true',text:'सत्य'},{id:'opt_false',text:'असत्य'}], correctOptionIds:['opt_true'], explanationPlain:"सत्य। ग्रेफाइट कार्बन का एक अपररूप (allotrope) है। इसमें मुक्त इलेक्ट्रॉनों के कारण यह विद्युत का चालक है।", difficulty:'challenge', tags:['metals-nonmetals','graphite']
  },
{
    id: 'q_sci_b2_02_001', type: 'mcq', subjectId:'sub_sci', chapterId:'chap_sci_02', topicId:'top_sci_02_02',
    textPlain:"किस धातु को ऑक्सीजन के साथ गर्म करने पर काला रंग का कॉपर(II) ऑक्साइड (CuO) बनता है?", options:[{id:'opt_1',text:'लोहा'},{id:'opt_2',text:'कॉपर'},{id:'opt_3',text:'जिंक'},{id:'opt_4',text:'एल्युमिनियम'}], correctOptionIds:['opt_2'], explanationPlain:"कॉपर को ऑक्सीजन में गर्म करने पर उसकी सतह पर काला कॉपर(II) ऑक्साइड (CuO) बनता है।", difficulty:'medium', tags:['chemical-properties','metals']
  },
];
