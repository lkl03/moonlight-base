'use client';

import { styled } from 'styled-components';

export const Wrapper = styled.section`
  padding-top: 7.5rem;

  @media (max-width: 768px) {
    padding-top: 6rem;
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
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

export const ProcessGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    max-width: 34rem;
  }
`;

export const StepCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  padding: clamp(1rem, 2vw, 1.25rem);
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.14);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      border-color: rgba(23, 242, 166, 0.25);
      box-shadow: 0 28px 54px rgba(0, 0, 0, 0.22);
    }
  }
`;

export const StepIllustration = styled.div`
  position: relative;
  width: 100%;
  min-height: clamp(12rem, 22vw, 15rem);
  border-radius: 1.25rem;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%);

  img {
    object-fit: cover;
  }

  @media (max-width: 900px) {
    min-height: 13rem;
  }
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: center;
`;

export const StepTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  h3 {
    font-size: 1.3rem;
    font-weight: 500;
    text-align: center;
  }
`;

export const StepDescription = styled.div`
  p {
    max-width: 24rem;
    margin: 0 auto;
    color: var(--white);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.55rem;
    text-align: center;
    text-wrap: balance;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.5rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 3rem;
`;
