import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://moonlightwebdesigns.com'),
  title: {
    default: 'Moonlight Web Designs',
    template: '%s | Moonlight Web Designs',
  },
  description:
    '100% handcrafted websites tailored exclusively for your business. Custom design, mobile responsive, hosting & maintenance included.',
  keywords: [
    'web design',
    'web development',
    'custom website',
    'small business website',
    'landing page',
    'handcrafted websites',
  ],
  authors: [{ name: 'Moonlight Web Designs', url: 'https://moonlightwebdesigns.com' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://moonlightwebdesigns.com',
    siteName: 'Moonlight Web Designs',
    title: 'Moonlight Web Designs — Handcrafted Websites for Your Business',
    description:
      '100% handcrafted websites tailored exclusively for your business. Custom design, mobile responsive, hosting included.',
    images: [
      {
        url: '/pngs/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Moonlight Web Designs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moonlight Web Designs',
    description:
      '100% handcrafted websites tailored exclusively for your business. Custom design, mobile responsive, hosting included.',
    images: ['/pngs/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
