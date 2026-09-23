import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { useProgressStore, emptyProgressState, getProgressSnapshot } from '../store/progress';
import type { ProgressState } from '../types';
import { supabase, supabaseConfigured } from '../lib/supabase';
import {
  clearPendingAnalyticsConsent,
  consumePendingSignup,
  getCampaignAttribution,
  getPendingAnalyticsConsent,
  initializeAnalytics,
  markPendingSignup,
  setAnalyticsConsent as setAnalyticsConsentState,
  setPendingAnalyticsConsent,
  trackEvent,
  getDeviceType,
} from '../lib/analytics';

const LOCAL_OWNER_KEY = 'jnvst-class9-progress-owner-v1';
const CLOUD_TABLE = 'student_progress';

const toProgress = (value: unknown): ProgressState | null => {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Partial<ProgressState>;
  return {
    ...emptyProgressState,
    lessonActivity: raw.lessonActivity && typeof raw.lessonActivity === 'object' ? raw.lessonActivity : {},
    questionAttempts: raw.questionAttempts && typeof raw.questionAttempts === 'object' ? raw.questionAttempts : {},
    bookmarks: {
      questionIds: Array.isArray(raw.bookmarks?.questionIds) ? raw.bookmarks.questionIds : [],
      lessonIds: Array.isArray(raw.bookmarks?.lessonIds) ? raw.bookmarks.lessonIds : [],
    },
    revisionHistory: Array.isArray(raw.revisionHistory) ? raw.revisionHistory : [],
    recentlyStudied: Array.isArray(raw.recentlyStudied) ? raw.recentlyStudied : [],
    mockTestResults: Array.isArray(raw.mockTestResults) ? raw.mockTestResults : [],
    englishLabAttempts: raw.englishLabAttempts && typeof raw.englishLabAttempts === 'object' ? raw.englishLabAttempts : {},
    hindiUnseenAttempts: raw.hindiUnseenAttempts && typeof raw.hindiUnseenAttempts === 'object' ? raw.hindiUnseenAttempts : {},
  };
};

const uniqueBy = <T,>(items: T[], key: (item: T) => string): T[] => {
  const seen = new Set<string>();
  const output: T[] = [];
  for (const item of items) {
    const itemKey = key(item);
    if (seen.has(itemKey)) continue;
    seen.add(itemKey);
    output.push(item);
  }
  return output;
};

