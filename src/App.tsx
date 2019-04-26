import React from 'react';
import { ThemeProvider } from './custom/styled-components';
import theme from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';

export default function App() {
  return (
    <ThemeProvider theme={theme.day}>
      <>
        <GlobalStyle />
        <div>Hello Morning CD - Glitch!</div>
      </>
    </ThemeProvider>
  );
}
