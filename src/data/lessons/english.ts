import type { Lesson } from '../../types';

export const englishLessonsData: Lesson[] = [
  {
    id: 'les_eng_01_01_01', topicId: 'top_eng_01_01', title: 'अपठित गद्यांश (Comprehension)',
    objectives: ['अपठित गद्यांश को हल करने की रणनीति समझना', 'मुख्य विचार, तथ्यात्मक विवरण और संदर्भ के अनुसार शब्द अर्थ ढूँढना'], estimatedMinutes: 25,
    content: [
      { type: 'heading', level: 2, text: 'Comprehension Strategy (हल करने की रणनीति)' },
      { type: 'paragraph', text: 'अपठित गद्यांश (Unseen Passage) को हल करते समय सबसे पहले प्रश्नों को सरसरी तौर पर पढ़ें, फिर गद्यांश को ध्यान से पढ़कर मुख्य विचार (Main Idea) और तथ्यात्मक बिंदुओं को रेखांकित करें।' },
      { type: 'heading', level: 3, text: 'Original Practice Passage (मौलिक अभ्यास गद्यांश)' },
      { type: 'paragraph', text: "Passage: 'Books are considered man's best companions. Unlike human friends who may get busy, books remain constant sources of knowledge, comfort, and inspiration. Reading a good book not only expands our imagination but also improves our vocabulary and critical thinking. In modern times, while digital screens often distract us, traditional books offer a quiet and focused environment for the human mind.'" },
      { type: 'paragraph', text: "Question 1 (Main Idea): What is the central theme of the passage?\nAnswer: Books serve as constant companions and sources of knowledge, comfort, and inspiration.\n\nQuestion 2 (Factual Detail): According to the passage, what are two benefits of reading a good book?\nAnswer: It expands our imagination and improves our vocabulary and critical thinking." },
      { type: 'callout', style: 'info', title: 'परीक्षा-सुझाव', text: 'विकल्पों में से उत्तर चुनते समय अपनी कल्पना के आधार पर अनुमान न लगाएँ; उत्तर हमेशा गद्यांश के तथ्यों पर आधारित होना चाहिए।' }
    ]
  },
  {
    id: 'les_eng_02_01_01', topicId: 'top_eng_02_01', title: 'शब्द एवं वाक्य संरचना (Word and Sentence Structure)',
    objectives: ['Subject और Predicate की पहचान करना', 'वाक्य के बुनियादी घटकों को समझना'], estimatedMinutes: 20,
    content: [
      { type: 'heading', level: 2, text: 'Structure of a Sentence' },
      { type: 'paragraph', text: 'एक सार्थक वाक्य के दो मुख्य भाग होते हैं: Subject (कर्ता / जिसके बारे में बात हो रही है) और Predicate (विधेय / जो भाग Subject के बारे में कुछ बताता है)। पूरा noun phrase भी Subject का हिस्सा हो सकता है।' },
      { type: 'paragraph', text: "उदाहरण: 'The clever young boy solved the difficult puzzle.'\nSubject: The clever young boy\nPredicate: solved the difficult puzzle" },
      { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'छात्र अक्सर केवल पहले शब्द को Subject मान लेते हैं, जबकि पूरा नाउन फ्रेज़ Subject का हिस्सा हो सकता है।' }
    ]
  },
  {
    id: 'les_eng_02_02_01', topicId: 'top_eng_02_02', title: 'वर्तनी नियम (Spelling Rules)',
    objectives: ['सामान्य वर्तनी के पैटर्न और दिशानिर्देशों को समझना'], estimatedMinutes: 20,
    content: [
      { type: 'heading', level: 2, text: 'Common Spelling Guidelines' },
      { type: 'paragraph', text: 'अंग्रेज़ी वर्तनी में कुछ उपयोगी दिशा-निर्देश (Guidelines) होते हैं, हालाँकि इनमें अंग्रेजी भाषा के अनुसार कुछ अपवाद भी पाए जाते हैं।' },
      { type: 'list', style: 'bullet', items: ["'I before E except after C' guideline: यह एक सामान्य याद रखने की ट्रिक (mnemonic) है; जब उच्चारण 'ee' जैसा हो, तो सामान्यतः 'i' पहले आता है और 'e' बाद में (जैसे—believe), लेकिन c के बाद 'e' पहले आता है (जैसे—receive)।", "Silent 'e' rule: जब किसी शब्द के अंत में silent 'e' हो और स्वर से शुरू होने वाला प्रत्यय जोड़ा जाए, तो 'e' सामान्यतः हटा दिया जाता है (जैसे—write + ing = writing)।", "Consonant doubling: जब कोई शब्द एक stressed short vowel और उसके बाद आने वाले एक single consonant पर समाप्त हो, तो स्वर से शुरू होने वाला प्रत्यय जोड़ते समय अंतिम व्यंजन दोहरा दिया जाता है: run + ing = running; sit + ing = sitting; begin + ing = beginning"] },
      { type: 'callout', style: 'info', title: 'स्वयं जाँचें', text: "प्रश्न: 'write' में 'ing' जोड़ने पर सही वर्तनी क्या होगी?\nउत्तर: writing" }
    ]
  },
  {
    id: 'les_eng_02_03_01', topicId: 'top_eng_02_03', title: 'अव्यवस्थित शब्दों को क्रम में लगाना (Rearranging Jumbled Words)',
    objectives: ['S V O क्रम को पहचानना', 'सार्थक वाक्य बनाना'], estimatedMinutes: 20,
    content: [
      { type: 'heading', level: 2, text: 'Sentence Reordering Method' },
      { type: 'paragraph', text: 'अंग्रेज़ी में सामान्य वाक्य रचना का क्रम Subject + Verb + Object / Complement होता है।' },
      { type: 'paragraph', text: "उदाहरण:\nJumbled: 'football / evening / play / in / the / children / the'\n\nStep-by-step हल:\n1. Subject खोजें: The children\n2. Verb खोजें: play\n3. Object खोजें: football\n4. अन्य शब्द (Time/Place): in the evening\nCorrect Sentence: 'The children play football in the evening.'" },
      { type: 'callout', style: 'important', title: 'परीक्षा-सुझाव', text: 'सबसे पहले वाक्य के कर्ता (Subject) और मुख्य क्रिया (Main Verb) को ढूँढकर अलग कर लें, आधा वाक्य वहीं हल हो जाता है।' }
    ]
  },
  {
    id: 'les_eng_03_01_01', topicId: 'top_eng_03_01', title: 'काल के रूप (Tense Forms)',
    objectives: ['Present, Past और Future के मुख्य रूपों को समझना', 'सही सहायक क्रिया का प्रयोग करना'], estimatedMinutes: 30,
    content: [
      { type: 'heading', level: 2, text: 'Overview of Tenses' },
      { type: 'list', style: 'bullet', items: ["Present Indefinite: Subject + V1 (s/es) — सामान्य आदत या सत्यता। उदाहरण: 'He plays cricket.'", "Present Continuous: Subject + is/am/are + V1-ing — वर्तमान में जारी कार्य। उदाहरण: 'He is playing cricket.'", "Present Perfect: Subject + has/have + V3 — भूतकाल में पूरा कार्य जिसका संबंध वर्तमान से हो। उदाहरण: 'He has played cricket.'", "Past Indefinite: Subject + V2 — भूतकाल की निश्चित घटना। उदाहरण: 'He played cricket.'", "Past Continuous: Subject + was/were + V1-ing — भूतकाल में जारी कार्य। उदाहरण: 'He was playing cricket.'", "Past Perfect: Subject + had + V3 — भूतकाल में किसी अन्य कार्य से पहले समाप्त कार्य। उदाहरण: 'He had played cricket.'", "Future Indefinite: Subject + will + V1 — भविष्य की घटना या निर्णय। उदाहरण: 'He will play cricket.'"] },
      { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'Past Indefinite के नकारात्मक वाक्यों में did के साथ हमेशा V1 का प्रयोग होता है, V2 का नहीं।' }
    ]
  },
  {
    id: 'les_eng_03_02_01', topicId: 'top_eng_03_02', title: 'सहायक क्रियाएँ (Modal Auxiliaries)',
    objectives: ['can, could, may, might, should, must, will, would का सही संदर्भ में उपयोग करना'], estimatedMinutes: 25,
    content: [
      { type: 'heading', level: 2, text: 'Common Modals & Their Functions' },
      { type: 'paragraph', text: 'Modal auxiliaries के बाद हमेशा मुख्य क्रिया की मूल अवस्था (Base form / V1) का प्रयोग होता है।' },
      { type: 'list', style: 'bullet', items: ["Can / Could: क्षमता (Ability) के लिए। उदाहरण: 'She can swim.'", "May: अनुमति या संभावना के लिए। उदाहरण: 'May I come in?', 'It may rain today.'", "Might: कम निश्चित संभावना के लिए। उदाहरण: 'It might rain later.'", "Should / Ought to: सलाह या कर्तव्य के लिए। उदाहरण: 'You should study hard.'", "Must: अनिवार्य आवश्यकता या दृढ़ बाध्यता के लिए। उदाहरण: 'We must follow safety rules.'", "Will: भविष्य की घटना या निर्णय के लिए। उदाहरण: 'I will help you.'", "Would: विनम्र अनुरोध या संदर्भानुसार भूतकाल की आदत के लिए। उदाहरण: 'Would you please help you?'" ] },
      { type: 'callout', style: 'info', title: 'स्वयं जाँचें', text: "प्रश्न: 'You ___ obey your parents.' (नैतिक कर्तव्य के लिए सही Modal चुनें)\nउत्तर: should / ought to." }
    ]
  },
  {
    id: 'les_eng_03_03_01', topicId: 'top_eng_03_03', title: 'पूर्वसर्ग का प्रयोग (Use of Prepositions)',
    objectives: ['in, on, at, by, with, between, among के व्यावहारिक संदर्भ को समझना'], estimatedMinutes: 25,
    content: [
      { type: 'heading', level: 2, text: 'Contextual Usage of Prepositions' },
      { type: 'list', style: 'bullet', items: ["At / In / On: At किसी विशिष्ट बिंदु या सटीक समय/स्थान के लिए; In बड़े स्थानों, महीनों या वर्षों के लिए; On दिनों या तारीखों के लिए।", "Between / Among: Between सामान्यतः दो स्पष्ट व्यक्तियों या वस्तुओं के बीच; Among किसी समूह के बीच।", "By / With: By agent या कुछ contexts में साधन/तरीका बताता है; With साधन या यंत्र के साथ कार्य बताता है।"] }
    ]
  },
  {
    id: 'les_eng_04_01_01', topicId: 'top_eng_04_01', title: 'वाच्य परिवर्तन (Passivation / Active and Passive Voice)',
    objectives: ['Active Voice को Passive Voice में बदलना', 'agent के उचित प्रयोग को समझना'], estimatedMinutes: 30,
    content: [
      { type: 'heading', level: 2, text: 'Rules for Passivation' },
      { type: 'paragraph', text: "Active से Passive बनाते समय उपयुक्त Object वाले transitive sentence को Subject बनाया जाता है। काल के अनुसार उपयुक्त auxiliary के साथ V3 का प्रयोग किया जाता है और आवश्यक होने पर 'by' के साथ original subject (agent) जोड़ा जाता है।" },
      { type: 'paragraph', text: "उदाहरण:\nPresent Indefinite: 'She writes a letter.' → 'A letter is written by her.'\nPast Indefinite: 'She wrote a letter.' → 'A letter was written by her.'\nPresent Continuous: 'She is writing a letter.' → 'A letter is being written by her.'" },
      { type: 'callout', style: 'warning', title: 'महत्वपूर्ण नियम', text: "Passive voice में agent (by...) को तब हटाया जा सकता है जब वह अज्ञात, स्पष्ट या महत्वहीन हो।" }
    ]
  },
  {
    id: 'les_eng_04_02_01', topicId: 'top_eng_04_02', title: 'प्रत्यक्ष और अप्रत्यक्ष कथन (Reported Speech)',
    objectives: ['Direct Speech को Indirect Speech में बदलना', 'सर्वनाम, काल और समयसूचक शब्दों में परिवर्तन करना'], estimatedMinutes: 30,
    content: [
      { type: 'heading', level: 2, text: 'Direct vs Indirect Speech' },
      { type: 'paragraph', text: 'Direct Speech में वक्ता के वास्तविक शब्द उद्धरण चिह्नों के अंदर ज्यों के त्यों लिखे जाते हैं। Indirect / Reported Speech में संदेश को बिना मूल उद्धरण के रिपोर्ट किया जाता है।' },
      { type: 'list', style: 'bullet', items: ["Inverted commas हटाकर साधारण वाक्यों में 'that' का प्रयोग किया जाता है।", "यदि reporting verb Past Tense में हो, तो सामान्यतः Tense backshift होता है; जैसे plays → played।", "महत्वपूर्ण नोट: सार्वभौमिक सत्य या स्थायी तथ्य के संदर्भ में reported clause का present tense बना रह सकता है; जैसे 'He said that the sun rises in the east.'", "समय/स्थान परिवर्तन: now → then, today → that day, here → there।"] },
      { type: 'paragraph', text: "उदाहरण:\nDirect: He said, 'I play cricket.'\nIndirect: He said that he played cricket." }
    ]
  },
  {
    id: 'les_eng_04_03_01', topicId: 'top_eng_04_03', title: 'तुलना की डिग्रियों का प्रयोग (Use of Degrees of Comparison)',
    objectives: ['Positive, Comparative और Superlative डिग्रियों को पहचानना और बदलना'], estimatedMinutes: 20,
    content: [
      { type: 'heading', level: 2, text: 'Degrees of Adjectives' },
      { type: 'paragraph', text: 'विशेषण की तीन अवस्थाएँ होती हैं। Positive सामान्य गुण बताता है; Comparative सामान्यतः दो के बीच तुलना करता है; Superlative सामान्यतः तीन या अधिक में सर्वोच्च गुण बताता है।' },
      { type: 'list', style: 'bullet', items: ['Positive Degree: tall, good', 'Comparative Degree: taller, better — सामान्यतः than के साथ', 'Superlative Degree: the tallest, the best — सामान्यतः the के साथ', 'Irregular Forms: good → better → best; bad → worse → worst; little → less → least'] },
      { type: 'callout', style: 'info', title: 'स्वयं जाँचें', text: "प्रश्न: 'Good' का Superlative रूप क्या होगा?\nउत्तर: Best." }
    ]
  }
];
