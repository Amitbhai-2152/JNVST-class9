import '../question-bank.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MathAwareText } from '../components/MathText';
import { questionBank, questionBankById, questionBankStats, questionBankTaxonomy } from '../data/questionBank';
import { useAuth } from '../auth/Auth';
import { useProgressStore } from '../store/progress';
import { getQuestionBankProgressSummary, getQuestionPerformance } from '../utils/questionBankProgress';
import { getSelectionRationale, selectQuestionBankSession, type QuestionBankSelectionMode } from '../utils/questionBankSmartSelection';
import { dedicatedChallengerQuestions, getDedicatedChapterChallengers, getDedicatedGlobalChallengers, getDedicatedSubjectChallengers, getDedicatedTopicChallengers, getDedicatedChallengerCounts } from '../utils/questionBankChallengers';
import type { Difficulty, ID, Question, QuestionBankDifficultyFilter, QuestionBankSessionKind } from '../types';

type FilterValue = ID | 'all';
type SessionState = 'setup' | 'practice' | 'finished';
type PerformanceView = 'topic' | 'chapter' | 'difficulty';

const difficultyLabels: Record<Difficulty, string> = {
  easy: 'आसान',
  medium: 'मध्यम',
  hard: 'कठिन',
  challenge: 'चैलेंज',
};

const difficultyFilterLabels: Record<QuestionBankDifficultyFilter, string> = {
  all: 'सभी स्तर',
  easy: 'आसान',
  medium: 'मध्यम',
  hard: 'कठिन',
  challenge: 'चैलेंज',
  'hard-plus': 'Hard + Challenge',
};

const typeLabels: Record<Question['type'], string> = {
  mcq: 'MCQ',
  'true-false': 'True / False',
  'multiple-select': 'Multiple Select',
  passage: 'Passage',
};

const cleanBlocks = (question: Question, field: 'text' | 'explanation') => {
  const plain = field === 'text' ? question.textPlain : question.explanationPlain;
  if (plain?.trim()) return plain.trim();

  const blocks = field === 'text' ? question.text ?? [] : question.explanation ?? [];
  return blocks.map((block) => {
    if (block.type === 'image') return block.alt;
    if (block.type === 'list') return block.items.map((item) => '• ' + item).join('\n');
    if (block.type === 'table') return block.rows.map((row) => row.join(' | ')).join('\n');
    if (block.type === 'formula') return block.expression;
    if ('text' in block) return block.text;
    if ('steps' in block) return block.steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
    return '';
  }).filter(Boolean).join('\n');
};

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const getUniqueQuestions = (items: Question[], size: number) =>
  shuffle(items).slice(0, Math.min(size, items.length));

const sameAnswers = (selected: ID[], correct: ID[]) =>
  selected.length === correct.length && selected.every((id) => correct.includes(id));

// Saved sessions may contain either canonical Practice questions or dedicated
// Challenger questions. Canonical IDs win defensively if an unexpected overlap
// ever appears, preserving the canonical bank as the source of truth.
const questionBankSessionById = new Map<ID, Question>([
  ...dedicatedChallengerQuestions,
  ...questionBank,
].map((question) => [question.id, question]));

