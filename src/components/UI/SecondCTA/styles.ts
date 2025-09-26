'use client';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const Wrapper = styled.section`
  margin: 6.25rem auto 0;
  overflow: hidden;
  @media (max-width: 900px) {
    margin: 0rem auto 0;  
  }
`;

export const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

export const ImageContainer = styled.div`
  padding: 6rem 1rem;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
  
  /* new: relative positioning for overlay */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Div = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  img {
    object-fit: cover;
    border-radius: 0.75rem;
    opacity: 1;
  }

  @media (max-width: 599px) {
    img {
      object-fit: cover;
    }
  }
`;

/* NEW: the overlay content on top of green_divider */

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  margin: 0 15%;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    gap: 0;
    padding: 2rem 1rem;
    margin: 0 auto;
  }
`;

export const TextColumn = styled.div`
  flex: 0 0 40%;
  max-width: 40%;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 900px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

export const ImageColumn = styled.div`
  flex: 0 0 60%;
  max-width: 60%;
  position: relative;
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 30rem;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 0.75rem;
  }

  @media (max-width: 900px) {
    flex: 1 1 100%;
    max-width: 100%;
    width: 100%;

    img {
      width: 100%;
      height: auto;
    }
  }
`;


export const Label = styled.span`
  display: block;
  color: var(--Background);
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1.6px;
  line-height: 120%;
  margin-bottom: 1rem;
`;

export const Headline = styled.h2`
  color: var(--white);
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 0px;
  margin-bottom: 1.5rem;
  white-space: pre-line; /* allow line breaks from code */
  text-align: center;
`;

export const Paragraph = styled.p`
  color: var(--light-gray);
  font-size: 1rem;
  line-height: 1.6;
  max-width: 40rem;
  margin-bottom: 2rem;
  text-align: center;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #45a383;
  padding: 1rem;
`;