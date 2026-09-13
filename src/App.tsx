import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { allQuestions, allLessons, chapters, getLesson, getQuestion, getQuestionsBySubject, getQuestionsByTopic, getSubject, getTopics, subjects, topics } from './data';
import { useProgressStore } from './store/progress';
import type { ContentBlock, ID, Lesson, Question } from './types';

const examSections = [
  { id: 'sub_eng', title: 'अंग्रेज़ी', questions: 15 },
  { id: 'sub_hin', title: 'हिंदी', questions: 15 },
  { id: 'sub_math', title: 'गणित', questions: 35 },
  { id: 'sub_sci', title: 'विज्ञान', questions: 35 },
] as const;

const difficultyLabel: Record<Question['difficulty'], string> = {
  easy: 'आसान', medium: 'मध्यम', hard: 'कठिन', challenge: 'चैलेंज',
};

const sameAnswer = (selected: ID[], correct: ID[]) =>
  selected.length === correct.length && selected.every((id) => correct.includes(id));

const InlineText = ({ text }: { text: string }) => {
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$|\*\*.*?\*\*)/g);
  return <>{parts.map((part, i) => {
    if (part.startsWith('$$') && part.endsWith('$$')) return <span key={i} className="formula-inline">{part.slice(2, -2)}</span>;
    if (part.startsWith('$') && part.endsWith('$')) return <span key={i} className="formula-inline">{part.slice(1, -1)}</span>;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  })}</>;
};

const SafeImage = ({ block }: { block: Extract<ContentBlock, { type: 'image' }> }) => {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="lesson-image-fallback" role="img" aria-label={block.alt}>🖼️ <span>{block.alt}</span></div>
  ) : (
    <figure className="lesson-figure">
      <img src={block.src} alt={block.alt} onError={() => setFailed(true)} />
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
};

const ContentRenderer = ({ blocks }: { blocks: ContentBlock[] }) => (
  <div className="lesson-content">
    {blocks.map((block, i) => {
      switch (block.type) {
        case 'heading': {
          const Tag = block.level === 2 ? 'h2' : block.level === 3 ? 'h3' : 'h4';
          return <Tag key={i}><InlineText text={block.text} /></Tag>;
        }
        case 'paragraph':
          return <p key={i}><InlineText text={block.text} /></p>;
        case 'list':
          return block.style === 'number'
            ? <ol key={i}>{block.items.map((item, j) => <li key={j}><InlineText text={item} /></li>)}</ol>
            : <ul key={i}>{block.items.map((item, j) => <li key={j}><InlineText text={item} /></li>)}</ul>;
        case 'formula':
          return <div key={i} className="formula-block"><InlineText text={block.expression} /></div>;
        case 'table':
          return <div key={i} className="table-wrap"><table><thead><tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead><tbody>{block.rows.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c}>{cell}</td>)}</tr>)}</tbody></table></div>;
        case 'image':
          return <SafeImage key={i} block={block} />;
        case 'step-by-step':
          return <div key={i} className="steps">{block.steps.map((step, j) => <div className="step" key={j}><span>{j + 1}</span><p><InlineText text={step} /></p></div>)}</div>;
        case 'callout':
          return <aside key={i} className={`callout ${block.style}`}><strong>{block.title || (block.style === 'warning' ? 'ध्यान दें' : block.style === 'important' ? 'महत्वपूर्ण' : block.style === 'example' ? 'उदाहरण' : 'जानकारी')}</strong><p><InlineText text={block.text} /></p></aside>;
        default:
          return null;
      }
    })}
  </div>
);

const Shell = ({ children }: { children: React.ReactNode }) => (
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
    <main className="shell">{children}</main>
  </div>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`card ${className}`}>{children}</div>
);

