import ic_step_1 from '../../../../public/svgs/ic_step_1.svg';
import ic_step_2 from '../../../../public/svgs/ic_step_2.svg';
import ic_step_3 from '../../../../public/svgs/ic_step_3.svg';

import process_discovery from '../../../../public/svgs/process-discovery.svg';
import process_build from '../../../../public/svgs/process-build.svg';
import process_launch from '../../../../public/svgs/process-launch.svg';

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
    art: process_discovery,
    artAlt: 'Illustration of planning a new website project',
  },
  {
    point: 'Step 2',
    details: 'We will build your website based on your ideas and feedback.',
    icon: ic_step_2,
    art: process_build,
    artAlt: 'Illustration of designing and building a website',
  },
  {
    point: 'Step 3',
    details: 'Launch your new site and showcase your business with pride.',
    icon: ic_step_3,
    art: process_launch,
    artAlt: 'Illustration of launching a new website',
  },
] as const;
