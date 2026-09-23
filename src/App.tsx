import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HashRouter, Link, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { allQuestions, allLessons, chapters, getLesson, getQuestionsBySubject, getQuestionsByTopic, getSubject, subjects, topics, jnvstExamQuestions } from './data';
import { getChapterStudyPages, getScienceChapterStudyPages } from './data/lessons/chapterStudy';
import ChapterStudyPage from './pages/ChapterStudyPage';
import MathFormulaSheet from './pages/MathFormulaSheetPage';
import { MathAwareText, MathText } from './components/MathText';
import { useProgressStore } from './store/progress';
import type { ContentBlock, ID, MockTestResult, Question } from './types';
import { buildJnvstMockPaper, buildMathMockPaper, buildScienceMockPaper, getChapterChallengerQuestions, getTopicChallengerQuestions, getPerformanceSummary, getRevisionTopics, getSmartPracticeQuestions, getMathSmartPracticeQuestions, getScienceSmartPracticeQuestions, getSmartRecommendations, getWeakTopics, getTopicPerformances, buildEnglishMockPaper, getEnglishSmartPracticeQuestions, buildHindiMockPaper, getHindiSmartPracticeQuestions, arrangeAssessmentOptions } from './utils/jnvstIntelligence';
import { mathMasteryUnits, mathMasteryUnitMap } from './data/mathMastery';
import { scienceMasteryUnits } from './data/sciencePrep';
import { scienceLessonCore } from './data/scienceLessonCore';
import { englishMasteryUnits, englishMasteryUnitMap } from './data/englishPrep';
import { hindiMasteryUnits } from './data/hindiPrep';
import { EnglishTranslationLabPage, EnglishVocabularyLabPage, EnglishTranslationPracticePage, EnglishVocabularyPracticePage } from './pages/EnglishLabsPage';
import EnglishUnseenPassagePage from './pages/EnglishUnseenPassagePage';
import HindiUnseenPassagePage from './pages/HindiUnseenPassagePage';

const examSections = [
  { id: 'sub_hin', title: 'हिंदी', questions: 15 },
  { id: 'sub_eng', title: 'अंग्रेज़ी', questions: 15 },
  { id: 'sub_math', title: 'गणित', questions: 35 },
  { id: 'sub_sci', title: 'विज्ञान', questions: 35 },
] as const;

const difficultyLabel: Record<Question['difficulty'], string> = { easy: 'आसान', medium: 'मध्यम', hard: 'कठिन', challenge: 'चैलेंज' };
const sameAnswer = (a: ID[], b: ID[]) => a.length === b.length && a.every((x) => b.includes(x));
const formatMockTime = (seconds: number) => String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
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
};const getScienceStudyPages = (blocks: ContentBlock[]): ContentBlock[][] => {
  const pages: ContentBlock[][] = [];
  let current: ContentBlock[] = [];
  for (const block of blocks) {
    const sectionStart = block.type === 'heading' && block.level === 2;
    if (sectionStart && current.length) {
      pages.push(current);
      current = [];
    }
    current.push(block);
  }
  if (current.length) pages.push(current);
  return pages.length ? pages : [blocks];
};

const getScienceSectionTitle = (blocks: ContentBlock[], index: number): string => {
  const heading = blocks.find((block) => block.type === 'heading' && block.level === 2);
  if (heading?.type === 'heading') {
    return heading.text.replace(/^(?:अध्ययन भाग\s+\d+\s*[—-]\s*|\d+\.\s*)/, '').trim();
  }
  return 'अध्ययन भाग ' + (index + 1);
};

const scienceStageMeta = [
  { label: 'समझें', hint: 'बड़ा विचार और अध्याय का संदर्भ' },
  { label: 'जोड़ें', hint: 'मुख्य अवधारणाएँ और शब्दावली' },
  { label: 'समझाएँ', hint: 'कैसे और क्यों — कारण से परिणाम तक' },
  { label: 'देखें', hint: 'उदाहरण, प्रयोग और रोज़मर्रा की सोच' },
  { label: 'परखें', hint: 'तुलना, भ्रम और JNVST फोकस' },
  { label: 'दोहराएँ', hint: '60-सेकंड recall और self-check' },
];


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

const TopicCard = ({ topicId }: { topicId: ID }) => {
  const t = topics.find(x => x.id === topicId)!;
  const qCount = getQuestionsByTopic(t.id).length;
  const chapter = chapters.find(x => x.id === t.chapterId);
  const isMath = t.id.startsWith('top_math_');
  const isHindi = t.id.startsWith('top_hin_');
  const chapterPages = chapter ? getChapterStudyPages(chapter, allLessons, 12).length : 12;
  return <Card className="topic-card">
    <div className="topic-top"><h3>{t.title}</h3><span className="count">{qCount} प्रश्न</span></div>
    <div className="topic-meta">
      <span>📖 अध्याय अध्ययन: {chapterPages} पृष्ठ</span>
      <span>{isMath || isHindi ? '🎯 अभ्यास + Challenger' : '⏱ विस्तृत पाठ'}</span>
    </div>
    <div className="actions">
      <Link className="btn primary" to={`/chapters/${t.chapterId}/study`}>अध्याय पढ़ें</Link>
      <Link className="btn" to={`/practice/${t.id}`}>अभ्यास करें</Link>
      {isHindi && <Link className="btn challenger" to={`/topics/${t.id}/challenger`}>⚡ Challenger · 20</Link>}
    </div>
  </Card>;
};

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

    <section className="math-challenger-map">
      <div className="math-mastery-head">
        <div>
          <span className="eyebrow">5 CHAPTERS • 20 QUESTIONS EACH</span>
          <h3>Math Challenger</h3>
          <p>हर chapter के लिए अलग 20-प्रश्न challenge set। पहले अध्याय पढ़ें, फिर अभ्यास और Challenger से अपनी पकड़ जाँचें।</p>
        </div>
      </div>
      <div className="math-challenger-grid">
        {chapters.filter((chapter) => chapter.subjectId === 'sub_math').sort((a, b) => a.order - b.order).map((chapter) => {
          const challengerCount = getChapterChallengerQuestions(chapter.id, 20).length;
          return <Card className="math-challenger-card" key={chapter.id}>
            <div className="math-challenger-card-top">
              <span className="math-unit-number">{String(chapter.order).padStart(2, '0')}</span>
              <div><span className="count">{challengerCount} प्रश्न</span><h4>{chapter.title}</h4></div>
            </div>
            <p>Concept → method → application को challenge level पर जाँचें।</p>
            <div className="actions">
              <Link className="btn" to={`/chapters/${chapter.id}/study`}>अध्याय पढ़ें</Link>
              <Link className="btn challenger" to={`/chapters/${chapter.id}/challenger`}>⚡ Challenger शुरू करें</Link>
            </div>
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
                <Link className="btn primary" to={`/practice/${unit.topicId}`}>प्रश्न हल करें</Link>
                <Link className="btn challenger" to={`/topics/${unit.topicId}/challenger`}>⚡ Challenger · 20</Link>
              </div>
            </div>
          </details>;
        })}
      </div>
    </section>
  </section>;
};


