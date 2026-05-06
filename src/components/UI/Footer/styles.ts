'use client';

import Link from 'next/link';
import { styled } from 'styled-components';

export const Wrapper = styled.footer`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(4.5rem, 8vw, 6.5rem) 0 clamp(7.5rem, 11vw, 9rem);

  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -11rem;
    background: #5fd1b2;
    border-radius: 999px;
    z-index: 0;
  }

  &::before {
    left: -16%;
    width: min(34rem, 40vw);
    height: 16rem;
  }

  &::after {
    right: -18%;
    width: min(72rem, 78vw);
    height: 15rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 0 6rem;

    &::before,
    &::after {
      bottom: -7rem;
    }

    &::before {
      left: -35%;
      width: 18rem;
      height: 9rem;
    }

    &::after {
      right: -45%;
      width: 28rem;
      height: 8rem;
    }
  }
`;

export const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  padding-top: clamp(2.25rem, 4vw, 2.75rem);
  border-top: 0.0625rem solid rgba(255, 255, 255, 0.12);
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(15rem, 1fr) auto;
  align-items: start;
  gap: clamp(2.5rem, 6vw, 7rem);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
`;

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;

  img {
    width: clamp(10rem, 15vw, 14rem);
    height: auto;
    object-fit: contain;
  }
`;

export const BrandCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.95rem;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

export const BrandCopyLine = styled.p`
  color: inherit;
`;

export const BrandSecondaryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
`;

export const BrandAccentLink = styled.a`
  color: var(--emerald);
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.82;
  }
`;

export const LegalMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 0.15rem;
`;

export const LegalMetaItem = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.88rem;
  line-height: 1.5;
`;

export const LegalMetaLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.88rem;
  line-height: 1.5;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--emerald);
  }
`;

export const VersionTag = styled.p`
  font-size: 0.78rem;
  font-style: italic;
  color: var(--emerald);
  line-height: 1.4;
  margin-top: 0.25rem;
  opacity: 0.75;
`;

export const UtilityGrid = styled.div<{ $single?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $single }) =>
    $single ? '1fr' : 'repeat(2, minmax(11rem, 14rem))'};
  align-items: start;
  gap: clamp(2rem, 4vw, 4.5rem);

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.15rem;
`;

export const ColumnTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700 !important;
  line-height: 1.2;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 0;
  margin: 0;
`;

export const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.95rem;
  line-height: 1.5;
  transition: color 0.2s ease, opacity 0.2s ease;

  &:hover {
    color: var(--emerald);
  }
`;

export const ContactList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 0;
  margin: 0;
`;

export const ContactLink = styled.a`
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.95rem;
  line-height: 1.5;
  transition: color 0.2s ease, opacity 0.2s ease;

  &:hover {
    color: var(--emerald);
  }
`;
