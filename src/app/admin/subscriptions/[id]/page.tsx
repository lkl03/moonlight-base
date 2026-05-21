export const dynamic = 'force-dynamic';

import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAdminDb } from '@/lib/firebase/admin';
import type * as FirebaseAdmin from 'firebase-admin';

type TS = FirebaseAdmin.firestore.Timestamp;

function fmtTs(ts: TS | null | undefined): string {
  if (!ts || typeof ts.toDate !== 'function') return '—';
  return ts.toDate().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function statusColor(status: string): string {
  switch (status) {
    case 'active': return '#17F2A6';
    case 'paypal_approved': return '#60a5fa';
    case 'pending': return '#fcd34d';
    case 'suspended': return '#fb923c';
    case 'cancelled': return '#f87171';
    case 'expired': return '#9ca3af';
    default: return '#dcdcdc';
  }
}

const s: Record<string, CSSProperties> = {
  wrap: { maxWidth: '780px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' },
  back: { color: '#17F2A6', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, display: 'inline-block', marginBottom: '1.75rem' },
  tag: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#17F2A6', marginBottom: '0.75rem', display: 'block' },
  h1: { fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem' },
  sub: { fontSize: '0.85rem', color: '#6b7280', marginBottom: '2rem' },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#17F2A6', marginBottom: '1rem' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  rowLast: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '0.55rem 0' },
  label: { fontSize: '0.83rem', color: '#6b7280', flexShrink: 0, minWidth: '180px' },
  value: { fontSize: '0.83rem', color: '#dcdcdc', textAlign: 'right' as const, wordBreak: 'break-all' as const },
  mono: { fontFamily: 'monospace', fontSize: '0.78rem', color: '#9ca3a3', wordBreak: 'break-all' as const },
  warningBox: { marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.22)', borderRadius: '8px', fontSize: '0.85rem', color: '#fcd34d', lineHeight: 1.6 },
};

function badge(color: string): CSSProperties {
  return {
    display: 'inline-block',
    fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color, background: `${color}18`,
    borderRadius: '999px', padding: '0.2rem 0.6rem',
  };
}

interface PageProps { params: { id: string } }

export default async function SubscriptionDetailPage({ params }: PageProps) {
  const db = getAdminDb();
  const subDoc = await db.collection('subscriptions').doc(params.id).get();
  if (!subDoc.exists) notFound();

  const sub = subDoc.data() as Record<string, unknown>;

  // Fetch customer and user for email/name
  const custId = sub.customerId as string | null;
  const userId = sub.userId as string | null;
  const cust = custId ? (await db.collection('customers').doc(custId).get()).data() : null;
  const usr = userId ? (await db.collection('users').doc(userId).get()).data() : null;

  const clientName = (cust?.name ?? usr?.name ?? '') as string;
  const clientEmail = (cust?.email ?? usr?.email ?? '') as string;
  const status = (sub.status ?? 'unknown') as string;

  return (
    <main style={s.wrap}>
      <Link href="/admin" style={s.back}>← Back to dashboard</Link>

      <span style={s.tag}>Subscription</span>
      <h1 style={s.h1}>{clientName || clientEmail || 'Unknown client'}</h1>
      <p style={s.sub}>{clientEmail}</p>

      {/* Plan & status */}
      <div style={s.card}>
        <div style={s.cardTitle}>Plan & Status</div>
        <div style={s.row}><span style={s.label}>Plan</span><span style={s.value}>{(sub.planName as string) || '—'}</span></div>
        <div style={s.row}><span style={s.label}>Monthly price</span><span style={s.value}>${(sub.monthlyPrice as number) ?? 0} {(sub.currency as string) || 'USD'}</span></div>
        <div style={s.row}>
          <span style={s.label}>Status</span>
          <span style={badge(statusColor(status))}>{status.replace('_', ' ')}</span>
        </div>
        <div style={s.row}><span style={s.label}>Onboarding status</span><span style={s.value}>{(sub.onboardingStatus as string) || 'not started'}</span></div>
        <div style={s.rowLast}><span style={s.label}>Early cancellation flag</span><span style={s.value}>{Boolean(sub.earlyCancelledWithRemainingCommitment) ? '⚠ Yes' : 'No'}</span></div>
        {Boolean(sub.earlyCancelledWithRemainingCommitment) && (
          <div style={s.warningBox}>⚠ This subscription was cancelled before the end of the minimum commitment period.</div>
        )}
      </div>

      {/* PayPal */}
      <div style={s.card}>
        <div style={s.cardTitle}>PayPal</div>
        <div style={s.row}><span style={s.label}>Subscription ID</span><span style={{ ...s.value, ...s.mono }}>{(sub.paypalSubscriptionId as string) || '—'}</span></div>
        <div style={s.row}><span style={s.label}>Plan ID</span><span style={{ ...s.value, ...s.mono }}>{(sub.paypalPlanId as string) || '—'}</span></div>
        <div style={s.row}><span style={s.label}>Checkout session ID</span><span style={{ ...s.value, ...s.mono }}>{(sub.checkoutSessionId as string) || '—'}</span></div>
        <div style={s.row}><span style={s.label}>Last payment at</span><span style={s.value}>{fmtTs(sub.lastPaymentAt as TS)}</span></div>
        <div style={s.row}><span style={s.label}>Last payment amount</span><span style={s.value}>{(sub.lastPaymentAmount as string) || '—'} {(sub.lastPaymentCurrency as string) || ''}</span></div>
        <div style={s.rowLast}><span style={s.label}>Last payment status</span><span style={s.value}>{(sub.lastPaymentStatus as string) || '—'}</span></div>
      </div>

      {/* Commitment */}
      <div style={s.card}>
        <div style={s.cardTitle}>Commitment Period</div>
        <div style={s.row}><span style={s.label}>Commitment months</span><span style={s.value}>{(sub.minimumCommitmentMonths as number) ?? 12}</span></div>
        <div style={s.row}><span style={s.label}>Started at</span><span style={s.value}>{fmtTs(sub.startedAt as TS)}</span></div>
        <div style={s.row}><span style={s.label}>Minimum term end</span><span style={s.value}>{fmtTs(sub.minimumCommitmentEndAt as TS)}</span></div>
        <div style={s.row}><span style={s.label}>Cancelled at</span><span style={s.value}>{fmtTs(sub.cancelledAt as TS)}</span></div>
        <div style={s.rowLast}><span style={s.label}>Onboarding submitted at</span><span style={s.value}>{fmtTs(sub.onboardingSubmittedAt as TS)}</span></div>
      </div>

      {/* Metadata */}
      <div style={s.card}>
        <div style={s.cardTitle}>Record IDs</div>
        <div style={s.row}><span style={s.label}>Subscription ID</span><span style={{ ...s.value, ...s.mono }}>{subDoc.id}</span></div>
        <div style={s.row}><span style={s.label}>Customer ID</span><span style={{ ...s.value, ...s.mono }}>{custId || '—'}</span></div>
        <div style={s.row}><span style={s.label}>User ID</span><span style={{ ...s.value, ...s.mono }}>{userId || '—'}</span></div>
        <div style={s.row}><span style={s.label}>Created</span><span style={s.value}>{fmtTs(sub.createdAt as TS)}</span></div>
        <div style={s.rowLast}><span style={s.label}>Updated</span><span style={s.value}>{fmtTs(sub.updatedAt as TS)}</span></div>
      </div>
    </main>
  );
}
