'use client';
import { useEffect, useState } from 'react';

export type PayPalScriptStatus = 'idle' | 'loading' | 'ready' | 'error';

const SCRIPT_ID = 'paypal-js-sdk';

export function usePayPalScript(clientId: string | undefined): PayPalScriptStatus {
  const [status, setStatus] = useState<PayPalScriptStatus>('idle');

  useEffect(() => {
    if (!clientId) {
      setStatus('error');
      return;
    }

    // Already loaded
    if (window.paypal) {
      setStatus('ready');
      return;
    }

    // Script tag already injected (e.g. React StrictMode double-invoke)
    const existing = document.getElementById(SCRIPT_ID);
    if (existing) {
      const onLoad = () => setStatus('ready');
      const onError = () => setStatus('error');
      existing.addEventListener('load', onLoad);
      existing.addEventListener('error', onError);
      return () => {
        existing.removeEventListener('load', onLoad);
        existing.removeEventListener('error', onError);
      };
    }

    setStatus('loading');

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription&currency=USD&locale=en_US`;
    script.async = true;
    script.onload = () => setStatus('ready');
    script.onerror = () => setStatus('error');
    document.head.appendChild(script);

    // The SDK script is global — do not remove it on cleanup.
  }, [clientId]);

  return status;
}
