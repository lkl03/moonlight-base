// Shared subscription selection helper.
// Used by portal/me, portal/onboarding, and admin routes.

import type * as admin from 'firebase-admin';

const STATUS_PRIORITY: Record<string, number> = {
  active: 0,
  paypal_approved: 1,
  pending: 2,
  suspended: 3,
  cancelled: 4,
  expired: 5,
};

type Doc = admin.firestore.QueryDocumentSnapshot;

function tsToMs(ts: unknown): number {
  if (!ts || typeof (ts as Record<string, unknown>).toDate !== 'function') return 0;
  return ((ts as { toDate: () => Date }).toDate)().getTime();
}

/**
 * Given an array of subscription documents, returns the "best" one using:
 *   1. Status priority: active > paypal_approved > pending > suspended > cancelled > expired
 *   2. Within the same priority, most recent updatedAt, then startedAt, then createdAt.
 *
 * Returns null if the array is empty.
 */
export function selectBestSubscription(docs: Doc[]): Doc | null {
  if (docs.length === 0) return null;
  if (docs.length > 1) {
    console.log(`[subscription] Selecting best among ${docs.length} subscriptions`);
  }
  return docs.slice().sort((a, b) => {
    const aStatus = (a.data().status as string) ?? '';
    const bStatus = (b.data().status as string) ?? '';
    const aPriority = STATUS_PRIORITY[aStatus] ?? 99;
    const bPriority = STATUS_PRIORITY[bStatus] ?? 99;
    if (aPriority !== bPriority) return aPriority - bPriority;
    // Same priority: most recent updatedAt → startedAt → createdAt
    const aTime = tsToMs(a.data().updatedAt) || tsToMs(a.data().startedAt) || tsToMs(a.data().createdAt);
    const bTime = tsToMs(b.data().updatedAt) || tsToMs(b.data().startedAt) || tsToMs(b.data().createdAt);
    return bTime - aTime;
  })[0];
}
