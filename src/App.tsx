import React, { useState, useEffect } from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { ThemeProvider } from './custom/styled-components';
import { client } from './apollo';
import theme from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import QuestionPage from './pages/QuestionPage';
import SubmitPage from './pages/SubmitPage';
import ListensPage from './pages/ListensPage';
import useSundial, { useGnomon } from './hooks/useSundial';
import LoadingCDsPage from './pages/LoadingCDsPage';

function App() {
  useSundial();
  const [timeOfDay] = useGnomon();
  const [startThrottleDone, setStartThrottleDone] = useState(false);
  useEffect(() => {
    if (!startThrottleDone) {
      const timeout = setTimeout(() => {
        setStartThrottleDone(true);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [startThrottleDone]);
  return (
    <div data-time-of-day={timeOfDay}>
      <GlobalStyle />
      {timeOfDay === 'calibrating' ? (
        startThrottleDone && <LoadingCDsPage />
      ) : (
        <Router>
          <Switch>
            <Route exact path='/question' component={QuestionPage} />
            <Route exact path='/submit' component={SubmitPage} />
            <Route exact path='/listens' component={ListensPage} />
            <Redirect from='/' to='/question' />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default function AppWithProviders() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme.day}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  );
}
