import type { ID } from '../types';

export interface EnglishMasteryUnit {
  topicId: ID;
  title: string;
  hindiFocus: string;
  coreSkills: string[];
  mustKnow: string[];
  quickFacts: string[];
  examTraps: string[];
  examples: string[];
  solveMethod: string[];
}

export const englishMasteryUnits: EnglishMasteryUnit[] = [
  {
    topicId: 'top_eng_01_01',
    title: 'Comprehension (Unseen Passage)',
    hindiFocus: 'पहले गद्यांश का अर्थ समझें, फिर उत्तर के लिए उसी पाठ में प्रमाण खोजें।',
    coreSkills: ['मुख्य विचार पहचानना', 'तथ्यात्मक जानकारी ढूँढना', 'संदर्भ से शब्दार्थ समझना', 'निष्कर्ष और लेखक का उद्देश्य पहचानना'],
    mustKnow: ['उत्तर गद्यांश से प्रमाणित होना चाहिए; केवल सामान्य ज्ञान पर्याप्त नहीं है।', 'Main idea पूरे passage को cover करता है, केवल एक detail को नहीं।', 'Inference पाठ के संकेतों से निकाला जाता है, मनमाना अनुमान नहीं।'],
    quickFacts: ['पहले विषय और structure पहचानें।', 'Because, however, therefore, finally जैसे संकेतक शब्द देखें।', 'कठिन शब्द का अर्थ आसपास के वाक्यों से निकालें।'],
    examTraps: ['एक सही detail को पूरे passage का main idea मान लेना।', 'ऐसा विकल्प चुनना जो सामान्य रूप से सही हो लेकिन passage में समर्थित न हो।', 'Inference को guess समझ लेना।'],
    examples: ['Main idea: “The passage explains why trees are useful.” → पूरे passage की केंद्रीय बात।', 'Detail: “Ravi planted three trees.” → सीधे दी गई जानकारी।', 'Inference: यदि passage में Ravi रोज़ पौधों की देखभाल करता है, तो वह जिम्मेदार है—यह संकेत से निकला निष्कर्ष है।'],
    solveMethod: ['Question type पहचानें: main idea, detail, inference, vocabulary या sequence।', 'Relevant lines खोजें और option को उसी evidence से मिलाएँ।', 'जो option passage से पूरी तरह supported नहीं है उसे हटाएँ।'],
  },
  {
    topicId: 'top_eng_02_01',
    title: 'Word and Sentence Structure',
    hindiFocus: 'अंग्रेज़ी sentence को Subject, Verb और बाकी parts में तोड़कर समझें।',
    coreSkills: ['Subject और Predicate', 'Noun phrase पहचानना', 'Verb और Object पहचानना', 'पूर्ण और अपूर्ण sentence अलग करना'],
    mustKnow: ['पूरा noun phrase subject हो सकता है।', 'Predicate में verb और उससे जुड़े शब्द आते हैं।', 'Phrase और clause में subject-verb relationship का अंतर समझें।'],
    quickFacts: ['S + V + O सामान्य sentence pattern है।', 'Verb खोजने से sentence structure जल्दी खुलता है।', 'Imperative sentence में subject अक्सर understood “you” होता है।'],
    examTraps: ['केवल पहला noun subject मान लेना।', 'Fragment को complete sentence समझ लेना।', 'शब्दों का grammar देखकर अर्थ और context को छोड़ देना।'],
    examples: ['The clever boy solved the puzzle. → Subject = The clever boy; Verb = solved; Object = the puzzle.', 'The girl with her friends is ready. → Subject = The girl; “with her friends” अलग phrase है।', 'Where do you live? → question word + auxiliary + subject + main verb.'],
    solveMethod: ['Main verb पहले खोजें।', 'Verb से subject और object का relation पहचानें।', 'पूरा sentence पढ़कर grammar और meaning दोनों जाँचें।'],
  },
  {
    topicId: 'top_eng_02_02',
    title: 'Spelling Rules',
    hindiFocus: 'शब्द को केवल याद न करें; spelling pattern और common error दोनों पहचानें।',
    coreSkills: ['Common spelling patterns', 'Silent e', 'Consonant doubling', 'Confusing spellings'],
    mustKnow: ['Spelling rules में exceptions हो सकते हैं।', 'Silent e और suffix लगने पर spelling बदल सकती है।', 'कुछ words में final consonant double होता है।'],
    quickFacts: ['necessary', 'beautiful', 'library जैसे common words की exact spelling याद रखें।', 'British/Indian English और American variants कभी-कभी अलग हो सकते हैं।'],
    examTraps: ['उच्चारण के आधार पर spelling guess करना।', 'double consonant भूलना।', 'similar-looking words को एक जैसा मान लेना।'],
    examples: ['write + ing → writing (silent e हटता है)', 'run + ing → running (final consonant double)', 'happy → happier → happiest (y → i)'],
    solveMethod: ['Suffix पहचानें।', 'Word ending और vowel/consonant pattern देखें।', 'Similar-looking options में हर letter compare करें।'],
  },
  {
    topicId: 'top_eng_02_03',
    title: 'Rearranging Jumbled Words',
    hindiFocus: 'पहले Subject और main Verb खोजें, फिर object और place/time को जोड़ें।',
    coreSkills: ['S-V-O पहचानना', 'Natural word order', 'Time/place phrases रखना', 'पूरा sentence पढ़कर जाँच करना'],
    mustKnow: ['अक्सर subject पहले और main verb उसके बाद आता है।', 'Articles, prepositions और auxiliary verbs clues देते हैं।', 'Final sentence का अर्थ भी grammatical check है।'],
    quickFacts: ['Subject → Verb → Object एक useful starting frame है।', 'Question word और punctuation order बदल सकते हैं।', 'Meaning + grammar दोनों verify करें।'],
    examTraps: ['सिर्फ familiar phrase देखकर answer चुनना।', 'Time phrase को गलत position पर रखना।', 'हर possible rearrangement को equally natural मान लेना।'],
    examples: ['children / play / football → The children play football.', 'in / the morning / she / studies → She studies in the morning.', 'where / do / you / live → Where do you live?'],
    solveMethod: ['Subject और main verb का pair बनाएं।', 'Object/complement जोड़ें।', 'Place/time और question structure को natural position दें।'],
  },
  {
    topicId: 'top_eng_03_01',
    title: 'Tense Forms',
    hindiFocus: 'Tense पहचानने के लिए time clue, helping verb और main verb form तीनों देखें।',
    coreSkills: ['Present forms', 'Past forms', 'Future form', 'Negative और interrogative structures'],
    mustKnow: ['Present Indefinite में third-person singular के साथ s/es आ सकता है।', 'Did के बाद main verb V1 में आता है।', 'Present Perfect में has/have + V3 होता है।'],
    quickFacts: ['now → Present Continuous का clue हो सकता है।', 'yesterday → Past context का clue हो सकता है।', 'tomorrow → Future context का clue हो सकता है।'],
    examTraps: ['time word देखकर बिना structure जाँचे tense चुन लेना।', 'did के बाद V2 लगाना।', 'has/have के साथ गलत verb form लगाना।'],
    examples: ['He plays cricket. → Simple Present', 'He is playing cricket. → Present Continuous', 'He played cricket. → Simple Past', 'He has played cricket. → Present Perfect', 'He will play cricket. → Simple Future'],
    solveMethod: ['Time clue देखें।', 'Helping verb पहचानें।', 'V1/V2/V3/-ing form verify करें।', 'Negative/question में auxiliary के बाद main verb form जाँचें।'],
  },
  {
    topicId: 'top_eng_03_02',
    title: 'Modal Auxiliaries',
    hindiFocus: 'Modal का सही उत्तर उसके meaning और context से तय करें।',
    coreSkills: ['Ability', 'Permission', 'Possibility', 'Advice और necessity'],
    mustKnow: ['Modal के बाद मुख्य verb सामान्यतः base form में आता है।', 'can/could, may/might, should/must का meaning context पर निर्भर करता है।', 'एक ही sentence में कई forms grammatical दिख सकते हैं, लेकिन intended meaning सही modal चुनता है।'],
    quickFacts: ['can → ability', 'may → permission/possibility', 'should → advice', 'must → strong necessity'],
    examTraps: ['modal के बाद s/es लगाना।', 'must और should को हर context में interchangeable मानना।', 'modal के बाद “to” अनावश्यक रूप से जोड़ना।'],
    examples: ['She can swim. → ability', 'May I come in? → permission', 'You should study. → advice', 'You must wear a helmet. → strong necessity', 'It might rain. → possibility'],
    solveMethod: ['Sentence का intended meaning पहचानें।', 'Ability/permission/possibility/advice/necessity में classify करें।', 'Modal के बाद base verb लगाएँ।'],
  },
  {
    topicId: 'top_eng_03_03',
    title: 'Use of Prepositions',
    hindiFocus: 'Preposition को sentence के संबंध और context से सीखें, केवल अनुवाद से नहीं।',
    coreSkills: ['in/on/at', 'by/with', 'between/among', 'Time और place expressions'],
    mustKnow: ['at अक्सर precise point/time के साथ आता है।', 'in बड़े स्थान, महीनों या वर्षों के context में आ सकता है।', 'between और among का selection context से होता है।'],
    quickFacts: ['at 5 o’clock', 'on Monday', 'in July', 'between two people'],
    examTraps: ['हर time expression के साथ एक ही preposition लगा देना।', 'by और with को interchangeable मानना।', 'between को हर group context में लगाना।'],
    examples: ['at 5 o’clock → precise time', 'on Monday → day', 'in July → month', 'between two students → two clear entities', 'write with a pen → instrument'],
    solveMethod: ['Relation पहचानें: time, place, agent, instrument या group।', 'Fixed expression देखें।', 'Option को पूरे sentence में पढ़कर naturalness जाँचें।'],
  },
  {
    topicId: 'top_eng_04_01',
    title: 'Active and Passive Voice',
    hindiFocus: 'Active में कौन काम करता है और Passive में किस पर काम हुआ—यह relation पहले समझें।',
    coreSkills: ['Object पहचानना', 'Tense के अनुसार passive auxiliary', 'V3 का प्रयोग', 'Agent का उचित उपयोग'],
    mustKnow: ['Passive बनाने के लिए सामान्यतः transitive sentence का object जरूरी होता है।', 'Passive में main verb V3 रूप में आता है।', 'Agent तभी रखें जब उसकी जानकारी उपयोगी हो।'],
    quickFacts: ['writes → is written', 'wrote → was written', 'is writing → is being written'],
    examTraps: ['Object के बिना हर sentence को passive करना।', 'Passive में V2 की जगह V3 भूलना।', 'by + agent को हर sentence में अनिवार्य मानना।'],
    examples: ['She writes a letter. → A letter is written by her.', 'She wrote a letter. → A letter was written by her.', 'They are repairing the road. → The road is being repaired by them.'],
    solveMethod: ['Object खोजें।', 'Object को passive subject बनाएँ।', 'Tense के अनुसार be verb चुनें।', 'Main verb को V3 करें।'],
  },
  {
    topicId: 'top_eng_04_02',
    title: 'Reported Speech',
    hindiFocus: 'Direct Speech को report करते समय pronoun, tense और time words के बदलाव को क्रम से देखें।',
    coreSkills: ['Direct और Indirect पहचानना', 'Pronoun change', 'Backshift', 'Time/place word changes'],
    mustKnow: ['Reporting verb past होने पर सामान्यतः tense backshift हो सकता है।', 'Universal truth के संदर्भ में present tense बना रह सकता है।', 'now/today/here जैसे words context के अनुसार बदल सकते हैं।'],
    quickFacts: ['said, told, asked जैसे reporting verbs पर ध्यान दें।', 'quotation marks indirect speech में नहीं रहते।', 'Meaning बदले बिना structure बदलना लक्ष्य है।'],
    examTraps: ['हर sentence में mechanically tense बदल देना।', 'pronoun relation भूलना।', 'said और told का प्रयोग बिना object/context जाँचे करना।'],
    examples: ['Riya said, “I am tired.” → Riya said that she was tired.', 'He said, “I will come tomorrow.” → He said that he would come the next day.', 'He asked, “Do you know?” → He asked if I knew.'],
    solveMethod: ['Speaker और listener पहचानें।', 'Pronoun relation बदलें।', 'Reporting verb के आधार पर tense/time-word change जाँचें।', 'Question को reported statement order में रखें।'],
  },
  {
    topicId: 'top_eng_04_03',
    title: 'Degrees of Comparison',
    hindiFocus: 'किसकी तुलना हो रही है और कितनी चीज़ें compare हो रही हैं—यह पहले पहचानें।',
    coreSkills: ['Positive degree', 'Comparative degree', 'Superlative degree', 'Irregular forms'],
    mustKnow: ['Comparative सामान्यतः दो के बीच तुलना करता है।', 'Superlative सामान्यतः समूह में highest/lowest degree दिखाता है।', 'good → better → best और bad → worse → worst जैसे irregular forms याद रखें।'],
    quickFacts: ['tall → taller → tallest', 'good → better → best', 'bad → worse → worst'],
    examTraps: ['comparative के साथ than का context भूलना।', 'superlative में article का प्रयोग भूलना जहाँ आवश्यक हो।', 'irregular adjective को regular pattern से बदल देना।'],
    examples: ['tall → taller → tallest', 'happy → happier → happiest', 'difficult → more difficult → most difficult', 'good → better → best'],
    solveMethod: ['तुलना में कितनी चीज़ें हैं पहचानें।', 'Short/long adjective का pattern चुनें।', 'Comparative में than और superlative structure जाँचें।', 'Irregular forms याद से verify करें।'],
  },
];

export const englishMasteryUnitMap = new Map(englishMasteryUnits.map((unit) => [unit.topicId, unit]));
