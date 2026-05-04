// styles.ts
'use client';
import Link from 'next/link';
import { styled } from 'styled-components';

type Variant = 'green filled' | 'black filled' | 'green-to-black' | 'white-on-green';

const baseBorder = ($variant: Variant) => {
  if ($variant === 'green-to-black') return 'var(--darkGreen)';
  if ($variant === 'white-on-green') return '#ffffff';
  return 'var(--white)';
};

const hoverBorder = ($variant: Variant) => {
  if ($variant === 'black filled' || $variant === 'green-to-black') return 'var(--Background)';
  if ($variant === 'white-on-green') return '#ffffff';
  return 'var(--green)';
};

const overlayFill = ($variant: Variant) => {
  if ($variant === 'black filled' || $variant === 'green-to-black')
    return 'var(--Background), var(--Background)';
  if ($variant === 'white-on-green') return '#ffffff, #ffffff';
  return 'var(--green), var(--green)';
};

const baseColor = ($variant: Variant) => {
  if ($variant === 'green-to-black') return 'var(--darkGreen)';
  if ($variant === 'white-on-green') return '#ffffff';
  return 'var(--white)';
};

const hoverColor = ($variant: Variant) => {
  if ($variant === 'green filled') return '#ffffff';
  if ($variant === 'white-on-green') return 'var(--darkGreen)';
  return 'var(--white)';
};

export const LinkTo = styled(Link)<{ $variant: Variant }>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;

  border: 2px solid ${({ $variant }) => baseBorder($variant)};
  border-left-width: 8px;
  border-left-color: ${({ $variant }) => baseBorder($variant)};

  color: ${({ $variant }) => baseColor($variant)};
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: bold;
  padding: clamp(0.8rem, 2vw, 1rem) clamp(1.8rem, 5vw, 2.8rem);
  text-decoration: none;
  cursor: pointer;

  background-image: linear-gradient(${({ $variant }) => overlayFill($variant)});
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
    border-color: ${({ $variant }) => hoverBorder($variant)};
    border-left-color: ${({ $variant }) => hoverBorder($variant)};
    color: ${({ $variant }) => hoverColor($variant)};
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
