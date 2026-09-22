import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Link, Route, Routes, useParams } from 'react-router-dom';
import { allQuestions, allLessons, chapters, getLesson, getQuestionsBySubject, getQuestionsByTopic, getSubject, subjects, topics, jnvstExamQuestions } from './data';
import { getChapterStudyPages } from './data/lessons/chapterStudy';
import ChapterStudyPage from './pages/ChapterStudyPage';
import MathFormulaSheet from './pages/MathFormulaSheetPage';
import { MathAwareText, MathText } from './components/MathText';
import { useProgressStore } from './store/progress';
import type { ContentBlock, ID, MockTestResult, Question } from './types';
import { buildJnvstMockPaper, getPerformanceSummary, getRevisionTopics, getSmartPracticeQuestions, getSmartRecommendations, getWeakTopics } from './utils/jnvstIntelligence';

const examSections = [
  { id: 'sub_hin', title: 'हिंदी', questions: 15 },
  { id: 'sub_eng', title: 'अंग्रेज़ी', questions: 15 },
  { id: 'sub_math', title: 'गणित', questions: 35 },
  { id: 'sub_sci', title: 'विज्ञान', questions: 35 },
] as const;

const difficultyLabel: Record<Question['difficulty'], string> = { easy: 'आसान', medium: 'मध्यम', hard: 'कठिन', challenge: 'चैलेंज' };
const sameAnswer = (a: ID[], b: ID[]) => a.length === b.length && a.every((x) => b.includes(x));
const InlineText = ({ text }: { text: string }) => <MathAwareText text={text} />;

