import type { ID } from '../types';

export type TranslationDirection = 'hi-en' | 'en-hi';

export interface TranslationItem {
  id: ID;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  direction: TranslationDirection;
  prompt: string;
  acceptableAnswers: string[];
  displayAnswer: string;
  hint: string;
  explanation: string;
  grammarPoint: string;
  buildSteps?: string[];
}

export interface VocabularyItem {
  id: ID;
  level: 'beginner' | 'basic' | 'intermediate' | 'jnvst' | 'challenge';
  word: string;
  meaning: string;
  synonyms: string[];
  antonyms: string[];
  sentence: string;
  contextMeaning: string;
}

export const translationLabItems: TranslationItem[] = [
  { id:'tr_001',level:1,direction:'hi-en',prompt:'मैं स्कूल जाता हूँ।',acceptableAnswers:['I go to school.','I go to the school.'],displayAnswer:'I go to school.',hint:'मैं = I, जाता हूँ = go. यह सामान्य आदत है।',explanation:'सामान्य आदत के लिए Simple Present का प्रयोग होता है। I के साथ go आता है।',grammarPoint:'Simple Present: I/You/We/They + V1' },
  { id:'tr_002',level:1,direction:'hi-en',prompt:'वह खाना खाती है।',acceptableAnswers:['She eats food.','She eats.'],displayAnswer:'She eats food.',hint:'वह (लड़की) = She. खाने की क्रिया में eat का रूप बदलता है।',explanation:'She के साथ Simple Present में main verb में s/es लगता है: eat → eats.',grammarPoint:'Third-person singular: She + V1+s/es' },
  { id:'tr_003',level:1,direction:'hi-en',prompt:'यह एक किताब है।',acceptableAnswers:['This is a book.'],displayAnswer:'This is a book.',hint:'यह = This, है = is.',explanation:'एक गिनने योग्य singular noun से पहले सामान्यतः a/an आता है।',grammarPoint:'This + is + a/an + singular noun' },
  { id:'tr_004',level:1,direction:'hi-en',prompt:'मेरे पास एक पेन है।',acceptableAnswers:['I have a pen.'],displayAnswer:'I have a pen.',hint:'मेरे पास = I have.',explanation:'Possession बताने के लिए have का प्रयोग करें।',grammarPoint:'I/You/We/They + have' },
  { id:'tr_005',level:1,direction:'hi-en',prompt:'वे खुश हैं।',acceptableAnswers:['They are happy.'],displayAnswer:'They are happy.',hint:'वे = They; हैं = are.',explanation:'They के साथ be verb का रूप are आता है।',grammarPoint:'They + are + adjective' },

  { id:'tr_006',level:2,direction:'hi-en',prompt:'राम हर दिन क्रिकेट खेलता है।',acceptableAnswers:['Ram plays cricket every day.'],displayAnswer:'Ram plays cricket every day.',hint:'हर दिन आदत बताता है।',explanation:'Ram singular subject है, इसलिए play → plays.',grammarPoint:'Simple Present + third-person singular' },
  { id:'tr_007',level:2,direction:'hi-en',prompt:'हम शाम को पढ़ते हैं।',acceptableAnswers:['We study in the evening.'],displayAnswer:'We study in the evening.',hint:'हम = We; शाम को = in the evening.',explanation:'We के साथ verb का base form study आता है।',grammarPoint:'We + V1; time phrase: in the evening' },
  { id:'tr_008',level:2,direction:'hi-en',prompt:'मेरी बहन अभी सो रही है।',acceptableAnswers:['My sister is sleeping now.'],displayAnswer:'My sister is sleeping now.',hint:'अभी = now, इसलिए काम इस समय चल रहा है।',explanation:'अभी चल रहे कार्य के लिए Present Continuous: is + verb-ing.',grammarPoint:'Present Continuous: is/am/are + V-ing' },
  { id:'tr_009',level:2,direction:'hi-en',prompt:'क्या तुम मेरी मदद कर सकते हो?',acceptableAnswers:['Can you help me?'],displayAnswer:'Can you help me?',hint:'क्षमता/अनुरोध के लिए can उपयोगी है।',explanation:'Can के बाद main verb base form में आता है: help, न कि helps.',grammarPoint:'Can + subject + V1?' },
  { id:'tr_010',level:2,direction:'hi-en',prompt:'मेरी किताब मेज पर है।',acceptableAnswers:['My book is on the table.'],displayAnswer:'My book is on the table.',hint:'मेज की सतह पर होने के लिए on.',explanation:'किसी surface पर स्थिति बताने के लिए on प्रयोग होता है।',grammarPoint:'on + surface' },

  { id:'tr_011',level:3,direction:'hi-en',prompt:'मैंने कल अपना काम पूरा किया।',acceptableAnswers:['I finished my work yesterday.'],displayAnswer:'I finished my work yesterday.',hint:'कल = yesterday; यह पूरा हो चुका past action है।',explanation:'Finished एक regular past form है: finish → finished.',grammarPoint:'Simple Past: subject + V2' },
  { id:'tr_012',level:3,direction:'hi-en',prompt:'वह अभी अपना होमवर्क कर रही है।',acceptableAnswers:['She is doing her homework now.'],displayAnswer:'She is doing her homework now.',hint:'कर रही है = is doing.',explanation:'She के साथ is और do का -ing form doing आता है।',grammarPoint:'Present Continuous' },
  { id:'tr_013',level:3,direction:'hi-en',prompt:'हम अगले सप्ताह दिल्ली जाएँगे।',acceptableAnswers:['We will go to Delhi next week.'],displayAnswer:'We will go to Delhi next week.',hint:'अगले सप्ताह future clue है।',explanation:'Future Simple में will + V1 आता है।',grammarPoint:'will + V1' },
  { id:'tr_014',level:3,direction:'hi-en',prompt:'तुम्हें समय पर स्कूल पहुँचना चाहिए।',acceptableAnswers:['You should reach school on time.','You should reach the school on time.'],displayAnswer:'You should reach school on time.',hint:'चाहिए = should.',explanation:'Advice देने के लिए should + base verb प्रयोग होता है।',grammarPoint:'should + V1' },
  { id:'tr_015',level:3,direction:'hi-en',prompt:'मैंने यह किताब पहले पढ़ी है।',acceptableAnswers:['I have read this book before.'],displayAnswer:'I have read this book before.',hint:'काम हो चुका है और उसका संबंध वर्तमान अनुभव से है।',explanation:'Present Perfect में have + V3 आता है; read का V3 spelling read ही है।',grammarPoint:'Present Perfect: have/has + V3' },

  { id:'tr_016',level:4,direction:'hi-en',prompt:'जब मैं पहुँचा, वे खाना खा रहे थे।',acceptableAnswers:['When I arrived, they were eating.'],displayAnswer:'When I arrived, they were eating.',hint:'एक past action के समय दूसरा action चल रहा था।',explanation:'छोटा completed action Simple Past में और जारी background action Past Continuous में है।',grammarPoint:'Simple Past + Past Continuous' },
  { id:'tr_017',level:4,direction:'hi-en',prompt:'अगर बारिश होगी, हम घर पर रहेंगे।',acceptableAnswers:['If it rains, we will stay at home.'],displayAnswer:'If it rains, we will stay at home.',hint:'If-clause में सामान्य future condition के साथ present form आता है।',explanation:'First conditional में if-clause में Simple Present और main clause में will + V1 आता है।',grammarPoint:'If + Simple Present, will + V1' },
  { id:'tr_018',level:4,direction:'hi-en',prompt:'यह किताब मेरे भाई ने लिखी थी।',acceptableAnswers:['This book was written by my brother.'],displayAnswer:'This book was written by my brother.',hint:'किताब काम का receiver है; passive सोचें।',explanation:'Simple Past Passive = was/were + V3.',grammarPoint:'Past Passive: was/were + V3' },
  { id:'tr_019',level:4,direction:'hi-en',prompt:'शिक्षक ने कहा कि वह अगले दिन आएगा।',acceptableAnswers:['The teacher said that he would come the next day.'],displayAnswer:'The teacher said that he would come the next day.',hint:'said past reporting verb है; will backshift होकर would हो सकता है।',explanation:'Reported speech में will → would और tomorrow → the next day जैसे बदलाव context के अनुसार होते हैं।',grammarPoint:'Reported Speech: backshift + time-word change' },
  { id:'tr_020',level:4,direction:'hi-en',prompt:'रवि अपने भाई से लंबा है।',acceptableAnswers:['Ravi is taller than his brother.'],displayAnswer:'Ravi is taller than his brother.',hint:'दो लोगों की तुलना हो रही है।',explanation:'दो व्यक्तियों की तुलना में comparative degree और than का प्रयोग करें।',grammarPoint:'Comparative + than' },

  { id:'tr_021',level:5,direction:'hi-en',prompt:'यदि तुम नियमित अभ्यास करोगे, तो तुम अपनी गलतियाँ कम करोगे।',acceptableAnswers:['If you practise regularly, you will reduce your mistakes.','If you practice regularly, you will reduce your mistakes.'],displayAnswer:'If you practise regularly, you will reduce your mistakes.',hint:'पहले condition, फिर result लिखें।',explanation:'Condition में Simple Present और result में will + V1 आता है। practise/practice दोनों English varieties में मिलते हैं।',grammarPoint:'First Conditional' },
  { id:'tr_022',level:5,direction:'hi-en',prompt:'क्योंकि वह बीमार था, वह स्कूल नहीं गया।',acceptableAnswers:['Because he was ill, he did not go to school.','Because he was sick, he did not go to school.'],displayAnswer:'Because he was ill, he did not go to school.',hint:'कारण बताने के लिए because.',explanation:'Past negative में did not के बाद V1 आता है: did not go, न कि did not went.',grammarPoint:'Past negative: did not + V1' },
  { id:'tr_023',level:5,direction:'hi-en',prompt:'मुझे वह कहानी बहुत रोचक लगी क्योंकि उसका अंत अप्रत्याशित था।',acceptableAnswers:['I found the story very interesting because its ending was unexpected.'],displayAnswer:'I found the story very interesting because its ending was unexpected.',hint:'मुझे ... लगा = I found ...; अप्रत्याशित = unexpected.',explanation:'यहाँ found के बाद object + adjective pattern उपयोगी है।',grammarPoint:'find + object + adjective' },
  { id:'tr_024',level:5,direction:'en-hi',prompt:'The students carefully checked their answers before submitting the paper.',acceptableAnswers:['छात्रों ने प्रश्नपत्र जमा करने से पहले अपने उत्तर ध्यान से जाँचे।','विद्यार्थियों ने प्रश्नपत्र जमा करने से पहले अपने उत्तर ध्यान से जाँचे।'],displayAnswer:'छात्रों ने प्रश्नपत्र जमा करने से पहले अपने उत्तर ध्यान से जाँचे।',hint:'carefully = ध्यान से; before submitting = जमा करने से पहले.',explanation:'पहले मुख्य क्रिया checked समझें, फिर before phrase का समय-संबंध जोड़ें।',grammarPoint:'Past action + before + -ing phrase' },

  { id:'tr_025',level:6,direction:'hi-en',prompt:'हालाँकि प्रश्न कठिन था, लेकिन उसने धैर्यपूर्वक सभी विकल्पों की तुलना की।',acceptableAnswers:['Although the question was difficult, she compared all the options patiently.','Although the question was difficult, he compared all the options patiently.'],displayAnswer:'Although the question was difficult, she compared all the options patiently.',hint:'हालाँकि = although; धैर्यपूर्वक = patiently.',explanation:'Although contrast दिखाता है। मुख्य clause में past action compared है।',grammarPoint:'Although + clause' },
  { id:'tr_026',level:6,direction:'hi-en',prompt:'जब तक परीक्षा शुरू हुई, उम्मीदवार निर्देशों को ध्यान से पढ़ चुके थे।',acceptableAnswers:['By the time the examination started, the candidates had read the instructions carefully.','By the time the exam started, the candidates had read the instructions carefully.'],displayAnswer:'By the time the examination started, the candidates had read the instructions carefully.',hint:'एक past action दूसरे past action से पहले पूरा हो चुका था।',explanation:'पहले पूरा हुआ past action Past Perfect में जाता है: had + V3.',grammarPoint:'Past Perfect + Simple Past' },
  { id:'tr_027',level:6,direction:'en-hi',prompt:'If you understand the reason for a grammar rule, you are less likely to repeat the same mistake.',acceptableAnswers:['यदि आप व्याकरण के नियम का कारण समझते हैं, तो आप वही गलती दोबारा करने की कम संभावना रखते हैं।','यदि तुम व्याकरण के नियम का कारण समझते हो, तो तुम वही गलती दोबारा करने की कम संभावना रखते हो।'],displayAnswer:'यदि आप व्याकरण के नियम का कारण समझते हैं, तो आप वही गलती दोबारा करने की कम संभावना रखते हैं।',hint:'reason = कारण; less likely = कम संभावना.',explanation:'पहले if-condition और फिर उसके परिणाम को हिन्दी में स्वाभाविक क्रम में रखें।',grammarPoint:'Conditional meaning + probability expression' },
  { id:'tr_028',level:6,direction:'hi-en',prompt:'जिस छात्र ने अपनी गलतियों का विश्लेषण किया, उसने अगली practice में बेहतर प्रदर्शन किया।',acceptableAnswers:['The student who analysed his mistakes performed better in the next practice.','The student who analyzed his mistakes performed better in the next practice.'],displayAnswer:'The student who analysed his mistakes performed better in the next practice.',hint:'जिस छात्र ने = the student who; बेहतर प्रदर्शन किया = performed better.',explanation:'Who-clause student को describe करता है और main clause past result बताता है।',grammarPoint:'Relative clause with who' },
  { id:'tr_029',level:6,direction:'en-hi',prompt:'The passage suggests that careful reading is more useful than guessing an answer from a familiar word.',acceptableAnswers:['गद्यांश संकेत देता है कि किसी परिचित शब्द से उत्तर का अनुमान लगाने की तुलना में ध्यान से पढ़ना अधिक उपयोगी है।','गद्यांश बताता है कि किसी परिचित शब्द से उत्तर का अनुमान लगाने से ध्यान से पढ़ना अधिक उपयोगी है।'],displayAnswer:'गद्यांश संकेत देता है कि किसी परिचित शब्द से उत्तर का अनुमान लगाने की तुलना में ध्यान से पढ़ना अधिक उपयोगी है।',hint:'suggests = संकेत देता है; more useful than = की तुलना में अधिक उपयोगी.',explanation:'Comparison और inference दोनों का अर्थ बनाए रखते हुए translation करें।',grammarPoint:'Comparison + reporting meaning' },
  { id:'tr_030',level:6,direction:'hi-en',prompt:'यदि किसी विकल्प का एक हिस्सा गद्यांश से सही है लेकिन पूरा कथन प्रमाणित नहीं होता, तो उसे नहीं चुनना चाहिए।',acceptableAnswers:['If part of an option is correct according to the passage but the whole statement is not supported, it should not be chosen.'],displayAnswer:'If part of an option is correct according to the passage but the whole statement is not supported, it should not be chosen.',hint:'supported = प्रमाणित/समर्थित; should not be chosen = नहीं चुना जाना चाहिए।',explanation:'यह passive + conditional structure का मिश्रण है; पहले meaning को स्पष्ट रखें, फिर grammar लागू करें।',grammarPoint:'Conditional + Passive + should' },
];

