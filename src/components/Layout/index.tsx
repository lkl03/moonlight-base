'use client';

import { useEffect, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import StyledComponentsRegistry from '../../../libs/registry';
import { GlobalStyles } from './GlobalStyles';
import { Footer, Header, Preloader } from '..';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showPreloader, setShowPreloader] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem('hasSeenPreloader');
    if (!hasSeenPreloader) {
      setShowPreloader(true);
    } else {
      setComplete(true);
    }
  }, []);

  useEffect(() => {
    if (complete) {
      localStorage.setItem('hasSeenPreloader', 'true');
      setShowPreloader(false);
    }
  }, [complete]);

  return (
    <StyledComponentsRegistry>
      <ReactLenis
        root
        easing={(t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
      >
        <GlobalStyles />
        {showPreloader && <Preloader setComplete={setComplete} />}
        <div className={complete ? 'complete' : 'not_complete'}>
          <Header />
          {children}
          <Footer />
        </div>
      </ReactLenis>
    </StyledComponentsRegistry>
  );
};

export default Layout;
