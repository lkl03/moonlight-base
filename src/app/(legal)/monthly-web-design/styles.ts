'use client';
import styled from 'styled-components';
import Link from 'next/link';

/* ── Layout ─────────────────────────────────────────────────────────────────── */

export const PageWrapper = styled.div``;

export const SectionInner = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

/* ── Hero ────────────────────────────────────────────────────────────────────── */

export const HeroSection = styled.section`
  padding: 4.5rem 0 4rem;

  @media (max-width: 768px) {
    padding: 2.75rem 0 3rem;
  }
`;

export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
`;

export const Eyebrow = styled.span`
  display: block;
  font-size: 0.78rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1.6px;
  line-height: 1.2;
  color: var(--emerald);
`;

export const HeroHeading = styled.h1`
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -1px;
  color: var(--white);
`;

export const HeroSub = styled.p`
  font-size: clamp(0.98rem, 2vw, 1.1rem);
  color: #bdbdbd;
  line-height: 1.65;
  max-width: 36rem;
`;

export const HeroNote = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.52);
  line-height: 1.6;
  max-width: 34rem;
`;

export const HeroTrustText = styled.p`
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.5;
`;

export const CtaLinkBtn = styled(Link)`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  border: 2px solid var(--white);
  border-left-width: 8px;
  color: var(--white);
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-weight: 700;
  padding: clamp(0.8rem, 2vw, 1rem) clamp(1.8rem, 5vw, 2.5rem);
  text-decoration: none;
  cursor: pointer;
  align-self: flex-start;
  background-image: linear-gradient(var(--green), var(--green));
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
    border-color: var(--green);
    border-left-color: var(--green);
    color: var(--Background);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

/* ── Form card ────────────────────────────────────────────────────────────────── */

export const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 1.75rem 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormTitle = styled.h2`
  font-size: 1.12rem;
  font-weight: 900;
  color: var(--white);
  margin-bottom: 0.1rem;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.32rem;
`;

export const Label = styled.label`
  font-size: 0.73rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
`;

const inputBase = `
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--white);
  font-family: 'Raleway', sans-serif;
  font-size: 0.89rem;
  padding: 0.58rem 0.82rem;
  width: 100%;
  outline: none;
  transition: border-color 0.18s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.26);
  }

  &:focus {
    border-color: var(--green);
  }
`;

export const Input = styled.input`
  ${inputBase}
`;

export const SelectInput = styled.select<{ $isEmpty?: boolean }>`
  ${inputBase}
  appearance: none;
  cursor: pointer;
  color: ${({ $isEmpty }) => ($isEmpty ? 'rgba(255,255,255,0.26)' : 'var(--white)')};

  option {
    background: #1a2020;
    color: var(--white);
  }
`;

export const TextareaInput = styled.textarea`
  ${inputBase}
  resize: vertical;
  min-height: 5rem;
`;

export const CheckRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 0.81rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.55;

  input[type='checkbox'] {
    flex-shrink: 0;
    margin-top: 0.18rem;
    width: 0.95rem;
    height: 0.95rem;
    accent-color: var(--green);
    cursor: pointer;
  }
`;

