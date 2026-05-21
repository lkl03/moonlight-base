export const dynamic = 'force-dynamic';

import type { CSSProperties } from 'react';
import { getAdminDb } from '@/lib/firebase/admin';
import type * as FirebaseAdmin from 'firebase-admin';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────

type TS = FirebaseAdmin.firestore.Timestamp;

function fmtTs(ts: TS | null | undefined): string {
  if (!ts || typeof ts.toDate !== 'function') return '—';
  return ts.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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

function onboardingColor(status: string | undefined): string {
  switch (status) {
    case 'reviewed': return '#17F2A6';
    case 'submitted': return '#a5b4fc';
    default: return 'rgba(255,255,255,0.35)';
  }
}

function onboardingLabel(status: string | undefined): string {
  switch (status) {
    case 'reviewed': return 'Reviewed';
    case 'submitted': return 'Submitted';
    default: return 'Pending';
  }
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s: Record<string, CSSProperties> = {
  wrap: { maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' },
  pageTitle: { fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem' },
  pageSubtitle: { fontSize: '0.85rem', color: '#6b7280', marginBottom: '2.5rem' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.85rem', marginBottom: '2.5rem' },
  metricCard: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1.1rem 1.25rem' },
  metricLabel: { fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#6b7280', marginBottom: '0.4rem' },
  metricValue: { fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '1.7rem', color: '#fff' },
  section: { marginBottom: '2.5rem' },
  sectionTitle: { fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#17F2A6', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' },
  tableWrap: { overflowX: 'auto' as const, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '0.82rem', minWidth: '720px' },
  th: { padding: '0.65rem 1rem', textAlign: 'left' as const, background: 'rgba(255,255,255,0.04)', color: '#6b7280', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.07em', textTransform: 'uppercase' as const, borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' as const },
  td: { padding: '0.65rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#dcdcdc', verticalAlign: 'top' as const },
  tdMono: { padding: '0.65rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#9ca3a3', fontFamily: 'monospace', fontSize: '0.78rem', verticalAlign: 'top' as const },
  link: { color: '#17F2A6', textDecoration: 'none', fontWeight: 600 },
  emptyState: { padding: '2rem', textAlign: 'center' as const, color: '#6b7280', fontSize: '0.875rem' },
};

function badge(color: string): CSSProperties {
  return {
    display: 'inline-block',
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color,
    background: `${color}18`,
    borderRadius: '999px',
    padding: '0.15rem 0.55rem',
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminDashboard() {
  const db = getAdminDb();

  // Fetch all collections in parallel
  const [subSnap, custSnap, userSnap, onboardSnap] = await Promise.all([
    db.collection('subscriptions').orderBy('createdAt', 'desc').get(),
    db.collection('customers').get(),
    db.collection('users').get(),
    db.collection('onboarding_submissions').orderBy('createdAt', 'desc').get(),
  ]);

  // Build lookup maps
  const custMap = new Map(custSnap.docs.map((d) => [d.id, d.data()]));
  const userMap = new Map(userSnap.docs.map((d) => [d.id, d.data()]));

  type SubRow = {
    id: string;
    name: string;
    email: string;
    planName: string;
    monthlyPrice: number;
    currency: string;
    status: string;
    paypalSubscriptionId: string;
    minimumCommitmentEndAt: TS | null;
    onboardingStatus: string | undefined;
    createdAt: TS | null;
  };

  const subs: SubRow[] = subSnap.docs.map((d) => {
    const data = d.data();
    const cust = custMap.get(data.customerId as string);
    const usr = userMap.get(data.userId as string);
    return {
      id: d.id,
      name: (cust?.name ?? usr?.name ?? '') as string,
      email: (cust?.email ?? usr?.email ?? '') as string,
      planName: (data.planName ?? '') as string,
      monthlyPrice: (data.monthlyPrice ?? 0) as number,
      currency: (data.currency ?? 'USD') as string,
      status: (data.status ?? 'unknown') as string,
      paypalSubscriptionId: (data.paypalSubscriptionId ?? '') as string,
      minimumCommitmentEndAt: (data.minimumCommitmentEndAt ?? null) as TS | null,
      onboardingStatus: data.onboardingStatus as string | undefined,
      createdAt: (data.createdAt ?? null) as TS | null,
    };
  });

  // Overview counts
  const total = subs.length;
  const active = subs.filter((s) => s.status === 'active').length;
  const cancelled = subs.filter((s) => s.status === 'cancelled').length;
  const pending = subs.filter((s) => ['pending', 'paypal_approved', 'suspended'].includes(s.status)).length;
  const obNotStarted = subs.filter((s) => !s.onboardingStatus || s.onboardingStatus === 'not_started').length;
  const obSubmitted = onboardSnap.docs.filter((d) => d.data().status === 'submitted').length;
  const obReviewed = onboardSnap.docs.filter((d) => d.data().status === 'reviewed').length;

  const metrics = [
    { label: 'Total subscriptions', value: total },
    { label: 'Active', value: active },
    { label: 'Cancelled', value: cancelled },
    { label: 'Pending / Other', value: pending },
    { label: 'Onboarding pending', value: obNotStarted },
    { label: 'Onboarding submitted', value: obSubmitted },
    { label: 'Onboarding reviewed', value: obReviewed },
  ];

  return (
    <main style={s.wrap}>
      <h1 style={s.pageTitle}>Dashboard</h1>
      <p style={s.pageSubtitle}>Overview of all client subscriptions and onboarding status.</p>

      {/* Overview cards */}
      <div style={s.cardGrid}>
        {metrics.map((m) => (
          <div key={m.label} style={s.metricCard}>
            <div style={s.metricLabel}>{m.label}</div>
            <div style={s.metricValue}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Recent subscriptions */}
      <div style={s.section}>
        <div style={s.sectionTitle}>All subscriptions</div>
        {subs.length === 0 ? (
          <div style={s.emptyState}>No subscriptions yet.</div>
        ) : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Client</th>
                  <th style={s.th}>Plan</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}>Onboarding</th>
                  <th style={s.th}>Min. commitment end</th>
                  <th style={s.th}>Created</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {subs.map((sub) => (
                  <tr key={sub.id}>
                    <td style={s.td}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{sub.name || '—'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>{sub.email}</div>
                    </td>
                    <td style={s.td}>
                      {sub.planName}
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>
                        ${sub.monthlyPrice}/{sub.currency}/mo
                      </div>
                    </td>
                    <td style={s.td}>
                      <span style={badge(statusColor(sub.status))}>
                        {sub.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={s.td}>
                      <span style={badge(onboardingColor(sub.onboardingStatus))}>
                        {onboardingLabel(sub.onboardingStatus)}
                      </span>
                    </td>
                    <td style={s.td}>{fmtTs(sub.minimumCommitmentEndAt)}</td>
                    <td style={s.td}>{fmtTs(sub.createdAt)}</td>
                    <td style={s.td}>
                      <Link href={`/admin/subscriptions/${sub.id}`} style={s.link}>
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent onboarding */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          Recent onboarding submissions{' '}
          <Link href="/admin/onboarding" style={{ ...s.link, fontSize: '0.8rem', marginLeft: '0.5rem' }}>
            View all →
          </Link>
        </div>
        {onboardSnap.docs.length === 0 ? (
          <div style={s.emptyState}>No onboarding submissions yet.</div>
        ) : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.th}>Client</th>
                  <th style={s.th}>Business</th>
                  <th style={s.th}>Status</th>
                  <th style={s.th}>Timeline</th>
                  <th style={s.th}>Submitted</th>
                  <th style={s.th}></th>
                </tr>
              </thead>
              <tbody>
                {onboardSnap.docs.slice(0, 10).map((d) => {
                  const ob = d.data();
                  return (
                    <tr key={d.id}>
                      <td style={s.td}>
                        <div style={{ fontWeight: 600, color: '#fff' }}>{(ob.clientName as string) || '—'}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>{ob.clientEmail as string}</div>
                      </td>
                      <td style={s.td}>{(ob.businessName as string) || '—'}</td>
                      <td style={s.td}>
                        <span style={badge(onboardingColor(ob.status as string))}>
                          {onboardingLabel(ob.status as string)}
                        </span>
                      </td>
                      <td style={s.td}>{(ob.launchTimeline as string) || '—'}</td>
                      <td style={s.td}>{fmtTs(ob.createdAt as TS)}</td>
                      <td style={s.td}>
                        <Link href={`/admin/onboarding/${d.id}`} style={s.link}>
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
