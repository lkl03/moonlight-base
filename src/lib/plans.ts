export type PlanKey = 'standard' | 'advanced';

export interface PlanConfig {
  key: PlanKey;
  name: string;
  price: number;
  currency: string;
  paypalPlanId: string;
  minimumCommitmentMonths: number;
}

// Prices are authoritative here — never trust client-submitted prices.
// Plan IDs come from env vars (safe to use server-side even with NEXT_PUBLIC_ prefix).
const PLANS: Record<PlanKey, PlanConfig> = {
  standard: {
    key: 'standard',
    name: 'Standard Website Plan',
    price: 199,
    currency: 'USD',
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_STANDARD_PLAN_ID ?? '',
    minimumCommitmentMonths: 12,
  },
  advanced: {
    key: 'advanced',
    name: 'Advanced Website Plan',
    price: 349,
    currency: 'USD',
    paypalPlanId: process.env.NEXT_PUBLIC_PAYPAL_ADVANCED_PLAN_ID ?? '',
    minimumCommitmentMonths: 12,
  },
};

export function getPlan(key: PlanKey): PlanConfig {
  return PLANS[key];
}

export function isPlanKey(value: unknown): value is PlanKey {
  return value === 'standard' || value === 'advanced';
}
