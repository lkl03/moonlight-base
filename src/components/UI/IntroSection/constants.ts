import ic_step_1 from '../../../../public/svgs/ic_step_1.svg';
import ic_step_2 from '../../../../public/svgs/ic_step_2.svg';
import ic_step_3 from '../../../../public/svgs/ic_step_3.svg';

import process_step1 from '../../../../public/svgs/process-step-1-choose-plan.svg';
import process_step2 from '../../../../public/svgs/process-step-2-build-feedback.svg';
import process_step3 from '../../../../public/svgs/process-step-3-launch-showcase.svg';

export const desktopHeaderPhrase = ['How It Works'];
export const desktopParagraphPhrase = [
  "We make website creation simple. Share your vision, and we'll bring it to life.",
  'Your satisfaction is our priority.',
];

export const mobileHeaderPhrase = ['How It Works'];
export const mobileParagraphPhrase = [
  "We make website creation simple. Share your vision, and we'll bring it to life.",
  'Your satisfaction is our priority.',
];

export const edges = [
  {
    point: 'Step 1',
    details: 'Choose a plan that fits your needs.',
    icon: ic_step_1,
    art: process_step1,
    artAlt: 'Illustration of planning a new website project',
  },
  {
    point: 'Step 2',
    details: 'We will build your website based on your ideas and feedback.',
    icon: ic_step_2,
    art: process_step2,
    artAlt: 'Illustration of designing and building a website',
  },
  {
    point: 'Step 3',
    details: 'Launch your new site and showcase your business with pride.',
    icon: ic_step_3,
    art: process_step3,
    artAlt: 'Illustration of launching a new website',
  },
] as const;
