'use client';

import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const Wrapper = styled.section``;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6.25rem auto 0;
  max-width: 1440px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 6.44rem;
  }
`;

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: min(100%, 56rem);
  min-height: clamp(14.5rem, 30vw, 18rem);
  margin: 0 auto 1rem;
  padding: clamp(2.5rem, 4vw, 3.5rem) 1rem 1.25rem;
  isolation: isolate;
  overflow: visible;

  span,
  h2,
  p {
    position: relative;
    z-index: 1;
  }

  span {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold !important;
    letter-spacing: 1.6px;
    line-height: 120%;
    color: var(--emerald);
  }

  h2 {
    font-size: clamp(2.25rem, 5vw, 3rem);
    font-weight: bolder;
    line-height: 1.15;
    letter-spacing: 0;
    text-transform: capitalize;
  }

  p {
    max-width: 41.75rem;
    color: #bdbdbd;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 150%;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    width: 92%;
    min-height: auto;
    margin: 0 auto 0.4rem;
    padding: 2rem 0.75rem 1rem;

    p {
      font-size: 0.9rem;
    }

    span {
      font-size: 0.8rem;
    }
  }
`;

export const HeaderFigure = styled(motion.div)`
  position: absolute;
  top: -1.25rem;
  left: 50%;
  width: clamp(22rem, 58vw, 34rem);
  aspect-ratio: 780 / 700;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 0;
  opacity: 0.98;

  img {
    object-fit: contain;
  }

  @media (max-width: 768px) {
    top: -0.35rem;
    width: min(96vw, 24rem);
  }
`;

export const HeaderMainText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;

  @media (max-width: 768px) {
    gap: 0.85rem;
  }
`;

export const ParallaxImages = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0 clamp(0.75rem, 3vw, 1.25rem);
  overflow: hidden;

  .scroller > span {
    margin-right: clamp(1rem, 2vw, 1.75rem);
  }
`;

export const PortfolioTrack = styled.div`
  display: flex;
  gap: clamp(0.85rem, 1.8vw, 1.25rem);
  align-items: stretch;
`;

export const PortfolioCard = styled.a`
  display: block;
  width: clamp(14rem, 23vw, 18rem);
  flex: 0 0 auto;
  border-radius: 1.25rem;
  transition: transform 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 768px) {
    width: clamp(12rem, 62vw, 16rem);
  }
`;

export const PortfolioCardImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 560 / 420;
  overflow: hidden;
  border-radius: 1.15rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.18);

  img {
    object-fit: cover;
  }
`;

export const PortfolioPill = styled.span`
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  background: rgba(8, 17, 19, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--white);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const PortfolioMeta = styled.div`
  position: absolute;
  right: 0.85rem;
  bottom: 0.85rem;
  left: 0.85rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.9rem 1rem;
  border-radius: 0.9rem;
  background: linear-gradient(180deg, rgba(8, 17, 19, 0.2) 0%, rgba(8, 17, 19, 0.84) 100%);
`;

export const PortfolioTitle = styled.h3`
  color: var(--white);
  font-size: 1.05rem;
  font-weight: 700 !important;
  line-height: 1.1;
`;

export const PortfolioHint = styled.span`
  color: rgba(255, 255, 255, 0.76);
  font-size: 0.86rem;
  line-height: 1;
  white-space: nowrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-top: 3rem;
`;
