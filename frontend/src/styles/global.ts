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
    font: 1vw Roboto, sans-serif;
    @media (max-width: 425px) {
      font-size: 1.8vw;
    }
  }

  #root {
    max-width: 70vw;
    margin: 0 auto;
    padding: 20px 10px;
  }

  button {
    cursor: pointer;
  }



`;
