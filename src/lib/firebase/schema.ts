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
  status: 'pending' | 'active' | 'cancelled' | 'expired';
  paypalSubscriptionId: string | null;
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
  userId: string;
  customerId: string;
  paypalSubscriptionId: string;
  paypalPlanId: string;
  planName: string;
  monthlyPrice: number;
  currency: string;
  status: 'active' | 'cancelled' | 'expired' | 'suspended';
  startedAt: Timestamp;
  minimumCommitmentMonths: number;
  minimumCommitmentEndAt: Timestamp;
  acceptedTermsAt: Timestamp;
  acceptedMinimumCommitmentAt: Timestamp;
  lastPaymentAt: Timestamp | null;
  cancelledAt: Timestamp | null;
  earlyCancelledWithRemainingCommitment: boolean;
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

export const COLLECTIONS = {
  CHECKOUT_SESSIONS: 'checkout_sessions',
  USERS: 'users',
  CUSTOMERS: 'customers',
  SUBSCRIPTIONS: 'subscriptions',
  PAYPAL_EVENTS: 'paypal_events',
} as const;
