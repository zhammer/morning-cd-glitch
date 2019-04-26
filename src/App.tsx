import React from 'react';
import { ThemeProvider } from './custom/styled-components';
import theme from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import QuestionPage from './pages/QuestionPage';

export default function App() {
  return (
    <ThemeProvider theme={theme.day}>
      <>
        <GlobalStyle />
        <QuestionPage />
      </>
    </ThemeProvider>
  );
}
