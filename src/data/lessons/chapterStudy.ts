import type { Chapter, ContentBlock, Lesson, Topic } from '../../types';
import { allQuestions } from '../questions';

const splitText = (text: string, maxWords = 28): string[] => {
  const normalized = text.replace(/\r/g, '').trim();
  if (!normalized) return [];
  const sentences = normalized.split(/(?<=[.!?।])\s+/).filter(Boolean);
  return sentences.flatMap((sentence) => {
    const words = sentence.split(/\s+/);
    if (words.length <= maxWords) return [sentence];
    const chunks: string[] = [];
    for (let i = 0; i < words.length; i += maxWords) chunks.push(words.slice(i, i + maxWords).join(' '));
    return chunks;
  });
};

const atomize = (block: ContentBlock): ContentBlock[] => {
  switch (block.type) {
    case 'paragraph':
      return splitText(block.text).map((text) => ({ type: 'paragraph', text }));
    case 'callout':
      return splitText(block.text).map((text, i) => ({
        type: 'callout',
        style: block.style,
        title: i === 0 ? block.title : undefined,
        text,
      }));
    case 'list':
      return block.items.flatMap((item) => splitText(item).map((text) => ({
        type: 'list',
        style: block.style,
        items: [text],
      })));
    case 'step-by-step':
      return block.steps.flatMap((step) => splitText(step).map((text) => ({
        type: 'step-by-step',
        steps: [text],
      })));
    default:
      return [block];
  }
};

const subjectGuides: Record<'अंग्रेज़ी' | 'हिंदी' | 'गणित' | 'विज्ञान', string[]> = {
  अंग्रेज़ी: [
    'इस पृष्ठ पर दिए गए grammar, vocabulary या comprehension pattern को उदाहरण के साथ समझें।',
    'नियम को पढ़कर दिए गए sentence या passage में उसका प्रयोग पहचानें।',
    'उदाहरण में clue शब्दों को चिन्हित करें और सही structure तक पहुँचें।',
    'मिलते-जुलते विकल्पों की grammar और meaning दोनों की तुलना करें।',
    'नियम को बिना देखे अपने शब्दों में दोहराएँ और फिर example से मिलाएँ।',
    'एक नया sentence बनाकर देखें कि यही rule context बदलने पर भी लागू होता है।',
    'इस concept की सामान्य गलती पहचानें और उसके सही रूप को याद करें।',
    'Exam में पहले clue पहचानें, फिर rule लगाएँ और अंत में पूरा sentence पढ़ें।',
    'पैसेज या sentence से उत्तर का प्रमाण खोजें; केवल अनुमान पर निर्भर न रहें।',
    'इस पृष्ठ के example को खुद हल करके मूल explanation से मिलाएँ।',
    'बिना notes देखे इस topic के तीन key points recall करें।',
    'Concept, example और common error को एक साथ दोहराकर revision पूरा करें.',
  ],
  हिंदी: [
    'मुख्य भाषा या व्याकरणिक अवधारणा को सरल शब्दों में समझें।',
    'नियम को शब्द या वाक्य के उदाहरण से जोड़कर पढ़ें।',
    'सही उत्तर पहचानने वाला संकेत या grammatical role खोजें।',
    'मिलते-जुलते विकल्पों के अर्थ, रूप और प्रयोग की तुलना करें।',
    'उदाहरण को बिना देखे दोहराएँ और मूल नियम से मिलाएँ।',
    'Context बदलने पर नियम का प्रयोग कैसे बदलेगा, यह जाँचें।',
    'एक सामान्य अशुद्धि पहचानकर उसका शुद्ध रूप लिखें।',
    'पहले clue खोजें और फिर नियम लगाकर उत्तर तक पहुँचें।',
    'पूरा वाक्य या गद्यांश पढ़कर उत्तर को संदर्भ से प्रमाणित करें।',
    'नए उदाहरण पर यही concept लागू करके self-check करें।',
    'बिना notes देखे तीन मुख्य बातें recall करें।',
    'Concept, example और common mistake का quick revision करें।',
  ],
  गणित: [
    'दिए गए उदाहरण में कौन-सी mathematical concept लग रही है, पहले पहचानें।',
    'परिभाषा, symbols और आवश्यक शर्तों को साथ पढ़ें।',
    'मुख्य property या formula और उसकी applicability पर ध्यान दें।',
    'हल की हर step का कारण समझें; केवल final answer याद न करें।',
    'Worked example के आधार पर एक नया छोटा example खुद बनाकर देखें।',
    'जहाँ संभव हो, उसी प्रश्न की दूसरी सरल strategy भी सोचें।',
    'Sign, unit, denominator और calculation की संभावित गलती जाँचें।',
    'Word problem में दिए हुए data और unknown को अलग करके देखें।',
    'Formula लगाने से पहले यह सुनिश्चित करें कि conditions पूरी हैं।',
    'Calculation पूरा करने के बाद उत्तर को अनुमान या दूसरी method से verify करें।',
    'बिना notes देखे formula और method recall करें।',
    'Concept + formula + method + common error का quick revision करें।',
  ],
  विज्ञान: [
    'Scientific concept या phenomenon को अपने शब्दों में एक वाक्य में समझाएँ।',
    'मुख्य terms और उनके functions या properties को अलग करें।',
    'Process को कारण → प्रक्रिया → परिणाम के क्रम में पढ़ें।',
    'दिए गए उदाहरण को रोजमर्रा की observation से जोड़कर देखें।',
    'दो संबंधित scientific concepts की समानता और अंतर पहचानें।',
    'किन conditions में process या result बदल सकता है, यह जाँचें।',
    'एक common misconception पहचानें और सही scientific idea लिखें।',
    'Diagram, classification या sequence को explanation के साथ जोड़ें।',
    'Application-based प्रश्न में पहले cause और observable effect पहचानें।',
    'महत्वपूर्ण तथ्य को active recall से बिना notes दोहराएँ।',
    'बिना notes तीन key facts और एक application लिखें।',
    'Concept + process + example + misconception की revision करें।',
  ],
};

