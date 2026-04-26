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

  /* Muted / secondary text */
  [data-theme="light"] p {
    color: #3d5245;
  }

  /* Header border */
  [data-theme="light"] header[class] {
    border-bottom-color: rgba(0, 0, 0, 0.1);
  }

  /* How it works — step cards */
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
    color: #3d5245;
  }

  /* Portfolio cards */
  [data-theme="light"] #portfolio a > div {
    border-color: rgba(0, 0, 0, 0.09) !important;
    background: rgba(0, 0, 0, 0.04) !important;
    box-shadow: 0 18px 34px rgba(0, 0, 0, 0.08) !important;
  }

  /* Services / offers cards */
  [data-theme="light"] #services {
    color: var(--white);
  }

  /* FAQ */
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

  /* Pricing — outline card fg is var(--Background) which inverts correctly */
  [data-theme="light"] #pricing {
    color: var(--white);
  }

  /* Contact — scheduler card */
  [data-theme="light"] #contact > div > div > div:last-child > div {
    background: rgba(0, 0, 0, 0.03) !important;
    border-color: rgba(0, 0, 0, 0.08) !important;
  }

  /* Floating nav active button text stays dark (already correct) */
  [data-theme="light"] nav button {
    color: var(--Background);
  }

  /* Scrollbar */
  [data-theme="light"] body::-webkit-scrollbar-track {
    background: #d8e3dc;
  }
`;

