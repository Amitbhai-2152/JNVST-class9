import type { Chapter, ContentBlock, Lesson, Topic } from "../../types";
import { allQuestions } from "../questions";
import { richChapterContent } from "./richChapterContent";
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
      pageTitle(chapter, index + 1, page.find((b) => b.type === "heading" && b.level === 2)?.text.replace(/^पृष्ठ\s+\d+\s+·\s*/, "").trim() ?? ""),
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

export const getChapterStudyPages = (chapter: Chapter, lessons: Lesson[], targetPages = 12): ContentBlock[][] => {
  const subject = subjectFor(chapter);
  if (subject === "विज्ञान") return getScienceChapterStudyPages(chapter);

  const source = lessons.filter((l) => chapter.topicIds.includes(l.topicId));
  const rich = richChapterContent[chapter.id] ?? [];
  const candidates = [...rich, ...source.flatMap((lesson) => lesson.content)];

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
