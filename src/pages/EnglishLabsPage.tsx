import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { translationLevels, vocabularyLabItems, vocabularyLevels, type TranslationDirection } from '../data/englishLabs';
import { generateTranslationItem, generateVocabularyItem } from '../data/englishLabGenerator';
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


const LabModeToggle = ({ mode, onChange }: { mode: 'learn' | 'practice'; onChange: (value: 'learn' | 'practice') => void }) => (
  <div className="english-lab-mode-switch" role="tablist" aria-label="Learning mode">
    <button className={mode === 'learn' ? 'active' : ''} onClick={() => onChange('learn')} role="tab" aria-selected={mode === 'learn'}>
      📖 Learn & Examples
    </button>
    <button className={mode === 'practice' ? 'active' : ''} onClick={() => onChange('practice')} role="tab" aria-selected={mode === 'practice'}>
      🎯 Practice
    </button>
  </div>
);

const TranslationLearn = ({
  level,
  setLevel,
  direction,
}: {
  level: number;
  setLevel: (value: number) => void;
  direction: TranslationDirection;
}) => {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(true);

  const example = useMemo(
    () => generateTranslationItem(level, direction, 7200 + level * 1009 + exampleIndex * 131),
    [direction, level, exampleIndex],
  );

  const nextExample = () => {
    setExampleIndex((value) => value + 1);
    setShowAnswer(true);
  };

  return (
    <section className="english-learn-panel">
      <div className="english-learn-intro">
        <div>
          <span className="eyebrow">TRANSLATION EXAMPLE STREAM</span>
          <h2>पहले examples समझें, फिर translation practice करें</h2>
          <p>हर example में source sentence, natural translation, grammar structure और sentence बनाने के steps देखें। Next दबाते रहें—यह learning stream खत्म नहीं होती।</p>
        </div>
        <div className="english-learn-progress">
          <b>Example {exampleIndex + 1}</b>
          <span>ENDLESS</span>
        </div>
      </div>

      <div className="english-learn-controls">
        <div className="english-lab-toggle">
          <button className={direction === 'hi-en' ? 'active' : ''} disabled>Hindi → English</button>
          <button className={direction === 'en-hi' ? 'active' : ''} disabled>English → Hindi</button>
        </div>
        <div className="english-lab-levels compact">
          {translationLevels.map((entry) => (
            <button
              key={entry.level}
              className={level === entry.level ? 'active' : ''}
              onClick={() => { setLevel(entry.level); setExampleIndex(0); setShowAnswer(true); }}
            >
              <b>Level {entry.level}</b><span>{entry.title}</span>
            </button>
          ))}
        </div>
      </div>

      {!example ? <p>इस level के लिए example उपलब्ध नहीं है।</p> : (
        <div className="english-example-card">
          <div className="english-example-label">Example {exampleIndex + 1} · Level {level}</div>
          <div className="english-example-source">
            <small>{direction === 'hi-en' ? 'Hindi sentence' : 'English sentence'}</small>
            <h3>{example.prompt}</h3>
          </div>

          {showAnswer ? (
            <div className="english-example-answer">
              <small>{direction === 'hi-en' ? 'Natural English' : 'Natural Hindi'}</small>
              <h3>{example.displayAnswer}</h3>
              <div className="english-example-grid">
                <div><b>Grammar structure</b><p>{example.grammarPoint}</p></div>
                <div><b>क्यों सही है?</b><p>{example.explanation}</p></div>
              </div>
              {example.buildSteps && (
                <div className="english-lab-build">
                  <b>Sentence बनाने के steps</b>
                  <ol>{example.buildSteps.map((step) => <li key={step}>{step}</li>)}</ol>
                </div>
              )}
              <div className="english-example-hint"><b>Study habit:</b> example को एक बार पढ़ें, फिर बिना देखे उसकी structure बोलने की कोशिश करें।</div>
            </div>
          ) : (
            <div className="english-example-hidden">
              पहले खुद translation बोलें/लिखें, फिर नीचे answer खोलें।
            </div>
          )}

          <div className="english-lab-actions">
            <button className="btn" onClick={() => setShowAnswer((value) => !value)}>
              {showAnswer ? '🙈 Answer छिपाएँ' : '👀 Answer दिखाएँ'}
            </button>
            <button className="btn primary" onClick={nextExample}>अगला example →</button>
          </div>
        </div>
      )}
    </section>
  );
};

