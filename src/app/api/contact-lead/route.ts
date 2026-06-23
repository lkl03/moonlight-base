import { NextRequest, NextResponse } from 'next/server';
import { sendAdsLeadNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const businessName = typeof body.businessName === 'string' ? body.businessName.trim() : '';
  const currentWebsite =
    typeof body.currentWebsite === 'string' ? body.currentWebsite.trim() : '';
  const need = typeof body.need === 'string' ? body.need.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const budgetConfirmed = body.budgetConfirmed === true;

  if (!name || !email || !businessName || !need) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
  }

  if (!budgetConfirmed) {
    return NextResponse.json({ error: 'Budget confirmation required' }, { status: 400 });
  }

  await sendAdsLeadNotification({
    name,
    email,
    businessName,
    currentWebsite: currentWebsite || undefined,
    need,
    message: message || undefined,
  });

  // Return success even when the email provider isn't configured — the lead
  // data is logged server-side and the user shouldn't be blocked by a missing
  // env var in a staging environment.
  return NextResponse.json({ ok: true });
}
