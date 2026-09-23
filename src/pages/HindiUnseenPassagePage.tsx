import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { hindiUnseenPassages, type HindiUnseenPassageQuestion } from "../data/hindiUnseenPassages";

const levelClass = (level: string) => level.toLowerCase().replace(/[^a-z]+/g, "-");

const PassageQuestion = ({ question, index }: { question: HindiUnseenPassageQuestion; index: number }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const isCorrect = selected === question.correctIndex;

  return (
    <div className="unseen-question">
      <div className="unseen-question-head">
        <span className="unseen-question-number">Q{index + 1}</span>
        <span className="unseen-skill">{question.skill}</span>
      </div>
      <h3>{question.question}</h3>
      <div className="unseen-options">
        {question.options.map((option, optionIndex) => {
          const state = showAnswer
            ? optionIndex === question.correctIndex
              ? "correct"
              : selected === optionIndex
                ? "wrong"
                : ""
            : selected === optionIndex
              ? "selected"
              : "";
          return (
            <button
              key={option}
              className={"unseen-option " + state}
              onClick={() => { setSelected(optionIndex); setShowAnswer(false); }}
            >
              <span>{String.fromCharCode(65 + optionIndex)}</span>
              {option}
            </button>
          );
        })}
      </div>
      <div className="unseen-question-actions">
        {!showAnswer && <button className="btn" onClick={() => setShowAnswer(true)}>उत्तर और तरीका देखें</button>}
        <span className="unseen-hint">💡 पहले गद्यांश की पंक्ति या संकेत खोजें।</span>
      </div>
      {showAnswer && (
        <div className={"unseen-feedback " + (selected === null ? "neutral" : isCorrect ? "success" : "error")}>
          <strong>{selected === null ? "सही उत्तर" : isCorrect ? "✅ सही!" : "❌ फिर से देखें"}</strong>
          <p>सही उत्तर: <b>{String.fromCharCode(65 + question.correctIndex)}. {question.options[question.correctIndex]}</b></p>
          <p><b>कैसे हल करें:</b> {question.explanation}</p>
          {selected !== null && !isCorrect && (
            <p className="unseen-mistake">आपने {String.fromCharCode(65 + selected)} चुना। उत्तर को गद्यांश के प्रमाण से मिलाएँ।</p>
          )}
        </div>
      )}
    </div>
  );
};

export default function HindiUnseenPassagePage() {
  const [activeId, setActiveId] = useState(hindiUnseenPassages[0]?.id ?? "");
  const [level, setLevel] = useState("All");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const visiblePassages = useMemo(
    () => level === "All" ? hindiUnseenPassages : hindiUnseenPassages.filter((item) => item.level === level),
    [level],
  );
  const active = visiblePassages.find((item) => item.id === activeId) ?? visiblePassages[0];
  const totalQuestions = hindiUnseenPassages.reduce((sum, passage) => sum + passage.questions.length, 0);

  const changeLevel = (next: string) => {
    setLevel(next);
    const first = next === "All" ? hindiUnseenPassages[0] : hindiUnseenPassages.find((item) => item.level === next);
    if (first) setActiveId(first.id);
  };

  if (!active) return null;

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">JNVST कक्षा 9</Link>
        <nav>
          <Link to="/">डैशबोर्ड</Link>
          <Link to="/subjects">विषय</Link>
          <Link to="/bookmarks">बुकमार्क</Link>
          <Link to="/mock-tests">मॉक टेस्ट</Link>
        </nav>
      </header>

      <main className="shell unseen-passage-page">
        <div className="page-head">
          <Link to="/chapters/chap_hin_06/study">← हिंदी बोध अध्याय</Link>
          <span className="eyebrow">HINDI • UNSEEN COMPREHENSION LAB</span>
          <h1>अपठित बोध अभ्यास</h1>
          <p>10 मौलिक गद्यांश · {totalQuestions} MCQs · मुख्य भाव, तथ्य, कारण, निष्कर्ष, शब्दार्थ, शीर्षक और लेखक का उद्देश्य।</p>
        </div>

        <section className="unseen-hero">
          <div>
            <span className="science-panel-label">LAB METHOD</span>
            <h2>पहले गद्यांश समझें, फिर उत्तर के लिए प्रमाण खोजें।</h2>
            <p>उत्तर देखने से पहले विकल्प चुनें। इसके बाद explanation से अपने reading method की जाँच करें।</p>
          </div>
          <div className="unseen-hero-stat">
            <b>10</b>
            <span>मौलिक गद्यांश</span>
            <small>{totalQuestions} प्रश्न</small>
          </div>
        </section>

        <div className="unseen-levels">
          {["All", "Beginner", "Basic", "JNVST", "Challenge"].map((item) => (
            <button key={item} className={level === item ? "active" : ""} onClick={() => changeLevel(item)}>
              {item === "All" ? "सभी" : item}
            </button>
          ))}
        </div>

        <div className="unseen-layout">
          <aside className="unseen-sidebar">
            <div className="unseen-sidebar-card">
              <span className="science-panel-label">गद्यांश सूची</span>
              <div className="unseen-list">
                {visiblePassages.map((item, index) => (
                  <button key={item.id} className={item.id === active.id ? "active" : ""} onClick={() => setActiveId(item.id)}>
                    <span className="unseen-list-number">{String(index + 1).padStart(2, "0")}</span>
                    <span><b>{item.title}</b><small>{item.level} · {item.questions.length} प्रश्न</small></span>
                    <em>{completed[item.id] ? "✓" : "→"}</em>
                  </button>
                ))}
              </div>
            </div>
            <Link className="btn full" to="/chapters/chap_hin_06/study">बोध का concept lesson →</Link>
          </aside>

          <section className="unseen-main">
            <article className="unseen-passage-card">
              <div className="unseen-passage-head">
                <div>
                  <span className={"unseen-level " + levelClass(active.level)}>{active.level}</span>
                  <h2>{active.title}</h2>
                </div>
                <span className="unseen-count">{active.questions.length} प्रश्न</span>
              </div>

              <div className="unseen-passage-box">
                <span className="science-panel-label">गद्यांश पढ़ें</span>
                <p>{active.passage}</p>
              </div>

              <div className="unseen-instruction">
                <b>अभ्यास क्रम:</b> पूरा गद्यांश पढ़ें → प्रश्न का प्रकार पहचानें → पाठ में प्रमाण खोजें → विकल्प चुनें → explanation से तरीका जाँचें।
              </div>

              <div className="unseen-questions">
                {active.questions.map((question, index) => (
                  <PassageQuestion key={question.id} question={question} index={index} />
                ))}
              </div>

              <div className="unseen-complete-actions">
                <button className="btn primary" onClick={() => setCompleted((state) => ({ ...state, [active.id]: true }))}>
                  ✓ गद्यांश पूरा किया
                </button>
                <button
                  className="btn"
                  disabled={!visiblePassages.some((item) => item.id !== active.id)}
                  onClick={() => {
                    const index = visiblePassages.findIndex((item) => item.id === active.id);
                    const next = visiblePassages[(index + 1) % visiblePassages.length];
                    if (next) setActiveId(next.id);
                  }}
                >
                  अगला गद्यांश →
                </button>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
