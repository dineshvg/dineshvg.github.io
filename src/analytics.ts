/**
 * Privacy-friendly visitor stats via GoatCounter (no cookies, no banner needed).
 * Dashboard: https://<code>.goatcounter.com — only visible to the account owner.
 * Leave the code empty to disable tracking entirely.
 */
const GOATCOUNTER_CODE = 'dinesh';

declare global {
  interface Window {
    goatcounter?: { count: (vars: { path: string; title?: string; event?: boolean }) => void };
  }
}

export const initAnalytics = () => {
  if (!GOATCOUNTER_CODE || typeof document === 'undefined') return;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  document.head.appendChild(script);
};

/** Count a named click, e.g. trackEvent('contact-email'). Shows up as an event in the dashboard. */
export const trackEvent = (name: string) => {
  window.goatcounter?.count({ path: name, title: name, event: true });
};