const QuestionBankPage = () => {
  const [subjectId, setSubjectId] = useState<FilterValue>('all');
  const [chapterId, setChapterId] = useState<FilterValue>('all');
  const [topicId, setTopicId] = useState<FilterValue>('all');
  const [difficulty, setDifficulty] = useState<QuestionBankDifficultyFilter>('all');
  const [sessionSize, setSessionSize] = useState(10);
  const [selectionMode, setSelectionMode] = useState<QuestionBankSelectionMode>('smart');
  const [sessionKind, setSessionKind] = useState<QuestionBankSessionKind>('practice');

  const [session, setSession] = useState<Question[]>([]);
  const [sessionState, setSessionState] = useState<SessionState>('setup');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<ID, ID[]>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<ID, boolean>>({});
  const [checked, setChecked] = useState<Record<ID, boolean>>({});
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [attemptsRecorded, setAttemptsRecorded] = useState(false);
  const [sessionStartedAt, setSessionStartedAt] = useState(0);
  const [performanceView, setPerformanceView] = useState<PerformanceView>('topic');
  const [restoredFromSavedSession, setRestoredFromSavedSession] = useState(false);
  const [reviewOnly, setReviewOnly] = useState(false);
  const restoredSessionRef = useRef(false);
  const { loading: authLoading } = useAuth();

  const recordAttempts = useProgressStore((state) => state.recordAttempts);
  const savedQuestionBankSession = useProgressStore((state) => state.questionBankSession);
  const saveQuestionBankSession = useProgressStore((state) => state.saveQuestionBankSession);
  const clearQuestionBankSession = useProgressStore((state) => state.saveQuestionBankSession);
  const progressQuestionAttempts = useProgressStore((state) => state.questionAttempts);

  const dedicatedChallengerTotal = useMemo(() => getDedicatedChallengerCounts().total, []);

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
    if (difficulty !== 'all' && difficulty !== 'hard-plus' && question.difficulty !== difficulty) return false;
    if (difficulty === 'hard-plus' && question.difficulty !== 'hard' && question.difficulty !== 'challenge') return false;
    return true;
  }), [subjectId, chapterId, topicId, difficulty]);

  const currentQuestion = session[currentIndex];
  const answerFor = currentQuestion ? (answers[currentQuestion.id] ?? []) : [];

  const progressSummary = useMemo(
    () => getQuestionBankProgressSummary(
      { questionAttempts: progressQuestionAttempts ?? {} },
      questionBankById,
      questionBankTaxonomy,
    ),
    [progressQuestionAttempts],
  );

  const currentQuestionPerformance = useMemo(
    () => currentQuestion ? getQuestionPerformance(
      { questionAttempts: progressQuestionAttempts ?? {} },
      currentQuestion.id,
    ) : null,
    [currentQuestion, progressQuestionAttempts],
  );

  const performanceRows = performanceView === 'topic'
    ? progressSummary.byTopic
    : performanceView === 'chapter'
      ? progressSummary.byChapter
      : progressSummary.byDifficulty;

  const formatDateTime = (timestamp: number | null) => {
    if (!timestamp) return 'अभी तक कोई अभ्यास नहीं';
    return new Intl.DateTimeFormat('hi-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  const answeredCount = session.filter((question) => (answers[question.id] ?? []).length > 0).length;
  const unansweredCount = session.length - answeredCount;
  const markedCount = session.filter((question) => markedForReview[question.id]).length;
  const checkedCount = session.filter((question) => checked[question.id]).length;

  const score = useMemo(
    () => session.reduce((total, question) => {
      const selected = answers[question.id] ?? [];
      return total + (sameAnswers(selected, question.correctOptionIds) ? 1 : 0);
    }, 0),
    [answers, session],
  );

  const correctCount = session.filter((question) =>
    sameAnswers(answers[question.id] ?? [], question.correctOptionIds),
  ).length;
  const incorrectCount = answeredCount - session.filter((question) =>
    sameAnswers(answers[question.id] ?? [], question.correctOptionIds),
  ).filter((question) => (answers[question.id] ?? []).length > 0).length;

  useEffect(() => {
    if (restoredSessionRef.current || authLoading) return;

    if (!savedQuestionBankSession) {
      restoredSessionRef.current = true;
      return;
    }

    const restoredQuestions = savedQuestionBankSession.questionIds
      .map((id) => questionBankSessionById.get(id))
      .filter((question): question is Question => Boolean(question));

    if (!restoredQuestions.length) {
      clearQuestionBankSession(null);
      restoredSessionRef.current = true;
      return;
    }

    setSession(restoredQuestions);
    setAnswers(savedQuestionBankSession.answers ?? {});
    setMarkedForReview(Object.fromEntries((savedQuestionBankSession.markedForReview ?? []).map((id) => [id, true])));
    setChecked(Object.fromEntries((savedQuestionBankSession.checkedQuestionIds ?? []).map((id) => [id, true])));
    setCurrentIndex(Math.min(savedQuestionBankSession.currentIndex ?? 0, Math.max(restoredQuestions.length - 1, 0)));
    setSessionStartedAt(savedQuestionBankSession.startedAt || Date.now());
    setAttemptsRecorded(Boolean(savedQuestionBankSession.attemptsRecorded));
    setSubjectId(savedQuestionBankSession.filters?.subjectId ?? 'all');
    setChapterId(savedQuestionBankSession.filters?.chapterId ?? 'all');
    setTopicId(savedQuestionBankSession.filters?.topicId ?? 'all');
    setDifficulty(savedQuestionBankSession.filters?.difficulty ?? 'all');
    setSessionSize(savedQuestionBankSession.filters?.sessionSize ?? restoredQuestions.length);
    setSelectionMode(savedQuestionBankSession.filters?.selectionMode ?? 'smart');
    setSessionKind(savedQuestionBankSession.sessionKind ?? 'practice');
    setRestoredFromSavedSession(true);
    setReviewOnly(Boolean(savedQuestionBankSession.reviewOnly));
    setSessionState(savedQuestionBankSession.status);
    restoredSessionRef.current = true;
  }, [authLoading, savedQuestionBankSession, clearQuestionBankSession]);

  useEffect(() => {
    if (!session.length || sessionState === 'setup' || !sessionStartedAt) return;

    saveQuestionBankSession({
      status: sessionState,
      sessionKind,
      questionIds: session.map((question) => question.id),
      answers,
      markedForReview: Object.entries(markedForReview).filter(([, marked]) => marked).map(([id]) => id),
      checkedQuestionIds: Object.entries(checked).filter(([, isChecked]) => isChecked).map(([id]) => id),
      currentIndex,
      filters: { subjectId, chapterId, topicId, difficulty, sessionSize, selectionMode },
      startedAt: sessionStartedAt,
      updatedAt: Date.now(),
      attemptsRecorded,
      reviewOnly,
    });
  }, [
    session,
    sessionState,
    currentIndex,
    answers,
    markedForReview,
    checked,
    attemptsRecorded,
    sessionStartedAt,
    subjectId,
    chapterId,
    topicId,
    difficulty,
    sessionSize,
    selectionMode,
    sessionKind,
    reviewOnly,
    saveQuestionBankSession,
  ]);

  const getChallengerPool = (seedSuffix = '') => {
    const seed = 'question-bank-challenger:' + subjectId + ':' + chapterId + ':' + topicId + ':' + seedSuffix;
    const poolLimit = 1000;
    if (topicId !== 'all') return getDedicatedTopicChallengers(topicId, poolLimit, seed);
    if (chapterId !== 'all') return getDedicatedChapterChallengers(chapterId, poolLimit, seed);
    if (subjectId !== 'all') return getDedicatedSubjectChallengers(subjectId, poolLimit, seed);
    return getDedicatedGlobalChallengers(poolLimit, seed);
  };

  const challengerQuestions = useMemo(() => getChallengerPool('setup'), [subjectId, chapterId, topicId]);

  const availableCount = sessionKind === 'challenger'
    ? challengerQuestions.length
    : filteredQuestions.length;

  const challengerScopeReady = challengerQuestions.length >= 20;
  const maximumSessionSize = Math.max(5, Math.min(100, availableCount || 5));
  const clampSessionSize = (value: number) => Math.max(5, Math.min(maximumSessionSize, Math.round(value) || 5));
  const effectiveSessionSize = clampSessionSize(sessionSize);
  const practiceScopeReady = filteredQuestions.length >= 5;
  const sessionReady = sessionKind === 'challenger' ? challengerScopeReady : practiceScopeReady;

  const startPractice = () => {
    const requestedSize = effectiveSessionSize;
    const nextSession = sessionKind === 'challenger'
      ? getChallengerPool(String(Date.now())).slice(0, requestedSize)
      : selectQuestionBankSession(
          filteredQuestions,
          progressQuestionAttempts ?? {},
          requestedSize,
          selectionMode,
        ).questions;
    if (!nextSession.length) return;
    setSession(nextSession);
    setAnswers({});
    setMarkedForReview({});
    setChecked({});
    setCurrentIndex(0);
    setShowFinishConfirm(false);
    setAttemptsRecorded(false);
    setSessionStartedAt(Date.now());
    setRestoredFromSavedSession(false);
    setReviewOnly(false);
    setSessionState('practice');
  };

  const resetSetup = () => {
    setSession([]);
    setAnswers({});
    setMarkedForReview({});
    setChecked({});
    setCurrentIndex(0);
    setShowFinishConfirm(false);
    setAttemptsRecorded(false);
    setSessionStartedAt(0);
    setRestoredFromSavedSession(false);
    setReviewOnly(false);
    setSelectionMode('smart');
    setSessionKind('practice');
    setSessionState('setup');
    clearQuestionBankSession(null);
  };

  const selectAnswer = (optionId: ID) => {
    if (!currentQuestion || reviewOnly || checked[currentQuestion.id]) return;
    const next = currentQuestion.type === 'multiple-select'
      ? (answerFor.includes(optionId)
          ? answerFor.filter((id) => id !== optionId)
          : [...answerFor, optionId])
      : [optionId];
    setAnswers((current) => ({ ...current, [currentQuestion.id]: next }));
  };

  const clearResponse = () => {
    if (!currentQuestion || reviewOnly) return;
    setAnswers((current) => ({ ...current, [currentQuestion.id]: [] }));
    setChecked((current) => ({ ...current, [currentQuestion.id]: false }));
  };

  const checkAnswer = () => {
    if (!currentQuestion || reviewOnly || !answerFor.length) return;
    setChecked((current) => ({ ...current, [currentQuestion.id]: true }));
  };

  const editCheckedAnswer = () => {
    if (!currentQuestion || reviewOnly) return;
    setChecked((current) => ({ ...current, [currentQuestion.id]: false }));
  };

  const toggleMarked = () => {
    if (!currentQuestion || reviewOnly) return;
    setMarkedForReview((current) => ({
      ...current,
      [currentQuestion.id]: !current[currentQuestion.id],
    }));
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= session.length) return;
    setCurrentIndex(index);
  };

  const finishSession = () => {
    if (!session.length) return;

    if (!attemptsRecorded) {
      const attemptItems = session
        .map((question) => {
          const selectedOptionIds = answers[question.id] ?? [];
          if (!selectedOptionIds.length) return null;
          return {
            id: question.id,
            attempt: {
              selectedOptionIds,
              isCorrect: sameAnswers(selectedOptionIds, question.correctOptionIds),
              timestamp: Date.now(),
              mode: sessionKind === 'challenger' ? 'revision' as const : 'practice' as const,
            },
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      if (attemptItems.length) recordAttempts(attemptItems);
      setAttemptsRecorded(true);
    }

    setShowFinishConfirm(false);
    setSessionState('finished');
  };

  const subjectTitle = (id: ID) => subjects.find((item) => item.id === id)?.title ?? 'विषय';
  const chapterTitle = (id: ID) => chapters.find((item) => item.id === id)?.title ?? 'अध्याय';

  const getOptionLetter = (question: Question, id: ID) => {
    const index = question.options.findIndex((option) => option.id === id);
    return index >= 0 ? String.fromCharCode(65 + index) : '—';
  };

  const getOptionText = (question: Question, ids: ID[]) =>
    ids.map((id) => {
      const option = question.options.find((item) => item.id === id);
      return option ? `${getOptionLetter(question, id)}. ${option.text}` : '—';
    }).join(' • ');

  return (
    <div className="question-bank-page">
      <div className="question-bank-head">
        <div>
          <Link className="question-bank-back" to="/">← डैशबोर्ड</Link>
          <span className="question-bank-eyebrow">QUESTION BANK • EXPANDED PRACTICE</span>
          <h1>Question Bank</h1>
          <p>विषय, अध्याय, विषयांश और कठिनाई के अनुसार प्रश्न चुनें। Smart practice आपकी पिछली performance के आधार पर अगला set चुन सकता है।</p>
        </div>
        <div className="question-bank-stat">
          <strong>{questionBankStats.total + dedicatedChallengerTotal}</strong>
          <span>कुल unique learning questions</span>
          <small>{questionBankStats.total} Practice + {dedicatedChallengerTotal} Challenger</small>
        </div>
      </div>

      {sessionState === 'setup' && (
        <>
          <section className="question-bank-performance-card">
            <div className="question-bank-performance-head">
              <div>
                <span className="question-bank-label">YOUR PROGRESS</span>
                <h2>आपकी Question Bank performance</h2>
                <p>
                  {progressSummary.totalAttempts
                    ? `${progressSummary.attemptedQuestions} अलग प्रश्नों पर ${progressSummary.totalAttempts} अभ्यास प्रयास दर्ज हैं।`
                    : 'अभी कोई Question Bank practice attempt दर्ज नहीं है। पहला set शुरू करके progress बनाइए।'}
                </p>
              </div>
              <span className="question-bank-last-practice">{formatDateTime(progressSummary.lastAttemptAt)}</span>
            </div>

            <div className="question-bank-performance-metrics">
              <div><b>{progressSummary.attemptedQuestions}</b><span>अलग प्रश्न</span></div>
              <div><b>{progressSummary.totalAttempts}</b><span>कुल प्रयास</span></div>
              <div><b>{progressSummary.correctAttempts}</b><span>सही प्रयास</span></div>
              <div><b>{progressSummary.incorrectAttempts}</b><span>गलत प्रयास</span></div>
              <div><b>{progressSummary.accuracy}%</b><span>accuracy</span></div>
            </div>

            <div className="question-bank-performance-tabs" role="tablist" aria-label="Question Bank performance breakdown">
              {([
                ['topic', 'विषयांश'],
                ['chapter', 'अध्याय'],
                ['difficulty', 'कठिनाई'],
              ] as Array<[PerformanceView, string]>).map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  className={performanceView === value ? 'active' : ''}
                  onClick={() => setPerformanceView(value)}
                  role="tab"
                  aria-selected={performanceView === value}
                >
                  {label}
                </button>
              ))}
            </div>

            {performanceRows.length ? (
              <div className="question-bank-performance-list">
                {performanceRows.map((bucket) => (
                  <div className="question-bank-performance-row" key={bucket.id}>
                    <div className="question-bank-performance-row-main">
                      <strong>{performanceView === 'difficulty' ? (difficultyLabels[bucket.id as Difficulty] ?? bucket.label) : bucket.label}</strong>
                      <span>{bucket.attemptedQuestions} प्रश्न · {bucket.totalAttempts} प्रयास</span>
                    </div>
                    <div className="question-bank-performance-bar" aria-hidden="true">
                      <span style={{ width: `${bucket.accuracy}%` }}></span>
                    </div>
                    <b className={bucket.accuracy < 60 ? 'weak' : bucket.accuracy < 80 ? 'average' : 'strong'}>{bucket.accuracy}%</b>
                  </div>
                ))}
              </div>
            ) : (
              <div className="question-bank-performance-empty">
                इस breakdown में अभी कोई practice data नहीं है।
              </div>
            )}
          </section>

          <section className="question-bank-filter-card">
            <div className="question-bank-section-title">
              <div>
                <span className="question-bank-label">FILTER & BUILD</span>
                <h2>अपना practice set बनाइए</h2>
              </div>
              <span className="question-bank-count">{availableCount} प्रश्न उपलब्ध</span>
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
                <span>{sessionKind === 'challenger' ? 'कठिनाई (Challenger में pool-locked)' : 'कठिनाई'}</span>
                <select disabled={sessionKind === 'challenger'} value={difficulty} onChange={(event) => setDifficulty(event.target.value as QuestionBankDifficultyFilter)}>
                  {(Object.entries(difficultyFilterLabels) as Array<[QuestionBankDifficultyFilter, string]>).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>

              <label className="question-bank-size-field">
                <span>प्रश्नों की संख्या</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={5}
                  max={maximumSessionSize}
                  step={1}
                  value={effectiveSessionSize}
                  onChange={(event) => setSessionSize(clampSessionSize(Number(event.target.value)))}
                  aria-label="कितने प्रश्न चाहिए"
                />
                <small>5–{maximumSessionSize} प्रश्न</small>
              </label>
            </div>

            <div className="question-bank-session-kind">
              <div>
                <span className="question-bank-label">PRACTICE TYPE</span>
                <strong>{sessionKind === 'challenger' ? 'Challenger Mode' : 'Practice Mode'}</strong>
                <p>
                  {sessionKind === 'challenger'
                    ? 'Dedicated Challenger pools only. These questions stay separate from the 895-question canonical practice bank and require at least 20 questions per selected scope.'
                    : 'Canonical Question Bank practice. Smart Practice can use your history; Random Practice remains available.'}
                </p>
              </div>
              <div className="question-bank-selection-toggle" role="group" aria-label="Practice type">
                <button type="button" className={sessionKind === 'practice' ? 'active' : ''} onClick={() => { setSessionKind('practice'); setSessionSize((value) => Math.min(100, Math.max(5, value))); }}>📘 Practice</button>
                <button type="button" className={sessionKind === 'challenger' ? 'active' : ''} onClick={() => { setSessionKind('challenger'); setSessionSize((value) => Math.min(100, Math.max(5, value))); }}>⚡ Challenger</button>
              </div>
            </div>

            {sessionKind === 'practice' && <div className="question-bank-selection-mode">
              <div>
                <span className="question-bank-label">SELECTION MODE</span>
                <strong>{selectionMode === 'smart' ? 'Smart Practice' : 'Random Practice'}</strong>
                <p>
                  {selectionMode === 'smart'
                    ? 'पहले unattempted प्रश्न, फिर कमजोर या लंबे समय से न दोहराए गए विषयांश और उपयुक्त difficulty को प्राथमिकता दी जाएगी।'
                    : 'उपलब्ध filtered questions में से random unique questions चुने जाएंगे।'}
                </p>
              </div>
              <div className="question-bank-selection-toggle" role="group" aria-label="Question selection mode">
                <button type="button" className={selectionMode === 'smart' ? 'active' : ''} onClick={() => setSelectionMode('smart')}>⚡ Smart</button>
                <button type="button" className={selectionMode === 'random' ? 'active' : ''} onClick={() => setSelectionMode('random')}>⌘ Random</button>
              </div>
            </div>}

            <div className="question-bank-size-presets" role="group" aria-label="Quick question count">
              {[10, 20, 30, 50, 75, 100].filter((size) => size <= maximumSessionSize).map((size) => (
                <button type="button" key={size} className={effectiveSessionSize === size ? 'active' : ''} onClick={() => setSessionSize(size)}>
                  {size}
                </button>
              ))}
            </div>

            <div className="question-bank-filter-summary">
              <div><b>{availableCount}</b><span>{sessionKind === 'challenger' ? 'dedicated Challenger questions' : 'matching questions'}</span></div>
              <div><b>{effectiveSessionSize}</b><span>requested session</span></div>
              <div><b>{sessionKind === 'challenger' ? (challengerScopeReady ? 'Ready' : '20+ required') : (practiceScopeReady ? 'Ready' : '5+ required')}</b><span>session status</span></div>
            </div>

            <button type="button" className="question-bank-start" disabled={!sessionReady} onClick={startPractice}>
              {sessionKind === 'challenger' ? '⚡ Challenger शुरू करें' : '▶ अभ्यास शुरू करें'}
            </button>
          </section>

          <section className="question-bank-info-grid">
            <article>
              <span>01</span>
              <div><strong>एक session में no duplicate IDs</strong><p>हर session canonical Question Bank से unique प्रश्न चुनता है।</p></div>
            </article>
            <article>
              <span>02</span>
              <div><strong>Navigator + review marking</strong><p>हर प्रश्न पर सीधे जा सकते हैं, प्रश्नों को review के लिए चिह्नित कर सकते हैं और उत्तर साफ कर सकते हैं।</p></div>
            </article>
            <article>
              <span>03</span>
              <div><strong>Check + explanation</strong><p>उत्तर जाँचने के बाद सही/गलत feedback और उपलब्ध explanation उसी प्रश्न पर दिखती है।</p></div>
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
            <div className="question-bank-practice-head-actions">
              <button type="button" className={'question-bank-secondary ' + (markedForReview[currentQuestion.id] ? 'active' : '')} onClick={toggleMarked}>
                {markedForReview[currentQuestion.id] ? '★ समीक्षा चिह्नित' : '☆ समीक्षा के लिए चिह्नित करें'}
              </button>
              <button type="button" className="question-bank-secondary question-bank-submit" onClick={() => setShowFinishConfirm(true)}>
                सत्र जमा करें
              </button>
            </div>
          </div>

          <div className="question-bank-progress-strip">
            <div><b>{answeredCount}</b><span>उत्तर दिए</span></div>
            <div><b>{unansweredCount}</b><span>अनुत्तरित</span></div>
            <div><b>{markedCount}</b><span>समीक्षा</span></div>
            <div><b>{checkedCount}</b><span>जाँचे गए</span></div>
          </div>

          <div className="question-bank-palette" aria-label="Question navigator">
            <div className="question-bank-palette-head">
              <strong>प्रश्न नेविगेटर</strong>
              <span>नीला = वर्तमान · भरा = उत्तर दिया · ★ = समीक्षा</span>
            </div>
            <div className="question-bank-palette-grid">
              {session.map((question, index) => {
                const answered = (answers[question.id] ?? []).length > 0;
                const marked = markedForReview[question.id];
                return (
                  <button
                    type="button"
                    key={question.id}
                    className={[
                      'question-bank-palette-btn',
                      index === currentIndex ? 'current' : '',
                      answered ? 'answered' : '',
                      marked ? 'marked' : '',
                      checked[question.id] ? 'checked' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={() => goToQuestion(index)}
                    aria-label={`प्रश्न ${index + 1}${answered ? ', उत्तर दिया' : ', अनुत्तरित'}${marked ? ', समीक्षा चिह्नित' : ''}`}
                  >
                    {index + 1}
                    {marked && <span aria-hidden="true">★</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {restoredFromSavedSession && (
            <div className="question-bank-resume-notice">
              ↻ पिछला Question Bank session resume किया गया है। आपके answers और current position सुरक्षित हैं।
            </div>
          )}

          <article className="question-bank-question-card">
            <div className="question-bank-practice-intelligence">
              <span>{sessionKind === 'challenger' ? '⚡ Challenger' : selectionMode === 'smart' ? '⚡ Smart practice' : '⌘ Random practice'}</span>
              {selectionMode === 'smart' && currentQuestionPerformance && currentQuestionPerformance.totalAttempts > 0
                ? <span>इस प्रश्न के लिए {getSelectionRationale({
                    questionId: currentQuestion.id,
                    topicId: currentQuestion.topicId,
                    attempts: currentQuestionPerformance.totalAttempts,
                    accuracy: currentQuestionPerformance.accuracy,
                    lastAttemptAt: currentQuestionPerformance.lastAttempt?.timestamp ?? null,
                    daysSinceAttempt: currentQuestionPerformance.lastAttempt ? Math.max(0, (Date.now() - currentQuestionPerformance.lastAttempt.timestamp) / (24 * 60 * 60 * 1000)) : null,
                    needScore: 0,
                    difficultyFit: 0,
                  })}</span>
                : selectionMode === 'smart' ? <span>Smart engine इस set को आपके practice history के अनुसार संतुलित कर रहा है।</span> : <span>Random set — हर session में unique questions.</span>}
            </div>

            <div className="question-bank-question-meta">
              <span>{currentQuestion.id}</span>
              <span>{checked[currentQuestion.id] ? 'उत्तर जाँचा गया' : currentQuestion.type === 'multiple-select' ? 'एक से अधिक विकल्प चुनें' : 'एक विकल्प चुनें'}</span>
            </div>

            {currentQuestionPerformance && currentQuestionPerformance.totalAttempts > 0 && (
              <div className="question-bank-question-history">
                <span>इस प्रश्न का इतिहास</span>
                <b>{currentQuestionPerformance.accuracy}% accuracy</b>
                <span>{currentQuestionPerformance.totalAttempts} attempts · {currentQuestionPerformance.correctAttempts} सही · {currentQuestionPerformance.incorrectAttempts} गलत</span>
              </div>
            )}

            <div className="question-bank-question-text">
              {cleanBlocks(currentQuestion, 'text').split('\n').map((line, index) => (
                <p key={index}><MathAwareText text={line} /></p>
              ))}
            </div>

            <Link
              className="question-bank-report-button"
              to={`/contact?from=question-bank&questionId=${encodeURIComponent(currentQuestion.id)}&subjectId=${encodeURIComponent(currentQuestion.subjectId)}&chapterId=${encodeURIComponent(currentQuestion.chapterId)}&topicId=${encodeURIComponent(currentQuestion.topicId)}`}
            >
              ⚠️ इस प्रश्न में समस्या बताएं
            </Link>

            <div className="question-bank-options">
              {currentQuestion.options.map((option, index) => {
                const selected = answerFor.includes(option.id);
                const correctOption = currentQuestion.correctOptionIds.includes(option.id);
                const showFeedback = checked[currentQuestion.id];
                const feedbackClass = showFeedback
                  ? (correctOption ? 'correct-option' : selected ? 'incorrect-option' : '')
                  : '';

                return (
                  <button
                    type="button"
                    key={option.id}
                    disabled={reviewOnly || checked[currentQuestion.id]}
                    className={'question-bank-option ' + (selected ? 'selected ' : '') + feedbackClass}
                    onClick={() => selectAnswer(option.id)}
                    aria-pressed={selected}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    <MathAwareText text={option.text} />
                    {showFeedback && correctOption && <em>✓ सही</em>}
                    {showFeedback && selected && !correctOption && <em>× आपका चयन</em>}
                  </button>
                );
              })}
            </div>

            <div className="question-bank-answer-tools">
              <button type="button" className="question-bank-tool" disabled={reviewOnly || !answerFor.length || checked[currentQuestion.id]} onClick={checkAnswer}>
                ✓ उत्तर जाँचें
              </button>
              <button type="button" className="question-bank-tool" disabled={reviewOnly || !answerFor.length} onClick={clearResponse}>
                ↺ उत्तर साफ करें
              </button>
              {checked[currentQuestion.id] && (
                <button type="button" className="question-bank-tool" disabled={reviewOnly} onClick={editCheckedAnswer}>
                  ✎ उत्तर बदलें
                </button>
              )}
            </div>

            {checked[currentQuestion.id] && (
              <div className={'question-bank-feedback ' + (sameAnswers(answerFor, currentQuestion.correctOptionIds) ? 'correct' : 'incorrect')}>
                <strong>{sameAnswers(answerFor, currentQuestion.correctOptionIds) ? 'सही उत्तर' : 'उत्तर सही नहीं है'}</strong>
                <p>सही विकल्प: <b>{getOptionText(currentQuestion, currentQuestion.correctOptionIds)}</b></p>
                {cleanBlocks(currentQuestion, 'explanation') && (
                  <div className="question-bank-explanation">
                    <span>व्याख्या</span>
                    {cleanBlocks(currentQuestion, 'explanation').split('\n').map((line, index) => (
                      <p key={index}><MathAwareText text={line} /></p>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="question-bank-practice-actions">
              <button type="button" className="question-bank-secondary" disabled={currentIndex === 0} onClick={() => setCurrentIndex((value) => value - 1)}>
                ← पिछला
              </button>
              <div className="question-bank-practice-actions-center">
                <span>प्रश्न {currentIndex + 1} / {session.length}</span>
                {markedForReview[currentQuestion.id] && <b>★ समीक्षा</b>}
              </div>
              {currentIndex === session.length - 1
                ? <button type="button" className="question-bank-start" onClick={() => setShowFinishConfirm(true)}>सत्र जमा करें →</button>
                : <button type="button" className="question-bank-start" onClick={() => setCurrentIndex((value) => value + 1)}>अगला प्रश्न →</button>}
            </div>
          </article>
        </section>
      )}

      {sessionState === 'finished' && (
        <section className="question-bank-finished">
          <span className="question-bank-label">SESSION COMPLETE</span>
          <h2>{sessionKind === 'challenger' ? 'Challenger सत्र पूरा हुआ' : 'अभ्यास सत्र पूरा हुआ'}</h2>
          <div className="question-bank-score">{score}<span> / {session.length}</span></div>
          <p>आपकी accuracy: <strong>{session.length ? Math.round((score / session.length) * 100) : 0}%</strong></p>

          <div className="question-bank-result-grid">
            <div><b>{session.length}</b><span>कुल प्रश्न</span></div>
            <div><b>{answeredCount}</b><span>attempted</span></div>
            <div><b>{unansweredCount}</b><span>unanswered</span></div>
            <div><b>{correctCount}</b><span>सही</span></div>
            <div><b>{incorrectCount}</b><span>गलत</span></div>
            <div><b>{markedCount}</b><span>review marked</span></div>
          </div>

          <div className="question-bank-finished-actions">
            <button type="button" className="question-bank-start" onClick={() => { setCurrentIndex(0); setRestoredFromSavedSession(false); setChecked(Object.fromEntries(session.map((question) => [question.id, true]))); setReviewOnly(true); setSessionState('practice'); }}>
              प्रश्न समीक्षा खोलें
            </button>
            <button type="button" className="question-bank-secondary" onClick={() => { setReviewOnly(false); setAnswers({}); setMarkedForReview({}); setChecked({}); setCurrentIndex(0); setAttemptsRecorded(false); setSessionStartedAt(Date.now()); setRestoredFromSavedSession(false); setSessionState('practice'); }}>
              यही set फिर से करें
            </button>
            <button type="button" className="question-bank-secondary" onClick={resetSetup}>
              नया Question Bank set
            </button>
          </div>

          <div className="question-bank-result-list">
            <div className="question-bank-result-list-head">
              <div>
                <span className="question-bank-label">REVIEW</span>
                <h3>हर प्रश्न का परिणाम</h3>
              </div>
              <span>{session.length} प्रश्न</span>
            </div>

            {session.map((question, index) => {
              const selected = answers[question.id] ?? [];
              const answered = selected.length > 0;
              const correct = answered && sameAnswers(selected, question.correctOptionIds);
              return (
                <article key={question.id} className="question-bank-result-item">
                  <div className="question-bank-result-item-head">
                    <strong>प्रश्न {index + 1}</strong>
                    <span className={correct ? 'result-correct' : answered ? 'result-incorrect' : 'result-unanswered'}>
                      {correct ? 'सही' : answered ? 'गलत' : 'अनुत्तरित'}
                    </span>
                  </div>
                  <p className="question-bank-result-question">{cleanBlocks(question, 'text')}</p>
                  <p><b>आपका उत्तर:</b> {answered ? getOptionText(question, selected) : 'अनुत्तरित'}</p>
                  <p><b>सही उत्तर:</b> {getOptionText(question, question.correctOptionIds)}</p>
                  {cleanBlocks(question, 'explanation') && (
                    <details>
                      <summary>व्याख्या देखें</summary>
                      {cleanBlocks(question, 'explanation').split('\n').map((line, lineIndex) => (
                        <p key={lineIndex}><MathAwareText text={line} /></p>
                      ))}
                    </details>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      )}

      {showFinishConfirm && sessionState === 'practice' && (
        <div className="question-bank-dialog-backdrop" role="presentation">
          <div className="question-bank-dialog" role="dialog" aria-modal="true" aria-labelledby="question-bank-finish-title">
            <span className="question-bank-label">SUBMIT SESSION</span>
            <h2 id="question-bank-finish-title">क्या आप सत्र जमा करना चाहते हैं?</h2>
            <p>जमा करने के बाद यह practice session परिणाम के रूप में दिखाई देगा।</p>
            <div className="question-bank-dialog-stats">
              <div><b>{answeredCount}</b><span>उत्तर दिए</span></div>
              <div><b>{unansweredCount}</b><span>अनुत्तरित</span></div>
              <div><b>{markedCount}</b><span>समीक्षा चिह्नित</span></div>
            </div>
            {unansweredCount > 0 && <div className="question-bank-dialog-warning">अभी {unansweredCount} प्रश्न अनुत्तरित हैं। जमा करने से पहले आप उन्हें navigator से खोल सकते हैं।</div>}
            <div className="question-bank-dialog-actions">
              <button type="button" className="question-bank-secondary" onClick={() => setShowFinishConfirm(false)}>वापस जाएँ</button>
              <button type="button" className="question-bank-start" onClick={finishSession}>हाँ, सत्र जमा करें</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBankPage;
