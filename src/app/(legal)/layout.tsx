'use client';

import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from '@/components/Layout/GlobalStyles';
import Header from '@/components/UI/Header';
import InternalNav from '@/components/UI/InternalNav';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      <Header />
      <InternalNav />
      <main style={{ minHeight: '100vh' }}>{children}</main>
    </StyledComponentsRegistry>
  );
}
