'use client';

import { CALENDLY_EMBED_URL, CONTACT_EMAIL } from './config';
import {
  EmbedActions,
  EmbedButton,
  EmbedFallback,
  EmbedFallbackText,
  EmbedFallbackTitle,
  EmbedFrame,
  EmbedFrameWrap,
} from './styles';

const isConfigured =
  CALENDLY_EMBED_URL &&
  !CALENDLY_EMBED_URL.includes('your-handle') &&
  !CALENDLY_EMBED_URL.includes('example.com');

const buildEmbedUrl = () => {
  if (!isConfigured) {
    return '';
  }

  try {
    const url = new URL(CALENDLY_EMBED_URL);
    url.searchParams.set('hide_landing_page_details', '1');
    url.searchParams.set('hide_event_type_details', '1');
    return url.toString();
  } catch {
    return CALENDLY_EMBED_URL;
  }
};

const CalendlyEmbed = () => {
  if (!isConfigured) {
    return (
      <EmbedFallback>
        <EmbedFallbackTitle>Calendly placeholder ready</EmbedFallbackTitle>
        <EmbedFallbackText>
          Replace the URL in <code>src/components/UI/ContactSection/config.ts</code> with your
          live Calendly event link and this block will automatically switch to the inline booking
          widget.
        </EmbedFallbackText>
        <EmbedActions>
          <EmbedButton href={`mailto:${CONTACT_EMAIL}`}>Email instead</EmbedButton>
          <EmbedButton href="#pricing">View plans</EmbedButton>
        </EmbedActions>
      </EmbedFallback>
    );
  }

  return (
    <EmbedFrameWrap>
      <EmbedFrame
        title="Book a discovery call"
        src={buildEmbedUrl()}
        loading="lazy"
        allow="camera; microphone; fullscreen"
      />
    </EmbedFrameWrap>
  );
};

export default CalendlyEmbed;
