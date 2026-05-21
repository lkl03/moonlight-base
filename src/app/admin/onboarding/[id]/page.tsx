export const dynamic = 'force-dynamic';

import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAdminDb } from '@/lib/firebase/admin';
import type * as FirebaseAdmin from 'firebase-admin';
import ReviewButton from './_components/ReviewButton';

type TS = FirebaseAdmin.firestore.Timestamp;

function fmtTs(ts: TS | null | undefined): string {
  if (!ts || typeof ts.toDate !== 'function') return '—';
  return ts.toDate().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

const s: Record<string, CSSProperties> = {
  wrap: { maxWidth: '780px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem' },
  back: { color: '#17F2A6', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, display: 'inline-block', marginBottom: '1.75rem' },
  tag: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#17F2A6', marginBottom: '0.75rem', display: 'block' },
  h1: { fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#fff', marginBottom: '0.4rem' },
  sub: { fontSize: '0.85rem', color: '#6b7280', marginBottom: '2rem' },
  actionRow: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' as const },
  card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' },
  cardTitle: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#17F2A6', marginBottom: '1rem' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  rowLast: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', padding: '0.55rem 0' },
  label: { fontSize: '0.83rem', color: '#6b7280', flexShrink: 0, minWidth: '200px' },
  value: { fontSize: '0.83rem', color: '#dcdcdc', textAlign: 'right' as const, wordBreak: 'break-word' as const, maxWidth: '380px' },
  chips: { display: 'flex', flexWrap: 'wrap' as const, gap: '0.4rem', justifyContent: 'flex-end' },
  chip: { fontSize: '0.72rem', background: 'rgba(23,242,166,0.08)', color: '#17F2A6', border: '1px solid rgba(23,242,166,0.2)', borderRadius: '6px', padding: '0.15rem 0.55rem' },
};

interface PageProps { params: { id: string } }

export default async function OnboardingDetailPage({ params }: PageProps) {
  const db = getAdminDb();
  const snap = await db.collection('onboarding_submissions').doc(params.id).get();
  if (!snap.exists) notFound();

  const ob = snap.data() as Record<string, unknown>;
  const isReviewed = ob.status === 'reviewed';

  function val(key: string): string {
    const v = ob[key];
    if (!v) return '—';
    if (typeof v === 'string') return v || '—';
    return String(v);
  }

  const desiredPages = Array.isArray(ob.desiredPages) ? (ob.desiredPages as string[]) : [];
  const desiredFeatures = Array.isArray(ob.desiredFeatures) ? (ob.desiredFeatures as string[]) : [];

  return (
    <main style={s.wrap}>
      <Link href="/admin/onboarding" style={s.back}>← Back to onboarding list</Link>

      <span style={s.tag}>Onboarding submission</span>
      <h1 style={s.h1}>{val('businessName')}</h1>
      <p style={s.sub}>{val('clientName')} · {val('clientEmail')}</p>

      <div style={s.actionRow}>
        <ReviewButton submissionId={snap.id} isReviewed={isReviewed} />
        {typeof ob.subscriptionId === 'string' && ob.subscriptionId && (
          <Link href={`/admin/subscriptions/${ob.subscriptionId}`} style={{ color: '#9ca3a3', fontSize: '0.82rem', textDecoration: 'none' }}>
            View subscription →
          </Link>
        )}
      </div>

      {/* Business basics */}
      <div style={s.card}>
        <div style={s.cardTitle}>Business basics</div>
        <div style={s.row}><span style={s.label}>Business name</span><span style={s.value}>{val('businessName')}</span></div>
        <div style={s.row}><span style={s.label}>Industry</span><span style={s.value}>{val('businessIndustry')}</span></div>
        <div style={s.row}><span style={s.label}>Primary goal</span><span style={s.value}>{val('primaryGoal')}</span></div>
        <div style={s.row}><span style={s.label}>Target audience</span><span style={s.value}>{val('targetAudience')}</span></div>
        <div style={s.rowLast}><span style={s.label}>Business description</span><span style={s.value}>{val('businessDescription')}</span></div>
      </div>

      {/* Website scope */}
      <div style={s.card}>
        <div style={s.cardTitle}>Website scope</div>
        <div style={s.row}>
          <span style={s.label}>Desired pages</span>
          <div style={s.chips}>
            {desiredPages.length > 0
              ? desiredPages.map((p) => <span key={p} style={s.chip}>{p}</span>)
              : <span style={s.value}>—</span>}
          </div>
        </div>
        <div style={s.row}><span style={s.label}>Has existing website</span><span style={s.value}>{ob.hasExistingWebsite ? 'Yes' : 'No'}</span></div>
        <div style={s.rowLast}><span style={s.label}>Existing website URL</span><span style={s.value}>{val('existingWebsiteUrl')}</span></div>
      </div>

      {/* Branding */}
      <div style={s.card}>
        <div style={s.cardTitle}>Branding & design</div>
        <div style={s.row}><span style={s.label}>Brand colours</span><span style={s.value}>{val('brandColors')}</span></div>
        <div style={s.row}><span style={s.label}>Brand fonts</span><span style={s.value}>{val('brandFonts')}</span></div>
        <div style={s.rowLast}><span style={s.label}>Design notes</span><span style={s.value}>{val('designNotes')}</span></div>
      </div>

      {/* Content */}
      <div style={s.card}>
        <div style={s.cardTitle}>Content</div>
        <div style={s.row}><span style={s.label}>Providing own content</span><span style={s.value}>{ob.providingOwnContent ? 'Yes' : 'No'}</span></div>
        <div style={s.row}><span style={s.label}>Content notes</span><span style={s.value}>{val('contentNotes')}</span></div>
        <div style={s.rowLast}><span style={s.label}>Inspiration URLs</span><span style={s.value}>{val('inspirationUrls')}</span></div>
      </div>

      {/* Integrations & launch */}
      <div style={s.card}>
        <div style={s.cardTitle}>Integrations & launch</div>
        <div style={s.row}>
          <span style={s.label}>Desired features</span>
          <div style={s.chips}>
            {desiredFeatures.length > 0
              ? desiredFeatures.map((f) => <span key={f} style={s.chip}>{f}</span>)
              : <span style={s.value}>—</span>}
          </div>
        </div>
        <div style={s.row}><span style={s.label}>Launch timeline</span><span style={s.value}>{val('launchTimeline')}</span></div>
        <div style={s.rowLast}><span style={s.label}>Additional notes</span><span style={s.value}>{val('additionalNotes')}</span></div>
      </div>

      {/* Metadata */}
      <div style={s.card}>
        <div style={s.cardTitle}>Record</div>
        <div style={s.row}><span style={s.label}>Submission ID</span><span style={{ ...s.value, fontFamily: 'monospace', fontSize: '0.78rem', color: '#9ca3a3' }}>{snap.id}</span></div>
        <div style={s.row}><span style={s.label}>Status</span><span style={s.value}>{val('status')}</span></div>
        <div style={s.row}><span style={s.label}>Submitted</span><span style={s.value}>{fmtTs(ob.createdAt as TS)}</span></div>
        <div style={s.row}><span style={s.label}>Last updated</span><span style={s.value}>{fmtTs(ob.updatedAt as TS)}</span></div>
        <div style={s.rowLast}><span style={s.label}>Reviewed at</span><span style={s.value}>{fmtTs(ob.reviewedAt as TS)}</span></div>
      </div>
    </main>
  );
}