const mergeProgress = (local: ProgressState, remote: ProgressState | null): ProgressState => {
  if (!remote) return local;
  const lessonActivity = { ...remote.lessonActivity };
  Object.entries(local.lessonActivity).forEach(([id, activity]) => {
    const existing = lessonActivity[id];
    if (!existing || activity.lastAccessed > existing.lastAccessed || (activity.status === 'completed' && existing.status !== 'completed')) {
      lessonActivity[id] = activity;
    }
  });

  const questionAttempts: ProgressState['questionAttempts'] = { ...remote.questionAttempts };
  Object.entries(local.questionAttempts).forEach(([id, attempts]) => {
    questionAttempts[id] = [...(questionAttempts[id] ?? []), ...attempts];
  });
  Object.keys(questionAttempts).forEach((id) => {
    questionAttempts[id] = uniqueBy(
      questionAttempts[id].slice().sort((a, b) => a.timestamp - b.timestamp),
      (attempt) => [attempt.timestamp, attempt.mode, attempt.isCorrect ? '1' : '0', attempt.selectedOptionIds.join(',')].join('|'),
    );
  });

  const revisionHistory = uniqueBy(
    [...remote.revisionHistory, ...local.revisionHistory].sort((a, b) => a.timestamp - b.timestamp),
    (item) => [item.entityType, item.entityId, item.timestamp].join('|'),
  );

  const recentlyStudied = uniqueBy(
    [...remote.recentlyStudied, ...local.recentlyStudied].sort((a, b) => b.timestamp - a.timestamp),
    (item) => item.type + '|' + item.id,
  ).slice(0, 8);

  const mockTestResults = uniqueBy(
    [...remote.mockTestResults, ...local.mockTestResults].sort((a, b) => b.timestamp - a.timestamp),
    (item) => item.id,
  ).slice(0, 20);

  const englishLabAttempts: ProgressState['englishLabAttempts'] = { ...remote.englishLabAttempts };
  Object.entries(local.englishLabAttempts).forEach(([id, attempts]) => {
    englishLabAttempts[id] = uniqueBy(
      [...(englishLabAttempts[id] ?? []), ...attempts].sort((a, b) => a.timestamp - b.timestamp),
      (attempt) => [attempt.id, attempt.timestamp, attempt.correct ? '1' : '0', attempt.mode].join('|'),
    ).slice(-30);
  });

  const hindiUnseenAttempts: ProgressState['hindiUnseenAttempts'] = { ...remote.hindiUnseenAttempts };
  Object.entries(local.hindiUnseenAttempts).forEach(([id, attempts]) => {
    hindiUnseenAttempts[id] = uniqueBy(
      [...(hindiUnseenAttempts[id] ?? []), ...attempts].sort((a, b) => a.timestamp - b.timestamp),
      (attempt) => [attempt.questionId, attempt.passageId, attempt.timestamp, attempt.selectedOptionIndex, attempt.correct ? '1' : '0'].join('|'),
    ).slice(-30);
  });

  const bookmarks = {
    questionIds: Array.from(new Set([...remote.bookmarks.questionIds, ...local.bookmarks.questionIds])),
    lessonIds: Array.from(new Set([...remote.bookmarks.lessonIds, ...local.bookmarks.lessonIds])),
  };

  return { lessonActivity, questionAttempts, bookmarks, revisionHistory, recentlyStudied, mockTestResults, englishLabAttempts, hindiUnseenAttempts };
};

const normalizeAuthError = (message: string) => {
  if (/invalid login credentials/i.test(message)) return 'ईमेल या पासवर्ड सही नहीं है।';
  if (/email not confirmed/i.test(message)) return 'पहले अपने ईमेल से account confirm करें।';
  if (/password.*(6|8|characters)/i.test(message)) return 'पासवर्ड Supabase की न्यूनतम password policy पूरी नहीं करता।';
  return message;
};

type SyncStatus = 'idle' | 'saving' | 'saved' | 'error';

