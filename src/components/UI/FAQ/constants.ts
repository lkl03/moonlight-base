type FAQItem = {
  question: string;
  answer: string;
};

export const desktopHeaderPhrase = ['Frequently Asked Questions'];
export const mobileHeaderPhrase = ['Frequently Asked Questions'];

export const animate = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  open: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1, delay: 0.08 * i, ease: [0.33, 1, 0.68, 1] },
  }),
};

export const faqData: FAQItem[] = [
  {
    question: 'What’s included in the monthly website subscription?',
    answer:
      'Each plan includes custom design, development, hosting, ongoing support, and website updates. The exact scope depends on the plan you choose, but the goal is to give you a polished site without a large upfront payment.',
  },
  {
    question: 'How long does it take to launch my website?',
    answer:
      'In most cases, the process takes no more than 1 week to get your website ready. Timelines can move even faster for simpler landing pages, as long as content and feedback are shared on time.',
  },
  {
    question: 'Do I own the website once it’s finished?',
    answer:
      'Yes, the website is for your business as long as the agreement is respected. If the contract is ended before the 12-month term, we simply stop providing support and we do not hand over the design and development files at that stage. Once the 12 months are completed, if you decide not to continue with us, we deliver everything as agreed.',
  },
  {
    question: 'Can you redesign my current website instead of starting from scratch?',
    answer:
      'Absolutely. We can refresh your current site or rebuild it with a stronger layout, better visuals, improved responsiveness, and a cleaner structure while keeping the best parts of your existing brand.',
  },
  {
    question: 'What if I need more pages, features, or integrations later on?',
    answer:
      'That’s exactly what the Advance plan and custom scope options are for. As your business grows, we can add extra pages, custom sections, booking flows, advanced forms, or third-party integrations without forcing you into a one-size-fits-all setup.',
  },
];
