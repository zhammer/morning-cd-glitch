import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';

if (window.origin.endsWith('morningcd.com')) {
  Sentry.init({
    dsn: 'https://059716a475b64c9181a008f4afb335c8@sentry.io/1463806'
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

if ((window as any).isCypressRunner) {
  serviceWorker.unregister();
} else {
  serviceWorker.register();
}
