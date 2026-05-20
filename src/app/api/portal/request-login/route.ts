import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';
import { sendMagicLinkEmail } from '@/lib/email';

// Always return this response — never reveal whether an email has a subscription.
const OK = () => NextResponse.json({ success: true });

export async function POST(request: NextRequest) {
  let email: string;

  try {
    const body = (await request.json()) as { email?: unknown };
    if (typeof body.email !== 'string') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    email = body.email.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    const db = getAdminDb();

    // Check if email has a customer record (created when subscription activates).
    let hasAccess = false;
    const custSnap = await db
      .collection('customers')
      .where('email', '==', email)
      .limit(1)
      .get();
    if (!custSnap.empty) {
      hasAccess = true;
    } else {
      // Fallback: a checkout_session exists for this email (subscription may still
      // be pending webhook activation).
      const sessionSnap = await db
        .collection('checkout_sessions')
        .where('clientEmail', '==', email)
        .limit(1)
        .get();
      if (!sessionSnap.empty) hasAccess = true;
    }

    if (!hasAccess) {
      console.log('[portal/request-login] no record found — returning generic success');
      return OK();
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://moonlightwebdesigns.com').replace(/\/$/, '');
    const link = await getAdminAuth().generateSignInWithEmailLink(email, {
      url: `${appUrl}/portal`,
      handleCodeInApp: true,
    });

    await sendMagicLinkEmail({ to: email, link });
  } catch (err) {
    // Log but return generic success — don't expose errors to callers.
    console.error('[portal/request-login] error:', err instanceof Error ? err.message : err);
  }

  return OK();
}