const subjectFor = (chapter: Chapter) => {
  if (chapter.id.startsWith('chap_eng_')) return 'अंग्रेज़ी' as const;
  if (chapter.id.startsWith('chap_hin_')) return 'हिंदी' as const;
  if (chapter.id.startsWith('chap_math_')) return 'गणित' as const;
  return 'विज्ञान' as const;
};

const questionBlock = (question: (typeof allQuestions)[number], index: number): ContentBlock[] => {
  const optionText = question.options.map((option) => option.text).join(' | ');
  const correct = question.correctOptionIds
    .map((id) => question.options.find((option) => option.id === id)?.text)
    .filter(Boolean)
    .join(' | ');
  return [
    { type: 'heading', level: 3, text: `स्वयं जाँच ${index + 1}` },
    { type: 'paragraph', text: question.textPlain },
    { type: 'list', style: 'bullet', items: question.options.map((option) => `${option.id}: ${option.text}`) },
    { type: 'callout', style: 'success', title: 'सही उत्तर', text: correct || optionText },
    { type: 'callout', style: 'info', title: 'समझें', text: question.explanationPlain },
  ];
};

const pageTitle = (chapter: Chapter, pageNumber: number, topicTitle: string) => ({
  type: 'heading' as const,
  level: 2 as const,
  text: `अध्ययन पृष्ठ ${pageNumber} — ${chapter.title} · ${topicTitle}`,
});

