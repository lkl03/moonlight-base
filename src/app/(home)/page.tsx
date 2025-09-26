import {
  FAQ,
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

export default function Home() {
  return (
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
    </main>
  );
}
