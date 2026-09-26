import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/Auth';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { chapters, subjects, topics } from '../data/curriculum';
import '../contact.css';

const REPORT_TYPES = [
  ['wrong-question', 'गलत प्रश्न / प्रश्न में तथ्यात्मक गलती'],
  ['wrong-answer', 'गलत सही उत्तर'],
  ['explanation-error', 'गलत या अधूरी व्याख्या'],
  ['duplicate-question', 'Duplicate / बहुत मिलता-जुलता प्रश्न'],
  ['typo', 'टाइपो / spelling / formatting'],
  ['website-bug', 'Website का button / page काम नहीं कर रहा'],
  ['login-progress', 'Login / progress / account समस्या'],
  ['mobile-ui', 'Mobile / responsive UI समस्या'],
  ['other', 'अन्य समस्या'],
] as const;

const MAX_DESCRIPTION = 4000;
const MAX_CORRECTION = 2500;
const SUBMIT_COOLDOWN_MS = 60_000;
const RATING_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;
const LAST_SUBMIT_KEY = 'jnvst-class9-report-last-submit-v1';
const LAST_RATING_KEY = 'jnvst-class9-website-rating-v1';

const deviceType = () => {
  if (window.innerWidth <= 700) return 'mobile';
  if (window.innerWidth <= 1024) return 'tablet';
  return 'desktop';
};

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const initialQuestionId = searchParams.get('questionId')?.trim() ?? '';
  const initialSubjectId = searchParams.get('subjectId')?.trim() ?? '';
  const initialChapterId = searchParams.get('chapterId')?.trim() ?? '';
  const initialTopicId = searchParams.get('topicId')?.trim() ?? '';
  const initialPage = searchParams.get('from')?.trim() || 'contact';

  const [reportType, setReportType] = useState(searchParams.get('type')?.trim() || 'wrong-question');
  const [subjectId, setSubjectId] = useState(initialSubjectId || 'all');
  const [chapterId, setChapterId] = useState(initialChapterId || 'all');
  const [topicId, setTopicId] = useState(initialTopicId || 'all');
  const [questionId, setQuestionId] = useState(initialQuestionId);
  const [description, setDescription] = useState('');
  const [suggestedCorrection, setSuggestedCorrection] = useState('');
  const [contactEmail, setContactEmail] = useState(user?.email ?? '');
  const [studentName, setStudentName] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingHover, setRatingHover] = useState(0);
  const [ratingStatus, setRatingStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [ratingMessage, setRatingMessage] = useState('');
  const [ratingLocked, setRatingLocked] = useState(false);

  const visibleChapters = useMemo(
    () => chapters.filter((chapter) => subjectId === 'all' || chapter.subjectId === subjectId),
    [subjectId],
  );

  const visibleTopics = useMemo(
    () => topics.filter((topic) => {
      if (chapterId !== 'all') return topic.chapterId === chapterId;
      if (subjectId !== 'all') return chapters.find((chapter) => chapter.id === topic.chapterId)?.subjectId === subjectId;
      return true;
    }),
    [subjectId, chapterId],
  );

  const pageLabel = initialPage === 'question-bank' ? 'Question Bank' : 'Website';

  React.useEffect(() => {
    try {
      const lastRatedAt = Number(localStorage.getItem(LAST_RATING_KEY) || 0);
      if (lastRatedAt && Date.now() - lastRatedAt < RATING_COOLDOWN_MS) {
        setRatingLocked(true);
        setRatingStatus('success');
        setRatingMessage('आप इस device से हाल में website को rate कर चुके हैं। धन्यवाद!');
      }
    } catch {
      // Rating still works when localStorage is unavailable.
    }
  }, []);

  const updateSubject = (value: string) => {
    setSubjectId(value);
    if (chapterId !== 'all' && !chapters.some((chapter) => chapter.id === chapterId && (value === 'all' || chapter.subjectId === value))) {
      setChapterId('all');
      setTopicId('all');
    }
  };

  const updateChapter = (value: string) => {
    setChapterId(value);
    if (topicId !== 'all' && !topics.some((topic) => topic.id === topicId && (value === 'all' || topic.chapterId === value))) {
      setTopicId('all');
    }
  };

  const submitRating = async () => {
    if (ratingStatus === 'submitting' || ratingLocked) return;
    if (!rating) {
      setRatingStatus('error');
      setRatingMessage('कृपया पहले 1 से 5 तक कोई star चुनें।');
      return;
    }

    if (!supabaseConfigured || !supabase) {
      setRatingStatus('error');
      setRatingMessage('Rating system अभी configure नहीं है।');
      return;
    }

    try {
      const lastRatedAt = Number(localStorage.getItem(LAST_RATING_KEY) || 0);
      if (Date.now() - lastRatedAt < RATING_COOLDOWN_MS) {
        setRatingLocked(true);
        setRatingStatus('success');
        setRatingMessage('आप इस device से हाल में website को rate कर चुके हैं। धन्यवाद!');
        return;
      }
    } catch {
      // Continue when localStorage is unavailable.
    }

    setRatingStatus('submitting');
    setRatingMessage('');

    const { error } = await supabase.from('website_ratings').insert({
      user_id: user?.id ?? null,
      rating,
      page_url: window.location.href.slice(0, 500),
      device_type: deviceType(),
    });

    if (error) {
      console.error('website rating submission failed:', error);
      setRatingStatus('error');
      setRatingMessage('Rating भेजते समय समस्या आई। कृपया फिर प्रयास करें।');
      return;
    }

    try {
      localStorage.setItem(LAST_RATING_KEY, String(Date.now()));
    } catch {
      // Ignore storage failures.
    }

    setRatingLocked(true);
    setRatingStatus('success');
    setRatingMessage('धन्यवाद! आपका 5-star rating feedback दर्ज हो गया।');
  };


  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const cleanDescription = description.trim();
    const cleanCorrection = suggestedCorrection.trim();
    const cleanQuestionId = questionId.trim();
    const cleanName = studentName.trim();
    const cleanEmail = contactEmail.trim();

    if (cleanDescription.length < 10) {
      setStatus('error');
      setMessage('कृपया समस्या कम-से-कम 10 अक्षरों में स्पष्ट लिखें।');
      return;
    }

    if (cleanDescription.length > MAX_DESCRIPTION || cleanCorrection.length > MAX_CORRECTION || cleanName.length > 100 || cleanEmail.length > 160 || cleanQuestionId.length > 120) {
      setStatus('error');
      setMessage('कुछ जानकारी बहुत लंबी है। कृपया उसे थोड़ा छोटा करें।');
      return;
    }

    if (!supabaseConfigured || !supabase) {
      setStatus('error');
      setMessage('Report system अभी configure नहीं है। बाद में फिर प्रयास करें।');
      return;
    }

    if (honeypot.trim()) {
      setStatus('success');
      setMessage('धन्यवाद! आपकी report दर्ज हो गई।');
      return;
    }

    try {
      const lastSubmit = Number(localStorage.getItem(LAST_SUBMIT_KEY) || 0);
      if (Date.now() - lastSubmit < SUBMIT_COOLDOWN_MS) {
        setStatus('error');
        setMessage('एक report अभी-अभी भेजी गई है। अगली report भेजने से पहले लगभग 1 मिनट प्रतीक्षा करें।');
        return;
      }
    } catch {
      // Continue when localStorage is unavailable.
    }

    setStatus('submitting');
    setMessage('');

    const { error } = await supabase.from('student_reports').insert({
      user_id: user?.id ?? null,
      report_type: reportType,
      subject_id: subjectId === 'all' ? null : subjectId,
      chapter_id: chapterId === 'all' ? null : chapterId,
      topic_id: topicId === 'all' ? null : topicId,
      question_id: cleanQuestionId || null,
      page_url: window.location.href.slice(0, 500),
      source_page: pageLabel,
      description: cleanDescription,
      suggested_correction: cleanCorrection || null,
      student_name: cleanName || null,
      contact_email: cleanEmail || null,
      device_type: deviceType(),
      user_agent: navigator.userAgent.slice(0, 300),
    });

    if (error) {
      console.error('student report submission failed:', error);
      setStatus('error');
      setMessage('Report भेजते समय समस्या आई। कृपया फिर प्रयास करें।');
      return;
    }

    try {
      localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
    } catch {
      // Ignore storage failures.
    }

    setDescription('');
    setSuggestedCorrection('');
    setHoneypot('');
    setStatus('success');
    setMessage('आपकी report सफलतापूर्वक दर्ज हो गई। धन्यवाद! इससे Learning Hub को बेहतर बनाने में मदद मिलेगी।');
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div>
          <Link className="contact-back" to="/">← डैशबोर्ड</Link>
          <span className="contact-eyebrow">REPORT A PROBLEM</span>
          <h1>Website में कोई गलती मिली?</h1>
          <p>हमें बताइए। प्रश्न, answer, explanation, login, progress या mobile UI — किसी भी समस्या की report यहाँ भेज सकते हैं।</p>
        </div>
        <div className="contact-hero-badge">
          <span aria-hidden="true">🛠️</span>
          <strong>Student feedback</strong>
          <small>नाम या login जरूरी नहीं है</small>
        </div>
      </section>

      <section className="contact-rating-card" aria-labelledby="website-rating-title">
        <div className="contact-rating-copy">
          <span className="contact-label">QUICK FEEDBACK</span>
          <h2 id="website-rating-title">आपको हमारी website कैसी लगी?</h2>
          <p>पूरी website के experience को 1 से 5 stars में rate करें। कोई नाम या email देना जरूरी नहीं है।</p>
        </div>

        <div className="contact-rating-action">
          <div className="contact-stars" role="radiogroup" aria-label="Overall website rating">
            {[1, 2, 3, 4, 5].map((value) => {
              const active = value <= (ratingHover || rating);
              return (
                <button
                  key={value}
                  type="button"
                  className={active ? 'active' : ''}
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={value + ' star'}
                  disabled={ratingLocked || ratingStatus === 'submitting'}
                  onMouseEnter={() => setRatingHover(value)}
                  onMouseLeave={() => setRatingHover(0)}
                  onFocus={() => setRatingHover(value)}
                  onBlur={() => setRatingHover(0)}
                  onClick={() => {
                    setRating(value);
                    setRatingStatus('idle');
                    setRatingMessage('');
                  }}
                >
                  ★
                </button>
              );
            })}
          </div>
          <div className="contact-rating-caption">{rating ? (rating + '/5 stars selected') : 'Star चुनें'}</div>
          <button
            type="button"
            className="contact-rating-submit"
            onClick={() => { void submitRating(); }}
            disabled={ratingLocked || ratingStatus === 'submitting'}
          >
            {ratingStatus === 'submitting' ? 'Rating भेजी जा रही है…' : ratingLocked ? '✓ Rating दर्ज है' : '⭐ Website को rate करें'}
          </button>
          {ratingMessage && (
            <p className={'contact-rating-message ' + (ratingStatus === 'error' ? 'error' : 'success')} role={ratingStatus === 'error' ? 'alert' : 'status'}>
              {ratingMessage}
            </p>
          )}
        </div>
      </section>

      <div className="contact-layout">
        <section className="contact-card">
          <div className="contact-card-head">
            <div>
              <span className="contact-label">STEP 1</span>
              <h2>समस्या बताइए</h2>
            </div>
            <span className="contact-required">* जरूरी field</span>
          </div>

          {status === 'success' && (
            <div className="contact-alert success" role="status">
              <strong>✓ Report भेज दी गई</strong>
              <p>{message}</p>
              <button type="button" onClick={() => { setStatus('idle'); setMessage(''); }}>
                दूसरी report भेजें
              </button>
            </div>
          )}

          {status !== 'success' && (
            <form onSubmit={submit} noValidate>
              <div className="contact-grid">
                <label>
                  <span>समस्या का प्रकार <b>*</b></span>
                  <select value={reportType} onChange={(event) => setReportType(event.target.value)}>
                    {REPORT_TYPES.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                  </select>
                </label>

                <label>
                  <span>विषय</span>
                  <select value={subjectId} onChange={(event) => updateSubject(event.target.value)}>
                    <option value="all">सामान्य / लागू नहीं</option>
                    {subjects.map((subject) => <option value={subject.id} key={subject.id}>{subject.title}</option>)}
                  </select>
                </label>

                <label>
                  <span>अध्याय</span>
                  <select value={chapterId} onChange={(event) => updateChapter(event.target.value)}>
                    <option value="all">सामान्य / लागू नहीं</option>
                    {visibleChapters.map((chapter) => <option value={chapter.id} key={chapter.id}>{chapter.title}</option>)}
                  </select>
                </label>

                <label>
                  <span>विषयांश</span>
                  <select value={topicId} onChange={(event) => setTopicId(event.target.value)}>
                    <option value="all">सामान्य / लागू नहीं</option>
                    {visibleTopics.map((topic) => <option value={topic.id} key={topic.id}>{topic.title}</option>)}
                  </select>
                </label>
              </div>

              <label>
                <span>Question ID <small>(यदि लागू हो)</small></span>
                <input value={questionId} onChange={(event) => setQuestionId(event.target.value)} placeholder="जैसे SCI-042 या CH-..." autoComplete="off" />
              </label>

              <label>
                <span>समस्या क्या हुई? <b>*</b></span>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={MAX_DESCRIPTION} placeholder="उदाहरण: प्रश्न में सही उत्तर B दिया है, लेकिन explanation में C लिखा है।" rows={7} required />
                <small className="contact-counter">{description.length}/{MAX_DESCRIPTION}</small>
              </label>

              <label>
                <span>आपके हिसाब से सही क्या होना चाहिए?</span>
                <textarea value={suggestedCorrection} onChange={(event) => setSuggestedCorrection(event.target.value)} maxLength={MAX_CORRECTION} placeholder="जैसे: सही उत्तर C होना चाहिए क्योंकि..." rows={4} />
              </label>

              <div className="contact-divider"></div>

              <div className="contact-grid">
                <label>
                  <span>आपका नाम <small>(वैकल्पिक)</small></span>
                  <input value={studentName} onChange={(event) => setStudentName(event.target.value)} maxLength={100} placeholder="नाम लिखना जरूरी नहीं है" autoComplete="name" />
                </label>
                <label>
                  <span>Email <small>(वैकल्पिक)</small></span>
                  <input type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} maxLength={160} placeholder="reply चाहिए तभी दें" autoComplete="email" />
                </label>
              </div>

              <div className="contact-honeypot" aria-hidden="true">
                <label>Website<input value={honeypot} onChange={(event) => setHoneypot(event.target.value)} tabIndex={-1} autoComplete="off" /></label>
              </div>

              {status === 'error' && (
                <div className="contact-alert error" role="alert">
                  <strong>Report नहीं भेजी जा सकी</strong>
                  <p>{message}</p>
                </div>
              )}

              <button type="submit" className="contact-submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'भेजा जा रहा है…' : '⚠️ Report भेजें'}
              </button>
              <p className="contact-privacy">आपका report data केवल समस्या की जाँच के लिए रखा जाएगा। Login जरूरी नहीं है।</p>
            </form>
          )}
        </section>

        <aside className="contact-side">
          <div className="contact-help-card">
            <span>QUICK GUIDE</span>
            <h3>अच्छी report कैसी लिखें?</h3>
            <div className="contact-tip"><b>1</b><p>कहाँ समस्या मिली, लिखें।</p></div>
            <div className="contact-tip"><b>2</b><p>क्या गलत हुआ, साफ बताएं।</p></div>
            <div className="contact-tip"><b>3</b><p>सही answer या expected behaviour पता हो तो लिखें।</p></div>
          </div>
          <div className="contact-info-card">
            <span>FREE SYSTEM</span>
            <h3>Report भेजने के लिए payment नहीं</h3>
            <p>यह form आपके मौजूदा Learning Hub + Supabase setup का उपयोग करता है। किसी paid email service की जरूरत नहीं है।</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ContactPage;
