'use client';

import { useEffect, useState, type FormEvent, type CSSProperties } from 'react';
import { getClientAuth } from '@/lib/firebase/client';
import {
  onAuthStateChanged,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signOut,
  type User,
} from 'firebase/auth';
import type { PortalMeResponse } from '@/app/api/portal/me/route';

// ── Types ─────────────────────────────────────────────────────────────────────

type PortalData = PortalMeResponse;

type View =
  | 'init'
  | 'login'
  | 'submitting'
  | 'link-sent'
  | 'completing'
  | 'need-email'
  | 'loading-data'
  | 'dashboard'
  | 'no-subscription'
  | 'error';

const STORAGE_KEY = 'moonlight_portal_signin_email';

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

function statusBadge(status: string): { label: string; color: string; bg: string } {
  switch (status) {
    case 'active':
      return { label: 'Active', color: '#121717', bg: '#17F2A6' };
    case 'paypal_approved':
      return { label: 'Pending activation', color: '#93c5fd', bg: 'rgba(96,165,250,0.15)' };
    case 'pending':
      return { label: 'Pending', color: '#fcd34d', bg: 'rgba(245,158,11,0.15)' };
    case 'suspended':
      return { label: 'Suspended', color: '#fdba74', bg: 'rgba(249,115,22,0.15)' };
    case 'cancelled':
      return { label: 'Cancelled', color: '#fca5a5', bg: 'rgba(239,68,68,0.15)' };
    case 'expired':
      return { label: 'Expired', color: '#f87171', bg: 'rgba(239,68,68,0.12)' };
    default:
      return { label: status.replace('_', ' '), color: '#dcdcdc', bg: 'rgba(255,255,255,0.08)' };
  }
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#121717',
    color: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '2rem 1.5rem',
  },
  brand: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#17F2A6',
    marginBottom: '1.75rem',
  },
  loginCard: {
    width: '100%',
    maxWidth: '400px',
  },
  h1: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
    color: '#ffffff',
    marginBottom: '0.75rem',
    lineHeight: 1.15,
  },
  subheading: {
    fontSize: '0.9rem',
    color: '#dcdcdc',
    lineHeight: 1.8,
    marginBottom: '1.75rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.8rem 1.5rem',
    background: '#45a383',
    color: '#ffffff',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.95rem',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    width: '100%',
  },
  btnSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.7rem 1.25rem',
    background: 'transparent',
    color: '#dcdcdc',
    border: '1.5px solid rgba(255,255,255,0.18)',
    borderRadius: '8px',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  successBox: {
    padding: '1.25rem 1.5rem',
    background: 'rgba(23,242,166,0.07)',
    border: '1px solid rgba(23,242,166,0.2)',
    borderRadius: '10px',
    marginBottom: '1.25rem',
  },
  successTitle: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '1.05rem',
    color: '#17F2A6',
    marginBottom: '0.5rem',
  },
  errorBox: {
    padding: '0.75rem 1rem',
    background: 'rgba(239,68,68,0.08)',
    border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#fca5a5',
    marginBottom: '0.75rem',
    lineHeight: 1.6,
  },
  dashboard: {
    maxWidth: '720px',
    width: '100%',
    margin: '0 auto',
    padding: '3rem 1.5rem 5rem',
  },
  dashHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    marginBottom: '2.5rem',
  },
  welcomeText: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    color: '#ffffff',
    margin: 0,
    lineHeight: 1.2,
  },
  welcomeSub: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.45)',
    margin: '0.3rem 0 0',
  },
  headerActions: {
    display: 'flex',
    gap: '0.6rem',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    flexShrink: 0,
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '0.65rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#17F2A6',
    marginBottom: '1.25rem',
  },
  dataRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.55rem 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  dataRowLast: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.55rem 0',
  },
  rowLabel: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.5)',
    flexShrink: 0,
  },
  rowValue: {
    fontSize: '0.85rem',
    color: '#ffffff',
    textAlign: 'right' as const,
  },
  refCode: {
    fontFamily: 'monospace',
    fontSize: '0.78rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '5px',
    padding: '0.2rem 0.5rem',
    wordBreak: 'break-all' as const,
    color: '#dcdcdc',
  },
  warningBox: {
    marginTop: '1rem',
    padding: '0.75rem 1rem',
    background: 'rgba(245,158,11,0.08)',
    border: '1px solid rgba(245,158,11,0.22)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    color: '#fcd34d',
    lineHeight: 1.6,
  },
  pendingBadge: {
    display: 'inline-block',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    background: 'rgba(255,255,255,0.07)',
    color: '#dcdcdc',
    borderRadius: '999px',
    padding: '0.2rem 0.65rem',
    marginBottom: '0.85rem',
  },
  cardDesc: {
    fontSize: '0.875rem',
    color: '#dcdcdc',
    lineHeight: 1.75,
    marginBottom: '1.1rem',
  },
  link: { color: '#17F2A6', textDecoration: 'none' },
  divider: {
    border: 0,
    height: '1px',
    background: 'rgba(255,255,255,0.06)',
    margin: '1.5rem 0',
  },
  legalNote: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.35)',
    lineHeight: 1.7,
  },
  spinner: {
    display: 'inline-block',
    width: '22px',
    height: '22px',
    border: '2px solid rgba(255,255,255,0.12)',
    borderTop: '2px solid #17F2A6',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

const SPIN_CSS = `@keyframes spin { to { transform: rotate(360deg); } }`;

// ── Component ─────────────────────────────────────────────────────────────────

export default function PortalPage() {
  const [view, setView] = useState<View>('init');
  const [loginEmail, setLoginEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [data, setData] = useState<PortalData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async (u: User) => {
      setView('loading-data');
      try {
        const token = await u.getIdToken();
        const res = await fetch('/api/portal/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 404) { setView('no-subscription'); return; }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setData((await res.json()) as PortalData);
        setView('dashboard');
      } catch {
        setView('error');
      }
    };

    const clientAuth = getClientAuth();
    const unsubscribe = onAuthStateChanged(clientAuth, async (u) => {
      if (u) {
        setUser(u);
        await fetchData(u);
      } else if (isSignInWithEmailLink(clientAuth, window.location.href)) {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setView('completing');
          try {
            await signInWithEmailLink(clientAuth, stored, window.location.href);
            localStorage.removeItem(STORAGE_KEY);
            window.history.replaceState({}, '', '/portal');
            // onAuthStateChanged fires again with the authenticated user.
          } catch {
            setLoginError('This login link is invalid or has expired. Please request a new one.');
            setView('login');
          }
        } else {
          setView('need-email');
        }
      } else {
        setView('login');
      }
    });

    return () => unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRequestLink = async (e: FormEvent) => {
    e.preventDefault();
    const normalized = loginEmail.trim().toLowerCase();
    if (!normalized || !normalized.includes('@')) {
      setLoginError('Please enter a valid email address.');
      return;
    }
    setLoginError('');
    setIsSubmitting(true);
    try {
      localStorage.setItem(STORAGE_KEY, normalized);
      await fetch('/api/portal/request-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalized }),
      });
      setView('link-sent');
    } catch {
      setLoginError('Something went wrong. Please try again.');
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmEmail = async (e: FormEvent) => {
    e.preventDefault();
    const normalized = confirmEmail.trim().toLowerCase();
    if (!normalized || !normalized.includes('@')) {
      setLoginError('Please enter a valid email address.');
      return;
    }
    setLoginError('');
    setView('completing');
    try {
      await signInWithEmailLink(getClientAuth(), normalized, window.location.href);
      window.history.replaceState({}, '', '/portal');
    } catch {
      setLoginError('This login link is invalid or has expired. Please request a new one.');
      setView('login');
    }
  };

  const handleSignOut = async () => {
    await signOut(getClientAuth());
    setUser(null);
    setData(null);
    setView('login');
  };

  // Spinner screens
  if (view === 'init' || view === 'completing' || view === 'loading-data') {
    return (
      <div style={s.page}>
        <style>{SPIN_CSS}</style>
        <div style={s.center}><div style={s.spinner} /></div>
      </div>
    );
  }

  // Login / link-sent / need-email
  if (view === 'login' || view === 'link-sent' || view === 'need-email') {
    return (
      <div style={s.page}>
        <style>{SPIN_CSS}</style>
        <div style={s.center}>
          <div style={s.loginCard}>
            <div style={s.brand}>Moonlight Web Designs</div>

            {view === 'link-sent' && (
              <>
                <div style={s.successBox}>
                  <div style={s.successTitle}>Check your inbox</div>
                  <p style={{ fontSize: '0.875rem', color: '#dcdcdc', lineHeight: 1.75, margin: 0 }}>
                    If an active subscription exists for this email, you&apos;ll receive a
                    secure login link shortly. The link expires in 1 hour.
                  </p>
                </div>
                <button
                  style={{ ...s.btnSecondary, width: '100%' }}
                  onClick={() => { setView('login'); setLoginError(''); }}
                >
                  ← Try a different email
                </button>
              </>
            )}

            {view === 'need-email' && (
              <>
                <h1 style={s.h1}>Confirm your email</h1>
                <p style={s.subheading}>
                  Enter the email address you used when requesting your login link to
                  complete sign-in.
                </p>
                {loginError && <div style={s.errorBox}>{loginError}</div>}
                <form style={s.form} onSubmit={handleConfirmEmail}>
                  <input
                    style={s.input}
                    type="email"
                    placeholder="Email address"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <button style={s.btnPrimary} type="submit">Continue</button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <a href="/portal" style={{ ...s.link, fontSize: '0.875rem' }}>
                    ← Back to login
                  </a>
                </div>
              </>
            )}

            {view === 'login' && (
              <>
                <h1 style={s.h1}>Client Portal</h1>
                <p style={s.subheading}>
                  Access your Moonlight Web Designs client portal. Enter the email you
                  used when subscribing and we&apos;ll send you a secure login link.
                </p>
                {loginError && <div style={s.errorBox}>{loginError}</div>}
                <form style={s.form} onSubmit={handleRequestLink}>
                  <input
                    style={s.input}
                    type="email"
                    placeholder="Email address"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <button
                    style={{ ...s.btnPrimary, opacity: isSubmitting ? 0.65 : 1 }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending…' : 'Send login link'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (view === 'error') {
    return (
      <div style={s.page}>
        <div style={s.center}>
          <div style={{ ...s.loginCard, textAlign: 'center' }}>
            <p style={{ color: '#dcdcdc', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              Something went wrong. Please try again.
            </p>
            <button style={s.btnSecondary} onClick={() => { setView('login'); setData(null); }}>
              Back to login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No subscription
  if (view === 'no-subscription') {
    return (
      <div style={s.page}>
        <div style={s.center}>
          <div style={s.loginCard}>
            <h1 style={{ ...s.h1, fontSize: '1.5rem' }}>No subscription found</h1>
            <p style={{ color: '#dcdcdc', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              We couldn&apos;t find an active subscription for{' '}
              <strong>{user?.email}</strong>. If you believe this is an error, contact{' '}
              <a href="mailto:hello@moonlightwebdesigns.com" style={s.link}>
                hello@moonlightwebdesigns.com
              </a>
              .
            </p>
            <button style={{ ...s.btnSecondary, width: '100%' }} onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  if (view === 'dashboard' && data) {
    const badge = statusBadge(data.status);
    return (
      <div style={s.page}>
        <style>{SPIN_CSS}</style>
        <div style={s.dashboard}>

          <div style={s.dashHeader}>
            <div>
              <h1 style={s.welcomeText}>
                Welcome, {data.clientName || user?.email?.split('@')[0]}
              </h1>
              <p style={s.welcomeSub}>{data.clientEmail}</p>
            </div>
            <div style={s.headerActions}>
              <a href="/" style={s.btnSecondary}>← Homepage</a>
              <button
                style={{ ...s.btnSecondary, cursor: 'pointer' }}
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>

          {/* Current Plan */}
          <div style={s.card}>
            <div style={s.cardTitle}>Current Plan</div>
            <div style={s.dataRow}>
              <span style={s.rowLabel}>Plan</span>
              <span style={s.rowValue}>{data.planName}</span>
            </div>
            <div style={s.dataRow}>
              <span style={s.rowLabel}>Monthly price</span>
              <span style={s.rowValue}>${data.monthlyPrice} {data.currency}</span>
            </div>
            <div style={s.dataRow}>
              <span style={s.rowLabel}>Billing method</span>
              <span style={s.rowValue}>PayPal</span>
            </div>
            <div style={s.dataRow}>
              <span style={s.rowLabel}>Status</span>
              <span style={{
                display: 'inline-block',
                background: badge.bg,
                color: badge.color,
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.15rem 0.55rem',
                borderRadius: '999px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {badge.label}
              </span>
            </div>
            <div style={s.dataRowLast}>
              <span style={s.rowLabel}>PayPal reference</span>
              <span style={s.refCode}>{data.paypalSubscriptionId}</span>
            </div>
          </div>

          {/* Minimum Commitment */}
          <div style={s.card}>
            <div style={s.cardTitle}>Minimum Commitment</div>
            <div style={s.dataRow}>
              <span style={s.rowLabel}>Commitment period</span>
              <span style={s.rowValue}>{data.minimumCommitmentMonths} months</span>
            </div>
            <div style={s.dataRow}>
              <span style={s.rowLabel}>Subscription started</span>
              <span style={s.rowValue}>{fmtDate(data.startedAt)}</span>
            </div>
            <div style={s.dataRowLast}>
              <span style={s.rowLabel}>Minimum term end</span>
              <span style={s.rowValue}>{fmtDate(data.minimumCommitmentEndAt)}</span>
            </div>
            {data.earlyCancelledWithRemainingCommitment && (
              <div style={s.warningBox}>
                ⚠ This subscription was cancelled before the end of the minimum commitment
                period. You may still owe remaining months per the{' '}
                <a href="/terms" style={{ color: '#fcd34d', textDecoration: 'underline' }}>
                  Terms of Service
                </a>.
              </div>
            )}
          </div>

          {/* Onboarding */}
          <div style={s.card}>
            <div style={s.cardTitle}>Onboarding</div>
            {data.onboardingStatus === 'reviewed' ? (
              <>
                <div style={{
                  ...s.pendingBadge,
                  background: 'rgba(23,242,166,0.12)',
                  color: '#17F2A6',
                }}>Reviewed</div>
                <p style={s.cardDesc}>
                  Your onboarding details have been reviewed. We&apos;re working on your
                  project. Contact us if you need to make any changes.
                </p>
                <a
                  href="/portal/onboarding"
                  style={{ ...s.btnSecondary, display: 'inline-flex' }}
                >
                  View / update onboarding
                </a>
              </>
            ) : data.onboardingStatus === 'submitted' ? (
              <>
                <div style={{
                  ...s.pendingBadge,
                  background: 'rgba(99,102,241,0.15)',
                  color: '#a5b4fc',
                }}>Submitted</div>
                <p style={s.cardDesc}>
                  We received your onboarding details{data.onboardingSubmittedAt
                    ? ` on ${fmtDate(data.onboardingSubmittedAt)}`
                    : ''}. We&apos;ll review everything and be in touch soon.
                </p>
                <a
                  href="/portal/onboarding"
                  style={{ ...s.btnSecondary, display: 'inline-flex' }}
                >
                  Update onboarding
                </a>
              </>
            ) : (
              <>
                <div style={s.pendingBadge}>Pending</div>
                <p style={s.cardDesc}>
                  We&apos;ll use onboarding to collect your business details, website
                  content, design preferences, and launch requirements.
                </p>
                <a
                  href="/portal/onboarding"
                  style={{ ...s.btnPrimary, width: 'auto', display: 'inline-flex' }}
                >
                  Complete onboarding →
                </a>
              </>
            )}
          </div>

          {/* Support */}
          <div style={s.card}>
            <div style={s.cardTitle}>Support</div>
            <p style={s.cardDesc}>
              Need to make changes to your plan or billing? Contact us and we&apos;ll help.
            </p>
            <a href="mailto:hello@moonlightwebdesigns.com" style={s.link}>
              hello@moonlightwebdesigns.com
            </a>
          </div>

          <hr style={s.divider} />

          <p style={s.legalNote}>
            Managing or cancelling your PayPal automatic payment does not waive the
            12-month minimum commitment described in the{' '}
            <a href="/terms" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>
              Terms of Service
            </a>.
          </p>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div style={s.page}>
      <style>{SPIN_CSS}</style>
      <div style={s.center}><div style={s.spinner} /></div>
    </div>
  );
}
