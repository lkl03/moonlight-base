import { createGlobalStyle, keyframes } from 'styled-components';

const styled = { createGlobalStyle };

const moveBackground = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1000px 1000px;
  }
`;

export const GlobalStyles = styled.createGlobalStyle`
  :root {
    --Background: #121717;
    --white: #fff;
    --light-gray: #dcdcdc;
    --link-color: #17F2A6;
    --green: #17F2A6;
    --emerald: #17F2A6;
    --darkGreen: #45a383;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: var(--green);
    color: var(--Background);
  }

  html {
    max-width: 100vw;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: 'Raleway', sans-serif;
    background-color: var(--Background);
    background-image: url('../svgs/noise.svg');
    background-repeat: repeat;
    background-size: 400px 400px;
    color: var(--white);
    animation: ${moveBackground} 60s ease-in-out infinite alternate;

    &::-webkit-scrollbar {
      width: 0.5rem;
      border-radius: 0.5rem;

      &-thumb {
        background: var(--link-color);
        border-radius: 0.5rem;
      }

      &-track {
        background: var(--Background);
      }
    }
  }

  h1,
  h2,
  h3 {
    font-family: 'Inter', sans-serif;
    font-weight: 900 !important;
  }

  p {
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  section[id],
  div[id] {
    scroll-margin-top: 2rem;
  }

  .parallax {
    overflow: hidden;
    margin: 0;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
  }

  .parallax .scroller {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;
  }

  .scroller span {
    display: block;
    margin-right: 5rem;
  }

  .not_complete {
    opacity: 0;
    pointer-events: none;
  }

  .complete {
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.6s ease 0.1s;
  }

  /* ─── Logo show/hide for theme switching ─── */
  .site-logo--dark {
    display: none;
  }
  [data-theme="light"] .site-logo--white {
    display: none;
  }
  [data-theme="light"] .site-logo--dark {
    display: block;
  }

  /* ─── Light Theme ─── */
  [data-theme="light"] {
    --Background: #eef2ef;
    --white: #121717;
    --light-gray: #354a3b;
    --link-color: #17F2A6;
    --green: #17F2A6;
    --emerald: #17F2A6;
    --darkGreen: #45a383;
  }

  [data-theme="light"] body {
    background-color: var(--Background);
    background-size: auto;
    color: var(--white);
  }

  /* ── Typography: override hardcoded grays from styled-components ── */
  /* Use !important to beat scoped class specificity (#bdbdbd, #c9c9c9, #cfcfcf) */
  [data-theme="light"] p {
    color: #3d5245 !important;
  }
  [data-theme="light"] h1,
  [data-theme="light"] h2,
  [data-theme="light"] h3 {
    color: rgba(18, 23, 23, 0.94);
  }

  /* ── Green banner sections (Featured / FirstCTA / SecondCTA) ──
     These always have a green background — keep text white/light,
     overriding the global p rule above with higher-specificity selectors. */
  [data-theme="light"] #what-we-do p,
  [data-theme="light"] #first-cta p,
  [data-theme="light"] #second-cta p {
    color: rgba(255, 255, 255, 0.88) !important;
  }
  [data-theme="light"] #what-we-do h2,
  [data-theme="light"] #first-cta h2,
  [data-theme="light"] #second-cta h2 {
    color: #ffffff !important;
  }

  /* ── Header ── */
  [data-theme="light"] header[class] {
    border-bottom-color: rgba(0, 0, 0, 0.1);
  }

  /* ── How it works — step cards ── */
  [data-theme="light"] #how-it-works article {
    background: rgba(0, 0, 0, 0.03) !important;
    border-color: rgba(0, 0, 0, 0.09) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06) !important;
  }
  [data-theme="light"] #how-it-works article:hover {
    border-color: rgba(10, 170, 106, 0.28) !important;
    box-shadow: 0 28px 54px rgba(0, 0, 0, 0.1) !important;
  }
  [data-theme="light"] #how-it-works article div p {
    color: #3d5245 !important;
  }

  /* ── Portfolio: card borders + pill labels ── */
  [data-theme="light"] #portfolio a > div {
    border-color: rgba(0, 0, 0, 0.09) !important;
    background: rgba(0, 0, 0, 0.04) !important;
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.08) !important;
  }
  /* Portfolio card title always white — sits on dark overlay, never on light bg */
  [data-theme="light"] #portfolio h3 {
    color: #ffffff !important;
  }

  /* ── Services: icon circles green, icons white ── */
  [data-theme="light"] #services {
    color: var(--white);
    --icon-circle-bg: var(--green);
    --icon-img-filter: brightness(0) invert(1);
  }

  /* ── FAQ: accordion dividers + chevron ── */
  /* AccordionItems: #faq > Inner(div) > Accordion(div) > AccordionItem(div) */
  [data-theme="light"] #faq > div > div > div {
    border-color: rgba(0, 0, 0, 0.12) !important;
  }
  [data-theme="light"] #faq button[aria-expanded] {
    color: var(--white) !important;
  }
  /* Chevron SVG is white — invert to dark */
  [data-theme="light"] #faq img[alt=""] {
    filter: invert(1);
  }
  [data-theme="light"] #faq div[id^="faq-answer"] {
    color: #3d5245 !important;
  }

  /* ── Pricing: card appearance overrides ── */
  /* Solid/Standard card — bright green bg, white text for contrast */
  [data-theme="light"] [data-appearance="solid"] {
    background: var(--darkGreen) !important;
  }
  [data-theme="light"] [data-appearance="solid"] .title,
  [data-theme="light"] [data-appearance="solid"] .note {
    color: rgba(18, 23, 23, 0.85) !important;
  }
  [data-theme="light"] [data-appearance="solid"] .price {
    color: #ffffff !important;
  }
  [data-theme="light"] [data-appearance="solid"] .desc {
    color: rgba(255, 255, 255, 0.85) !important;
  }
  [data-theme="light"] [data-appearance="solid"] li {
    color: #ffffff !important;
  }
  /* Outline/Advance card — dark bg (--white=#121717), fix desc + list legibility */
  [data-theme="light"] [data-appearance="outline"] .title,
  [data-theme="light"] [data-appearance="outline"] .note {
    color: rgba(238, 242, 239, 0.9) !important;
  }
  [data-theme="light"] [data-appearance="outline"] .desc {
    color: rgba(238, 242, 239, 0.82) !important;
  }
  [data-theme="light"] [data-appearance="outline"] li {
    color: rgba(238, 242, 239, 0.88) !important;
  }
  /* Outline/Advance card button — white-to-green on dark card */
  [data-theme="light"] [data-appearance="outline"] a {
    border-color: rgba(255, 255, 255, 0.75) !important;
    border-left-color: rgba(255, 255, 255, 0.75) !important;
    color: rgba(255, 255, 255, 0.88) !important;
    background-image: linear-gradient(var(--green), var(--green)) !important;
  }
  [data-theme="light"] [data-appearance="outline"] a:hover {
    background-size: 100% 100% !important;
    border-color: var(--green) !important;
    border-left-color: var(--green) !important;
    color: #ffffff !important;
  }

  /* ── Contact — AccentLine + support links + scheduler card ── */
  /* AccentLine "(it probably is)" — was rgba(255,255,255,0.6), invisible on light bg */
  [data-theme="light"] #contact h2 span {
    color: rgba(18, 23, 23, 0.55) !important;
  }
  /* SupportLinks below stickers — was rgba(255,255,255,0.82), invisible on light bg */
  [data-theme="light"] #contact > div > div > div:first-child a {
    color: rgba(18, 23, 23, 0.7) !important;
  }
  [data-theme="light"] #contact > div > div > div:first-child a:hover {
    color: var(--green) !important;
  }
  [data-theme="light"] #contact > div > div > div:last-child > div {
    background: rgba(0, 0, 0, 0.03) !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
  }

  /* ── Footer ── */
  [data-theme="light"] footer > div {
    border-top-color: rgba(0, 0, 0, 0.1) !important;
  }
  [data-theme="light"] footer p {
    color: rgba(0, 0, 0, 0.72) !important;
  }
  [data-theme="light"] footer span {
    color: rgba(0, 0, 0, 0.6);
  }
  [data-theme="light"] footer h3 {
    color: rgba(18, 23, 23, 0.94);
  }
  [data-theme="light"] footer a:not([aria-label]) {
    color: rgba(0, 0, 0, 0.72);
  }
  [data-theme="light"] footer a:not([aria-label]):hover {
    color: var(--green);
  }
  [data-theme="light"] footer a[href*="eterlab"] {
    color: var(--green);
  }

  /* ── Internal Nav (legal pages) — same dark capsule treatment as home FloatingNav ── */
  [data-theme="light"] nav[aria-label="Page navigation"] {
    background: rgba(18, 23, 23, 0.94) !important;
    border-color: rgba(255, 255, 255, 0.07) !important;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.05) inset,
      0 18px 42px rgba(0, 0, 0, 0.32) !important;
  }
  [data-theme="light"] nav[aria-label="Page navigation"] button {
    color: rgba(255, 255, 255, 0.88) !important;
    background: rgba(248, 248, 246, 0.12) !important;
  }
  [data-theme="light"] nav[aria-label="Page navigation"] > button {
    background: rgba(248, 248, 246, 0.95) !important;
    color: #121717 !important;
  }
  [data-theme="light"] nav[aria-label="Page navigation"] > button svg {
    color: #121717 !important;
  }
  [data-theme="light"] nav[aria-label="Page navigation"] a {
    background: rgba(248, 248, 246, 0.95) !important;
    color: #121717 !important;
  }

  /* ── Floating Nav — dark capsule in light mode ── */
  [data-theme="light"] nav[aria-label="Section navigation"] {
    background: rgba(18, 23, 23, 0.94) !important;
    border-color: rgba(255, 255, 255, 0.07) !important;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.05) inset,
      0 18px 42px rgba(0, 0, 0, 0.32) !important;
  }
  [data-theme="light"] nav[aria-label="Section navigation"] button {
    color: rgba(255, 255, 255, 0.88);
  }
  [data-theme="light"] nav[aria-label="Section navigation"] > button {
    background: rgba(248, 248, 246, 0.95) !important;
    color: #121717 !important;
  }
  [data-theme="light"] nav[aria-label="Section navigation"] > button svg {
    color: #121717 !important;
  }
  [data-theme="light"] #floating-nav-mobile-menu {
    background: rgba(18, 23, 23, 0.97) !important;
    border-color: rgba(255, 255, 255, 0.07) !important;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 12px 28px rgba(0, 0, 0, 0.32) !important;
  }
  /* FloatingNav nav link hover — visible on dark capsule */
  [data-theme="light"] nav[aria-label="Section navigation"] button:not([aria-label]):hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  /* ── Scrollbar ── */
  [data-theme="light"] body::-webkit-scrollbar-track {
    background: #d8e3dc;
  }
`;

