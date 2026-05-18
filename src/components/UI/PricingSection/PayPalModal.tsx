'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ModalOverlay,
  ModalBox,
  ModalClose,
  ModalTitle,
  ModalPriceBadge,
  ModalBodyText,
  ModalDivider,
  ModalCheckboxRow,
  ModalCheckboxLabel,
  ModalActions,
  PayPalButton,
  ModalLegalNote,
} from './modal-styles';

export interface PlanConfirmationData {
  title: string;
  priceMonthly: string;
  confirmationBody: string;
  paypalUrl: string;
  paypalPlanId: string;
}

interface PayPalModalProps {
  plan: PlanConfirmationData | null;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const boxVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 26, stiffness: 320, delay: 0.04 },
  },
  exit: { opacity: 0, y: 14, scale: 0.97, transition: { duration: 0.14 } },
};

export default function PayPalModal({ plan, onClose }: PayPalModalProps) {
  const [accepted, setAccepted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  // Reset checkbox whenever the modal opens for a (possibly different) plan
  useEffect(() => { setAccepted(false); }, [plan?.paypalPlanId]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = plan ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [plan]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubscribe = () => {
    if (!accepted || !plan) return;

    // TODO: Send acceptance record to backend before redirecting.
    // Intended payload for future persistence:
    // {
    //   planName: `${plan.title} Website Plan`,
    //   planPrice: plan.priceMonthly,
    //   currency: 'USD',
    //   paypalPlanId: plan.paypalPlanId,
    //   minimumCommitmentMonths: 12,
    //   acceptedTerms: true,
    //   acceptedTermsAt: new Date().toISOString(),
    //   acceptedMinimumCommitment: true,
    //   acceptedMinimumCommitmentAt: new Date().toISOString(),
    //   source: 'pricing_checkout',
    // }

    window.location.href = plan.paypalUrl;
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {plan && (
        <ModalOverlay
          ref={overlayRef as any}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleOverlayClick}
        >
          <ModalBox
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="paypal-modal-title"
          >
            <ModalClose onClick={onClose} aria-label="Close">✕</ModalClose>

            <ModalTitle id="paypal-modal-title">
              {plan.title} Website Plan
            </ModalTitle>

            <ModalPriceBadge>
              {plan.priceMonthly} &middot; 12-month minimum
            </ModalPriceBadge>

            <ModalBodyText>
              You&apos;re subscribing to the <strong>{plan.title} Website Plan</strong> for{' '}
              <strong>{plan.priceMonthly}</strong>.
            </ModalBodyText>

            {plan.confirmationBody.split('\n\n').map((para, i) => (
              <ModalBodyText key={i}>{para}</ModalBodyText>
            ))}

            <ModalDivider />

            <ModalCheckboxRow>
              <input
                type="checkbox"
                id="paypal-accept-terms"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <ModalCheckboxLabel htmlFor="paypal-accept-terms">
                I agree to Moonlight Web Designs&apos;{' '}
                <Link href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </Link>{' '}
                and understand this plan has a 12-month minimum contract.
              </ModalCheckboxLabel>
            </ModalCheckboxRow>

            <ModalActions>
              <PayPalButton
                onClick={handleSubscribe}
                disabled={!accepted}
                aria-disabled={!accepted}
              >
                Subscribe with PayPal
              </PayPalButton>
            </ModalActions>

            <ModalLegalNote>
              Monthly subscription billed through PayPal. PayPal is used as the
              payment method only — your 12-month minimum commitment is governed by our{' '}
              <Link href="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </Link>
              .
            </ModalLegalNote>
          </ModalBox>
        </ModalOverlay>
      )}
    </AnimatePresence>,
    document.body
  );
}