const Dashboard = () => {
  const progress = useProgressStore();
  const completedLessons = Object.values(progress.lessonActivity).filter((x) => x.status === 'completed').length;
  const attempts = Object.values(progress.questionAttempts).flat();
  const accuracy = attempts.length ? Math.round((attempts.filter((x) => x.isCorrect).length / attempts.length) * 100) : 0;
  const completedTopics = topics.filter((t) => t.lessonIds.some((id) => progress.lessonActivity[id]?.status === 'completed')).length;
  return <Shell>
    <section className="hero">
      <div>
        <span className="eyebrow">JAWAHAR NAVODAYA VIDYALAYA</span>
        <h1>JNVST कक्षा 9 Learning Hub</h1>
        <p>पढ़ें, अभ्यास करें, अपनी प्रगति देखें और वास्तविक परीक्षा पैटर्न पर मॉक टेस्ट दें।</p>
        <div className="actions"><Link className="btn primary" to="/subjects">पढ़ाई शुरू करें</Link><Link className="btn" to="/mock-tests">मॉक टेस्ट दें</Link></div>
      </div>
      <div className="hero-stat"><b>{allQuestions.length}</b><span>अभ्यास प्रश्न</span></div>
    </section>
    <section className="stats">
      <Card><b>{completedLessons}</b><span>पूर्ण पाठ</span></Card>
      <Card><b>{completedTopics}</b><span>पढ़े गए टॉपिक</span></Card>
      <Card><b>{attempts.length}</b><span>प्रश्न प्रयास</span></Card>
      <Card><b>{accuracy}%</b><span>सटीकता</span></Card>
    </section>
    <div className="section-heading"><div><h2>विषय</h2><p>किसी विषय से शुरुआत करें।</p></div></div>
    <div className="grid">{subjects.map((s) => <Link key={s.id} to={`/subjects/${s.id}`}><Card className="subject-card"><div className="icon">{s.iconRef}</div><h3>{s.title}</h3><p>{s.description}</p><span className="linkish">अध्याय और पाठ देखें →</span></Card></Link>)}</div>
    <h2>JNVST परीक्षा पैटर्न</h2>
    <Card><div className="pattern">{examSections.map((section) => <div key={section.id}><b>{section.title}</b><span>{section.questions} प्रश्न</span></div>)}<div className="total"><b>कुल</b><span>100 प्रश्न · 150 मिनट</span></div></div></Card>
  </Shell>;
};

const SubjectsPage = () => <Shell><div className="page-head"><h1>विषय</h1><p>अध्याय → टॉपिक → पाठ → अभ्यास के क्रम में तैयारी करें।</p></div><div className="grid">{subjects.map((s) => <Link key={s.id} to={`/subjects/${s.id}`}><Card className="subject-card"><div className="icon">{s.iconRef}</div><h2>{s.title}</h2><p>{s.description}</p><span className="linkish">विषय खोलें →</span></Card></Link>)}</div></Shell>;

const SubjectPage = () => {
  const { subjectId } = useParams();
  const subject = getSubject(subjectId || '');
  if (!subject) return <Shell><Card className="empty"><h1>विषय नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></Card></Shell>;
  const subjectChapters = getChapters(subject.id);
  return <Shell><div className="page-head"><Link to="/subjects">← सभी विषय</Link><h1>{subject.iconRef} {subject.title}</h1><p>{subject.description}</p></div>{subjectChapters.map((chapter) => <section key={chapter.id} className="chapter-section"><h2>{chapter.title}</h2><div className="grid">{getTopics(chapter.id).map((topic) => { const count = getQuestionsByTopic(topic.id).length; return <Card key={topic.id} className="topic-card"><div className="topic-top"><h3>{topic.title}</h3><span className="count">{count} प्रश्न</span></div><p>{topic.lessonIds.length} पाठ उपलब्ध</p><div className="actions"><Link className="btn" to={`/lessons/${topic.lessonIds[0]}`}>पाठ पढ़ें</Link><Link className="btn primary" to={`/practice/${topic.id}`}>अभ्यास करें</Link></div></Card>; })}</div></section>)}</Shell>;
};

