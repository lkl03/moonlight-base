'use client';

import Link from 'next/link';
import { css, styled } from 'styled-components';

/* ── Replicates the home FloatingNav surface ─────────────────────────── */
const lightNoiseSurface = css`
  position: relative;
  background: linear-gradient(180deg, rgba(248, 248, 246, 0.98) 0%, rgba(240, 240, 238, 0.95) 100%);
  border: 1px solid rgba(18, 23, 23, 0.12);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.35) inset,
    0 18px 42px rgba(0, 0, 0, 0.28),
    0 0 24px rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: url('/svgs/noise.svg');
    background-size: 260px 260px;
    background-repeat: repeat;
    opacity: 0.14;
    filter: invert(1) grayscale(1) contrast(1.15);
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

/* ── Dark pill button (same as home FloatingNav controls) ─────────────── */
const darkControl = css`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: var(--Background);
  color: var(--white);
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-1px);
      opacity: 0.96;
    }
  }
`;

export const Wrapper = styled.nav<{ $mounted: boolean }>`
  ${lightNoiseSurface};
  position: fixed;
  left: 50%;
  bottom: max(0.85rem, calc(env(safe-area-inset-bottom) + 0.35rem));
  transform: translateX(-50%);
  opacity: ${({ $mounted }) => ($mounted ? 1 : 0)};
  pointer-events: ${({ $mounted }) => ($mounted ? 'auto' : 'none')};
  transition: opacity 0.4s ease;
  z-index: 80;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem;
  border-radius: 999px;

  @media (max-width: 768px) {
    gap: 0.4rem;
    padding: 0.5rem;
  }
`;

export const ScrollTopButton = styled.button`
  ${darkControl};
  width: 3.2rem;
  height: 3.2rem;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  @media (max-width: 768px) {
    width: 2.85rem;
    height: 2.85rem;

    svg {
      width: 1.05rem;
      height: 1.05rem;
    }
  }
`;

export const HomeLink = styled(Link)`
  ${darkControl};
  height: 3.2rem;
  padding: 0 1.1rem;
  gap: 0.4rem;
  font-family: 'Raleway', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;

  @media (max-width: 768px) {
    height: 2.85rem;
    padding: 0 0.9rem;
    font-size: 0.86rem;
  }
`;

export const ThemeToggle = styled.button`
  ${darkControl};
  min-width: 6.15rem;
  height: 3.2rem;
  padding: 0 0.45rem;
  gap: 0.25rem;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    min-width: 5.2rem;
    height: 2.85rem;
    padding: 0 0.35rem;
  }
`;

export const ThemeIconSlot = styled.span<{ $isActive: boolean }>`
  width: 2.15rem;
  height: 2.15rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: ${({ $isActive }) => ($isActive ? 'rgba(255, 255, 255, 0.12)' : 'transparent')};
  color: var(--white);
  transition: background 0.2s ease, opacity 0.2s ease;

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }

  @media (max-width: 768px) {
    width: 1.85rem;
    height: 1.85rem;

    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export const ThemeDivider = styled.span`
  width: 1px;
  height: 1.2rem;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;

  @media (max-width: 768px) {
    height: 1rem;
  }
`;
