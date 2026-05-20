'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { PlanKey } from '@/lib/plans';
import { usePayPalScript } from '@/lib/usePayPalScript';
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
  ModalLegalNote,
  ModalInputGroup,
  ModalLabel,
  ModalInput,
  ModalErrorText,
  ContinueButton,
  ModalSecondaryButton,
  PayPalButtonContainer,
  PayPalLoadingText,
} from './modal-styles';

export interface PlanConfirmationData {
  planKey: PlanKey;
  title: string;
  priceMonthly: string;
  confirmationBody: string;
  paypalPlanId: string;
}

interface CheckoutSession {
  checkoutSessionId: string;
  paypalPlanId: string;
}

interface PayPalModalProps {
  plan: PlanConfirmationData | null;
  onClose: () => void;
}

type ModalStep = 'form' | 'paypal';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<ModalStep>('form');

  // Form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  // PayPal step state
  const [checkoutSession, setCheckoutSession] = useState<CheckoutSession | null>(null);
  const [paypalError, setPaypalError] = useState<string | null>(null);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Start loading PayPal SDK as soon as the modal opens to minimise step-2 delay
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const sdkStatus = usePayPalScript(plan ? clientId : undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset all state when modal opens for a new plan
  useEffect(() => {
    setStep('form');
    setClientName('');
    setClientEmail('');
    setAccepted(false);
    setSessionError(null);
    setCheckoutSession(null);
    setPaypalError(null);
  }, [plan?.planKey]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = plan ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [plan]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Render PayPal subscription button once SDK is ready and we're on the paypal step
  useEffect(() => {
    if (step !== 'paypal' || sdkStatus !== 'ready' || !checkoutSession) return;
    if (!paypalContainerRef.current) return;
    if (!window.paypal) return;

    const container = paypalContainerRef.current;
    container.innerHTML = '';

    let active = true;
    const { checkoutSessionId, paypalPlanId } = checkoutSession;

    const buttons = window.paypal.Buttons({
      createSubscription: (_data, actions) => {
        return actions.subscription.create({ plan_id: paypalPlanId });
      },
      onApprove: async (data) => {
        if (!active) return;
        const subscriptionId = data.subscriptionID;

        try {
          await fetch('/api/checkout/session', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ checkoutSessionId, paypalSubscriptionId: subscriptionId }),
          });
        } catch (err) {
          // Log but don't block the redirect — the webhook will reconcile
          console.error('[PayPalModal] Failed to update checkout session:', err);
        }

        const params = new URLSearchParams({ subscription_id: subscriptionId });
        params.set('checkout_session_id', checkoutSessionId);
        window.location.href = `/thank-you?${params.toString()}`;
      },
      onError: () => {
        if (!active) return;
        setPaypalError('Something went wrong with PayPal. Please close the modal and try again.');
      },
      onCancel: () => {
        if (!active) return;
        setPaypalError(null);
      },
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'subscribe',
      },
    });

    if (buttons.isEligible()) {
      buttons.render(container).catch(() => {
        if (active) {
          setPaypalError('Failed to load the PayPal button. Please refresh and try again.');
        }
      });
    } else {
      setPaypalError('PayPal subscriptions are not available. Please contact us directly.');
    }

    return () => {
      active = false;
      container.innerHTML = '';
    };
  }, [step, sdkStatus, checkoutSession]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const canContinue =
    clientName.trim().length > 0 &&
    EMAIL_RE.test(clientEmail.trim()) &&
    accepted &&
    !isCreatingSession;

  const handleContinue = useCallback(async () => {
    if (!plan || !canContinue) return;

    setIsCreatingSession(true);
    setSessionError(null);

    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planKey: plan.planKey,
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim(),
          acceptedTerms: true,
          acceptedMinimumCommitment: true,
        }),
      });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error ?? 'Failed to create checkout session');
      }

      const data = (await res.json()) as { checkoutSessionId: string; paypalPlanId: string };
      setCheckoutSession({ checkoutSessionId: data.checkoutSessionId, paypalPlanId: data.paypalPlanId });
      setStep('paypal');
    } catch (err) {
      setSessionError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsCreatingSession(false);
    }
  }, [plan, canContinue, clientName, clientEmail]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {plan && (
        <ModalOverlay
          ref={overlayRef as React.RefObject<HTMLDivElement>}
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

            <ModalTitle id="paypal-modal-title">{plan.title} Website Plan</ModalTitle>
            <ModalPriceBadge>{plan.priceMonthly} · 12-month minimum</ModalPriceBadge>

            {/* ── Step 1: Confirmation form ────────────────────────────── */}
            {step === 'form' && (
              <>
                <ModalBodyText>
                  You&apos;re subscribing to the <strong>{plan.title} Website Plan</strong> for{' '}
                  <strong>{plan.priceMonthly}</strong>.
                </ModalBodyText>

                {plan.confirmationBody.split('\n\n').map((para, i) => (
                  <ModalBodyText key={i}>{para}</ModalBodyText>
                ))}

                <ModalDivider />

                <ModalInputGroup>
                  <ModalLabel htmlFor="checkout-name">Full name</ModalLabel>
                  <ModalInput
                    id="checkout-name"
                    type="text"
                    placeholder="Jane Smith"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    autoComplete="name"
                    disabled={isCreatingSession}
                  />
                </ModalInputGroup>

                <ModalInputGroup>
                  <ModalLabel htmlFor="checkout-email">Email address</ModalLabel>
                  <ModalInput
                    id="checkout-email"
                    type="email"
                    placeholder="jane@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    autoComplete="email"
                    disabled={isCreatingSession}
                  />
                </ModalInputGroup>

                <ModalCheckboxRow>
                  <input
                    type="checkbox"
                    id="checkout-accept-terms"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    disabled={isCreatingSession}
                  />
                  <ModalCheckboxLabel htmlFor="checkout-accept-terms">
                    I agree to Moonlight Web Designs&apos;{' '}
                    <Link href="/terms" target="_blank" rel="noopener noreferrer">
                      Terms of Service
                    </Link>{' '}
                    and understand this plan has a 12-month minimum contract.
                  </ModalCheckboxLabel>
                </ModalCheckboxRow>

                {sessionError && <ModalErrorText>{sessionError}</ModalErrorText>}

                <ModalActions>
                  <ContinueButton
                    onClick={handleContinue}
                    disabled={!canContinue}
                    aria-disabled={!canContinue}
                  >
                    {isCreatingSession ? 'Setting up…' : 'Continue to PayPal'}
                  </ContinueButton>
                </ModalActions>

                <ModalLegalNote>
                  Monthly subscription billed through PayPal. PayPal is used as the payment method
                  only — your 12-month minimum commitment is governed by our{' '}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </Link>
                  .
                </ModalLegalNote>
              </>
            )}

            {/* ── Step 2: PayPal SDK button ────────────────────────────── */}
            {step === 'paypal' && (
              <>
                <ModalBodyText>
                  Review and complete your subscription below. Your payment is processed
                  securely by PayPal.
                </ModalBodyText>

                <ModalDivider />

                {sdkStatus === 'error' && !clientId && (
                  <ModalErrorText>
                    PayPal is not configured. Please contact{' '}
                    <a href="mailto:contact.eterlab@gmail.com">contact.eterlab@gmail.com</a>{' '}
                    to complete your subscription.
                  </ModalErrorText>
                )}

                {sdkStatus === 'error' && clientId && (
                  <ModalErrorText>
                    Failed to load PayPal. Please refresh the page and try again, or contact us
                    at{' '}
                    <a href="mailto:contact.eterlab@gmail.com">contact.eterlab@gmail.com</a>.
                  </ModalErrorText>
                )}

                {sdkStatus === 'loading' && (
                  <PayPalLoadingText>Loading PayPal…</PayPalLoadingText>
                )}

                <PayPalButtonContainer ref={paypalContainerRef} />

                {paypalError && <ModalErrorText style={{ marginTop: '0.75rem' }}>{paypalError}</ModalErrorText>}

                <ModalActions style={{ marginTop: '1rem' }}>
                  <ModalSecondaryButton
                    onClick={() => {
                      setStep('form');
                      setPaypalError(null);
                    }}
                  >
                    ← Back
                  </ModalSecondaryButton>
                </ModalActions>

                <ModalLegalNote>
                  Completing this step subscribes you to the{' '}
                  <strong>{plan.title} Website Plan</strong> at{' '}
                  <strong>{plan.priceMonthly}</strong> with a 12-month minimum contract.
                  Managing or cancelling your PayPal subscription does not waive the minimum
                  commitment described in our{' '}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </Link>
                  .
                </ModalLegalNote>
              </>
            )}
          </ModalBox>
        </ModalOverlay>
      )}
    </AnimatePresence>,
    document.body
  );
}
