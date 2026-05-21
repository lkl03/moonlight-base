import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

// Simple in-memory rate limiter — max 5 failed attempts per IP per hour.
// Resets on cold start. For production hardening, consider Redis-backed rate limiting.
const attempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const pin = process.env.MOONLIGHT_ADMIN_PIN;
  if (!pin) {
    console.error('[admin/login] MOONLIGHT_ADMIN_PIN is not configured');
    return NextResponse.json({ error: 'Admin auth not configured' }, { status: 503 });
  }

  const submitted = typeof body.pin === 'string' ? body.pin.trim() : '';
  if (!submitted || submitted !== pin) {
    // Do not reveal whether the PIN is wrong vs missing.
    return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
  }

  // PIN correct — create session cookie.
  const token = createAdminToken(pin);
  const isProduction = process.env.NODE_ENV === 'production';

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 8 * 60 * 60, // 8 hours in seconds
    path: '/',
  });

  // Clear rate limit entry on success.
  attempts.delete(ip);

  return response;
}
