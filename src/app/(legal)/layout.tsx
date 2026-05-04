'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from '@/components/Layout/GlobalStyles';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <nav
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.55rem 1.1rem',
          background: 'var(--Background)',
          border: '1px solid var(--light-gray)',
          borderRadius: '999px',
          zIndex: 80,
          fontSize: '0.9rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        }}
      >
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem',
            padding: '0.25rem',
          }}
        >
          ↑
        </button>
        <Link
          href="/"
          style={{
            color: 'var(--white)',
            textDecoration: 'none',
            fontSize: '0.88rem',
            fontFamily: 'Raleway, sans-serif',
          }}
        >
          ← Home
        </Link>
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--white)',
            cursor: 'pointer',
            fontSize: '1.1rem',
            padding: '0.25rem',
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>
      <main style={{ minHeight: '100vh', padding: '2rem' }}>{children}</main>
    </StyledComponentsRegistry>
  );
}
