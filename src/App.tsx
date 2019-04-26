import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { ThemeProvider } from './custom/styled-components';
import { client } from './apollo';
import theme from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import QuestionPage from './pages/QuestionPage';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme.day}>
        <>
          <GlobalStyle />
          <QuestionPage />
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}