export const SubmitBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  border-radius: 10px;
  border: 2px solid var(--white);
  border-left-width: 8px;
  color: var(--white);
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.88rem 1.5rem;
  cursor: pointer;
  background: none;
  background-image: linear-gradient(var(--green), var(--green));
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 0% 100%;
  transition:
    background-size 0.3s ease-in-out,
    border-color 0.3s ease-in-out,
    border-left-color 0.3s ease-in-out,
    color 0.2s ease-in-out;
  font-family: 'Raleway', sans-serif;

  &:hover:not(:disabled) {
    background-size: 100% 100%;
    border-color: var(--green);
    border-left-color: var(--green);
    color: var(--Background);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

export const FormLegal = styled.p`
  font-size: 0.69rem;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1.55;
  text-align: center;

  a {
    color: var(--emerald);
    text-decoration: none;
  }
`;

export const FormErrorMsg = styled.p`
  font-size: 0.8rem;
  color: #ff6b6b;
  line-height: 1.5;
`;

/* ── Content sections ─────────────────────────────────────────────────────────── */

export const ContentSection = styled.section`
  padding: clamp(3.5rem, 6vw, 5rem) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

export const SectionEyebrow = styled.span`
  display: block;
  font-size: 0.76rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1.6px;
  color: var(--emerald);
  margin-bottom: 0.65rem;
`;

export const SectionHeading = styled.h2`
  font-size: clamp(1.65rem, 3.5vw, 2.25rem);
  font-weight: 900;
  line-height: 1.15;
  color: var(--white);
  margin-bottom: 0.7rem;
`;

export const SectionLead = styled.p`
  font-size: 0.97rem;
  color: #bdbdbd;
  line-height: 1.72;
  max-width: 44rem;
`;

/* ── What's Included ─────────────────────────────────────────────────────────── */

export const IncludedGrid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(168px, 1fr));
  gap: 0.9rem;
  margin-top: 2.25rem;
`;

export const IncludedCard = styled.li`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.15rem 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  strong {
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--white);
  }

  p {
    font-size: 0.81rem;
    color: #bdbdbd;
    line-height: 1.55;
    margin: 0;
  }
`;

export const GreenCheck = styled.span`
  color: var(--green);
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1;
  margin-bottom: 0.15rem;
  display: block;
`;

/* ── Who it's for ─────────────────────────────────────────────────────────────── */

export const FitGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  margin-top: 2.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

export const FitColumn = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const FitHeading = styled.h3`
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--white);
  font-family: 'Inter', sans-serif;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const FitList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FitItem = styled.li<{ $positive: boolean }>`
  font-size: 0.86rem;
  color: ${({ $positive }) => ($positive ? '#bdbdbd' : 'rgba(255,255,255,0.42)')};
  line-height: 1.5;
  padding-left: 1.35rem;
  position: relative;

  &::before {
    content: '${({ $positive }) => ($positive ? '✓' : '✗')}';
    position: absolute;
    left: 0;
    font-weight: 700;
    color: ${({ $positive }) => ($positive ? 'var(--green)' : 'rgba(255,85,85,0.72)')};
  }
`;

/* ── Plans preview ────────────────────────────────────────────────────────────── */

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
  margin-top: 2.25rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const PlanCard = styled.div<{ $featured?: boolean }>`
  background: ${({ $featured }) => ($featured ? 'var(--darkGreen)' : 'rgba(255,255,255,0.03)')};
  border: 1px solid
    ${({ $featured }) => ($featured ? 'transparent' : 'rgba(255,255,255,0.1)')};
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const PlanName = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.52);
`;

export const PlanPrice = styled.h3`
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 900;
  font-family: 'Inter', sans-serif;
  color: var(--white);
  line-height: 1;
`;

export const PlanPriceNote = styled.span`
  font-size: 0.73rem;
  color: rgba(255, 255, 255, 0.48);
  line-height: 1.4;
  display: block;
`;

export const PlanDesc = styled.p`
  font-size: 0.87rem;
  color: ${({ theme: _ }) => '#bdbdbd'};
  line-height: 1.6;
  margin-top: 0.3rem;
`;

export const PlanFeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  margin-top: 0.7rem;

  li {
    font-size: 0.83rem;
    color: #bdbdbd;
    padding-left: 1.25rem;
    position: relative;
    line-height: 1.45;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      font-weight: 700;
      color: var(--green);
    }
  }
`;

export const PlanScopeNote = styled.p`
  margin-top: 1.5rem;
  font-size: 0.83rem;
  color: rgba(255, 255, 255, 0.38);
  font-style: italic;
  text-align: center;
`;

/* ── Why monthly ──────────────────────────────────────────────────────────────── */

export const WhyGrid = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1rem;
  margin-top: 2.25rem;
`;

export const WhyCard = styled.li`
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 1.2rem 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  strong {
    font-family: 'Inter', sans-serif;
    font-size: 0.86rem;
    font-weight: 700;
    color: var(--green);
  }

  p {
    font-size: 0.82rem;
    color: #bdbdbd;
    line-height: 1.62;
    margin: 0;
  }
`;

/* ── FAQ ──────────────────────────────────────────────────────────────────────── */

export const FaqAccordion = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.25rem;
`;

export const FaqItem = styled.div`
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const FaqQuestion = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: transparent;
  border: 0;
  color: var(--white);
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.12rem);
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  padding: 0;

  span {
    flex: 1;
  }

  svg {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    transition: transform 0.22s ease;
    transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

export const FaqAnswer = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '600px' : '0')};
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  transition:
    max-height 0.35s ease,
    opacity 0.25s ease;
  padding-top: ${({ $open }) => ($open ? '0.9rem' : '0')};
  padding-right: 2rem;
  font-size: 0.93rem;
  color: #c9c9c9;
  line-height: 1.72;
  max-width: 52rem;

  @media (max-width: 768px) {
    padding-right: 0;
    font-size: 0.9rem;
  }
`;

/* ── Bottom CTA ──────────────────────────────────────────────────────────────── */

export const BottomCtaSection = styled.section`
  padding: clamp(4rem, 7vw, 5.5rem) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  text-align: center;
`;

export const BottomCtaHeading = styled.h2`
  font-size: clamp(1.65rem, 4vw, 2.25rem);
  font-weight: 900;
  line-height: 1.15;
  color: var(--white);
  margin-bottom: 0.9rem;
`;

export const BottomCtaSub = styled.p`
  font-size: 0.96rem;
  color: #bdbdbd;
  line-height: 1.68;
  max-width: 38rem;
  margin: 0 auto 2rem;
`;
