import type { Chapter, ContentBlock, Lesson, Topic, ID } from "../../types";
import { allQuestions } from "../questions";
import { richChapterContent } from "./richChapterContent";
import { hindiMasteryUnitMap, hindiMasteryUnits } from "../hindiPrep";
import { scienceStudyPages, scienceLessonCore, scienceLessonLens } from "../scienceLessonCore";

const subjectGuides: Record<"अंग्रेज़ी" | "हिंदी" | "गणित" | "विज्ञान", string[]> = {
  अंग्रेज़ी: ["नियम, उदाहरण और संदर्भ को साथ पढ़ें; उत्तर केवल अनुमान से न चुनें.","मुख्य grammar या vocabulary pattern और clue words पहचानें।","उदाहरण को अपने शब्दों में समझाएँ और explanation से मिलाएँ।","meaning, structure और context की तुलना करें।","नए sentence या passage पर rule लगाएँ।","common error और सही रूप याद करें।","उत्तर का प्रमाण passage से खोजें।","मुख्य points बिना notes recall करें।","practice से पहले concept और clue पहचानें।","गलत उत्तर का कारण समझें।","rule → example → error/exception दोहराएँ।","chapter के key ideas active recall से दोहराएँ।"],
  हिंदी: ["मुख्य भाषा या व्याकरण अवधारणा को अर्थ और प्रयोग के साथ समझें।","शब्द या वाक्य में नियम का संकेत खोजें।","रूप, अर्थ और संदर्भ तीनों देखें।","मिलते-जुलते विकल्पों की सूक्ष्म भिन्नता पहचानें।","उदाहरण को बिना notes दोहराएँ।","सामान्य अशुद्धि और शुद्ध रूप साथ याद करें।","गद्यांश का उत्तर पाठ से प्रमाणित करें।","नए उदाहरण पर नियम लगाएँ।","clue → rule → answer रखें।","गलती का कारण समझें।","तीन मुख्य बातें recall करें।","concept + example + mistake revise करें।"],
  गणित: ["concept, symbols और conditions पहचानें।","formula/property क्यों लागू है समझें।","हर calculation step का कारण देखें।","signs, denominators और operations जाँचें।","समान नया example खुद बनाएं।","data, unknown और relation अलग करें।","formula की conditions verify करें।","दूसरी method से cross-check करें।","गलत विकल्प क्यों गलत है समझें।","उत्तर की अनुमान से जाँच करें।","formula और method recall करें।","concept + formula + method + error revise करें।"],
  विज्ञान: ["अवधारणा को कारण → प्रक्रिया → परिणाम में समझें।","मुख्य terms और functions अलग करें।","example को observation/application से जोड़ें।","समान concepts का अंतर पहचानें।","conditions बदलने पर परिणाम जाँचें।","diagram/sequence/classification को explanation से जोड़ें।","common misconception पहचानें।","cause और observable effect अलग करें।","important fact active recall से दोहराएँ।","गलत option के पीछे की concept समझें।","तीन key facts और एक application recall करें।","concept + process + example + misconception revise करें।"],
};

const subjectFor = (chapter: Chapter) =>
  chapter.id.startsWith("chap_eng_") ? "अंग्रेज़ी" as const :
  chapter.id.startsWith("chap_hin_") ? "हिंदी" as const :
  chapter.id.startsWith("chap_math_") ? "गणित" as const : "विज्ञान" as const;

const textFor = (block: ContentBlock): string => {
  switch (block.type) {
    case "heading": return block.text;
    case "paragraph": return block.text;
    case "formula": return block.expression;
    case "list": return block.items.join(" ");
    case "step-by-step": return block.steps.join(" ");
    case "callout": return `${block.title ?? ""} ${block.text}`.trim();
    case "table": return `${block.headers.join(" ")} ${block.rows.flat().join(" ")}`;
    case "image": return `${block.alt} ${block.caption ?? ""}`.trim();
  }
};

const approxWords = (blocks: ContentBlock[]) =>
  blocks.reduce((n, b) => n + textFor(b).split(/\s+/).filter(Boolean).length, 0);

