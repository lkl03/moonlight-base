import {
  FAQ,
  Featured,
  Portfolio,
  FinancialFuture,
  FinancilaFreedom,
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
      {/*<FinancilaFreedom />*/}
      <FinancialFuture />
      <JoinSection />
      <FAQ />
    </main>
  );
}
