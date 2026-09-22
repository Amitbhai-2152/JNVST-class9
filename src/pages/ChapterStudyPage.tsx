import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { chapters, getSubject, topics } from "../data";
import { scienceLessonLens } from "../data/scienceLessonCore";
import { scienceMasteryUnits } from "../data/sciencePrep";
import { getScienceChapterStudyPages, getChapterStudyPages } from "../data/lessons/chapterStudy";
import { allLessons } from "../data";
import { MathAwareText, MathText } from "../components/MathText";
import type { ContentBlock } from "../types";

const InlineText = ({ text }: { text: string }) => <MathAwareText text={text} />;

const Content = ({ blocks }: { blocks: ContentBlock[] }) => (
  <div className="lesson-content">
    {blocks.map((b, i) => {
      switch (b.type) {
        case "heading": {
          const Tag = b.level === 2 ? "h2" : b.level === 3 ? "h3" : "h4";
          return <Tag key={i}><InlineText text={b.text} /></Tag>;
        }
        case "paragraph": return <p key={i}><InlineText text={b.text} /></p>;
        case "list": {
          const Tag = b.style === "number" ? "ol" : "ul";
          return <Tag key={i}>{b.items.map((x, j) => <li key={j}><InlineText text={x} /></li>)}</Tag>;
        }
        case "formula": return <div className="formula-block" key={i}><MathText value={b.expression} display /></div>;
        case "table":
          return <div className="table-wrap" key={i}><table><thead><tr>{b.headers.map((x, j) => <th key={j}><InlineText text={x} /></th>)}</tr></thead><tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((x, k) => <td key={k}><InlineText text={x} /></td>)}</tr>)}</tbody></table></div>;
        case "image":
          return <figure className="lesson-figure" key={i}><img src={b.src} alt={b.alt} onError={(e) => { e.currentTarget.style.display = "none"; }} />{b.caption && <figcaption>{b.caption}</figcaption>}</figure>;
        case "step-by-step":
          return <div className="steps" key={i}>{b.steps.map((x, j) => <div className="step" key={j}><span>{j + 1}</span><p><InlineText text={x} /></p></div>)}</div>;
        case "callout":
          return <aside className={"callout " + b.style} key={i}><strong>{b.title || "जानकारी"}</strong><p><InlineText text={b.text} /></p></aside>;
        default: return null;
      }
    })}
  </div>
);

const STAGES = [
  { id: "big-picture", name: "बड़ा चित्र", pages: "1–2", icon: "🧭", hint: "mental model" },
  { id: "concepts", name: "मुख्य शब्द", pages: "3", icon: "🔎", hint: "definitions" },
  { id: "deep-dive", name: "गहरी समझ", pages: "4–5", icon: "🧠", hint: "क्यों और कैसे" },
  { id: "application", name: "लगाकर देखें", pages: "6–8", icon: "🧪", hint: "process + examples" },
  { id: "exam-focus", name: "JNVST फोकस", pages: "9–10", icon: "🎯", hint: "compare + traps" },
  { id: "recall", name: "पक्का करें", pages: "11–12", icon: "✅", hint: "recall + check" },
] as const;

const stageForPage = (page: number) => {
  if (page < 2) return 0;
  if (page === 2) return 1;
  if (page < 5) return 2;
  if (page < 8) return 3;
  if (page < 10) return 4;
  return 5;
};

const cleanPageTitle = (page: ContentBlock[], fallback: string) => {
  const first = page.find((b) => b.type === "heading" && b.level === 2);
  return first?.type === "heading"
    ? first.text.replace(/^पृष्ठ\s+\d+\s+·\s*/, "").trim()
    : fallback;
};

