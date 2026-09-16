import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { allQuestions, allLessons, chapters, getLesson, getQuestion, getQuestionsBySubject, getQuestionsByTopic, getSubject, subjects, topics } from './data';
import { useProgressStore } from './store/progress';
import type { ContentBlock, ID, Question } from './types';

const examSections = [
  { id: 'sub_eng', title: 'अंग्रेज़ी', questions: 15 },
  { id: 'sub_hin', title: 'हिंदी', questions: 15 },
  { id: 'sub_math', title: 'गणित', questions: 35 },
  { id: 'sub_sci', title: 'विज्ञान', questions: 35 },
] as const;

const difficultyLabel: Record<Question['difficulty'], string> = { easy: 'आसान', medium: 'मध्यम', hard: 'कठिन', challenge: 'चैलेंज' };
const sameAnswer = (a: ID[], b: ID[]) => a.length === b.length && a.every((x) => b.includes(x));

const InlineText = ({ text }: { text: string }) => {
  const parts = text.split(/(\$\$.*?\$\$|\$.*?\$|\*\*.*?\*\*)/g);
  return <>{parts.map((p, i) => {
    if (p.startsWith('$$') && p.endsWith('$$')) return <span className="formula-inline" key={i}>{p.slice(2, -2)}</span>;
    if (p.startsWith('$') && p.endsWith('$')) return <span className="formula-inline" key={i}>{p.slice(1, -1)}</span>;
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  })}</>;
};

const ContentRenderer = ({ blocks }: { blocks: ContentBlock[] }) => <div className="lesson-content">{blocks.map((b, i) => {
  switch (b.type) {
    case 'heading': { const Tag = b.level === 2 ? 'h2' : b.level === 3 ? 'h3' : 'h4'; return <Tag key={i}><InlineText text={b.text} /></Tag>; }
    case 'paragraph': return <p key={i}><InlineText text={b.text} /></p>;
    case 'list': return b.style === 'number' ? <ol key={i}>{b.items.map((x, j) => <li key={j}><InlineText text={x} /></li>)}</ol> : <ul key={i}>{b.items.map((x, j) => <li key={j}><InlineText text={x} /></li>)}</ul>;
    case 'formula': return <div className="formula-block" key={i}><InlineText text={b.expression} /></div>;
    case 'table': return <div className="table-wrap" key={i}><table><thead><tr>{b.headers.map((x, j) => <th key={j}>{x}</th>)}</tr></thead><tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((x, k) => <td key={k}>{x}</td>)}</tr>)}</tbody></table></div>;
    case 'image': return <figure className="lesson-figure" key={i}><img src={b.src} alt={b.alt} onError={(e) => { e.currentTarget.style.display = 'none'; }} />{b.caption && <figcaption>{b.caption}</figcaption>}</figure>;
    case 'step-by-step': return <div className="steps" key={i}>{b.steps.map((x, j) => <div className="step" key={j}><span>{j + 1}</span><p><InlineText text={x} /></p></div>)}</div>;
    case 'callout': return <aside className={`callout ${b.style}`} key={i}><strong>{b.title || 'जानकारी'}</strong><p><InlineText text={b.text} /></p></aside>;
    default: return null;
  }
})}</div>;

const questionTextBlocks = (q: Question): ContentBlock[] => q.text ?? (q.textPlain ? [{ type: 'paragraph', text: q.textPlain }] : []);
const questionExplanationBlocks = (q: Question): ContentBlock[] => q.explanation ?? (q.explanationPlain ? [{ type: 'paragraph', text: q.explanationPlain }] : []);

const getStudyPages = (blocks: ContentBlock[]): ContentBlock[][] => {
  const pages: ContentBlock[][] = [];
  let current: ContentBlock[] = [];
  for (const block of blocks) {
    const marker = block.type === 'heading' && /^अध्ययन पृष्ठ\s+\d+/.test(block.text);
    if (marker && current.length) { pages.push(current); current = []; }
    current.push(block);
  }
  if (current.length) pages.push(current);
  return pages.length ? pages : [blocks];
};

