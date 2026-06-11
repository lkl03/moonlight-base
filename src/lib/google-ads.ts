declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackBookCallClickConversion(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  if (process.env.NODE_ENV === 'development') {
    console.log('Google Ads pricing CTA conversion fired');
  }

  window.gtag('event', 'conversion', {
    send_to: 'AW-18212293245/AbybCOfl9LwCEP2UpuxD',
  });
}