const ContentRenderer = ({ blocks }: { blocks: ContentBlock[] }) => <div className="lesson-content">{blocks.map((b, i) => {
  switch (b.type) {
    case 'heading': { const Tag = b.level === 2 ? 'h2' : b.level === 3 ? 'h3' : 'h4'; return <Tag key={i}><InlineText text={b.text} /></Tag>; }
    case 'paragraph': return <p key={i}><InlineText text={b.text} /></p>;
    case 'list': return b.style === 'number' ? <ol key={i}>{b.items.map((x, j) => <li key={j}><InlineText text={x} /></li>)}</ol> : <ul key={i}>{b.items.map((x, j) => <li key={j}><InlineText text={x} /></li>)}</ul>;
    case 'formula': return <div className="formula-block" key={i}><MathText value={b.expression} display /></div>;
    case 'table': return <div className="table-wrap" key={i}><table><thead><tr>{b.headers.map((x, j) => <th key={j}><InlineText text={x} /></th>)}</tr></thead><tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((x, k) => <td key={k}><InlineText text={x} /></td>)}</tr>)}</tbody></table></div>;
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

const Shell = ({ children }: { children: React.ReactNode }) => <div className="app-shell"><header className="topbar"><Link to="/" className="brand">JNVST कक्षा 9</Link><nav><Link to="/">डैशबोर्ड</Link><Link to="/subjects">विषय</Link><Link to="/bookmarks">बुकमार्क</Link><Link to="/smart-practice">स्मार्ट अभ्यास</Link><Link to="/mock-tests">मॉक टेस्ट</Link></nav></header><main className="shell">{children}</main></div>;
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <div className={`card ${className}`}>{children}</div>;

const Dashboard = () => {
  const p = useProgressStore();
  const summary = getPerformanceSummary(p);
  const recommendations = getSmartRecommendations(p, 3);
  const weakTopics = getWeakTopics(p, 3);
  const revisionTopics = getRevisionTopics(p, 3);

  return <Shell>
    <section className="hero">
      <div>
        <span className="eyebrow">JAWAHAR NAVODAYA VIDYALAYA</span>
        <h1>JNVST कक्षा 9 Learning Hub</h1>
        <p>पढ़ें, अभ्यास करें, अपनी कमजोरियाँ पहचानें और JNVST पैटर्न पर तैयारी करें।</p>
        <div className="actions">
          <Link className="btn primary" to="/subjects">पढ़ाई शुरू करें</Link>
          <Link className="btn" to="/smart-practice">स्मार्ट अभ्यास</Link>
          <Link className="btn" to="/mock-tests">मॉक टेस्ट</Link>
        </div>
      </div>
      <div className="hero-stat"><b>{allQuestions.length}</b><span>अभ्यास प्रश्न</span><small>{jnvstExamQuestions.length} परीक्षा-योग्य MCQ</small></div>
    </section>

    <section className="stats">
      <Card><b>{Object.values(p.lessonActivity).filter(x => x.status === 'completed').length}</b><span>पूर्ण पाठ</span></Card>
      <Card><b>{summary.totalAttempts}</b><span>प्रश्न प्रयास</span></Card>
      <Card><b>{summary.overallAccuracy}%</b><span>सटीकता</span></Card>
      <Card><b>{allLessons.length}</b><span>कुल पाठ</span></Card>
    </section>

    <section>
      <div className="page-head">
        <h2>आपके लिए अगला कदम</h2>
        <p>{summary.totalAttempts > 0 ? summary.attemptedTopics + ' / ' + summary.totalTopics + ' विषयांशों पर आपका अभ्यास दर्ज है।' : 'अभी आपकी अभ्यास-इतिहास खाली है। शुरुआत के लिए ये विषयांश चुने गए हैं।'}</p>
      </div>
      <div className="grid">
        {recommendations.map((item) => <Card key={item.topicId}>
          <div className="topic-top"><h3>{item.topicTitle}</h3><span className="count">{item.action}</span></div>
          <p><b>{item.subjectTitle}</b></p>
          <p>{item.reason}</p>
          <div className="actions"><Link className="btn primary" to={'/practice/' + item.topicId}>{item.action === 'सीखना' ? 'पढ़कर अभ्यास करें' : item.action}</Link></div>
        </Card>)}
      </div>
    </section>

    {weakTopics.length > 0 && <section>
      <div className="page-head"><h2>कमजोर क्षेत्र</h2><p>जहाँ आपकी सटीकता 80% से कम है, वहाँ targeted practice पहले करें।</p></div>
      <div className="grid">
        {weakTopics.map((topic) => <Card key={topic.topicId}>
          <div className="topic-top"><h3>{topic.topicTitle}</h3><span className="count">{topic.accuracy}%</span></div>
          <p>{topic.subjectTitle} · {topic.attempts} प्रयास · {topic.correct} सही</p>
          <div className="actions"><Link className="btn primary" to={'/practice/' + topic.topicId}>अभ्यास करें</Link></div>
        </Card>)}
      </div>
    </section>}

    {revisionTopics.length > 0 && <section>
      <div className="page-head"><h2>पुनरावृत्ति सूची</h2><p>जिन topics पर पिछले 7 दिनों से अभ्यास नहीं हुआ, उन्हें दोहराएँ।</p></div>
      <div className="grid">
        {revisionTopics.map((topic) => <Card key={topic.topicId}>
          <div className="topic-top"><h3>{topic.topicTitle}</h3><span className="count">{topic.accuracy}%</span></div>
          <p>{topic.subjectTitle}</p>
          <div className="actions"><Link className="btn" to={'/practice/' + topic.topicId}>पुनरावृत्ति करें</Link></div>
        </Card>)}
      </div>
    </section>}

    <h2>विषय</h2>
    <div className="grid">{subjects.map(s => <Link key={s.id} to={'/subjects/' + s.id}><Card className="subject-card"><div className="icon">{s.iconRef}</div><h3>{s.title}</h3><p>{s.description}</p><span className="linkish">अध्याय देखें →</span></Card></Link>)}</div>
  </Shell>;
};

const SubjectsPage = () => <Shell><div className="page-head"><h1>विषय</h1><p>विषय चुनें और अभ्यास शुरू करें।</p></div><div className="grid">{subjects.map(s => <Link key={s.id} to={`/subjects/${s.id}`}><Card className="subject-card"><div className="icon">{s.iconRef}</div><h2>{s.title}</h2><p>{s.description}</p></Card></Link>)}</div></Shell>;

const TopicCard = ({ topicId }: { topicId: ID }) => { const t = topics.find(x => x.id === topicId)!; const qCount = getQuestionsByTopic(t.id).length; const lessonId = t.lessonIds[0]; const lesson = lessonId ? getLesson(lessonId) : undefined; const chapter = chapters.find(x => x.id === t.chapterId); const topicPages = lesson ? getStudyPages(lesson.content).length : 0; const chapterPages = chapter ? getChapterStudyPages(chapter, allLessons, 12).length : 12; return <Card className="topic-card"><div className="topic-top"><h3>{t.title}</h3><span className="count">{qCount} प्रश्न</span></div><div className="topic-meta"><span>📖 अध्याय अध्ययन: {chapterPages} पृष्ठ</span><span>⏱ विस्तृत पाठ</span></div><div className="actions">{lessonId && <Link className="btn" to={`/lessons/${lessonId}`}>टॉपिक पढ़ें{topicPages ? ` · ${topicPages} पृष्ठ` : ''}</Link>}<Link className="btn primary" to={`/chapters/${t.chapterId}/study`}>अध्याय पढ़ें</Link><Link className="btn" to={`/practice/${t.id}`}>अभ्यास करें</Link></div></Card>; };

const SubjectPage = () => { const { subjectId } = useParams(); const s = getSubject(subjectId || ''); if (!s) return <Shell><Card className="empty"><h1>विषय नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></Card></Shell>; const cs = chapters.filter(c => c.subjectId === s.id).sort((a,b) => a.order-b.order); return <Shell><div className="page-head"><Link to="/subjects">← सभी विषय</Link><h1>{s.iconRef} {s.title}</h1><p>{s.description}</p></div>{s.id === 'sub_math' && <Card className="chapter-section"><div className="topic-top"><div><h2>गणित त्वरित तैयारी</h2><p>11 मुख्य इकाइयों के सूत्र और परीक्षा-जाँच एक जगह।</p></div><span className="count">35 प्रश्न</span></div><div className="actions"><Link className="btn primary" to="/math-formulas">📐 सूत्र-पत्र खोलें</Link><Link className="btn" to="/smart-practice">स्मार्ट अभ्यास</Link><Link className="btn" to="/mock-tests">मॉक टेस्ट</Link></div></Card>}{cs.map(c => <Card key={c.id} className="chapter-section"><Link className="chapter-link" to={`/chapters/${c.id}`}><h2>{c.title} →</h2></Link><div className="grid">{c.topicIds.map(id => <TopicCard key={id} topicId={id} />)}</div></Card>)}</Shell>; };

const ChapterPage = () => { const { chapterId } = useParams(); const c = chapters.find(x => x.id === chapterId); const s = c ? getSubject(c.subjectId) : undefined; if (!c || !s) return <Shell><Card className="empty"><h1>अध्याय नहीं मिला</h1></Card></Shell>; const pageCount = getChapterStudyPages(c, allLessons, 12).length; return <Shell><div className="page-head"><Link to={`/subjects/${s.id}`}>← {s.title}</Link><h1>{c.title}</h1><p>{pageCount} पृष्ठ का अध्याय अध्ययन पाठ उपलब्ध है।</p><div className="actions"><Link className="btn primary" to={`/chapters/${c.id}/study`}>📖 अध्याय पढ़ें · {pageCount}+ पृष्ठ</Link></div></div><div className="grid">{c.topicIds.map(id => <TopicCard key={id} topicId={id} />)}</div></Shell>; };

const LessonPage = () => { const { lessonId } = useParams(); const l = getLesson(lessonId || ''); const p = useProgressStore(); const pages = useMemo(() => l ? getStudyPages(l.content) : [], [l]); const [page, setPage] = useState(0); useEffect(() => setPage(0), [lessonId]); if (!l) return <Shell><Card className="empty"><h1>पाठ नहीं मिला</h1></Card></Shell>; const t = topics.find(x => x.id === l.topicId); const c = t ? chapters.find(x => x.id === t.chapterId) : undefined; const done = p.lessonActivity[l.id]?.status === 'completed'; return <Shell><div className="page-head"><Link to={c ? `/chapters/${c.id}` : '/subjects'}>← अध्याय</Link><h1>{l.title}</h1><div className="lesson-meta"><span>⏱ {l.estimatedMinutes} मिनट</span><span>{done ? '✅ पूरा हुआ' : '📖 सीख रहे हैं'}</span></div></div><Card className="lesson-card"><div className="study-reader"><div className="study-reader-head"><div><b>टॉपिक-पाठ</b><span>पृष्ठ {page + 1} / {pages.length}</span></div><div className="study-progress"><span style={{width: `${((page + 1) / Math.max(1, pages.length)) * 100}%`}} /></div></div><div className="study-page-nav">{pages.map((_, i) => <button key={i} className={i === page ? 'active' : ''} onClick={() => setPage(i)}>{i + 1}</button>)}</div></div><div className="objectives"><h3>इस पाठ के बाद आप</h3><ul>{l.objectives.map(x => <li key={x}>{x}</li>)}</ul></div><ContentRenderer blocks={pages[page] || l.content}/><div className="study-reader-actions"><button className="btn" disabled={page === 0} onClick={() => setPage(x => x - 1)}>← पिछला पृष्ठ</button>{page < pages.length - 1 ? <button className="btn primary" onClick={() => setPage(x => x + 1)}>अगला पृष्ठ →</button> : <button className="btn primary" onClick={() => { p.completeLesson(l.id, l.title); }}>पाठ पूरा करें</button>}</div><div className="actions"><Link className="btn" to={`/practice/${l.topicId}`}>टॉपिक अभ्यास</Link></div></Card></Shell>; };

const PracticePage = () => { const { topicId } = useParams(); const qs = useMemo(() => getQuestionsByTopic(topicId || ''), [topicId]); const [i,setI] = useState(0); const [selected,setSelected] = useState<ID[]>([]); const [checked,setChecked] = useState(false); const p = useProgressStore(); if (!qs.length) return <Shell><Card className="empty"><h1>इस टॉपिक में प्रश्न उपलब्ध नहीं हैं</h1></Card></Shell>; const q = qs[i]; const correct = sameAnswer(selected, q.correctOptionIds); const choose = (id: ID) => { if (checked) return; if (q.type === 'multiple-select') setSelected(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]); else setSelected([id]); }; const check = () => { if (!selected.length) return; setChecked(true); p.recordAttempt(q.id, { selectedOptionIds: selected, isCorrect: correct, timestamp: Date.now(), mode: 'practice' }); }; return <Shell><div className="page-head"><Link to={`/chapters/${q.chapterId}`}>← अध्याय</Link><div className="progressline"><span>प्रश्न {i + 1} / {qs.length}</span></div><h1>अभ्यास</h1></div><Card className="question-card"><div className="question-body"><div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div><div className="options">{q.options.map((o) => <button key={o.id} className={`option ${selected.includes(o.id) ? 'selected' : ''} ${checked && q.correctOptionIds.includes(o.id) ? 'correct' : ''}`} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>{checked && <div className={`answer ${correct ? 'correct' : 'wrong'}`}><b>{correct ? 'सही उत्तर ✅' : 'उत्तर की जाँच करें'}</b><div>{questionExplanationBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div></div>}<div className="study-reader-actions">{!checked ? <button className="btn primary" onClick={check}>उत्तर जाँचें</button> : <button className="btn primary" onClick={() => { setI((x) => (x + 1) % qs.length); setSelected([]); setChecked(false); }}>अगला प्रश्न →</button>}</div></div></Card></Shell>; };

const BookmarksPage = () => { const p = useProgressStore(); const bookmarked = allLessons.filter(l => p.bookmarks.lessonIds.includes(l.id)); return <Shell><div className="page-head"><h1>बुकमार्क</h1><p>सहेजे गए पाठ</p></div>{bookmarked.length ? <div className="grid">{bookmarked.map(l => <Card key={l.id}><h3>{l.title}</h3><Link className="btn" to={`/lessons/${l.id}`}>पाठ खोलें</Link></Card>)}</div> : <Card className="empty"><h2>अभी कोई बुकमार्क नहीं है</h2><p>पाठ पढ़ते समय बुकमार्क जोड़ें।</p></Card>}</Shell>; };

const SmartPracticePage = () => {
  const p = useProgressStore();
  const [qs] = useState(() => getSmartPracticeQuestions(useProgressStore.getState(), 10));
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<ID[]>([]);
  const [checked, setChecked] = useState(false);

  if (!qs.length) return <Shell><Card className="empty"><h1>अभी स्मार्ट अभ्यास के लिए प्रश्न नहीं हैं</h1><p>पहले किसी विषय या topic का अभ्यास शुरू करें।</p></Card></Shell>;

  const q = qs[i];
  const correct = sameAnswer(selected, q.correctOptionIds);
  const choose = (id: ID) => {
    if (checked) return;
    setSelected(q.type === 'multiple-select' ? (selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]) : [id]);
  };
  const check = () => {
    if (!selected.length) return;
    setChecked(true);
    p.recordAttempt(q.id, { selectedOptionIds: selected, isCorrect: correct, timestamp: Date.now(), mode: 'practice' });
  };

  return <Shell>
    <div className="page-head"><Link to="/">← डैशबोर्ड</Link><p>आपके पिछले प्रदर्शन के आधार पर चुने गए 10 परीक्षा-योग्य प्रश्न</p><h1>स्मार्ट अभ्यास</h1><div className="progressline"><span>प्रश्न {i + 1} / {qs.length}</span></div></div>
    <Card className="question-card"><div className="question-body">
      <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
      <div className="options">{q.options.map(o => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '') + ' ' + (checked && q.correctOptionIds.includes(o.id) ? 'correct' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
      {checked && <div className={'answer ' + (correct ? 'correct' : 'wrong')}><b>{correct ? 'सही उत्तर ✅' : 'उत्तर की जाँच करें'}</b><div>{questionExplanationBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div></div>}
      <div className="study-reader-actions">{!checked ? <button className="btn primary" onClick={check}>उत्तर जाँचें</button> : <button className="btn primary" onClick={() => { setI((x) => (x + 1) % qs.length); setSelected([]); setChecked(false); }}>{i === qs.length - 1 ? 'फिर से शुरू करें →' : 'अगला प्रश्न →'}</button>}</div>
    </div></Card>
  </Shell>;
};

const MockTestsPage = () => {
  const p = useProgressStore();
  const qs = useMemo(() => buildJnvstMockPaper(), []);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ID[]>>({});
  const [finished, setFinished] = useState(false);
  const q = qs[index];

  const selected = q ? (answers[q.id] || []) : [];
  const choose = (id: ID) => setAnswers((current) => ({
    ...current,
    [q.id]: [id],
  }));

  const finish = () => {
    const score = qs.reduce((sum, question) => sum + (sameAnswer(answers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);
    const sectionScores = qs.reduce<Record<string, number>>((scores, question) => {
      scores[question.subjectId] = (scores[question.subjectId] ?? 0) + (sameAnswer(answers[question.id] || [], question.correctOptionIds) ? 1 : 0);
      return scores;
    }, {});
    const result: MockTestResult = {
      id: 'mock-' + Date.now(),
      score,
      totalMarks: qs.length,
      timestamp: Date.now(),
      answers,
      sectionScores,
    };
    p.recordAttempts(qs.map((question) => ({
      id: question.id,
      attempt: {
        selectedOptionIds: answers[question.id] || [],
        isCorrect: sameAnswer(answers[question.id] || [], question.correctOptionIds),
        timestamp: Date.now(),
        mode: 'mock-test',
      },
    })));
    p.saveMockResult(result);
    setFinished(true);
  };

  if (finished) {
    const latest = p.mockTestResults[0];
    return <Shell><div className="page-head"><h1>मॉक टेस्ट परिणाम</h1><p>इस परीक्षा का परिणाम आपकी progress में सुरक्षित कर दिया गया है।</p></div>
      <Card><h2>{latest?.score ?? 0} / {latest?.totalMarks ?? qs.length}</h2><p>सटीकता: {latest?.totalMarks ? Math.round((latest.score / latest.totalMarks) * 100) : 0}%</p>
        <div className="grid">{examSections.map(section => <Card key={section.id}><h3>{section.title}</h3><p>{latest?.sectionScores?.[section.id] ?? 0} / {section.questions}</p></Card>)}</div>
        <div className="actions"><button className="btn primary" onClick={() => { setStarted(false); setFinished(false); setIndex(0); setAnswers({}); }}>नया मॉक टेस्ट</button><Link className="btn" to="/smart-practice">गलतियों पर अभ्यास</Link></div>
      </Card>
    </Shell>;
  }

  return <Shell>
    <div className="page-head"><h1>JNVST मॉक टेस्ट</h1><p>100 प्रश्न · 150 मिनट · हिंदी 15 · अंग्रेज़ी 15 · गणित 35 · विज्ञान 35</p><div className="actions">{!started && <button className="btn primary" onClick={() => setStarted(true)}>टेस्ट शुरू करें</button>}</div></div>
    {!started ? <Card><h2>परीक्षा-पूर्व निर्देश</h2><ul><li>केवल चार-विकल्प, एक-सही-उत्तर वाले MCQ इस परीक्षा में लिए गए हैं।</li><li>प्रश्नों का subject-wise वितरण JNVST pattern के अनुसार रखा गया है।</li><li>हर उत्तर चुनकर अगले प्रश्न पर जाएँ; अंत में आपका score और section-wise परिणाम सुरक्षित होगा।</li></ul></Card> : q && <Card className="question-card"><div className="question-body">
      <div className="progressline"><span>प्रश्न {index + 1} / {qs.length}</span><span>{examSections.find((section) => section.id === q.subjectId)?.title ?? 'विषय'}</span></div>
      <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
      <div className="options">{q.options.map(o => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
      <div className="study-reader-actions"><button className="btn primary" onClick={() => index === qs.length - 1 ? finish() : setIndex(x => x + 1)}>{index === qs.length - 1 ? 'टेस्ट जमा करें' : 'अगला प्रश्न →'}</button></div>
    </div></Card>}
  </Shell>;
};

export default function App() { return <HashRouter><Routes><Route path="/" element={<Dashboard />} /><Route path="/subjects" element={<SubjectsPage />} /><Route path="/subjects/:subjectId" element={<SubjectPage />} /><Route path="/chapters/:chapterId" element={<ChapterPage />} /><Route path="/chapters/:chapterId/study" element={<ChapterStudyPage />} /><Route path="/lessons/:lessonId" element={<LessonPage />} /><Route path="/math-formulas" element={<Shell><MathFormulaSheet /></Shell>} /><Route path="/practice/:topicId" element={<PracticePage />} /><Route path="/smart-practice" element={<SmartPracticePage />} /><Route path="/bookmarks" element={<BookmarksPage />} /><Route path="/mock-tests" element={<MockTestsPage />} /><Route path="*" element={<Dashboard />} /></Routes></HashRouter>; }