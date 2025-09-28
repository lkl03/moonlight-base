'use client';
import Image from 'next/image';
import big_banner from '../../../../public/images/big_banner.png';
import featured_mobile_banner from '../../../../public/images/featured_mobile_banner.png';
import ParallaxText from '@/components/Common/ParallaxImages';
import companies_image from '../../../../public/images/companies.png';
import portfolio_image from '../../../../public/images/portfolio.png';
import { Wrapper, Inner, Header, HeaderMainText, ParallaxImages, Div, ButtonContainer } from './styles';
import RevealCover from '@/components/Common/RevealCover';
import { MaskText } from '@/components';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
} from './constants';
import { GetStartedButton } from '@/components';

export const imageVariants = {
  hidden: {
    scale: 1.6,
  },
  visible: {
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.6, 0.05, -0.01, 0.9],
      delay: 0.2,
    },
  },
};

const Portfolio = () => {
  const isMobile = useIsMobile();
  return (
    <Wrapper>
      <Inner>
        <Header>
          <span>Our Portfolio</span>
          <HeaderMainText>
            {isMobile ? (
              <>
                <MaskText phrases={mobileHeaderPhrase} tag="h2" />
                <MaskText phrases={mobileParagraphPhrase} tag="p" />
              </>
            ) : (
              <>
                <MaskText phrases={desktopHeaderPhrase} tag="h2" />
                <MaskText phrases={desktopParagraphPhrase} tag="p" />
              </>
            )}
          </HeaderMainText>
        </Header>
        <ParallaxImages>
          <ParallaxText baseVelocity={-3}>
            <Image src={portfolio_image} alt="portfolio 1" />
          </ParallaxText>
        </ParallaxImages>
                <ParallaxImages>
          <ParallaxText baseVelocity={-3}>
            <Image src={portfolio_image} alt="portfolio 2" />
          </ParallaxText>
        </ParallaxImages>
                <ButtonContainer>
                  <GetStartedButton text="View Our Recent Work" />
                </ButtonContainer>
      </Inner>
    </Wrapper>
  );
};

export default Portfolio;