// Production build marker: source changes must flow through Rebuild and Publish Pages.
const EnglishSubjectOverview = () => {
  const p = useProgressStore();
  const performances = getTopicPerformances(p).filter((item) => item.subjectId === 'sub_eng');
  const attempts = performances.reduce((sum, item) => sum + item.attempts, 0);
  const correct = performances.reduce((sum, item) => sum + item.correct, 0);
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  const masteredUnits = englishMasteryUnits.filter((unit) => {
    const performance = performances.find((item) => item.topicId === unit.topicId);
    return Boolean(performance?.attempts && performance.accuracy >= 80);
  }).length;

  return <section className="english-hub">
    <div className="english-hub-hero">
      <div>
        <span className="eyebrow">JNVST ENGLISH • HINDI-FIRST MASTERY</span>
        <h2>अंग्रेज़ी तैयारी केंद्र</h2>
        <p>अंग्रेज़ी को शुरुआत से समझें: पहले आसान हिन्दी में concept, फिर English examples, guided practice, independent solving और अंत में JNVST-style timed practice.</p>
        <div className="actions">
          <Link className="btn primary" to="/english-revision">🧠 त्वरित पुनरावृत्ति</Link>
          <Link className="btn" to="/english-smart-practice">🎯 स्मार्ट English अभ्यास</Link>
          <Link className="btn" to="/english-mock-test">⏱ English Mock</Link>
          <Link className="btn challenger" to="/chapters/chap_eng_01/challenger">⚡ Challenger Mode</Link>
          <Link className="btn" to="/english-translation-lab">↔ Translation Lab</Link>
          <Link className="btn" to="/english-vocabulary-lab">📚 Vocabulary Lab</Link>
        </div>
      </div>
      <div className="english-hub-badge"><b>15</b><span>प्रश्न</span><small>English practice section</small></div>
    </div>

    <div className="english-source-strip">
      <div><span className="eyebrow">LEARNING METHOD</span><b>हिन्दी में समझें → English में सोचें → बिना मदद के solve करें</b><small>4 chapters · 10 skill units · 150 practice questions · adaptive practice</small></div>
      <Link className="btn" to="/english-revision">Mastery map →</Link>
    </div>

    <div className="english-stats">
      <Card><b>4</b><span>अध्याय</span></Card>
      <Card><b>10</b><span>Skill units</span></Card>
      <Card><b>{getQuestionsBySubject('sub_eng').length}</b><span>English अभ्यास प्रश्न</span></Card>
      <Card><b>{attempts ? accuracy + '%' : '—'}</b><span>आपकी सटीकता</span></Card>
    </div>

    <div className="english-hub-grid">
      <Card>
        <div className="topic-top"><div><h3>आपकी English progress</h3><p>{attempts ? attempts + ' प्रयास · ' + masteredUnits + ' units 80%+ accuracy पर' : 'अभी English के प्रयास दर्ज नहीं हैं।'}</p></div><span className="count">{attempts ? accuracy + '%' : 'शुरू करें'}</span></div>
        <div className="actions"><Link className="btn primary" to={attempts ? '/english-smart-practice' : '/practice/top_eng_01_01'}>{attempts ? 'स्मार्ट अभ्यास शुरू करें' : 'पहला topic शुरू करें'}</Link></div>
      </Card>
      <Card>
        <h3>Mastery का learning cycle</h3>
        <ol className="english-steps">
          <li><b>समझें</b> — rule और meaning हिन्दी में।</li>
          <li><b>देखें</b> — English example + हिन्दी अर्थ।</li>
          <li><b>Guided practice</b> — clues के साथ questions।</li>
          <li><b>Independent practice</b> — बिना answer hint के।</li>
          <li><b>Challenger</b> — कठिन JNVST-style application।</li>
          <li><b>Mock</b> — समयबद्ध English paper।</li>
        </ol>
      </Card>
    </div>

    <section className="english-learning-map">
      <div className="english-section-head">
        <span className="eyebrow">4 CHAPTERS • 10 SKILLS</span>
        <h3>English Chapters — सीखें, अभ्यास करें, master करें</h3>
        <p>हर chapter में हिन्दी-first explanation, English examples, practice और आगे बढ़ने का स्पष्ट रास्ता है।</p>
      </div>
      <div className="english-learning-grid">
        {chapters.filter((chapter) => chapter.subjectId === 'sub_eng').sort((a,b) => a.order-b.order).map((chapter) => {
          const chapterTopics = chapter.topicIds.map((id) => topics.find((topic) => topic.id === id)).filter(Boolean) as typeof topics;
          const questionCount = chapterTopics.reduce((sum, topic) => sum + getQuestionsByTopic(topic.id).length, 0);
          const chapterAttempts = chapterTopics.reduce((sum, topic) => sum + (performances.find((item) => item.topicId === topic.id)?.attempts ?? 0), 0);
          const chapterCorrect = chapterTopics.reduce((sum, topic) => sum + (performances.find((item) => item.topicId === topic.id)?.correct ?? 0), 0);
          const chapterAccuracy = chapterAttempts ? Math.round((chapterCorrect / chapterAttempts) * 100) : 0;
          const pageCount = getChapterStudyPages(chapter, allLessons, 12).length;
          const challengerCount = getChapterChallengerQuestions(chapter.id, 20).length;
          return <Card className="english-learning-card" key={chapter.id}>
            <div className="english-learning-card-top">
              <span className="english-unit-number">{String(chapter.order).padStart(2,'0')}</span>
              <div><span className="english-status">{chapterAttempts ? 'अभ्यास चल रहा' : 'शुरू नहीं'}</span><h4>{chapter.title}</h4><small>{questionCount} प्रश्न · {pageCount} अध्ययन पृष्ठ · {challengerCount} Challenger</small></div>
            </div>
            <p className="english-learning-focus">{chapterTopics.map((topic) => englishMasteryUnitMap.get(topic.id)?.hindiFocus).filter(Boolean).join(' ')}</p>
            <div className="english-learning-meta"><span>{chapterAttempts ? 'आपकी accuracy' : 'Topics'}</span><b>{chapterAttempts ? chapterAccuracy + '%' : chapterTopics.length}</b></div>
            <div className="english-progress"><span style={{width: (chapterAttempts ? chapterAccuracy : 0) + '%'}} /></div>
            <div className="actions">
              <Link className="btn primary" to={'/chapters/' + chapter.id + '/study'}>📖 अध्याय पढ़ें</Link>
              <Link className="btn" to={'/chapters/' + chapter.id}>Chapter map</Link>
              <Link className="btn challenger" to={'/chapters/' + chapter.id + '/challenger'}>⚡ Challenger</Link>
            </div>
          </Card>;
        })}
      </div>
    </section>

    <section className="english-mastery">
      <div className="english-section-head">
        <span className="eyebrow">10 SKILLS • TOPIC MASTERY CARDS</span>
        <h3>हर topic को अलग सीखें — revision list की तरह नहीं</h3>
        <p>हर card में उसी topic का concept, हिन्दी explanation, rules, examples, solving method और JNVST traps दिए गए हैं। पहले card पढ़ें, फिर उसी topic के questions लगाएँ।</p>
      </div>
      <div className="english-mastery-grid english-topic-card-grid">
        {englishMasteryUnits.map((unit, index) => {
          const performance = performances.find((item) => item.topicId === unit.topicId);
          const unitAccuracy = performance?.attempts ? performance.accuracy : 0;
          const chapterId = topics.find((topic) => topic.id === unit.topicId)?.chapterId ?? '';
          return <Card className="english-mastery-card english-topic-mastery-card" key={unit.topicId}>
            <div className="english-topic-card-head">
              <span className="english-unit-number">{String(index + 1).padStart(2,'0')}</span>
              <div><span className="english-topic-label">TOPIC {String(index + 1).padStart(2,'0')}</span><h4>{unit.title}</h4><small>{performance?.attempts ? `${performance.attempts} attempts · ${unitAccuracy}% accuracy` : 'अभी अभ्यास शुरू नहीं हुआ'}</small></div>
            </div>
            <div className="english-hindi-focus"><span>CONCEPT</span><b>पहले हिन्दी में समझें</b><p>{unit.hindiFocus}</p></div>
            <div className="english-topic-sections">
              <div><h5>क्या सीखना है</h5><ul>{unit.coreSkills.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h5>मुख्य नियम</h5><ul>{unit.mustKnow.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h5>उदाहरण</h5><ul>{unit.examples.map((item) => <li key={item}><InlineText text={item} /></li>)}</ul></div>
              <div><h5>कैसे हल करें</h5><ol>{unit.solveMethod.map((item) => <li key={item}>{item}</li>)}</ol></div>
              <div><h5>JNVST Trap Check</h5><ul>{unit.examTraps.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
            <div className="english-topic-facts"><span>Quick facts</span>{unit.quickFacts.map((fact) => <b key={fact}>{fact}</b>)}</div>
            <div className="english-topic-card-footer"><div className="english-topic-progress"><span style={{width: (performance?.attempts ? unitAccuracy : 0) + '%'}} /></div>
              <div className="actions"><Link className="btn primary" to={'/practice/' + unit.topicId}>🎯 इस topic का अभ्यास</Link><Link className="btn" to={'/chapters/' + chapterId + '/study'}>📖 पूरा concept</Link></div>
            </div>
          </Card>;
        })}
      </div>
    </section>
  </section>;
};
const HindiSubjectOverview = () => {
  const p = useProgressStore();
  const performances = getTopicPerformances(p).filter((item) => item.subjectId === 'sub_hin');
  const attempts = performances.reduce((sum, item) => sum + item.attempts, 0);
  const correct = performances.reduce((sum, item) => sum + item.correct, 0);
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  const masteredUnits = hindiMasteryUnits.filter((unit) => {
    const performance = performances.find((item) => item.topicId === unit.topicId);
    return Boolean(performance?.attempts && performance.accuracy >= 80);
  }).length;
  const questionCount = getQuestionsBySubject('sub_hin').length;

  return <section className="english-hub">
    <div className="english-hub-hero">
      <div>
        <span className="eyebrow">JNVST HINDI • COMPLETE PREPARATION CENTER</span>
        <h2>हिंदी तैयारी केंद्र</h2>
        <p>11 आधिकारिक इकाइयों को Hindi-first concept learning, examples, topic practice, Challenger, Smart Practice, revision, unseen comprehension और timed mock के साथ तैयार करें।</p>
        <div className="actions">
          <Link className="btn primary" to="/hindi-revision">🧠 त्वरित पुनरावृत्ति</Link>
          <Link className="btn" to="/hindi-smart-practice">🎯 स्मार्ट हिंदी अभ्यास</Link>
          <Link className="btn" to="/hindi-mock-test">⏱ हिंदी Mock</Link>
          <Link className="btn challenger" to="/chapters/chap_hin_01/challenger">⚡ Challenger Mode</Link>
          <Link className="btn" to="/hindi-unseen-passage">📖 अपठित बोध Lab</Link>
        </div>
      </div>
      <div className="english-hub-badge"><b>15</b><span>प्रश्न</span><small>JNVST Hindi section</small></div>
    </div>

    <div className="english-source-strip">
      <div><span className="eyebrow">LEARNING METHOD</span><b>समझें → उदाहरण देखें → अभ्यास करें → Challenger करें → Mock दें</b><small>6 chapters · 11 skill units · {questionCount} practice questions · 120 dedicated Challenger questions</small></div>
      <Link className="btn" to="/hindi-revision">Mastery map →</Link>
    </div>

    <div className="english-stats">
      <Card><b>6</b><span>अध्याय</span></Card>
      <Card><b>11</b><span>Skill units</span></Card>
      <Card><b>{questionCount}</b><span>हिंदी अभ्यास प्रश्न</span></Card>
      <Card><b>{attempts ? accuracy + '%' : '—'}</b><span>आपकी सटीकता</span></Card>
    </div>

    <div className="english-hub-grid">
      <Card>
        <div className="topic-top"><div><h3>आपकी हिंदी प्रगति</h3><p>{attempts ? attempts + ' प्रयास · ' + masteredUnits + ' units 80%+ accuracy पर' : 'अभी हिंदी के प्रयास दर्ज नहीं हैं।'}</p></div><span className="count">{attempts ? accuracy + '%' : 'शुरू करें'}</span></div>
        <div className="actions"><Link className="btn primary" to={attempts ? '/hindi-smart-practice' : '/practice/top_hin_01_01'}>{attempts ? 'स्मार्ट अभ्यास शुरू करें' : 'पहला topic शुरू करें'}</Link></div>
      </Card>
      <Card>
        <h3>Hindi Mastery Cycle</h3>
        <ol className="english-steps">
          <li><b>समझें</b> — नियम और भाषा-तर्क।</li>
          <li><b>उदाहरण</b> — सही/गलत रूप की तुलना।</li>
          <li><b>अभ्यास</b> — topic-level MCQs और correction।</li>
          <li><b>Challenger</b> — हर chapter में 20 कठिन प्रश्न।</li>
          <li><b>बोध Lab</b> — नए गद्यांश पर evidence-based solving।</li>
          <li><b>Mock</b> — 15-question timed Hindi paper।</li>
        </ol>
      </Card>
    </div>

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
        <p>18 अध्यायों को एक ही 12-पृष्ठ अध्ययन मार्ग में पढ़ें—concept से application और फिर JNVST-style recall तक। इसके बाद chapter practice और 35-प्रश्न Science mock से अपनी तैयारी जाँचें।</p>
        <div className="actions">
          <Link className="btn primary" to="/science-revision">🧠 त्वरित पुनरावृत्ति</Link>
          <Link className="btn" to="/science-smart-practice">🎯 स्मार्ट विज्ञान अभ्यास</Link>
          <Link className="btn" to="/science-mock-test">⏱ विज्ञान Mock</Link>
          <Link className="btn challenger" to="/chapters/chap_sci_01/challenger">⚡ CHALLENGER MODE</Link>
        </div>
      </div>
      <div className="science-hub-badge"><b>35</b><span>प्रश्न</span><small>JNVST विज्ञान</small></div>
    </div>

    <div className="science-source-strip">
      <div><span className="eyebrow">CONTENT BASIS</span><b>NCERT Class VIII Science + JNVST Class IX preparation</b><small>12-पृष्ठ अध्याय अध्ययन · {questionCount} अभ्यास प्रश्न · adaptive practice · 35-प्रश्न Science mock</small></div>
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
        <span className="eyebrow">18 अध्याय • NCERT क्रम • 20-प्रश्न Challenger</span>
        <h3>Science Chapters — सीधे अध्याय चुनें</h3>
        <p>अध्याय 01 से 18 तक क्रम में। हर card में पूरा अध्ययन और उसी chapter के प्रश्न तक सीधा रास्ता है।</p>
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
                const performance = performances.find((item) => item.topicId === unit.topicId);
          const attemptsForUnit = performance?.attempts ?? 0;
          const unitAccuracy = performance?.accuracy ?? 0;
          const mastered = Boolean(attemptsForUnit && unitAccuracy >= 80);
          const status = mastered ? 'मजबूत' : attemptsForUnit ? 'अभ्यास चल रहा' : 'शुरू नहीं';
          const questionCountForUnit = topic ? getQuestionsByTopic(topic.id).length : 0;
          const accuracyForUnit = attemptsForUnit ? unitAccuracy : 0;
          return <Card className="science-learning-card" key={unit.topicId}>
            <div className="science-learning-card-top">
              <span className="science-unit-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <span className={`science-status ${mastered ? 'mastered' : attemptsForUnit ? 'active' : 'new'}`}>{status}</span>
                <h4>{unit.title}</h4>
                <small>{questionCountForUnit} प्रश्न · 12 पृष्ठ · एकीकृत अध्ययन</small>
              </div>
            </div>
            <p className="science-learning-focus">{unit.coreSkills.slice(0, 2).join(' · ')}</p>
            <div className="science-learning-meta"><span>अभ्यास सटीकता</span><b>{attemptsForUnit ? unitAccuracy + '%' : '—'}</b></div>
            <div className="science-progress"><span style={{width: accuracyForUnit + '%'}} /></div>
            {attemptsForUnit > 0 && <div className="science-learning-accuracy">{attemptsForUnit} प्रश्न-प्रयास दर्ज हैं</div>}
            <div className="actions">
              <Link className="btn primary" to={`/chapters/${chapters.find((chapter) => chapter.subjectId === 'sub_sci' && chapter.topicIds.includes(unit.topicId))?.id ?? ''}/study`}>अध्याय अध्ययन</Link>
              <Link className="btn" to={`/practice/${unit.topicId}`}>अभ्यास करें</Link>
              <Link className="btn challenger" to={`/chapters/${chapters.find((chapter) => chapter.subjectId === 'sub_sci' && chapter.topicIds.includes(unit.topicId))?.id ?? ''}/challenger`}>⚡ Challenger · {(() => { const chapterId = chapters.find((chapter) => chapter.subjectId === 'sub_sci' && chapter.topicIds.includes(unit.topicId))?.id; return chapterId ? getChapterChallengerQuestions(chapterId, 20).length : 0; })()}</Link>
            </div>
          </Card>;
        })}
      </div>
    </section>

    <section className="science-study-system">
      <div className="science-section-head">
        <span className="eyebrow">HOW TO USE SCIENCE</span>
        <h3>हर अध्याय के लिए एक ही पढ़ाई का तरीका</h3>
        <p>अध्याय अध्ययन को मुख्य learning path रखें; फिर उसी अध्याय के questions, smart practice और mock से application मजबूत करें।</p>
      </div>
      <div className="science-study-system-grid">
        <div><span>01</span><b>अध्याय अध्ययन</b><p>12 पृष्ठों में concept, examples, comparison और self-check.</p></div>
        <div><span>02</span><b>Chapter Practice</b><p>उसी topic के प्रश्न लगाकर समझ को application में बदलें।</p></div>
        <div><span>03</span><b>Smart Practice</b><p>कमजोर और पिछली गलतियों पर दोबारा अभ्यास करें।</p></div>
        <div><span>04</span><b>Science Mock</b><p>35 प्रश्नों में पूरी Science readiness जाँचें।</p></div>
      </div>
    </section>
  </section>;
};

