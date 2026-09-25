import '../question-bank.css';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MathAwareText } from '../components/MathText';
import { questionBank, questionBankStats, questionBankTaxonomy } from '../data/questionBank';
import { useProgressStore } from '../store/progress';
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
  const [markedForReview, setMarkedForReview] = useState<Record<ID, boolean>>({});
  const [checked, setChecked] = useState<Record<ID, boolean>>({});
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [attemptsRecorded, setAttemptsRecorded] = useState(false);

  const recordAttempts = useProgressStore((state) => state.recordAttempts);

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

  const startPractice = () => {
    const nextSession = getUniqueQuestions(filteredQuestions, sessionSize);
    if (!nextSession.length) return;
    setSession(nextSession);
    setAnswers({});
    setMarkedForReview({});
    setChecked({});
    setCurrentIndex(0);
    setShowFinishConfirm(false);
    setAttemptsRecorded(false);
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
    setSessionState('setup');
  };

  const selectAnswer = (optionId: ID) => {
    if (!currentQuestion || checked[currentQuestion.id]) return;
    const next = currentQuestion.type === 'multiple-select'
      ? (answerFor.includes(optionId)
          ? answerFor.filter((id) => id !== optionId)
          : [...answerFor, optionId])
      : [optionId];
    setAnswers((current) => ({ ...current, [currentQuestion.id]: next }));
  };

  const clearResponse = () => {
    if (!currentQuestion) return;
    setAnswers((current) => ({ ...current, [currentQuestion.id]: [] }));
    setChecked((current) => ({ ...current, [currentQuestion.id]: false }));
  };

  const checkAnswer = () => {
    if (!currentQuestion || !answerFor.length) return;
    setChecked((current) => ({ ...current, [currentQuestion.id]: true }));
  };

  const editCheckedAnswer = () => {
    if (!currentQuestion) return;
    setChecked((current) => ({ ...current, [currentQuestion.id]: false }));
  };

  const toggleMarked = () => {
    if (!currentQuestion) return;
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
              mode: 'practice' as const,
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
          <span className="question-bank-eyebrow">QUESTION BANK • PHASE 3</span>
          <h1>Question Bank</h1>
          <p>विषय, अध्याय, विषयांश और कठिनाई के अनुसार प्रश्न चुनें और structured practice session चलाएँ।</p>
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
              <div><b>{filteredQuestions.length ? 'Ready' : 'Empty'}</b><span>session status</span></div>
            </div>

            <button type="button" className="question-bank-start" disabled={!filteredQuestions.length} onClick={startPractice}>
              ▶ अभ्यास शुरू करें
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

          <article className="question-bank-question-card">
            <div className="question-bank-question-meta">
              <span>{currentQuestion.id}</span>
              <span>{checked[currentQuestion.id] ? 'उत्तर जाँचा गया' : currentQuestion.type === 'multiple-select' ? 'एक से अधिक विकल्प चुनें' : 'एक विकल्प चुनें'}</span>
            </div>

            <div className="question-bank-question-text">
              {cleanBlocks(currentQuestion, 'text').split('\n').map((line, index) => (
                <p key={index}><MathAwareText text={line} /></p>
              ))}
            </div>

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
                    disabled={checked[currentQuestion.id]}
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
              <button type="button" className="question-bank-tool" disabled={!answerFor.length || checked[currentQuestion.id]} onClick={checkAnswer}>
                ✓ उत्तर जाँचें
              </button>
              <button type="button" className="question-bank-tool" disabled={!answerFor.length} onClick={clearResponse}>
                ↺ उत्तर साफ करें
              </button>
              {checked[currentQuestion.id] && (
                <button type="button" className="question-bank-tool" onClick={editCheckedAnswer}>
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
          <h2>अभ्यास सत्र पूरा हुआ</h2>
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
            <button type="button" className="question-bank-start" onClick={() => { setCurrentIndex(0); setSessionState('practice'); }}>
              प्रश्न समीक्षा खोलें
            </button>
            <button type="button" className="question-bank-secondary" onClick={() => { setAnswers({}); setMarkedForReview({}); setChecked({}); setCurrentIndex(0); setAttemptsRecorded(false); setSessionState('practice'); }}>
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
