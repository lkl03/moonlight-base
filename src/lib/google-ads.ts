declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackBookCallConversion(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: 'AW-18212293245/zx47CNIaPjzkcEP2UpuxD',
    value: 1.0,
    currency: 'ARS',
  });
}
