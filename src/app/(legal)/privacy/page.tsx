import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Moonlight Web Designs',
};

export default function PrivacyPage() {
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
        Privacy Policy
      </h1>
      <p style={{ opacity: 0.7, lineHeight: 1.7, fontSize: '1rem' }}>
        Our Privacy Policy is coming soon. Please check back later.
      </p>
    </div>
  );
}