const HindiRevisionPage = () => (
  <Shell>
    <div className="science-revision-page">
      <div className="page-head"><Link to="/subjects/sub_hin">← हिंदी तैयारी केंद्र</Link><span className="eyebrow">HINDI • REVISION MAP</span><h1>हिंदी त्वरित पुनरावृत्ति</h1><p>11 official units के core rules, examples और JNVST traps को अंतिम revision में दोहराएँ।</p></div>
      <div className="science-revision-grid">
        {hindiMasteryUnits.map((unit, index) => <Card key={unit.topicId} className="science-revision-card">
          <div className="science-revision-head"><span className="science-unit-number">{String(index + 1).padStart(2,'0')}</span><div><h3>{unit.title}</h3><small>{unit.coreSkills.length} skills · {unit.quickFacts.length} quick facts</small></div></div>
          <h4>क्या याद रखें</h4><ul>{unit.quickFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          <h4>मुख्य नियम</h4><ul>{unit.mustKnow.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          <h4>JNVST Traps</h4><ul>{unit.examTraps.map((trap) => <li key={trap}>{trap}</li>)}</ul>
          <div className="actions"><Link className="btn" to={'/chapters/' + (topics.find((topic) => topic.id === unit.topicId)?.chapterId ?? '') + '/study'}>📖 पढ़ें</Link><Link className="btn primary" to={'/practice/' + unit.topicId}>🎯 अभ्यास</Link></div>
        </Card>)}
      </div>
    </div>
  </Shell>
);

const HindiSmartPracticePage = () => {
  const qs = useMemo(() => getHindiSmartPracticeQuestions(useProgressStore.getState(), 12, 'jnvst-hindi-smart-0'), []);
  return <AssessmentRunner
    questions={qs}
    title="🎯 स्मार्ट हिंदी अभ्यास"
    backTo="/subjects/sub_hin"
    backLabel="हिंदी तैयारी केंद्र"
    description="Weak, wrong और unseen Hindi questions को priority मिलेगी; 11 official Hindi units में breadth बनाए रखते हुए adaptive practice दी जाती है।"
    badge="HINDI SMART PRACTICE"
    bannerLink={{ to: "/hindi-mock-test", label: "15 प्रश्न का Hindi Mock →" }}
  />;
};

const HindiMockTestPage = () => {
  const [mockNumber, setMockNumber] = useState(0);
  const qs = useMemo(() => buildHindiMockPaper('jnvst-hindi-' + mockNumber + '-' + Date.now()), [mockNumber]);
  return <AssessmentRunner
    questions={qs}
    title="⏱ Hindi Mock Test"
    backTo="/subjects/sub_hin"
    backLabel="हिंदी तैयारी केंद्र"
    description="15-प्रश्न Hindi-only practice paper। पहले chapter learning और Smart Practice करें; फिर बिना मदद के समयबद्ध paper हल करें।"
    timerSeconds={25 * 60}
    badge="HINDI MOCK TEST"
    mode="mock-test"
    mockSubjectId="sub_hin"
    mockIdPrefix="hindi-mock-"
    bannerLink={{ to: "/hindi-smart-practice", label: "गलतियों पर Smart Practice →" }}
  />;
};
const EnglishRevisionPage = () => (
  <Shell>
    <div className="english-revision-page">
      <div className="page-head"><Link to="/subjects/sub_eng">← अंग्रेज़ी तैयारी केंद्र</Link><span className="eyebrow">ENGLISH REVISION • HINDI-FIRST</span><h1>अंग्रेज़ी त्वरित पुनरावृत्ति</h1><p>हर skill के core rules, quick recall और common exam traps को आखिरी revision में दोहराएँ।</p></div>
      <div className="english-revision-grid">
        {englishMasteryUnits.map((unit, index) => <Card className="english-revision-card" key={unit.topicId}>
          <div className="english-revision-head"><span className="english-unit-number">{String(index + 1).padStart(2,'0')}</span><div><h3>{unit.title}</h3><small>Hindi-first learning guide</small></div></div>
          <div className="english-hindi-focus"><b>पहले यह समझें</b><p>{unit.hindiFocus}</p></div>
          <h4>Quick Recall</h4><div className="english-chip-list">{unit.quickFacts.map((fact) => <span key={fact}>{fact}</span>)}</div>
          <h4>Exam Traps</h4><ul>{unit.examTraps.map((trap) => <li key={trap}>{trap}</li>)}</ul>
          <div className="actions"><Link className="btn" to={'/chapters/' + (topics.find((topic) => topic.id === unit.topicId)?.chapterId ?? '') + '/study'}>📖 पढ़ें</Link><Link className="btn primary" to={'/practice/' + unit.topicId}>🎯 अभ्यास</Link></div>
        </Card>)}
      </div>
    </div>
  </Shell>
);

const EnglishSmartPracticePage = () => {
  const qs = useMemo(() => getEnglishSmartPracticeQuestions(useProgressStore.getState(), 12, 'jnvst-english-smart-0'), []);
  return <AssessmentRunner
    questions={qs}
    title="🎯 स्मार्ट English अभ्यास"
    backTo="/subjects/sub_eng"
    backLabel="अंग्रेज़ी तैयारी केंद्र"
    description="Weak, wrong और unseen English questions को priority मिलेगी। पहले meaning समझें, फिर rule लागू करें और धीरे-धीरे independent solving की ओर जाएँ।"
    badge="ENGLISH SMART PRACTICE"
    bannerLink={{ to: "/english-mock-test", label: "15 प्रश्न का English Mock →" }}
  />;
};

const EnglishMockTestPage = () => {
  const [mockNumber, setMockNumber] = useState(0);
  const qs = useMemo(() => buildEnglishMockPaper('jnvst-english-' + mockNumber + '-' + Date.now()), [mockNumber]);
  return <AssessmentRunner
    questions={qs}
    title="⏱ English Mock Test"
    backTo="/subjects/sub_eng"
    backLabel="अंग्रेज़ी तैयारी केंद्र"
    description="15-प्रश्न English-only practice paper। पहले chapter learning और Smart Practice करें; फिर समयबद्ध paper में बिना सहायता के solve करने की कोशिश करें।"
    timerSeconds={25 * 60}
    badge="ENGLISH MOCK TEST"
    mode="mock-test"
    mockSubjectId="sub_eng"
    mockIdPrefix="english-mock-"
    bannerLink={{ to: "/english-smart-practice", label: "गलतियों पर Smart Practice →" }}
  />;
};
const ScienceRevisionPage = () => (
  <Shell>
    <div className="science-revision-page">
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
        <div className="actions"><Link className="btn" to={`/chapters/${topics.find((topic) => topic.id === unit.topicId)?.chapterId ?? ""}/study`}>अध्याय अध्ययन</Link><Link className="btn primary" to={`/practice/${unit.topicId}`}>अभ्यास</Link></div>
      </Card>)}
    </div>
    </div>
  </Shell>
);

