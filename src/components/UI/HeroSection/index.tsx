'use client';

import dynamic from 'next/dynamic';
import { Wrapper, Inner, HeroTextContainer } from './styles';
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

// ✨ Dynamically import the animated heading, disabling SSR
const HeroAnimatedHeading = dynamic(
  () => import('./HeroAnimatedHeading'),
  { ssr: false }
);

const HeroSection = () => {
  const isMobile = useIsMobile();
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

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
              <HeroAnimatedHeading
                staticText={staticPhrase}
                dynamicPhrases={dynamicPhrases}
              />
              <MaskText phrases={paragraphPhrases} tag="p" />
            </>
          )}
        </HeroTextContainer>
        <GetStartedButton text="Get Started" />
      </Inner>
    </Wrapper>
  );
};

export default HeroSection;