interface AuthContextValue {
  configured: boolean;
  loading: boolean;
  user: User | null;
  syncStatus: SyncStatus;
  authError: string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (displayName: string, email: string, password: string, analyticsConsent: boolean) => Promise<{ requiresConfirmation: boolean }>;
  signOut: () => Promise<void>;
  analyticsConsent: boolean;
  setAnalyticsConsent: (enabled: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const snapshotForOwner = (ownerId: string | null): ProgressState => {
  if (!ownerId || ownerId === localStorage.getItem(LOCAL_OWNER_KEY)) {
    return getProgressSnapshot();
  }
  return { ...emptyProgressState, bookmarks: { questionIds: [], lessonIds: [] } };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [authError, setAuthError] = useState('');
  const [analyticsConsent, setAnalyticsConsentValue] = useState(false);
  const syncTimerRef = useRef<number | null>(null);
  const syncCleanupRef = useRef<(() => void) | null>(null);
  const syncRunRef = useRef(0);

  const clearSync = () => {
    if (syncTimerRef.current !== null) window.clearTimeout(syncTimerRef.current);
    syncTimerRef.current = null;
    syncCleanupRef.current?.();
    syncCleanupRef.current = null;
  };

  const saveNow = async (userId: string) => {
    if (!supabase) return;
    const progress = getProgressSnapshot();
    setSyncStatus('saving');
    const { error } = await supabase.from(CLOUD_TABLE).upsert(
      { user_id: userId, progress, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' },
    );
    if (error) {
      setSyncStatus('error');
      throw error;
    }
    setSyncStatus('saved');
  };

  const scheduleCloudSave = (userId: string) => {
    if (syncTimerRef.current !== null) window.clearTimeout(syncTimerRef.current);
    syncTimerRef.current = window.setTimeout(() => {
      syncTimerRef.current = null;
      void saveNow(userId).catch((error) => {
        setAuthError(normalizeAuthError(error instanceof Error ? error.message : String(error)));
      });
    }, 700);
  };

  const connectUser = async (nextSession: Session | null) => {
    const runId = ++syncRunRef.current;
    clearSync();
    setSession(nextSession);
    setAuthError('');
    setSyncStatus(nextSession ? 'saving' : 'idle');
    setLoading(Boolean(nextSession));

    if (!nextSession || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const local = snapshotForOwner(nextSession.user.id);
      const [{ data, error }, { data: profile, error: profileError }] = await Promise.all([
        supabase
          .from(CLOUD_TABLE)
          .select('progress')
          .eq('user_id', nextSession.user.id)
          .maybeSingle(),
        supabase
          .from('student_profiles')
          .select('analytics_consent, display_name, first_utm_source, first_utm_medium, first_utm_campaign, first_utm_content, first_utm_term')
          .eq('user_id', nextSession.user.id)
          .maybeSingle(),
      ]);

      if (runId !== syncRunRef.current) return;
      if (error) throw error;
      if (profileError) throw profileError;

      const pendingConsent = getPendingAnalyticsConsent();
      const consent = profile?.analytics_consent ?? pendingConsent ?? false;
      const campaign = getCampaignAttribution();
      const now = new Date().toISOString();
      const displayName = String(nextSession.user.user_metadata?.full_name ?? '').trim().slice(0, 100) || null;
      const profilePayload: Record<string, unknown> = {
        user_id: nextSession.user.id,
        display_name: displayName,
        last_seen_at: now,
      };
      if (!profile) profilePayload.first_seen_at = now;
      if (pendingConsent !== null) profilePayload.analytics_consent = pendingConsent;
      if (consent && !profile?.first_utm_source && campaign.source) profilePayload.first_utm_source = campaign.source;
      if (consent && !profile?.first_utm_medium && campaign.medium) profilePayload.first_utm_medium = campaign.medium;
      if (consent && !profile?.first_utm_campaign && campaign.campaign) profilePayload.first_utm_campaign = campaign.campaign;
      if (consent && !profile?.first_utm_content && campaign.content) profilePayload.first_utm_content = campaign.content;
      if (consent && !profile?.first_utm_term && campaign.term) profilePayload.first_utm_term = campaign.term;
      if (consent) profilePayload.device_type = getDeviceType();

      const { error: profileUpsertError } = await supabase.from('student_profiles').upsert(profilePayload, { onConflict: 'user_id' });
      if (profileUpsertError) throw profileUpsertError;

      setAnalyticsConsentValue(Boolean(consent));
      initializeAnalytics(nextSession.user.id, Boolean(consent));
      if (pendingConsent !== null) clearPendingAnalyticsConsent();

      const remote = toProgress(data?.progress);
      const merged = mergeProgress(local, remote);
      useProgressStore.getState().replaceProgress(merged);
      localStorage.setItem(LOCAL_OWNER_KEY, nextSession.user.id);
      if (consumePendingSignup()) void trackEvent('sign_up');
      else void trackEvent('login');

      if (runId !== syncRunRef.current) return;
      syncCleanupRef.current = useProgressStore.subscribe(() => scheduleCloudSave(nextSession.user.id));
      setSyncStatus('saved');
    } catch (error) {
      setSyncStatus('error');
      setAuthError(normalizeAuthError(error instanceof Error ? error.message : String(error)));
    } finally {
      if (runId === syncRunRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      window.setTimeout(() => {
        if (active) void connectUser(nextSession);
      }, 0);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
      clearSync();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase अभी configure नहीं है।');
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      const message = normalizeAuthError(error.message);
      setAuthError(message);
      throw new Error(message);
    }
  };

  const signUp = async (displayName: string, email: string, password: string, consent: boolean) => {
    if (!supabase) throw new Error('Supabase अभी configure नहीं है।');
    setAuthError('');
    setPendingAnalyticsConsent(consent);
    getCampaignAttribution();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: displayName.trim() } },
    });
    if (error) {
      const message = normalizeAuthError(error.message);
      setAuthError(message);
      throw new Error(message);
    }
    markPendingSignup();
    return { requiresConfirmation: !data.session };
  };

