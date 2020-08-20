import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background:rgba(0, 0, 0, 0.1);
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, span, strong, p {
    font: 1rem Roboto, sans-serif;
  }

  #root {
    max-width: 50rem;
    margin: 0 auto;
    padding: 1.25rem 0.625rem;
  }

  button {
    cursor: pointer;
  }

`;
