'use client';

import { keyframes, styled } from 'styled-components';

const bounce = keyframes`
  0%   { transform: translate3d(var(--tx, 0), var(--ty, 0), 0) rotate(var(--rotate, 0deg)); }
  40%  { transform: translate3d(var(--tx, 0), calc(var(--ty, 0) - 6px), 0) rotate(var(--rotate, 0deg)); }
  70%  { transform: translate3d(var(--tx, 0), calc(var(--ty, 0) - 2px), 0) rotate(var(--rotate, 0deg)); }
  100% { transform: translate3d(var(--tx, 0), calc(var(--ty, 0) - 5px), 0) rotate(var(--rotate, 0deg)); }
`;

export const Wrapper = styled.section`
  padding: clamp(2rem, 4vw, 3rem) 0 clamp(5.5rem, 8vw, 7rem);
`;

export const Inner = styled.div`
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(19rem, 0.96fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  min-width: 0;
  padding-top: 0.35rem;
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  margin-bottom: 1rem;
  color: var(--emerald);
  font-size: 0.95rem;
  text-transform: uppercase;
  font-weight: 700 !important;
  letter-spacing: 1.6px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const Heading = styled.h2`
  max-width: 14ch;
  font-size: clamp(2.25rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-wrap: balance;
`;

export const AccentLine = styled.span`
  display: block;
  margin-top: 0.35rem;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2rem, 4.4vw, 3.9rem);
  font-style: italic;
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.03em;

  @media (max-width: 768px) {
    font-size: clamp(1.85rem, 8vw, 2.9rem);
  }
`;

export const Lead = styled.p`
  max-width: 36rem;
  color: #cfcfcf;
  font-size: 1.03rem;
  line-height: 1.75;
  text-wrap: pretty;

  @media (max-width: 768px) {
    font-size: 0.96rem;
    line-height: 1.68;
  }
`;

export const StickerCluster = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 0;
  min-height: clamp(10rem, 18vw, 13rem);
  padding: 0.75rem 0 0.25rem;
  isolation: isolate;

  @media (max-width: 768px) {
    min-height: auto;
    padding-top: 0.15rem;
  }
`;

export const StickerCard = styled.div<{
  $size: 'large' | 'medium' | 'small';
  $rotate: string;
  $translate: string;
}>`
  --rotate: ${({ $rotate }) => $rotate};
  --tx: ${({ $translate }) => $translate.split(',')[0]};
  --ty: ${({ $translate }) => $translate.split(',')[1]};
  position: relative;
  flex: 0 0 auto;
  width: ${({ $size }) => ($size === 'large' ? '10.4rem' : $size === 'medium' ? '8.4rem' : '6.8rem')};
  height: ${({ $size }) => ($size === 'large' ? '10.4rem' : $size === 'medium' ? '8.4rem' : '6.8rem')};
  transform: translate3d(var(--tx), var(--ty), 0) rotate(var(--rotate));
  transition: filter 0.25s ease;
  will-change: transform;

  &:not(:first-child) {
    margin-left: -0.9rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      z-index: 4;
      filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.18));
      animation: ${bounce} 0.35s ease forwards;
    }
  }

  @media (max-width: 768px) {
    width: ${({ $size }) => ($size === 'large' ? '7.4rem' : $size === 'medium' ? '6rem' : '5rem')};
    height: ${({ $size }) => ($size === 'large' ? '7.4rem' : $size === 'medium' ? '6rem' : '5rem')};

    &:not(:first-child) {
      margin-left: -0.55rem;
    }
  }
`;

export const StickerContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    object-fit: contain;
  }
`;

export const SupportRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.4rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.8rem 1.1rem;
  }
`;

export const SupportItem = styled.span`
  color: var(--white);
  font-size: 0.96rem;
  line-height: 1.5;
`;

export const SupportLink = styled.a`
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.96rem;
  line-height: 1.5;
  transition: color 0.2s ease, opacity 0.2s ease;

  &:hover {
    color: var(--emerald);
  }
`;

export const ScheduleColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  min-width: 0;
`;

export const NoticeCard = styled.div`
  padding: 1.2rem 1.3rem;
  border-radius: 1.5rem;
  background: rgba(23, 242, 166, 0.1);
  border: 1px solid rgba(23, 242, 166, 0.2);
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.96rem;
  line-height: 1.7;
  text-wrap: pretty;

  @media (max-width: 768px) {
    border-radius: 1.2rem;
    padding: 1rem 1.05rem;
    font-size: 0.92rem;
    line-height: 1.62;
  }
`;

export const NoticeLink = styled.a`
  color: var(--emerald);
  text-decoration: underline;
  text-underline-offset: 0.18em;
`;

export const SchedulerCard = styled.div`
  padding: 1.25rem;
  border-radius: 1.8rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.22);

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 1.3rem;
  }
`;

export const WidgetEyebrow = styled.span`
  display: inline-flex;
  margin-bottom: 0.55rem;
  color: var(--emerald);
  font-size: 0.78rem;
  font-weight: 700 !important;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const WidgetHeader = styled.h3`
  color: var(--white);
  font-size: clamp(1.35rem, 2vw, 1.8rem);
  font-weight: 700 !important;
  line-height: 1.08;
`;

export const WidgetSubcopy = styled.p`
  margin-top: 0.55rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.95rem;
  line-height: 1.65;
  text-wrap: pretty;
`;

export const EmbedFrameWrap = styled.div`
  width: 100%;
  min-height: 42rem;
  border-radius: 1.35rem;
  overflow: hidden;
  background: rgba(8, 17, 19, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 768px) {
    min-height: 38rem;
    border-radius: 1.1rem;
  }
`;

export const EmbedFrame = styled.iframe`
  width: 100%;
  min-height: 42rem;
  border: 0;
  background: transparent;

  @media (max-width: 768px) {
    min-height: 38rem;
  }
`;

export const EmbedFallback = styled.div`
  min-height: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: clamp(1.25rem, 2vw, 1.75rem);
  border-radius: 1.35rem;
  background:
    radial-gradient(circle at top right, rgba(23, 242, 166, 0.16), transparent 42%),
    rgba(8, 17, 19, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.06);

  code {
    padding: 0.14rem 0.35rem;
    border-radius: 0.35rem;
    background: rgba(255, 255, 255, 0.08);
    font-size: 0.88em;
  }
`;

export const EmbedFallbackTitle = styled.h4`
  color: var(--white);
  font-size: clamp(1.15rem, 1.8vw, 1.35rem);
  font-weight: 700 !important;
  line-height: 1.2;
`;

export const EmbedFallbackText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.96rem;
  line-height: 1.7;
`;

export const EmbedActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const EmbedButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.9rem;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--white);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-1px);
      border-color: rgba(23, 242, 166, 0.42);
      background: rgba(23, 242, 166, 0.08);
    }
  }
`;
