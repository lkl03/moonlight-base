'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import abstractFigure from '../../../../public/svgs/abstract-figure.svg';
import ParallaxText from '@/components/Common/ParallaxImages';
import {
  Wrapper,
  Inner,
  Header,
  HeaderFigure,
  HeaderMainText,
  ParallaxImages,
  ButtonContainer,
  PortfolioTrack,
  PortfolioCard,
  PortfolioCardImage,
  PortfolioPill,
  PortfolioMeta,
  PortfolioTitle,
  PortfolioHint,
} from './styles';
import { MaskText } from '@/components';
import { useIsMobile } from '../../../../libs/useIsMobile';
import {
  desktopHeaderPhrase,
  desktopParagraphPhrase,
  mobileHeaderPhrase,
  mobileParagraphPhrase,
  portfolioItems,
} from './constants';
import { GetStartedButton } from '@/components';

type PortfolioItem = (typeof portfolioItems)[number];

const Portfolio = () => {
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start end', 'end start'] });
  const figureY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const figureScale = useTransform(scrollYProgress, [0, 1], [0.97, 1.04]);

  const renderTrack = (items: ReadonlyArray<PortfolioItem>) => (
    <PortfolioTrack>
      {items.map((item) => (
        <PortfolioCard
          key={`${item.title}-${item.tag}`}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${item.title} demo site (opens in a new tab)`}
        >
          <PortfolioCardImage>
            <Image
              src={item.cover}
              alt={`${item.title} website cover`}
              fill
              sizes="(max-width: 768px) 75vw, 24vw"
            />
            <PortfolioPill>{item.tag}</PortfolioPill>
            <PortfolioMeta>
              <PortfolioTitle>{item.title}</PortfolioTitle>
              <PortfolioHint>Open site</PortfolioHint>
            </PortfolioMeta>
          </PortfolioCardImage>
        </PortfolioCard>
      ))}
    </PortfolioTrack>
  );

  return (
    <Wrapper id="portfolio">
      <Inner>
        <Header ref={headerRef}>
          <HeaderFigure style={{ y: figureY, scale: figureScale }} aria-hidden="true">
            <Image src={abstractFigure} alt="" fill priority={false} />
          </HeaderFigure>
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
          <ParallaxText baseVelocity={isMobile ? -1.55 : -2.8}>{renderTrack(portfolioItems)}</ParallaxText>
        </ParallaxImages>
        <ParallaxImages>
          <ParallaxText baseVelocity={isMobile ? 1.25 : 2.2}>
            {renderTrack([...portfolioItems].reverse())}
          </ParallaxText>
        </ParallaxImages>

        <ButtonContainer>
          <GetStartedButton text="View Our Recent Work" href="#contact" />
        </ButtonContainer>
      </Inner>
    </Wrapper>
  );
};

export default Portfolio;
