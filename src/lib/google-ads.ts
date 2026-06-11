declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a Google Ads click-conversion for the "Click - Book a Call" action.
 *
 * @param url Optional target URL. When provided and gtag is unavailable the
 *            browser navigates directly so the click is never silently lost.
 *            When gtag IS available, navigation is deferred to event_callback
 *            so the conversion signal reaches Google before the page unloads.
 *            Omit url for CTAs that open a modal or stay on-page — the
 *            conversion fires immediately without blocking the interaction.
 */
export function trackBookCallClickConversion(url?: string): void {
  // SSR guard — this function is only called from client event handlers,
  // but the guard keeps SSR renders and TypeScript clean.
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    console.log('Google Ads pricing CTA conversion fired');
  }

  // gtag not yet loaded (e.g. ad-blocker or very early click) — fall back.
  if (typeof window.gtag !== 'function') {
    if (url) window.location.href = url;
    return;
  }

  // Build params object. event_callback is only included when navigating to a
  // URL so the conversion reaches Google before the page unloads. For
  // modal-open CTAs (no url) it is intentionally omitted — the conversion
  // fires immediately without blocking the modal.
  const params: Record<string, unknown> = {
    send_to: 'AW-18212293245/AbybCOfl9LwCEP2UpuxD',
  };

  if (url) {
    params.event_callback = () => {
      window.location.href = url;
    };
  }

  window.gtag('event', 'conversion', params);
}
