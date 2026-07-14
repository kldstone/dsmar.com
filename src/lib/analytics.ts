declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

let loaded = false;

function loadGtag() {
  if (loaded || !GA_ID) return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });

  const s = document.createElement("script");
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  s.async = true;
  document.head.appendChild(s);
}

/** Track a pageview (call on route change) */
export function trackPageview(path: string) {
  if (!GA_ID) return;
  loadGtag();
  // Defer to next tick so gtag is defined
  setTimeout(() => {
    window.gtag?.("config", GA_ID, { page_path: path });
  }, 0);
}

/** Track a generic event */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID) return;
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
