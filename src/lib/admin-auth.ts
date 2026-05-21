/**
 * Admin authentication helpers — Node.js only.
 * Used by API routes (/api/admin/*).
 *
 * Admin auth is PIN-based. The PIN is stored in MOONLIGHT_ADMIN_PIN env var
 * (server-side only; never exposed to the browser).
 *
 * Cookie format: "${expiresAtMs}.${hmac_sha256_hex}"
 * HMAC key: the raw PIN value.
 * HMAC message: `admin:${expiresAtMs}`
 */

import { createHmac, timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'moonlight_admin';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

function hmac(pin: string, message: string): string {
  return createHmac('sha256', pin).update(message).digest('hex');
}

/** Creates a signed session token with an 8-hour expiry. */
export function createAdminToken(pin: string): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const sig = hmac(pin, `admin:${expiresAt}`);
  return `${expiresAt}.${sig}`;
}

/** Verifies a session token against MOONLIGHT_ADMIN_PIN. Returns true if valid and not expired. */
export function verifyAdminToken(token: string | undefined): boolean {
  const pin = process.env.MOONLIGHT_ADMIN_PIN;
  if (!pin || !token) return false;

  const dot = token.indexOf('.');
  if (dot === -1) return false;

  const expiresAt = parseInt(token.slice(0, dot), 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

  const sig = token.slice(dot + 1);
  const expected = hmac(pin, `admin:${expiresAt}`);

  try {
    // Constant-time comparison to prevent timing attacks.
    if (sig.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

/** Reads the admin token from the request cookie and returns whether it is valid. */
export function isAdminRequest(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

/** Returns a NextResponse with the admin cookie set. */
export function adminCookieAttributes(token: string): { value: string; options: object } {
  return {
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: SESSION_DURATION_MS / 1000,
      path: '/',
    },
  };
}
