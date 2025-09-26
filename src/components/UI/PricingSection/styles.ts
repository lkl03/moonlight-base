'use client';
import styled, { css } from 'styled-components';
import card_grid from '../../../../public/images/card_grid.png';

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


export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
`;

export const TextCtn = styled.div`
  padding: 2rem 2.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--card-fg, var(--Background));

  /* Title: primer span directo (MaskText tag="span") */
  > span:first-of-type {
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 1.2;
    opacity: 0.95;
  }

  /* Fallback del layout anterior */
  h3.title,
  .title {
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 700;
    line-height: 1.2;
    opacity: 0.95;
  }

  /* Price: h3 directo (MaskText tag="h3") */
  > h3,
  .price {
    font-size: 3rem;
    line-height: 1;
    font-weight: 800;
    margin-top: 0.25rem;
  }

  /* Note: segundo span directo (MaskText tag="span" después del h3) */
  > span:nth-of-type(2),
  .note {
    font-size: 0.75rem;
    line-height: 1.2;
    opacity: 0.9;
  }

  /* Description: p directo (MaskText tag="p") */
  > p,
  .desc {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-top: 0.25rem;
    opacity: 0.95;
  }

  hr {
    border: 0;
    height: 1px;
    background: currentColor;
    opacity: var(--divider-opacity, 0.12);
    margin: 1.25rem 0 1rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 0;

    > span:first-of-type,
    h3.title,
    .title {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
    }

    > h3,
    .price {
      font-size: 2.25rem;
    }

    > span:nth-of-type(2),
    .note {
      font-size: 0.75rem;
    }

    > p,
    .desc {
      font-size: 0.95rem;
      line-height: 1.4;
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
    display: grid;
    grid-template-columns: 1.1rem auto;
    align-items: start;
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
`;

export const StartBtn = styled.button`
  width: fit-content;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 0.95rem;
  transition: transform 0.1s ease, box-shadow 0.2s ease;
  cursor: pointer;

  background: var(--btn-bg, transparent);
  color: var(--btn-fg, var(--green));
  border: var(--btn-border, 2px solid var(--green));

  &:hover { transform: translateY(-1px); }
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

export const SVGCtn = styled.div`
  background: url(${card_grid.src});
  height: 24.55rem;
  display: grid;
  place-items: center;

  @media (max-width: 768px) {
    height: 15.28219rem;
    background-position: center center;
    background-size: contain;

    img {
      width: 7.5rem;
      height: 7.5rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 3rem;
`;
