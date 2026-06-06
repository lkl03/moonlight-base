'use client';

import Image from 'next/image';
import stickerIntroCall from '../../../../public/svgs/contact-intro-call.svg';
import stickerCalendly from '../../../../public/svgs/contact-book-calendly.svg';
import stickerEmail from '../../../../public/svgs/contact-email-us.svg';
import stickerPlans from '../../../../public/svgs/contact-view-plans.svg';
import CalendlyEmbed from './CalendlyEmbed';
import { CALENDLY_EMBED_URL, CONTACT_EMAIL } from './config';
import { trackBookCallConversion } from '@/lib/google-ads';
import {
  AccentLine,
  ContentColumn,
  Eyebrow,
  Grid,
  Heading,
  Inner,
  Lead,
  ScheduleColumn,
  SchedulerCard,
  StickerCard,
  StickerCluster,
  StickerContent,
  SupportItem,
  SupportLink,
  SupportRow,
  WidgetEyebrow,
  WidgetHeader,
  WidgetSubcopy,
  Wrapper,
} from './styles';

const calendlyCtaHref = CALENDLY_EMBED_URL.includes('your-handle')
  ? `mailto:${CONTACT_EMAIL}`
  : CALENDLY_EMBED_URL;

const stickers = [
  {
    src: stickerIntroCall,
    alt: 'Intro call',
    $size: 'large' as const,
    $rotate: '-5deg',
    $translate: '0, 14px',
  },
  {
    src: stickerCalendly,
    alt: 'Book on Calendly',
    $size: 'medium' as const,
    $rotate: '4deg',
    $translate: '-16px, 0',
  },
  {
    src: stickerEmail,
    alt: 'Email us',
    $size: 'small' as const,
    $rotate: '-3deg',
    $translate: '-28px, 24px',
  },
  {
    src: stickerPlans,
    alt: 'View plans',
    $size: 'medium' as const,
    $rotate: '6deg',
    $translate: '-40px, 8px',
  },
];

const ContactSection = () => {
  return (
    <Wrapper id="contact">
      <Inner>
        <Grid>
          <ContentColumn>
            <div>
              <Eyebrow>Contact</Eyebrow>
              <Heading>
                See if Moonlight is the right fit for your next website.
                <AccentLine>(it probably is)</AccentLine>
              </Heading>
              <Lead>
                Book a free 30-minute intro call. We&apos;ll talk through your goals, page count,
                and timeline — and figure out together whether a landing page, multi-page site,
                or custom scope is the right move for your business.
              </Lead>
            </div>

            <StickerCluster aria-hidden="true">
              {stickers.map((sticker) => (
                <StickerCard
                  key={sticker.alt}
                  $size={sticker.$size}
                  $rotate={sticker.$rotate}
                  $translate={sticker.$translate}
                >
                  <StickerContent>
                    <Image src={sticker.src} alt="" fill sizes="(max-width: 768px) 30vw, 10rem" />
                  </StickerContent>
                </StickerCard>
              ))}
            </StickerCluster>

            <SupportRow>
              <SupportItem>30-minute intro call</SupportItem>
              <SupportLink href={calendlyCtaHref} target="_blank" rel="noreferrer noopener" onClick={trackBookCallConversion}>
                Book on Calendly
              </SupportLink>
              <SupportLink href={`mailto:${CONTACT_EMAIL}`}>Email us instead</SupportLink>
              <SupportLink href="#pricing">View plans</SupportLink>
            </SupportRow>
          </ContentColumn>

          <ScheduleColumn>
            <SchedulerCard>
              <WidgetEyebrow>Schedule</WidgetEyebrow>
              <WidgetHeader>Pick a time that works for you.</WidgetHeader>
              <WidgetSubcopy>
                30-minute intro call — no commitment needed. Just pick a slot and we&apos;ll take it
                from there.
              </WidgetSubcopy>
              <CalendlyEmbed />
            </SchedulerCard>
          </ScheduleColumn>
        </Grid>
      </Inner>
    </Wrapper>
  );
};

export default ContactSection;
