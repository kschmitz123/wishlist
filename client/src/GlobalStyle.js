import { createGlobalStyle } from "styled-components";
import ChristmasBackground from "./assets/background_christmas.jpeg";
import BirthdayBackground from "./assets/background_birthday.jpg";

export const theme = {
  background: {
    standard: `linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)`,
    christmas: `url(${ChristmasBackground}) no-repeat center center fixed`,
    birthday: `url(${BirthdayBackground}) no-repeat center center fixed`,
  },
};

const GlobalStyle = createGlobalStyle`
  *,*::after,*::before {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Dancing Script', cursive;
      -webkit-font-smoothing: antialiased; 
      -moz-osx-font-smoothing: grayscale; 
      font-size: 16px;
      color: black;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1 {
    color: white;
  }
`;

export default GlobalStyle;
