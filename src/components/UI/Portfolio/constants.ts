import dvlegalesCover from '../../../../public/images/work/dvlegales-cover.jpg';
import bioproteceCover from '../../../../public/images/work/bioprotece3d-cover.jpg';
import prompteaCover from '../../../../public/images/work/promptea-cover.jpg';

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
    title: 'DV Legales',
    tag: 'Law Firm',
    href: 'https://dvlegales.com.ar',
    cover: dvlegalesCover,
  },
  {
    title: 'Bioprotece3D',
    tag: 'Healthcare',
    href: 'https://bioprotece3d.com',
    cover: bioproteceCover,
  },
  {
    title: 'promptea.me',
    tag: 'SaaS',
    href: 'https://promptea.me',
    cover: prompteaCover,
  },
] as const;
