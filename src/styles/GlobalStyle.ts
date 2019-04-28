import { createGlobalStyle } from '../custom/styled-components';
import { cursorUrl } from './variables';

export const GlobalStyle = createGlobalStyle`
  html {
    cursor: url(${cursorUrl}), auto;
  }

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

  /* from reboot */
  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }
`;
