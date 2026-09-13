export const subjects = [
  { id: 'sub_eng', title: 'अंग्रेज़ी', description: 'कक्षा VIII स्तर से JNVST कक्षा 9 की संपूर्ण अंग्रेज़ी तैयारी', iconRef: '📘', order: 1, chapterIds: ['chap_eng_01', 'chap_eng_02', 'chap_eng_03', 'chap_eng_04'] },
  { id: 'sub_hin', title: 'हिंदी', description: 'व्याकरण, शब्द ज्ञान और अपठित बोध की JNVST तैयारी', iconRef: '🪶', order: 2, chapterIds: ['chap_hin_01', 'chap_hin_02', 'chap_hin_03', 'chap_hin_04', 'chap_hin_05', 'chap_hin_06'] },
  { id: 'sub_math', title: 'गणित', description: 'कक्षा VIII स्तर के सभी JNVST गणित क्षेत्रों का अभ्यास', iconRef: '∑', order: 3, chapterIds: ['chap_math_01', 'chap_math_02', 'chap_math_03', 'chap_math_04', 'chap_math_05'] },
  { id: 'sub_sci', title: 'विज्ञान', description: 'भौतिकी, रसायन विज्ञान और जीव विज्ञान की JNVST तैयारी', iconRef: '⚗️', order: 4, chapterIds: ['chap_sci_01', 'chap_sci_02', 'chap_sci_03'] }
] as const;

export const chapters = [
  { id: 'chap_eng_01', subjectId: 'sub_eng', title: 'भाषा एवं संरचना', order: 1, topicIds: ['top_eng_01_01', 'top_eng_02_01', 'top_eng_02_02', 'top_eng_02_03'] },
  { id: 'chap_eng_02', subjectId: 'sub_eng', title: 'व्याकरण', order: 2, topicIds: ['top_eng_03_01', 'top_eng_03_02', 'top_eng_03_03'] },
  { id: 'chap_eng_03', subjectId: 'sub_eng', title: 'वाच्य', order: 3, topicIds: ['top_eng_04_01'] },
  { id: 'chap_eng_04', subjectId: 'sub_eng', title: 'कथन एवं तुलना', order: 4, topicIds: ['top_eng_04_02', 'top_eng_04_03'] },

  { id: 'chap_hin_01', subjectId: 'sub_hin', title: 'वर्ण एवं वर्तनी', order: 1, topicIds: ['top_hin_01_01'] },
  { id: 'chap_hin_02', subjectId: 'sub_hin', title: 'शब्द ज्ञान', order: 2, topicIds: ['top_hin_02_01', 'top_hin_02_02', 'top_hin_02_03'] },
  { id: 'chap_hin_03', subjectId: 'sub_hin', title: 'पद एवं परिचय', order: 3, topicIds: ['top_hin_03_01', 'top_hin_03_02'] },
  { id: 'chap_hin_04', subjectId: 'sub_hin', title: 'वाक्य शुद्धि', order: 4, topicIds: ['top_hin_04_01', 'top_hin_04_02'] },
  { id: 'chap_hin_05', subjectId: 'sub_hin', title: 'मुहावरे एवं लोकोक्तियाँ', order: 5, topicIds: ['top_hin_05_01', 'top_hin_05_02'] },
  { id: 'chap_hin_06', subjectId: 'sub_hin', title: 'अपठित बोध', order: 6, topicIds: ['top_hin_06_01'] },

  { id: 'chap_math_01', subjectId: 'sub_math', title: 'संख्याएँ एवं घात', order: 1, topicIds: ['top_math_01_01', 'top_math_01_02', 'top_math_01_03', 'top_math_01_04'] },
  { id: 'chap_math_02', subjectId: 'sub_math', title: 'अनुपात एवं तुलना', order: 2, topicIds: ['top_math_02_01', 'top_math_02_02'] },
  { id: 'chap_math_03', subjectId: 'sub_math', title: 'बीजगणित', order: 3, topicIds: ['top_math_03_01', 'top_math_03_02'] },
  { id: 'chap_math_04', subjectId: 'sub_math', title: 'ज्यामिति एवं क्षेत्रमिति', order: 4, topicIds: ['top_math_04_01', 'top_math_04_02'] },
  { id: 'chap_math_05', subjectId: 'sub_math', title: 'आँकड़ों का प्रबंधन', order: 5, topicIds: ['top_math_05_01'] },

  { id: 'chap_sci_01', subjectId: 'sub_sci', title: 'भौतिक विज्ञान', order: 1, topicIds: ['top_sci_01_01', 'top_sci_01_02', 'top_sci_01_03', 'top_sci_01_04', 'top_sci_01_05', 'top_sci_01_06', 'top_sci_01_07'] },
  { id: 'chap_sci_02', subjectId: 'sub_sci', title: 'रसायन विज्ञान', order: 2, topicIds: ['top_sci_02_01', 'top_sci_02_02', 'top_sci_02_03', 'top_sci_02_04', 'top_sci_02_05'] },
  { id: 'chap_sci_03', subjectId: 'sub_sci', title: 'जीव विज्ञान', order: 3, topicIds: ['top_sci_03_01', 'top_sci_03_02', 'top_sci_03_03', 'top_sci_03_04', 'top_sci_03_05'] }
] as const;