const LessonPage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = getLesson(lessonId || '');
  const progress = useProgressStore();
  useEffect(() => { if (lesson) progress.markInProgress(lesson.id, lesson.title); }, [lesson?.id]);
  if (!lesson) return <Shell><Card className="empty"><h1>पाठ नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></Card></Shell>;
  const topic = topics.find((t) => t.id === lesson.topicId);
  const isCompleted = progress.lessonActivity[lesson.id]?.status === 'completed';
  return <Shell><div className="page-head"><Link to={`/subjects/${topic?.chapterId ? chapters.find((c) => c.id === topic.chapterId)?.subjectId : ''}`}>← विषय</Link><h1>{lesson.title}</h1><div className="lesson-meta"><span>⏱ {lesson.estimatedMinutes} मिनट</span><span>{isCompleted ? '✅ पूरा हुआ' : '📖 सीख रहे हैं'}</span></div></div>
    <div className="lesson-layout"><article><Card className="lesson-card"><div className="objectives"><h3>इस पाठ के बाद आप</h3><ul>{lesson.objectives.map((x) => <li key={x}>{x}</li>)}</ul></div><ContentRenderer blocks={lesson.content} /><div className="lesson-footer"><button className="btn primary" onClick={() => { progress.completeLesson(lesson.id, lesson.title); navigate(`/practice/${lesson.topicId}`); }}>{isCompleted ? 'पाठ दोहराएँ और अभ्यास करें' : 'पाठ पूरा करें और अभ्यास करें'}</button></div></Card></article><aside><Card><h3>अगला कदम</h3><p>पहले पाठ पढ़ें, फिर उसी टॉपिक के प्रश्न हल करें।</p><Link className="btn" to={`/practice/${lesson.topicId}`}>टॉपिक अभ्यास</Link></Card></aside></div>
  </Shell>;
};

