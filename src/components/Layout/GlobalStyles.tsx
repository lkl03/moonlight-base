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

  /* ─── Light Theme ─── */
  [data-theme="light"] {
    --Background: #eef2ef;
    --white: #0d1a12;
    --light-gray: #354a3b;
    --link-color: #0aaa6a;
    --green: #0aaa6a;
    --emerald: #0aaa6a;
    --darkGreen: #087a4c;
  }

  [data-theme="light"] body {
    background-color: var(--Background);
    color: var(--white);
  }

  /* ── Logos: invert white PNG to dark ── */
  [data-theme="light"] header img {
    filter: invert(1);
  }
  [data-theme="light"] footer img {
    filter: invert(1);
  }

  /* ── Typography: override hardcoded grays from styled-components ── */
  /* Use !important to beat scoped class specificity (#bdbdbd, #c9c9c9, #cfcfcf) */
  [data-theme="light"] p {
    color: #3d5245 !important;
  }
  [data-theme="light"] h1,
  [data-theme="light"] h2,
  [data-theme="light"] h3 {
    color: #111111;
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

  /* ── Portfolio cards ── */
  [data-theme="light"] #portfolio a > div {
    border-color: rgba(0, 0, 0, 0.09) !important;
    background: rgba(0, 0, 0, 0.04) !important;
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.08) !important;
  }

  /* ── Services ── */
  [data-theme="light"] #services {
    color: var(--white);
  }

  /* ── FAQ ── */
  [data-theme="light"] #faq section > div > div,
  [data-theme="light"] #faq > div > div > div > div {
    border-color: rgba(0, 0, 0, 0.1) !important;
  }
  [data-theme="light"] #faq button[aria-expanded] {
    color: var(--white) !important;
  }
  [data-theme="light"] #faq div[id^="faq-answer"] {
    color: #3d5245 !important;
  }

  /* ── Pricing ── */
  [data-theme="light"] #pricing {
    color: var(--white);
  }

  /* ── Contact — scheduler card ── */
  [data-theme="light"] #contact > div > div > div:last-child > div {
    background: rgba(0, 0, 0, 0.03) !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
  }

  /* ── Footer ── */
  /* Border-top (Inner div, direct child of footer) */
  [data-theme="light"] footer > div {
    border-top-color: rgba(0, 0, 0, 0.1) !important;
  }
  /* Copyright / brand copy paragraphs */
  [data-theme="light"] footer p {
    color: rgba(0, 0, 0, 0.72) !important;
  }
  /* Legal meta items, secondary spans */
  [data-theme="light"] footer span {
    color: rgba(0, 0, 0, 0.6);
  }
  /* Column titles */
  [data-theme="light"] footer h3 {
    color: #111111;
  }
  /* Sitemap & contact links (excludes LogoLink which has aria-label) */
  [data-theme="light"] footer a:not([aria-label]) {
    color: rgba(0, 0, 0, 0.72);
  }
  [data-theme="light"] footer a:not([aria-label]):hover {
    color: var(--green);
  }
  /* eterlab accent link — keep green but slightly muted */
  [data-theme="light"] footer a[href*="eterlab"] {
    color: var(--green);
  }

  /* ── Floating Nav — dark capsule in light mode ──
     Reference: capsule stays dark, links are light/white,
     the circular scroll + theme-toggle controls are light with dark icons. */

  /* Dark capsule */
  [data-theme="light"] nav[aria-label="Section navigation"] {
    background: rgba(18, 23, 23, 0.94) !important;
    border-color: rgba(255, 255, 255, 0.07) !important;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.05) inset,
      0 18px 42px rgba(0, 0, 0, 0.32) !important;
  }

  /* All section nav buttons: white text on dark capsule */
  [data-theme="light"] nav[aria-label="Section navigation"] button {
    color: rgba(255, 255, 255, 0.88);
  }

  /* Circular control buttons (ScrollTopButton + ThemeToggle — direct children):
     light background with dark icons, matching reference image */
  [data-theme="light"] nav[aria-label="Section navigation"] > button {
    background: rgba(248, 248, 246, 0.95) !important;
    color: #121717 !important;
  }
  [data-theme="light"] nav[aria-label="Section navigation"] > button svg {
    color: #121717 !important;
  }

  /* Mobile dropdown menu: dark to match capsule */
  [data-theme="light"] #floating-nav-mobile-menu {
    background: rgba(18, 23, 23, 0.97) !important;
    border-color: rgba(255, 255, 255, 0.07) !important;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.04) inset,
      0 12px 28px rgba(0, 0, 0, 0.32) !important;
  }

  /* ── Scrollbar ── */
  [data-theme="light"] body::-webkit-scrollbar-track {
    background: #d8e3dc;
  }
`;

