import type { Chapter, ContentBlock, Lesson, Topic } from '../../types';
import { allQuestions } from '../questions';
import { richChapterContent } from './richChapterContent';

const subjectGuides: Record<'अंग्रेज़ी' | 'हिंदी' | 'गणित' | 'विज्ञान', string[]> = {
  अंग्रेज़ी: [
    'नियम, उदाहरण और संदर्भ को साथ पढ़ें; उत्तर केवल अनुमान से न चुनें।',
    'मुख्य grammar या vocabulary pattern को पहचानें और उसके clue words चिन्हित करें।',
    'उदाहरण को अपने शब्दों में समझाएँ और फिर explanation से मिलाएँ।',
    'मिलते-जुलते विकल्पों में meaning, structure और context की तुलना करें।',
    'नियम को नए sentence या passage पर लागू करके self-check करें।',
    'common error को पहचानें और उसके सही रूप को दोहराएँ।',
    'comprehension में उत्तर का प्रमाण सीधे passage से खोजें।',
    'बिना notes देखे page के मुख्य points recall करें।',
    'practice question से पहले concept और clue दोनों पहचानें।',
    'गलत उत्तर के कारण को explanation से समझें; केवल option याद न करें।',
    'revision में rule → example → error/exception का क्रम अपनाएँ।',
    'अंत में पूरे chapter के key ideas को active recall से दोहराएँ।',
  ],
  हिंदी: [
    'मुख्य भाषा या व्याकरणिक अवधारणा को अर्थ और प्रयोग के साथ समझें।',
    'शब्द या वाक्य में उस नियम का संकेत खोजें।',
    'रूप, अर्थ और संदर्भ तीनों देखकर उत्तर तक पहुँचें।',
    'मिलते-जुलते विकल्पों की सूक्ष्म भिन्नता पहचानें।',
    'उदाहरण को बिना notes दोहराकर फिर source explanation से जाँचें।',
    'सामान्य अशुद्धि और उसका शुद्ध रूप साथ याद करें।',
    'गद्यांश आधारित प्रश्नों में उत्तर को पाठ के संदर्भ से प्रमाणित करें।',
    'नए उदाहरण पर वही नियम लगाकर self-check करें।',
    'practice में पहले clue, फिर rule, फिर final answer रखें।',
    'गलती के कारण को समझें ताकि वही pattern दोबारा न दोहराएँ।',
    'तीन मुख्य बातें बिना देखे recall करें।',
    'chapter revision में concept + example + common mistake दोहराएँ।',
  ],
  गणित: [
    'पहले concept, symbols और आवश्यक शर्तें पहचानें।',
    'formula या property क्यों लागू होती है, यह समझकर आगे बढ़ें।',
    'हर calculation step का कारण देखें; केवल final answer याद न करें।',
    'worked example में signs, denominators और operations की जाँच करें।',
    'एक समान नया उदाहरण खुद बनाकर method की जाँच करें।',
    'word problem में data, unknown और relation अलग-अलग पहचानें।',
    'formula लगाने से पहले उसकी conditions verify करें।',
    'दूसरी method उपलब्ध हो तो परिणाम cross-check करें।',
    'गलत विकल्प क्यों गलत है, यह भी समझें।',
    'calculation के बाद अनुमान से उत्तर की जाँच करें।',
    'बिना notes formula और method recall करें।',
    'chapter revision में concept + formula + method + error दोहराएँ।',
  ],
  विज्ञान: [
    'वैज्ञानिक अवधारणा को कारण, प्रक्रिया और परिणाम के क्रम में समझें।',
    'मुख्य terms और उनके functions/properties अलग करें।',
    'दिए गए उदाहरण को observation या application से जोड़ें।',
    'समान दिखने वाली अवधारणाओं के अंतर को पहचानें।',
    'किन conditions में परिणाम बदल सकता है, यह जाँचें।',
    'diagram, sequence या classification को explanation से जोड़ें।',
    'common misconception को पहचानकर सही scientific idea दोहराएँ।',
    'application-based प्रश्न में cause और observable effect अलग करें।',
    'important fact को active recall से बिना notes दोहराएँ।',
    'गलत विकल्प के पीछे की अवधारणा को भी समझें।',
    'तीन key facts और एक application recall करें।',
    'अंत में concept + process + example + misconception revise करें।',
  ],
};