const Shell = ({ children }: { children: React.ReactNode }) => <div className="app-shell"><header className="topbar"><Link to="/" className="brand">JNVST कक्षा 9</Link><nav><Link to="/">डैशबोर्ड</Link><Link to="/subjects">विषय</Link><Link to="/bookmarks">बुकमार्क</Link><Link to="/mock-tests">मॉक टेस्ट</Link></nav></header><main className="shell">{children}</main></div>;
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <div className={`card ${className}`}>{children}</div>;

const Dashboard = () => { const p = useProgressStore(); const attempts = Object.values(p.questionAttempts).flat(); const accuracy = attempts.length ? Math.round(attempts.filter(x => x.isCorrect).length / attempts.length * 100) : 0; return <Shell><section className="hero"><div><span className="eyebrow">JAWAHAR NAVODAYA VIDYALAYA</span><h1>JNVST कक्षा 9 Learning Hub</h1><p>पढ़ें, अभ्यास करें, प्रगति देखें और मॉक टेस्ट दें।</p><div className="actions"><Link className="btn primary" to="/subjects">पढ़ाई शुरू करें</Link><Link className="btn" to="/mock-tests">मॉक टेस्ट</Link></div></div><div className="hero-stat"><b>{allQuestions.length}</b><span>अभ्यास प्रश्न</span></div></section><section className="stats"><Card><b>{Object.values(p.lessonActivity).filter(x => x.status === 'completed').length}</b><span>पूर्ण पाठ</span></Card><Card><b>{attempts.length}</b><span>प्रश्न प्रयास</span></Card><Card><b>{accuracy}%</b><span>सटीकता</span></Card><Card><b>{allLessons.length}</b><span>कुल पाठ</span></Card></section><h2>विषय</h2><div className="grid">{subjects.map(s => <Link key={s.id} to={`/subjects/${s.id}`}><Card className="subject-card"><div className="icon">{s.iconRef}</div><h3>{s.title}</h3><p>{s.description}</p><span className="linkish">अध्याय देखें →</span></Card></Link>)}</div></Shell>; };

const SubjectsPage = () => <Shell><div className="page-head"><h1>विषय</h1><p>विषय चुनें और अभ्यास शुरू करें।</p></div><div className="grid">{subjects.map(s => <Link key={s.id} to={`/subjects/${s.id}`}><Card className="subject-card"><div className="icon">{s.iconRef}</div><h2>{s.title}</h2><p>{s.description}</p></Card></Link>)}</div></Shell>;

const TopicCard = ({ topicId }: { topicId: ID }) => { const t = topics.find(x => x.id === topicId)!; const qCount = getQuestionsByTopic(t.id).length; const lessonId = t.lessonIds[0]; const lesson = lessonId ? getLesson(lessonId) : undefined; const pages = lesson ? getStudyPages(lesson.content).length : 0; return <Card className="topic-card"><div className="topic-top"><h3>{t.title}</h3><span className="count">{qCount} प्रश्न</span></div><div className="topic-meta"><span>📖 {pages || 1} अध्ययन पृष्ठ</span><span>⏱ विस्तृत पाठ</span></div><div className="actions">{lessonId && <Link className="btn" to={`/lessons/${lessonId}`}>पाठ पढ़ें</Link>}<Link className="btn primary" to={`/practice/${t.id}`}>अभ्यास करें</Link></div></Card>; };

const SubjectPage = () => { const { subjectId } = useParams(); const s = getSubject(subjectId || ''); if (!s) return <Shell><Card className="empty"><h1>विषय नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></Card></Shell>; const cs = chapters.filter(c => c.subjectId === s.id).sort((a,b) => a.order-b.order); return <Shell><div className="page-head"><Link to="/subjects">← सभी विषय</Link><h1>{s.iconRef} {s.title}</h1><p>{s.description}</p></div>{cs.map(c => <Card key={c.id} className="chapter-section"><Link className="chapter-link" to={`/chapters/${c.id}`}><h2>{c.title} →</h2></Link><div className="grid">{c.topicIds.map(id => <TopicCard key={id} topicId={id} />)}</div></Card>)}</Shell>; };

