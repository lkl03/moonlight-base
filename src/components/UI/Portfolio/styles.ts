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
  width: 90%;

  @media (max-width: 768px) {
    margin-top: 6.44rem;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto 4rem;

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
    letter-spacing: 0px;
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

    margin: 0 auto 3rem;

    p {
      font-size: 0.9rem;
    }

    span {
      font-size: 0.8rem;
    }
  }
`;

export const HeaderMainText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const ParallaxImages = styled.div`
  position: relative;
  max-width: 100vw;
  margin: 1rem 0;
`;

export const Div = styled(motion.div)`
  position: relative;
  height: 35rem;
  overflow: hidden;

  @media (max-width: 599px) {
    height: 23.75rem;
    
     img {
      object-fit: cover;
     }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 3rem;
`;