import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Moonlight Web Designs',
};

export default function TermsPage() {
  return (
    <div
      style={{
        maxWidth: '48rem',
        margin: '8rem auto 6rem',
        textAlign: 'center',
        fontFamily: 'Raleway, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          marginBottom: '1.5rem',
        }}
      >
        Terms of Service
      </h1>
      <p style={{ opacity: 0.7, lineHeight: 1.7, fontSize: '1rem' }}>
        Our Terms of Service are coming soon. Please check back later.
      </p>
    </div>
  );
}
