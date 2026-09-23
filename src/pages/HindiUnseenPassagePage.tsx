import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { hindiUnseenPassages, type HindiUnseenPassageQuestion } from "../data/hindiUnseenPassages";

const levelClass = (level: string) => level.toLowerCase().replace(/[^a-z]+/g, "-");

const getQuestionSeed = (id: string) => {
  let hash = 2166136261;
  for (let index = 0; index < id.length; index += 1) {
    hash ^= id.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const shuffleIndices = (id: string) => {
  const indices = [0, 1, 2, 3];
  let seed = getQuestionSeed(id);
  const random = () => {
    seed = Math.imul(seed ^ (seed >>> 16), 2246822519) >>> 0;
    seed = Math.imul(seed ^ (seed >>> 13), 3266489917) >>> 0;
    return ((seed ^ (seed >>> 16)) >>> 0) / 4294967296;
  };
  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [indices[index], indices[swapIndex]] = [indices[swapIndex], indices[index]];
  }
  return indices;
};

const skillHint: Record<string, string> = {
  "मुख्य भाव": "पूरे गद्यांश का केंद्रीय विचार पकड़ें; किसी एक उदाहरण को मुख्य भाव न मानें।",
  "मुख्य विचार": "पूछे गए विचार को पूरे गद्यांश से मिलाएँ, केवल शुरुआती वाक्य से नहीं।",
  "तथ्य": "उत्तर सीधे गद्यांश में दिए गए विवरण से प्रमाणित करें।",
  "कारण": "घटना के पहले-पश्चात संकेतों को जोड़कर कारण पहचानें।",
  "परिणाम": "कार्रवाई के बाद क्या बदला, यह देखें; कारण और परिणाम को अलग रखें।",
  "निष्कर्ष": "जो बात passage से तार्किक रूप से निकलती है, वही चुनें; बाहर की जानकारी न जोड़ें।",
  "शब्दार्थ": "शब्द को उसके वाक्य-संदर्भ में पढ़ें और उसी अर्थ से विकल्प मिलाएँ।",
  "शीर्षक": "ऐसा शीर्षक चुनें जो पूरे गद्यांश को समेटे, केवल एक घटना को नहीं।",
  "उद्देश्य": "लेखक/पात्र ने यह बात या कार्य क्यों किया—इसी लक्ष्य को खोजें।",
  "क्रम": "घटनाओं का क्रम passage में दिए संकेतों के आधार पर पुनर्निर्मित करें।",
  "समस्या": "गद्यांश में मूल कठिनाई या बाधा को स्पष्ट रूप से पहचानें।",
  "समस्या-समाधान": "समस्या → कार्रवाई → परिणाम की पूरी chain देखें।",
  "मुख्य संदेश": "अंतिम सीख को कहानी के किसी एक विवरण से अलग करके समझें।",
};

const allSkills = Array.from(new Set(
  hindiUnseenPassages.flatMap((passage) => passage.questions.map((question) => question.skill)),
));

type QuestionState = { selected: number | null; revealed: boolean };

const PassageQuestion = ({
  question,
  index,
  state,
  onSelect,
  onReveal,
  onReset,
}: {
  question: HindiUnseenPassageQuestion;
  index: number;
  state: QuestionState;
  onSelect: (optionIndex: number) => void;
  onReveal: () => void;
  onReset: () => void;
}) => {
  const order = shuffleIndices(question.id);
  const displayCorrectIndex = order.findIndex((sourceIndex) => sourceIndex === question.correctIndex);
  const isCorrect = state.selected === displayCorrectIndex;
  const isLocked = state.revealed;

  return (
    <div className="unseen-question">
      <div className="unseen-question-head">
        <span className="unseen-question-number">Q{index + 1}</span>
        <span className="unseen-skill">{question.skill}</span>
      </div>
      <h3>{question.question}</h3>

      <div className="unseen-options" role="radiogroup" aria-label={"प्रश्न " + (index + 1) + " विकल्प"}>
        {(() => {
          const order = shuffleIndices(question.id);
          const displayOptions = order.map((sourceIndex) => ({
            sourceIndex,
            text: question.options[sourceIndex],
          }));
          const displayCorrectIndex = displayOptions.findIndex((item) => item.sourceIndex === question.correctIndex);

          return displayOptions.map((option, optionIndex) => {
            const stateClass = state.revealed
              ? optionIndex === displayCorrectIndex
                ? "correct"
                : state.selected === optionIndex
                  ? "wrong"
                  : ""
              : state.selected === optionIndex
                ? "selected"
                : "";

            return (
              <button
                key={option.text}
                type="button"
                className={"unseen-option " + stateClass}
                disabled={isLocked}
                aria-pressed={state.selected === optionIndex}
                onClick={() => onSelect(optionIndex)}
              >
                <span>{String.fromCharCode(65 + optionIndex)}</span>
                <span>{option.text}</span>
              </button>
            );
          });
        })()}
      </div>

      <div className="unseen-question-actions">
        {!state.revealed ? (
          <button className="btn" type="button" disabled={state.selected === null} onClick={onReveal}>
            उत्तर और प्रमाण देखें
          </button>
        ) : (
          <button className="btn" type="button" onClick={onReset}>फिर से हल करें</button>
        )}
        <span className="unseen-hint">
          💡 {skillHint[question.skill] ?? "पहले passage में प्रमाण खोजें, फिर विकल्प से मिलाएँ।"}
        </span>
      </div>

      {state.revealed && (
        <div className={"unseen-feedback " + (isCorrect ? "success" : "error")}>
          <strong>{isCorrect ? "✅ सही! प्रमाण से मिलान सही है।" : "❌ passage के प्रमाण से दोबारा मिलाएँ।"}</strong>
          <p>
            सही उत्तर: <b>{String.fromCharCode(65 + displayCorrectIndex)}. {question.options[question.correctIndex]}</b>
          </p>
          <p><b>कैसे हल करें:</b> {question.explanation}</p>
          {!isCorrect && state.selected !== null && (
            <p className="unseen-mistake">
              आपने {String.fromCharCode(65 + state.selected)} चुना। अब passage की संबंधित पंक्ति या संकेत दोबारा खोजें।
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default function HindiUnseenPassagePage() {
  const [activeId, setActiveId] = useState(hindiUnseenPassages[0]?.id ?? "");
  const [level, setLevel] = useState("All");
  const [skill, setSkill] = useState("All");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [responses, setResponses] = useState<Record<string, QuestionState>>({});

  const visiblePassages = useMemo(
    () => level === "All" ? hindiUnseenPassages : hindiUnseenPassages.filter((item) => item.level === level),
    [level],
  );
  const active = visiblePassages.find((item) => item.id === activeId) ?? visiblePassages[0];

  const visibleQuestions = useMemo(
    () => !active || skill === "All" ? (active?.questions ?? []) : active.questions.filter((question) => question.skill === skill),
    [active, skill],
  );

  const totalQuestions = hindiUnseenPassages.reduce((sum, passage) => sum + passage.questions.length, 0);
  const checkedCount = active?.questions.reduce(
    (sum, question) => sum + (responses[question.id]?.revealed ? 1 : 0),
    0,
  ) ?? 0;
  const activeCorrect = active?.questions.reduce(
    (sum, question) => {
      const state = responses[question.id];
      return sum + (state?.revealed && state.selected === question.correctIndex ? 1 : 0);
    },
    0,
  ) ?? 0;
  const accuracy = checkedCount > 0 ? Math.round((activeCorrect / checkedCount) * 100) : 0;
  const passageComplete = Boolean(active && checkedCount === active.questions.length);

  const setQuestionState = (id: string, next: QuestionState) => {
    setResponses((current) => ({ ...current, [id]: next }));
  };

  const changeLevel = (next: string) => {
    setLevel(next);
    const first = next === "All" ? hindiUnseenPassages[0] : hindiUnseenPassages.find((item) => item.level === next);
    if (first) {
      setActiveId(first.id);
      setSkill("All");
    }
  };

  const changePassage = (id: string) => {
    setActiveId(id);
    setSkill("All");
  };

  const resetPassage = () => {
    if (!active) return;
    setResponses((current) => {
      const next = { ...current };
      active.questions.forEach((question) => { delete next[question.id]; });
      return next;
    });
    setCompleted((current) => ({ ...current, [active.id]: false }));
  };

  if (!active) return null;

  return (
    <div className="app-shell hindi-unseen-lab">
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
          <p>10 मौलिक गद्यांश · {totalQuestions} MCQs · मुख्य भाव, तथ्य, कारण, निष्कर्ष, शब्दार्थ, शीर्षक, क्रम, उद्देश्य और संदेश।</p>
        </div>

        <section className="unseen-hero">
          <div>
            <span className="science-panel-label">COMPREHENSION METHOD</span>
            <h2>पहले अर्थ समझें, फिर passage से प्रमाण खोजें।</h2>
            <p>हर प्रश्न में पहले विकल्प चुनें, फिर उत्तर और explanation देखें। लक्ष्य केवल सही उत्तर नहीं, बल्कि प्रमाण-आधारित reading बनाना है।</p>
          </div>
          <div className="unseen-hero-stat">
            <b>{totalQuestions}</b>
            <span>कुल प्रश्न</span>
            <small>{hindiUnseenPassages.length} मौलिक गद्यांश</small>
          </div>
        </section>

        <section className="unseen-toolkit">
          <div className="unseen-toolkit-main">
            <span className="science-panel-label">READING TOOLKIT</span>
            <h2>5-चरण की comprehension strategy</h2>
            <div className="unseen-toolkit-steps">
              {[
                ["01", "पहले पूरा पढ़ें", "शुरू में विकल्प या कठिन शब्द पर रुकें नहीं।"],
                ["02", "प्रश्न का प्रकार पहचानें", "तथ्य, कारण, निष्कर्ष, शब्दार्थ, शीर्षक आदि अलग-अलग सोचें।"],
                ["03", "प्रमाण खोजें", "उत्तर passage की किस पंक्ति/संकेत से साबित होता है, देखें।"],
                ["04", "विकल्प काटें", "जो बहुत व्यापक, असंबंधित या passage से बाहर हो उसे हटाएँ।"],
                ["05", "फिर उत्तर चुनें", "सबसे प्रमाणित और पूरे passage से मेल खाता विकल्प लें।"],
              ].map(([number, title, text]) => (
                <div className="unseen-toolkit-step" key={number}>
                  <span>{number}</span>
                  <div><b>{title}</b><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div className="unseen-score-card">
            <span className="science-panel-label">CURRENT PASSAGE</span>
            <strong>{checkedCount}/{active.questions.length}</strong>
            <span>प्रश्न जाँचे</span>
            <div className="unseen-progress-track" aria-label={"प्रगति " + checkedCount + " / " + active.questions.length}>
              <span style={{ width: ((checkedCount / active.questions.length) * 100) + "%" }} />
            </div>
            <div className="unseen-score-row"><b>{activeCorrect}/{checkedCount || 0}</b><span>सही</span></div>
            <div className="unseen-score-row"><b>{accuracy}%</b><span>सटीकता</span></div>
          </div>
        </section>

        <div className="unseen-levels" aria-label="कठिनाई स्तर">
          {["All", "Beginner", "Basic", "JNVST", "Challenge"].map((item) => (
            <button key={item} className={level === item ? "active" : ""} type="button" onClick={() => changeLevel(item)}>
              {item === "All" ? "सभी" : item}
            </button>
          ))}
        </div>

        <section className="unseen-skill-filter" aria-label="प्रश्न कौशल फ़िल्टर">
          <div>
            <span className="science-panel-label">QUESTION SKILL</span>
            <b>आज किस reading skill पर काम करना है?</b>
          </div>
          <div className="unseen-skill-chips">
            <button type="button" className={skill === "All" ? "active" : ""} onClick={() => setSkill("All")}>सभी कौशल</button>
            {allSkills.map((item) => (
              <button key={item} type="button" className={skill === item ? "active" : ""} onClick={() => setSkill(item)}>{item}</button>
            ))}
          </div>
        </section>

        <div className="unseen-layout">
          <aside className="unseen-sidebar">
            <div className="unseen-sidebar-card">
              <span className="science-panel-label">गद्यांश सूची</span>
              <div className="unseen-list">
                {visiblePassages.map((item, index) => (
                  <button
                    key={item.id}
                    className={item.id === active.id ? "active" : ""}
                    type="button"
                    onClick={() => changePassage(item.id)}
                  >
                    <span className="unseen-list-number">{String(index + 1).padStart(2, "0")}</span>
                    <span><b>{item.title}</b><small>{item.level} · {item.questions.length} प्रश्न</small></span>
                    <em>{completed[item.id] ? "✓" : "→"}</em>
                  </button>
                ))}
              </div>
            </div>
            <button className="btn full" type="button" onClick={resetPassage}>↻ वर्तमान गद्यांश रीसेट करें</button>
            <Link className="btn full" to="/chapters/chap_hin_06/study">बोध का concept lesson →</Link>
          </aside>

          <section className="unseen-main">
            <article className="unseen-passage-card">
              <div className="unseen-passage-head">
                <div>
                  <span className={"unseen-level " + levelClass(active.level)}>{active.level}</span>
                  <h2>{active.title}</h2>
                </div>
                <span className="unseen-count">{visibleQuestions.length}/{active.questions.length} प्रश्न दिख रहे हैं</span>
              </div>

              <div className="unseen-passage-box">
                <span className="science-panel-label">गद्यांश पढ़ें</span>
                <p>{active.passage}</p>
              </div>

              <div className="unseen-instruction">
                <b>अभ्यास क्रम:</b> पूरा गद्यांश पढ़ें → प्रश्न का प्रकार पहचानें → प्रमाण खोजें → विकल्प चुनें → उत्तर जाँचें → reasoning सुधारें।
              </div>

              {skill !== "All" && visibleQuestions.length === 0 ? (
                <div className="empty">
                  <h3>इस गद्यांश में यह कौशल नहीं है।</h3>
                  <p>दूसरा कौशल चुनें या सभी कौशल दिखाएँ।</p>
                </div>
              ) : (
                <div className="unseen-questions">
                  {visibleQuestions.map((question) => {
                    const originalIndex = active.questions.findIndex((item) => item.id === question.id);
                    const state = responses[question.id] ?? { selected: null, revealed: false };
                    return (
                      <PassageQuestion
                        key={question.id}
                        question={question}
                        index={originalIndex}
                        state={state}
                        onSelect={(optionIndex) => setQuestionState(question.id, { selected: optionIndex, revealed: false })}
                        onReveal={() => setQuestionState(question.id, { selected: state.selected, revealed: true })}
                        onReset={() => setQuestionState(question.id, { selected: null, revealed: false })}
                      />
                    );
                  })}
                </div>
              )}

              <div className="unseen-complete-actions">
                <span className="unseen-completion-note">
                  {passageComplete ? "✅ इस गद्यांश के सभी प्रश्न जाँच लिए गए।" : "पूरा करने के लिए " + (active.questions.length - checkedCount) + " प्रश्न और जाँचें।"}
                </span>
                <button
                  className="btn primary"
                  type="button"
                  disabled={!passageComplete}
                  onClick={() => setCompleted((state) => ({ ...state, [active.id]: true }))}
                >
                  ✓ गद्यांश पूरा करें
                </button>
                <button
                  className="btn"
                  type="button"
                  disabled={visiblePassages.length < 2}
                  onClick={() => {
                    const index = visiblePassages.findIndex((item) => item.id === active.id);
                    const next = visiblePassages[(index + 1) % visiblePassages.length];
                    if (next) changePassage(next.id);
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
