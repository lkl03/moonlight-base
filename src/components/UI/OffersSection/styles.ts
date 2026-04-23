'use client';
import Image from 'next/image';
import { styled } from 'styled-components';

export const Wrapper = styled.section``;

export const Inner = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 6.25rem auto 0;

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

export const ImageCtn = styled.div`
  flex: 0 0 clamp(3.9rem, 6vw, 4.85rem);
  width: clamp(3.9rem, 6vw, 4.85rem);
  height: clamp(3.9rem, 6vw, 4.85rem);
  display: grid;
  place-items: center;
  padding: 0.8rem;
  background-color: var(--white);
  border-radius: 999px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);

  img {
    width: 72%;
    height: 72%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    flex-basis: 3.5rem;
    width: 3.5rem;
    height: 3.5rem;
    padding: 0.68rem;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.14);

    img {
      width: 70%;
      height: 70%;
    }
  }
`;

export const TextCtn = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  h3 {
    font-size: clamp(1.15rem, 2vw, 1.45rem);
    line-height: 1.15;
  }

  p {
    max-width: 18rem;
    color: #d7d7d7;
    font-size: 0.95rem;
    font-weight: 400;
    line-height: 1.55;
  }

  @media (max-width: 768px) {
    gap: 0.55rem;

    h3 {
      font-size: 1.08rem;
      line-height: 1.18;
    }

    p {
      max-width: none;
      font-size: 0.9rem;
      line-height: 1.45;
    }
  }
`;

export const Offers = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    gap: 0.9rem;
    order: 2;
  }
`;

export const OfferCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.35rem 1.35rem 1.4rem;
  border-radius: 1.75rem;
  min-height: 9.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.12);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      background: rgba(255, 255, 255, 0.045);
      border-color: rgba(255, 255, 255, 0.16);
      box-shadow: 0 18px 38px rgba(0, 0, 0, 0.16);
    }
  }

  @media (max-width: 1024px) {
    min-height: auto;
  }

  @media (max-width: 768px) {
    align-items: center;
    gap: 0.85rem;
    padding: 1rem 0.95rem;
    border-radius: 1.45rem;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex: 0 1 clamp(14rem, 24vw, 22rem);
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  min-width: 0;

  @media (max-width: 1024px) {
    flex-basis: 100%;
    margin: 0 auto 1.5rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
    order: 1;
  }
`;

export const MiddleImage = styled(Image)`
  position: relative;
  z-index: 3;
  width: min(100%, 20rem);
  height: auto;
  animation: bounce-rotate 3s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;

  @keyframes bounce-rotate {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(1deg);
    }
  }

  @media (max-width: 1024px) {
    width: min(70vw, 18rem);
  }

  @media (max-width: 768px) {
    width: min(72vw, 16rem);
    animation: none;
  }
`;

export const PerksContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 20rem) minmax(0, 1fr);
  align-items: center;
  gap: clamp(1rem, 2vw, 2rem);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2.75rem;

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`;
