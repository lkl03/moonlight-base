'use client';

import Image from 'next/image';
import browserSticker from '../../../../public/svgs/contact-sticker-browser.svg';
import chatSticker from '../../../../public/svgs/contact-sticker-chat.svg';
import cursorSticker from '../../../../public/svgs/contact-sticker-cursor.svg';
import rocketSticker from '../../../../public/svgs/contact-sticker-rocket.svg';
import sparkSticker from '../../../../public/svgs/contact-sticker-spark.svg';
import CalendlyEmbed from './CalendlyEmbed';
import { CALENDLY_EMBED_URL, CONTACT_EMAIL } from './config';
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
    src: browserSticker,
    alt: 'Browser window sticker',
    $size: 'large' as const,
    $rotate: '-6deg',
    $translate: '0, 18px',
  },
  {
    src: rocketSticker,
    alt: 'Rocket sticker',
    $size: 'medium' as const,
    $rotate: '4deg',
    $translate: '-18px, 0',
  },
  {
    src: chatSticker,
    alt: 'Chat bubble sticker',
    $size: 'small' as const,
    $rotate: '-2deg',
    $translate: '-30px, 28px',
  },
  {
    src: cursorSticker,
    alt: 'Cursor sticker',
    $size: 'medium' as const,
    $rotate: '5deg',
    $translate: '-42px, 10px',
  },
  {
    src: sparkSticker,
    alt: 'Spark sticker',
    $size: 'small' as const,
    $rotate: '8deg',
    $translate: '-54px, 34px',
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
                Book a free 30-minute intro call. We'll talk through your goals, page count,
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
              <SupportLink href={calendlyCtaHref} target="_blank" rel="noreferrer noopener">
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
                30-minute intro call — no commitment needed. Just pick a slot and we'll take it
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
