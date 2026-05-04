// For desktop
export const desktopHeaderPhrase = ['Simple & Transparent Pricing'];
export const desktopParagraphPhrase = [
  'Choose a plan that fits your needs without any hidden fees or surprises.',
  'Pay the same amount every month and scale your website with confidence.',
];

// For mobile
export const mobileHeaderPhrase = ['Simple & Transparent Pricing'];
export const mobileParagraphPhrase = [
  'Choose a plan that fits your needs without any hidden fees or surprises.',
  'Pay the same amount every month and scale your website with confidence.',
];

export const cardsInfo = [
  {
    title: 'Standard',
    price: '$199',
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
  },
  {
    title: 'Advance',
    price: '$349',
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
    ['--price-color' as any]: 'var(--green)',
  },
};