const VocabularyLearn = ({
  level,
  setLevel,
}: {
  level: typeof vocabularyLevels[number]['id'];
  setLevel: (value: typeof vocabularyLevels[number]['id']) => void;
}) => {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(true);

  const word = useMemo(
    () => generateVocabularyItem(level, 15000 + exampleIndex * 97, vocabularyLabItems),
    [level, exampleIndex],
  );

  const nextWord = () => {
    setExampleIndex((value) => value + 1);
    setShowMeaning(true);
  };

  return (
    <section className="english-learn-panel vocab-learn-panel">
      <div className="english-learn-intro">
        <div>
          <span className="eyebrow">VOCABULARY MEMORY STREAM</span>
          <h2>Word → Meaning → Example → Revision</h2>
          <p>हर word को हिन्दी meaning, synonyms, antonyms और एक fresh context sentence के साथ याद करें। Next दबाकर लगातार नए revision cards देखें।</p>
        </div>
        <div className="english-learn-progress">
          <b>Word {exampleIndex + 1}</b>
          <span>ENDLESS</span>
        </div>
      </div>

      <div className="english-lab-levels vocabulary compact">
        {vocabularyLevels.map((entry) => (
          <button
            key={entry.id}
            className={level === entry.id ? 'active' : ''}
            onClick={() => { setLevel(entry.id); setExampleIndex(0); setShowMeaning(true); }}
          >
            <b>{entry.title}</b><small>{entry.hindi}</small>
          </button>
        ))}
      </div>

      {!word ? <p>इस level के लिए word उपलब्ध नहीं है।</p> : (
        <div className="english-memory-card">
          <div className="english-example-label">{level.toUpperCase()} · Word {exampleIndex + 1}</div>
          <div className="english-memory-word">{word.word}</div>
          {showMeaning ? (
            <>
              <div className="english-memory-meaning">
                <small>हिन्दी meaning</small>
                <strong>{word.meaning}</strong>
              </div>
              <div className="english-memory-grid">
                <div><b>Synonyms</b><p>{word.synonyms.length ? word.synonyms.join(', ') : '—'}</p></div>
                <div><b>Antonyms</b><p>{word.antonyms.length ? word.antonyms.join(', ') : '—'}</p></div>
              </div>
              <div className="english-memory-example">
                <small>Example sentence</small>
                <p>{word.sentence}</p>
                <span>{word.contextMeaning}</span>
              </div>
              <div className="english-memory-tip">
                <b>याद रखने का तरीका</b>
                <p>Word को हिन्दी meaning से जोड़ें → sentence में बोलें → आँखें बंद करके meaning recall करें → फिर अगला word लें।</p>
              </div>
            </>
          ) : (
            <div className="english-example-hidden">पहले “meaning दिखाएँ” से पहले word का अर्थ खुद याद करें।</div>
          )}
          <div className="english-lab-actions">
            <button className="btn" onClick={() => setShowMeaning((value) => !value)}>
              {showMeaning ? '🙈 Meaning छिपाएँ' : '🧠 Meaning दिखाएँ'}
            </button>
            <button className="btn primary" onClick={nextWord}>अगला word →</button>
          </div>
        </div>
      )}
    </section>
  );
};

