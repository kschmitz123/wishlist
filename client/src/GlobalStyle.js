import { createGlobalStyle } from "styled-components";
import Background from "./assets/background.jpeg";

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
      background: url(${Background}) no-repeat center center fixed;
      background-size: cover;
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
