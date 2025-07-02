'use client';
import Link from 'next/link';
import { styled } from 'styled-components';

export const LinkTo = styled(Link)`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 9999px;
  background: transparent;
  border: 2px solid var(--white);
  color: var(--white);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: 600;
  padding: clamp(0.6rem, 2vw, 0.8rem) clamp(1.5rem, 5vw, 2.5rem);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.4s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -90%;
    width: 100%;
    height: 100%;
    background-color: var(--white);
    transition: left 0.4s ease;
    z-index: 0;
  }

  &:hover::before {
    left: 0;
    background-color: var(--green);
  }

  span {
    position: relative;
    z-index: 1;
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  &:hover {
    border-color: var(--green);
    color: var(--white);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(23, 242, 166, 0.4);
  }
`;


