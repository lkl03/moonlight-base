import portfolio_cover_agency from '../../../../public/svgs/portfolio-cover-agency.svg';
import portfolio_cover_commerce from '../../../../public/svgs/portfolio-cover-commerce.svg';
import portfolio_cover_growth from '../../../../public/svgs/portfolio-cover-growth.svg';
import portfolio_cover_studio from '../../../../public/svgs/portfolio-cover-studio.svg';
import portfolio_cover_wellness from '../../../../public/svgs/portfolio-cover-wellness.svg';

export const desktopHeaderPhrase = ['Showcasing Results'];
export const desktopParagraphPhrase = [
  'Behind every project is a happy client and a success story. Explore our work to see',
  'how we have brought visions like yours to life, turning your ideas into reality.',
];

export const mobileHeaderPhrase = ['Showcasing Results'];
export const mobileParagraphPhrase = [
  'Behind every project is a happy client and a success story. Explore our work to see',
  'how we have brought visions like yours to life, turning your ideas into reality.',
];

export const portfolioItems = [
  {
    title: 'Framer',
    tag: 'Agency',
    href: 'https://www.framer.com',
    cover: portfolio_cover_studio,
  },
  {
    title: 'Linear',
    tag: 'SaaS',
    href: 'https://linear.app',
    cover: portfolio_cover_growth,
  },
  {
    title: 'Notion',
    tag: 'Wellness',
    href: 'https://www.notion.so',
    cover: portfolio_cover_wellness,
  },
  {
    title: 'Vercel',
    tag: 'Studio',
    href: 'https://vercel.com',
    cover: portfolio_cover_agency,
  },
  {
    title: 'Shopify',
    tag: 'Commerce',
    href: 'https://www.shopify.com',
    cover: portfolio_cover_commerce,
  },
] as const;
