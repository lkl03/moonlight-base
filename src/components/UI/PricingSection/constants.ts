export const desktopHeaderPhrase = ['Simple & Transparent Pricing'];
export const desktopParagraphPhrase = [
  'Choose a plan that fits your needs without any hidden fees or surprises.',
  'Pay the same amount every month and scale your website with confidence.',
];

export const mobileHeaderPhrase = ['Simple & Transparent Pricing'];
export const mobileParagraphPhrase = [
  'Choose a plan that fits your needs without any hidden fees or surprises.',
  'Pay the same amount every month and scale your website with confidence.',
];

export type PlanAppearance = 'solid' | 'outline';

export interface PlanInfo {
  title: string;
  price: string;
  priceMonthly: string;
  description: string;
  contractNote: string;
  features: readonly string[];
  appearance: PlanAppearance;
  paypalPlanId: string;
  ctaText: string;
  confirmationBody: string;
}

export const PAYPAL_SUBSCRIPTION_BASE_URL =
  'https://www.paypal.com/webapps/billing/plans/subscribe';

export const cardsInfo: PlanInfo[] = [
  {
    title: 'Standard',
    price: '$199',
    priceMonthly: '$199/month',
    description:
      'Built for landing pages and smaller brochure websites that need a polished online presence.',
    contractNote: 'Per Month (12 Month Minimum Contract)',
    features: [
      'Up to 3 pages',
      'Best for landings & brochure sites',
      'Custom design + mobile responsive',
      'Contact form + basic SEO setup',
      'Hosting & maintenance included',
      'Unlimited edits & support',
    ],
    appearance: 'solid',
    paypalPlanId:
      process.env.NEXT_PUBLIC_PAYPAL_STANDARD_PLAN_ID ?? 'P-13965659MR530714MNIFH6ZQ',
    ctaText: 'Start Standard Plan — $199/mo',
    confirmationBody:
      "This plan is billed monthly through PayPal and has a 12-month minimum contract. PayPal is used as the recurring payment method, but your minimum commitment is governed by Moonlight Web Designs' Terms of Service.\n\nIf you cancel, pause, block, or otherwise disable your PayPal subscription before the end of the minimum term, you may remain responsible for the remaining unpaid months under the 12-month minimum commitment.",
  },
  {
    title: 'Advanced',
    price: '$349',
    priceMonthly: '$349/month',
    description:
      'Designed for more complex websites that need extra pages, structure, and custom functionality.',
    contractNote: 'Per Month (12 Month Minimum Contract)',
    features: [
      'Up to 10 pages',
      'Ideal for larger business websites',
      'Everything in Standard included',
      'Blog, portfolio, or CMS-ready sections',
      'Advanced forms & third-party integrations',
      'Priority support with scalable structure',
    ],
    appearance: 'outline',
    paypalPlanId:
      process.env.NEXT_PUBLIC_PAYPAL_ADVANCED_PLAN_ID ?? 'P-1W79682320254352RNIFH7JY',
    ctaText: 'Start Advanced Plan — $349/mo',
    confirmationBody:
      "This plan is billed monthly through PayPal and has a 12-month minimum contract. PayPal is used as the recurring payment method, but your minimum commitment is governed by Moonlight Web Designs' Terms of Service.\n\nIf you cancel, pause, block, or otherwise disable your PayPal subscription before the end of the minimum term, you may remain responsible for the remaining unpaid months under the 12-month minimum commitment.",
  },
];

export const planStyles: Record<PlanAppearance, React.CSSProperties> = {
  solid: {
    ['--card-bg' as any]: 'var(--darkGreen)',
    ['--card-fg' as any]: 'var(--white)',
    ['--card-border' as any]: 'none',
    ['--tick' as any]: 'var(--white)',
    ['--divider-opacity' as any]: 0.18,
    ['--btn-bg' as any]: 'var(--white)',
    ['--btn-fg' as any]: 'var(--darkGreen)',
    ['--btn-border' as any]: 'var(--white)',
    ['--price-color' as any]: 'var(--white)',
  },
  outline: {
    ['--card-bg' as any]: 'var(--white)',
    ['--card-fg' as any]: 'var(--Background)',
    ['--card-border' as any]: '1px solid var(--light-gray)',
    ['--tick' as any]: 'var(--green)',
    ['--divider-opacity' as any]: 0.2,
    ['--btn-bg' as any]: 'transparent',
    ['--btn-fg' as any]: 'var(--green)',
    ['--btn-border' as any]: '2px solid var(--green)',
    ['--price-color' as any]: 'var(--green)',
  },
};
