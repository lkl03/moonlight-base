'use client';

import { useRouter } from 'next/navigation';
import type { CSSProperties } from 'react';

const s: Record<string, CSSProperties> = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.9rem 1.75rem',
    background: 'rgba(255,255,255,0.02)',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    fontFamily: 'Raleway, sans-serif',
  },
  brand: {
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: '#17F2A6',
    textDecoration: 'none',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  link: {
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    fontWeight: 600,
  },
  btn: {
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.55)',
    fontWeight: 600,
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '6px',
    padding: '0.35rem 0.8rem',
    cursor: 'pointer',
    fontFamily: 'Raleway, sans-serif',
  },
};

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <nav style={s.nav}>
      <a href="/admin" style={s.brand}>Moonlight Admin</a>
      <div style={s.right}>
        <a href="/admin" style={s.link}>Dashboard</a>
        <a href="/admin/onboarding" style={s.link}>Onboarding</a>
        <button style={s.btn} onClick={handleLogout}>Sign out</button>
      </div>
    </nav>
  );
}
