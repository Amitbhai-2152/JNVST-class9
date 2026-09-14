import { Question } from '../../types';

export const hindiQuestionsPart2: Question[] = [
{ id: 'q_hin_b1_07_001', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_01', textPlain: "व्याकरण की दृष्टि से शुद्ध वाक्य का चयन करें:", options: [{ id: 'opt_1', text: 'मेरे को घर जाना है।' }, { id: 'opt_2', text: 'मुझे घर जाना है।' }, { id: 'opt_3', text: 'मैं घर जाना है।' }, { id: 'opt_4', text: 'मुझे घर जाने हैं।' }], correctOptionIds: ['opt_2'], explanationPlain: "सर्वनाम का सही रूप 'मुझे' होता है, न कि 'मेरे को' या 'मैं'। अतः 'मुझे घर जाना है' पूर्णतः शुद्ध है।", difficulty: 'easy', tags: ['sentence-correction', 'pronoun'] },
{ id: 'q_hin_b1_07_002', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_01', textPlain: "निम्नलिखित में से किस वाक्य में पदक्रम (Word Order) संबंधी अशुद्धि है?", options: [{ id: 'opt_1', text: 'एक फूलों की माला ले आइए।' }, { id: 'opt_2', text: 'बच्चे मैदान में खेल रहे हैं।' }, { id: 'opt_3', text: 'कृपया शांति बनाए रखें।' }, { id: 'opt_4', text: 'वह कल अपने गाँव जाएगा।' }], correctOptionIds: ['opt_1'], explanationPlain: "अशुद्ध वाक्य 'एक फूलों की माला ले आइए' है, क्योंकि माला 'एक' होनी चाहिए, फूल नहीं। इसका शुद्ध रूप होगा: 'फूलों की एक माला ले आइए।'", difficulty: 'medium', tags: ['sentence-correction', 'word-order'] },
{ id: 'q_hin_b1_07_003', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_01', textPlain: "पुनरुक्ति (Redundancy) अशुद्धि से मुक्त शुद्ध वाक्य की पहचान करें:", options: [{ id: 'opt_1', text: 'वह वापस लौट आया।' }, { id: 'opt_2', text: 'कृपया सप्रमाण सहित उत्तर दें।' }, { id: 'opt_3', text: 'विंध्याचल पर्वत हरा-भरा है।' }, { id: 'opt_4', text: 'केवल तुम ही यह काम कर सकते हो।' }], correctOptionIds: ['opt_4'], explanationPlain: "'वापस-लौट', 'सप्रमाण-सहित', और 'विंध्याचल-पर्वत' में एक ही अर्थ वाले शब्दों की पुनरुक्ति है। 'केवल तुम ही...' व्याकरण सम्मत है।", difficulty: 'hard', tags: ['sentence-correction', 'redundancy'] },
{ id: 'q_hin_b1_07_004', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_01', textPlain: "निजवाचक सर्वनाम के प्रयोग की दृष्टि से शुद्ध वाक्य पहचानें:", options: [{ id: 'opt_1', text: 'हम हमारी पुस्तक पढ़ते हैं।' }, { id: 'opt_2', text: 'हम अपनी पुस्तक पढ़ते हैं।' }, { id: 'opt_3', text: 'मैं मेरी पुस्तक पढ़ता हूँ।' }, { id: 'opt_4', text: 'तुम तुम्हारी पुस्तक पढ़ो।' }], correctOptionIds: ['opt_2'], explanationPlain: "कर्ता के साथ अपनेपन का बोध कराने के लिए 'अपनी' या 'अपना' (निजवाचक सर्वनाम) का प्रयोग शुद्ध माना जाता है।", difficulty: 'hard', tags: ['sentence-correction', 'pronoun-usage'] },
{ id: 'q_hin_b1_07_005', type: 'multiple-select', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_01', textPlain: "कारक तथा परसर्ग संबंधी त्रुटियों वाले अशुद्ध वाक्यों का चयन करें: (एक से अधिक)", options: [{ id: 'opt_1', text: 'मैंने आज दिल्ली जाना है।' }, { id: 'opt_2', text: 'तेरे को क्या चाहिए?' }, { id: 'opt_3', text: 'मोहन ने खाना खा लिया है।' }, { id: 'opt_4', text: 'वह छत पर बैठा है।' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: "'मैंने' की जगह 'मुझे' और 'तेरे को' की जगह 'तुझे' या 'तुम्हें' होना चाहिए। विकल्प 3 और 4 व्याकरणिक दृष्टि से पूर्णतः शुद्ध हैं।", difficulty: 'challenge', tags: ['sentence-correction', 'multiple-select'] },
{ id: 'q_hin_b1_08_001', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_02', textPlain: "वाक्य: 'सूरज निकला और पक्षी चहचहाने लगे।' यह रचना के आधार पर किस प्रकार का वाक्य है?", options: [{ id: 'opt_1', text: 'सरल वाक्य' }, { id: 'opt_2', text: 'संयुक्त वाक्य' }, { id: 'opt_3', text: 'मिश्र वाक्य' }, { id: 'opt_4', text: 'प्रश्नवाचक वाक्य' }], correctOptionIds: ['opt_2'], explanationPlain: "जब दो स्वतंत्र उपवाक्य 'और', 'तथा', 'किंतु' जैसे समुच्चयबोधक अव्यय से जुड़े हों, तो वह संयुक्त वाक्य कहलाता है।", difficulty: 'easy', tags: ['sentence-transformation', 'compound-sentence'] },
{ id: 'q_hin_b1_08_002', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_02', textPlain: "निम्नलिखित में से 'मिश्र वाक्य' (Complex Sentence) कौन-सा है?", options: [{ id: 'opt_1', text: 'राम खेलता है।' }, { id: 'opt_2', text: 'जो परिश्रम करेगा, वह सफल होगा।' }, { id: 'opt_3', text: 'मोहन आया और सो गया।' }, { id: 'opt_4', text: 'वह पढ़ लिखकर अधिकारी बना।' }], correctOptionIds: ['opt_2'], explanationPlain: "मिश्र वाक्य में एक प्रधान उपवाक्य और एक या अधिक आश्रित उपवाक्य होते हैं, जो 'जो-वह', 'कि', 'जैसे-वैसे' से जुड़े होते हैं।", difficulty: 'medium', tags: ['sentence-transformation', 'complex-sentence'] },
{ id: 'q_hin_b1_08_003', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_02', textPlain: "'बीमार होने के कारण वह स्कूल नहीं गया।' इसका उचित संयुक्त वाक्य रूप क्या होगा?", options: [{ id: 'opt_1', text: 'वह बीमार था इसलिए स्कूल नहीं गया।' }, { id: 'opt_2', text: 'जब वह बीमार हुआ तब स्कूल नहीं गया।' }, { id: 'opt_3', text: 'क्योंकि वह बीमार था इसलिए स्कूल नहीं गया।' }, { id: 'opt_4', text: 'वह स्कूल नहीं गया क्योंकि वह बीमार था।' }], correctOptionIds: ['opt_1'], explanationPlain: "संयुक्त वाक्य में दो स्वतंत्र वाक्य 'इसलिए' योजक से जोड़े गए हैं: 'वह बीमार था' + 'इसलिए स्कूल नहीं गया'।", difficulty: 'medium', tags: ['sentence-transformation', 'simple-to-compound'] },
{ id: 'q_hin_b1_08_004', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_02', textPlain: "वाक्य: 'मैं जानता हूँ कि तुम ईमानदार हो।' इस वाक्य में 'कि तुम ईमानदार हो' कौन-सा आश्रित उपवाक्य है?", options: [{ id: 'opt_1', text: 'संज्ञा उपवाक्य' }, { id: 'opt_2', text: 'विशेषण उपवाक्य' }, { id: 'opt_3', text: 'क्रियाविशेषण उपवाक्य' }, { id: 'opt_4', text: 'मुख्य उपवाक्य' }], correctOptionIds: ['opt_1'], explanationPlain: "'कि' से शुरू होने वाले आश्रित उपवाक्य जो मुख्य वाक्य की क्रिया के कर्म या पूरक का कार्य करते हैं, संज्ञा उपवाक्य कहलाते हैं।", difficulty: 'hard', tags: ['sentence-transformation', 'clauses'] },
{ id: 'q_hin_b1_08_005', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_04', topicId: 'top_hin_04_02', textPlain: "संयुक्त वाक्य: 'उसने मेहनत की परंतु सफल नहीं हुआ।' इसका अर्थ बदले बिना सटीक सरल वाक्य क्या होगा?", options: [{ id: 'opt_1', text: 'मेहनत करने पर भी वह सफल नहीं हुआ।' }, { id: 'opt_2', text: 'उसने मेहनत की इसलिए सफल नहीं हुआ।' }, { id: 'opt_3', text: 'यद्यपि उसने मेहनत की तथापि सफल नहीं हुआ।' }, { id: 'opt_4', text: 'जब उसने मेहनत की तब सफल नहीं हुआ।' }], correctOptionIds: ['opt_1'], explanationPlain: "सरल वाक्य में केवल एक मुख्य क्रिया (उद्देश्य-विधेय) होती है। 'मेहनत करने पर भी...' एक वाक्यांश बनकर सरल रूप में सटीक अर्थ दे रहा है।", difficulty: 'challenge', tags: ['sentence-transformation', 'compound-to-simple'] },
{ id: 'q_hin_b1_09_001', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_01', textPlain: "'आँखों का तारा' मुहावरे का सही अर्थ क्या है?", options: [{ id: 'opt_1', text: 'आँख की बीमारी' }, { id: 'opt_2', text: 'बहुत प्यारा होना' }, { id: 'opt_3', text: 'रात में दिखाई देना' }, { id: 'opt_4', text: 'दुश्मन होना' }], correctOptionIds: ['opt_2'], explanationPlain: "'आँखों का तारा' मुहावरे का अर्थ अत्यधिक प्रिय या बहुत प्यारा होना होता है।", difficulty: 'easy', tags: ['idioms', 'meaning'] },
{ id: 'q_hin_b1_09_002', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_01', textPlain: "सही मुहावरे से वाक्य पूरा करें: 'पुलिस को देखते ही चोर ______ गए।'", options: [{ id: 'opt_1', text: 'नौ दो ग्यारह हो' }, { id: 'opt_2', text: 'आँखों में धूल झोंक' }, { id: 'opt_3', text: 'ईद का चाँद हो' }, { id: 'opt_4', text: 'आग बबूला हो' }], correctOptionIds: ['opt_1'], explanationPlain: "'नौ दो ग्यारह होना' का अर्थ भाग जाना होता है, जो इस संदर्भ (पुलिस और चोर) के लिए एकदम सटीक है।", difficulty: 'medium', tags: ['idioms', 'usage'] },
{ id: 'q_hin_b1_09_003', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_01', textPlain: "'घी के दीये जलाना' मुहावरे का सटीक अर्थ है:", options: [{ id: 'opt_1', text: 'क्रोधित होना' }, { id: 'opt_2', text: 'खुशियाँ मनाना' }, { id: 'opt_3', text: 'रोशनी करना' }, { id: 'opt_4', text: 'अत्यधिक खर्च करना' }], correctOptionIds: ['opt_2'], explanationPlain: "घी के दीये जलाना अर्थात् बहुत अधिक प्रसन्न होना या खुशियाँ मनाना (जैसे किसी बड़ी सफलता पर)।", difficulty: 'hard', tags: ['idioms', 'meaning'] },
{ id: 'q_hin_b1_09_004', type: 'multiple-select', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_01', textPlain: "निम्नलिखित में से कौन-से मुहावरे और उनके अर्थ सही सुमेलित हैं? (एक से अधिक सही हो सकते हैं)", options: [{ id: 'opt_1', text: 'आग बबूला होना - बहुत क्रोधित होना' }, { id: 'opt_2', text: 'आसमान से गिरना - बहुत ऊँचाई प्राप्त करना' }, { id: 'opt_3', text: 'एक पंथ दो काज - एक साथ दो लाभ' }, { id: 'opt_4', text: 'हाथ मलना - सर्दियाँ आना' }], correctOptionIds: ['opt_1', 'opt_3'], explanationPlain: "विकल्प 1 और 3 सही हैं। 'हाथ मलना' का अर्थ पछताना और 'आसमान से गिरना' का अर्थ मुसीबत में पड़ना होता है।", difficulty: 'hard', tags: ['idioms', 'multiple-select'] },
{ id: 'q_hin_b1_09_005', type: 'true-false', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_01', textPlain: "सत्य/असत्य: मुहावरे स्वयं में पूर्ण वाक्य होते हैं और इनका स्वतंत्र प्रयोग किया जा सकता है।", options: [{ id: 'opt_true', text: 'सत्य' }, { id: 'opt_false', text: 'असत्य' }], correctOptionIds: ['opt_false'], explanationPlain: "असत्य। मुहावरे वाक्यांश (वाक्य के अंश) होते हैं। इनका प्रयोग वाक्य के बीच में होता है; स्वतंत्र रूप से प्रयोग लोकोक्तियों का होता है।", difficulty: 'challenge', tags: ['idioms', 'grammar-concept'] },
{ id: 'q_hin_b1_10_001', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_02', textPlain: "'जिसकी लाठी उसकी भैंस' लोकोक्ति का सटीक अर्थ क्या है?", options: [{ id: 'opt_1', text: 'भैंस चराने के लिए लाठी आवश्यक है' }, { id: 'opt_2', text: 'शक्तिशाली की ही जीत होती है' }, { id: 'opt_3', text: 'कमज़ोर व्यक्ति हमेशा हारता है' }, { id: 'opt_4', text: 'अन्याय के खिलाफ आवाज उठाना' }], correctOptionIds: ['opt_2'], explanationPlain: "'जिसकी लाठी उसकी भैंस' का अर्थ है कि जिसके पास बल या शक्ति होती है, उसी की विजय होती है।", difficulty: 'easy', tags: ['proverbs', 'meaning'] },
{ id: 'q_hin_b1_10_002', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_02', textPlain: "इनमें से किस परिस्थिति में 'अधजल गगरी छलकत जाए' लोकोक्ति का प्रयोग उचित है?", options: [{ id: 'opt_1', text: 'जब कोई व्यक्ति बहुत ज्ञानी होकर शांत रहता है' }, { id: 'opt_2', text: 'जब पानी का घड़ा आधा भरा होने पर छलकने लगता है' }, { id: 'opt_3', text: 'जब कम ज्ञान या गुण वाला व्यक्ति अधिक दिखावा करता है' }, { id: 'opt_4', text: 'जब व्यक्ति अपनी मेहनत से सफल होता है' }], correctOptionIds: ['opt_3'], explanationPlain: "यह लोकोक्ति उन लोगों के लिए प्रयुक्त होती है जो कम ज्ञान या साधन होने के बावजूद बहुत अधिक दिखावा या बड़बोलापन करते हैं।", difficulty: 'medium', tags: ['proverbs', 'usage'] },
{ id: 'q_hin_b1_10_003', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_02', textPlain: "लोकोक्ति पूर्ण करें: 'काला अक्षर ______ बराबर।'", options: [{ id: 'opt_1', text: 'गधे' }, { id: 'opt_2', text: 'भैंस' }, { id: 'opt_3', text: 'गाय' }, { id: 'opt_4', text: 'बंदर' }], correctOptionIds: ['opt_2'], explanationPlain: "सही लोकोक्ति 'काला अक्षर भैंस बराबर' है, जिसका अर्थ है पूर्णतः निरक्षर (अनपढ़) होना।", difficulty: 'medium', tags: ['proverbs', 'completion'] },
{ id: 'q_hin_b1_10_004', type: 'mcq', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_02', textPlain: "'नाच न जाने आँगन टेढ़ा' लोकोक्ति का आशय है:", options: [{ id: 'opt_1', text: 'अपनी असफलता का दोष दूसरों या परिस्थितियों पर मढ़ना' }, { id: 'opt_2', text: 'टेढ़े आँगन में नृत्य का प्रयास करना' }, { id: 'opt_3', text: 'बिना तैयारी के कोई बड़ा कार्य प्रारंभ करना' }, { id: 'opt_4', text: 'कठोर परिश्रम के बाद भी सफलता न मिलना' }], correctOptionIds: ['opt_1'], explanationPlain: "जब किसी व्यक्ति को कोई कार्य करना नहीं आता और वह अपनी कमी छिपाने के लिए साधनों या परिस्थितियों को दोष देता है, तब इसका प्रयोग होता है।", difficulty: 'hard', tags: ['proverbs', 'meaning'] },
{ id: 'q_hin_b1_10_005', type: 'multiple-select', subjectId: 'sub_hin', chapterId: 'chap_hin_05', topicId: 'top_hin_05_02', textPlain: "निम्नलिखित में से कौन-सी लोकोक्तियाँ समान अर्थ (समानार्थी) रखती हैं? (एक से अधिक सही हो सकते हैं)", options: [{ id: 'opt_1', text: 'एक अनार सौ बीमार' }, { id: 'opt_2', text: 'ऊँट के मुँह में जीरा' }, { id: 'opt_3', text: 'आम के आम गुठलियों के दाम' }, { id: 'opt_4', text: 'अकेला चना भाड़ नहीं फोड़ सकता' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: "दोनों का तात्पर्य वस्तु की अत्यधिक कमी से है: 'एक अनार सौ बीमार' (चीज़ एक, माँगने वाले अनेक) और 'ऊँट के मुँह में जीरा' (आवश्यकता से बहुत कम)। दोनों scarcity को दर्शाते हैं।", difficulty: 'challenge', tags: ['proverbs', 'advanced-comparison'] },
{
    id: 'q_hin_b2_01_001',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_01',
    topicId: 'top_hin_01_01',
    textPlain: "हिंदी वर्णमाला में स्वरों की मूल संख्या कितनी मानी जाती है?",
    options: [
      { id: 'opt_1', text: '9' },
      { id: 'opt_2', text: '10' },
      { id: 'opt_3', text: '11' },
      { id: 'opt_4', text: '13' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "हिंदी वर्णमाला में मानक रूप से 11 मूल स्वर माने जाते हैं (अ, आ, इ, ई, उ, ऊ, ऋ, ए, ऐ, ओ, औ)।",
    difficulty: 'easy',
    tags: ['varn-vichar', 'swar']
  },
{
    id: 'q_hin_b2_01_002',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_01',
    topicId: 'top_hin_01_01',
    textPlain: "निम्नलिखित में से शुद्ध वर्तनी वाले शब्द को पहचानें:",
    options: [
      { id: 'opt_1', text: 'अध्ययन' },
      { id: 'opt_2', text: 'अधयन' },
      { id: 'opt_3', text: 'अध्यन' },
      { id: 'opt_4', text: 'अधय्यन' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: "सही वर्तनी 'अध्ययन' है, जिसमें आधा 'ध' और दो 'य' होते हैं।",
    difficulty: 'medium',
    tags: ['spelling', 'shuddh-ashuddh']
  },
{
    id: 'q_hin_b2_01_003',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_01',
    topicId: 'top_hin_01_01',
    textPlain: "‘ज्ञ’ वर्ण किन दो व्यंजनों के संयोग (मिलने) से बना है?",
    options: [
      { id: 'opt_1', text: 'ज् + ञ' },
      { id: 'opt_2', text: 'ग + य' },
      { id: 'opt_3', text: 'ज् + य' },
      { id: 'opt_4', text: 'ग् + ञ' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: "संयुक्त व्यंजन 'ज्ञ', 'ज्' (आधा ज) और 'ञ' के मिलने से बनता है।",
    difficulty: 'medium',
    tags: ['varn-vichar', 'sanyukt-vyanjan']
  },
{
    id: 'q_hin_b2_01_004',
    type: 'multiple-select',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_01',
    topicId: 'top_hin_01_01',
    textPlain: "निम्नलिखित में से अशुद्ध वर्तनी वाले शब्दों का चयन करें: (एक से अधिक सही हो सकते हैं)",
    options: [
      { id: 'opt_1', text: 'कवियत्री' },
      { id: 'opt_2', text: 'पुजनीय' },
      { id: 'opt_3', text: 'अहल्या' },
      { id: 'opt_4', text: 'अंतर्धान' }
    ],
    correctOptionIds: ['opt_1', 'opt_2'],
    explanationPlain: "अशुद्ध शब्द 'कवियत्री' (सही: कवयित्री) और 'पुजनीय' (सही: पूजनीय) हैं। 'अहल्या' और 'अंतर्धान' पूर्णतः शुद्ध हैं।",
    difficulty: 'hard',
    tags: ['spelling', 'multiple-select']
  },
{
    id: 'q_hin_b2_01_005',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_01',
    topicId: 'top_hin_01_01',
    textPlain: "‘उष्म व्यंजन’ के अंतर्गत कौन-से वर्ण आते हैं?",
    options: [
      { id: 'opt_1', text: 'य, र, ल, व' },
      { id: 'opt_2', text: 'क्ष, त्र, ज्ञ, श्र' },
      { id: 'opt_3', text: 'श, ष, स, ह' },
      { id: 'opt_4', text: 'च, छ, ज, झ' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "जिन व्यंजनों के उच्चारण में हवा मुख से रगड़ खाकर ऊष्मा (गर्मी) पैदा करती है, उन्हें ऊष्म व्यंजन कहते हैं (श, ष, स, ह)।",
    difficulty: 'challenge',
    tags: ['varn-vichar', 'ushma-vyanjan']
  },
{
    id: 'q_hin_b2_02_001',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_02',
    topicId: 'top_hin_02_01',
    textPlain: "'सूर्य' शब्द उत्पत्ति के आधार पर किस प्रकार का शब्द है?",
    options: [
      { id: 'opt_1', text: 'तद्भव' },
      { id: 'opt_2', text: 'तत्सम' },
      { id: 'opt_3', text: 'देशज' },
      { id: 'opt_4', text: 'विदेशी' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "संस्कृत का मूल शब्द 'सूर्य' बिना किसी परिवर्तन के हिंदी में प्रयुक्त होता है, इसलिए यह तत्सम है (तद्भव: सूरज)।",
    difficulty: 'easy',
    tags: ['shabdbhed', 'tatsam']
  },
{
    id: 'q_hin_b2_02_002',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_02',
    topicId: 'top_hin_02_01',
    textPlain: "'कबूतर' शब्द किस भाषा-स्रोत से हिंदी में आया है?",
    options: [
      { id: 'opt_1', text: 'तत्सम (संस्कृत)' },
      { id: 'opt_2', text: 'फारसी (विदेशी)' },
      { id: 'opt_3', text: 'देशज' },
      { id: 'opt_4', text: 'तुर्की (विदेशी)' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "'कबूतर' एक विदेशी मूल का शब्द है जो फारसी भाषा से हिंदी में आया है।",
    difficulty: 'medium',
    tags: ['shabdbhed', 'videshi']
  },
{
    id: 'q_hin_b2_02_003',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_02',
    topicId: 'top_hin_02_01',
    textPlain: "निम्नलिखित में से कौन-सा शब्द 'देशज' (स्थानीय मूल) का है?",
    options: [
      { id: 'opt_1', text: 'खिड़की' },
      { id: 'opt_2', text: 'अस्पताल' },
      { id: 'opt_3', text: 'ग्राम' },
      { id: 'opt_4', text: 'डॉक्टर' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: "जिन शब्दों की उत्पत्ति का कोई व्याकरणिक स्रोत नहीं मिलता और वे लोक-व्यवहार से बने हों, उन्हें देशज कहते हैं (जैसे- खिड़की, लोटा)।",
    difficulty: 'easy',
    tags: ['shabdbhed', 'deshaj']
  },
{
    id: 'q_hin_b2_02_004',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_02',
    topicId: 'top_hin_02_01',
    textPlain: "'अश्रु' शब्द का सही तद्भव रूप पहचानें:",
    options: [
      { id: 'opt_1', text: 'आँख' },
      { id: 'opt_2', text: 'आँसू' },
      { id: 'opt_3', text: 'नीर' },
      { id: 'opt_4', text: 'रोना' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: "संस्कृत के 'अश्रु' शब्द का परिवर्तित तद्भव रूप 'आँसू' होता है।",
    difficulty: 'hard',
    tags: ['shabdbhed', 'tadbhav']
  },
{
    id: 'q_hin_b2_02_005',
    type: 'mcq',
    subjectId: 'sub_hin',
    chapterId: 'chap_hin_02',
    topicId: 'top_hin_02_01',
    textPlain: "निम्नलिखित में से किस विकल्प में तत्सम-तद्भव का युग्म सही नहीं है?",
    options: [
      { id: 'opt_1', text: 'हस्त - हाथ' },
      { id: 'opt_2', text: 'दधि - दही' },
      { id: 'opt_3', text: 'मक्षिका - मछली' },
      { id: 'opt_4', text: 'कर्पूर - कपूर' }
    ],
    correctOptionIds: ['opt_3'],
    explanationPlain: "'मक्षिका' का तद्भव रूप 'मक्खी' होता है, 'मछली' नहीं (मछली का तत्सम 'मत्स्य' होता है)।",
    difficulty: 'challenge',
    tags: ['shabdbhed', 'error-identification']
  },
];
