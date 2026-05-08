'use client';

import dynamic from 'next/dynamic';
import { Wrapper, Inner, HeroTextContainer, ChevronButton } from './styles';
import { GetStartedButton } from '@/components';
import MaskText from '@/components/Common/MaskText';
import { useIsMobile } from '../../../../libs/useIsMobile';
import { useHasMounted } from '../../../../libs/useHasMounted';
import {
  mobileParagraphPhrases,
  mobilePrePhrases,
  paragraphPhrases,
  prePhrases,
  staticPhrase,
  dynamicPhrases,
  mobileStaticPhrase,
  mobileDynamicPhrases,
} from './constants';

const HeroAnimatedHeading = dynamic(() => import('./HeroAnimatedHeading'), { ssr: false });

const HeroSection = () => {
  const isMobile = useIsMobile();
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  const scrollToNext = () => {
    const next = document.getElementById('what-we-do');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <Inner>
        <HeroTextContainer>
          {isMobile ? (
            <>
              <MaskText phrases={mobilePrePhrases} tag="span" />
              <HeroAnimatedHeading
                staticText={mobileStaticPhrase}
                dynamicPhrases={mobileDynamicPhrases}
              />
              <MaskText phrases={mobileParagraphPhrases} tag="p" />
            </>
          ) : (
            <>
              <MaskText phrases={prePhrases} tag="span" />
              <HeroAnimatedHeading staticText={staticPhrase} dynamicPhrases={dynamicPhrases} />
              <MaskText phrases={paragraphPhrases} tag="p" />
            </>
          )}
        </HeroTextContainer>
        <GetStartedButton text="Get Started" href="#pricing" />
      </Inner>

      <ChevronButton onClick={scrollToNext} aria-label="Scroll to next section">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </ChevronButton>
    </Wrapper>
  );
};

export default HeroSection;
