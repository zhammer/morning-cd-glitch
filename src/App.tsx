import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
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
import AboutToggle, { useAboutPageOpen } from './components/AboutToggle';
import AboutPage from './pages/AboutPage';
import DisplayGuard from './components/DisplayGuard';

function App() {
  useSundial();
  const [timeOfDay] = useGnomon();
  const [showLoadingPageDelayDone, setShowLoadingPageDelayDone] = useState(false);
  const [aboutPageOpen] = useAboutPageOpen();
  useEffect(() => {
    if (!showLoadingPageDelayDone) {
      const timeout = setTimeout(() => {
        setShowLoadingPageDelayDone(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [showLoadingPageDelayDone]);
  return (
    <ThemeProvider
      theme={['afterSunset', 'beforeSunrise'].includes(timeOfDay) ? theme.night : theme.day}
    >
      <div data-time-of-day={timeOfDay}>
        <GlobalStyle />
        {timeOfDay === 'calibrating' ? (
          showLoadingPageDelayDone && <LoadingCDsPage />
        ) : (
          <>
            {aboutPageOpen && <AboutPage />}
            <DisplayGuard display={!aboutPageOpen}>
              <Router>
                <Switch>
                  <Route exact path='/question' component={QuestionPage} />
                  <Route exact path='/submit' component={SubmitPage} />
                  <Route exact path='/listens' component={ListensPage} />
                  <Redirect from='/' to='/question' />
                </Switch>
              </Router>
            </DisplayGuard>
            <AboutToggle />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default function AppWithApollo() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
