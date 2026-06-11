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
      <head>
        {/*
          Google Ads base tag — raw <script> elements render as actual HTML in the
          SSR response, NOT deferred through Next.js's RSC payload.

          Using next/script with strategy="afterInteractive" or "beforeInteractive"
          in a Next.js 13 App Router Server Component serialises the Script into the
          RSC JSON payload (self.__next_f.push), meaning window.gtag only exists
          after React hydrates. Tag Assistant never sees a real <script> tag, so the
          base tag cannot be verified.

          Raw <script> / dangerouslySetInnerHTML bypasses that deferral entirely and
          matches the standard two-script Google Ads implementation exactly.
        */}
        {/* 1. gtag.js library — async so it never blocks rendering */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts, @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18212293245" />
        {/* 2. Inline config — defines window.dataLayer + gtag before hydration */}
        <script
          id="google-ads-tag"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18212293245');`,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
