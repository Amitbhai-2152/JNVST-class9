import type { Chapter, ContentBlock, Lesson, Topic } from '../../types';

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
    case 'paragraph': return splitText(block.text).map((text) => ({ type: 'paragraph', text }));
    case 'callout': return splitText(block.text).map((text, i) => ({ type: 'callout', style: block.style, title: i === 0 ? block.title : undefined, text }));
    case 'list': return block.items.flatMap((item) => splitText(item).map((text) => ({ type: 'list', style: block.style, items: [text] })));
    case 'step-by-step': return block.steps.flatMap((step) => splitText(step).map((text) => ({ type: 'step-by-step', steps: [text] })));
    default: return [block];
  }
};

const guideSets: Record<'अंग्रेज़ी' | 'हिंदी' | 'गणित' | 'विज्ञान', string[]> = {
  अंग्रेज़ी: [
    'अवधारणा पहचानें और यह लिखें कि प्रश्न किस skill को जाँच रहा है।',
    'नियम/structure को उदाहरण से जोड़कर पढ़ें; केवल definition याद न करें।',
    'दिए गए शब्द या sentence में relevant pattern चिन्हित करें।',
    'दो समान दिखने वाले विकल्पों के बीच grammatical difference खोजें।',
    'उदाहरण को बिना देखे अपने शब्दों में दोहराएँ और फिर answer verify करें।',
    'Context बदलने पर rule कैसे लागू होगा, यह सोचें।',
    'एक सामान्य mistake को पहचानें और उसका सही pattern लिखें।',
    'Speed के लिए पहले clue पहचानें, फिर rule लगाएँ।',
    'उत्तर चुनने से पहले पूरा sentence/passage दोबारा पढ़ें।',
    'इस concept को कम-से-कम एक नए उदाहरण पर लागू करें।',
    'बिना notes देखे तीन key points recall करें।',
    'अंत में concept + example + common error की तीन-पंक्ति revision करें।',
  ],
  हिंदी: [
    'मुख्य व्याकरणिक अवधारणा पहचानें और उसका सरल अर्थ लिखें।',
    'नियम को एक छोटे वाक्य या शब्द के उदाहरण से जोड़कर देखें।',
    'शब्द/वाक्य में वह संकेत खोजें जिससे सही उत्तर पहचाना जा सके।',
    'मिलते-जुलते विकल्पों का अर्थ और grammatical role तुलना करें।',
    'उदाहरण को बिना देखे दोहराएँ और फिर मूल नियम से मिलाएँ।',
    'Context बदलने पर उत्तर किस तरह बदल सकता है, यह जाँचें।',
    'एक सामान्य अशुद्धि लिखें और उसका शुद्ध रूप बनाएँ।',
    'पहले clue खोजें, फिर rule लगाकर समय बचाएँ।',
    'उत्तर देने से पहले पूरा वाक्य/गद्यांश फिर से पढ़ें।',
    'नए उदाहरण पर concept लागू करके self-check करें।',
    'बिना notes देखे तीन मुख्य बातें recall करें।',
    'अंत में concept + example + error की संक्षिप्त revision करें।',
  ],
  गणित: [
    'पहले यह पहचानें कि दिए गए प्रश्न में कौन-सी mathematical concept लग रही है।',
    'परिभाषा और symbols को एक साथ लिखें ताकि representation स्पष्ट रहे।',
    'मुख्य property/formula को किन conditions में लगाना है, यह नोट करें।',
    'हल की क्रमबद्ध विधि को step-by-step पढ़ें और हर step का कारण समझें।',
    'दिए गए worked example की तरह एक नया छोटा example मन में बनाएं।',
    'एक ही परिणाम तक पहुँचने वाली दूसरी सरल strategy खोजें जहाँ संभव हो।',
    'Sign, unit, denominator या operation की संभावित गलती पहले से पहचानें।',
    'दैनिक जीवन या word problem में यही concept कहाँ आ सकता है, सोचें।',
    'मिश्रित प्रश्न में सही formula चुनने के लिए data और unknown अलग करें।',
    'Speed के लिए calculation से पहले pattern पहचानें।',
    'बिना notes देखे formula/method recall करके self-test करें।',
    'अंत में concept + formula + method + error का quick revision करें।',
  ],
  विज्ञान: [
    'पहले phenomenon या scientific concept को एक वाक्य में समझाएँ।',
    'मुख्य terms और उनके functions/properties को अलग करें।',
    'Process को क्रम में पढ़ें: कारण → प्रक्रिया → परिणाम।',
    'दिए गए उदाहरण को वास्तविक जीवन की observation से जोड़ें।',
    'दो संबंधित concepts के बीच similarity और difference खोजें।',
    'किस condition में यह process बदल सकता है, यह सोचें।',
    'एक common misconception लिखें और सही scientific idea से बदलें।',
    'Diagram, sequence या classification को शब्दों के साथ जोड़कर याद करें।',
    'Application-based question में पहले cause और observable effect पहचानें।',
    'महत्वपूर्ण तथ्य को अपने शब्दों में दोबारा बोलकर active recall करें।',
    'बिना notes देखे तीन key facts और एक application लिखें।',
    'अंत में concept + process + example + misconception की revision करें।',
  ],
};

