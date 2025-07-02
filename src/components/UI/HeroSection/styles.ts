'use client';
import { styled } from 'styled-components';
import hero_background from '../../../../public/images/grid_background.png';

export const Wrapper = styled.section`
  margin-top: 10rem;
`;

export const Inner = styled.div`
  background: url(${hero_background.src}) no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 70rem;
  margin: 0 auto;
  text-align: center;
  background-position: top center;
  background-size: contain;
`;

export const Pill = styled.div`
  display: flex;
  padding: 0.375rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 6.25rem;
  border: 0.2px solid #989898;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  margin-bottom: 1rem;

  span {
    color: var(--light-gray);
    font-size: 1rem;
    font-weight: 400;
  }
`;

export const HeroTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;

  h1 {
    font-size: 5rem;
    font-weight: bolder;
    letter-spacing: -2px;
    line-height: 120%;
    text-transform: capitalize;
  }

  p {
    max-width: 41.75rem;
    color: #bdbdbd;
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 150%;
    margin: 0 auto;
  }

  span {
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1.6px;
    line-height: 120%;
    color: var(--emerald);
  }


  @media (max-width: 768px) {
    gap: 1rem;
    padding-bottom: 1.5rem;
    text-wrap: balance;
    
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 0.8rem;
    }

    span {
      font-size: 0.8rem;
    }
  }
`;
