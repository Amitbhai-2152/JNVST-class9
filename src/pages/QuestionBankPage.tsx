import '../question-bank.css';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MathAwareText } from '../components/MathText';
import { questionBank, questionBankStats, questionBankTaxonomy } from '../data/questionBank';
import type { Difficulty, ID, Question } from '../types';

type FilterValue = ID | 'all';
type SessionState = 'setup' | 'practice' | 'finished';

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'आसान',
  medium: 'मध्यम',
  hard: 'कठिन',
  challenge: 'चैलेंज',
};

const typeLabels: Record<Question['type'], string> = {
  mcq: 'MCQ',
  'true-false': 'True / False',
  'multiple-select': 'Multiple Select',
  passage: 'Passage',
};

const cleanText = (question: Question) => {
  if (question.textPlain?.trim()) return question.textPlain.trim();
  return (question.text ?? [])
    .map((block) => block.type === 'image' ? block.alt : 'text' in block ? block.text : '')
    .filter(Boolean)
    .join('\n');
};

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const getUniqueQuestions = (items: Question[], size: number) => shuffle(items).slice(0, Math.min(size, items.length));

const QuestionBankPage = () => {
  const [subjectId, setSubjectId] = useState<FilterValue>('all');
  const [chapterId, setChapterId] = useState<FilterValue>('all');
  const [topicId, setTopicId] = useState<FilterValue>('all');
  const [difficulty, setDifficulty] = useState<'all' | Difficulty>('all');
  const [sessionSize, setSessionSize] = useState(10);
  const [session, setSession] = useState<Question[]>([]);
  const [sessionState, setSessionState] = useState<SessionState>('setup');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<ID, ID[]>>({});

  const subjects = questionBankTaxonomy.subjects;
  const chapters = questionBankTaxonomy.chapters;
  const topics = questionBankTaxonomy.topics;

  const visibleChapters = useMemo(
    () => chapters.filter((chapter) => subjectId === 'all' || chapter.subjectId === subjectId),
    [chapters, subjectId],
  );

  const visibleTopics = useMemo(
    () => topics.filter((topic) => {
      if (chapterId !== 'all') return topic.chapterId === chapterId;
      if (subjectId !== 'all') {
        const chapter = chapters.find((item) => item.id === topic.chapterId);
        return chapter?.subjectId === subjectId;
      }
      return true;
    }),
    [topics, chapters, chapterId, subjectId],
  );

  const filteredQuestions = useMemo(() => questionBank.filter((question) => {
    if (subjectId !== 'all' && question.subjectId !== subjectId) return false;
    if (chapterId !== 'all' && question.chapterId !== chapterId) return false;
    if (topicId !== 'all' && question.topicId !== topicId) return false;
    if (difficulty !== 'all' && question.difficulty !== difficulty) return false;
    return true;
  }), [subjectId, chapterId, topicId, difficulty]);

  const currentQuestion = session[currentIndex];

  const answerFor = currentQuestion ? (answers[currentQuestion.id] ?? []) : [];

  const score = useMemo(() => session.reduce((total, question) => {
    const selected = answers[question.id] ?? [];
    const correct = question.correctOptionIds;
    return total + (
      selected.length === correct.length &&
      selected.every((id) => correct.includes(id))
        ? 1
        : 0
    );
  }, 0), [answers, session]);

  const startPractice = () => {
    const nextSession = getUniqueQuestions(filteredQuestions, sessionSize);
    if (!nextSession.length) return;
    setSession(nextSession);
    setAnswers({});
    setCurrentIndex(0);
    setSessionState('practice');
  };

  const resetSetup = () => {
    setSession([]);
    setAnswers({});
    setCurrentIndex(0);
    setSessionState('setup');
  };

  const selectAnswer = (optionId: ID) => {
    if (!currentQuestion) return;
    const next = currentQuestion.type === 'multiple-select'
      ? (answerFor.includes(optionId) ? answerFor.filter((id) => id !== optionId) : [...answerFor, optionId])
      : [optionId];
    setAnswers((current) => ({ ...current, [currentQuestion.id]: next }));
  };

  const subjectTitle = (id: ID) => subjects.find((item) => item.id === id)?.title ?? 'विषय';
  const chapterTitle = (id: ID) => chapters.find((item) => item.id === id)?.title ?? 'अध्याय';

  return (
    <div className="question-bank-page">
      <div className="question-bank-head">
        <div>
          <Link className="question-bank-back" to="/">← डैशबोर्ड</Link>
          <span className="question-bank-eyebrow">QUESTION BANK • PHASE 2</span>
          <h1>Question Bank</h1>
          <p>विषय, अध्याय, विषयांश और कठिनाई के अनुसार प्रश्न चुनें और तुरंत अभ्यास शुरू करें।</p>
        </div>
        <div className="question-bank-stat">
          <strong>{questionBankStats.total}</strong>
          <span>कुल प्रश्न</span>
        </div>
      </div>

      {sessionState === 'setup' && (
        <>
          <section className="question-bank-filter-card">
            <div className="question-bank-section-title">
              <div>
                <span className="question-bank-label">FILTER & BUILD</span>
                <h2>अपना practice set बनाइए</h2>
              </div>
              <span className="question-bank-count">{filteredQuestions.length} प्रश्न उपलब्ध</span>
            </div>

            <div className="question-bank-filters">
              <label>
                <span>विषय</span>
                <select value={subjectId} onChange={(event) => {
                  setSubjectId(event.target.value as FilterValue);
                  setChapterId('all');
                  setTopicId('all');
                }}>
                  <option value="all">सभी विषय</option>
                  {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.title}</option>)}
                </select>
              </label>

              <label>
                <span>अध्याय</span>
                <select value={chapterId} onChange={(event) => {
                  setChapterId(event.target.value as FilterValue);
                  setTopicId('all');
                }}>
                  <option value="all">सभी अध्याय</option>
                  {visibleChapters.map((chapter) => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}
                </select>
              </label>

              <label>
                <span>विषयांश</span>
                <select value={topicId} onChange={(event) => setTopicId(event.target.value as FilterValue)}>
                  <option value="all">सभी विषयांश</option>
                  {visibleTopics.map((topic) => <option key={topic.id} value={topic.id}>{topic.title}</option>)}
                </select>
              </label>

              <label>
                <span>कठिनाई</span>
                <select value={difficulty} onChange={(event) => setDifficulty(event.target.value as 'all' | Difficulty)}>
                  <option value="all">सभी स्तर</option>
                  {Object.entries(difficultyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>

              <label>
                <span>प्रश्नों की संख्या</span>
                <select value={sessionSize} onChange={(event) => setSessionSize(Number(event.target.value))}>
                  {[5, 10, 20, 30].map((size) => <option key={size} value={size}>{size} प्रश्न</option>)}
                </select>
              </label>
            </div>

            <div className="question-bank-filter-summary">
              <div><b>{filteredQuestions.length}</b><span>matching questions</span></div>
              <div><b>{sessionSize}</b><span>requested session</span></div>
              <div><b>{sessionState === 'setup' ? 'Ready' : '—'}</b><span>session status</span></div>
            </div>

            <button type="button" className="question-bank-start" disabled={!filteredQuestions.length} onClick={startPractice}>
              ▶ अभ्यास शुरू करें
            </button>
          </section>

          <section className="question-bank-info-grid">
            <article>
              <span>01</span>
              <div><strong>विषय से विषयांश तक</strong><p>Filters एक-दूसरे के अनुसार automatically narrow होते हैं ताकि गलत combination न बने।</p></div>
            </article>
            <article>
              <span>02</span>
              <div><strong>एक session में no duplicate IDs</strong><p>हर session canonical Question Bank से unique प्रश्न चुनता है।</p></div>
            </article>
            <article>
              <span>03</span>
              <div><strong>पूरा central bank</strong><p>अभ्यास सीधे मौजूदा canonical question catalog से आता है; अलग duplicate database नहीं बनाया गया है।</p></div>
            </article>
          </section>
        </>
      )}

      {sessionState === 'practice' && currentQuestion && (
        <section className="question-bank-practice">
          <div className="question-bank-practice-head">
            <div>
              <span className="question-bank-label">{subjectTitle(currentQuestion.subjectId)}</span>
              <h2>प्रश्न {currentIndex + 1} / {session.length}</h2>
              <p>{chapterTitle(currentQuestion.chapterId)} · {difficultyLabels[currentQuestion.difficulty]} · {typeLabels[currentQuestion.type]}</p>
            </div>
            <button type="button" className="question-bank-secondary" onClick={resetSetup}>← प्रश्न चयन बदलें</button>
          </div>

          <article className="question-bank-question-card">
            <div className="question-bank-question-meta">
              <span>{currentQuestion.id}</span>
              <span>{currentQuestion.estimatedSeconds ? currentQuestion.estimatedSeconds + ' sec' : 'Practice'}</span>
            </div>
            <div className="question-bank-question-text">
              {cleanText(currentQuestion).split('\n').map((line, index) => <p key={index}><MathAwareText text={line} /></p>)}
            </div>
            <div className="question-bank-options">
              {currentQuestion.options.map((option) => {
                const selected = answerFor.includes(option.id);
                return (
                  <button type="button" key={option.id} className={'question-bank-option ' + (selected ? 'selected' : '')} onClick={() => selectAnswer(option.id)}>
                    <span>{String.fromCharCode(65 + currentQuestion.options.findIndex((item) => item.id === option.id))}</span>
                    <MathAwareText text={option.text} />
                  </button>
                );
              })}
            </div>
            <div className="question-bank-practice-actions">
              <button type="button" className="question-bank-secondary" disabled={currentIndex === 0} onClick={() => setCurrentIndex((value) => value - 1)}>← पिछला</button>
              <div><span>{Object.values(answers).filter((value) => value.length).length} answered</span></div>
              {currentIndex === session.length - 1
                ? <button type="button" className="question-bank-start" onClick={() => setSessionState('finished')}>सत्र समाप्त करें →</button>
                : <button type="button" className="question-bank-start" onClick={() => setCurrentIndex((value) => value + 1)}>अगला प्रश्न →</button>}
            </div>
          </article>
        </section>
      )}

      {sessionState === 'finished' && (
        <section className="question-bank-finished">
          <span className="question-bank-label">SESSION COMPLETE</span>
          <h2>अभ्यास सत्र पूरा हुआ</h2>
          <div className="question-bank-score">{score}<span> / {session.length}</span></div>
          <p>आपकी accuracy: <strong>{session.length ? Math.round((score / session.length) * 100) : 0}%</strong></p>
          <div className="question-bank-result-grid">
            <div><b>{session.length}</b><span>कुल प्रश्न</span></div>
            <div><b>{Object.values(answers).filter((value) => value.length).length}</b><span>attempted</span></div>
            <div><b>{session.length - Object.values(answers).filter((value) => value.length).length}</b><span>unanswered</span></div>
          </div>
          <div className="question-bank-finished-actions">
            <button type="button" className="question-bank-start" onClick={() => { setAnswers({}); setCurrentIndex(0); setSessionState('practice'); }}>फिर से परिणाम session देखें</button>
            <button type="button" className="question-bank-secondary" onClick={resetSetup}>नया Question Bank set</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default QuestionBankPage;
