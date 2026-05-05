import type { Metadata } from 'next';
import WorkPageContent from '@/components/UI/WorkPage';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Explore the websites and products we have built for our clients — from law firms to SaaS tools.',
};

export default function WorkPage() {
  return <WorkPageContent />;
}
