'use client';

import Image from 'next/image';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 8rem;
  font-family: 'Raleway', sans-serif;

  @media (max-width: 768px) {
    padding: 2.5rem 1.25rem 7rem;
  }
`;

export const PageHeader = styled.header`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

export const Eyebrow = styled.span`
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--emerald);
  margin-bottom: 0.85rem;
`;

export const PageTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  line-height: 1.1;
  color: var(--white);
  margin-bottom: 1rem;
`;

export const PageSubtitle = styled.p`
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  line-height: 1.7;
  color: var(--light-gray);
  max-width: 38rem;
  margin: 0 auto;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ProjectCard = styled.a`
  display: flex;
  flex-direction: column;
  border-radius: 1.25rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  /* Light mode: solid white card so it's always visible */
  [data-theme="light"] & {
    border-color: rgba(0, 0, 0, 0.1);
    background: #ffffff;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-4px);
      border-color: rgba(23, 242, 166, 0.25);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.22);
    }

    [data-theme="light"] &:hover {
      border-color: rgba(23, 242, 166, 0.4);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.12);
    }
  }
`;

export const ProjectCoverWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: rgba(18, 23, 23, 0.6);
`;

export const ProjectCoverImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.4s ease;

  ${ProjectCard}:hover & {
    transform: scale(1.03);
  }
`;

export const ProjectPill = styled.span`
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: rgba(8, 17, 19, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const ProjectBody = styled.div`
  padding: 1.4rem 1.6rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  flex: 1;
`;

export const ProjectYear = styled.span`
  font-size: 0.78rem;
  color: var(--emerald);
  font-weight: 600;
  letter-spacing: 0.06em;
`;

export const ProjectTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  line-height: 1.2;
  color: var(--white);
`;

export const ProjectDesc = styled.p`
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--light-gray);
  flex: 1;
`;

export const ProjectCTA = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--emerald);
  margin-top: 0.4rem;
  transition: gap 0.2s ease;

  ${ProjectCard}:hover & {
    gap: 0.55rem;
  }
`;
