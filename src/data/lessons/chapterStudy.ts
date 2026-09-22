import type { Chapter, ContentBlock, Lesson, Topic } from '../../types';
import { allQuestions } from '../questions';
import { richChapterContent } from './richChapterContent';
import { scienceLessonCore, scienceLessonLens } from '../scienceLessonCore';

const subjectGuides: Record<'अंग्रेज़ी' | 'हिंदी' | 'गणित' | 'विज्ञान', string[]> = {
  अंग्रेज़ी: ['नियम, उदाहरण और संदर्भ को साथ पढ़ें; उत्तर केवल अनुमान से न चुनें।','मुख्य grammar या vocabulary pattern और clue words पहचानें।','उदाहरण को अपने शब्दों में समझाएँ और explanation से मिलाएँ।','meaning, structure और context की तुलना करें।','नए sentence या passage पर rule लगाएँ।','common error और सही रूप याद करें।','उत्तर का प्रमाण passage से खोजें।','मुख्य points बिना notes recall करें।','practice से पहले concept और clue पहचानें।','गलत उत्तर का कारण समझें।','rule → example → error/exception दोहराएँ।','chapter के key ideas active recall से दोहराएँ।'],
  हिंदी: ['मुख्य भाषा या व्याकरण अवधारणा को अर्थ और प्रयोग के साथ समझें।','शब्द या वाक्य में नियम का संकेत खोजें।','रूप, अर्थ और संदर्भ तीनों देखें।','मिलते-जुलते विकल्पों की सूक्ष्म भिन्नता पहचानें।','उदाहरण को बिना notes दोहराएँ।','सामान्य अशुद्धि और शुद्ध रूप साथ याद करें।','गद्यांश का उत्तर पाठ से प्रमाणित करें।','नए उदाहरण पर नियम लगाएँ।','clue → rule → answer रखें।','गलती का कारण समझें।','तीन मुख्य बातें recall करें।','concept + example + mistake revise करें।'],
  गणित: ['concept, symbols और conditions पहचानें।','formula/property क्यों लागू है समझें।','हर calculation step का कारण देखें।','signs, denominators और operations जाँचें।','समान नया example खुद बनाएं।','data, unknown और relation अलग करें।','formula की conditions verify करें।','दूसरी method से cross-check करें।','गलत विकल्प क्यों गलत है समझें।','उत्तर की अनुमान से जाँच करें।','formula और method recall करें।','concept + formula + method + error revise करें।'],
  विज्ञान: ['अवधारणा को कारण → प्रक्रिया → परिणाम में समझें।','मुख्य terms और functions अलग करें।','example को observation/application से जोड़ें।','समान concepts का अंतर पहचानें।','conditions बदलने पर परिणाम जाँचें।','diagram/sequence/classification को explanation से जोड़ें।','common misconception पहचानें।','cause और observable effect अलग करें।','important fact active recall से दोहराएँ।','गलत option के पीछे की concept समझें।','तीन key facts और एक application recall करें।','concept + process + example + misconception revise करें।'],
};

const subjectFor = (chapter: Chapter) => chapter.id.startsWith('chap_eng_') ? 'अंग्रेज़ी' as const : chapter.id.startsWith('chap_hin_') ? 'हिंदी' as const : chapter.id.startsWith('chap_math_') ? 'गणित' as const : 'विज्ञान' as const;

const textFor = (block: ContentBlock): string => {
  switch (block.type) {
    case 'heading': return block.text;
    case 'paragraph': return block.text;
    case 'formula': return block.expression;
    case 'list': return block.items.join(' ');
    case 'step-by-step': return block.steps.join(' ');
    case 'callout': return `${block.title ?? ''} ${block.text}`.trim();
    case 'table': return `${block.headers.join(' ')} ${block.rows.flat().join(' ')}`;
    case 'image': return `${block.alt} ${block.caption ?? ''}`.trim();
  }
};

const approxWords = (blocks: ContentBlock[]) => blocks.reduce((n, b) => n + textFor(b).split(/\s+/).filter(Boolean).length, 0);

const questionBlock = (q: (typeof allQuestions)[number], index: number): ContentBlock[] => {
  const correct = q.correctOptionIds.map(id => q.options.find(o => o.id === id)?.text).filter((x): x is string => Boolean(x)).join(' | ');
  return [
    { type: 'heading', level: 3, text: `स्वयं जाँच ${index + 1}` },
    ...(q.text ?? [{ type: 'paragraph' as const, text: q.textPlain ?? 'प्रश्न पढ़ें और विकल्पों की तुलना करें।' }]),
    { type: 'list', style: 'bullet', items: q.options.map(o => `${o.id}: ${o.text}`) },
    { type: 'callout', style: 'example', title: 'सही उत्तर', text: correct || 'स्रोत प्रश्न में दिए गए सही विकल्प को जाँचें।' },
    ...(q.explanation ?? [{ type: 'callout' as const, style: 'info' as const, title: 'समझें', text: q.explanationPlain ?? 'यह प्रश्न उसी concept को जाँचता है जिसे आपने अभी पढ़ा है।' }]),
  ];
};

