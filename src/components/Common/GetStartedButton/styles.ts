'use client';
import Link from 'next/link';
import { styled, css } from 'styled-components';

export const LinkTo = styled(Link)<{ $variant: 'green filled' | 'black filled' }>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;

  /* keep your 2px border + 10px left border */
  border: 2px solid var(--white);
  border-left-width: 8px;

  /* text on top */
  color: var(--white);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: bold;
  padding: clamp(0.8rem, 2vw, 1rem) clamp(1.8rem, 5vw, 2.8rem);
  text-decoration: none;
  cursor: pointer;

  /* 1) set up a one-color gradient background
     2) hide it by sizing it to 0% width
     3) animate background-size on hover */
  background-image: linear-gradient(
    ${({ $variant }) =>
      $variant === 'green filled' ? 'var(--green)' : 'var(--Background)'}
  , ${({ $variant }) =>
      $variant === 'green filled' ? 'var(--green)' : 'var(--Background)'} );
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 0% 100%;
  transition:
    background-size 0.3s ease-in-out,
    border-color   0.3s ease-in-out;

  &:hover {
    /* expand the gradient from the left to full width */
    background-size: 100% 100%;

    /* recolor your borders to match */
    border-color: ${({ $variant }) =>
      $variant === 'green filled' ? 'var(--green)' : 'var(--Background)'};
  }

&:focus {
  outline: none;
  /* subtle outer shadow for both variants */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

  span {
    position: relative;
    z-index: 1;
    width: 100%;
    text-align: center;
  }
`;



