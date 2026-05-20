import { NextRequest, NextResponse } from 'next/server';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';
import { sendOnboardingNotificationEmail, sendOnboardingConfirmationEmail } from '@/lib/email';
import { COLLECTIONS } from '@/lib/firebase/schema';

const STATUS_PRIORITY: Record<string, number> = {
  active: 0,
  paypal_approved: 1,
  pending: 2,
  suspended: 3,
  cancelled: 4,
  expired: 5,
};

function tsToISO(ts: unknown): string | null {
  if (!ts || typeof (ts as Record<string, unknown>).toDate !== 'function') return null;
  return ((ts as { toDate: () => Date }).toDate)().toISOString();
}

function tsToMs(ts: unknown): number {
  const iso = tsToISO(ts);
  return iso ? new Date(iso).getTime() : 0;
}

async function verifyAndGetEmail(request: NextRequest): Promise<string | null> {
  const bearer = request.headers.get('Authorization') ?? '';
  const token = bearer.startsWith('Bearer ') ? bearer.slice(7) : '';
  if (!token) return null;
  try {
    const decoded = await getAdminAuth().verifyIdToken(token);
    return (decoded.email ?? '').toLowerCase() || null;
  } catch {
    return null;
  }
}

async function findBestSubscription(db: FirebaseFirestore.Firestore, email: string) {
  let docs: FirebaseFirestore.QueryDocumentSnapshot[] = [];
  let clientName = '';
  let customerId: string | null = null;

  const custSnap = await db.collection(COLLECTIONS.CUSTOMERS).where('email', '==', email).limit(1).get();
  if (!custSnap.empty) {
    const cust = custSnap.docs[0];
    clientName = (cust.data().name as string) ?? '';
    customerId = cust.id;
    const subSnap = await db.collection(COLLECTIONS.SUBSCRIPTIONS).where('customerId', '==', cust.id).get();
    docs = subSnap.docs;
  }

  if (docs.length === 0) {
    const userSnap = await db.collection(COLLECTIONS.USERS).where('email', '==', email).limit(1).get();
    if (!userSnap.empty) {
      const usr = userSnap.docs[0];
      if (!clientName) clientName = (usr.data().name as string) ?? '';
      const subSnap = await db.collection(COLLECTIONS.SUBSCRIPTIONS).where('userId', '==', usr.id).get();
      docs = subSnap.docs;
    }
  }

  if (docs.length === 0) return null;

  const best = docs.slice().sort((a, b) => {
    const aPriority = STATUS_PRIORITY[(a.data().status as string) ?? ''] ?? 99;
    const bPriority = STATUS_PRIORITY[(b.data().status as string) ?? ''] ?? 99;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return tsToMs(b.data().updatedAt) - tsToMs(a.data().updatedAt);
  })[0];

  return { doc: best, clientName, customerId };
}

