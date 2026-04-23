'use client';

import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.section`
  padding: clamp(5.5rem, 8vw, 6.75rem) 0 clamp(6rem, 9vw, 7.5rem);
`;

export const Inner = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vw, 2.75rem);
`;

export const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  max-width: 44rem;
  margin: 0 auto;

  h2 {
    font-size: clamp(2.25rem, 5vw, 3rem);
    line-height: 1.15;
    letter-spacing: 0;
    text-wrap: balance;
  }
`;

export const Eyebrow = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 700 !important;
  letter-spacing: 1.6px;
  line-height: 1.2;
  color: var(--emerald);

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const Accordion = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccordionItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 1.4rem 0;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.12);
  overflow: hidden;

  &:first-child {
    border-top: 0.0625rem solid rgba(255, 255, 255, 0.12);
  }

  @media (max-width: 768px) {
    padding: 1.15rem 0;
  }
`;

export const Question = styled(motion.button)<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  cursor: pointer;
  background: transparent;
  border: 0;
  color: var(--white);
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  font-weight: 600;
  line-height: 1.3;

  span {
    flex: 1 1 auto;
    text-wrap: balance;
  }

  img {
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.24s ease;
  }

  @media (max-width: 768px) {
    gap: 0.85rem;
    font-size: 1rem;

    img {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export const Answer = styled(motion.div)`
  max-width: 52rem;
  color: #c9c9c9;
  font-size: 0.98rem;
  font-weight: 400;
  line-height: 1.72;
  padding: 0.95rem 2.5rem 0 0;
  text-wrap: pretty;

  @media (max-width: 768px) {
    font-size: 0.94rem;
    line-height: 1.65;
    padding: 0.8rem 0 0;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;