export default function ChapterStudyPage() {
  const { chapterId } = useParams();
  const chapter = chapters.find((x) => x.id === chapterId);
  const subject = chapter ? getSubject(chapter.subjectId) : undefined;
  const isScience = chapter?.subjectId === "sub_sci";
  const topic = isScience && chapter ? topics.find((x) => x.id === chapter.topicIds[0]) : undefined;
  const mastery = isScience && topic ? scienceMasteryUnits.find((x) => x.topicId === topic.id) : undefined;
  const lens = isScience && topic ? scienceLessonLens[topic.id] : undefined;

  const sciencePages = useMemo(
    () => (chapter && isScience ? getScienceChapterStudyPages(chapter) : []),
    [chapter, isScience],
  );
  const genericPages = useMemo(
    () => (chapter && !isScience ? getChapterStudyPages(chapter, allLessons, 12) : []),
    [chapter, isScience],
  );
  const pages = isScience ? sciencePages : genericPages;

  const [page, setPage] = useState(0);
  useEffect(() => setPage(0), [chapterId]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
      if (event.key === "ArrowRight") setPage((p) => Math.min(pages.length - 1, p + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length]);

  if (!chapter || !subject) {
    return (
      <main className="app-shell">
        <header className="topbar"><Link to="/" className="brand">JNVST कक्षा 9</Link></header>
        <main className="shell"><section className="card empty"><h1>अध्याय नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></section></main>
      </main>
    );
  }

  if (!isScience) {
    const current = pages[page] ?? [];
    return (
      <div className="app-shell">
        <header className="topbar">
          <Link to="/" className="brand">JNVST कक्षा 9</Link>
          <nav><Link to="/">डैशबोर्ड</Link><Link to="/subjects">विषय</Link><Link to="/bookmarks">बुकमार्क</Link><Link to="/mock-tests">मॉक टेस्ट</Link></nav>
        </header>
        <main className="shell">
          <div className="page-head">
            <Link to={"/chapters/" + chapter.id}>← अध्याय</Link>
            <span className="eyebrow">{subject.title}</span>
            <h1>{chapter.title} — अध्याय अध्ययन</h1>
            <p>{pages.length} अध्ययन पृष्ठ</p>
          </div>
          <section className="card lesson-card">
            <div className="study-reader">
              <div className="study-reader-head"><div><b>अध्याय अध्ययन</b><span>पृष्ठ {page + 1} / {pages.length}</span></div><div className="study-progress"><span style={{ width: (((page + 1) / Math.max(1, pages.length)) * 100) + "%" }} /></div></div>
              <div className="study-page-nav">{pages.map((_, i) => <button key={i} className={i === page ? "active" : ""} onClick={() => setPage(i)}>{i + 1}</button>)}</div>
            </div>
            <Content blocks={current} />
            <div className="study-reader-actions">
              <button className="btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>← पिछला</button>
              {page < pages.length - 1
                ? <button className="btn primary" onClick={() => setPage((p) => p + 1)}>अगला पृष्ठ →</button>
                : <Link className="btn primary" to={"/chapters/" + chapter.id}>अध्याय पूरा करें →</Link>}
            </div>
          </section>
        </main>
      </div>
    );
  }

  const current = pages[page] ?? [];
  const stageIndex = stageForPage(page);
  const stage = STAGES[stageIndex];
  const progress = Math.round(((page + 1) / pages.length) * 100);
  const currentTitle = cleanPageTitle(current, stage.name);
  const nextChapter = chapters.find((x) => x.subjectId === "sub_sci" && x.order === chapter.order + 1);
  const prevChapter = chapters.find((x) => x.subjectId === "sub_sci" && x.order === chapter.order - 1);

  const jumpStage = (index: number) => {
    const starts = [0, 2, 3, 5, 8, 10];
    setPage(starts[index] ?? 0);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">JNVST कक्षा 9</Link>
        <nav><Link to="/">डैशबोर्ड</Link><Link to="/subjects">विषय</Link><Link to="/bookmarks">बुकमार्क</Link><Link to="/mock-tests">मॉक टेस्ट</Link></nav>
      </header>

      <main className="shell science-study-page">
        <div className="science-study-breadcrumb">
          <Link to="/subjects/sub_sci">← विज्ञान तैयारी केंद्र</Link>
          <span>अध्याय {String(chapter.order).padStart(2, "0")} / 18</span>
          <span className="science-study-keyhint">⌨️ ← → पृष्ठ</span>
        </div>

        <section className="science-study-hero">
          <div>
            <span className="eyebrow">SCIENCE • CHAPTER STUDY</span>
            <h1>{chapter.title}</h1>
            <p>12 पृष्ठों का एक ही learning path: पहले mental model, फिर concept, फिर application, फिर exam recall।</p>
          </div>
          <div className="science-study-hero-progress">
            <strong>{progress}%</strong>
            <span>पृष्ठ पूरे</span>
          </div>
        </section>

        <div className="science-study-layout">
          <aside className="science-study-sidebar">
            <div className="science-study-side-card">
              <span className="science-panel-label">STUDY ROADMAP</span>
              <div className="science-study-stage-list">
                {STAGES.map((item, index) => (
                  <button key={item.id} className={index === stageIndex ? "active" : ""} onClick={() => jumpStage(index)}>
                    <span className="science-study-stage-icon">{item.icon}</span>
                    <span><b>{item.name}</b><small>पृष्ठ {item.pages} · {item.hint}</small></span>
                    <em>{index < stageIndex ? "✓" : index === stageIndex ? "●" : String(index + 1)}</em>
                  </button>
                ))}
              </div>
            </div>

            {mastery && <div className="science-study-side-card">
              <span className="science-panel-label">आज का लक्ष्य</span>
              <ul className="science-side-list">{mastery.coreSkills.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="btn primary full" to={"/practice/" + topic?.id}>अध्याय के प्रश्न →</Link>
            </div>}

            {lens && <div className="science-study-side-card science-study-flow-card">
              <span className="science-panel-label">अध्याय की सोच</span>
              <b>{lens.bigQuestion}</b>
              <div className="science-mini-flow">{lens.flow.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div>
            </div>}
          </aside>

          <section className="science-study-main">
            <div className="science-study-pagebar">
              <div><span>{stage.icon} {stage.name}</span><strong>पृष्ठ {page + 1} / {pages.length}</strong></div>
              <div className="science-study-progress-track"><span style={{ width: progress + "%" }} /></div>
            </div>

            <article className="science-study-content-card">
              <div className="science-study-content-head">
                <div><span className="science-panel-label">PAGE {String(page + 1).padStart(2, "0")} · {topic?.title}</span><h2>{currentTitle}</h2></div>
                <span className="science-study-page-chip">{stageIndex < 2 ? "CONCEPT" : stageIndex < 4 ? "APPLICATION" : stageIndex === 4 ? "EXAM" : "RECALL"}</span>
              </div>

              <Content blocks={current.filter((b, index) => !(index === 0 && b.type === "heading"))} />

              <div className="science-study-page-actions">
                <button className="btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>← पिछला</button>
                <div className="science-study-dots" aria-label="पृष्ठ चयन">
                  {pages.map((_, index) => <button key={index} className={index === page ? "active" : ""} onClick={() => setPage(index)} aria-label={"पृष्ठ " + (index + 1)}><span /></button>)}
                </div>
                {page < pages.length - 1
                  ? <button className="btn primary" onClick={() => setPage((p) => p + 1)}>अगला पृष्ठ →</button>
                  : <Link className="btn primary" to={"/practice/" + topic?.id}>अब प्रश्न हल करें →</Link>}
              </div>
            </article>

            <div className="science-study-bottom-nav">
              {prevChapter ? <Link to={"/chapters/" + prevChapter.id} className="science-study-chapter-link">← {String(prevChapter.order).padStart(2, "0")} · {prevChapter.title}</Link> : <span />}
              {nextChapter ? <Link to={"/chapters/" + nextChapter.id} className="science-study-chapter-link next">{String(nextChapter.order).padStart(2, "0")} · {nextChapter.title} →</Link> : <span />}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
