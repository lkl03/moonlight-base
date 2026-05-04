'use client';

import { css, styled } from 'styled-components';

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

export const Wrapper = styled.nav<{ $isVisible: boolean }>`
  ${lightNoiseSurface};
  position: fixed;
  left: 50%;
  bottom: max(0.85rem, calc(env(safe-area-inset-bottom) + 0.35rem));
  transform: translateX(-50%) ${({ $isVisible }) => ($isVisible ? 'translateY(0)' : 'translateY(0.75rem)')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transition: opacity 0.35s ease, transform 0.35s ease;
  z-index: 80;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: min(96vw, 60rem);
  padding: 0.65rem;
  border-radius: 999px;

  @media (max-width: 768px) {
    width: min(94vw, 28rem);
    gap: 0.5rem;
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

export const DesktopLinks = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  min-width: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavButton = styled.button<{ $isActive: boolean }>`
  flex: 0 0 auto;
  border: 0;
  border-radius: 999px;
  padding: 0.9rem 1.18rem;
  background: ${({ $isActive }) => ($isActive ? 'var(--green)' : 'transparent')};
  color: var(--Background);
  font-family: 'Raleway', sans-serif;
  font-size: 0.98rem;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ $isActive }) => ($isActive ? 'var(--green)' : 'rgba(18, 23, 23, 0.08)')};
    }
  }
`;

export const MobileCenterButton = styled.button<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    flex: 1 1 auto;
    align-items: center;
    justify-content: space-between;
    gap: 0.55rem;
    min-width: 0;
    height: 2.85rem;
    padding: 0 1rem;
    border: 0;
    border-radius: 999px;
    background: ${({ $isOpen }) => ($isOpen ? 'rgba(23, 242, 166, 0.88)' : 'var(--green)')};
    color: var(--Background);
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease;

    span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.92rem;
      font-weight: 700;
      line-height: 1;
    }
  }
`;

export const ChevronIconWrap = styled.span<{ $isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;

  svg {
    width: 100%;
    height: 100%;
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

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    ${lightNoiseSurface};
    display: grid;
    gap: 0.25rem;
    position: absolute;
    left: 50%;
    bottom: calc(100% + 0.75rem);
    transform: translateX(-50%) ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(0.4rem)')};
    width: min(88vw, 20rem);
    padding: 0.45rem;
    border-radius: 1.2rem;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
  }
`;

export const MobileMenuButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1rem;
  border: 0;
  border-radius: 999px;
  background: ${({ $isActive }) => ($isActive ? 'var(--green)' : 'transparent')};
  color: var(--Background);
  font-family: 'Raleway', sans-serif;
  font-size: 0.94rem;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: ${({ $isActive }) => ($isActive ? 'var(--green)' : 'rgba(18, 23, 23, 0.08)')};
    }
  }
`;