const ChapterPage = () => { const { chapterId } = useParams(); const c = chapters.find(x => x.id === chapterId); const s = c ? getSubject(c.subjectId) : undefined; if (!c || !s) return <Shell><Card className="empty"><h1>अध्याय नहीं मिला</h1></Card></Shell>; return <Shell><div className="page-head"><Link to={`/subjects/${s.id}`}>← {s.title}</Link><h1>{c.title}</h1></div><div className="grid">{c.topicIds.map(id => <TopicCard key={id} topicId={id} />)}</div></Shell>; };

const LessonPage = () => { const { lessonId } = useParams(); const l = getLesson(lessonId || ''); const p = useProgressStore(); const pages = useMemo(() => l ? getStudyPages(l.content) : [], [l]); const [page, setPage] = useState(0); useEffect(() => setPage(0), [lessonId]); if (!l) return <Shell><Card className="empty"><h1>पाठ नहीं मिला</h1></Card></Shell>; const t = topics.find(x => x.id === l.topicId); const c = t ? chapters.find(x => x.id === t.chapterId) : undefined; const done = p.lessonActivity[l.id]?.status === 'completed'; return <Shell><div className="page-head"><Link to={c ? `/chapters/${c.id}` : '/subjects'}>← अध्याय</Link><h1>{l.title}</h1><div className="lesson-meta"><span>⏱ {l.estimatedMinutes} मिनट</span><span>{done ? '✅ पूरा हुआ' : '📖 सीख रहे हैं'}</span></div></div><Card className="lesson-card"><div className="study-reader"><div className="study-reader-head"><div><b>अध्ययन-पाठ</b><span>पृष्ठ {page + 1} / {pages.length}</span></div><div className="study-progress"><span style={{width: `${((page + 1) / Math.max(1, pages.length)) * 100}%`}} /></div></div><div className="study-page-nav">{pages.map((_, i) => <button key={i} className={i === page ? 'active' : ''} onClick={() => setPage(i)}>{i + 1}</button>)}</div></div><div className="objectives"><h3>इस पाठ के बाद आप</h3><ul>{l.objectives.map(x => <li key={x}>{x}</li>)}</ul></div><ContentRenderer blocks={pages[page] || l.content}/><div className="study-reader-actions"><button className="btn" disabled={page === 0} onClick={() => setPage(x => x - 1)}>← पिछला पृष्ठ</button>{page < pages.length - 1 ? <button className="btn primary" onClick={() => setPage(x => x + 1)}>अगला पृष्ठ →</button> : <button className="btn primary" onClick={() => { p.completeLesson(l.id, l.title); }}>पाठ पूरा करें</button>}</div><div className="actions"><Link className="btn" to={`/practice/${l.topicId}`}>टॉपिक अभ्यास</Link></div></Card></Shell>; };