const TranslationLab = () => {
  const p = useProgressStore();
  const [direction, setDirection] = useState<TranslationDirection>('hi-en');
  const [level, setLevel] = useState(1);
  const [session, setSession] = useState(0);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);\n  const [labMode, setLabMode] = useState<'learn' | 'practice'>('learn');

  const item = useMemo(
    () => generateTranslationItem(level, direction, 4100 + session * 100000 + index * 97),
    [direction, level, session, index],
  );
  const attempted = Object.values(p.englishLabAttempts ?? {}).flat().filter((a) => a.mode === 'translation').length;
  const correctCount = Object.values(p.englishLabAttempts ?? {}).flat().filter((a) => a.mode === 'translation' && a.correct).length;

  const resetQuestion = () => {
    setAnswer('');
    setChecked(false);
    setCorrect(false);
    setShowHint(false);
  };

  const setLevelCompat = (value: number) => setLevel(value as typeof level[number]);

  const next = () => {
    setIndex((value) => value + 1);
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
        subtitle="पहले examples में sentence construction सीखें, फिर Practice tab में खुद translation लिखकर जाँचें।"
      />
      {labMode === 'learn' ? (
        <TranslationLearn level={level} setLevel={setLevelCompat} direction={direction} />
      ) : (
              <LabModeToggle mode={labMode} onChange={setLabMode} />

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
            <div className="english-lab-question-head"><span>Level {level}</span><span>Question {index + 1} · ENDLESS</span></div>
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
              {item.buildSteps && <div className="english-lab-build"><b>यह translation कैसे बनता है?</b><ol>{item.buildSteps.map((step) => <li key={step}>{step}</li>)}</ol></div>}
              {!correct && <button className="btn" onClick={() => { setAnswer(''); setChecked(false); setShowHint(false); }}>फिर से प्रयास करें</button>}
            </div>}
          </>}
        </section>
      </div>


      )}

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
  const [labMode, setLabMode] = useState<'learn' | 'practice'>('learn');
  const [checked, setChecked] = useState(false);

  const item = useMemo(
    () => generateVocabularyItem(level, 9100 + session * 100000 + index * 71, vocabularyLabItems),
    [level, session, index],
  );
  const options = useMemo(() => {
    if (!item) return [];
    const candidates = shuffle(vocabularyLabItems.filter((candidate) => candidate.id !== item.id), 1000 + index * 37 + session * 11);
    const values = mode === 'synonym'
      ? [item.synonyms[0] ?? item.word, ...candidates.map((x) => x.synonyms[0] ?? x.word)]
      : mode === 'antonym'
        ? [item.antonyms[0] ?? item.word, ...candidates.map((x) => x.antonyms[0] ?? x.word)]
        : mode === 'reverse'
          ? [item.word, ...candidates.map((x) => x.word)]
          : [item.meaning, ...candidates.map((x) => x.meaning)];
    const unique = [...new Set(values)].slice(0, 4);
    return shuffle(unique, 44 + index + session * 13);
  }, [item, index, mode, session]);

  const attempted = Object.values(p.englishLabAttempts ?? {}).flat().filter((a) => a.mode === 'vocabulary').length;
  const correctCount = Object.values(p.englishLabAttempts ?? {}).flat().filter((a) => a.mode === 'vocabulary' && a.correct).length;

  const targetAnswer = mode === 'meaning' || mode === 'context' ? item?.meaning ?? '' : mode === 'reverse' ? item?.word ?? '' : mode === 'synonym' ? item?.synonyms[0] ?? '' : item?.antonyms[0] ?? '';
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
    setIndex((value) => value + 1);
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
        subtitle="पहले Learn & Examples में word meanings याद करें, फिर Practice tab में meaning, synonym, antonym और context पहचानें।"
      />
      {labMode === 'learn' ? (
        <VocabularyLearn level={level} setLevel={setLevel} />
      ) : (
              <LabModeToggle mode={labMode} onChange={setLabMode} />

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
          <div className="english-lab-question-head"><span>{level}</span><span>Question {index + 1} · ENDLESS</span></div>
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
            <div className="english-lab-build"><b>Vocabulary example कैसे समझें?</b><p>पहले word की grammatical role पहचानें, फिर sentence में उसके आसपास के words से उसका meaning confirm करें। अगली बार इसी word के साथ एक नया context sentence मिलेगा.</p></div>
            <p><b>Synonyms:</b> {item.synonyms.length ? item.synonyms.join(', ') : '—'} · <b>Antonyms:</b> {item.antonyms.length ? item.antonyms.join(', ') : '—'}</p>
          </div>}
        </>}
      </section>


      )}

      <div className="english-lab-next">
        <Link className="btn" to="/english-translation-lab">↔ Translation Lab</Link>
        <Link className="btn" to="/english-smart-practice">🎯 Smart Practice</Link>
      </div>
    </Shell>
  );
};

export const EnglishTranslationLabPage = TranslationLab;
export const EnglishVocabularyLabPage = VocabularyLab;
