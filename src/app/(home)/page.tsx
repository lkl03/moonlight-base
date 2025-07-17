import {
  FAQ,
  Featured,
  Portfolio,
  FinancialFuture,
  FinancilaFreedom,
  FirstCTA,
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
      <JoinSection />
      <FAQ />
    </main>
  );
}
