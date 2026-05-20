import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

export const metadata: Metadata = {
  title: 'Onboarding — Client Portal',
  robots: { index: false, follow: false },
};

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
    maxWidth: '540px',
    width: '100%',
  },
  label: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#17F2A6',
    marginBottom: '1.25rem',
    display: 'block',
  },
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
    color: '#ffffff',
    marginBottom: '1.25rem',
    lineHeight: 1.15,
  },
  p: {
    fontSize: '0.9rem',
    color: '#dcdcdc',
    lineHeight: 1.8,
    marginBottom: '1rem',
  },
  divider: {
    border: 0,
    height: '1px',
    background: 'rgba(255,255,255,0.07)',
    margin: '1.75rem 0',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.7rem 1.25rem',
    background: 'transparent',
    color: '#dcdcdc',
    border: '1.5px solid rgba(255,255,255,0.18)',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 600,
    textDecoration: 'none',
  },
  contactLink: {
    color: '#17F2A6',
    textDecoration: 'none',
  },
};

export default function OnboardingPage() {
  return (
    <main style={s.page}>
      <div style={s.card}>
        <span style={s.label}>Client Portal</span>
        <h1 style={s.h1}>Onboarding</h1>

        <p style={s.p}>Your onboarding form is coming soon.</p>

        <p style={s.p}>
          We&apos;ll use this step to collect your business information, website goals,
          content, branding preferences, and launch requirements.
        </p>

        <p style={s.p}>
          For now, contact{' '}
          <a href="mailto:hello@moonlightwebdesigns.com" style={s.contactLink}>
            hello@moonlightwebdesigns.com
          </a>{' '}
          if you need help or want to get started sooner.
        </p>

        <hr style={s.divider} />

        <a href="/portal" style={s.backLink}>
          ← Back to portal
        </a>
      </div>
    </main>
  );
}
