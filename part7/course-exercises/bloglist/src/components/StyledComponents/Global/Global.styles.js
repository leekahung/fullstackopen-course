import { createGlobalStyle } from "styled-components";

export const theme = {
  dark: {
    primary: "rgb(80, 80, 80)",
    text: "rgb(240, 240, 240)",
  },
  fontFamily: "Open Sans",
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.dark.primary};
    color: ${(props) => props.theme.dark.text};
    font-family: ${(props) => props.theme.fontFamily};
  }

  a {
    color: ${(props) => props.theme.dark.text};
  }
`;

export default GlobalStyle;
