'use client';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;
`;

export const ModalBox = styled(motion.div)`
  /* Always light — the modal must be readable regardless of site theme. */
  background: #ffffff;
  color: #121717;
  border-radius: 1rem;
  max-width: 36rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem 2.25rem 1.75rem;
  position: relative;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.32);

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem 1.5rem;
  }
`;

export const ModalClose = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--Background, #121717);
  opacity: 0.4;
  line-height: 1;
  padding: 0.35rem;
  border-radius: 50%;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const ModalTitle = styled.h3`
  font-size: clamp(1.2rem, 4vw, 1.4rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
  padding-right: 2rem;
  color: #121717;
  line-height: 1.2;
`;

export const ModalPriceBadge = styled.div`
  display: inline-block;
  background: var(--green, #17f2a6);
  color: var(--Background, #121717);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
`;

export const ModalBodyText = styled.p`
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 0.85rem;
  /* && doubles class specificity to beat [data-theme="light"] p { color !important } */
  && {
    color: #555 !important;
  }
`;

export const ModalDivider = styled.hr`
  border: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.08);
  margin: 1.25rem 0;
`;

export const ModalCheckboxRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  margin-bottom: 1.5rem;

  input[type='checkbox'] {
    margin-top: 0.18rem;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    accent-color: var(--darkGreen, #45a383);
    cursor: pointer;
  }
`;

export const ModalCheckboxLabel = styled.label`
  font-size: 0.875rem;
  line-height: 1.6;
  color: #444;
  cursor: pointer;

  a {
    color: var(--darkGreen, #45a383);
    text-decoration: underline;

    &:hover {
      color: var(--green, #17f2a6);
    }
  }
`;

export const ModalActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ModalLegalNote = styled.p`
  font-size: 0.75rem;
  line-height: 1.6;
  text-align: center;
  margin-top: 0.9rem;
  /* && doubles class specificity to beat [data-theme="light"] p { color !important } */
  && {
    color: #999 !important;
  }

  a {
    color: var(--darkGreen, #45a383);
    text-decoration: underline;

    &:hover {
      color: var(--green, #17f2a6);
    }
  }
`;

// ── Form inputs ──────────────────────────────────────────────────────────────

export const ModalInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.9rem;
`;

export const ModalLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #444;
  letter-spacing: 0.02em;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  font-size: 0.925rem;
  font-family: Raleway, sans-serif;
  color: var(--Background, #121717);
  background: #fafafa;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: var(--darkGreen, #45a383);
    box-shadow: 0 0 0 3px rgba(69, 163, 131, 0.12);
  }
`;

export const ModalErrorText = styled.p`
  font-size: 0.825rem;
  line-height: 1.5;
  margin-top: 0.25rem;
  padding: 0.6rem 0.85rem;
  background: rgba(192, 57, 43, 0.06);
  border-radius: 6px;
  border-left: 3px solid #c0392b;
  /* && doubles class specificity to beat [data-theme="light"] p { color !important } */
  && {
    color: #c0392b !important;
  }
`;

// ── Buttons ──────────────────────────────────────────────────────────────────

export const ContinueButton = styled.button`
  background: var(--darkGreen, #45a383);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  font-family: Raleway, sans-serif;
  padding: 0.875rem 2.5rem;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--green, #17f2a6);
    color: var(--Background, #121717);
  }

  &:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }
`;

export const ModalSecondaryButton = styled.button`
  background: none;
  color: #777;
  border: 1.5px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: Raleway, sans-serif;
  padding: 0.65rem 1.5rem;
  cursor: pointer;
  width: 100%;
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: rgba(0, 0, 0, 0.28);
    color: #444;
  }
`;

// ── PayPal SDK container ─────────────────────────────────────────────────────

export const PayPalButtonContainer = styled.div`
  min-height: 48px;
  width: 100%;
  position: relative;
`;

export const PayPalLoadingText = styled.p`
  font-size: 0.875rem;
  color: #888;
  text-align: center;
  padding: 1rem 0;
`;