export const getChapterStudyPages = (
  chapter: Chapter,
  lessons: Lesson[],
  topicsOrMinimumPages: Topic[] | number = [],
  requestedMinimumPages = 12,
): ContentBlock[][] => {
  const topics = Array.isArray(topicsOrMinimumPages) ? topicsOrMinimumPages : [];
  const minimumPages = typeof topicsOrMinimumPages === 'number' ? topicsOrMinimumPages : requestedMinimumPages;
  const chapterTopicIds = new Set(chapter.topicIds);
  const chapterLessons = lessons.filter((lesson) => chapterTopicIds.has(lesson.topicId));
  const chapterQuestions = allQuestions.filter((question) => chapterTopicIds.has(question.topicId));
  const subject = subjectFor(chapter);
  const guides = subjectGuides[subject];
  const topicNames = topics
    .filter((topic) => chapter.topicIds.includes(topic.id))
    .map((topic) => topic.title);

  const lessonUnits = chapterLessons.flatMap((lesson) =>
    lesson.content.flatMap(atomize).map((block) => ({
      topicId: lesson.topicId,
      kind: 'lesson' as const,
      block,
    })),
  );

  const questionUnits = chapterQuestions.flatMap((question, index) =>
    questionBlock(question, index).map((block) => ({
      topicId: question.topicId,
      kind: 'question' as const,
      block,
    })),
  );

  const units = [...lessonUnits, ...questionUnits];
  const requiredPages = Math.max(12, minimumPages, guides.length);

  if (!units.length) {
    return Array.from({ length: requiredPages }, (_, index) => [
      pageTitle(chapter, index + 1, topicNames[index % Math.max(1, topicNames.length)] ?? chapter.title),
      { type: 'callout', style: 'warning', title: 'सामग्री लंबित', text: 'इस अध्याय के लिए source lesson content उपलब्ध नहीं है। यहाँ placeholder जोड़ने के बजाय content source में जोड़ा जाना चाहिए।' },
    ]);
  }

  // Every page is backed by unique source units. We never reuse a lesson/question
  // unit merely to inflate the page count.
  const pageSize = Math.max(1, Math.ceil(units.length / requiredPages));
  const pages: ContentBlock[][] = [];

  for (let pageIndex = 0; pageIndex < requiredPages; pageIndex += 1) {
    const start = pageIndex * pageSize;
    const slice = units.slice(start, start + pageSize);
    if (!slice.length) break;

    const topic = topics.find((item) => item.id === slice[0].topicId)?.title
      ?? topicNames[pageIndex % Math.max(1, topicNames.length)]
      ?? chapter.title;

    const sourceType = slice.some((item) => item.kind === 'question') ? 'lesson-and-practice' : 'lesson';
    pages.push([
      pageTitle(chapter, pageIndex + 1, topic),
      { type: 'callout', style: 'info', title: 'इस पृष्ठ का अध्ययन फोकस', text: guides[pageIndex % guides.length] },
      { type: 'callout', style: 'success', title: 'स्रोत सामग्री', text: sourceType === 'lesson-and-practice' ? 'नीचे अध्याय की lesson सामग्री के साथ उसी अध्याय के practice questions और उनके explanations से revision कराया गया है।' : 'नीचे chapter की वास्तविक lesson सामग्री को छोटे अध्ययन भागों में व्यवस्थित किया गया है।' },
      ...slice.map((item) => item.block),
    ]);
  }

  return pages;
};

export const getChapterStudyWordCount = (
  chapter: Chapter,
  lessons: Lesson[],
  topics: Topic[] = [],
) => getChapterStudyPages(chapter, lessons, topics, 12).flat().reduce((total, block) => {
  if (block.type === 'paragraph' || block.type === 'callout' || block.type === 'heading') {
    return total + block.text.split(/\s+/).filter(Boolean).length;
  }
  if (block.type === 'list') return total + block.items.join(' ').split(/\s+/).filter(Boolean).length;
  if (block.type === 'step-by-step') return total + block.steps.join(' ').split(/\s+/).filter(Boolean).length;
  if (block.type === 'formula') return total + block.expression.split(/\s+/).filter(Boolean).length;
  return total;
}, 0);