const PracticePage = () => { const { topicId } = useParams(); const qs = useMemo(() => getQuestionsByTopic(topicId || ''), [topicId]); const [i,setI] = useState(0); const [selected,setSelected] = useState<ID[]>([]); const [checked,setChecked] = useState(false); const p = useProgressStore(); if (!qs.length) return <Shell><Card className="empty"><h1>इस टॉपिक में प्रश्न उपलब्ध नहीं हैं</h1></Card></Shell>; const q = qs[i]; const correct = sameAnswer(selected, q.correctOptionIds); const choose = (id: ID) => { if (checked) return; if (q.type === 'multiple-select') setSelected(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]); else setSelected([id]); }; const check = () => { if (!selected.length) return; setChecked(true); p.recordAttempt(q.id, { selectedOptionIds: selected, isCorrect: correct, timestamp: Date.now(), mode: 'practice' }); }; return <Shell><div className="page-head"><Link to={`/chapters/${q.chapterId}`}>← अध्याय</Link><div className="progressline"><span>प्रश्न {i + 1} / {qs.length}</span><span className={`badge ${q.difficulty}`}>{difficultyLabel[q.difficulty]}</span></div></div><Card className="quiz"><div className="quiz-tools"><button className="bookmark" onClick={() => p.toggleBookmarkQuestion(q.id)}>{p.bookmarks.questionIds.includes(q.id) ? '★ बुकमार्क हटाएँ' : '☆ बुकमार्क'}</button></div><ContentRenderer blocks={questionTextBlocks(q)}/><div className="options">{q.options.map(o => <button key={o.id} className={`option ${selected.includes(o.id) ? 'selected' : ''} ${checked && q.correctOptionIds.includes(o.id) ? 'correct' : ''} ${checked && selected.includes(o.id) && !q.correctOptionIds.includes(o.id) ? 'wrong' : ''}`} onClick={() => choose(o.id)}><span className="radio">{selected.includes(o.id) ? '✓' : ''}</span><span>{o.text}</span></button>)}</div>{checked && <div className={`feedback ${correct ? 'good' : 'bad'}`}><b>{correct ? '✅ सही उत्तर' : '❌ उत्तर गलत'}</b><ContentRenderer blocks={questionExplanationBlocks(q)}/></div>}<div className="quiz-actions">{!checked ? <button className="btn primary" disabled={!selected.length} onClick={check}>उत्तर जाँचें</button> : i < qs.length - 1 ? <button className="btn primary" onClick={() => { setI(x => x + 1); setSelected([]); setChecked(false); }}>अगला प्रश्न →</button> : <Link className="btn primary" to={`/chapters/${q.chapterId}`}>अध्याय पर लौटें</Link>}</div></Card></Shell>; };

const BookmarksPage = () => { const p = useProgressStore(); const qs = p.bookmarks.questionIds.map(id => getQuestion(id)).filter(Boolean) as Question[]; return <Shell><div className="page-head"><h1>बुकमार्क</h1></div>{qs.length ? <div className="grid">{qs.map(q => <Card key={q.id}><ContentRenderer blocks={questionTextBlocks(q)}/><div className="actions"><Link className="btn primary" to={`/practice/${q.topicId}`}>टॉपिक अभ्यास</Link><button className="btn" onClick={() => p.toggleBookmarkQuestion(q.id)}>हटाएँ</button></div></Card>)}</div> : <Card className="empty"><h2>अभी कोई बुकमार्क नहीं</h2><Link className="btn primary" to="/subjects">अभ्यास शुरू करें</Link></Card>}</Shell>; };

const buildMock = () => examSections.flatMap(s => getQuestionsBySubject(s.id).slice(0, s.questions));
const MockTestsPage = () => <Shell><div className="page-head"><h1>मॉक टेस्ट</h1><p>100 प्रश्न · 150 मिनट</p></div><Card className="mock-intro"><h2>पूर्ण JNVST मॉक टेस्ट</h2><p>अंग्रेज़ी 15 + हिंदी 15 + गणित 35 + विज्ञान 35</p><Link className="btn primary" to="/mock-tests/full">मॉक टेस्ट शुरू करें</Link></Card></Shell>;