const topicDefinitions: Record<string, { title: string; lessonIds: string[] }> = {
  top_eng_01_01: { title: 'Comprehension (Unseen Passage)', lessonIds: ['les_eng_01_01_01'] },
  top_eng_02_01: { title: 'Word and Sentence Structure', lessonIds: ['les_eng_02_01_01'] },
  top_eng_02_02: { title: 'Spelling Rules', lessonIds: ['les_eng_02_02_01'] },
  top_eng_02_03: { title: 'Rearranging Jumbled Words', lessonIds: ['les_eng_02_03_01'] },
  top_eng_03_01: { title: 'Tense Forms', lessonIds: ['les_eng_03_01_01'] },
  top_eng_03_02: { title: 'Modal Auxiliaries', lessonIds: ['les_eng_03_02_01'] },
  top_eng_03_03: { title: 'Use of Prepositions', lessonIds: ['les_eng_03_03_01'] },
  top_eng_04_01: { title: 'Passivation', lessonIds: ['les_eng_04_01_01'] },
  top_eng_04_02: { title: 'Reported Speech', lessonIds: ['les_eng_04_02_01'] },
  top_eng_04_03: { title: 'Use of Degrees of Comparison', lessonIds: ['les_eng_04_03_01'] },

  top_hin_01_01: { title: 'वर्ण विचार / वर्तनी विवेक', lessonIds: ['les_hin_01_01_01'] },
  top_hin_02_01: { title: 'शब्दभेद (स्रोत/उत्पत्ति)', lessonIds: ['les_hin_02_01_01'] },
  top_hin_02_02: { title: 'पर्यायवाची और विलोम', lessonIds: ['les_hin_02_02_01'] },
  top_hin_02_03: { title: 'शब्द विवेक', lessonIds: ['les_hin_02_03_01'] },
  top_hin_03_01: { title: 'पद भेद', lessonIds: ['les_hin_03_01_01'] },
  top_hin_03_02: { title: 'पद परिचय', lessonIds: ['les_hin_03_02_01'] },
  top_hin_04_01: { title: 'अशुद्ध वाक्य शोधन', lessonIds: ['les_hin_04_01_01'] },
  top_hin_04_02: { title: 'वाक्य रचनान्तर (सरल/संयुक्त/मिश्र)', lessonIds: ['les_hin_04_02_01'] },
  top_hin_05_01: { title: 'मुहावरे', lessonIds: ['les_hin_05_01_01'] },
  top_hin_05_02: { title: 'लोकोक्तियाँ', lessonIds: ['les_hin_05_02_01'] },
  top_hin_06_01: { title: 'अपठित बोधात्मक प्रश्न', lessonIds: ['les_hin_06_01_01'] },

  top_math_01_01: { title: 'परिमेय संख्याएँ', lessonIds: ['les_math_01_01_01'] },
  top_math_01_02: { title: 'वर्ग और वर्गमूल', lessonIds: ['les_math_03_01_01'] },
  top_math_01_03: { title: 'घन और घनमूल', lessonIds: ['les_math_03_02_01'] },
  top_math_01_04: { title: 'घातांक और घात', lessonIds: ['les_math_01_02_01'] },
  top_math_02_01: { title: 'प्रत्यक्ष और प्रतिलोम समानुपात', lessonIds: ['les_math_03_04_01'] },
  top_math_02_02: { title: 'राशियों की तुलना', lessonIds: ['les_math_03_03_01'] },
  top_math_03_01: { title: 'बीजीय व्यंजक और सर्वसमिकाएँ', lessonIds: ['les_math_02_02_01', 'les_math_02_03_01'] },
  top_math_03_02: { title: 'एक चर वाले रैखिक समीकरण', lessonIds: ['les_math_02_01_01'] },
  top_math_04_01: { title: 'चतुर्भुजों को समझना', lessonIds: ['les_math_04_01_01', 'les_math_04_02_01'] },
  top_math_04_02: { title: 'क्षेत्रमिति', lessonIds: ['les_math_05_01_01'] },
  top_math_05_01: { title: 'आँकड़ों का प्रबंधन', lessonIds: ['les_math_06_01_01', 'les_math_06_02_01', 'les_math_06_03_01'] },

  top_sci_01_01: { title: 'बल तथा दाब', lessonIds: ['les_sci_01_01_01'] },
  top_sci_01_02: { title: 'घर्षण', lessonIds: ['les_sci_01_02_01'] },
  top_sci_01_03: { title: 'ध्वनि', lessonIds: ['les_sci_01_03_01'] },
  top_sci_01_04: { title: 'विद्युत धारा के रासायनिक प्रभाव', lessonIds: ['les_sci_01_04_01'] },
  top_sci_01_05: { title: 'प्रकाश', lessonIds: ['les_sci_01_05_01'] },
  top_sci_01_06: { title: 'प्राकृतिक परिघटनाएँ', lessonIds: ['les_sci_01_06_01'] },
  top_sci_01_07: { title: 'तारे एवं सौर परिवार', lessonIds: ['les_sci_01_07_01'] },
  top_sci_02_01: { title: 'संश्लेषित रेशे और प्लास्टिक', lessonIds: ['les_sci_02_01_01'] },
  top_sci_02_02: { title: 'धातु और अधातु', lessonIds: ['les_sci_02_02_01'] },
  top_sci_02_03: { title: 'कोयला और पेट्रोलियम', lessonIds: ['les_sci_02_03_01'] },
  top_sci_02_04: { title: 'दहन और ज्वाला', lessonIds: ['les_sci_02_04_01'] },
  top_sci_02_05: { title: 'वायु तथा जल का प्रदूषण', lessonIds: ['les_sci_02_05_01'] },
  top_sci_03_01: { title: 'फसल उत्पादन एवं प्रबंध', lessonIds: ['les_sci_03_01_01'] },
  top_sci_03_02: { title: 'सूक्ष्मजीव: मित्र एवं शत्रु', lessonIds: ['les_sci_03_02_01'] },
  top_sci_03_03: { title: 'कोशिका - संरचना एवं प्रकार्य', lessonIds: ['les_sci_03_03_01'] },
  top_sci_03_04: { title: 'जंतुओं में जनन', lessonIds: ['les_sci_03_04_01'] },
  top_sci_03_05: { title: 'किशोरावस्था की ओर', lessonIds: ['les_sci_03_05_01'] },
};

export const topics = chapters.flatMap((chapter) => chapter.topicIds.map((id, order) => ({
  id,
  title: topicDefinitions[id].title,
  chapterId: chapter.id,
  order: order + 1,
  lessonIds: topicDefinitions[id].lessonIds,
  practiceQuestionIds: [],
})));