const splitInto = <T,>(items: T[], count: number): T[][] => {
  const safeCount = Math.max(1, count);
  const result: T[][] = Array.from({ length: safeCount }, () => []);
  if (!items.length) return result;
  const base = Math.floor(items.length / safeCount);
  const remainder = items.length % safeCount;
  let cursor = 0;
  for (let i = 0; i < safeCount; i += 1) {
    const size = base + (i < remainder ? 1 : 0);
    result[i] = items.slice(cursor, cursor + size);
    cursor += size;
  }
  return result;
};

const pageTitle = (chapter: Chapter, pageNumber: number, topicTitle: string): ContentBlock => ({ type: 'heading', level: 2, text: `अध्ययन पृष्ठ ${pageNumber} — ${chapter.title} · ${topicTitle}` });

const scienceStageNames = ['पहले यह समझें','मुख्य अवधारणाएँ','कैसे और क्यों?','उदाहरण, प्रयोग और सोच','तुलना और JNVST फोकस','60-सेकंड पुनरावृत्ति'];

const blockWords = (block: ContentBlock) => textFor(block).split(/\s+/).filter(Boolean).length;

const splitScienceStage = (blocks: ContentBlock[]): [ContentBlock[], ContentBlock[]] => {
  if (!blocks.length) return [[], []];
  if (blocks.length === 1) return [blocks, []];
  const total = blocks.reduce((sum, block) => sum + blockWords(block), 0);
  const target = total / 2;
  let running = 0;
  let splitAt = 1;
  let best = Number.POSITIVE_INFINITY;
  for (let i = 1; i < blocks.length; i += 1) {
    running += blockWords(blocks[i - 1]);
    const distance = Math.abs(target - running);
    if (distance < best) {
      best = distance;
      splitAt = i;
    }
  }
  return [blocks.slice(0, splitAt), blocks.slice(splitAt)];
};

export const getScienceChapterStudyPages = (chapter: Chapter): ContentBlock[][] => {
  const topicId = chapter.topicIds[0];
  const core = topicId ? (scienceLessonCore[topicId] ?? []) : [];
  const lens = topicId ? scienceLessonLens[topicId] : undefined;
  const stages: ContentBlock[][] = [];
  let current: ContentBlock[] = [];

  for (const block of core) {
    if (block.type === 'heading' && block.level === 2 && current.length) {
      stages.push(current);
      current = [];
    }
    current.push(block);
  }
  if (current.length) stages.push(current);

  const normalized = scienceStageNames.map((fallback, index) => {
    const source = stages[index] ?? [];
    return {
      title: source.find((block) => block.type === 'heading' && block.level === 2)?.text.replace(/^\d+\.\s*/, '').trim() || fallback,
      blocks: source.filter((block) => !(block.type === 'heading' && block.level === 2)),
    };
  });

  return normalized.flatMap((stage, stageIndex) => {
    const [first, second] = splitScienceStage(stage.blocks);
    const pairs = [first, second];
    return pairs.map((blocks, partIndex) => {
      const pageNumber = stageIndex * 2 + partIndex + 1;
      const page: ContentBlock[] = [
        { type: 'heading', level: 2, text: `अध्ययन पृष्ठ ${pageNumber} — ${chapter.title} · ${stage.title} · भाग ${partIndex + 1}` },
        { type: 'callout', style: 'info', title: 'इस पृष्ठ का अध्ययन फोकस', text: `${stage.title} को छोटे भाग में समझें; पहले विचार पकड़ें, फिर उदाहरण और प्रश्नों पर जाएँ।` },
        ...blocks,
      ];

      if (pageNumber === 1 && lens) {
        page.push({ type: 'callout', style: 'important', title: 'इस अध्याय का बड़ा सवाल', text: lens.bigQuestion });
      }
      if (pageNumber === 2 && lens) {
        page.push({ type: 'table', headers: ['सोचने की श्रृंखला', 'क्या देखें'], rows: lens.flow.map((item) => [item.label, item.value]) });
      }
      if (pageNumber === 8 && lens) {
        page.push({ type: 'callout', style: 'example', title: '30 सेकंड रुककर सोचें', text: lens.observe });
      }
      if (pageNumber === 10 && lens) {
        page.push({ type: 'callout', style: 'warning', title: 'यह भ्रम न रखें', text: lens.misconception });
      }
      if (pageNumber === 12 && lens) {
        page.push({ type: 'heading', level: 3, text: 'तीन तेज़ जाँच' }, { type: 'list', style: 'number', items: lens.checkpoints });
      }
      return page;
    });
  });
};

