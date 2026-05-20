import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';

export interface PortalMeResponse {
  planName: string;
  monthlyPrice: number;
  currency: string;
  status: string;
  paypalSubscriptionId: string;
  startedAt: string;
  minimumCommitmentMonths: number;
  minimumCommitmentEndAt: string;
  earlyCancelledWithRemainingCommitment: boolean;
  clientName: string;
  clientEmail: string;
  lastPaymentAt: string | null;
}

function tsToISO(ts: unknown): string | null {
  if (!ts || typeof (ts as Record<string, unknown>).toDate !== 'function') return null;
  return ((ts as { toDate: () => Date }).toDate)().toISOString();
}

export async function GET(request: NextRequest) {
  const bearer = request.headers.get('Authorization') ?? '';
  const token = bearer.startsWith('Bearer ') ? bearer.slice(7) : '';
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let email: string;
  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    email = (decoded.email ?? '').toLowerCase();
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  if (!email) return NextResponse.json({ error: 'No email in token' }, { status: 400 });

  try {
    const db = getAdminDb();
    let subData: Record<string, unknown> | null = null;
    let clientName = '';

    // Primary path: find subscription via customer record (created by webhook on activation).
    const custSnap = await db
      .collection('customers')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (!custSnap.empty) {
      const cust = custSnap.docs[0];
      clientName = (cust.data().name as string) ?? '';
      const subSnap = await db
        .collection('subscriptions')
        .where('customerId', '==', cust.id)
        .limit(1)
        .get();
      if (!subSnap.empty) subData = subSnap.docs[0].data() as Record<string, unknown>;
    }

    // Fallback: find via Firestore users collection.
    if (!subData) {
      const userSnap = await db
        .collection('users')
        .where('email', '==', email)
        .limit(1)
        .get();
      if (!userSnap.empty) {
        const usr = userSnap.docs[0];
        if (!clientName) clientName = (usr.data().name as string) ?? '';
        const subSnap = await db
          .collection('subscriptions')
          .where('userId', '==', usr.id)
          .limit(1)
          .get();
        if (!subSnap.empty) subData = subSnap.docs[0].data() as Record<string, unknown>;
      }
    }

    if (!subData) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    const body: PortalMeResponse = {
      planName: (subData.planName as string) ?? '',
      monthlyPrice: (subData.monthlyPrice as number) ?? 0,
      currency: (subData.currency as string) ?? 'USD',
      status: (subData.status as string) ?? 'unknown',
      paypalSubscriptionId: (subData.paypalSubscriptionId as string) ?? '',
      startedAt: tsToISO(subData.startedAt) ?? '',
      minimumCommitmentMonths: (subData.minimumCommitmentMonths as number) ?? 12,
      minimumCommitmentEndAt: tsToISO(subData.minimumCommitmentEndAt) ?? '',
      earlyCancelledWithRemainingCommitment:
        (subData.earlyCancelledWithRemainingCommitment as boolean) ?? false,
      clientName: clientName || ((subData.clientName as string) ?? ''),
      clientEmail: email,
      lastPaymentAt: tsToISO(subData.lastPaymentAt),
    };

    return NextResponse.json(body);
  } catch (err) {
    console.error('[portal/me] error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
