import {
  FAQ,
  ContactSection,
  Featured,
  Portfolio,
  FinancialFuture,
  FinancilaFreedom,
  PricingSection,
  FirstCTA,
  SecondCTA,
  HeroSection,
  IntroSection,
  JoinSection,
  OffersSection,
} from '@/components';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Moonlight Web Designs',
  description:
    '100% handcrafted websites tailored exclusively for your business. Custom design, mobile responsive, hosting & maintenance included.',
  url: 'https://moonlightwebdesigns.com',
  logo: 'https://moonlightwebdesigns.com/pngs/logo-moonlight_white.png',
  sameAs: ['https://www.eterlab.co'],
  serviceType: 'Web Design',
  areaServed: 'Worldwide',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSection />
        <Featured />
        <IntroSection />
        <Portfolio />
        <OffersSection />
        <FirstCTA />
        {/*<FinancilaFreedom />*/}
        {/*<FinancialFuture />*/}
        {/*<JoinSection />*/}
        <PricingSection />
        <SecondCTA />
        <FAQ />
        <ContactSection />
      </main>
    </>
  );
}
