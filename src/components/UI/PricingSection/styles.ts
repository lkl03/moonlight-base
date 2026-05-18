'use client';

import styled from 'styled-components';

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
    font-weight: 700 !important;
    letter-spacing: 1.6px;
    line-height: 1.2;
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
    line-height: 1.5;
    margin: 0 auto;
    text-wrap: balance;
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

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  & > div {
    transition: transform 0.25s ease;
  }

  @media (hover: hover) and (pointer: fine) {
    & > div:hover {
      transform: translateY(-4px);
    }
  }
`;

export const Card = styled.div`
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--card-bg, var(--white));
  color: var(--card-fg, var(--Background));
  border: var(--card-border, 1px solid var(--light-gray));
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
`;

export const TextCtn = styled.div`
  padding: 2rem 2.25rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--card-fg, var(--Background));

  .title {
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 1.2;
    opacity: 0.95;
    color: var(--Background);
  }

  .price {
    font-size: 3rem;
    line-height: 1;
    font-weight: 800;
    margin-top: 0.25rem;
    color: var(--price-color, currentColor);
  }

  .note {
    font-size: 0.75rem;
    line-height: 1.2;
    opacity: 0.9;
    color: var(--Background);
    text-align: center;
  }

  .desc {
    width: min(100%, 24rem);
    font-size: 0.9rem;
    line-height: 1.55;
    margin-top: 0.25rem;
    margin-inline: auto;
    opacity: 0.95;
    text-align: center;
    text-wrap: balance;
  }

  hr {
    border: 0;
    height: 1px;
    background: currentColor;
    opacity: var(--divider-opacity, 0.2);
    margin: 1.25rem 0 1rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 0;

    > .title {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
    }

    > .price {
      font-size: 2.25rem;
    }

    > .note {
      font-size: 0.75rem;
    }

    > .desc {
      width: min(100%, 20rem);
      font-size: 0.95rem;
      line-height: 1.45;
    }
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.6rem;
  margin: 0 2.25rem 2rem;
  padding: 0;

  li {
    font-size: 0.9rem;
    display: flex;
    flex-direction: row-reverse;
    align-items: start;
    justify-content: space-between;
    column-gap: 0.5rem;
  }

  li::before {
    content: '✓';
    font-weight: 700;
    color: var(--tick, var(--green));
  }
`;

export const Footer = styled.div`
  padding: 0 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

type PlanCtaVariant = 'white-on-green' | 'green-to-green';

const ctaBase = ($variant: PlanCtaVariant) => {
  if ($variant === 'white-on-green') return '#ffffff';
  return 'var(--darkGreen)';
};
const ctaHoverFill = ($variant: PlanCtaVariant) => {
  if ($variant === 'white-on-green') return '#ffffff, #ffffff';
  return 'var(--green), var(--green)';
};
const ctaHoverColor = ($variant: PlanCtaVariant) => {
  if ($variant === 'white-on-green') return 'var(--darkGreen)';
  return '#ffffff';
};

export const PlanCta = styled.button<{ $variant: PlanCtaVariant }>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid ${({ $variant }) => ctaBase($variant)};
  border-left-width: 8px;
  border-left-color: ${({ $variant }) => ctaBase($variant)};
  color: ${({ $variant }) => ctaBase($variant)};
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: bold;
  padding: clamp(0.8rem, 2vw, 1rem) clamp(1.8rem, 5vw, 2.8rem);
  cursor: pointer;
  background: none;
  background-image: linear-gradient(${({ $variant }) => ctaHoverFill($variant)});
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 0% 100%;
  transition:
    background-size 0.3s ease-in-out,
    border-color 0.3s ease-in-out,
    border-left-color 0.3s ease-in-out,
    color 0.2s ease-in-out;

  &:hover {
    background-size: 100% 100%;
    border-color: ${({ $variant }) => ctaBase($variant)};
    border-left-color: ${({ $variant }) => ctaBase($variant)};
    color: ${({ $variant }) => ctaHoverColor($variant)};
  }

  &:focus {
    outline: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  span {
    position: relative;
    z-index: 1;
    width: 100%;
    text-align: center;
  }
`;

export const PlanCtaLegal = styled.p<{ $onDark?: boolean }>`
  font-size: 0.72rem;
  line-height: 1.55;
  text-align: center;
  color: ${({ $onDark }) =>
    $onDark ? 'rgba(255,255,255,0.72)' : 'var(--Background)'};
  opacity: 0.75;
  max-width: 22rem;

  a {
    text-decoration: underline;
    color: inherit;

    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.68rem;
  }
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;