// GET — return existing submission for prefill, or { found: false }
export async function GET(request: NextRequest) {
  const email = await verifyAndGetEmail(request);
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getAdminDb();
    const snap = await db
      .collection(COLLECTIONS.ONBOARDING_SUBMISSIONS)
      .where('clientEmail', '==', email)
      .limit(1)
      .get();

    if (snap.empty) return NextResponse.json({ found: false });

    const data = snap.docs[0].data();
    return NextResponse.json({ found: true, id: snap.docs[0].id, ...data });
  } catch (err) {
    console.error('[portal/onboarding GET] error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST — upsert submission, update subscription status, send emails
export async function POST(request: NextRequest) {
  const email = await verifyAndGetEmail(request);
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Validate required fields
  const required = ['businessName', 'businessIndustry', 'businessDescription', 'primaryGoal', 'targetAudience', 'launchTimeline'];
  for (const field of required) {
    if (!body[field] || typeof body[field] !== 'string' || !(body[field] as string).trim()) {
      return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
    }
  }

  try {
    const db = getAdminDb();

    // Find best subscription to link and get client name
    const subResult = await findBestSubscription(db, email);
    const subscriptionId = subResult?.doc.id ?? null;
    const customerId = subResult?.customerId ?? null;
    const clientName = subResult?.clientName || (body.clientName as string) || '';
    const planName = (subResult?.doc.data().planName as string) ?? '';
    const paypalSubscriptionId = (subResult?.doc.data().paypalSubscriptionId as string) ?? '';

    const now = FieldValue.serverTimestamp();

    const submissionData = {
      clientEmail: email,
      clientName,
      subscriptionId,
      customerId,
      // Business basics
      businessName: (body.businessName as string).trim(),
      businessIndustry: (body.businessIndustry as string).trim(),
      businessDescription: (body.businessDescription as string).trim(),
      primaryGoal: (body.primaryGoal as string).trim(),
      targetAudience: (body.targetAudience as string).trim(),
      // Website scope
      desiredPages: Array.isArray(body.desiredPages) ? body.desiredPages : [],
      hasExistingWebsite: Boolean(body.hasExistingWebsite),
      existingWebsiteUrl: typeof body.existingWebsiteUrl === 'string' ? body.existingWebsiteUrl.trim() : '',
      // Branding
      brandColors: typeof body.brandColors === 'string' ? body.brandColors.trim() : '',
      brandFonts: typeof body.brandFonts === 'string' ? body.brandFonts.trim() : '',
      designNotes: typeof body.designNotes === 'string' ? body.designNotes.trim() : '',
      // Content
      providingOwnContent: Boolean(body.providingOwnContent),
      contentNotes: typeof body.contentNotes === 'string' ? body.contentNotes.trim() : '',
      inspirationUrls: typeof body.inspirationUrls === 'string' ? body.inspirationUrls.trim() : '',
      // Integrations / launch
      desiredFeatures: Array.isArray(body.desiredFeatures) ? body.desiredFeatures : [],
      launchTimeline: (body.launchTimeline as string).trim(),
      additionalNotes: typeof body.additionalNotes === 'string' ? body.additionalNotes.trim() : '',
      status: 'submitted',
      reviewedAt: null,
      updatedAt: now,
    };

    // Upsert — check for existing submission first
    const existingSnap = await db
      .collection(COLLECTIONS.ONBOARDING_SUBMISSIONS)
      .where('clientEmail', '==', email)
      .limit(1)
      .get();

    let submissionId: string;
    if (!existingSnap.empty) {
      submissionId = existingSnap.docs[0].id;
      await db.collection(COLLECTIONS.ONBOARDING_SUBMISSIONS).doc(submissionId).update(submissionData);
    } else {
      const ref = await db.collection(COLLECTIONS.ONBOARDING_SUBMISSIONS).add({
        ...submissionData,
        createdAt: now,
      });
      submissionId = ref.id;
    }

    // Update subscription onboarding status
    if (subscriptionId) {
      await db.collection(COLLECTIONS.SUBSCRIPTIONS).doc(subscriptionId).update({
        onboardingStatus: 'submitted',
        onboardingSubmittedAt: now,
        updatedAt: now,
      });
    }

    // Send internal notification (non-blocking)
    sendOnboardingNotificationEmail({
      clientName,
      clientEmail: email,
      businessName: submissionData.businessName,
      planName,
      paypalSubscriptionId,
      primaryGoal: submissionData.primaryGoal,
      launchTimeline: submissionData.launchTimeline,
    }).catch((e) => console.error('[portal/onboarding] notification email failed:', e));

    // Send client confirmation (non-blocking)
    sendOnboardingConfirmationEmail({
      clientName,
      clientEmail: email,
      businessName: submissionData.businessName,
    }).catch((e) => console.error('[portal/onboarding] confirmation email failed:', e));

    return NextResponse.json({ success: true, id: submissionId });
  } catch (err) {
    console.error('[portal/onboarding POST] error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
