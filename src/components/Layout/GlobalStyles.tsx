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
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: 'Raleway', sans-serif;
    background-color: var(--Background);
    background-image: url("../svgs/noise.svg");
    background-repeat: repeat;
    background-size: 400px 400px;
    color: var(--white);
    scroll-snap-type: y mandatory;
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

  h1, h2, h3 {
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
    display: none;
  }

  .complete {
  }
`;