const ScienceSmartPracticePage = () => {
  const qs = useMemo(() => getScienceSmartPracticeQuestions(useProgressStore.getState(), 12, 'jnvst-science-smart-0'), []);
  return <AssessmentRunner
    questions={qs}
    title="🎯 स्मार्ट विज्ञान अभ्यास"
    backTo="/subjects/sub_sci"
    backLabel="विज्ञान तैयारी केंद्र"
    description="केवल विज्ञान का adaptive timed set — weak, wrong और unseen questions को प्राथमिकता दी जाती है।"
    badge="SCIENCE SMART PRACTICE"
    bannerLink={{ to: "/science-mock-test", label: "35 प्रश्न का Science Mock →" }}
  />;
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
  const [markedForReview, setMarkedForReview] = useState<Set<ID>>(new Set());
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

  const toggleMarked = (questionId: ID) => {
    setMarkedForReview((current) => {
      const next = new Set(current);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
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
    const focusTopics = topicStats
      .filter((topic) => topic.count > 0)
      .sort((a, b) => (a.correct / a.count) - (b.correct / b.count) || a.correct - b.correct)
      .slice(0, 3);
    return <Shell>
      <div className="science-mock-page">
      <div className="page-head"><Link to="/subjects/sub_sci">← विज्ञान तैयारी केंद्र</Link><h1>विज्ञान Mock Test परिणाम</h1><p>यह 35-प्रश्न Science-only practice test था। परिणाम आपकी progress में सुरक्षित है।</p></div>
      <section className="science-result-hero"><span>आपका स्कोर</span><strong>{score} / {qs.length}</strong><b>{Math.round((score/qs.length)*100)}% accuracy</b></section>
      <div className="science-result-grid"><Card><b>{answeredCount}</b><span>attempted</span></Card><Card><b>{qs.length-answeredCount}</b><span>unanswered</span></Card><Card><b>{markedForReview.size}</b><span>review marked</span></Card><Card><b>{Math.round((score/qs.length)*100)}%</b><span>accuracy</span></Card></div>
      <Card className="science-focus-card"><div className="science-section-head"><span className="eyebrow">NEXT REVISION</span><h2>अब किन अध्यायों पर लौटें?</h2><p>यह आपकी test performance के आधार पर revision सहायता है, कोई official cutoff नहीं।</p></div><div className="science-focus-grid">{focusTopics.map((topic) => <div className="science-focus-item" key={topic.id}><div><span>{String(topic.order).padStart(2,'0')}</span><b>{topic.title}</b></div><strong>{Math.round((topic.correct/topic.count)*100)}%</strong><div className="actions"><Link className="btn" to={'/chapters/' + topic.chapterId + '/study'}>फिर पढ़ें</Link><Link className="btn primary" to={'/practice/' + topic.id}>प्रश्न</Link></div></div>)}</div></Card>
      <Card><div className="science-section-head"><h2>इकाई-वार प्रदर्शन</h2><p>सभी 18 Science units से कम-से-कम 1 प्रश्न इस paper में है; बाकी प्रश्न seeded variety के लिए चुने जाते हैं।</p></div>
        <div className="science-result-topics">{topicStats.map((topic) => <div className="science-result-topic" key={topic.id}><div><b>{topic.title}</b><span>{topic.correct} / {topic.count} सही</span></div><span>{topic.count ? Math.round((topic.correct/topic.count)*100) + '%' : '—'}</span></div>)}</div>
      </Card>
      <AssessmentAnswerReview questions={qs} answers={answers} />
      <div className="actions"><button className="btn primary" onClick={() => {answersRef.current={};setMockNumber((n)=>n+1);setStarted(false);setFinished(false);setIndex(0);setAnswers({});setMarkedForReview(new Set());setTimeLeft(50*60);}}>नया विज्ञान Mock</button><Link className="btn" to="/science-smart-practice">गलतियों पर Smart Practice</Link><Link className="btn" to="/science-revision">त्वरित पुनरावृत्ति</Link></div>
      </div>
    </Shell>;
  }

  return <Shell>
    <div className="science-mock-page">
    <div className="page-head"><Link to="/subjects/sub_sci">← विज्ञान तैयारी केंद्र</Link><h1>⏱ विज्ञान Mock Test</h1><p>35 प्रश्न · 35 अंक · केवल विज्ञान · सभी 18 units की कम-से-कम 1-question coverage</p>{!started && <div className="actions"><button className="btn primary" onClick={() => {answersRef.current={};setAnswers({});setTimeLeft(50*60);setStarted(true);}}>टेस्ट शुरू करें</button></div>}</div>
    {!started ? <Card className="science-mock-intro"><h2>टेस्ट से पहले</h2><div className="pattern"><div><b>35</b><span>प्रश्न</span></div><div><b>35</b><span>अंक</span></div><div><b>50 min</b><span>recommended practice time</span></div><div><b>18</b><span>इकाइयाँ</span></div><div><b>1+</b><span>प्रश्न/इकाई</span></div><div><b>4</b><span>विकल्प/प्रश्न</span></div></div><ul><li>यह Science-only practice mock है; यह आधिकारिक अलग Science परीक्षा-समय नहीं है।</li><li>हर प्रश्न चार विकल्प और एक सही उत्तर वाले MCQ pool से आता है।</li><li>Paper में 18 chapters की coverage और project-level difficulty balance रखा जाता है; यह कोई official chapter-wise distribution नहीं है।</li><li>Question navigator से किसी भी प्रश्न पर जा सकते हैं; खाली प्रश्न बाद में कर सकते हैं।</li><li>50 मिनट recommended practice limit है; पूरा JNVST Selection Test आधिकारिक रूप से 150 मिनट का है।</li></ul></Card>
    : q && <div className="science-mock-layout"><Card className="question-card"><div className="progressline"><span>प्रश्न {index+1} / {qs.length}</span><span>{topics.find((topic) => topic.id === q.topicId)?.title ?? 'विज्ञान'} · {difficultyLabel[q.difficulty]}</span><span>{markedForReview.size} review</span><span className={timeLeft<=300 ? 'mock-timer danger' : 'mock-timer'}>⏱ {formatTime(timeLeft)}</span></div><div className="question-text">{questionTextBlocks(q).map((b,idx)=><ContentRenderer key={idx} blocks={[b]} />)}</div><div className="options">{q.options.map((o)=><button key={o.id} className={'option ' + (answers[q.id]?.includes(o.id) ? 'selected' : '')} onClick={()=>choose(o.id)}><InlineText text={o.text}/></button>)}</div><div className="science-mock-actions"><button className={'btn ' + (markedForReview.has(q.id) ? 'review-active' : '')} onClick={()=>toggleMarked(q.id)}>{markedForReview.has(q.id) ? '★ Review में चिन्हित' : '☆ Review के लिए रखें'}</button><div className="science-mock-nav-actions"><button className="btn" disabled={index===0} onClick={()=>setIndex(x=>x-1)}>← पिछला</button>{index===qs.length-1?<button className="btn primary" onClick={finish}>टेस्ट जमा करें</button>:<button className="btn primary" onClick={()=>setIndex(x=>x+1)}>अगला प्रश्न →</button>}</div></div></Card>
      <Card className="science-mock-palette"><h3>Question Navigator</h3><p>{answeredCount} / {qs.length} answered</p><div className="science-palette-legend"><span>● answered</span><span>★ review</span><span>○ unanswered</span></div><div className="science-palette-grid">{qs.map((question,qi)=><button key={question.id} className={(answers[question.id]?.length ? 'answered ' : '') + (markedForReview.has(question.id) ? 'marked ' : '') + (qi===index ? 'current' : '')} onClick={()=>setIndex(qi)}>{markedForReview.has(question.id) ? '★' : qi+1}</button>)}</div></Card></div>}
    </div>
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
    {s.id === 'sub_eng' && <EnglishSubjectOverview />}
    {s.id === 'sub_hin' && <HindiSubjectOverview />}
    {s.id !== 'sub_sci' && s.id !== 'sub_math' && s.id !== 'sub_eng' && cs.map(c => <Card key={c.id} className="chapter-section"><div className="chapter-section-head"><Link className="chapter-link" to={`/chapters/${c.id}`}><h2>{c.title} →</h2></Link><Link className="btn challenger" to={`/chapters/${c.id}/challenger`}>⚡ Challenger · {getChapterChallengerQuestions(c.id, 20).length}</Link></div><div className="grid">{c.topicIds.map(id => <TopicCard key={id} topicId={id} />)}</div></Card>)}
  </Shell>;
};

const ChapterPage = () => {
  const { chapterId } = useParams();
  const c = chapters.find(x => x.id === chapterId);
  const s = c ? getSubject(c.subjectId) : undefined;
  const p = useProgressStore();
  if (!c || !s) return <Shell><Card className="empty"><h1>अध्याय नहीं मिला</h1></Card></Shell>;

  if (c.subjectId === 'sub_sci') {
    const topic = topics.find((item) => item.id === c.topicIds[0]);
    const mastery = topic ? scienceMasteryUnits.find((unit) => unit.topicId === topic.id) : undefined;
    const lessonId = topic?.lessonIds[0];
    const questionCountForChapter = topic ? getQuestionsByTopic(topic.id).length : 0;
    const performance = topic ? getTopicPerformances(p).find((item) => item.topicId === topic.id) : undefined;
    const accuracyForChapter = performance?.accuracy ?? 0;
    const previous = chapters.find((item) => item.subjectId === 'sub_sci' && item.order === c.order - 1);
    const next = chapters.find((item) => item.subjectId === 'sub_sci' && item.order === c.order + 1);
    const pageCount = getScienceChapterStudyPages(c).length;
    const contentBlockCount = scienceLessonCore[topic?.id ?? '']?.length ?? 0;

    return <Shell>
      <section className="science-chapter-shell">
        <div className="science-chapter-topbar">
          <Link to="/subjects/sub_sci">← विज्ञान तैयारी केंद्र</Link>
          <span>अध्याय {String(c.order).padStart(2, '0')} / 18</span>
        </div>

        <div className="science-chapter-hero">
          <div>
            <span className="eyebrow">SCIENCE CHAPTER • NCERT CLASS VIII • JNVST PREPARATION</span>
            <h1>{c.title}</h1>
            <p>{mastery?.coreSkills.slice(0, 3).join(' · ') ?? 'इस अध्याय के मुख्य Science concepts और अभ्यास।'}</p>
            <div className="actions">
              <Link className="btn primary" to={`/chapters/${c.id}/study`}>📖 अध्याय अध्ययन शुरू करें</Link>
              <Link className="btn" to={`/practice/${topic?.id ?? ''}`}>🎯 {questionCountForChapter} प्रश्न हल करें</Link>
              <Link className="btn challenger" to={`/chapters/${c.id}/challenger`}>⚡ Challenger Questions · {getChapterChallengerQuestions(c.id, 20).length}</Link>
            </div>
          </div>
          <div className="science-chapter-index">
            <span>CHAPTER</span>
            <strong>{String(c.order).padStart(2, '0')}</strong>
            <small>{pageCount ? pageCount + ' अध्ययन पृष्ठ · ' + contentBlockCount + ' learning blocks' : 'learning content'}</small>
          </div>
        </div>

        <div className="science-chapter-stats">
          <Card><b>{questionCountForChapter}</b><span>अभ्यास प्रश्न</span></Card>
          <Card><b>{pageCount || '—'}</b><span>अध्ययन पृष्ठ</span></Card>
          <Card><b>{performance?.attempts ?? 0}</b><span>आपके प्रयास</span></Card>
          <Card><b>{performance?.attempts ? accuracyForChapter + '%' : '—'}</b><span>आपकी सटीकता</span></Card>
        </div>

        <div className="science-chapter-content-grid">
          <Card>
            <span className="science-panel-label">WHAT YOU WILL LEARN</span>
            <h3>मुख्य कौशल</h3>
            <div className="science-chapter-skills">
              {(mastery?.coreSkills ?? []).map((item) => <span key={item}>{item}</span>)}
            </div>
            <h3>Must Know</h3>
            <ul>{(mastery?.mustKnow ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
          </Card>

          <Card>
            <span className="science-panel-label">EXAM FOCUS</span>
            <h3>Quick Recall</h3>
            <ul>{(mastery?.quickFacts ?? []).slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
            <h3>Exam Traps</h3>
            <ul>{(mastery?.examTraps ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
          </Card>
        </div>

        <div className="science-chapter-footer">
          <div>
            {previous ? <Link className="science-chapter-nav" to={`/chapters/${previous.id}`}>← अध्याय {String(previous.order).padStart(2, '0')} · {previous.title}</Link> : <span />}
          </div>
          <div>
            {next ? <Link className="science-chapter-nav next" to={`/chapters/${next.id}`}>अध्याय {String(next.order).padStart(2, '0')} · {next.title} →</Link> : <span />}
          </div>
        </div>
      </section>
    </Shell>;
  }

  if (c.subjectId === 'sub_eng') {
    const chapterTopics = c.topicIds.map((id) => topics.find((topic) => topic.id === id)).filter(Boolean) as typeof topics;
    const performances = getTopicPerformances(p);
    const questionCount = chapterTopics.reduce((sum, topic) => sum + getQuestionsByTopic(topic.id).length, 0);
    const attempts = chapterTopics.reduce((sum, topic) => sum + (performances.find((item) => item.topicId === topic.id)?.attempts ?? 0), 0);
    const correct = chapterTopics.reduce((sum, topic) => sum + (performances.find((item) => item.topicId === topic.id)?.correct ?? 0), 0);
    const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
    const pageCount = getChapterStudyPages(c, allLessons, 12).length;
    const challengerCount = getChapterChallengerQuestions(c.id, 20).length;
    const previous = chapters.find((item) => item.subjectId === 'sub_eng' && item.order === c.order - 1);
    const next = chapters.find((item) => item.subjectId === 'sub_eng' && item.order === c.order + 1);

    return <Shell>
      <section className="english-chapter-page">
        <div className="english-chapter-topbar"><Link to="/subjects/sub_eng">← अंग्रेज़ी तैयारी केंद्र</Link><span>अध्याय {String(c.order).padStart(2, '0')} / 4</span></div>
        <div className="english-chapter-hero">
          <div>
            <span className="eyebrow">ENGLISH CHAPTER • HINDI-FIRST LEARNING</span>
            <h1>{c.title}</h1>
            <p>{chapterTopics.map((topic) => englishMasteryUnitMap.get(topic.id)?.hindiFocus).filter(Boolean).join(' ')}</p>
            <div className="actions">
              <Link className="btn primary" to={'/chapters/' + c.id + '/study'}>📖 अध्याय पढ़ें</Link>
              <Link className="btn" to={'/practice/' + (chapterTopics[0]?.id ?? '')}>🎯 अभ्यास करें</Link>
              <Link className="btn challenger" to={'/chapters/' + c.id + '/challenger'}>⚡ Challenger · {challengerCount}</Link>
            </div>
          </div>
          <div className="english-chapter-index"><span>CHAPTER</span><strong>{String(c.order).padStart(2, '0')}</strong><small>{pageCount} अध्ययन पृष्ठ</small></div>
        </div>

        <div className="english-chapter-stats">
          <Card><b>{questionCount}</b><span>अभ्यास प्रश्न</span></Card>
          <Card><b>{pageCount}</b><span>अध्ययन पृष्ठ</span></Card>
          <Card><b>{attempts}</b><span>आपके प्रयास</span></Card>
          <Card><b>{attempts ? accuracy + '%' : '—'}</b><span>आपकी सटीकता</span></Card>
        </div>

        <div className="english-chapter-focus-grid">
          <Card><span className="science-panel-label">HINDI-FIRST METHOD</span><h3>कैसे पढ़ें</h3><ul className="english-chapter-list"><li>पहले हिन्दी में concept समझें।</li><li>English example को पढ़ें और उसका अर्थ जोड़ें।</li><li>फिर उसी rule को बिना मदद के नए sentence पर लगाएँ।</li></ul></Card>
          <Card><span className="science-panel-label">EXAM FOCUS</span><h3>क्या याद रखें</h3><ul className="english-chapter-list">{chapterTopics.flatMap((topic) => englishMasteryUnitMap.get(topic.id)?.quickFacts.slice(0, 2) ?? []).slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul></Card>
          <Card><span className="science-panel-label">COMMON TRAPS</span><h3>गलती से बचें</h3><ul className="english-chapter-list">{chapterTopics.flatMap((topic) => englishMasteryUnitMap.get(topic.id)?.examTraps.slice(0, 2) ?? []).slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul></Card>
        </div>

        <section className="english-chapter-topics">
          <div className="english-section-head"><span className="eyebrow">TOPIC-BY-TOPIC PRACTICE</span><h2>Topics</h2><p>हर topic को पहले समझें, फिर practice करें।</p></div>
          <div className="english-chapter-topic-grid">
            {chapterTopics.map((topic) => {
              const mastery = englishMasteryUnitMap.get(topic.id);
              const performance = performances.find((item) => item.topicId === topic.id);
              return <Card className="english-chapter-topic" key={topic.id}>
                <div className="english-chapter-topic-top"><span>{String(topic.order).padStart(2, '0')}</span><div><h3>{topic.title}</h3><small>{getQuestionsByTopic(topic.id).length} प्रश्न · {performance?.attempts ? performance.accuracy + '% accuracy' : 'अभी अभ्यास नहीं'}</small></div></div>
                <p>{mastery?.hindiFocus ?? 'पहले concept समझें और फिर practice करें।'}</p>
                <div className="actions"><Link className="btn primary" to={'/chapters/' + c.id + '/study'}>📖 पढ़ें</Link><Link className="btn" to={'/practice/' + topic.id}>🎯 अभ्यास</Link></div>
              </Card>;
            })}
          </div>
        </section>

        <section className="english-chapter-challenger">
          <div><span className="eyebrow">20-QUESTION CHALLENGER</span><h2>English Challenger</h2><p>Chapter के concept को कठिन, mixed और exam-style questions में apply करें। पहले study path पूरा करना recommended है।</p></div>
          <Link className="btn challenger" to={'/chapters/' + c.id + '/challenger'}>⚡ Challenger शुरू करें</Link>
        </section>

        <div className="english-chapter-footer">
          {previous ? <Link className="english-chapter-nav" to={'/chapters/' + previous.id}>← {String(previous.order).padStart(2,'0')} · {previous.title}</Link> : <span/>}
          {next ? <Link className="english-chapter-nav next" to={'/chapters/' + next.id}>{String(next.order).padStart(2,'0')} · {next.title} →</Link> : <span/>}
        </div>
      </section>
    </Shell>;
  }
  if (c.subjectId === 'sub_math') {
    const chapterTopics = c.topicIds.map((id) => topics.find((topic) => topic.id === id)).filter(Boolean) as typeof topics;
    const masteryUnits = chapterTopics.map((topic) => mathMasteryUnitMap.get(topic.id)).filter(Boolean) as typeof mathMasteryUnits;
    const questionCountForChapter = chapterTopics.reduce((sum, topic) => sum + getQuestionsByTopic(topic.id).length, 0);
    const performances = getTopicPerformances(p);
    const chapterPerformance = chapterTopics.map((topic) => performances.find((item) => item.topicId === topic.id)).filter(Boolean);
    const attemptsForChapter = chapterPerformance.reduce((sum, item) => sum + (item?.attempts ?? 0), 0);
    const correctForChapter = chapterPerformance.reduce((sum, item) => sum + (item?.correct ?? 0), 0);
    const accuracyForChapter = attemptsForChapter ? Math.round((correctForChapter / attemptsForChapter) * 100) : 0;
    const pageCount = getChapterStudyPages(c, allLessons, 12).length;
    const challengerCount = getChapterChallengerQuestions(c.id, 20).length;
    const previous = chapters.find((item) => item.subjectId === 'sub_math' && item.order === c.order - 1);
    const next = chapters.find((item) => item.subjectId === 'sub_math' && item.order === c.order + 1);

    return <Shell>
      <section className="math-chapter-page">
        <div className="math-chapter-topbar">
          <Link to="/subjects/sub_math">← गणित तैयारी केंद्र</Link>
          <span>अध्याय {String(c.order).padStart(2, '0')} / 5</span>
        </div>
        <div className="math-chapter-hero">
          <div>
            <span className="eyebrow">MATHEMATICS • JNVST CHAPTER</span>
            <h1>{c.title}</h1>
            <p>{masteryUnits.slice(0, 2).map((unit) => unit?.coreSkills.slice(0, 2).join(' · ')).join(' · ') || 'इस अध्याय के मुख्य concepts, methods और JNVST अभ्यास।'}</p>
            <div className="actions">
              <Link className="btn primary" to={`/chapters/${c.id}/study`}>📖 अध्याय पढ़ें</Link>
              <a className="btn" href="#math-chapter-practice">🎯 अभ्यास करें</a>
              <Link className="btn challenger" to={`/chapters/${c.id}/challenger`}>⚡ Challenger · {challengerCount}</Link>
            </div>
          </div>
          <div className="math-chapter-index"><span>CHAPTER</span><strong>{String(c.order).padStart(2, '0')}</strong><small>{pageCount} अध्ययन पृष्ठ · {chapterTopics.length} इकाइयाँ</small></div>
        </div>
        <div className="math-chapter-stats">
          <Card><b>{questionCountForChapter}</b><span>अभ्यास प्रश्न</span></Card>
          <Card><b>{pageCount}</b><span>अध्ययन पृष्ठ</span></Card>
          <Card><b>{attemptsForChapter}</b><span>आपके प्रयास</span></Card>
          <Card><b>{attemptsForChapter ? accuracyForChapter + '%' : '—'}</b><span>आपकी सटीकता</span></Card>
        </div>
        <div className="math-chapter-focus-grid">
          <Card><span className="science-panel-label">CHAPTER FOCUS</span><h3>मुख्य skills</h3><div className="math-chapter-chip-list">{masteryUnits.flatMap((unit) => unit?.coreSkills.slice(0, 3) ?? []).map((item) => <span key={item}>{item}</span>)}</div></Card>
          <Card><span className="science-panel-label">FORMULA + TRAPS</span><h3>याद रखने योग्य</h3><ul className="math-chapter-list">{masteryUnits.flatMap((unit) => unit?.mustKnow.slice(0, 2) ?? []).slice(0, 4).map((item) => <li key={item}><InlineText text={item} /></li>)}</ul></Card>
          <Card><span className="science-panel-label">EXAM TRAPS</span><h3>गलती से बचें</h3><ul className="math-chapter-list">{masteryUnits.flatMap((unit) => unit?.examTraps.slice(0, 2) ?? []).slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul></Card>
        </div>
        <section id="math-chapter-practice" className="math-chapter-practice">
          <div className="math-chapter-section-head"><div><span className="eyebrow">PRACTICE BY UNIT</span><h2>अभ्यास</h2><p>हर इकाई के प्रश्न अलग से हल करें; performance उसी topic पर दर्ज होगी।</p></div></div>
          <div className="math-practice-grid">
            {chapterTopics.map((topic) => <Card className="math-practice-card" key={topic.id}><div className="math-practice-card-top"><span>{String(topic.order).padStart(2, '0')}</span><b>{getQuestionsByTopic(topic.id).length} प्रश्न</b></div><h3>{topic.title}</h3><p>{mathMasteryUnitMap.get(topic.id)?.coreSkills.slice(0, 2).join(' · ') || 'इस इकाई के JNVST अभ्यास प्रश्न।'}</p><div className="actions"><Link className="btn primary" to={`/practice/${topic.id}`}>अभ्यास शुरू करें →</Link><Link className="btn challenger" to={`/topics/${topic.id}/challenger`}>⚡ Challenger · 20</Link></div></Card>)}
          </div>
        </section>
        <section className="math-chapter-challenger">
          <div><span className="eyebrow">20-QUESTION CHALLENGER</span><h2>Challenger Mode</h2><p>{challengerCount} प्रश्नों का कठिन chapter set — चार विकल्प, varied answer positions और review सहित। पहले अध्याय अध्ययन कर लेना recommended है।</p></div>
          <Link className="btn challenger" to={`/chapters/${c.id}/challenger`}>⚡ Challenger शुरू करें</Link>
        </section>
        <div className="math-chapter-footer">
          {previous ? <Link className="math-chapter-nav" to={`/chapters/${previous.id}`}>← {String(previous.order).padStart(2, '0')} · {previous.title}</Link> : <span/>}
          {next ? <Link className="math-chapter-nav next" to={`/chapters/${next.id}`}>{String(next.order).padStart(2, '0')} · {next.title} →</Link> : <span/>}
        </div>
      </section>
    </Shell>;
  }
  const pageCount = getChapterStudyPages(c, allLessons, 12).length;
  return <Shell><div className="page-head"><Link to={`/subjects/${s.id}`}>← {s.title}</Link><h1>{c.title}</h1><p>{pageCount} पृष्ठ का अध्याय अध्ययन पाठ उपलब्ध है।</p><div className="actions"><Link className="btn primary" to={`/chapters/${c.id}/study`}>📖 अध्याय पढ़ें · {pageCount}+ पृष्ठ</Link><Link className="btn challenger" to={`/chapters/${c.id}/challenger`}>⚡ Challenger Questions · {getChapterChallengerQuestions(c.id, 20).length}</Link></div></div><div className="grid">{c.topicIds.map(id => <TopicCard key={id} topicId={id} />)}</div></Shell>;
};

const LessonPage = () => {
  const { lessonId } = useParams();
  const l = getLesson(lessonId || '');
  const p = useProgressStore();
  const isScience = l?.topicId.startsWith('top_sci_') ?? false;
  const isMath = l?.topicId.startsWith('top_math_') ?? false;
  const pages = useMemo(() => l ? (isScience ? getScienceStudyPages(l.content) : getStudyPages(l.content)) : [], [l, isScience]);
  const [page, setPage] = useState(0);
  const lessonTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage(0);
    window.requestAnimationFrame(() => {
      lessonTopRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }, [lessonId]);

  const goToScienceSection = (sectionIndex: number) => {
    setPage(sectionIndex);
    window.requestAnimationFrame(() => {
      lessonTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  if (!l) return <Shell><Card className="empty"><h1>पाठ नहीं मिला</h1></Card></Shell>;

  const t = topics.find((x) => x.id === l.topicId);
  const c = t ? chapters.find((x) => x.id === t.chapterId) : undefined;
  if ((isScience || isMath) && c) return <Navigate to={"/chapters/" + c.id + "/study"} replace />;

  const done = p.lessonActivity[l.id]?.status === 'completed';
  const mastery = isScience ? scienceMasteryUnits.find((unit) => unit.topicId === l.topicId) : undefined;
  const scienceChapter = isScience ? c : undefined;
  const scienceSections = isScience ? pages.map((blocks, index) => getScienceSectionTitle(blocks, index)) : [];
  const progressPercent = ((page + 1) / Math.max(1, pages.length)) * 100;

  return <Shell>
    <div className="page-head">
      <Link to={isScience ? '/subjects/sub_sci' : (c ? `/chapters/${c.id}` : '/subjects')}>← {isScience ? 'विज्ञान तैयारी केंद्र' : 'अध्याय'}</Link>
      {isScience && <span className="eyebrow">SCIENCE • NCERT-ALIGNED SELF-LEARNING</span>}
      <h1>{l.title}</h1>
      <div className="lesson-meta">
        <span>⏱ {l.estimatedMinutes} मिनट</span>
        {isScience && scienceChapter
          ? <span>अध्याय {String(scienceChapter.order).padStart(2, '0')} / 18</span>
          : <span>{pages.length} अध्ययन पृष्ठ</span>}
        {isScience && <span>12-पृष्ठ अध्याय अध्ययन</span>}
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

    {isScience && <nav className="science-lesson-outline" aria-label="पाठ के अध्ययन भाग">
      <div className="science-outline-head">
        <span className="science-panel-label">LESSON MAP</span>
        <b>{scienceChapter?.title ?? l.title}</b>
        <small>हर भाग का उद्देश्य और क्रम स्पष्ट है</small>
      </div>
      <div className="science-outline-list">
        {scienceSections.map((title, i) => <button key={title + i} className={i === page ? 'active' : ''} aria-current={i === page ? 'step' : undefined} onClick={() => goToScienceSection(i)}>
          <span>{String(i + 1).padStart(2, '0')} · {scienceStageMeta[i]?.label ?? 'चरण'}</span><b>{title}</b><small>{scienceStageMeta[i]?.hint ?? 'अध्ययन का अगला चरण'}</small>
        </button>)}
      </div>
    </nav>}

    <Card className="lesson-card" >
      <div className="study-reader" ref={lessonTopRef}>
        <div className="study-reader-head">
          <div><b>{isScience ? (scienceStageMeta[page]?.label ?? 'Science Study') : 'टॉपिक-पाठ'}</b><span>{isScience ? 'चरण ' + (page + 1) + ' / ' + pages.length : 'पृष्ठ ' + (page + 1) + ' / ' + pages.length}</span></div>
          <div className="study-progress"><span style={{width: progressPercent + '%'}} /></div>
        </div>
        {!isScience && <div className="study-page-nav" aria-label="अध्ययन पृष्ठ">
          {pages.map((_, i) => <button key={i} className={i === page ? 'active' : ''} aria-current={i === page ? 'page' : undefined} aria-label={`पृष्ठ ${i + 1}`} onClick={() => setPage(i)}>{i + 1}</button>)}
        </div>}
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


const AssessmentAnswerReview = ({ questions, answers, englishMode = false }: { questions: Question[]; answers: Record<string, ID[]>; englishMode?: boolean }) => (
  <Card className="assessment-answer-review">
    <div className="assessment-section-head">
      <span className="eyebrow">ANSWER REVIEW</span>
      <h2>उत्तर और समाधान</h2>
      <p>टेस्ट पूरा होने के बाद अब हर प्रश्न का सही उत्तर और आपकी response स्थिति देखें।</p>
    </div>
    <div className="assessment-review-list">
      {questions.map((question, questionIndex) => {
        const selected = answers[question.id] || [];
        const isCorrect = sameAnswer(selected, question.correctOptionIds);
        const correctLabels = question.correctOptionIds.map((id) => question.options.find((option) => option.id === id)?.text ?? id);
        const selectedLabels = selected.map((id) => question.options.find((option) => option.id === id)?.text ?? id);
        return (
          <details className={'assessment-review-item ' + (isCorrect ? 'correct' : 'wrong')} key={question.id} open={!isCorrect}>
            <summary>
              <span className="assessment-review-index">{questionIndex + 1}</span>
              <span className="assessment-review-question">{question.textPlain ?? questionTextBlocks(question).map((block) => block.type === 'paragraph' ? block.text : '').join(' ')}</span>
              <b>{isCorrect ? 'सही' : selected.length ? 'गलत' : 'छूटा'}</b>
            </summary>
            <div className="assessment-review-body">
              <div className="assessment-review-answer"><b>सही उत्तर</b><span>{correctLabels.join(' · ')}</span></div>
              <div className="assessment-review-answer"><b>आपका उत्तर</b><span>{selectedLabels.length ? selectedLabels.join(' · ') : 'उत्तर नहीं दिया'}</span></div>
              {englishMode && englishMasteryUnitMap.get(question.topicId) && (
                <aside className="english-review-hint">
                  <strong>हिन्दी में समझें</strong>
                  <p>{englishMasteryUnitMap.get(question.topicId)?.hindiFocus}</p>
                </aside>
              )}
              {questionExplanationBlocks(question).map((block, index) => <ContentRenderer key={index} blocks={[block]} />)}
            </div>
          </details>
        );
      })}
    </div>
  </Card>
);

type AssessmentRunnerProps = {
  questions: Question[];
  title: string;
  backTo: string;
  backLabel: string;
  description: string;
  timerSeconds?: number;
  badge?: string;
  bannerLink?: { to: string; label: string };
  emptyTitle?: string;
  emptyText?: string;
  mode?: 'practice' | 'mock-test';
  preserveOptionOrder?: boolean;
  mockSubjectId?: ID;
  mockIdPrefix?: string;
};

const AssessmentRunner = ({
  questions,
  title,
  backTo,
  backLabel,
  description,
  timerSeconds,
  badge = 'TIMED PRACTICE',
  bannerLink,
  emptyTitle = 'अभी प्रश्न उपलब्ध नहीं हैं',
  emptyText = 'इस अभ्यास के लिए प्रश्न उपलब्ध नहीं हैं।',
  mode = 'practice',
  preserveOptionOrder = false,
  mockSubjectId,
  mockIdPrefix,
}: AssessmentRunnerProps) => {
  const p = useProgressStore();
  const initialTime = timerSeconds ?? Math.max(5 * 60, questions.length * 60);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ID[]>>({});
  const answersRef = useRef<Record<string, ID[]>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<ID>>(new Set());
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [resultStartedAt, setResultStartedAt] = useState<number | null>(null);

  const isScienceAssessment = questions.some((question) => question.chapterId?.startsWith('chap_sci_')) || backTo === '/subjects/sub_sci';
  const isEnglishAssessment = questions.some((question) => question.chapterId?.startsWith('chap_eng_')) || backTo === '/subjects/sub_eng';
  const [presentationVersion, setPresentationVersion] = useState(0);
  const presentationSeed = title + ':' + mode + ':' + presentationVersion;
  const displayedQuestions = useMemo(() => preserveOptionOrder
    ? questions
    : questions.map((question, questionIndex) => arrangeAssessmentOptions(question, questionIndex, presentationSeed)),
    [questions, preserveOptionOrder, presentationSeed]);
  const q = displayedQuestions[index];
  const selected = q ? (answers[q.id] || []) : [];
  const answeredCount = Object.values(answers).filter((value) => value.length > 0).length;
  const score = questions.reduce((sum, question) => sum + (sameAnswer(answers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);

  useEffect(() => { answersRef.current = answers; }, [answers]);

  const choose = (id: ID) => {
    if (!q || finished) return;
    const current = answersRef.current[q.id] || [];
    const nextSelected = q.type === 'multiple-select'
      ? (current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
      : [id];
    const nextAnswers = { ...answersRef.current, [q.id]: nextSelected };
    answersRef.current = nextAnswers;
    setAnswers(nextAnswers);
  };

  const toggleReview = (questionId: ID) => {
    setMarkedForReview((current) => {
      const next = new Set(current);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  const finish = () => {
    const currentAnswers = answersRef.current;
    const now = Date.now();
    p.recordAttempts(questions.map((question) => ({
      id: question.id,
      attempt: {
        selectedOptionIds: currentAnswers[question.id] || [],
        isCorrect: sameAnswer(currentAnswers[question.id] || [], question.correctOptionIds),
        timestamp: now,
        mode,
      },
    })));
    if (mode === 'mock-test') {
      const mockScore = questions.reduce((sum, question) => sum + (sameAnswer(currentAnswers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);
      const sectionId = mockSubjectId ?? questions[0]?.subjectId;
      if (sectionId) {
        const prefix = mockIdPrefix ?? sectionId.replace(/^sub_/, '') + '-mock-';
        p.saveMockResult({ id: prefix + now, score: mockScore, totalMarks: questions.length, timestamp: now, answers: currentAnswers, sectionScores: { [sectionId]: mockScore } });
      }
    }
    setFinished(true);
  };

  const startTest = () => {
    answersRef.current = {};
    setAnswers({});
    setMarkedForReview(new Set());
    setIndex(0);
    setTimeLeft(initialTime);
    setResultStartedAt(Date.now());
    setPresentationVersion((value) => value + 1);
    setFinished(false);
    setStarted(true);
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

  const formatTime = (seconds: number) => formatMockTime(seconds);
  const usedSeconds = resultStartedAt ? Math.max(0, Math.round((Date.now() - resultStartedAt) / 1000)) : initialTime - timeLeft;
  const accuracy = questions.length ? Math.round((score / questions.length) * 100) : 0;

  if (!questions.length) {
    return <Shell><Card className="empty"><h1>{emptyTitle}</h1><p>{emptyText}</p></Card></Shell>;
  }

  if (finished) {
    return <Shell>
      <div className={`assessment-shell${isScienceAssessment ? " science-assessment-shell" : ""}${isEnglishAssessment ? " english-assessment-shell" : ""}`}>
        <div className="assessment-breadcrumb"><Link to={backTo}>← {backLabel}</Link><span>{badge}</span></div>
        <section className="assessment-result-hero">
          <span>टेस्ट पूरा हुआ</span>
          <strong>{score} / {questions.length}</strong>
          <b>{accuracy}% accuracy</b>
        </section>
        <div className="assessment-result-grid">
          <Card><b>{answeredCount}</b><span>attempted</span></Card>
          <Card><b>{questions.length - answeredCount}</b><span>unanswered</span></Card>
          <Card><b>{markedForReview.size}</b><span>review marked</span></Card>
          <Card><b>{Math.floor(usedSeconds / 60)}:{String(usedSeconds % 60).padStart(2, '0')}</b><span>time used</span></Card>
        </div>
        <Card className="assessment-summary-card">
          <div className="assessment-section-head">
            <span className="eyebrow">PERFORMANCE</span>
            <h2>{title} — परिणाम</h2>
            <p>आपके marks सही उत्तरों की संख्या पर आधारित हैं।</p>
          </div>
          <div className="assessment-result-bar">
            <span style={{ width: accuracy + '%' }} />
          </div>
          <div className="assessment-result-message">
            <b>{accuracy >= 80 ? 'अच्छा प्रदर्शन — अब weak questions revise करें।' : accuracy >= 60 ? 'अच्छी शुरुआत — गलत questions को दोबारा लगाएँ।' : 'अवधारणाएँ दोहराकर फिर से timed practice करें।'}</b>
          </div>
        </Card>
        <AssessmentAnswerReview questions={displayedQuestions} answers={answers} englishMode={isEnglishAssessment} />
        <div className="actions">
          <button className="btn primary" onClick={startTest}>फिर से यह टेस्ट दें</button>
          {bannerLink && <Link className="btn" to={bannerLink.to}>{bannerLink.label}</Link>}
          <Link className="btn" to={backTo}>वापस जाएँ</Link>
        </div>
      </div>
    </Shell>;
  }

  if (!started) {
    return <Shell>
      <div className={`assessment-shell${isScienceAssessment ? " science-assessment-shell" : ""}${isEnglishAssessment ? " english-assessment-shell" : ""}`}>
        <div className="assessment-breadcrumb"><Link to={backTo}>← {backLabel}</Link><span>{badge}</span></div>
        <section className="assessment-start-hero">
          <div>
            <span className="eyebrow">{badge}</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="assessment-time-hero"><span>TIME LIMIT</span><strong>{formatTime(initialTime)}</strong><small>{questions.length} प्रश्न</small></div>
        </section>
        <div className="assessment-start-grid">
          <Card><b>{questions.length}</b><span>प्रश्न</span></Card>
          <Card><b>{questions.length}</b><span>अधिकतम marks</span></Card>
          <Card><b>1</b><span>सही उत्तर = 1 mark</span></Card>
          <Card><b>{Math.round(initialTime / Math.max(1, questions.length))}s</b><span>लगभग समय/प्रश्न</span></Card>
        </div>
        <Card className="assessment-instructions">
          <div className="assessment-section-head"><span className="eyebrow">EXAM MODE</span><h2>शुरू करने से पहले</h2></div>
          <div className="assessment-instruction-grid">
            <div><b>⏱ Timer</b><span>समय 00:00 होने पर टेस्ट अपने-आप जमा हो जाएगा।</span></div>
            <div><b>📝 Answer later</b><span>विकल्प चुनने पर सही उत्तर नहीं दिखेगा।</span></div>
            <div><b>★ Review</b><span>कठिन प्रश्नों को review के लिए चिन्हित कर सकते हैं।</span></div>
            <div><b>📊 Result</b><span>Marks, accuracy और सभी answers टेस्ट के अंत में दिखेंगे।</span></div>
          </div>
          <button className="btn primary assessment-start-button" onClick={startTest}>टेस्ट शुरू करें →</button>
        </Card>
      </div>
    </Shell>;
  }

  return <Shell>
    <div className={`assessment-shell assessment-active${isScienceAssessment ? " science-assessment-shell" : ""}`}>
      <div className="assessment-topbar">
        <div>
          <Link to={backTo}>← {backLabel}</Link>
          <b>{title}</b>
        </div>
        <div className={'assessment-live-timer ' + (timeLeft <= 60 ? 'danger' : timeLeft <= 300 ? 'warning' : '')}>
          <span>⏱</span><strong>{formatTime(timeLeft)}</strong>
        </div>
      </div>
      <div className="assessment-progress-card">
        <div className="assessment-progress-info">
          <span>प्रश्न {index + 1} / {questions.length}</span>
          <span>हल किए: {answeredCount}</span>
          <span>Review: {markedForReview.size}</span>
          <span>{Math.round(((index + 1) / Math.max(1, questions.length)) * 100)}%</span>
        </div>
        <div className="assessment-progress-track"><span style={{ width: ((index + 1) / Math.max(1, questions.length)) * 100 + '%' }} /></div>
      </div>

      {bannerLink && <Card className="assessment-banner"><div><b>{badge}</b><span>{description}</span></div><Link className="btn" to={bannerLink.to}>{bannerLink.label}</Link></Card>}

      <div className="assessment-layout">
        <Card className="assessment-question-card">
          <div className="assessment-question-meta">
            <span>{q?.topicId ? (topics.find((topic) => topic.id === q.topicId)?.title ?? '') : ''}</span>
            <span className={'badge ' + (q ? q.difficulty : 'medium')}>{q ? difficultyLabel[q.difficulty] : ''}</span>
          </div>
          <div className="assessment-question-text">{q && questionTextBlocks(q).map((block, blockIndex) => <ContentRenderer key={blockIndex} blocks={[block]} />)}</div>
          <div className="options assessment-options">
            {q?.options.map((option) => <button key={option.id} className={'option ' + (selected.includes(option.id) ? 'selected' : '')} onClick={() => choose(option.id)}><InlineText text={option.text} /></button>)}
          </div>
          <div className="assessment-actions">
            <button className={'btn ' + (q && markedForReview.has(q.id) ? 'review-active' : '')} onClick={() => q && toggleReview(q.id)}>
              {q && markedForReview.has(q.id) ? '★ Review में चिन्हित' : '☆ Review के लिए रखें'}
            </button>
            <div className="assessment-nav-actions">
              <button className="btn" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>← पिछला</button>
              {index === questions.length - 1
                ? <button className="btn primary" onClick={finish}>टेस्ट जमा करें</button>
                : <button className="btn primary" onClick={() => setIndex((value) => value + 1)}>अगला प्रश्न →</button>}
            </div>
          </div>
        </Card>

        <Card className="assessment-palette-card">
          <div className="assessment-palette-head"><div><b>Question Navigator</b><span>{answeredCount} / {questions.length} answered</span></div><strong>{markedForReview.size}★</strong></div>
          <div className="science-palette-legend"><span>● answered</span><span>★ review</span><span>○ unanswered</span></div>
          <div className="assessment-palette-grid">
            {displayedQuestions.map((question, questionIndex) => <button key={question.id} className={(answers[question.id]?.length ? 'answered ' : '') + (markedForReview.has(question.id) ? 'marked ' : '') + (questionIndex === index ? 'current' : '')} onClick={() => setIndex(questionIndex)}>
              {markedForReview.has(question.id) ? '★' : questionIndex + 1}
            </button>)}
          </div>
        </Card>
      </div>
    </div>
  </Shell>;
};

const PracticePage = () => {
  const { topicId } = useParams();
  const qs = useMemo(() => getQuestionsByTopic(topicId || ''), [topicId]);
  const q = qs[0];
  const isMath = q?.chapterId?.startsWith('chap_math_');
  const isEnglish = q?.chapterId?.startsWith('chap_eng_');
  const topic = topics.find((item) => item.id === topicId);
  return <AssessmentRunner
    questions={qs}
    title={isMath ? '🎯 ' + (topic?.title ?? 'गणित') + ' — अभ्यास' : isEnglish ? '🎯 ' + (topic?.title ?? 'अंग्रेज़ी') + ' — अभ्यास' : 'अभ्यास'}
    backTo={q?.chapterId?.startsWith('chap_sci_') ? '/subjects/sub_sci' : isEnglish ? '/subjects/sub_eng' : q?.chapterId ? '/chapters/' + q.chapterId : '/subjects'}
    backLabel={q?.chapterId?.startsWith('chap_sci_') ? 'विज्ञान तैयारी केंद्र' : isEnglish ? 'अंग्रेज़ी तैयारी केंद्र' : 'अध्याय'}
    description={isMath ? 'इस गणित इकाई के पूरे question set को timed practice की तरह हल करें। उत्तर और explanation टेस्ट पूरा होने के बाद answer review में देखें।' : isEnglish ? 'पहले question का अर्थ समझें, फिर English rule लागू करें। Practice धीरे-धीरे आपको independent solving और बेहतर exam accuracy की ओर ले जाती है।' : 'इस topic के पूरे question set को exam-style timed practice की तरह हल करें। सही उत्तर टेस्ट पूरा होने के बाद दिखाया जाएगा।'}
    badge={isMath ? 'MATH PRACTICE' : isEnglish ? 'ENGLISH PRACTICE' : 'TOPIC PRACTICE'}
    bannerLink={(isMath || isEnglish) && q?.chapterId ? { to: '/chapters/' + q.chapterId + '/study', label: '📖 अध्याय अध्ययन →' } : undefined}
  />;
};

const ChapterChallengerPage = () => {
  const { chapterId } = useParams();
  const chapter = chapters.find((item) => item.id === chapterId);
  const questions = chapter ? getChapterChallengerQuestions(chapter.id, 20, 'jnvst-challenger-' + chapter.id) : [];
  if (!chapter) return <Shell><Card className="empty"><h1>अध्याय नहीं मिला</h1><Link className="btn" to="/subjects">विषयों पर जाएँ</Link></Card></Shell>;

  const isEnglish = chapter.id.startsWith('chap_eng_');
  return <AssessmentRunner
    questions={questions}
    title={'⚡ ' + chapter.title + ' — Challenger Questions'}
    backTo={'/chapters/' + chapter.id}
    backLabel="अध्याय"
    description={isEnglish ? '20-प्रश्न English Challenger — chapter को पहले पढ़ें, फिर English questions को धीरे-धीरे बिना Hindi translation पर निर्भर हुए solve करें।' : '20-प्रश्न Challenger set — पहले Challenge/Hard प्रश्न, फिर chapter coverage से 20 तक। हर प्रश्न में चार वास्तविक विकल्प; सही उत्तर बीच में नहीं दिखेगा और review केवल टेस्ट के अंत में मिलेगा।'}
    badge={isEnglish ? 'ENGLISH CHALLENGER' : 'CHALLENGER MODE'}
    bannerLink={{ to: '/chapters/' + chapter.id + '/study', label: '📖 अध्याय अध्ययन →' }}
    preserveOptionOrder
    emptyTitle="इस अध्याय में अभी Challenger Questions उपलब्ध नहीं हैं"
    emptyText="इस chapter के लिए challenge-level question bank उपलब्ध होने पर यह test यहाँ दिखाई देगा।"
  />;
};

const TopicChallengerPage = () => {
  const { topicId } = useParams();
  const topic = topics.find((item) => item.id === topicId);
  const chapter = topic ? chapters.find((item) => item.id === topic.chapterId) : undefined;
  const isMath = Boolean(topic?.id.startsWith('top_math_'));
  const isHindi = Boolean(topic?.id.startsWith('top_hin_'));
  const questions = (isMath || isHindi) && topic
    ? getTopicChallengerQuestions(topic.id, 20, 'jnvst-topic-challenger-' + topic.id)
    : [];

  if (!topic || !chapter || (!isMath && !isHindi)) {
    return <Shell><Card className="empty"><h1>विषयांश Challenger नहीं मिला</h1><p>यह Challenger अभी Maths और Hindi के official subtopics के लिए उपलब्ध है।</p><Link className="btn" to={isHindi ? "/subjects/sub_hindi" : "/subjects/sub_math"}>{isHindi ? "हिंदी तैयारी केंद्र" : "गणित तैयारी केंद्र"}</Link></Card></Shell>;
  }

  const subjectLabel = isHindi ? 'HINDI' : 'MATH';

  return <AssessmentRunner
    questions={questions}
    title={'⚡ ' + topic.title + ' — Challenger'}
    backTo={'/chapters/' + chapter.id}
    backLabel={chapter.title}
    description={isHindi
      ? "20-प्रश्न विषयांश Challenger — नियम, पहचान, भाषा-प्रयोग और JNVST-style reasoning को कठिन स्तर पर परखें। हर प्रश्न में चार अलग और meaningful विकल्प, एक सही उत्तर और non-guessable answer positions हैं।"
      : "20-प्रश्न subtopic Challenger — concept, calculation और application को कठिन स्तर पर परखें। हर प्रश्न में चार अलग और meaningful विकल्प, एक सही उत्तर और non-guessable answer positions हैं।"}
    badge={subjectLabel + " SUBTOPIC CHALLENGER"}
    bannerLink={{ to: '/chapters/' + chapter.id + '/study', label: '📖 अध्याय अध्ययन →' }}
    preserveOptionOrder
    emptyTitle="इस विषयांश में Challenger Questions उपलब्ध नहीं हैं"
    emptyText={isHindi
      ? "इस Hindi subtopic के लिए dedicated Challenger question pool उपलब्ध होना चाहिए।"
      : "इस Maths subtopic के लिए Challenger question pool उपलब्ध होने पर यह test यहाँ दिखाई देगा।"}
  />;
};

const BookmarksPage = () => { const p = useProgressStore(); const bookmarked = allLessons.filter(l => p.bookmarks.lessonIds.includes(l.id)); return <Shell><div className="page-head"><h1>बुकमार्क</h1><p>सहेजे गए पाठ</p></div>{bookmarked.length ? <div className="grid">{bookmarked.map(l => <Card key={l.id}><h3>{l.title}</h3><Link className="btn" to={`/lessons/${l.id}`}>पाठ खोलें</Link></Card>)}</div> : <Card className="empty"><h2>अभी कोई बुकमार्क नहीं है</h2><p>पाठ पढ़ते समय बुकमार्क जोड़ें।</p></Card>}</Shell>; };

const SmartPracticePage = () => {
  const p = useProgressStore();
  const qs = useMemo(() => getSmartPracticeQuestions(useProgressStore.getState(), 10), []);
  return <AssessmentRunner
    questions={qs}
    title="स्मार्ट अभ्यास"
    backTo="/"
    backLabel="डैशबोर्ड"
    description="आपके performance के आधार पर चुने गए प्रश्नों का timed adaptive set। सही उत्तर और marks अंत में दिखेंगे।"
    badge="SMART PRACTICE"
    bannerLink={{ to: "/mock-tests", label: "पूरा JNVST Mock →" }}
  />;
};
const MathSmartPracticePage = () => {
  const qs = useMemo(() => getMathSmartPracticeQuestions(useProgressStore.getState(), 12, 'jnvst-math-smart-0'), []);
  return <AssessmentRunner
    questions={qs}
    title="🎯 स्मार्ट गणित अभ्यास"
    backTo="/subjects/sub_math"
    backLabel="गणित तैयारी केंद्र"
    description="केवल गणित का adaptive timed set — गलत, कमजोर और अनदेखे questions को प्राथमिकता दी जाती है।"
    badge="MATH SMART PRACTICE"
    bannerLink={{ to: "/math-mock-test", label: "35 प्रश्न का गणित Mock →" }}
  />;
};
const MathMockTestPage = () => {
  const p = useProgressStore();
  const [mockNumber, setMockNumber] = useState(0);
  const qs = useMemo(() => buildMathMockPaper('jnvst-math-' + mockNumber + '-' + Date.now()), [mockNumber]);
  const mathTopics = topics.filter((topic) => topic.chapterId.startsWith('chap_math_')).sort((a, b) => a.order - b.order);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, ID[]>>({});
  const answersRef = useRef<Record<string, ID[]>>({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(53 * 60);
  const [markedForReview, setMarkedForReview] = useState<Set<ID>>(new Set());

  const q = qs[index];
  const selected = q ? (answers[q.id] || []) : [];
  const answeredCount = Object.values(answers).filter((value) => value.length > 0).length;
  const score = qs.reduce((sum, question) => sum + (sameAnswer(answers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);
  const choose = (id: ID) => {
    if (!q) return;
    const next = { ...answersRef.current, [q.id]: [id] };
    answersRef.current = next;
    setAnswers(next);
  };
  const toggleMathReview = (questionId: ID) => {
    setMarkedForReview((current) => {
      const next = new Set(current);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };
  useEffect(() => { answersRef.current = answers; }, [answers]);

  const finish = () => {
    const currentAnswers = answersRef.current;
    const now = Date.now();
    const currentScore = qs.reduce((sum, question) => sum + (sameAnswer(currentAnswers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);
    const result: MockTestResult = {
      id: 'math-mock-' + now,
      score: currentScore,
      totalMarks: qs.length,
      timestamp: now,
      answers: currentAnswers,
      sectionScores: { sub_math: currentScore },
    };
    p.recordAttempts(qs.map((question) => ({
      id: question.id,
      attempt: {
        selectedOptionIds: currentAnswers[question.id] || [],
        isCorrect: sameAnswer(currentAnswers[question.id] || [], question.correctOptionIds),
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
      <AssessmentAnswerReview questions={qs} answers={answers} />
      <div className="actions"><button className="btn primary" onClick={() => { setMockNumber((value) => value + 1); setStarted(false); setFinished(false); setIndex(0); answersRef.current = {}; setAnswers({}); setMarkedForReview(new Set()); setTimeLeft(53 * 60); }}>नया गणित Mock</button><Link className="btn" to="/math-smart-practice">गलतियों पर स्मार्ट अभ्यास</Link><Link className="btn" to="/math-formulas">सूत्र-पत्र</Link></div>
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
        <div className="progressline test-progressline"><span>प्रश्न {index + 1} / {qs.length}</span><span>हल किए: {answeredCount}</span><span>{markedForReview.size} review</span><span className={timeLeft <= 300 ? 'mock-timer danger' : 'mock-timer'}>⏱ {formatMockTime(timeLeft)}</span></div>
        <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
        <div className="options">{q.options.map(o => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
        <div className="science-mock-actions">
          <button className={'btn ' + (markedForReview.has(q.id) ? 'review-active' : '')} onClick={() => toggleMathReview(q.id)}>{markedForReview.has(q.id) ? '★ Review में चिन्हित' : '☆ Review के लिए रखें'}</button>
          <div className="science-mock-nav-actions">
            <button className="btn" disabled={index === 0} onClick={() => setIndex((x) => x - 1)}>← पिछला</button>
            {index === qs.length - 1
              ? <button className="btn primary" onClick={finish}>टेस्ट जमा करें</button>
              : <button className="btn primary" onClick={() => setIndex((x) => x + 1)}>अगला प्रश्न →</button>}
          </div>
        </div>
      </Card>
      <Card className="math-mock-palette">
        <h3>Question Navigator</h3>
        <p>{answeredCount} / {qs.length} answered</p>
        <div className="science-palette-legend"><span>● answered</span><span>★ review</span><span>○ unanswered</span></div>
        <div className="math-palette-grid">
          {qs.map((question, questionIndex) => <button key={question.id} className={(answers[question.id]?.length ? 'answered ' : '') + (markedForReview.has(question.id) ? 'marked ' : '') + (questionIndex === index ? 'current' : '')} onClick={() => setIndex(questionIndex)}>{markedForReview.has(question.id) ? '★' : questionIndex + 1}</button>)}
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
  const answersRef = useRef<Record<string, ID[]>>({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150 * 60);
  const [markedForReview, setMarkedForReview] = useState<Set<ID>>(new Set());
  const q = qs[index];

  const selected = q ? (answers[q.id] || []) : [];
  const answeredCount = Object.values(answers).filter((value) => value.length > 0).length;
  const choose = (id: ID) => {
    if (!q) return;
    const next = { ...answersRef.current, [q.id]: [id] };
    answersRef.current = next;
    setAnswers(next);
  };
  const toggleMockReview = (questionId: ID) => {
    setMarkedForReview((current) => {
      const next = new Set(current);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };
  useEffect(() => { answersRef.current = answers; }, [answers]);

  const finish = () => {
    const currentAnswers = answersRef.current;
    const score = qs.reduce((sum, question) => sum + (sameAnswer(currentAnswers[question.id] || [], question.correctOptionIds) ? 1 : 0), 0);
    const sectionScores = qs.reduce<Record<string, number>>((scores, question) => {
      scores[question.subjectId] = (scores[question.subjectId] ?? 0) + (sameAnswer(currentAnswers[question.id] || [], question.correctOptionIds) ? 1 : 0);
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
        selectedOptionIds: currentAnswers[question.id] || [],
        isCorrect: sameAnswer(currentAnswers[question.id] || [], question.correctOptionIds),
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
        <AssessmentAnswerReview questions={qs} answers={answers} />
        <div className="actions"><button className="btn primary" onClick={() => { answersRef.current = {}; setStarted(false); setFinished(false); setIndex(0); setAnswers({}); setMarkedForReview(new Set()); setTimeLeft(150 * 60); }}>नया मॉक टेस्ट</button><Link className="btn" to="/smart-practice">गलतियों पर अभ्यास</Link></div>
      </Card>
    </Shell>;
  }

  return <Shell>
    <div className="page-head"><h1>JNVST मॉक टेस्ट</h1><p>100 प्रश्न · 150 मिनट · हिंदी 15 · अंग्रेज़ी 15 · गणित 35 · विज्ञान 35</p><div className="actions">{!started && <button className="btn primary" onClick={() => { setTimeLeft(150 * 60); setStarted(true); }}>टेस्ट शुरू करें</button>}</div></div>
    {!started ? <Card><h2>परीक्षा-पूर्व निर्देश</h2><ul><li>केवल चार-विकल्प, एक-सही-उत्तर वाले MCQ इस परीक्षा में लिए गए हैं।</li><li>प्रश्नों का subject-wise वितरण JNVST pattern के अनुसार रखा गया है।</li><li>हर उत्तर चुनकर अगले प्रश्न पर जाएँ; अंत में आपका score और section-wise परिणाम सुरक्षित होगा।</li>
        <li>150 मिनट का timer आधिकारिक पूरे Selection Test की अवधि को दर्शाता है।</li></ul></Card> : q && <div className="full-mock-layout"><Card className="question-card"><div className="question-body">
      <div className="progressline test-progressline"><span>प्रश्न {index + 1} / {qs.length}</span><span>{examSections.find((section) => section.id === q.subjectId)?.title ?? 'विषय'}</span><span>हल किए: {answeredCount}</span><span>{markedForReview.size} review</span><span className={timeLeft <= 300 ? 'mock-timer danger' : 'mock-timer'}>⏱ {formatMockTime(timeLeft)}</span></div>
      <div className="question-text">{questionTextBlocks(q).map((b, idx) => <ContentRenderer key={idx} blocks={[b]} />)}</div>
      <div className="options">{q.options.map(o => <button key={o.id} className={'option ' + (selected.includes(o.id) ? 'selected' : '')} onClick={() => choose(o.id)}><InlineText text={o.text} /></button>)}</div>
      <div className="science-mock-actions">
        <button className={'btn ' + (markedForReview.has(q.id) ? 'review-active' : '')} onClick={() => toggleMockReview(q.id)}>{markedForReview.has(q.id) ? '★ Review में चिन्हित' : '☆ Review के लिए रखें'}</button>
        <div className="science-mock-nav-actions">
          <button className="btn" disabled={index === 0} onClick={() => setIndex(x => x - 1)}>← पिछला</button>
          <button className="btn primary" onClick={() => index === qs.length - 1 ? finish() : setIndex(x => x + 1)}>{index === qs.length - 1 ? 'टेस्ट जमा करें' : 'अगला प्रश्न →'}</button>
        </div>
      </div>
    </div></Card>
    <Card className="full-mock-palette">
      <div className="full-mock-palette-head"><div><b>Question Navigator</b><span>{answeredCount} / {qs.length} answered</span></div><strong>⏱ {formatMockTime(timeLeft)}</strong></div>
      <div className="science-palette-legend"><span>● answered</span><span>★ review</span><span>○ unanswered</span></div>
      <div className="full-mock-palette-grid">{qs.map((question, questionIndex) => <button key={question.id} className={(answers[question.id]?.length ? 'answered ' : '') + (markedForReview.has(question.id) ? 'marked ' : '') + (questionIndex === index ? 'current' : '')} onClick={() => setIndex(questionIndex)}>{markedForReview.has(question.id) ? '★' : questionIndex + 1}</button>)}</div>
    </Card></div>}
  </Shell>;
};

export default function App() { return <HashRouter><Routes><Route path="/" element={<Dashboard />} /><Route path="/subjects" element={<SubjectsPage />} /><Route path="/subjects/:subjectId" element={<SubjectPage />} /><Route path="/chapters/:chapterId" element={<ChapterPage />} /><Route path="/chapters/:chapterId/study" element={<ChapterStudyPage />} /><Route path="/chapters/:chapterId/challenger" element={<ChapterChallengerPage />} /><Route path="/topics/:topicId/challenger" element={<TopicChallengerPage />} /><Route path="/lessons/:lessonId" element={<LessonPage />} /><Route path="/math-formulas" element={<Shell><MathFormulaSheet /></Shell>} /><Route path="/english-revision" element={<EnglishRevisionPage />} /><Route path="/hindi-revision" element={<HindiRevisionPage />} /><Route path="/hindi-smart-practice" element={<HindiSmartPracticePage />} /><Route path="/hindi-mock-test" element={<HindiMockTestPage />} /><Route path="/hindi-unseen-passage" element={<HindiUnseenPassagePage />} /><Route path="/english-smart-practice" element={<EnglishSmartPracticePage />} /><Route path="/english-mock-test" element={<EnglishMockTestPage />} /><Route path="/english-translation-lab" element={<EnglishTranslationLabPage />} /><Route path="/english-translation-practice" element={<EnglishTranslationPracticePage />} /><Route path="/english-vocabulary-lab" element={<EnglishVocabularyLabPage />} /><Route path="/english-vocabulary-practice" element={<EnglishVocabularyPracticePage />} /><Route path="/english-unseen-passage" element={<EnglishUnseenPassagePage />} /><Route path="/science-revision" element={<ScienceRevisionPage />} /><Route path="/science-smart-practice" element={<ScienceSmartPracticePage />} /><Route path="/science-mock-test" element={<ScienceMockTestPage />} /><Route path="/practice/:topicId" element={<PracticePage />} /><Route path="/smart-practice" element={<SmartPracticePage />} /><Route path="/math-smart-practice" element={<MathSmartPracticePage />} /><Route path="/bookmarks" element={<BookmarksPage />} /><Route path="/mock-tests" element={<MockTestsPage />} /><Route path="/math-mock-test" element={<MathMockTestPage />} /><Route path="*" element={<Dashboard />} /></Routes></HashRouter>; }