const MockEngine = () => { const nav = useNavigate(); const qs = useMemo(buildMock, []); const [i,setI] = useState(0); const [answers,setAnswers] = useState<Record<ID,ID[]>>({}); const [time,setTime] = useState(150*60); const [confirm,setConfirm] = useState(false); const p = useProgressStore(); useEffect(() => { const id = window.setInterval(() => setTime(t => Math.max(0, t - 1)), 1000); return () => window.clearInterval(id); }, []); if (!qs.length) return <Shell><Card className="empty"><h1>मॉक टेस्ट उपलब्ध नहीं है</h1></Card></Shell>; const q = qs[i]; const sel = answers[q.id] || []; const choose = (id:ID) => setAnswers(a => ({...a, [q.id]: q.type === 'multiple-select' ? (sel.includes(id) ? sel.filter(x => x !== id) : [...sel,id]) : [id]})); const submit = () => { const sectionScores: Record<ID,number> = {}; examSections.forEach(s => { sectionScores[s.id] = qs.filter(qx => qx.subjectId === s.id).reduce((n,qx) => n + (sameAnswer(answers[qx.id] || [], qx.correctOptionIds) ? 1 : 0), 0); }); const score = Object.values(sectionScores).reduce((a,b) => a+b, 0); p.saveMockResult({id:'full-jnvst', score, totalMarks:100, timestamp:Date.now(), answers, sectionScores}); nav('/mock-tests/full/result'); }; const mm = String(Math.floor(time/60)).padStart(3,'0'); const ss = String(time%60).padStart(2,'0'); return <div className="mock-screen"><div className="mock-header"><strong>JNVST मॉक टेस्ट</strong><span className="timer">⏱ {mm}:{ss}</span></div><div className="mock-body"><main className="mock-question"><div className="mock-subject"><span>{subjects.find(s => s.id === q.subjectId)?.title}</span><span className={`badge ${q.difficulty}`}>{difficultyLabel[q.difficulty]}</span></div><Card><ContentRenderer blocks={questionTextBlocks(q)}/><div className="options">{q.options.map(o => <button key={o.id} className={`option ${sel.includes(o.id) ? 'selected' : ''}`} onClick={() => choose(o.id)}><span className="radio">{sel.includes(o.id) ? '✓' : ''}</span><span>{o.text}</span></button>)}</div><div className="quiz-actions"><button className="btn" disabled={!i} onClick={() => setI(x => x - 1)}>← पिछला</button>{i === qs.length - 1 ? <button className="btn primary" onClick={() => setConfirm(true)}>टेस्ट जमा करें</button> : <button className="btn primary" onClick={() => setI(x => x + 1)}>अगला →</button>}</div></Card></main><aside className="palette"><h3>प्रश्न सूची</h3><div className="palette-grid">{qs.map((x,j) => <button key={x.id} className={`${answers[x.id]?.length ? 'answered' : ''} ${j === i ? 'current' : ''}`} onClick={() => setI(j)}>{j+1}</button>)}</div></aside></div>{confirm && <div className="modal-backdrop"><div className="modal"><h2>मॉक टेस्ट जमा करें?</h2><p>उत्तर दिए गए प्रश्न: {Object.values(answers).filter(x => x.length).length} / {qs.length}</p><div className="actions"><button className="btn" onClick={() => setConfirm(false)}>वापस</button><button className="btn primary" onClick={submit}>जमा करें</button></div></div></div>}</div>; };

const MockResultPage = () => { const r = useProgressStore(s => s.mockTestResults.find(x => x.id === 'full-jnvst')); if (!r) return <Shell><Card className="empty"><h1>अभी कोई परिणाम नहीं है</h1><Link className="btn primary" to="/mock-tests/full">मॉक टेस्ट दें</Link></Card></Shell>; return <Shell><div className="result-hero"><span>नवीनतम मॉक टेस्ट</span><strong>{r.score} / {r.totalMarks}</strong><span>{Math.round(r.score / r.totalMarks * 100)}% सटीकता</span></div><div className="grid result-grid">{examSections.map(s => <Card key={s.id}><span>{s.title}</span><b>{r.sectionScores[s.id] || 0} / {s.questions}</b></Card>)}</div><div className="actions"><Link className="btn primary" to="/mock-tests/full">फिर से टेस्ट दें</Link><Link className="btn" to="/">डैशबोर्ड</Link></div></Shell>; };

const App = () => <HashRouter><Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/subjects" element={<SubjectsPage />} />
  <Route path="/subjects/:subjectId" element={<SubjectPage />} />
  <Route path="/chapters/:chapterId" element={<ChapterPage />} />
  <Route path="/lessons/:lessonId" element={<LessonPage />} />
  <Route path="/practice/:topicId" element={<PracticePage />} />
  <Route path="/bookmarks" element={<BookmarksPage />} />
  <Route path="/mock-tests" element={<MockTestsPage />} />
  <Route path="/mock-tests/full" element={<MockEngine />} />
  <Route path="/mock-tests/full/result" element={<MockResultPage />} />
  <Route path="*" element={<NotFound />} />
</Routes></HashRouter>;

const NotFound = () => <Shell><Card className="empty"><h1>पृष्ठ नहीं मिला</h1><Link className="btn" to="/">डैशबोर्ड पर जाएँ</Link></Card></Shell>;

export default App;
