import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

export const metadata: Metadata = {
  title: 'Thank You — Moonlight Web Designs',
  description:
    'Thanks for subscribing to Moonlight Web Designs. We received your subscription request and will follow up with onboarding steps shortly.',
  robots: { index: false, follow: false },
};

const s: Record<string, CSSProperties> = {
  page: {
    maxWidth: '44rem',
    margin: '4rem auto 8rem',
    padding: '0 1.5rem',
    fontFamily: 'Raleway, sans-serif',
  },
  badge: {
    display: 'inline-block',
    background: 'var(--green, #17f2a6)',
    color: 'var(--Background, #121717)',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    padding: '0.3rem 0.8rem',
    borderRadius: '999px',
    marginBottom: '1.5rem',
  },
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(1.9rem, 5vw, 2.6rem)',
    color: 'var(--white)',
    marginBottom: '1.5rem',
    lineHeight: 1.15,
  },
  p: {
    fontSize: '0.975rem',
    color: 'var(--light-gray)',
    lineHeight: 1.8,
    marginBottom: '1rem',
  },
  divider: {
    border: 0,
    height: '1px',
    background: 'rgba(255,255,255,0.08)',
    margin: '2rem 0',
  },
  note: {
    fontSize: '0.875rem',
    color: 'var(--light-gray)',
    lineHeight: 1.8,
    opacity: 0.75,
    marginBottom: '0.75rem',
  },
  link: {
    color: 'var(--emerald)',
    textDecoration: 'none',
  },
};

export default function ThankYouPage() {
  return (
    <div style={s.page}>
      <div style={s.badge}>Subscription received</div>
      <h1 style={s.h1}>Thank you for subscribing to Moonlight Web Designs.</h1>

      <p style={s.p}>
        We received your subscription request. You&apos;ll receive the next onboarding
        steps by email shortly.
      </p>

      <p style={s.p}>
        Your subscription is billed monthly through PayPal. As stated in our{' '}
        <a href="/terms" style={s.link}>
          Terms of Service
        </a>
        , Moonlight Web Designs plans include a 12-month minimum contract.
      </p>

      <hr style={s.divider} />

      <p style={s.note}>
        If you have any questions, contact us at{' '}
        <a href="mailto:contact.eterlab@gmail.com" style={s.link}>
          contact.eterlab@gmail.com
        </a>
        .
      </p>

      <p style={s.note}>
        Note: If you are not redirected here automatically after subscribing, you can
        bookmark this page as confirmation. Make sure your PayPal subscription was
        completed successfully in your PayPal account.
      </p>
    </div>
  );
}
