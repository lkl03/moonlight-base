import ic_document_duplicate from '../../../../public/svgs/ic_document_duplicate.svg';
import ic_identification from '../../../../public/svgs/ic_identification.svg';
import ic_lock_closed from '../../../../public/svgs/ic_lock_closed.svg';

import ic_step_1 from '../../../../public/svgs/ic_step_1.svg';
import ic_step_2 from '../../../../public/svgs/ic_step_2.svg';
import ic_step_3 from '../../../../public/svgs/ic_step_3.svg';

import ic_money_send from '../../../../public/svgs/ic_money_send.svg';
import ic_wallet_minus from '../../../../public/svgs/ic_wallet_minus.svg';

// For desktop
export const desktopHeaderPhrase = ["Simple & Transparent Pricing"];
export const desktopParagraphPhrase = [
  "Choose a plan that fits your needs without any hidden fees or surprises.",
  'Pay the same amount every month and watch your business thrive.',
];

// For mobile
export const mobileHeaderPhrase = ["Simple & Transparent Pricing"];
export const mobileParagraphPhrase = [
  "Choose a plan that fits your needs without any hidden fees or surprises.",
  'Pay the same amount every month and watch your business thrive.'
];

export const cardsInfo = [
  {
    title: 'Standard',
    price: '$199',
    description: 'Up to 3 pages.',
    contractNote: 'Per Month (12 Month Minimum Contract)',
    features: [
      'Unlimited Edits',
      'Custom Design',
      '24/7 Customer Service',
      'Lifetime Updates',
      'Hosting Included',
      'SEO Integrations',
    ],
    appearance: 'solid',
  },
  {
    title: 'Advance',
    price: '$349',
    description: 'Up to 10 pages. Same benefits as Standard Plan.',
    contractNote: 'Per Month (12 Month Minimum Contract)',
    features: [
      'Unlimited Edits',
      'Custom Design',
      '24/7 Customer Service',
      'Lifetime Updates',
      'Hosting Included',
      'SEO Integrations',
    ],
    appearance: 'outline',
  },
] as const;

export const planStyles: Record<'solid' | 'outline', React.CSSProperties> = {
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
    ['--price-color' as any]: 'var(--darkGreen)',
  },
};
