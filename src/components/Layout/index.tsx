'use client';

import { useEffect, useState } from 'react';
import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from './GlobalStyles';
import { FloatingNav, Footer, Header, Preloader } from '../';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showPreloader, setShowPreloader] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    if (!hasSeenPreloader) {
      setShowPreloader(true);
    } else {
      setComplete(true);
    }
  }, []);

  useEffect(() => {
    if (complete) {
      sessionStorage.setItem('hasSeenPreloader', 'true');
      setShowPreloader(false);
    }
  }, [complete]);

  return (
    <StyledComponentsRegistry>
      <GlobalStyles />
      {showPreloader && <Preloader setComplete={setComplete} />}
      <div className={complete ? 'complete' : 'not_complete'}>
        <Header />
        {children}
        <Footer />
        <FloatingNav />
      </div>
    </StyledComponentsRegistry>
  );
};

export default Layout;