const PracticePage = () => {
  const { topicId } = useParams();
  const questions = useMemo(() => getQuestionsByTopic(topicId || ''), [topicId]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<ID[]>([]);
  const [checked, setChecked] = useState(false);
  const progress = useProgressStore();
  if (!questions.length) return <Shell><Card className="empty"><h1>इस टॉपिक में प्रश्न उपलब्ध नहीं हैं</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></Card></Shell>;
  const question = questions[index];
  const isCorrect = sameAnswer(selected, question.correctOptionIds);
  const bookmarked = progress.bookmarks.questionIds.includes(question.id);
  const choose = (optionId: ID) => {
    if (checked) return;
    if (question.type === 'mcq' || question.type === 'true-false' || question.type === 'passage') setSelected([optionId]);
    else setSelected((current) => current.includes(optionId) ? current.filter((x) => x !== optionId) : [...current, optionId]);
  };
  const check = () => { if (!selected.length) return; setChecked(true); progress.recordAttempt(question.id, { selectedOptionIds: selected, isCorrect, timestamp: Date.now(), mode: 'practice' }); };
  const next = () => { if (index < questions.length - 1) { setIndex((x) => x + 1); setSelected([]); setChecked(false); } };
  const difficulty = difficultyLabel[question.difficulty];
  return <Shell><div className="page-head"><div className="progressline"><Link to={`/subjects/${question.subjectId}`}>← विषय</Link><span>प्रश्न {index + 1} / {questions.length}</span><span className={`badge ${question.difficulty}`}>{difficulty}</span></div></div><Card className="quiz"><div className="quiz-tools"><button className="bookmark" onClick={() => progress.toggleBookmarkQuestion(question.id)}>{bookmarked ? '★ बुकमार्क किया' : '☆ बुकमार्क करें'}</button></div><ContentRenderer blocks={question.text} /><div className="options">{question.options.map((option) => <button key={option.id} className={`option ${selected.includes(option.id) ? 'selected' : ''} ${checked && question.correctOptionIds.includes(option.id) ? 'correct' : ''} ${checked && selected.includes(option.id) && !question.correctOptionIds.includes(option.id) ? 'wrong' : ''}`} onClick={() => choose(option.id)}><span className="radio">{selected.includes(option.id) ? '✓' : ''}</span><span>{option.text}</span></button>)}</div>{checked && <div className={`feedback ${isCorrect ? 'good' : 'bad'}`}><strong>{isCorrect ? '✅ सही उत्तर' : '❌ सही नहीं'}</strong><ContentRenderer blocks={question.explanation} /></div>}<div className="quiz-actions">{!checked ? <button className="btn primary" disabled={!selected.length} onClick={check}>उत्तर जाँचें</button> : index < questions.length - 1 ? <button className="btn primary" onClick={next}>अगला प्रश्न →</button> : <Link className="btn primary" to={`/subjects/${question.subjectId}`}>अभ्यास पूरा →</Link>}</div></Card></Shell>;
};

const BookmarksPage = () => {
  const ids = useProgressStore((s) => s.bookmarks.questionIds);
  const remove = useProgressStore((s) => s.toggleBookmarkQuestion);
  const questions = ids.map((id) => getQuestion(id)).filter(Boolean) as Question[];
  return <Shell><div className="page-head"><h1>बुकमार्क</h1><p>बाद में दोहराने के लिए सुरक्षित प्रश्न।</p></div>{questions.length ? <div className="grid">{questions.map((q) => <Card key={q.id}><ContentRenderer blocks={q.text} /><div className="actions"><Link className="btn primary" to={`/practice/${q.topicId}`}>टॉपिक अभ्यास</Link><button className="btn" onClick={() => remove(q.id)}>हटाएँ</button></div></Card>)}</div> : <Card className="empty"><h2>अभी कोई बुकमार्क नहीं</h2><p>अभ्यास करते समय किसी प्रश्न को सेव करें।</p><Link className="btn primary" to="/subjects">अभ्यास शुरू करें</Link></Card>}</Shell>;
};

const buildMockQuestions = () => examSections.flatMap((section) => getQuestionsBySubject(section.id).slice(0, section.questions));

const MockTestsPage = () => <Shell><div className="page-head"><h1>मॉक टेस्ट</h1><p>JNVST कक्षा 9 के 100 प्रश्न और 150 मिनट के पैटर्न पर अभ्यास करें।</p></div><Card className="mock-intro"><div><span className="eyebrow dark">FULL LENGTH</span><h2>पूर्ण JNVST मॉक टेस्ट</h2><p>अंग्रेज़ी 15 · हिंदी 15 · गणित 35 · विज्ञान 35</p><strong>100 प्रश्न · 100 अंक · 150 मिनट</strong></div><Link className="btn primary" to="/mock-tests/full">टेस्ट शुरू करें →</Link></Card></Shell>;

const MockEngine = () => {
  const navigate = useNavigate();
  const questions = useMemo(buildMockQuestions, []);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<ID, ID[]>>({});
  const [timeLeft, setTimeLeft] = useState(150 * 60);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const saveResult = useProgressStore((s) => s.saveMockResult);
  const current = questions[index];
  useEffect(() => {
    if (submitted) return;
    const timer = window.setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [submitted]);
  useEffect(() => { if (timeLeft === 0 && !submitted) setShowSubmit(true); }, [timeLeft, submitted]);
  const score = questions.reduce((n, q) => n + (sameAnswer(answers[q.id] || [], q.correctOptionIds) ? 1 : 0), 0);
  const sectionScores = Object.fromEntries(examSections.map((section) => [section.id, questions.filter((q) => q.subjectId === section.id).reduce((n, q) => n + (sameAnswer(answers[q.id] || [], q.correctOptionIds) ? 1 : 0), 0)]));
  const submit = () => {
    saveResult({ id: 'full-jnvst', score, totalMarks: 100, timestamp: Date.now(), answers, sectionScores });
    setSubmitted(true);
    navigate('/mock-tests/full/result');
  };
  if (!current) return <Shell><Card className="empty"><h1>मॉक टेस्ट उपलब्ध नहीं है</h1></Card></Shell>;
  if (submitted) return null;
  const selected = answers[current.id] || [];
  const choose = (optionId: ID) => setAnswers((all) => ({ ...all, [current.id]: current.type === 'multiple-select' ? selected.includes(optionId) ? selected.filter((x) => x !== optionId) : [...selected, optionId] : [optionId] }));
  const minutes = Math.floor(timeLeft / 60).toString().padStart(3, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  return <div className="mock-screen"><div className="mock-header"><div><strong>JNVST मॉक टेस्ट</strong><span> {index + 1} / {questions.length}</span></div><div className={`timer ${timeLeft < 300 ? 'danger' : ''}`}>⏱ {minutes}:{seconds}</div></div><div className="mock-body"><main className="mock-question"><div className="mock-subject"><span>{subjects.find((s) => s.id === current.subjectId)?.title}</span><span className={`badge ${current.difficulty}`}>{difficultyLabel[current.difficulty]}</span></div><Card><ContentRenderer blocks={current.text} /><div className="options">{current.options.map((option) => <button key={option.id} className={`option ${selected.includes(option.id) ? 'selected' : ''}`} onClick={() => choose(option.id)}><span className="radio">{selected.includes(option.id) ? '✓' : ''}</span><span>{option.text}</span></button>)}</div><div className="quiz-actions"><button className="btn" disabled={index === 0} onClick={() => setIndex((x) => x - 1)}>← पिछला</button>{index === questions.length - 1 ? <button className="btn primary" onClick={() => setShowSubmit(true)}>टेस्ट जमा करें</button> : <button className="btn primary" onClick={() => setIndex((x) => x + 1)}>अगला →</button>}</div></Card></main><aside className="palette"><h3>प्रश्न सूची</h3><div className="legend"><span>नीला = उत्तर दिया</span><span>सफेद = बाकी</span></div><div className="palette-grid">{questions.map((q, i) => <button key={q.id} className={`${answers[q.id]?.length ? 'answered' : ''} ${i === index ? 'current' : ''}`} onClick={() => setIndex(i)}>{i + 1}</button>)}</div></aside></div>{showSubmit && <div className="modal-backdrop"><div className="modal"><h2>मॉक टेस्ट जमा करें?</h2><p>आपने {Object.values(answers).filter((x) => x.length).length} / {questions.length} प्रश्नों का उत्तर दिया है।</p><div className="actions"><button className="btn" onClick={() => setShowSubmit(false)}>वापस जाएँ</button><button className="btn primary" onClick={submit}>हाँ, जमा करें</button></div></div></div>}</div>;
};

const MockResultPage = () => {
  const result = useProgressStore((s) => s.mockTestResults.find((x) => x.id === 'full-jnvst'));
  const questions = useMemo(buildMockQuestions, []);
  if (!result) return <Shell><Card className="empty"><h1>अभी कोई परिणाम नहीं है</h1><Link className="btn primary" to="/mock-tests/full">मॉक टेस्ट दें</Link></Card></Shell>;
  const accuracy = result.totalMarks ? Math.round((result.score / result.totalMarks) * 100) : 0;
  return <Shell><div className="result-hero"><span>नवीनतम मॉक टेस्ट</span><strong>{result.score} / {result.totalMarks}</strong><span>{accuracy}% सटीकता</span></div><div className="grid result-grid">{examSections.map((section) => <Card key={section.id}><span>{section.title}</span><b>{result.sectionScores?.[section.id] ?? 0} / {section.questions}</b></Card>)}</div><Card><h2>उत्तर समीक्षा</h2>{questions.slice(0, 20).map((q, i) => { const selected = result.answers?.[q.id] || []; const correct = sameAnswer(selected, q.correctOptionIds); return <div key={q.id} className="review-row"><span>{i + 1}</span><div><strong>{correct ? '✅ सही' : selected.length ? '❌ गलत' : '○ अनुत्तरित'}</strong><p>{q.text.find((b) => b.type === 'paragraph')?.text || 'प्रश्न'}</p></div><span>{selected.length ? selected.join(', ') : '—'}</span></div>; })}<div className="actions"><Link className="btn primary" to="/mock-tests">मॉक टेस्ट पर लौटें</Link><Link className="btn" to="/">डैशबोर्ड</Link></div></Card></Shell>;
};

const AppRoutes = () => <Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/subjects" element={<SubjectsPage />} />
  <Route path="/subjects/:subjectId" element={<SubjectPage />} />
  <Route path="/lessons/:lessonId" element={<LessonPage />} />
  <Route path="/practice/:topicId" element={<PracticePage />} />
  <Route path="/bookmarks" element={<BookmarksPage />} />
  <Route path="/mock-tests" element={<MockTestsPage />} />
  <Route path="/mock-tests/full" element={<MockEngine />} />
  <Route path="/mock-tests/full/result" element={<MockResultPage />} />
  <Route path="*" element={<Shell><Card className="empty"><h1>पृष्ठ नहीं मिला</h1><Link className="btn" to="/">डैशबोर्ड पर जाएँ</Link></Card></Shell>} />
</Routes>;

export default function App() { return <HashRouter><AppRoutes /></HashRouter>; }