const questionBlock = (q: (typeof allQuestions)[number], index: number): ContentBlock[] => {
  const correct = q.correctOptionIds
    .map((id) => q.options.find((o) => o.id === id)?.text)
    .filter((x): x is string => Boolean(x))
    .join(" | ");
  return [
    { type: "heading", level: 3, text: `स्वयं जाँच ${index + 1}` },
    ...(q.text ?? [{ type: "paragraph" as const, text: q.textPlain ?? "प्रश्न पढ़ें और विकल्पों की तुलना करें।" }]),
    { type: "list", style: "bullet", items: q.options.map((o) => `${o.id}: ${o.text}`) },
    { type: "callout", style: "example", title: "सही उत्तर", text: correct || "स्रोत प्रश्न में दिए गए सही विकल्प को जाँचें।" },
    ...(q.explanation ?? [{ type: "callout" as const, style: "info" as const, title: "समझें", text: q.explanationPlain ?? "यह प्रश्न उसी concept को जाँचता है जिसे आपने अभी पढ़ा है।" }]),
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

const pageTitle = (chapter: Chapter, pageNumber: number, topicTitle: string): ContentBlock =>
  ({ type: "heading", level: 2, text: `अध्ययन पृष्ठ ${pageNumber} — ${chapter.title} · ${topicTitle}` });

export const getScienceChapterStudyPages = (chapter: Chapter): ContentBlock[][] => {
  const topicId = chapter.topicIds[0];
  const stored = topicId ? scienceStudyPages[topicId] : undefined;
  if (stored?.length === 12) {
    return stored.map((page, index) => [
      pageTitle(
        chapter,
        index + 1,
        (() => {
          const pageHeading = page.find((b): b is Extract<ContentBlock, { type: "heading" }> => b.type === "heading" && b.level === 2);
          return pageHeading?.text.replace(/^पृष्ठ\s+\d+\s+·\s*/, "").trim() ?? "";
        })(),
      ),
      ...page.slice(1),
    ]);
  }
  const core = topicId ? (scienceLessonCore[topicId] ?? []) : [];
  const fallback: ContentBlock[][] = [];
  let current: ContentBlock[] = [];
  for (const block of core) {
    if (block.type === "heading" && block.level === 2 && current.length) {
      fallback.push(current);
      current = [];
    }
    current.push(block);
  }
  if (current.length) fallback.push(current);
  const lens = topicId ? scienceLessonLens[topicId] : undefined;
  const pages: ContentBlock[][] = [];
  for (let i = 0; i < 6; i += 1) {
    const blocks = fallback[i] ?? [];
    pages.push([pageTitle(chapter, i * 2 + 1, "अध्याय अध्ययन"), ...blocks.slice(1), ...(i === 0 && lens ? [{ type: "callout" as const, style: "important" as const, title: "इस अध्याय का बड़ा सवाल", text: lens.bigQuestion }] : [])]);
    pages.push([pageTitle(chapter, i * 2 + 2, "अध्याय अध्ययन"), ...blocks.slice(1)]);
  }
  return pages.slice(0, 12);
};

const hindiPage = (chapter: Chapter, pageNumber: number, topicTitle: string, sectionTitle: string, blocks: ContentBlock[]): ContentBlock[] => [
  pageTitle(chapter, pageNumber, topicTitle),
  { type: 'heading', level: 3, text: sectionTitle },
  ...blocks,
];

const hindiList = (items: string[]): ContentBlock[] =>
  items.length ? [{ type: 'list', style: 'bullet', items }] : [];

const hindiSelfCheck = (questions: typeof allQuestions, startIndex = 0): ContentBlock[] =>
  questions.flatMap((q, index) => questionBlock(q, startIndex + index));

export const getHindiChapterStudyPages = (chapter: Chapter): ContentBlock[][] => {
  const units = chapter.topicIds
    .map((topicId) => hindiMasteryUnitMap.get(topicId))
    .filter(Boolean) as typeof hindiMasteryUnits;

  if (!units.length) {
    return getChapterStudyPages(chapter, [], 12);
  }

  const chapterQuestions = allQuestions.filter(
    (q) => q.chapterId === chapter.id && q.metadata?.jnvstCompatible,
  );

  const pages: ContentBlock[][] = [];
  let pageNumber = 1;

  const pushUnitPages = (unit: typeof hindiMasteryUnits[number], count: number) => {
    if (count === 3) {
      pages.push(
        hindiPage(chapter, pageNumber++, unit.title, 'समझें · नियम पहचानें', [
          { type: 'paragraph', text: `इस विषयांश में ${unit.title} के मूल अर्थ, पहचान और परीक्षा में उपयोग होने वाले संकेत समझें।` },
          ...hindiList(unit.coreSkills),
          ...hindiList(unit.mustKnow),
        ]),
        hindiPage(chapter, pageNumber++, unit.title, 'उदाहरण · लगाएँ', [
          ...hindiList(unit.examples),
          { type: 'step-by-step', title: 'लगाने की विधि', steps: unit.solveMethod },
          ...hindiList(unit.examTraps),
        ]),
        hindiPage(chapter, pageNumber++, unit.title, 'JNVST फोकस · स्वयं जाँच', [
          ...hindiList(unit.examFocus),
          ...hindiList(unit.quickFacts),
          ...hindiSelfCheck(chapterQuestions.filter((q) => q.topicId === unit.topicId).slice(0, 1)),
        ]),
      );
      return;
    }

    pages.push(
      hindiPage(chapter, pageNumber++, unit.title, 'समझें', [
        { type: 'paragraph', text: `पहले ${unit.title} का अर्थ और इसका उपयोग समझें।` },
        ...hindiList(unit.coreSkills),
      ]),
      hindiPage(chapter, pageNumber++, unit.title, 'नियम पहचानें', [
        ...hindiList(unit.mustKnow),
        ...hindiList(unit.quickFacts),
      ]),
      hindiPage(chapter, pageNumber++, unit.title, 'उदाहरण', [
        ...hindiList(unit.examples),
      ]),
      hindiPage(chapter, pageNumber++, unit.title, 'लगाएँ', [
        { type: 'step-by-step', title: 'Solve Method', steps: unit.solveMethod },
        ...hindiList(unit.examTraps),
      ]),
      hindiPage(chapter, pageNumber++, unit.title, 'JNVST फोकस', [
        ...hindiList(unit.examFocus),
        ...hindiSelfCheck(chapterQuestions.filter((q) => q.topicId === unit.topicId).slice(0, 1)),
      ]),
    );
  };

  if (units.length === 1) {
    const unit = units[0];
    pages.push(
      hindiPage(chapter, pageNumber++, unit.title, 'समझें · मूल ढाँचा', [
        { type: 'paragraph', text: `JNVST के लिए ${unit.title} को केवल परिभाषा की तरह नहीं, बल्कि पहचान + प्रयोग + विकल्पों की तुलना के रूप में सीखें।` },
        ...hindiList(unit.coreSkills),
      ]),
      hindiPage(chapter, pageNumber++, unit.title, 'नियम पहचानें · मुख्य नियम', hindiList(unit.mustKnow)),
      hindiPage(chapter, pageNumber++, unit.title, 'सूक्ष्म तथ्य और उदाहरण', [
        ...hindiList(unit.quickFacts),
        ...hindiList(unit.examples),
      ]),
      hindiPage(chapter, pageNumber++, unit.title, 'लगाएँ · चरणबद्ध विधि', [
        { type: 'step-by-step', title: 'उत्तर तक पहुँचने की विधि', steps: unit.solveMethod },
      ]),
      hindiPage(chapter, pageNumber++, unit.title, 'JNVST ट्रैप्स', hindiList(unit.examTraps)),
      hindiPage(chapter, pageNumber++, unit.title, 'JNVST फोकस', [
        ...hindiList(unit.examFocus),
        { type: 'callout', style: 'important', title: 'स्वर्ण नियम', text: 'पहचान → नियम → संदर्भ → विकल्प हटाएँ → उत्तर सत्यापित करें।' },
      ]),
    );

    const selfChecks = chapterQuestions.filter((q) => q.topicId === unit.topicId).slice(0, 10);
    const groups = splitInto(selfChecks, 5);
    groups.forEach((group, index) => {
      pages.push(hindiPage(chapter, pageNumber++, unit.title, `स्वयं जाँच ${index + 1}`, hindiSelfCheck(group, index * 2)));
    });

    pages.push(hindiPage(chapter, pageNumber++, unit.title, 'पक्का करें · अंतिम recall', [
      ...hindiList(unit.mustKnow.slice(0, 4)),
      ...hindiList(unit.examTraps.slice(0, 3)),
      ...hindiList(unit.examFocus.slice(0, 4)),
    ]));
    return pages.slice(0, 12);
  }

  const perUnit = units.length === 2 ? 5 : 3;
  units.forEach((unit) => pushUnitPages(unit, perUnit));

  const mixedQuestions = chapterQuestions.slice(0, 10);
  const mixedGroups = splitInto(mixedQuestions, units.length === 2 ? 2 : 3);
  mixedGroups.forEach((group, index) => {
    pages.push(hindiPage(
      chapter,
      pageNumber++,
      units.map((unit) => unit.title).join(' · '),
      `मिश्रित JNVST अभ्यास ${index + 1}`,
      [
        { type: 'paragraph', text: 'अब अलग-अलग विषयांशों के बीच सूक्ष्म अंतर पहचानते हुए प्रश्न हल करें।' },
        ...hindiSelfCheck(group, index * group.length),
      ],
    ));
  });

  return pages.slice(0, 12);
};

export const getChapterStudyPages = (chapter: Chapter, lessons: Lesson[], targetPages = 12): ContentBlock[][] => {
  const subject = subjectFor(chapter);
  if (subject === "विज्ञान") return getScienceChapterStudyPages(chapter);

  const source = lessons.filter((l) => chapter.topicIds.includes(l.topicId));
  const rich = richChapterContent[chapter.id] ?? [];
  const sourceBlocks = source.flatMap((lesson) => lesson.content);

  // English Chapter 1 needs deliberate pedagogy rather than word-balanced pagination:
  // keep each real passage visible as a coherent lesson section, followed by its
  // worked question types. This prevents the passage from being split/hidden
  // among arbitrary pages.
  if (chapter.id === "chap_eng_01" && targetPages === 12 && rich.length) {
    const headingIndex = (title: string) =>
      rich.findIndex((block) => block.type === "heading" && block.level === 3 && block.text === title);

    const sliceBetween = (startTitle: string, endTitle?: string): ContentBlock[] => {
      const start = headingIndex(startTitle);
      const end = endTitle ? headingIndex(endTitle) : rich.length;
      if (start < 0 || end < 0 || end <= start) return [];
      return rich.slice(start, end);
    };

    const guidedPages: ContentBlock[][] = [
      sliceBetween("अपठित गद्यांश: पहले Passage, फिर Question", "Question 1 — मुख्य विचार (Main Idea)"),
      sliceBetween("Question 1 — मुख्य विचार (Main Idea)", "Question 4 — Pronoun Reference"),
      sliceBetween("Question 4 — Pronoun Reference", "Passage 2 — The Lost Wallet"),
      sliceBetween("Passage 2 — The Lost Wallet", "Question 1 — Fact"),
      sliceBetween("Question 1 — Fact", "Question 4 — Meaning from Context"),
      sliceBetween("Question 4 — Meaning from Context", "एक Passage से कई skills क्यों सीखें?"),
      sliceBetween("एक Passage से कई skills क्यों सीखें?", "Exam में पूरा Passage कैसे solve करें?"),
      sliceBetween("Exam में पूरा Passage कैसे solve करें?", "एक बहुत महत्वपूर्ण नियम"),
      sliceBetween("एक बहुत महत्वपूर्ण नियम"),
    ].filter((blocks) => blocks.length);

    const sourcePages = splitInto(sourceBlocks, 3).map((blocks, index) =>
      blocks.length
        ? blocks
        : [{ type: "paragraph" as const, text: subjectGuides[subject][index % subjectGuides[subject].length] }],
    );

    return [...guidedPages, ...sourcePages]
      .slice(0, 12)
      .map((blocks, i) => [pageTitle(chapter, i + 1, chapter.title), ...blocks]);
  }

  const candidates = [...rich, ...sourceBlocks];

  if (!candidates.length) {
    const guide = subjectGuides[subject];
    return splitInto(guide.map((text) => ({ type: "paragraph" as const, text })), targetPages)
      .map((blocks, i) => [pageTitle(chapter, i + 1, chapter.title), ...blocks]);
  }

  const pageCount = Math.max(1, targetPages);
  const chunks: ContentBlock[][] = Array.from({ length: pageCount }, () => []);
  const weighted = candidates.map((block) => ({ block, words: Math.max(1, approxWords([block])) }));
  const total = weighted.reduce((sum, item) => sum + item.words, 0);
  let currentIndex = 0;
  let accumulated = 0;

  for (const item of weighted) {
    const target = ((currentIndex + 1) / pageCount) * total;
    if (currentIndex < pageCount - 1 && accumulated >= target) currentIndex += 1;
    chunks[currentIndex].push(item.block);
    accumulated += item.words;
  }

  const nonEmpty = chunks.filter((chunk) => chunk.length);
  while (nonEmpty.length < pageCount) nonEmpty.push([{ type: "paragraph", text: subjectGuides[subject][nonEmpty.length % subjectGuides[subject].length] }]);
  return splitInto(nonEmpty.flat(), pageCount).map((blocks, i) => [pageTitle(chapter, i + 1, chapter.title), ...blocks]);
};

export const getChapterStudyQuestions = (chapter: Chapter, topicIds: ID[], limit = 12): ContentBlock[][] => {
  const qs = allQuestions.filter((q) => q.chapterId === chapter.id || topicIds.includes(q.topicId)).slice(0, limit);
  return splitInto(qs.flatMap((q, i) => questionBlock(q, i)), Math.min(3, Math.max(1, Math.ceil(qs.length / 4))));
};
