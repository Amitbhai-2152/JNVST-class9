import { supabase } from './supabase';

export type AnalyticsScalar = string | number | boolean | null;
export type AnalyticsProperties = Record<string, AnalyticsScalar>;

type Attribution = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  referrerHost: string | null;
};

const CAMPAIGN_KEY = 'jnvst-class9-campaign-v1';
const PENDING_CONSENT_KEY = 'jnvst-class9-analytics-consent-v1';
const PENDING_SIGNUP_KEY = 'jnvst-class9-pending-signup-v1';

let analyticsUserId: string | null = null;
let analyticsConsent = false;

const clean = (value: string | null) => value ? value.trim().slice(0, 100) : null;

export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width <= 700) return 'mobile';
  if (width <= 1024) return 'tablet';
  return 'desktop';
};

export const getCampaignAttribution = (): Attribution => {
  if (typeof window === 'undefined') return { source: null, medium: null, campaign: null, referrerHost: null };
  let stored: Partial<Attribution> = {};
  try {
    stored = JSON.parse(localStorage.getItem(CAMPAIGN_KEY) || '{}');
  } catch {
    stored = {};
  }
  const params = new URLSearchParams(window.location.search);
  const incoming = {
    source: clean(params.get('utm_source')),
    medium: clean(params.get('utm_medium')),
    campaign: clean(params.get('utm_campaign')),
  };
  if (incoming.source || incoming.medium || incoming.campaign) {
    stored = { ...stored, ...incoming };
    localStorage.setItem(CAMPAIGN_KEY, JSON.stringify(stored));
  }
  let referrerHost: string | null = clean(typeof document !== 'undefined' ? document.referrer : null);
  if (referrerHost) {
    try { referrerHost = clean(new URL(referrerHost).hostname); } catch { referrerHost = null; }
  }
  return {
    source: clean(stored.source ?? null),
    medium: clean(stored.medium ?? null),
    campaign: clean(stored.campaign ?? null),
    referrerHost,
  };
};

export const initializeAnalytics = (userId: string, consent: boolean) => {
  analyticsUserId = userId || null;
  analyticsConsent = consent;
};

export const setAnalyticsConsent = (consent: boolean) => {
  analyticsConsent = consent;
};

export const getPendingAnalyticsConsent = (): boolean | null => {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(PENDING_CONSENT_KEY);
  if (value === null) return null;
  return value === 'true';
};

export const setPendingAnalyticsConsent = (consent: boolean) => {
  if (typeof window !== 'undefined') localStorage.setItem(PENDING_CONSENT_KEY, String(consent));
};

export const clearPendingAnalyticsConsent = () => {
  if (typeof window !== 'undefined') localStorage.removeItem(PENDING_CONSENT_KEY);
};

export const markPendingSignup = () => {
  if (typeof window !== 'undefined') localStorage.setItem(PENDING_SIGNUP_KEY, 'true');
};

export const consumePendingSignup = () => {
  if (typeof window === 'undefined' || localStorage.getItem(PENDING_SIGNUP_KEY) !== 'true') return false;
  localStorage.removeItem(PENDING_SIGNUP_KEY);
  return true;
};

export const trackEvent = async (eventName: string, properties: AnalyticsProperties = {}) => {
  if (!supabase || !analyticsUserId || !analyticsConsent) return;
  const attribution = getCampaignAttribution();
  const { error } = await supabase.from('analytics_events').insert({
    user_id: analyticsUserId,
    event_name: eventName,
    route: typeof window !== 'undefined' ? (window.location.hash.split('?')[0].replace(/^#/, '') || '/') : '/',
    device_type: getDeviceType(),
    utm_source: attribution.source,
    utm_medium: attribution.medium,
    utm_campaign: attribution.campaign,
    referrer_host: attribution.referrerHost,
    properties,
  });
  if (error) console.warn('Analytics event was not saved:', error.message);
};
