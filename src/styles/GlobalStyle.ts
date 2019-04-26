import { createGlobalStyle } from '../custom/styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;

    margin: 0;
    padding: 0;

    font-family: "Press Start 2P", cursive;
    font-size: 16px;

    background-color: ${props => props.theme.background};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