const subjectFor = (chapter: Chapter) => {
  if (chapter.id.startsWith('chap_eng_')) return 'अंग्रेज़ी' as const;
  if (chapter.id.startsWith('chap_hin_')) return 'हिंदी' as const;
  if (chapter.id.startsWith('chap_math_')) return 'गणित' as const;
  return 'विज्ञान' as const;
};

const textFor = (block: ContentBlock): string => {
  switch (block.type) {
    case 'heading': return block.text;
    case 'paragraph': return block.text;
    case 'formula': return block.expression;
    case 'list': return block.items.join(' ');
    case 'step-by-step': return block.steps.join(' ');
    case 'callout': return `${block.title ?? ''} ${block.text}`.trim();
    case 'table': return `${block.headers.join(' ')} ${block.rows.flat().join(' ')}`;
    case 'image': return block.caption ?? block.alt;
    default: return '';
  }
};

const approxWords = (blocks: ContentBlock[]) => blocks.reduce((count, block) => count + textFor(block).split(/\s+/).filter(Boolean).length, 0);

const questionBlock = (question: (typeof allQuestions)[number], index: number): ContentBlock[] => {
  const correct = question.correctOptionIds
    .map((id) => question.options.find((option) => option.id === id)?.text)
    .filter((text): text is string => Boolean(text))
    .join(' | ');
  return [
    { type: 'heading', level: 3, text: `स्वयं जाँच ${index + 1}` },
    { type: 'paragraph', text: question.textPlain ?? 'प्रश्न पढ़ें और विकल्पों की तुलना करें।' },
    { type: 'list', style: 'bullet', items: question.options.map((option) => `${option.id}: ${option.text}`) },
    { type: 'callout', style: 'example', title: 'सही उत्तर', text: correct || 'स्रोत प्रश्न में दिए गए सही विकल्प को जाँचें।' },
    { type: 'callout', style: 'info', title: 'समझें', text: question.explanationPlain ?? 'इस प्रश्न की व्याख्या उसी concept पर आधारित है जिसे प्रश्न जाँचता है।' },
  ];
};