  const signOut = async () => {
    if (!supabase) return;
    clearSync();
    setAuthError('');
    await supabase.auth.signOut();
    initializeAnalytics('', false);
    setAnalyticsConsentValue(false);
    setSession(null);
    setSyncStatus('idle');
  };

  const updateAnalyticsConsent = async (enabled: boolean) => {
    if (!supabase || !session?.user.id) return;
    setAnalyticsConsentState(enabled);
    setAnalyticsConsentValue(enabled);
    const profileWrite = await supabase.from('student_profiles').upsert(
      {
        user_id: session.user.id,
        analytics_consent: enabled,
        display_name: String(session.user.user_metadata?.full_name ?? '').trim().slice(0, 100) || null,
        last_seen_at: new Date().toISOString(),
        device_type: enabled ? getDeviceType() : null,
        ...(enabled ? {} : {
          first_utm_source: null,
          first_utm_medium: null,
          first_utm_campaign: null,
          first_utm_content: null,
          first_utm_term: null,
        }),
      },
      { onConflict: 'user_id' },
    );
    if (profileWrite.error) {
      setAnalyticsConsentState(!enabled);
      setAnalyticsConsentValue(!enabled);
      throw profileWrite.error;
    }
    if (!enabled) {
      const eventDelete = await supabase.from('analytics_events').delete().eq('user_id', session.user.id);
      if (eventDelete.error) {
        setAnalyticsConsentState(true);
        setAnalyticsConsentValue(true);
        throw eventDelete.error;
      }
      return;
    }
  };

  const value = useMemo<AuthContextValue>(() => ({
    configured: supabaseConfigured,
    loading,
    user: session?.user ?? null,
    syncStatus,
    authError,
    signIn,
    signUp,
    signOut,
    analyticsConsent,
    setAnalyticsConsent: updateAnalyticsConsent,
  }), [loading, session, syncStatus, authError, analyticsConsent]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { configured, loading, user } = useAuth();
  if (!configured) {
    return <main className="auth-screen"><section className="auth-setup">
      <span className="auth-brand">JNVST CLASS 9</span>
      <h1>Student account setup बाकी है</h1>
      <p>Supabase credentials अभी production build में नहीं हैं। GitHub Actions में <code>VITE_SUPABASE_URL</code> और <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> secrets जोड़ने के बाद नया deployment करें।</p>
      <p>Database में <code>supabase/schema.sql</code> चलाएँ, फिर site को reload करें।</p>
    </section></main>;
  }
  if (loading) return <main className="auth-loading">आपका student data सुरक्षित रूप से load हो रहा है…</main>;
  if (user) return <>{children}</>;
  return <AuthPage />;
};

const AuthPage = () => {
  const { signIn, signUp, authError } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState('');
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    setWorking(true);
    try {
      if (mode === 'signup') {
        if (displayName.trim().length < 2) throw new Error('अपना नाम दर्ज करें।');
        const result = await signUp(displayName, email, password, analyticsConsent);
        if (result.requiresConfirmation) {
          setMessage('Account बन गया है। अपने ईमेल में confirmation link खोलकर फिर Login करें।');
          setMode('login');
          setPassword('');
        } else {
          setMessage('Account तैयार है। आपकी पुरानी local progress cloud में सुरक्षित कर दी गई है।');
        }
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setWorking(false);
    }
  };

  const switchMode = (nextMode: 'login' | 'signup') => {
    setMode(nextMode);
    setMessage('');
    setPassword('');
    setShowPassword(false);
  };

  return <main className="auth-screen">
    <div className="auth-shell">
      <section className="auth-card">
        <div className="auth-card-top">
          <span className="auth-brand"><span className="auth-brand-mark">J9</span> JNVST CLASS 9</span>
          <span className="auth-security-pill"><span aria-hidden="true">✓</span> सुरक्षित प्रगति</span>
        </div>

        <div className="auth-heading">
          <span className="auth-eyebrow">STUDENT ACCOUNT</span>
          <h1>{mode === 'login' ? 'अपनी तैयारी जारी रखें' : 'अपना student account बनाएँ'}</h1>
          <p>{mode === 'login'
            ? 'Login करें और अपनी lessons, practice, mocks, bookmarks और labs वहीं से जारी रखें जहाँ आपने छोड़ा था।'
            : 'एक account आपकी learning progress को इस browser से आगे सुरक्षित रखने में मदद करता है।'}</p>
        </div>

        <div className="auth-tabs" role="tablist" aria-label="Account mode">
          <button type="button" role="tab" aria-selected={mode === 'login'} className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>Login</button>
          <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'active' : ''} onClick={() => switchMode('signup')}>Sign up</button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {mode === 'signup' && <div className="auth-field">
            <label htmlFor="student-name">आपका नाम</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon" aria-hidden="true">◉</span>
              <input id="student-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} autoComplete="name" placeholder="जैसे: Amit" required />
            </div>
          </div>}
          <div className="auth-field">
            <label htmlFor="student-email">ईमेल</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon" aria-hidden="true">@</span>
              <input id="student-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required />
            </div>
          </div>
          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="student-password">पासवर्ड</label>
              <span>कम से कम 8 अक्षर</span>
            </div>
            <div className="auth-input-wrap">
              <span className="auth-input-icon" aria-hidden="true">•</span>
              <input id="student-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} placeholder="••••••••" required />
              <button type="button" className="auth-password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'पासवर्ड छिपाएँ' : 'पासवर्ड दिखाएँ'}>
                {showPassword ? 'छिपाएँ' : 'दिखाएँ'}
              </button>
            </div>
          </div>