export const vocabularyLabItems: VocabularyItem[] = [
  {id:'v_001',level:'beginner',word:'happy',meaning:'खुश',synonyms:['glad','cheerful'],antonyms:['sad'],sentence:'Ravi is happy today.',contextMeaning:'यहाँ happy व्यक्ति की खुशी बताता है।'},
  {id:'v_002',level:'beginner',word:'small',meaning:'छोटा',synonyms:['little'],antonyms:['large','big'],sentence:'We live in a small village.',contextMeaning:'small आकार में कम होने का अर्थ देता है।'},
  {id:'v_003',level:'beginner',word:'begin',meaning:'शुरू करना',synonyms:['start'],antonyms:['finish','end'],sentence:'The class will begin at nine.',contextMeaning:'begin किसी काम के शुरू होने को बताता है।'},
  {id:'v_004',level:'beginner',word:'help',meaning:'मदद करना',synonyms:['assist'],antonyms:['hinder'],sentence:'Please help me with this question.',contextMeaning:'help किसी व्यक्ति को काम करने में सहायता देना है।'},
  {id:'v_005',level:'beginner',word:'quick',meaning:'तेज़',synonyms:['fast','rapid'],antonyms:['slow'],sentence:'She gave a quick answer.',contextMeaning:'quick यहाँ answer की गति बताता है।'},
  {id:'v_006',level:'beginner',word:'clean',meaning:'साफ',synonyms:['tidy'],antonyms:['dirty'],sentence:'Keep your classroom clean.',contextMeaning:'clean ऐसी जगह/वस्तु के लिए है जिसमें गंदगी न हो।'},
  {id:'v_007',level:'beginner',word:'easy',meaning:'आसान',synonyms:['simple'],antonyms:['difficult'],sentence:'This question is easy.',contextMeaning:'easy कम कठिनाई वाला प्रश्न बताता है।'},
  {id:'v_008',level:'beginner',word:'quiet',meaning:'शांत',synonyms:['silent','calm'],antonyms:['noisy'],sentence:'The library is quiet.',contextMeaning:'quiet का अर्थ बहुत कम शोर वाला है।'},

  {id:'v_009',level:'basic',word:'careful',meaning:'सावधान',synonyms:['cautious'],antonyms:['careless'],sentence:'Be careful while crossing the road.',contextMeaning:'careful व्यक्ति के ध्यान से काम करने को बताता है।'},
  {id:'v_010',level:'basic',word:'improve',meaning:'सुधारना / बेहतर होना',synonyms:['develop','enhance'],antonyms:['worsen'],sentence:'Practice can improve your English.',contextMeaning:'improve किसी स्थिति को पहले से बेहतर करना है।'},
  {id:'v_011',level:'basic',word:'common',meaning:'सामान्य / आम',synonyms:['usual'],antonyms:['rare'],sentence:'This is a common spelling mistake.',contextMeaning:'common यहाँ बार-बार होने वाली गलती के लिए है।'},
  {id:'v_012',level:'basic',word:'correct',meaning:'सही',synonyms:['right','accurate'],antonyms:['wrong','incorrect'],sentence:'Choose the correct answer.',contextMeaning:'correct answer वह है जो प्रश्न के अनुसार सही हो।'},
  {id:'v_013',level:'basic',word:'different',meaning:'अलग',synonyms:['distinct','unlike'],antonyms:['same','similar'],sentence:'These two words have different meanings.',contextMeaning:'different दो चीज़ों में समानता न होने को बताता है।'},
  {id:'v_014',level:'basic',word:'simple',meaning:'सरल',synonyms:['easy','plain'],antonyms:['complex'],sentence:'Use simple English in the explanation.',contextMeaning:'simple ऐसी चीज़ है जिसे समझना या करना कठिन न हो।'},
  {id:'v_015',level:'basic',word:'choose',meaning:'चुनना',synonyms:['select'],antonyms:['reject'],sentence:'Choose the best option.',contextMeaning:'choose विकल्पों में से किसी एक को लेना है।'},
  {id:'v_016',level:'basic',word:'reason',meaning:'कारण',synonyms:['cause','basis'],antonyms:['result'],sentence:'Explain the reason for your answer.',contextMeaning:'reason किसी घटना या निर्णय के पीछे का कारण है।'},

  {id:'v_017',level:'intermediate',word:'carefully',meaning:'ध्यानपूर्वक',synonyms:['attentively'],antonyms:['carelessly'],sentence:'Read the passage carefully.',contextMeaning:'carefully बताता है कि काम ध्यान लगाकर किया गया।'},
  {id:'v_018',level:'intermediate',word:'available',meaning:'उपलब्ध',synonyms:['accessible'],antonyms:['unavailable'],sentence:'Use the available information.',contextMeaning:'available वह है जिसे उस समय उपयोग किया जा सकता है।'},
  {id:'v_019',level:'intermediate',word:'similar',meaning:'समान / मिलता-जुलता',synonyms:['alike'],antonyms:['different'],sentence:'The two sentences have similar meanings.',contextMeaning:'similar में पूरी समानता नहीं, लेकिन काफी समानता होती है।'},
  {id:'v_020',level:'intermediate',word:'require',meaning:'आवश्यक होना',synonyms:['need'],antonyms:['avoid'],sentence:'This question requires careful reading.',contextMeaning:'require किसी चीज़ के आवश्यक होने को बताता है।'},
  {id:'v_021',level:'intermediate',word:'identify',meaning:'पहचानना',synonyms:['recognise','detect'],antonyms:['miss'],sentence:'Identify the main idea of the passage.',contextMeaning:'identify किसी चीज़ को सही रूप से पहचानना है।'},
  {id:'v_022',level:'intermediate',word:'compare',meaning:'तुलना करना',synonyms:['contrast'],antonyms:['separate'],sentence:'Compare the two sentences.',contextMeaning:'compare दो या अधिक चीज़ों को समानता/अंतर के लिए देखना है।'},
  {id:'v_023',level:'intermediate',word:'evidence',meaning:'प्रमाण',synonyms:['proof','support'],antonyms:['disproof'],sentence:'Find evidence in the passage.',contextMeaning:'evidence वह जानकारी है जो किसी निष्कर्ष को support करती है।'},
  {id:'v_024',level:'intermediate',word:'infer',meaning:'निष्कर्ष निकालना',synonyms:['deduce','conclude'],antonyms:['misunderstand'],sentence:'Infer the writer’s meaning from the context.',contextMeaning:'infer का अर्थ सीधे लिखी बात से आगे संकेतों के आधार पर निष्कर्ष निकालना है।'},

  {id:'v_025',level:'jnvst',word:'passage',meaning:'गद्यांश / पाठ का अंश',synonyms:['extract','text'],antonyms:[],sentence:'Read the passage before answering.',contextMeaning:'passage यहाँ प्रश्न के साथ दिया गया छोटा text है।'},
  {id:'v_026',level:'jnvst',word:'main idea',meaning:'मुख्य विचार',synonyms:['central idea'],antonyms:['minor detail'],sentence:'Find the main idea of the passage.',contextMeaning:'main idea पूरे passage की केंद्रीय बात है।'},
  {id:'v_027',level:'jnvst',word:'detail',meaning:'विवरण',synonyms:['fact','particular'],antonyms:['overview'],sentence:'The question asks for a detail from the passage.',contextMeaning:'detail passage में दी गई कोई विशेष जानकारी है।'},
  {id:'v_028',level:'jnvst',word:'sequence',meaning:'क्रम',synonyms:['order'],antonyms:['disorder'],sentence:'Put the events in the correct sequence.',contextMeaning:'sequence घटनाओं या steps का सही क्रम है।'},
  {id:'v_029',level:'jnvst',word:'support',meaning:'समर्थन करना / प्रमाण देना',synonyms:['back','confirm'],antonyms:['oppose'],sentence:'Which sentence supports the answer?',contextMeaning:'support यहाँ किसी उत्तर को evidence से मजबूत करना है।'},
  {id:'v_030',level:'jnvst',word:'context',meaning:'संदर्भ',synonyms:['setting','background'],antonyms:[],sentence:'Guess the word’s meaning from the context.',contextMeaning:'context आसपास की information है जिससे meaning समझने में मदद मिलती है।'},
  {id:'v_031',level:'jnvst',word:'regularly',meaning:'नियमित रूप से',synonyms:['frequently','consistently'],antonyms:['rarely'],sentence:'Students who read regularly improve their vocabulary.',contextMeaning:'regularly किसी काम को बार-बार और routine के अनुसार करने को बताता है।'},
  {id:'v_032',level:'jnvst',word:'unusual',meaning:'असामान्य',synonyms:['rare','uncommon'],antonyms:['usual','common'],sentence:'The passage describes an unusual event.',contextMeaning:'unusual सामान्य से अलग या कम मिलने वाला है।'},

  {id:'v_033',level:'challenge',word:'cooperation',meaning:'सहयोग',synonyms:['collaboration','teamwork'],antonyms:['conflict'],sentence:'The project succeeded through cooperation.',contextMeaning:'cooperation में लोग एक साझा लक्ष्य के लिए मिलकर काम करते हैं।'},
  {id:'v_034',level:'challenge',word:'accurate',meaning:'सटीक',synonyms:['correct','precise'],antonyms:['inaccurate'],sentence:'Give an accurate answer based on the passage.',contextMeaning:'accurate का अर्थ तथ्य या प्रश्न के अनुसार सही और precise होना है।'},
  {id:'v_035',level:'challenge',word:'essential',meaning:'आवश्यक',synonyms:['necessary','vital'],antonyms:['optional','unnecessary'],sentence:'Careful reading is essential for comprehension.',contextMeaning:'essential वह है जिसके बिना लक्ष्य पूरा करना कठिन हो।'},
  {id:'v_036',level:'challenge',word:'relevant',meaning:'प्रासंगिक',synonyms:['related','applicable'],antonyms:['irrelevant'],sentence:'Choose only relevant information.',contextMeaning:'relevant वही information है जो प्रश्न या विषय से सीधे जुड़ी हो।'},
  {id:'v_037',level:'challenge',word:'distractor',meaning:'भ्रमित करने वाला विकल्प',synonyms:['misleading option'],antonyms:[],sentence:'A good distractor looks possible but is not correct.',contextMeaning:'MCQ में distractor ऐसा गलत option है जो सही जैसा लग सकता है।'},
  {id:'v_038',level:'challenge',word:'interpret',meaning:'अर्थ समझना / व्याख्या करना',synonyms:['explain','understand'],antonyms:['misinterpret'],sentence:'Interpret the sentence using its context.',contextMeaning:'interpret का अर्थ context के आधार पर meaning समझना है।'},
  {id:'v_039',level:'challenge',word:'contrast',meaning:'अंतर दिखाना / विरोध',synonyms:['difference','distinction'],antonyms:['similarity'],sentence:'The passage contrasts two different ideas.',contextMeaning:'contrast दो ideas में स्पष्ट अंतर दिखाता है।'},
  {id:'v_040',level:'challenge',word:'conclusion',meaning:'निष्कर्ष',synonyms:['inference','result'],antonyms:['introduction'],sentence:'The final sentence gives a clear conclusion.',contextMeaning:'conclusion किसी विचार या तर्क से निकला अंतिम निष्कर्ष है।'},
];

export const translationLevels = [
  { level:1, title:'Foundation', hindi:'बहुत आसान वाक्य और रोज़मर्रा की भाषा' },
  { level:2, title:'Everyday English', hindi:'सरल दैनिक वाक्य' },
  { level:3, title:'Grammar Builder', hindi:'मुख्य tenses, modals और prepositions' },
  { level:4, title:'Mixed Grammar', hindi:'एक से अधिक grammar patterns' },
  { level:5, title:'Strong Sentence', hindi:'लंबे और context-based वाक्य' },
  { level:6, title:'Exam Bridge', hindi:'JNVST-style reading और grammar thinking' },
] as const;

export const vocabularyLevels = [
  { id:'beginner', title:'Beginner', hindi:'बुनियादी रोज़मर्रा के शब्द' },
  { id:'basic', title:'Basic', hindi:'स्कूल और सामान्य English' },
  { id:'intermediate', title:'Intermediate', hindi:'समझ और grammar support vocabulary' },
  { id:'jnvst', title:'JNVST-oriented', hindi:'परीक्षा में उपयोगी comprehension vocabulary' },
  { id:'challenge', title:'Challenge', hindi:'उच्च लेकिन exam-relevant शब्द' },
] as const;