export const getChapterStudyPages = (chapter: Chapter, lessons: Lesson[], topicsOrMinimumPages: Topic[] | number = [], requestedMinimumPages = 12): ContentBlock[][] => {
  const topics = Array.isArray(topicsOrMinimumPages) ? topicsOrMinimumPages : [];
  const minimumPages = typeof topicsOrMinimumPages === 'number' ? topicsOrMinimumPages : requestedMinimumPages;
  const requiredPages = Math.max(12, minimumPages);
  const topicIds = new Set(chapter.topicIds);
  const chapterLessons = lessons.filter(l => topicIds.has(l.topicId));
  const chapterQuestions = allQuestions.filter(q => topicIds.has(q.topicId));
  const guides = subjectGuides[subjectFor(chapter)];
  const topicNames = topics.filter(t => chapter.topicIds.includes(t.id)).map(t => t.title);
  const lessonBlocks = chapterLessons.flatMap(l => l.content);
  const richBlocks = richChapterContent[chapter.id] ?? [];
  const lessonGroups = splitInto(lessonBlocks, requiredPages);
  const richGroups = splitInto(richBlocks, requiredPages);
  const questionGroups = splitInto(chapterQuestions, requiredPages);
  const objectives = Array.from(new Set(chapterLessons.flatMap(l => l.objectives))).slice(0, 8);
  const keyHeadings = Array.from(new Set(lessonBlocks.filter((b): b is Extract<ContentBlock,{type:'heading'}> => b.type === 'heading').map(b => b.text))).slice(0, 12);

  return Array.from({ length: requiredPages }, (_, pageIndex) => {
    const lessonGroup = lessonGroups[pageIndex] ?? [];
    const richGroup = richGroups[pageIndex] ?? [];
    const qGroup = questionGroups[pageIndex] ?? [];
    const topicTitle = topicNames[pageIndex % Math.max(1, topicNames.length)] ?? chapter.title;
    const page: ContentBlock[] = [
      pageTitle(chapter, pageIndex + 1, topicTitle),
      { type: 'callout', style: 'info', title: 'इस पृष्ठ का अध्ययन फोकस', text: guides[pageIndex % guides.length] },
    ];
    if (pageIndex === 0) {
      page.push({ type: 'paragraph', text: `${chapter.title} का अध्ययन मौजूदा source lessons, learning objectives, rich explanations और practice bank को जोड़कर व्यवस्थित किया गया है।` });
      if (objectives.length) page.push({ type: 'heading', level: 3, text: 'आप क्या सीखेंगे?' }, { type: 'list', style: 'bullet', items: objectives });
      if (keyHeadings.length) page.push({ type: 'callout', style: 'important', title: 'अध्याय के मुख्य हिस्से', text: keyHeadings.join(' · ') });
    }
    if (richGroup.length) { page.push({ type: 'callout', style: 'important', title: 'गहराई से समझें', text: 'यह भाग chapter की अतिरिक्त rich study source से लिया गया है।' }); page.push(...richGroup); }
    if (lessonGroup.length) { page.push({ type: 'callout', style: 'info', title: 'मूल पाठ-सामग्री', text: 'यहाँ existing lesson source की वास्तविक सामग्री दी गई है।' }); page.push(...lessonGroup); }
    if (qGroup.length) { page.push({ type: 'callout', style: 'example', title: 'अभ्यास से जाँचें', text: `${qGroup.length} source practice question के साथ अभी पढ़े concept को जाँचें।` }); qGroup.forEach(q => { const index = chapterQuestions.findIndex(item => item.id === q.id); page.push(...questionBlock(q, index)); }); }
    if (pageIndex === requiredPages - 3) { page.push({ type: 'heading', level: 3, text: 'त्वरित पुनरावृत्ति' }); if (keyHeadings.length) page.push({ type: 'list', style: 'bullet', items: keyHeadings.slice(0, 8).map(x => `मुख्य बिंदु: ${x}`) }); }
    if (pageIndex === requiredPages - 2) page.push({ type: 'heading', level: 3, text: 'परीक्षा से पहले क्या याद रखें?' }, { type: 'list', style: 'number', items: ['परिभाषा या मुख्य नियम बिना देखे दोहराएँ।','एक worked example का method खुद समझाएँ।','common mistake या misconception पहचानें।','practice explanations पढ़कर reasoning जाँचें।'] });
    if (pageIndex === requiredPages - 1) page.push({ type: 'heading', level: 3, text: 'Final Recall' }, { type: 'callout', style: 'important', title: '30 सेकंड recall', text: `${chapter.title} से तीन मुख्य concepts, दो examples और एक common mistake बिना notes के याद करें।` });
    return page;
  });
};

export const getChapterStudyWordCount = (chapter: Chapter, lessons: Lesson[], topics: Topic[] = []) => getChapterStudyPages(chapter, lessons, topics, 12).reduce((total, page) => total + approxWords(page), 0);
