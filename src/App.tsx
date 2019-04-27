import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
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
          <Router>
            <Switch>
              <Route exact path='/question' component={QuestionPage} />
              <Route exact path='/submit' render={() => <div>Submit Page</div>} />
              <Redirect from='/' to='/question' />
            </Switch>
          </Router>
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}
