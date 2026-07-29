declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

let loaded = false;
const CONSENT_KEY = "dsmar_cookie_consent_v1";

function hasAnalyticsConsent() {
  return typeof window !== "undefined" && window.localStorage.getItem(CONSENT_KEY) === "accepted";
}

function ensureGtagQueue() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer.push(args); };
}

export function initializeConsentMode() {
  if (!GA_ID || typeof window === "undefined") return;
  ensureGtagQueue();
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  if (hasAnalyticsConsent()) {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    loadGtag();
  }
}

export function setAnalyticsConsent(accepted: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "essential");
  if (!GA_ID) return;
  ensureGtagQueue();
  window.gtag("consent", "update", {
    analytics_storage: accepted ? "granted" : "denied",
    ad_storage: accepted ? "granted" : "denied",
    ad_user_data: accepted ? "granted" : "denied",
    ad_personalization: accepted ? "granted" : "denied",
  });
  if (accepted) loadGtag();
}

export function getStoredConsent() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CONSENT_KEY);
}

function loadGtag() {
  if (loaded || !GA_ID || !hasAnalyticsConsent()) return;
  loaded = true;

  ensureGtagQueue();
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
}

/** Track a pageview (call on route change) */
export function trackPageview(path: string) {
  if (!GA_ID || !hasAnalyticsConsent()) return;
  loadGtag();
  // Defer to next tick so gtag is defined
  setTimeout(() => {
    window.gtag?.("config", GA_ID, { page_path: path });
  }, 0);
}

/** Track a generic event */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID || !hasAnalyticsConsent()) return;
  loadGtag();
  setTimeout(() => {
    window.gtag?.("event", name, params);
  }, 0);
}

/** Track a conversion event with standard naming */
export function trackConversion(
  action: string,
  params?: Record<string, unknown>,
) {
  trackEvent("conversion_" + action, params);
}
