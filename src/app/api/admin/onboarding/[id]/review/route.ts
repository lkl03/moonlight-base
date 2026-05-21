import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { getAdminDb } from '@/lib/firebase/admin';
import { isAdminRequest } from '@/lib/admin-auth';
import { COLLECTIONS } from '@/lib/firebase/schema';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  if (!id) return NextResponse.json({ error: 'Missing submission ID' }, { status: 400 });

  try {
    const db = getAdminDb();
    const now = admin.firestore.Timestamp.now();

    const submissionRef = db.collection(COLLECTIONS.ONBOARDING_SUBMISSIONS).doc(id);
    const submissionSnap = await submissionRef.get();

    if (!submissionSnap.exists) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    const submissionData = submissionSnap.data() as Record<string, unknown>;

    // Update submission status
    await submissionRef.update({
      status: 'reviewed',
      reviewedAt: now,
      updatedAt: now,
    });

    // Update linked subscription if present
    const subscriptionId = submissionData.subscriptionId as string | null;
    if (subscriptionId) {
      await db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(subscriptionId).update({
        onboardingStatus: 'reviewed',
        updatedAt: now,
      });
    }

    console.log(`[admin/review] Marked onboarding ${id} as reviewed`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[admin/review] error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
