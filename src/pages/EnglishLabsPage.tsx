import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { translationLabItems, translationLevels, vocabularyLabItems, vocabularyLevels, type TranslationDirection } from '../data/englishLabs';
import { useProgressStore } from '../store/progress';
import type { ID } from '../types';

const normalize = (value: string) =>
  value.toLowerCase().trim()
    .replace(/[’']/g, "'")
    .replace(/[.!?।,:;]+$/g, '')
    .replace(/\s+/g, ' ');

const matchesTranslation = (answer: string, acceptable: string[]) => {
  const normalized = normalize(answer);
  return normalized.length > 0 && acceptable.some((candidate) => normalize(candidate) === normalized);
};

const labLevelFor = (index: number, length: number) => Math.min(length - 1, Math.floor(index / Math.max(1, Math.ceil(length / 6))));

const shuffle = <T,>(items: T[], seed: number): T[] => {
  const copy = [...items];
  let state = seed >>> 0;
  for (let i = copy.length - 1; i > 0; i -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="app-shell">
    <main className="shell">{children}</main>
  </div>
);

const LabHeader = ({ title, subtitle, backTo = '/subjects/sub_eng' }: { title: string; subtitle: string; backTo?: string }) => (
  <div className="english-lab-header">
    <Link to={backTo} className="english-lab-back">← अंग्रेज़ी तैयारी केंद्र</Link>
    <span className="eyebrow">ENGLISH MASTERY LAB</span>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
);

const TranslationLab = () => {
  const p = useProgressStore();
  const [direction, setDirection] = useState<TranslationDirection>('hi-en');
  const [level, setLevel] = useState(1);
  const [session, setSession] = useState(0);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const pool = useMemo(() => {
    const filtered = translationLabItems.filter((item) => item.level === level && item.direction === direction);
    return shuffle(filtered, 4100 + session * 97 + level * 31 + (direction === 'en-hi' ? 7 : 0));
  }, [direction, level, session]);

  const item = pool[index % Math.max(1, pool.length)];
  const attempted = Object.values(p.englishLabAttempts ?? {}).flat().filter((a) => a.mode === 'translation').length;
  const correctCount = Object.values(p.englishLabAttempts ?? {}).flat().filter((a) => a.mode === 'translation' && a.correct).length;

  const resetQuestion = () => {
    setAnswer('');
    setChecked(false);
    setCorrect(false);
    setShowHint(false);
  };

  const next = () => {
    if (!pool.length) return;
    if (index + 1 >= pool.length) {
      setSession((value) => value + 1);
      setIndex(0);
    } else {
      setIndex((value) => value + 1);
    }
    resetQuestion();
  };

  const check = () => {
    if (!item || checked) return;
    const isCorrect = matchesTranslation(answer, item.acceptableAnswers);
    setCorrect(isCorrect);
    setChecked(true);
    p.recordEnglishLabAttempt(item.id, {
      id: item.id,
      correct: isCorrect,
      timestamp: Date.now(),
      mode: 'translation',
    });
  };

  return (
    <Shell>
      <LabHeader
        title="Endless Translation Lab"
        subtitle="Hindi → English से शुरुआत करें, फिर English → Hindi और कठिन levels की ओर बढ़ें। हर answer के बाद कारण और grammar point देखें।"
      />
      <div className="english-lab-toolbar">
        <div className="english-lab-toggle">
          <button className={direction === 'hi-en' ? 'active' : ''} onClick={() => { setDirection('hi-en'); setIndex(0); setSession((x) => x + 1); resetQuestion(); }}>Hindi → English</button>
          <button className={direction === 'en-hi' ? 'active' : ''} onClick={() => { setDirection('en-hi'); setIndex(0); setSession((x) => x + 1); resetQuestion(); }}>English → Hindi</button>
        </div>
        <div className="english-lab-stats"><span>{attempted} attempts</span><span>{attempted ? Math.round((correctCount / attempted) * 100) : 0}% accuracy</span></div>
      </div>

      <div className="english-lab-levels">
        {translationLevels.map((entry) => (
          <button key={entry.level} className={level === entry.level ? 'active' : ''} onClick={() => { setLevel(entry.level); setIndex(0); setSession((x) => x + 1); resetQuestion(); }}>
            <b>Level {entry.level}</b><span>{entry.title}</span><small>{entry.hindi}</small>
          </button>
        ))}
      </div>

      <div className="english-lab-layout">
        <aside className="english-lab-side card">
          <b>इस lab में कैसे सीखें</b>
          <ol>
            <li>पहले अपना उत्तर खुद लिखें।</li>
            <li>जरूरत हो तो hint लें।</li>
            <li>Check करके सही answer और कारण पढ़ें।</li>
            <li>गलत item को दोबारा practice करें।</li>
          </ol>
          <div className="english-lab-rule"><b>Mastery rule</b><span>पहले meaning → फिर grammar → फिर natural English.</span></div>
        </aside>

        <section className="english-lab-card card">
          {!item ? <p>इस level के लिए अभी items उपलब्ध नहीं हैं।</p> : <>
            <div className="english-lab-question-head"><span>Level {level}</span><span>Question {index + 1} / {pool.length}</span></div>
            <div className="english-translation-prompt">
              <small>{direction === 'hi-en' ? 'इसका English translation लिखें' : 'इसका Hindi अर्थ लिखें'}</small>
              <h2>{item.prompt}</h2>
            </div>
            <textarea
              className="english-lab-answer"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder={direction === 'hi-en' ? 'अपना English sentence यहाँ लिखें…' : 'अपना हिन्दी अर्थ यहाँ लिखें…'}
              disabled={checked}
              rows={4}
            />
            <div className="english-lab-actions">
              <button className="btn" onClick={() => setShowHint((value) => !value)}>{showHint ? 'Hint छिपाएँ' : '💡 Hint'}</button>
              {!checked ? <button className="btn primary" disabled={!answer.trim()} onClick={check}>उत्तर जाँचें</button> : <button className="btn primary" onClick={next}>अगला प्रश्न →</button>}
            </div>
            {showHint && !checked && <div className="english-lab-feedback hint"><b>Hint</b><p>{item.hint}</p></div>}
            {checked && <div className={'english-lab-feedback ' + (correct ? 'correct' : 'wrong')}>
              <strong>{correct ? '✓ सही' : 'अभी सही नहीं'}</strong>
              <div><b>सही उत्तर</b><p>{item.displayAnswer}</p></div>
              <div><b>क्यों?</b><p>{item.explanation}</p></div>
              <div><b>Grammar point</b><p>{item.grammarPoint}</p></div>
              {!correct && <button className="btn" onClick={() => { setAnswer(''); setChecked(false); setShowHint(false); }}>फिर से प्रयास करें</button>}
            </div>}
          </>}
        </section>
      </div>

      <div className="english-lab-next">
        <Link className="btn" to="/english-vocabulary-lab">📚 Vocabulary Lab →</Link>
        <Link className="btn" to="/english-smart-practice">🎯 Smart Practice →</Link>
        <Link className="btn" to="/english-mock-test">⏱ English Mock →</Link>
      </div>
    </Shell>
  );
};

const VocabularyLab = () => {
  const p = useProgressStore();
  const [level, setLevel] = useState<typeof vocabularyLevels[number]['id']>('beginner');
  const [mode, setMode] = useState<'meaning' | 'reverse' | 'synonym' | 'antonym' | 'context'>('meaning');
  const [session, setSession] = useState(0);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);

  const pool = useMemo(() => shuffle(vocabularyLabItems.filter((item) => item.level === level), 9100 + session * 71 + level.length * 13), [level, session]);
  const item = pool[index % Math.max(1, pool.length)];
  const options = useMemo(() => {
    if (!item) return [];
    const candidates = vocabularyLabItems.filter((candidate) => candidate.id !== item.id);
    const distractors = shuffle(candidates, 1000 + index * 37 + session * 11).slice(0, 3);
    if (mode === 'synonym') return shuffle([item.synonyms[0] ?? item.word, ...distractors.map((x) => x.synonyms[0] ?? x.word)], 44 + index);
    if (mode === 'antonym') return shuffle([item.antonyms[0] ?? item.word, ...distractors.map((x) => x.antonyms[0] ?? x.word)], 45 + index);
    return shuffle([item.meaning, ...distractors.map((x) => x.meaning)], 46 + index);
  }, [item, index, mode, session]);

  const attempted = Object.values(p.englishLabAttempts ?? {}).flat().filter((a) => a.mode === 'vocabulary').length;
  const correctCount = Object.values(p.englishLabAttempts ?? {}).flat().filter((a) => a.mode === 'vocabulary' && a.correct).length;

  const targetAnswer = mode === 'meaning' || mode === 'context' ? item?.meaning ?? '' : mode === 'synonym' ? item?.synonyms[0] ?? '' : item?.antonyms[0] ?? '';
  const prompt = !item ? '' : mode === 'meaning'
    ? item.word
    : mode === 'reverse'
      ? item.meaning
      : mode === 'synonym'
        ? item.word
        : mode === 'antonym'
          ? item.word
          : item.sentence;

  const next = () => {
    if (index + 1 >= pool.length) {
      setSession((value) => value + 1);
      setIndex(0);
    } else setIndex((value) => value + 1);
    setSelected('');
    setChecked(false);
  };

  const check = () => {
    if (!item || checked || !selected) return;
    const isCorrect = normalize(selected) === normalize(targetAnswer);
    setChecked(true);
    p.recordEnglishLabAttempt(item.id + ':' + mode, { id: item.id + ':' + mode, correct: isCorrect, timestamp: Date.now(), mode: 'vocabulary' });
  };

  return (
    <Shell>
      <LabHeader
        title="Vocabulary Lab"
        subtitle="शब्दों को केवल याद नहीं करना है—meaning, synonym, antonym और context में पहचानना है।"
      />
      <div className="english-lab-toolbar">
        <div className="english-lab-toggle">
          {(['meaning','reverse','synonym','antonym','context'] as const).map((value) => (
            <button key={value} className={mode === value ? 'active' : ''} onClick={() => { setMode(value); setIndex(0); setSession((x) => x + 1); setSelected(''); setChecked(false); }}>
              {value === 'meaning' ? 'Word → Hindi' : value === 'reverse' ? 'Hindi → Word' : value === 'synonym' ? 'Synonym' : value === 'antonym' ? 'Antonym' : 'Context'}
            </button>
          ))}
        </div>
        <div className="english-lab-stats"><span>{attempted} attempts</span><span>{attempted ? Math.round((correctCount / attempted) * 100) : 0}% accuracy</span></div>
      </div>

      <div className="english-lab-levels vocabulary">
        {vocabularyLevels.map((entry) => (
          <button key={entry.id} className={level === entry.id ? 'active' : ''} onClick={() => { setLevel(entry.id); setIndex(0); setSession((x) => x + 1); setSelected(''); setChecked(false); }}>
            <b>{entry.title}</b><small>{entry.hindi}</small>
          </button>
        ))}
      </div>

      <section className="english-vocab-card card">
        {!item ? <p>इस level के लिए items उपलब्ध नहीं हैं।</p> : <>
          <div className="english-lab-question-head"><span>{level}</span><span>Question {index + 1} / {pool.length}</span></div>
          <div className="english-vocab-prompt"><small>{mode === 'meaning' ? 'इस शब्द का हिन्दी अर्थ चुनें' : mode === 'reverse' ? 'इस हिन्दी अर्थ के लिए सही English word चुनें' : mode === 'synonym' ? 'सही synonym चुनें' : mode === 'antonym' ? 'सही antonym चुनें' : 'Sentence में दिए शब्द का contextual meaning चुनें'}</small><h2>{prompt}</h2></div>
          <div className="english-vocab-options">
            {options.map((option) => <button key={option} className={selected === option ? 'selected' : ''} onClick={() => !checked && setSelected(option)}>{option}</button>)}
          </div>
          <div className="english-lab-actions">
            {!checked ? <button className="btn primary" disabled={!selected} onClick={check}>उत्तर जाँचें</button> : <button className="btn primary" onClick={next}>अगला शब्द →</button>}
          </div>
          {checked && <div className={'english-lab-feedback ' + (normalize(selected) === normalize(targetAnswer) ? 'correct' : 'wrong')}>
            <strong>{normalize(selected) === normalize(targetAnswer) ? '✓ सही' : 'अभी सही नहीं'}</strong>
            <p><b>सही उत्तर:</b> {targetAnswer}</p>
            <p><b>Sentence:</b> {item.sentence}</p>
            <p><b>Context:</b> {item.contextMeaning}</p>
            <p><b>Synonyms:</b> {item.synonyms.length ? item.synonyms.join(', ') : '—'} · <b>Antonyms:</b> {item.antonyms.length ? item.antonyms.join(', ') : '—'}</p>
          </div>}
        </>}
      </section>

      <div className="english-lab-next">
        <Link className="btn" to="/english-translation-lab">↔ Translation Lab</Link>
        <Link className="btn" to="/english-smart-practice">🎯 Smart Practice</Link>
      </div>
    </Shell>
  );
};

export const EnglishTranslationLabPage = TranslationLab;
export const EnglishVocabularyLabPage = VocabularyLab;
