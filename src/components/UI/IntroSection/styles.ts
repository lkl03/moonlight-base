'use client';
import Image from 'next/image';
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

export const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 7.77rem;
  width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

export const LeftImage = styled(Image)`
  transform: rotate(270deg);
  position: absolute;
  top: 64px;
  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  &.active {
    transform: rotate(70.281deg) translate(-50%, 60%);
    top: 60%;
  }
`;

export const MiddleImage = styled(Image)`
  position: relative;
  z-index: 3;
  cursor: pointer;
`;

export const RightImage = styled(Image)`
  width: 21.875rem;
  height: 13.875rem;
  transform: rotate(90deg);
  top: 65px;
  position: absolute;
  transition: transform 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

  &.active {
    transform: rotate(-70.281deg) translate(50%, 60%);
    top: 60%;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 3rem;
`;
