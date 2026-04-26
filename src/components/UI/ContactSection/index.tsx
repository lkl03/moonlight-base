'use client';

import Image from 'next/image';
import stickerDiscovery from '../../../../public/svgs/process-discovery.svg';
import stickerBuild from '../../../../public/svgs/process-build.svg';
import stickerLaunch from '../../../../public/svgs/process-launch.svg';
import stickerPerk1 from '../../../../public/svgs/ic_perk_1.svg';
import stickerPerk2 from '../../../../public/svgs/ic_perk_2.svg';
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
    src: stickerDiscovery,
    alt: 'Discovery phase illustration',
    $size: 'large' as const,
    $rotate: '-5deg',
    $translate: '0, 14px',
  },
  {
    src: stickerBuild,
    alt: 'Build phase illustration',
    $size: 'medium' as const,
    $rotate: '4deg',
    $translate: '-16px, 0',
  },
  {
    src: stickerLaunch,
    alt: 'Launch phase illustration',
    $size: 'small' as const,
    $rotate: '-3deg',
    $translate: '-28px, 24px',
  },
  {
    src: stickerPerk1,
    alt: 'Support icon',
    $size: 'medium' as const,
    $rotate: '6deg',
    $translate: '-40px, 8px',
  },
  {
    src: stickerPerk2,
    alt: 'Revisions icon',
    $size: 'small' as const,
    $rotate: '9deg',
    $translate: '-52px, 30px',
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