const pageTitle = (chapter: Chapter, pageNumber: number, topicTitle: string) => ({
  type: 'heading' as const,
  level: 2 as const,
  text: `अध्ययन पृष्ठ ${pageNumber} — ${chapter.title} · ${topicTitle}`,
});

const getSubjectGuideSet = (chapter: Chapter, topics: Topic[]) => {
  const subject = chapter.id.startsWith('chap_eng_') ? 'अंग्रेज़ी'
    : chapter.id.startsWith('chap_hin_') ? 'हिंदी'
    : chapter.id.startsWith('chap_math_') ? 'गणित'
    : 'विज्ञान';
  const topicNames = topics.filter((topic) => chapter.topicIds.includes(topic.id)).map((topic) => topic.title);
  return { guides: guideSets[subject], topicNames };
};

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
  const { guides, topicNames } = getSubjectGuideSet(chapter, topics);

  const atoms = chapterLessons.flatMap((lesson) =>
    lesson.content.flatMap(atomize).map((block) => ({ lessonId: lesson.id, block })),
  );

  const requiredPages = Math.max(minimumPages, guides.length);
  if (!chapterLessons.length || !atoms.length) {
    return Array.from({ length: requiredPages }, (_, index) => [
      pageTitle(chapter, index + 1, topicNames[index % Math.max(1, topicNames.length)] ?? chapter.title),
      { type: 'callout', style: 'info', title: 'इस पृष्ठ का अध्ययन फोकस', text: guides[index % guides.length] },
    ]);
  }

  const pages: ContentBlock[][] = [];
  const pageSourceCount = Math.max(1, Math.ceil(atoms.length / requiredPages));

  for (let pageIndex = 0; pageIndex < requiredPages; pageIndex += 1) {
    const start = pageIndex * pageSourceCount;
    const slice = atoms.slice(start, start + pageSourceCount);
    const fallback = atoms[pageIndex % atoms.length];
    const sourceAtoms = slice.length ? slice : [fallback];
    const firstSource = chapterLessons.find((lesson) => lesson.id === sourceAtoms[0].lessonId);
    const topic = topics.find((item) => item.id === firstSource?.topicId)?.title
      ?? topicNames[pageIndex % Math.max(1, topicNames.length)]
      ?? firstSource?.title
      ?? chapter.title;

    pages.push([
      pageTitle(chapter, pageIndex + 1, topic),
      { type: 'callout', style: 'info', title: 'इस पृष्ठ का अध्ययन फोकस', text: guides[pageIndex % guides.length] },
      ...sourceAtoms.map((item) => item.block),
    ]);
  }

  return pages;
};

export const getChapterStudyWordCount = (chapter: Chapter, lessons: Lesson[], topics: Topic[] = []) =>
  getChapterStudyPages(chapter, lessons, topics, 12).flat().reduce((total, block) => {
    if (block.type === 'paragraph' || block.type === 'callout') return total + block.text.split(/\s+/).filter(Boolean).length;
    if (block.type === 'list') return total + block.items.join(' ').split(/\s+/).filter(Boolean).length;
    if (block.type === 'step-by-step') return total + block.steps.join(' ').split(/\s+/).filter(Boolean).length;
    return total;
  }, 0);
