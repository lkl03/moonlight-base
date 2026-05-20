'use client';

import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from '@/components/Layout/GlobalStyles';

export default function PortalPage() {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
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
        <div
          style={{
            maxWidth: '36rem',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              margin: 0,
            }}
          >
            Client Portal
          </h1>

          <p style={{ opacity: 0.75, lineHeight: 1.7, margin: 0 }}>
            Your Moonlight client portal is coming soon.
          </p>

          <p style={{ opacity: 0.75, lineHeight: 1.7, margin: 0 }}>
            Soon, you&apos;ll be able to view your plan, subscription status,
            onboarding steps, support requests, and billing details here.
          </p>

          <p style={{ opacity: 0.75, lineHeight: 1.7, margin: 0 }}>
            For now, contact{' '}
            <a
              href="mailto:contact.eterlab@gmail.com"
              style={{ color: 'var(--green)', textDecoration: 'none' }}
            >
              contact.eterlab@gmail.com
            </a>{' '}
            for subscription or onboarding support.
          </p>

          <p
            style={{
              marginTop: '0.5rem',
              padding: '1rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid var(--light-gray)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              opacity: 0.65,
            }}
          >
            Managing or cancelling your PayPal automatic payment does not waive
            the 12-month minimum commitment described in the{' '}
            <a
              href="/terms"
              style={{ color: 'var(--green)', textDecoration: 'none' }}
            >
              Terms of Service
            </a>
            .
          </p>
        </div>
      </main>
    </StyledComponentsRegistry>
  );
}
