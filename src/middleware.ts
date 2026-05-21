/**
 * Edge Middleware — protects /admin routes with a PIN-based session cookie.
 *
 * The cookie value is "${expiresAtMs}.${hmac_sha256_hex}" (same format as admin-auth.ts).
 * We use the Web Crypto API here because Edge Runtime does not support Node.js `crypto`.
 */

import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'moonlight_admin';

function hexToUint8Array(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) return new Uint8Array(0);
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

function uint8ArrayToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyAdminToken(token: string, pin: string): Promise<boolean> {
  const dot = token.indexOf('.');
  if (dot === -1) return false;

  const expiresAt = parseInt(token.slice(0, dot), 10);
  if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

  const sig = token.slice(dot + 1);

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(pin),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const raw = await crypto.subtle.sign('HMAC', key, encoder.encode(`admin:${expiresAt}`));
    const expectedHex = uint8ArrayToHex(raw);

    // Constant-time comparison
    if (sig.length !== expectedHex.length) return false;
    const a = hexToUint8Array(sig);
    const b = hexToUint8Array(expectedHex);
    if (a.length === 0 || a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    return diff === 0;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin paths except the login page itself.
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const pin = process.env.MOONLIGHT_ADMIN_PIN;
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!pin || !token || !(await verifyAdminToken(token, pin))) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
