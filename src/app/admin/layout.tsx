import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import AdminNav from './_components/AdminNav';

export const metadata: Metadata = {
  title: 'Admin — Moonlight Web Designs',
  robots: { index: false, follow: false },
};

const pageStyle: CSSProperties = {
  minHeight: '100vh',
  background: '#121717',
  color: '#ffffff',
  fontFamily: 'Raleway, sans-serif',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={pageStyle}>
      <AdminNav />
      {children}
    </div>
  );
}
