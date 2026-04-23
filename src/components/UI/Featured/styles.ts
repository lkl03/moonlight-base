'use client';

import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const Wrapper = styled.section`
  margin: 6.25rem auto 0;
  overflow: hidden;

  @media (max-width: 900px) {
    margin: 0 auto 0;
  }
`;

export const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  padding: 6rem 1rem;

  @media (max-width: 900px) {
    background: #4daf91;
    border-radius: 0;
    padding: 4.75rem 1rem 4rem;
  }
`;

export const Div = styled(motion.div)`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;

  img {
    object-fit: cover;
    object-position: center;
    border-radius: 0.75rem;
    opacity: 1;
  }

  @media (max-width: 900px) {
    inset: 0 0 auto 0;
    height: clamp(6.5rem, 19vw, 9rem);

    img {
      border-radius: 0;
      object-fit: cover !important;
      object-position: center top !important;
      width: 100% !important;
      height: 100% !important;
      transform: none !important;
    }
  }
`;

export const StaticDiv = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;

  img {
    object-fit: cover;
    object-position: center;
    border-radius: 0.75rem;
    opacity: 1;
  }

  @media (max-width: 900px) {
    inset: 0 0 auto 0;
    height: clamp(6.5rem, 19vw, 9rem);

    img {
      border-radius: 0;
      object-fit: cover !important;
      object-position: center top !important;
      width: 100% !important;
      height: 100% !important;
      transform: none !important;
    }
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin: 0 15%;
  padding: 4rem 2rem;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    gap: 1rem;
    margin: 0 auto;
    padding: 0;
  }
`;

export const TextColumn = styled.div`
  flex: 0 0 40%;
  max-width: 40%;
  min-width: 280px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    flex: 1 1 100%;
    max-width: 100%;
    min-width: 0;
    padding: 0 0.35rem 0.25rem;
  }
`;

export const ImageColumn = styled.div`
  flex: 0 0 60%;
  max-width: 60%;
  position: relative;
  min-height: clamp(22rem, 36vw, 31rem);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;

  img {
    object-fit: contain;
    object-position: center;
  }

  @media (max-width: 900px) {
    flex: 1 1 100%;
    max-width: 100%;
    width: 100%;
    min-height: clamp(18rem, 78vw, 27rem);
    margin: 0 auto;

    img {
      object-fit: contain;
      object-position: center;
      border-radius: 0;
    }
  }
`;

export const Label = styled.span`
  display: block;
  margin-bottom: 1rem;
  color: var(--Background);
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1.6px;
  line-height: 120%;
`;

export const Headline = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--white);
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 0;
  white-space: pre-line;
`;

export const Paragraph = styled.p`
  max-width: 40rem;
  margin-bottom: 2rem;
  color: var(--light-gray);
  font-size: 1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ButtonContainer = styled.div`
  @media (max-width: 767px) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0;
    background: transparent;
  }
`;
