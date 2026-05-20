// These interfaces describe the Firestore document shapes used across the app.
// Client-side code uses Timestamp from 'firebase/firestore';
// server-side (Admin SDK) code uses admin.firestore.Timestamp — same wire format.

import { Timestamp } from 'firebase/firestore';

export interface CheckoutSession {
  id: string;
  planName: string;
  paypalPlanId: string;
  planPrice: number;
  currency: string;
  clientName: string;
  clientEmail: string;
  acceptedTerms: boolean;
  acceptedTermsAt: Timestamp | null;
  acceptedMinimumCommitment: boolean;
  acceptedMinimumCommitmentAt: Timestamp | null;
  minimumCommitmentMonths: number;
  // pending → paypal_approved → active | cancelled
  status: 'pending' | 'paypal_approved' | 'active' | 'cancelled' | 'expired';
  paypalSubscriptionId: string | null;
  // Set by PATCH /api/checkout/session (onApprove)
  approvedAt?: Timestamp;
  // Set by webhook BILLING.SUBSCRIPTION.ACTIVATED
  activatedAt?: Timestamp;
  minimumCommitmentEndAt?: Timestamp;
  welcomeEmailSentAt?: Timestamp;
  internalNotificationSentAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: 'client' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Customer {
  id: string;
  userId: string;
  email: string;
  name: string;
  paypalPayerId: string | null;
  paypalEmail: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Subscription {
  id: string;
  userId: string | null;
  customerId: string | null;
  paypalSubscriptionId: string;
  paypalPlanId: string | null;
  planName: string;
  monthlyPrice: number;
  currency: string;
  status: 'active' | 'cancelled' | 'expired' | 'suspended';
  startedAt: Timestamp;
  minimumCommitmentMonths: number;
  minimumCommitmentEndAt: Timestamp;
  acceptedTermsAt: Timestamp | null;
  acceptedMinimumCommitmentAt: Timestamp | null;
  lastPaymentAt: Timestamp | null;
  lastPaymentAmount: string | null;
  lastPaymentCurrency: string | null;
  lastPaymentStatus: string | null;
  cancelledAt: Timestamp | null;
  earlyCancelledWithRemainingCommitment: boolean;
  // Back-reference to the checkout_session that originated this subscription
  checkoutSessionId: string | null;
  // Idempotency guards — set after emails are sent
  welcomeEmailSentAt: Timestamp | null;
  internalNotificationSentAt: Timestamp | null;
  // Onboarding tracking
  onboardingStatus?: 'not_started' | 'submitted' | 'reviewed';
  onboardingSubmittedAt?: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PayPalEvent {
  id: string;
  paypalEventId: string;
  eventType: string;
  paypalSubscriptionId: string | null;
  paypalPlanId: string | null;
  payload: Record<string, unknown>;
  receivedAt: Timestamp;
}

export interface OnboardingSubmission {
  id: string;
  // Auth / linking
  clientEmail: string;
  clientName: string;
  subscriptionId: string | null;
  customerId: string | null;
  // Business basics
  businessName: string;
  businessIndustry: string;
  businessDescription: string;
  primaryGoal: string;
  targetAudience: string;
  // Website scope
  desiredPages: string[];
  hasExistingWebsite: boolean;
  existingWebsiteUrl: string;
  // Branding / design
  brandColors: string;
  brandFonts: string;
  designNotes: string;
  // Content
  providingOwnContent: boolean;
  contentNotes: string;
  inspirationUrls: string;
  // Integrations / launch
  desiredFeatures: string[];
  launchTimeline: string;
  additionalNotes: string;
  // Status
  status: 'submitted' | 'reviewed';
  reviewedAt: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const COLLECTIONS = {
  CHECKOUT_SESSIONS: 'checkout_sessions',
  USERS: 'users',
  CUSTOMERS: 'customers',
  SUBSCRIPTIONS: 'subscriptions',
  PAYPAL_EVENTS: 'paypal_events',
  ONBOARDING_SUBMISSIONS: 'onboarding_submissions',
} as const;
