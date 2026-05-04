'use client';

import { useEffect, useState } from 'react';
import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from '@/components/Layout/GlobalStyles';

const PORTAL_PASS = process.env.NEXT_PUBLIC_PORTAL_PASSWORD ?? 'abc123';

export default function PortalPage() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (sessionStorage.getItem('portal-authed') === '1') setAuthed(true);
    const stored = localStorage.getItem('ml-theme');
    if (stored === 'light') {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('ml-theme', next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PORTAL_PASS) {
      sessionStorage.setItem('portal-authed', '1');
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <header
        style={{
          position: 'fixed',
          top: 0,
          right: '1.5rem',
          padding: '1rem',
          zIndex: 80,
        }}
      >
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--white)',
            cursor: 'pointer',
            fontSize: '1.25rem',
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'Raleway, sans-serif',
        }}
      >
        {authed ? (
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                marginBottom: '1rem',
              }}
            >
              Client Portal
            </h1>
            <p style={{ opacity: 0.7 }}>
              Welcome! Your portal content will appear here soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              width: 'min(100%, 22rem)',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
              }}
            >
              Client Portal
            </h1>
            <p style={{ opacity: 0.65, fontSize: '0.9rem' }}>
              Enter your password to continue.
            </p>
            <input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--light-gray)',
                background: 'transparent',
                color: 'var(--white)',
                fontSize: '1rem',
                fontFamily: 'Raleway, sans-serif',
                outline: 'none',
              }}
            />
            {error && (
              <p style={{ color: 'var(--green)', fontSize: '0.85rem' }}>
                Incorrect password. Please try again.
              </p>
            )}
            <button
              type="submit"
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'var(--green)',
                border: 'none',
                color: 'var(--Background)',
                fontWeight: 700,
                fontSize: '1rem',
                fontFamily: 'Raleway, sans-serif',
                cursor: 'pointer',
              }}
            >
              Enter
            </button>
          </form>
        )}
      </main>
    </StyledComponentsRegistry>
  );
}