const splitInto = <T,>(items: T[], count: number): T[][] => {
  if (!items.length) return Array.from({ length: count }, () => []);
  const result: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, index) => result[index % count].push(item));
  return result;
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
  const requiredPages = Math.max(12, minimumPages);
  const topicIds = new Set(chapter.topicIds);
  const chapterLessons = lessons.filter((lesson) => topicIds.has(lesson.topicId));
  const chapterQuestions = allQuestions.filter((question) => topicIds.has(question.topicId));
  const subject = subjectFor(chapter);
  const guides = subjectGuides[subject];
  const topicNames = topics.filter((topic) => chapter.topicIds.includes(topic.id)).map((topic) => topic.title);

  const lessonBlocks = chapterLessons.flatMap((lesson) => lesson.content);
  const richBlocks = richChapterContent[chapter.id] ?? [];
  const lessonGroups = splitInto(lessonBlocks, Math.max(1, Math.min(requiredPages, lessonBlocks.length || requiredPages)));
  const richGroups = splitInto(richBlocks, Math.max(1, Math.min(requiredPages, richBlocks.length || requiredPages)));
  const questionGroups = splitInto(chapterQuestions, Math.max(1, Math.min(requiredPages, chapterQuestions.length || requiredPages)));
  const objectives = Array.from(new Set(chapterLessons.flatMap((lesson) => lesson.objectives))).slice(0, 8);
  const keyHeadings = Array.from(new Set(lessonBlocks
    .filter((block): block is Extract<ContentBlock, { type: 'heading' }> => block.type === 'heading')
    .map((block) => block.text))).slice(0, 12);

  const pages: ContentBlock[][] = [];
  for (let pageIndex = 0; pageIndex < requiredPages; pageIndex += 1) {
    const lessonGroup = lessonGroups[pageIndex % Math.max(1, lessonGroups.length)] ?? [];
    const richGroup = richGroups[pageIndex % Math.max(1, richGroups.length)] ?? [];
    const qGroup = questionGroups[pageIndex % Math.max(1, questionGroups.length)] ?? [];
    const topicTitle = topicNames[pageIndex % Math.max(1, topicNames.length)] ?? chapter.title;
    const page: ContentBlock[] = [
      pageTitle(chapter, pageIndex + 1, topicTitle),
      { type: 'callout', style: 'info', title: 'इस पृष्ठ का अध्ययन फोकस', text: guides[pageIndex % guides.length] },
    ];

    if (pageIndex === 0) {
      page.push({ type: 'paragraph', text: `${chapter.title} का अध्ययन source lessons, learning objectives, अतिरिक्त व्याख्या और practice bank के आधार पर व्यवस्थित किया गया है।` });
      if (objectives.length) page.push({ type: 'heading', level: 3, text: 'आप क्या सीखेंगे?' }, { type: 'list', style: 'bullet', items: objectives.map((item) => `• ${item}`) });
      if (keyHeadings.length) page.push({ type: 'callout', style: 'important', title: 'अध्याय के मुख्य हिस्से', text: keyHeadings.join(' · ') });
    }

    if (richGroup.length) {
      page.push({ type: 'callout', style: 'important', title: 'गहराई से समझें', text: 'नीचे इस अध्याय की अतिरिक्त व्याख्या दी गई है, ताकि concept केवल परिभाषा तक सीमित न रहे।' });
      page.push(...richGroup);
    }

    if (lessonGroup.length) {
      page.push({ type: 'callout', style: 'info', title: 'मूल पाठ-सामग्री', text: 'इस भाग में existing lesson source की वास्तविक सामग्री दी गई है। definitions, examples, rules और steps को ध्यान से पढ़ें।' });
      page.push(...lessonGroup);
    }

    if (qGroup.length) {
      page.push({ type: 'callout', style: 'example', title: 'अभ्यास से जाँचें', text: `${qGroup.length} source practice question${qGroup.length === 1 ? '' : 's'} के साथ अभी पढ़े concept को जाँचें। answer के साथ explanation भी पढ़ें।` });
      qGroup.forEach((question, index) => page.push(...questionBlock(question, pageIndex * Math.max(1, qGroup.length) + index)));
    }

    if (pageIndex === requiredPages - 3) {
      page.push({ type: 'heading', level: 3, text: 'त्वरित पुनरावृत्ति' });
      if (keyHeadings.length) page.push({ type: 'list', style: 'bullet', items: keyHeadings.slice(0, 8).map((item) => `मुख्य बिंदु: ${item}`) });
      if (objectives.length) page.push({ type: 'list', style: 'bullet', items: objectives.slice(0, 5).map((item) => `सीखना है: ${item}`) });
    }
    if (pageIndex === requiredPages - 2) {
      page.push({ type: 'heading', level: 3, text: 'परीक्षा से पहले क्या याद रखें?' });
      page.push({ type: 'list', style: 'number', items: [
        'परिभाषा या मुख्य नियम को बिना देखे दोहराएँ।',
        'कम-से-कम एक worked example का पूरा तरीका खुद समझाएँ।',
        'common mistake या misconception को पहचानें।',
        'practice questions की explanations पढ़कर reasoning जाँचें।',
      ] });
    }
    if (pageIndex === requiredPages - 1) {
      page.push({ type: 'heading', level: 3, text: 'Final Recall' });
      page.push({ type: 'callout', style: 'important', title: '30 सेकंड का recall', text: `${chapter.title} से तीन मुख्य concepts, दो examples और एक common mistake बिना notes देखे बोलकर या लिखकर याद करें।` });
    }

    pages.push(page);
  }

  return pages;
};

export const getChapterStudyWordCount = (
  chapter: Chapter,
  lessons: Lesson[],
  topics: Topic[] = [],
) => getChapterStudyPages(chapter, lessons, topics, 12).reduce((total, page) => total + approxWords(page), 0);
