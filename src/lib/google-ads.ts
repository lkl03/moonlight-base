declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackBookCallClickConversion(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: 'AW-18212293245/AbybCOfl9LwCEP2UpuxD',
  });
}
