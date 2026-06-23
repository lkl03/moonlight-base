import type { Metadata } from 'next';
import LandingClient from './LandingClient';

export const metadata: Metadata = {
  title: 'Monthly Web Design From $199/mo | Moonlight Web Designs',
  description:
    'Custom websites for small businesses from $199/mo with $0 upfront, hosting, maintenance, support, and edits included.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Monthly Web Design From $199/mo | Moonlight Web Designs',
    description:
      'Custom websites for small businesses from $199/mo with $0 upfront, hosting, maintenance, support, and edits included.',
    url: 'https://moonlightwebdesigns.com/monthly-web-design',
    type: 'website',
  },
};

export default function MonthlyWebDesignPage() {
  return <LandingClient />;
}
