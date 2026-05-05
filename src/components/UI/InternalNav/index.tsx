'use client';

import { useEffect, useState } from 'react';
import {
  HomeLink,
  ScrollTopButton,
  ThemeDivider,
  ThemeIconSlot,
  ThemeToggle,
  Wrapper,
} from './styles';

/* ── SVG icons (same as home FloatingNav) ──────────────────────────────── */
const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 18V6M12 6L7.5 10.5M12 6L16.5 10.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M20.4 14.2A8.7 8.7 0 1 1 12 3.6a7.1 7.1 0 0 0 8.4 10.6Z"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.85" />
    <path d="M12 2.75V5.1" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M12 18.9V21.25" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M21.25 12H18.9" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M5.1 12H2.75" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M18.55 5.45L16.9 7.1" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M7.1 16.9L5.45 18.55" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M18.55 18.55L16.9 16.9" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
    <path d="M7.1 7.1L5.45 5.45" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
  </svg>
);

/* ── Component ──────────────────────────────────────────────────────────── */
const InternalNav = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ml-theme');
    if (stored === 'light') {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // Fade in after theme is applied to avoid flash
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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

  return (
    <Wrapper aria-label="Page navigation" $mounted={mounted}>
      <ScrollTopButton type="button" onClick={scrollToTop} aria-label="Back to top">
        <ArrowUpIcon />
      </ScrollTopButton>

      <HomeLink href="/">← Home</HomeLink>

      <ThemeToggle
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <ThemeIconSlot $isActive={theme === 'dark'}>
          <MoonIcon />
        </ThemeIconSlot>
        <ThemeDivider aria-hidden="true" />
        <ThemeIconSlot $isActive={theme === 'light'}>
          <SunIcon />
        </ThemeIconSlot>
      </ThemeToggle>
    </Wrapper>
  );
};

export default InternalNav;
