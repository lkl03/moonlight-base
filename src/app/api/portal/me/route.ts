import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';
import { selectBestSubscription } from '@/lib/subscription';

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
  onboardingStatus: 'not_started' | 'submitted' | 'reviewed';
  onboardingSubmittedAt: string | null;
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
    let bestDoc: FirebaseFirestore.QueryDocumentSnapshot | null = null;
    let clientName = '';

    // Primary path: find subscriptions via customer record.
    const custSnap = await db.collection('customers').where('email', '==', email).limit(1).get();
    if (!custSnap.empty) {
      const cust = custSnap.docs[0];
      clientName = (cust.data().name as string) ?? '';
      const subSnap = await db.collection('subscriptions').where('customerId', '==', cust.id).get();
      bestDoc = selectBestSubscription(subSnap.docs);
    }

    // Fallback: find via Firestore users collection.
    if (!bestDoc) {
      const userSnap = await db.collection('users').where('email', '==', email).limit(1).get();
      if (!userSnap.empty) {
        const usr = userSnap.docs[0];
        if (!clientName) clientName = (usr.data().name as string) ?? '';
        const subSnap = await db.collection('subscriptions').where('userId', '==', usr.id).get();
        bestDoc = selectBestSubscription(subSnap.docs);
      }
    }

    if (!bestDoc) return NextResponse.json({ error: 'No subscription found' }, { status: 404 });

    const subData = bestDoc.data() as Record<string, unknown>;

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
      onboardingStatus: (subData.onboardingStatus as 'not_started' | 'submitted' | 'reviewed') ?? 'not_started',
      onboardingSubmittedAt: tsToISO(subData.onboardingSubmittedAt) ?? null,
    };

    return NextResponse.json(body);
  } catch (err) {
    console.error('[portal/me] error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