          {mode === 'signup' && <label className="auth-consent">
            <input type="checkbox" checked={analyticsConsent} onChange={(event) => setAnalyticsConsent(event.target.checked)} />
            <span><strong>वैकल्पिक analytics</strong> — Learning Hub को बेहतर बनाने और promotion sources समझने में मदद के लिए। Phone, exact location, school या DOB नहीं लिए जाते।</span>
          </label>}

          {(message || authError) && <div className={'auth-message ' + (authError ? 'error' : 'success')} role="status">
            <span className="auth-message-icon" aria-hidden="true">{authError ? '!' : '✓'}</span>
            <span>{message || authError}</span>
          </div>}

          <button className="auth-submit" disabled={working}>
            <span>{working ? 'कृपया प्रतीक्षा करें…' : mode === 'login' ? 'Login करें' : 'Account बनाएँ'}</span>
            {!working && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <div className="auth-switch-line">
          <span>{mode === 'login' ? 'नया student account चाहिए?' : 'पहले से account है?'}</span>
          <button type="button" onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'Sign up करें' : 'Login करें'}</button>
        </div>
        <p className="auth-footnote">आपकी learning progress authenticated account से जुड़ी रहेगी और database access security policies से restricted है।</p>
      </section>

      <aside className="auth-side">
        <div className="auth-side-glow"></div>
        <span className="auth-side-label">YOUR PREPARATION, PROTECTED</span>
        <h2>एक account से आपकी मेहनत साथ रहती है।</h2>
        <p>Device बदलने या browser data साफ होने पर भी cloud में synced progress आपके account के साथ रह सकती है।</p>
        <div className="auth-benefits">
          <div><span>✓</span><div><strong>Progress sync</strong><small>Lessons और mastery activity सुरक्षित रखें</small></div></div>
          <div><span>✓</span><div><strong>Practice history</strong><small>Questions, mocks और revision history</small></div></div>
          <div><span>✓</span><div><strong>Student-first privacy</strong><small>अनावश्यक personal details collect नहीं किए जाते</small></div></div>
        </div>
        <div className="auth-side-note"><span aria-hidden="true">⌁</span> JNVST Class 9 Learning Hub</div>
      </aside>
    </div>
  </main>;
};