import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HashRouter, Link, Route, Routes, useParams } from 'react-router-dom';
import { allQuestions, allLessons, chapters, getLesson, getQuestionsBySubject, getQuestionsByTopic, getSubject, subjects, topics, jnvstExamQuestions } from './data';
import { getChapterStudyPages } from './data/lessons/chapterStudy';
import ChapterStudyPage from './pages/ChapterStudyPage';
import MathFormulaSheet from './pages/MathFormulaSheetPage';
import { MathAwareText, MathText } from './components/MathText';
import { useProgressStore } from './store/progress';
import type { ContentBlock, ID, MockTestResult, Question } from './types';
import { buildJnvstMockPaper, buildMathMockPaper, buildScienceMockPaper, getPerformanceSummary, getRevisionTopics, getSmartPracticeQuestions, getMathSmartPracticeQuestions, getScienceSmartPracticeQuestions, getSmartRecommendations, getWeakTopics, getTopicPerformances } from './utils/jnvstIntelligence';
import { mathMasteryUnits } from './data/mathMastery';
import { scienceMasteryUnits } from './data/sciencePrep';

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

const ScienceVisual = ({ topicId }: { topicId: ID }) => {
  const visuals: Record<string, { title: string; caption: string; items: { label: string; value: string }[] }> = {
    top_sci_01_01: { title: 'बल और दाब को ऐसे देखें', caption: 'पहले मात्रा पहचानें, फिर कारण और दिशा देखें।', items: [
      { label: 'बल', value: 'धक्का / खिंचाव' }, { label: 'दाब', value: 'बल ÷ क्षेत्रफल' }, { label: 'द्रव', value: 'गहराई बढ़े → दाब बढ़े' },
    ]},
    top_sci_01_02: { title: 'घर्षण का सरल मॉडल', caption: 'घर्षण गति या गति की प्रवृत्ति का विरोध करता है।', items: [
      { label: 'गति', value: '→ आगे' }, { label: 'घर्षण', value: '← विरोध' }, { label: 'उपयोग', value: 'चलना, ब्रेक, पकड़' },
    ]},
    top_sci_01_03: { title: 'ध्वनि: दो संकेत याद रखें', caption: 'आयाम loudness से और आवृत्ति pitch से जुड़ी है।', items: [
      { label: 'आयाम', value: 'बड़ा → अधिक प्रबल' }, { label: 'आवृत्ति', value: 'अधिक → ऊँची pitch' }, { label: 'माध्यम', value: 'कंपन को आगे पहुँचाता है' },
    ]},
    top_sci_01_04: { title: 'विद्युत अपघटन का flow', caption: 'घोल में आयन मौजूद हों तो विद्युत धारा रासायनिक परिवर्तन करा सकती है।', items: [
      { label: 'घोल', value: 'आयन मौजूद' }, { label: 'धारा', value: 'आयन गतिशील' }, { label: 'इलेक्ट्रोड', value: 'नया पदार्थ / जमाव' },
    ]},
    top_sci_01_05: { title: 'परावर्तन को ऐसे सोचें', caption: 'Normal हमेशा सतह पर आपतित बिंदु पर खींची गई लंब होती है।', items: [
      { label: 'आपतित किरण', value: '→ सतह' }, { label: 'Normal', value: '⊥ सतह' }, { label: 'परावर्तित किरण', value: '← दूर' },
    ]},
    top_sci_01_06: { title: 'तड़ित सुरक्षा की chain', caption: 'चालक का उद्देश्य आवेश को सुरक्षित मार्ग देना है।', items: [
      { label: 'बादल', value: 'आवेश' }, { label: 'तड़ित चालक', value: 'कम प्रतिरोध मार्ग' }, { label: 'भूमि', value: 'सुरक्षित विसर्जन' },
    ]},
    top_sci_02_04: { title: 'दहन के लिए तीन शर्तें', caption: 'ईंधन + ऑक्सीजन + ज्वलन ताप — तीनों का संबंध समझें।', items: [
      { label: 'ईंधन', value: 'दाह्य पदार्थ' }, { label: 'ऑक्सीजन', value: 'हवा का सहायक घटक' }, { label: 'ताप', value: 'ज्वलन ताप तक पहुँचे' },
    ]},
    top_sci_03_03: { title: 'कोशिका का कामकाजी नक्शा', caption: 'हर संरचना को उसके काम से जोड़कर याद करें।', items: [
      { label: 'कोशिका झिल्ली', value: 'आवागमन नियंत्रण' }, { label: 'केंद्रक', value: 'नियंत्रण / गुणसूत्र' }, { label: 'कोशिकाद्रव्य', value: 'अनेक कोशिकीय क्रियाएँ' },
    ]},
    top_sci_03_06: { title: 'संरक्षण को cause → action से समझें', caption: 'आवास बचाएँ तो उससे जुड़ी जैव विविधता भी सुरक्षित होती है।', items: [
      { label: 'समस्या', value: 'आवास का नष्ट होना' }, { label: 'प्रभाव', value: 'प्रजातियों पर दबाव' }, { label: 'कार्यवाही', value: 'आवास + प्रजाति संरक्षण' },
    ]},
    top_sci_02_05: { title: 'प्रदूषण का 4-step map', caption: 'हर प्रश्न में source, pollutant, effect और prevention अलग करें।', items: [
      { label: 'Source', value: 'कहाँ से निकला?' }, { label: 'Pollutant', value: 'क्या प्रदूषक है?' }, { label: 'Effect', value: 'क्या नुकसान?' },
    ]},
  };
  const fallback = scienceMasteryUnits.find((unit) => unit.topicId === topicId);
  const visual = visuals[topicId] ?? (fallback ? {
    title: fallback.title + ' — visual recall',
    caption: 'Core skills को तीन छोटे संकेतों में तोड़कर पढ़ें और फिर lesson की detail पर जाएँ।',
    items: fallback.coreSkills.slice(0, 3).map((value, index) => ({ label: 'Focus ' + (index + 1), value })),
  } : undefined);
  if (!visual) return null;
  return <aside className="science-visual-card" aria-label={visual.title}>
    <div className="science-visual-head"><span className="science-panel-label">VISUAL THINKING</span><b>{visual.title}</b><p>{visual.caption}</p></div>
    <div className="science-visual-grid">
      {visual.items.map((item, index) => <div className="science-visual-item" key={item.label}>
        <span>{String(index + 1).padStart(2, '0')}</span><b>{item.label}</b><small>{item.value}</small>
      </div>)}
    </div>
  </aside>;
};

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
};const getStudyPages = (blocks: ContentBlock[]): ContentBlock[][] => {
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
const getScienceStudyPages = (blocks: ContentBlock[]): ContentBlock[][] => {
  const pages: ContentBlock[][] = [];
  let current: ContentBlock[] = [];
  for (const block of blocks) {
    const shouldSplit = current.length >= 7 && (block.type === 'heading' || block.type === 'table' || block.type === 'callout');
    if (shouldSplit) {
      pages.push(current);
      current = [];
    }
    current.push(block);
    if (current.length >= 9 && block.type !== 'heading') {
      pages.push(current);
      current = [];
    }
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

const MathSubjectOverview = () => {
  const p = useProgressStore();
  const performances = getTopicPerformances(p).filter((topic) => topic.subjectId === 'sub_math');
  const mathAttempts = performances.reduce((sum, topic) => sum + topic.attempts, 0);
  const mathCorrect = performances.reduce((sum, topic) => sum + topic.correct, 0);
  const mathAccuracy = mathAttempts ? Math.round((mathCorrect / mathAttempts) * 100) : 0;
  const completedLessons = Object.entries(p.lessonActivity ?? {}).filter(([id, activity]) => id.startsWith('les_math_') && activity.status === 'completed').length;
  const masteredTopics = performances.filter((topic) => topic.attempts > 0 && topic.accuracy >= 80).length;
  const mathQuestionCount = getQuestionsBySubject('sub_math').length;

  return <section className="math-hub">
    <div className="math-hub-hero">
      <div>
        <span className="eyebrow">JNVST MATHS • COMPLETE PREPARATION CENTER</span>
        <h2>गणित तैयारी केंद्र</h2>
        <p>एक ही जगह पर पूरा JNVST गणित: concept notes, सूत्र, solved examples, chapter study, 220+ practice questions, smart revision और केवल गणित का 35-प्रश्न mock test।</p>
        <div className="actions">
          <Link className="btn primary" to="/math-formulas">📐 11 इकाइयों का सूत्र-पत्र</Link>
          <Link className="btn" to="/math-smart-practice">🎯 स्मार्ट गणित अभ्यास</Link>
          <Link className="btn" to="/math-mock-test">⏱ गणित मॉक टेस्ट</Link>
        </div>
      </div>
      <div className="math-hub-badge">
        <b>35</b>
        <span>प्रश्न</span>
        <small>JNVST गणित</small>
      </div>
    </div>

    <div className="math-stats">
      <Card><b>11</b><span>आधिकारिक इकाइयाँ</span></Card>
      <Card><b>{mathQuestionCount}</b><span>Math अभ्यास प्रश्न</span></Card>
      <Card><b>{completedLessons}</b><span>पूरे किए पाठ</span></Card>
      <Card><b>{mathAttempts ? mathAccuracy + '%' : '—'}</b><span>गणित सटीकता</span></Card>
    </div>

    <div className="math-hub-grid">
      <Card>
        <div className="topic-top"><div><h3>आपकी गणित प्रगति</h3><p>{mathAttempts ? mathAttempts + ' प्रयास · ' + masteredTopics + ' इकाइयाँ 80%+ accuracy पर' : 'अभी गणित के प्रयास दर्ज नहीं हैं।'}</p></div><span className="count">{mathAttempts ? mathAccuracy + '%' : 'शुरू करें'}</span></div>
        <div className="actions"><Link className="btn primary" to={mathAttempts ? "/math-smart-practice" : "/practice/top_math_01_01"}>{mathAttempts ? 'स्मार्ट अभ्यास शुरू करें' : 'पहला टॉपिक शुरू करें'}</Link></div>
      </Card>
      <Card>
        <h3>हर इकाई का पूरा अध्ययन चक्र</h3>
        <ol className="math-steps">
          <li><b>समझें</b> — concept, definition और नियम।</li>
          <li><b>सीखें</b> — formula + solved example + common trap।</li>
          <li><b>लगाएँ</b> — topic practice और smart revision।</li>
          <li><b>जाँचें</b> — 35-question Math mock से readiness देखें।</li>
        </ol>
      </Card>
    </div>

    <section className="math-chapter-map">
      <div className="math-mastery-head">
        <div>
          <span className="eyebrow">5 CHAPTERS • 11 OFFICIAL UNITS</span>
          <h3>पूरा गणित Study Roadmap</h3>
          <p>हर chapter के अंदर सभी official units हैं। पहले concept पढ़ें, फिर topic practice, फिर Smart Practice और अंत में Math Mock।</p>
        </div>
      </div>
      <div className="math-chapter-grid">
        {chapters.filter((chapter) => chapter.subjectId === 'sub_math').sort((a, b) => a.order - b.order).map((chapter) => {
          const chapterTopics = chapter.topicIds.map((id) => topics.find((topic) => topic.id === id)).filter(Boolean) as typeof topics;
          const chapterPerformance = chapterTopics.map((topic) => performances.find((item) => item.topicId === topic.id));
          const mastered = chapterPerformance.filter((item) => item?.attempts && item.accuracy >= 80).length;
          const attempted = chapterPerformance.filter((item) => item?.attempts).length;
          const pct = chapterTopics.length ? Math.round((mastered / chapterTopics.length) * 100) : 0;
          return <Card className="math-chapter-card" key={chapter.id}>
            <div className="math-chapter-card-head"><span className="math-unit-number">{String(chapter.order).padStart(2, '0')}</span><div><h4>{chapter.title}</h4><small>{chapterTopics.length} इकाइयाँ · {attempted} practiced · {mastered} mastered</small></div></div>
            <div className="math-progress"><span style={{ width: pct + '%' }} /></div>
            <div className="math-chapter-topics">
              {chapterTopics.map((topic) => {
                const performance = performances.find((item) => item.topicId === topic.id);
                const done = performance?.attempts && performance.accuracy >= 80;
                return <Link to={`/practice/${topic.id}`} key={topic.id} className={`math-mini-topic ${done ? 'done' : ''}`}><span>{done ? '✓' : '•'}</span><span>{topic.title}</span></Link>;
              })}
            </div>
            <div className="actions"><Link className="btn" to={`/chapters/${chapter.id}`}>Chapter खोलें</Link><Link className="btn primary" to={`/chapters/${chapter.id}/study`}>पूरा अध्ययन</Link></div>
          </Card>;
        })}
      </div>
    </section>

    <section className="math-mastery">
      <div className="math-mastery-head">
        <div>
          <span className="eyebrow">COMPLETE JNVST MATH SYLLABUS MAP</span>
          <h3>11 इकाइयों की Mastery Checklist</h3>
          <p>हर इकाई में क्या पढ़ना है, क्या याद रखना है, कौन-से formulas जरूरी हैं और exam में कहाँ गलती होती है—सब एक जगह।</p>
        </div>
        <Link className="btn" to="/math-formulas">सूत्र-पत्र →</Link>
      </div>
      <div className="math-unit-grid">
        {mathMasteryUnits.map((unit, index) => {
          const topic = topics.find((item) => item.id === unit.topicId);
          const questionCount = topic ? getQuestionsByTopic(topic.id).length : 0;
          const lessonCount = topic?.lessonIds.length ?? 0;
          return <details className="math-unit" key={unit.topicId}>
            <summary><span className="math-unit-number">{String(index + 1).padStart(2, '0')}</span><div><b>{unit.title}</b><small>{questionCount} प्रश्न · {lessonCount} पाठ</small></div><span>＋</span></summary>
            <div className="math-unit-body">
              <div><h4>क्या सीखना है</h4><ul>{unit.coreSkills.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h4>Must Know</h4><ul>{unit.mustKnow.map((item) => <li key={item}><InlineText text={item} /></li>)}</ul></div>
              <div><h4>मुख्य सूत्र</h4><div className="math-formula-chips">{unit.formulaFacts.map((formula) => <span key={formula}><MathText value={formula} /></span>)}</div></div>
              <div><h4>Exam Traps</h4><ul>{unit.examTraps.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="actions">
                {topic?.lessonIds[0] && <Link className="btn" to={`/lessons/${topic.lessonIds[0]}`}>पाठ पढ़ें</Link>}
                <Link className="btn primary" to={`/practice/${unit.topicId}`}>प्रश्न हल करें</Link>
              </div>
            </div>
          </details>;
        })}
      </div>
    </section>
  </section>;
};


const ScienceSubjectOverview = () => {
  const p = useProgressStore();
  const performances = getTopicPerformances(p).filter((topic) => topic.subjectId === 'sub_sci');
  const attempts = performances.reduce((sum, topic) => sum + topic.attempts, 0);
  const correct = performances.reduce((sum, topic) => sum + topic.correct, 0);
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  const completedLessons = Object.entries(p.lessonActivity ?? {}).filter(([id, activity]) => id.startsWith('les_sci_') && activity.status === 'completed').length;
  const masteredTopics = performances.filter((topic) => topic.attempts > 0 && topic.accuracy >= 80).length;
  const questionCount = getQuestionsBySubject('sub_sci').length;

  return <section className="science-hub">
    <div className="science-hub-hero">
      <div>
        <span className="eyebrow">JNVST SCIENCE • COMPLETE PREPARATION CENTER</span>
        <h2>विज्ञान तैयारी केंद्र</h2>
        <p>कक्षा VIII स्तर की 18 Science units, guided concept lessons, deep-dive revision, {questionCount} practice questions, adaptive practice और 35-प्रश्न Science mock एक ही जगह।</p>
        <div className="actions">
          <Link className="btn primary" to="/science-revision">🧠 त्वरित पुनरावृत्ति</Link>
          <Link className="btn" to="/science-smart-practice">🎯 स्मार्ट विज्ञान अभ्यास</Link>
          <Link className="btn" to="/science-mock-test">⏱ विज्ञान Mock</Link>
        </div>
      </div>
      <div className="science-hub-badge"><b>35</b><span>प्रश्न</span><small>JNVST विज्ञान</small></div>
    </div>

    <div className="science-source-strip">
      <div><span className="eyebrow">CONTENT BASIS</span><b>NCERT Class VIII Science + JNVST Class IX preparation</b><small>18 NCERT Science units · guided lessons · {questionCount} practice MCQs · adaptive practice · dedicated Science mock</small></div>
      <Link className="btn" to="/science-revision">18-unit revision map →</Link>
    </div>

    <div className="science-stats">
      <Card><b>18</b><span>Science इकाइयाँ</span></Card>
      <Card><b>{questionCount}</b><span>Science अभ्यास प्रश्न</span></Card>
      <Card><b>{completedLessons}</b><span>पूरे किए पाठ</span></Card>
      <Card><b>{attempts ? accuracy + '%' : '—'}</b><span>विज्ञान सटीकता</span></Card>
    </div>

    <div className="science-hub-grid">
      <Card>
        <div className="topic-top"><div><h3>आपकी विज्ञान प्रगति</h3><p>{attempts ? attempts + ' प्रयास · ' + masteredTopics + ' इकाइयाँ 80%+ accuracy पर' : 'अभी विज्ञान के प्रयास दर्ज नहीं हैं।'}</p></div><span className="count">{attempts ? accuracy + '%' : 'शुरू करें'}</span></div>
        <div className="actions"><Link className="btn primary" to={attempts ? "/science-smart-practice" : "/practice/top_sci_03_01"}>{attempts ? 'स्मार्ट अभ्यास शुरू करें' : 'पहला Science topic शुरू करें'}</Link></div>
      </Card>
      <Card>
        <h3>विज्ञान सीखने का चक्र</h3>
        <ol className="science-steps">
          <li><b>समझें</b> — concept, definition और कारण-परिणाम।</li>
          <li><b>देखें</b> — table, diagram cues और real-life examples।</li>
          <li><b>लगाएँ</b> — topic questions और adaptive practice।</li>
          <li><b>जाँचें</b> — 35-question Science mock से readiness देखें।</li>
        </ol>
      </Card>
    </div>

    <section className="science-learning-map">
      <div className="science-section-head">
        <span className="eyebrow">18 STUDY UNITS • DIRECT NAVIGATION</span>
        <h3>अपनी Science पढ़ाई सीधे Unit से शुरू करें</h3>
        <p>सभी 18 units बिना किसी अतिरिक्त chapter grouping के सीधे यहाँ दिखाए गए हैं। हर unit में concept lesson, practice और exam-focused revision तक सीधा रास्ता है।</p>
      </div>
      <div className="science-learning-summary">
        <div><b>18</b><span>कक्षा VIII Science units</span></div>
        <div><b>{scienceMasteryUnits.filter((unit) => (performances.find((item) => item.topicId === unit.topicId)?.attempts ?? 0) > 0).length}</b><span>अभ्यास शुरू</span></div>
        <div><b>{masteredTopics}</b><span>80%+ accuracy</span></div>
        <div><b>{questionCount}</b><span>कुल Science MCQs</span></div>
      </div>
      <div className="science-learning-grid">
        {scienceMasteryUnits.map((unit, index) => {
          const topic = topics.find((item) => item.id === unit.topicId);
          const lessonId = topic?.lessonIds[0];
          const performance = performances.find((item) => item.topicId === unit.topicId);
          const attemptsForUnit = performance?.attempts ?? 0;
          const unitAccuracy = performance?.accuracy ?? 0;
          const mastered = Boolean(attemptsForUnit && unitAccuracy >= 80);
          const status = mastered ? 'मजबूत' : attemptsForUnit ? 'अभ्यास चल रहा' : 'शुरू नहीं';
          const questionCountForUnit = topic ? getQuestionsByTopic(topic.id).length : 0;
          const coverage = questionCountForUnit ? Math.min(100, Math.round((attemptsForUnit / questionCountForUnit) * 100)) : 0;
          return <Card className="science-learning-card" key={unit.topicId}>
            <div className="science-learning-card-top">
              <span className="science-unit-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <span className={`science-status ${mastered ? 'mastered' : attemptsForUnit ? 'active' : 'new'}`}>{status}</span>
                <h4>{unit.title}</h4>
                <small>{questionCountForUnit} प्रश्न · {lessonId ? '1 guided lesson' : 'lesson unavailable'}</small>
              </div>
            </div>
            <p className="science-learning-focus">{unit.coreSkills.slice(0, 2).join(' · ')}</p>
            <div className="science-learning-meta"><span>अभ्यास कवरेज</span><b>{coverage}%</b></div>
            <div className="science-progress"><span style={{width: coverage + '%'}} /></div>
            {attemptsForUnit > 0 && <div className="science-learning-accuracy">हाल की सटीकता: <b>{unitAccuracy}%</b></div>}
            <div className="actions">
              {lessonId && <Link className="btn" to={`/lessons/${lessonId}`}>पाठ पढ़ें</Link>}
              <Link className="btn primary" to={`/practice/${unit.topicId}`}>अभ्यास करें</Link>
            </div>
          </Card>;
        })}
      </div>
    </section>

    <section className="science-mastery">
      <div className="science-section-head"><span className="eyebrow">REFERENCE & REVISION</span><h3>Science Mastery Checklist</h3><p>हर unit में core skills, must-know facts, quick recall और exam traps — lesson से पहले planning या आखिरी revision के लिए।</p></div>
      <div className="science-unit-grid">
        {scienceMasteryUnits.map((unit, index) => {
          const topic = topics.find((item) => item.id === unit.topicId);
          const questionCountForTopic = topic ? getQuestionsByTopic(topic.id).length : 0;
          const lessonCount = topic?.lessonIds.length ?? 0;
          return <details className="science-unit" key={unit.topicId}>
            <summary><span className="science-unit-number">{String(index + 1).padStart(2,'0')}</span><div><b>{unit.title}</b><small>{questionCountForTopic} प्रश्न · {lessonCount} पाठ</small></div><span>＋</span></summary>
            <div className="science-unit-body">
              <div><h4>क्या सीखना है</h4><ul>{unit.coreSkills.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h4>Must Know</h4><ul>{unit.mustKnow.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h4>Quick Facts</h4><div className="science-fact-chips">{unit.quickFacts.map((item) => <span key={item}>{item}</span>)}</div></div>
              <div><h4>Exam Traps</h4><ul>{unit.examTraps.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="actions">{topic?.lessonIds[0] && <Link className="btn" to={`/lessons/\${topic.lessonIds[0]}`}>पाठ पढ़ें</Link>}<Link className="btn primary" to={`/practice/\${unit.topicId}`}>प्रश्न हल करें</Link></div>
            </div>
          </details>;
        })}
      </div>
    </section>
  </section>;
};

const ScienceRevisionPage = () => (
  <Shell>
    <div className="page-head">
      <Link to="/subjects/sub_sci">← विज्ञान तैयारी केंद्र</Link>
      <span className="eyebrow">SCIENCE REVISION SHEET</span>
      <h1>विज्ञान त्वरित पुनरावृत्ति</h1>
      <p>18 units के सबसे महत्वपूर्ण facts और exam traps — अंतिम revision के लिए।</p>
    </div>
    <div className="science-revision-grid">
      {scienceMasteryUnits.map((unit, index) => <Card key={unit.topicId} className="science-revision-card">
        <div className="science-revision-head"><span className="science-unit-number">{String(index + 1).padStart(2,'0')}</span><div><h3>{unit.title}</h3><small>{unit.coreSkills.length} skills · {unit.quickFacts.length} quick facts</small></div></div>
        <h4>Quick Recall</h4><ul>{unit.quickFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
        <h4>Exam Traps</h4><ul>{unit.examTraps.map((trap) => <li key={trap}>{trap}</li>)}</ul>
        <div className="actions"><Link className="btn" to={`/lessons/\${topics.find((topic) => topic.id === unit.topicId)?.lessonIds[0] ?? ''}`}>पाठ</Link><Link className="btn primary" to={`/practice/\${unit.topicId}`}>अभ्यास</Link></div>
      </Card>)}
    </div>
  </Shell>
);

const ScienceSmartPracticePage = () => {
  const p = useProgressStore();
  const [setNumber, setSetNumber] = useState(0);
  const [qs, setQs] = useState(() => getScienceSmartPracticeQuestions(useProgressStore.getState(), 12, 'jnvst-science-smart-0'));
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<ID[]>([]);
  const [checked, setChecked] = useState(false);

  if (!qs.length) return <Shell><Card className="empty"><h1>स्मार्ट विज्ञान अभ्यास तैयार नहीं हो सका</h1><p>विज्ञान के topic-wise MCQ उपलब्ध हैं।</p></Card></Shell>;
  const q = qs[i];
  const correct = sameAnswer(selected, q.correctOptionIds);
  const choose = (id: ID) => { if (!checked) setSelected([id]); };
  const check = () => { if (!selected.length) return; setChecked(true); p.recordAttempt(q.id,{selectedOptionIds:selected,isCorrect:correct,timestamp:Date.now(),mode:'practice'}); };
  const regenerate = () => {
    const next = setNumber + 1;
    setSetNumber(next);
    setQs(getScienceSmartPracticeQuestions(useProgressStore.getState(),12,'jnvst-science-smart-' + next));
    setI(0); setSelected([]); setChecked(false);
  };

  return <Shell>
    <div className="page-head"><Link to="/subjects/sub_sci">← विज्ञान तैयारी केंद्र</Link><p>यह अभ्यास केवल Science के JNVST-compatible MCQs से बनता है और आपकी कमजोर/गलत/अनदेखी items को प्राथमिकता देता है।</p><h1>🎯 स्मार्ट विज्ञान अभ्यास</h1><div className="progressline"><span>प्रश्न {i + 1} / {qs.length}</span><span>{topics.find((topic) => topic.id === q.topicId)?.title ?? 'विज्ञान'}</span></div></div>
    <Card className="science-smart-banner"><div><b>12 प्रश्न · Science-only adaptive set</b><span>पहले chapter coverage, फिर weak areas और पिछली गलतियों पर फोकस।</span></div><Link className="btn" to="/science-mock-test">35 प्रश्न का Science Mock →</Link></Card>
    <Card className="question-card"><div className="question-body">
      <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
      <div className="options">{q.options.map((o) => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '') + ' ' + (checked && q.correctOptionIds.includes(o.id) ? 'correct' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
      {checked && <div className={'answer ' + (correct ? 'correct' : 'wrong')}><b>{correct ? 'सही उत्तर ✅' : 'गलत उत्तर — समाधान पढ़ें'}</b><div>{questionExplanationBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div></div>}
      <div className="study-reader-actions">{!checked ? <button className="btn primary" onClick={check}>उत्तर जाँचें</button> : <button className="btn primary" onClick={() => { if (i === qs.length - 1) regenerate(); else { setI((x) => x + 1); setSelected([]); setChecked(false); } }}>{i === qs.length - 1 ? 'नया Smart Set →' : 'अगला प्रश्न →'}</button>}</div>
    </div></Card>
  </Shell>;
};

const ScienceMockTestPage = () => {
  const p = useProgressStore();
  const [mockNumber, setMockNumber] = useState(0);
  const qs = useMemo(() => buildScienceMockPaper('jnvst-science-' + mockNumber + '-' + Date.now()), [mockNumber]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ID[]>>({});
  const answersRef = useRef<Record<string, ID[]>>({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const scienceTopics = topics.filter((topic) => topic.chapterId.startsWith('chap_sci_')).sort((a,b) => (chapters.find((c) => c.id === a.chapterId)?.order ?? 0) - (chapters.find((c) => c.id === b.chapterId)?.order ?? 0) || a.order - b.order);
  const q = qs[index];

  const choose = (id: ID) => {
    if (!q) return;
    const next = {...answersRef.current, [q.id]: [id]};
    answersRef.current = next;
    setAnswers(next);
  };
  const finish = () => {
    const currentAnswers = answersRef.current;
    const now = Date.now();
    const score = qs.reduce((sum, question) => sum + (sameAnswer(currentAnswers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);
    const result: MockTestResult = { id:'science-mock-' + now, score, totalMarks:qs.length, timestamp:now, answers:currentAnswers, sectionScores:{sub_sci:score} };
    p.recordAttempts(qs.map((question) => ({id:question.id,attempt:{selectedOptionIds:currentAnswers[question.id] || [],isCorrect:sameAnswer(currentAnswers[question.id] || [],question.correctOptionIds),timestamp:now,mode:'mock-test'}})));
    p.saveMockResult(result);
    setFinished(true);
  };

  useEffect(() => {
    if (!started || finished) return;
    const timerId = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timerId);
          finish();
          return 0;
        }
        return value - 1;
      });
    },1000);
    return () => window.clearInterval(timerId);
  },[started,finished]);

  const formatTime = (seconds: number) => String(Math.floor(seconds / 60)).padStart(2,'0') + ':' + String(seconds % 60).padStart(2,'0');
  const score = qs.reduce((sum, question) => sum + (sameAnswer(answers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);
  const answeredCount = Object.values(answers).filter((value) => value.length > 0).length;

  if (finished) {
    const topicStats = scienceTopics.map((topic) => {
      const topicQuestions = qs.filter((question) => question.topicId === topic.id);
      const topicCorrect = topicQuestions.filter((question) => sameAnswer(answers[question.id] || [], question.correctOptionIds)).length;
      return { ...topic, count:topicQuestions.length, correct:topicCorrect };
    });
    return <Shell>
      <div className="page-head"><Link to="/subjects/sub_sci">← विज्ञान तैयारी केंद्र</Link><h1>विज्ञान Mock Test परिणाम</h1><p>यह 35-प्रश्न Science-only practice test था। परिणाम आपकी progress में सुरक्षित है।</p></div>
      <section className="science-result-hero"><span>आपका स्कोर</span><strong>{score} / {qs.length}</strong><b>{Math.round((score/qs.length)*100)}% accuracy</b></section>
      <div className="science-result-grid"><Card><b>{answeredCount}</b><span>attempted</span></Card><Card><b>{qs.length-answeredCount}</b><span>unanswered</span></Card><Card><b>{Math.round((score/qs.length)*100)}%</b><span>accuracy</span></Card></div>
      <Card><div className="science-section-head"><h2>इकाई-वार प्रदर्शन</h2><p>सभी 18 Science units से कम-से-कम 1 प्रश्न इस paper में है; बाकी प्रश्न seeded variety के लिए चुने जाते हैं।</p></div>
        <div className="science-result-topics">{topicStats.map((topic) => <div className="science-result-topic" key={topic.id}><div><b>{topic.title}</b><span>{topic.correct} / {topic.count} सही</span></div><span>{topic.count ? Math.round((topic.correct/topic.count)*100) + '%' : '—'}</span></div>)}</div>
      </Card>
      <div className="actions"><button className="btn primary" onClick={() => {answersRef.current={};setMockNumber((n)=>n+1);setStarted(false);setFinished(false);setIndex(0);setAnswers({});setTimeLeft(50*60);}}>नया विज्ञान Mock</button><Link className="btn" to="/science-smart-practice">गलतियों पर Smart Practice</Link><Link className="btn" to="/science-revision">त्वरित पुनरावृत्ति</Link></div>
    </Shell>;
  }

  return <Shell>
    <div className="page-head"><Link to="/subjects/sub_sci">← विज्ञान तैयारी केंद्र</Link><h1>⏱ विज्ञान Mock Test</h1><p>35 प्रश्न · 35 अंक · केवल विज्ञान · सभी 18 units की कम-से-कम 1-question coverage</p>{!started && <div className="actions"><button className="btn primary" onClick={() => {answersRef.current={};setAnswers({});setTimeLeft(50*60);setStarted(true);}}>टेस्ट शुरू करें</button></div>}</div>
    {!started ? <Card className="science-mock-intro"><h2>टेस्ट से पहले</h2><div className="pattern"><div><b>35</b><span>प्रश्न</span></div><div><b>35</b><span>अंक</span></div><div><b>50 min</b><span>recommended practice time</span></div><div><b>18</b><span>इकाइयाँ</span></div><div><b>1+</b><span>प्रश्न/इकाई</span></div><div><b>4</b><span>विकल्प/प्रश्न</span></div></div><ul><li>यह Science-only practice mock है; यह आधिकारिक अलग Science परीक्षा-समय नहीं है।</li><li>हर प्रश्न चार विकल्प और एक सही उत्तर वाले MCQ pool से आता है।</li><li>Question navigator से किसी भी प्रश्न पर जा सकते हैं; खाली प्रश्न बाद में कर सकते हैं।</li><li>50 मिनट recommended practice limit है; पूरा JNVST Selection Test आधिकारिक रूप से 150 मिनट का है।</li></ul></Card>
    : q && <div className="science-mock-layout"><Card className="question-card"><div className="progressline"><span>प्रश्न {index+1} / {qs.length}</span><span>हल किए: {answeredCount}</span><span className={timeLeft<=300 ? 'mock-timer danger' : 'mock-timer'}>⏱ {formatTime(timeLeft)}</span></div><div className="question-text">{questionTextBlocks(q).map((b,idx)=><ContentRenderer key={idx} blocks={[b]} />)}</div><div className="options">{q.options.map((o)=><button key={o.id} className={'option ' + (answers[q.id]?.includes(o.id) ? 'selected' : '')} onClick={()=>choose(o.id)}><InlineText text={o.text}/></button>)}</div><div className="study-reader-actions"><button className="btn" disabled={index===0} onClick={()=>setIndex(x=>x-1)}>← पिछला</button>{index===qs.length-1?<button className="btn primary" onClick={finish}>टेस्ट जमा करें</button>:<button className="btn primary" onClick={()=>setIndex(x=>x+1)}>अगला प्रश्न →</button>}</div></Card>
      <Card className="science-mock-palette"><h3>Question Navigator</h3><p>{answeredCount} / {qs.length} answered</p><div className="science-palette-grid">{qs.map((question,qi)=><button key={question.id} className={(answers[question.id]?.length ? 'answered ' : '') + (qi===index ? 'current' : '')} onClick={()=>setIndex(qi)}>{qi+1}</button>)}</div></Card></div>}
  </Shell>;
};

const SubjectPage = () => {
  const { subjectId } = useParams();
  const s = getSubject(subjectId || '');
  if (!s) return <Shell><Card className="empty"><h1>विषय नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></Card></Shell>;
  const cs = chapters.filter(c => c.subjectId === s.id).sort((a,b) => a.order-b.order);
  return <Shell>
    <div className="page-head">
      <Link to="/subjects">← सभी विषय</Link>
      <h1>{s.iconRef} {s.title}</h1>
      <p>{s.description}</p>
    </div>
    {s.id === 'sub_math' && <MathSubjectOverview />}
    {s.id === 'sub_sci' && <ScienceSubjectOverview />}
    {s.id !== 'sub_sci' && cs.map(c => <Card key={c.id} className="chapter-section"><Link className="chapter-link" to={`/chapters/${c.id}`}><h2>{c.title} →</h2></Link><div className="grid">{c.topicIds.map(id => <TopicCard key={id} topicId={id} />)}</div></Card>)}
  </Shell>;
};

const ChapterPage = () => { const { chapterId } = useParams(); const c = chapters.find(x => x.id === chapterId); const s = c ? getSubject(c.subjectId) : undefined; if (!c || !s) return <Shell><Card className="empty"><h1>अध्याय नहीं मिला</h1></Card></Shell>; const pageCount = getChapterStudyPages(c, allLessons, 12).length; return <Shell><div className="page-head"><Link to={`/subjects/${s.id}`}>← {s.title}</Link><h1>{c.title}</h1><p>{pageCount} पृष्ठ का अध्याय अध्ययन पाठ उपलब्ध है।</p><div className="actions"><Link className="btn primary" to={`/chapters/${c.id}/study`}>📖 अध्याय पढ़ें · {pageCount}+ पृष्ठ</Link></div></div><div className="grid">{c.topicIds.map(id => <TopicCard key={id} topicId={id} />)}</div></Shell>; };

const LessonPage = () => {
  const { lessonId } = useParams();
  const l = getLesson(lessonId || '');
  const p = useProgressStore();
  const isScience = l?.topicId.startsWith('top_sci_') ?? false;
  const pages = useMemo(() => l ? (isScience ? getScienceStudyPages(l.content) : getStudyPages(l.content)) : [], [l, isScience]);
  const [page, setPage] = useState(0);

  useEffect(() => setPage(0), [lessonId]);

  if (!l) return <Shell><Card className="empty"><h1>पाठ नहीं मिला</h1></Card></Shell>;

  const t = topics.find((x) => x.id === l.topicId);
  const c = t ? chapters.find((x) => x.id === t.chapterId) : undefined;
  const done = p.lessonActivity[l.id]?.status === 'completed';
  const mastery = isScience ? scienceMasteryUnits.find((unit) => unit.topicId === l.topicId) : undefined;
  const progressPercent = ((page + 1) / Math.max(1, pages.length)) * 100;

  return <Shell>
    <div className="page-head">
      <Link to={isScience ? '/subjects/sub_sci' : (c ? `/chapters/${c.id}` : '/subjects')}>← {isScience ? 'विज्ञान तैयारी केंद्र' : 'अध्याय'}</Link>
      {isScience && <span className="eyebrow">SCIENCE • NCERT-ALIGNED SELF-LEARNING</span>}
      <h1>{l.title}</h1>
      <div className="lesson-meta">
        <span>⏱ {l.estimatedMinutes} मिनट</span>
        <span>{pages.length} अध्ययन पृष्ठ</span>
        <span>{done ? '✅ पूरा हुआ' : '📖 सीख रहे हैं'}</span>
      </div>
    </div>

    {isScience && mastery && <section className="science-lesson-companion">
      <div className="science-source-note">
        <b>अध्ययन आधार</b>
        <span>कक्षा VIII Science concepts के आधार पर यह self-learning content JNVST Class IX preparation के लिए structured है। आधिकारिक exam rules के लिए current NVS prospectus देखें।</span>
      </div>
      <div className="science-lesson-companion-grid">
        <div className="science-lesson-companion-panel">
          <span className="science-panel-label">CORE SKILLS</span>
          <div className="science-skill-chips">{mastery.coreSkills.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
        <div className="science-lesson-companion-panel">
          <span className="science-panel-label">QUICK RECALL</span>
          <ul>{mastery.quickFacts.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="science-lesson-companion-panel">
          <span className="science-panel-label">EXAM TRAPS</span>
          <ul>{mastery.examTraps.slice(0, 2).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="science-lesson-companion-panel science-lesson-companion-action">
          <span className="science-panel-label">NEXT STEP</span>
          <p>पहले पूरा concept पढ़ें, फिर उसी unit के प्रश्न लगाएँ।</p>
          <div className="actions">
            <Link className="btn" to={`/practice/${l.topicId}`}>Unit Practice</Link>
            <Link className="btn primary" to="/science-smart-practice">Smart Practice</Link>
          </div>
        </div>
      </div>
    </section>}

    {isScience && <ScienceVisual topicId={l.topicId} />}

    <Card className="lesson-card">
      <div className="study-reader">
        <div className="study-reader-head">
          <div><b>टॉपिक-पाठ</b><span>पृष्ठ {page + 1} / {pages.length}</span></div>
          <div className="study-progress"><span style={{width: progressPercent + '%'}} /></div>
        </div>
        <div className="study-page-nav" aria-label="अध्ययन पृष्ठ">
          {pages.map((_, i) => <button key={i} className={i === page ? 'active' : ''} aria-current={i === page ? 'page' : undefined} aria-label={`पृष्ठ ${i + 1}`} onClick={() => setPage(i)}>{i + 1}</button>)}
        </div>
      </div>

      <div className="objectives">
        <h3>इस पाठ के बाद आप</h3>
        <ul>{l.objectives.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>

      <ContentRenderer blocks={pages[page] || l.content}/>

      <div className="study-reader-actions">
        <button className="btn" disabled={page === 0} onClick={() => setPage((x) => x - 1)}>← पिछला पृष्ठ</button>
        {page < pages.length - 1
          ? <button className="btn primary" onClick={() => setPage((x) => x + 1)}>अगला पृष्ठ →</button>
          : <button className="btn primary" onClick={() => { p.completeLesson(l.id, l.title); }}>पाठ पूरा करें</button>}
      </div>

      <div className="science-lesson-actions">
        <div>
          <b>{isScience ? 'अब अपनी समझ जाँचें' : 'अब अभ्यास करें'}</b>
          <span>{isScience ? 'Lesson के तुरंत बाद practice करने से recall मजबूत होता है।' : 'पाठ के बाद उसी topic के प्रश्न हल करें।'}</span>
        </div>
        <div className="actions">
          <Link className="btn" to={`/practice/${l.topicId}`}>टॉपिक अभ्यास</Link>
          {isScience && <Link className="btn" to="/science-revision">Quick Revision</Link>}
          {isScience && <Link className="btn primary" to="/science-mock-test">35Q Science Mock</Link>}
        </div>
      </div>
    </Card>
  </Shell>;
};

const PracticePage = () => { const { topicId } = useParams(); const qs = useMemo(() => getQuestionsByTopic(topicId || ''), [topicId]); const [i,setI] = useState(0); const [selected,setSelected] = useState<ID[]>([]); const [checked,setChecked] = useState(false); const p = useProgressStore(); if (!qs.length) return <Shell><Card className="empty"><h1>इस टॉपिक में प्रश्न उपलब्ध नहीं हैं</h1></Card></Shell>; const q = qs[i]; const correct = sameAnswer(selected, q.correctOptionIds); const choose = (id: ID) => { if (checked) return; if (q.type === 'multiple-select') setSelected(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]); else setSelected([id]); }; const check = () => { if (!selected.length) return; setChecked(true); p.recordAttempt(q.id, { selectedOptionIds: selected, isCorrect: correct, timestamp: Date.now(), mode: 'practice' }); }; return <Shell><div className="page-head"><Link to={q.chapterId.startsWith('chap_sci_') ? '/subjects/sub_sci' : `/chapters/${q.chapterId}`}>← {q.chapterId.startsWith('chap_sci_') ? 'विज्ञान तैयारी केंद्र' : 'अध्याय'}</Link><div className="progressline"><span>प्रश्न {i + 1} / {qs.length}</span></div><h1>अभ्यास</h1></div><Card className="question-card"><div className="question-body"><div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div><div className="options">{q.options.map((o) => <button key={o.id} className={`option ${selected.includes(o.id) ? 'selected' : ''} ${checked && q.correctOptionIds.includes(o.id) ? 'correct' : ''}`} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>{checked && <div className={`answer ${correct ? 'correct' : 'wrong'}`}><b>{correct ? 'सही उत्तर ✅' : 'उत्तर की जाँच करें'}</b><div>{questionExplanationBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div></div>}<div className="study-reader-actions">{!checked ? <button className="btn primary" onClick={check}>उत्तर जाँचें</button> : <button className="btn primary" onClick={() => { setI((x) => (x + 1) % qs.length); setSelected([]); setChecked(false); }}>अगला प्रश्न →</button>}</div></div></Card></Shell>; };

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
    <div className="page-head"><Link to="/">← डैशबोर्ड</Link><p>सभी विषयों के प्रदर्शन के आधार पर चुने गए परीक्षा-योग्य प्रश्न</p><h1>स्मार्ट अभ्यास</h1><div className="progressline"><span>प्रश्न {i + 1} / {qs.length}</span></div></div>
    <Card className="question-card"><div className="question-body">
      <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
      <div className="options">{q.options.map(o => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '') + ' ' + (checked && q.correctOptionIds.includes(o.id) ? 'correct' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
      {checked && <div className={'answer ' + (correct ? 'correct' : 'wrong')}><b>{correct ? 'सही उत्तर ✅' : 'उत्तर की जाँच करें'}</b><div>{questionExplanationBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div></div>}
      <div className="study-reader-actions">{!checked ? <button className="btn primary" onClick={check}>उत्तर जाँचें</button> : <button className="btn primary" onClick={() => { setI((x) => (x + 1) % qs.length); setSelected([]); setChecked(false); }}>{i === qs.length - 1 ? 'फिर से शुरू करें →' : 'अगला प्रश्न →'}</button>}</div>
    </div></Card>
  </Shell>;
};

const MathSmartPracticePage = () => {
  const p = useProgressStore();
  const [setNumber, setSetNumber] = useState(0);
  const [qs, setQs] = useState(() => getMathSmartPracticeQuestions(useProgressStore.getState(), 12, 'jnvst-math-smart-0'));
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<ID[]>([]);
  const [checked, setChecked] = useState(false);

  if (!qs.length) return <Shell><Card className="empty"><h1>स्मार्ट गणित अभ्यास तैयार नहीं हो सका</h1><p>गणित के विषयांशों में अभ्यास प्रश्न उपलब्ध हैं।</p></Card></Shell>;

  const q = qs[i];
  const topic = topics.find((item) => item.id === q.topicId);
  const correct = sameAnswer(selected, q.correctOptionIds);
  const choose = (id: ID) => { if (!checked) setSelected([id]); };
  const regenerate = () => {
    const nextSet = setNumber + 1;
    setSetNumber(nextSet);
    setQs(getMathSmartPracticeQuestions(useProgressStore.getState(), 12, 'jnvst-math-smart-' + nextSet));
    setI(0);
    setSelected([]);
    setChecked(false);
  };

  const check = () => {
    if (!selected.length) return;
    setChecked(true);
    p.recordAttempt(q.id, { selectedOptionIds: selected, isCorrect: correct, timestamp: Date.now(), mode: 'practice' });
  };

  return <Shell>
    <div className="page-head">
      <Link to="/subjects/sub_math">← गणित तैयारी केंद्र</Link>
      <p>यह अभ्यास केवल <b>गणित</b> के प्रश्नों से बनता है और आपके गलत, कमजोर तथा अनदेखे प्रश्नों को प्राथमिकता देता है।</p>
      <h1>🎯 स्मार्ट गणित अभ्यास</h1>
      <div className="progressline"><span>प्रश्न {i + 1} / {qs.length}</span><span>{topic?.title ?? 'गणित'}</span></div>
    </div>
    <Card className="math-smart-banner">
      <div><b>12 प्रश्न · Math-only adaptive set</b><span>पहले coverage, फिर आपकी weak areas और पिछली गलतियों पर फोकस।</span></div>
      <Link className="btn" to="/math-mock-test">35 प्रश्न का गणित Mock →</Link>
    </Card>
    <Card className="question-card"><div className="question-body">
      <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
      <div className="options">{q.options.map(o => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '') + ' ' + (checked && q.correctOptionIds.includes(o.id) ? 'correct' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
      {checked && <div className={'answer ' + (correct ? 'correct' : 'wrong')}><b>{correct ? 'सही उत्तर ✅' : 'गलत उत्तर — समाधान पढ़ें'}</b><div>{questionExplanationBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div></div>}
      <div className="study-reader-actions">
        {!checked ? <button className="btn primary" onClick={check}>उत्तर जाँचें</button> : <button className="btn primary" onClick={() => { if (i === qs.length - 1) regenerate(); else { setI((x) => x + 1); setSelected([]); setChecked(false); } }}>{i === qs.length - 1 ? 'नया Smart Set →' : 'अगला प्रश्न →'}</button>}
      </div>
    </div></Card>
  </Shell>;
};

const MathMockTestPage = () => {
  const p = useProgressStore();
  const [mockNumber, setMockNumber] = useState(0);
  const qs = useMemo(() => buildMathMockPaper('jnvst-math-' + mockNumber + '-' + Date.now()), [mockNumber]);
  const mathTopics = topics.filter((topic) => topic.chapterId.startsWith('chap_math_')).sort((a, b) => a.order - b.order);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ID[]>>({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(53 * 60);

  const q = qs[index];
  const selected = q ? (answers[q.id] || []) : [];
  const answeredCount = Object.values(answers).filter((value) => value.length > 0).length;
  const score = qs.reduce((sum, question) => sum + (sameAnswer(answers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);
  const choose = (id: ID) => { if (q) setAnswers((current) => ({ ...current, [q.id]: [id] })); };

  const finish = () => {
    const now = Date.now();
    const result: MockTestResult = {
      id: 'math-mock-' + now,
      score,
      totalMarks: qs.length,
      timestamp: now,
      answers,
      sectionScores: { sub_math: score },
    };
    p.recordAttempts(qs.map((question) => ({
      id: question.id,
      attempt: {
        selectedOptionIds: answers[question.id] || [],
        isCorrect: sameAnswer(answers[question.id] || [], question.correctOptionIds),
        timestamp: now,
        mode: 'mock-test',
      },
    })));
    p.saveMockResult(result);
    setFinished(true);
  };

  useEffect(() => {
    if (!started || finished) return;
    const timer = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          finish();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, finished]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  };

  if (finished) {
    const topicStats = mathTopics.map((topic) => {
      const topicQuestions = qs.filter((question) => question.topicId === topic.id);
      const topicCorrect = topicQuestions.filter((question) => sameAnswer(answers[question.id] || [], question.correctOptionIds)).length;
      return { ...topic, count: topicQuestions.length, correct: topicCorrect };
    });

    return <Shell>
      <div className="page-head"><Link to="/subjects/sub_math">← गणित तैयारी केंद्र</Link><h1>गणित Mock Test परिणाम</h1><p>यह 35-प्रश्न Math-only practice test था। आपके उत्तर progress में दर्ज किए गए हैं।</p></div>
      <section className="math-result-hero">
        <span>आपका स्कोर</span>
        <strong>{score} / {qs.length}</strong>
        <b>{Math.round((score / qs.length) * 100)}% accuracy</b>
      </section>
      <div className="math-result-grid">
        <Card><b>{answeredCount}</b><span>attempted</span></Card>
        <Card><b>{qs.length - answeredCount}</b><span>unanswered</span></Card>
        <Card><b>{Math.round((score / qs.length) * 100)}%</b><span>accuracy</span></Card>
      </div>
      <Card>
        <div className="page-head"><h2>इकाई-वार प्रदर्शन</h2><p>हर official Math unit से कम-से-कम 3 प्रश्न इस paper में रखे गए हैं; 2 अतिरिक्त प्रश्न coverage बढ़ाते हैं।</p></div>
        <div className="math-result-topics">
          {topicStats.map((topic) => <div className="math-result-topic" key={topic.id}><div><b>{topic.title}</b><span>{topic.correct} / {topic.count} सही</span></div><span className="count">{topic.count ? Math.round((topic.correct / topic.count) * 100) + '%' : '—'}</span></div>)}
        </div>
      </Card>
      <div className="actions"><button className="btn primary" onClick={() => { setMockNumber((value) => value + 1); setStarted(false); setFinished(false); setIndex(0); setAnswers({}); setTimeLeft(53 * 60); }}>नया गणित Mock</button><Link className="btn" to="/math-smart-practice">गलतियों पर स्मार्ट अभ्यास</Link><Link className="btn" to="/math-formulas">सूत्र-पत्र</Link></div>
    </Shell>;
  }

  return <Shell>
    <div className="page-head">
      <Link to="/subjects/sub_math">← गणित तैयारी केंद्र</Link>
      <h1>⏱ गणित Mock Test</h1>
      <p>35 प्रश्न · 35 अंक · केवल गणित · सभी 11 आधिकारिक इकाइयों से balanced coverage</p>
      {!started && <div className="actions"><button className="btn primary" onClick={() => { setTimeLeft(53 * 60); setStarted(true); }}>टेस्ट शुरू करें</button></div>}
    </div>
    {!started ? <Card className="math-mock-intro">
      <h2>टेस्ट से पहले</h2>
      <div className="pattern">
        <div><b>35</b><span>प्रश्न</span></div>
        <div><b>35</b><span>अंक</span></div>
        <div><b>53 min</b><span>recommended practice time</span></div>
        <div><b>11</b><span>इकाइयाँ</span></div>
        <div><b>3+</b><span>प्रश्न/इकाई</span></div>
        <div><b>4</b><span>विकल्प/प्रश्न</span></div>
      </div>
      <ul>
        <li>यह केवल गणित का अभ्यास mock है; इसमें हिंदी, अंग्रेज़ी या विज्ञान का प्रश्न नहीं आएगा।</li>
        <li>हर प्रश्न में चार विकल्प हैं और एक सही उत्तर है।</li>
        <li>किसी प्रश्न को खाली छोड़ सकते हैं और navigator से बाद में वापस आ सकते हैं।</li>
        <li>53 मिनट का timer एक recommended Math-only practice limit है, आधिकारिक अलग Math परीक्षा-समय नहीं।</li>
      </ul>
    </Card> : q && <div className="math-mock-layout">
      <Card className="question-card">
        <div className="progressline"><span>प्रश्न {index + 1} / {qs.length}</span><span>हल किए: {answeredCount}</span><span className={timeLeft <= 300 ? 'mock-timer danger' : 'mock-timer'}>⏱ {formatTime(timeLeft)}</span></div>
        <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
        <div className="options">{q.options.map(o => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
        <div className="study-reader-actions">
          <button className="btn" disabled={index === 0} onClick={() => setIndex((x) => x - 1)}>← पिछला</button>
          {index === qs.length - 1
            ? <button className="btn primary" onClick={finish}>टेस्ट जमा करें</button>
            : <button className="btn primary" onClick={() => setIndex((x) => x + 1)}>अगला प्रश्न →</button>}
        </div>
      </Card>
      <Card className="math-mock-palette">
        <h3>Question Navigator</h3>
        <p>{answeredCount} / {qs.length} answered</p>
        <div className="math-palette-grid">
          {qs.map((question, questionIndex) => <button key={question.id} className={(answers[question.id]?.length ? 'answered ' : '') + (questionIndex === index ? 'current' : '')} onClick={() => setIndex(questionIndex)}>{questionIndex + 1}</button>)}
        </div>
      </Card>
    </div>}
  </Shell>;
};

const MockTestsPage = () => {
  const p = useProgressStore();
  const qs = useMemo(() => buildJnvstMockPaper(), []);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ID[]>>({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150 * 60);
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

  useEffect(() => {
    if (!started || finished) return;
    const timerId = window.setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          window.clearInterval(timerId);
          finish();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timerId);
  }, [started, finished]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
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
    <div className="page-head"><h1>JNVST मॉक टेस्ट</h1><p>100 प्रश्न · 150 मिनट · हिंदी 15 · अंग्रेज़ी 15 · गणित 35 · विज्ञान 35</p><div className="actions">{!started && <button className="btn primary" onClick={() => { setTimeLeft(150 * 60); setStarted(true); }}>टेस्ट शुरू करें</button>}</div></div>
    {!started ? <Card><h2>परीक्षा-पूर्व निर्देश</h2><ul><li>केवल चार-विकल्प, एक-सही-उत्तर वाले MCQ इस परीक्षा में लिए गए हैं।</li><li>प्रश्नों का subject-wise वितरण JNVST pattern के अनुसार रखा गया है।</li><li>हर उत्तर चुनकर अगले प्रश्न पर जाएँ; अंत में आपका score और section-wise परिणाम सुरक्षित होगा।</li>
        <li>150 मिनट का timer आधिकारिक पूरे Selection Test की अवधि को दर्शाता है।</li></ul></Card> : q && <Card className="question-card"><div className="question-body">
      <div className="progressline"><span>प्रश्न {index + 1} / {qs.length}</span><span>{examSections.find((section) => section.id === q.subjectId)?.title ?? 'विषय'}</span><span className={timeLeft <= 300 ? 'mock-timer danger' : 'mock-timer'}>⏱ {formatTime(timeLeft)}</span></div>
      <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
      <div className="options">{q.options.map(o => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
      <div className="study-reader-actions"><button className="btn primary" onClick={() => index === qs.length - 1 ? finish() : setIndex(x => x + 1)}>{index === qs.length - 1 ? 'टेस्ट जमा करें' : 'अगला प्रश्न →'}</button></div>
    </div></Card>}
  </Shell>;
};

export default function App() { return <HashRouter><Routes><Route path="/" element={<Dashboard />} /><Route path="/subjects" element={<SubjectsPage />} /><Route path="/subjects/:subjectId" element={<SubjectPage />} /><Route path="/chapters/:chapterId" element={<ChapterPage />} /><Route path="/chapters/:chapterId/study" element={<ChapterStudyPage />} /><Route path="/lessons/:lessonId" element={<LessonPage />} /><Route path="/math-formulas" element={<Shell><MathFormulaSheet /></Shell>} /><Route path="/science-revision" element={<ScienceRevisionPage />} /><Route path="/science-smart-practice" element={<ScienceSmartPracticePage />} /><Route path="/science-mock-test" element={<ScienceMockTestPage />} /><Route path="/practice/:topicId" element={<PracticePage />} /><Route path="/smart-practice" element={<SmartPracticePage />} /><Route path="/math-smart-practice" element={<MathSmartPracticePage />} /><Route path="/bookmarks" element={<BookmarksPage />} /><Route path="/mock-tests" element={<MockTestsPage />} /><Route path="/math-mock-test" element={<MathMockTestPage />} /><Route path="*" element={<Dashboard />} /></Routes></HashRouter>; }
