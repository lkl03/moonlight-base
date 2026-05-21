'use client';

import { useState, type FormEvent, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

const s: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#121717',
    color: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1.5rem',
  },
  card: {
    width: '100%',
    maxWidth: '360px',
  },
  brand: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#17F2A6',
    marginBottom: '1.5rem',
    display: 'block',
  },
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: '1.75rem',
    color: '#ffffff',
    marginBottom: '0.5rem',
    lineHeight: 1.15,
  },
  sub: {
    fontSize: '0.875rem',
    color: '#9ca3a3',
    marginBottom: '1.75rem',
    lineHeight: 1.6,
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '1.1rem',
    letterSpacing: '0.25em',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: '0.75rem',
  },
  btn: {
    width: '100%',
    padding: '0.8rem 1.5rem',
    background: '#45a383',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.95rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
  error: {
    padding: '0.65rem 0.9rem',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#fca5a5',
    marginBottom: '0.75rem',
  },
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!pin.trim()) { setError('Enter your PIN.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? 'Invalid PIN.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setPin('');
    }
  };

  return (
    <main style={s.page}>
      <div style={s.card}>
        <span style={s.brand}>Moonlight Web Designs</span>
        <h1 style={s.h1}>Admin access</h1>
        <p style={s.sub}>Enter your admin PIN to continue.</p>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            style={s.input}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="••••••"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoFocus
            autoComplete="current-password"
          />
          <button
            style={{ ...s.btn, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Verifying…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}
