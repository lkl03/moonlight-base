export const dynamic = 'force-dynamic';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getAdminDb } from '@/lib/firebase/admin';
import type * as FirebaseAdmin from 'firebase-admin';

type TS = FirebaseAdmin.firestore.Timestamp;

function fmtTs(ts: TS | null | undefined): string {
  if (!ts || typeof ts.toDate !== 'function') return '—';
  return ts.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function statusColor(status: string | undefined): string {
  switch (status) {
    case 'reviewed': return '#17F2A6';
    case 'submitted': return '#a5b4fc';
    default: return 'rgba(255,255,255,0.35)';
  }
}

function statusLabel(status: string | undefined): string {
  switch (status) {
    case 'reviewed': return 'Reviewed';
    case 'submitted': return 'Submitted';
    default: return 'Pending';
  }
}

const s: Record<string, CSSProperties> = {
  wrap: { maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' },
  back: { color: '#17F2A6', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, display: 'inline-block', marginBottom: '1.75rem' },
  h1: { fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem' },
  sub: { fontSize: '0.85rem', color: '#6b7280', marginBottom: '2rem' },
  tableWrap: { overflowX: 'auto' as const, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '0.82rem', minWidth: '700px' },
  th: { padding: '0.65rem 1rem', textAlign: 'left' as const, background: 'rgba(255,255,255,0.04)', color: '#6b7280', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.07em', textTransform: 'uppercase' as const, borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' as const },
  td: { padding: '0.65rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#dcdcdc', verticalAlign: 'top' as const },
  link: { color: '#17F2A6', textDecoration: 'none', fontWeight: 600 },
  empty: { padding: '2rem', textAlign: 'center' as const, color: '#6b7280', fontSize: '0.875rem' },
};

function badge(color: string): CSSProperties {
  return {
    display: 'inline-block',
    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color, background: `${color}18`,
    borderRadius: '999px', padding: '0.15rem 0.55rem',
  };
}

export default async function OnboardingListPage() {
  const db = getAdminDb();
  const snap = await db.collection('onboarding_submissions').orderBy('createdAt', 'desc').get();

  return (
    <main style={s.wrap}>
      <Link href="/admin" style={s.back}>← Back to dashboard</Link>
      <h1 style={s.h1}>Onboarding submissions</h1>
      <p style={s.sub}>{snap.docs.length} total submission{snap.docs.length !== 1 ? 's' : ''}</p>

      {snap.docs.length === 0 ? (
        <div style={s.empty}>No onboarding submissions yet.</div>
      ) : (
        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Client</th>
                <th style={s.th}>Business</th>
                <th style={s.th}>Primary goal</th>
                <th style={s.th}>Timeline</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Submitted</th>
                <th style={s.th}></th>
              </tr>
            </thead>
            <tbody>
              {snap.docs.map((d) => {
                const ob = d.data();
                const status = ob.status as string | undefined;
                return (
                  <tr key={d.id}>
                    <td style={s.td}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{(ob.clientName as string) || '—'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>{ob.clientEmail as string}</div>
                    </td>
                    <td style={s.td}>{(ob.businessName as string) || '—'}</td>
                    <td style={s.td}>{(ob.primaryGoal as string) || '—'}</td>
                    <td style={s.td}>{(ob.launchTimeline as string) || '—'}</td>
                    <td style={s.td}>
                      <span style={badge(statusColor(status))}>{statusLabel(status)}</span>
                    </td>
                    <td style={s.td}>{fmtTs(ob.createdAt as TS)}</td>
                    <td style={s.td}>
                      <Link href={`/admin/onboarding/${d.id}`} style={s.link}>View →</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
