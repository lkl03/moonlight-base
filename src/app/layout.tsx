import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moonlight Web Designs',
  description: '100% handcrafted websites tailored exclusively for your business.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
