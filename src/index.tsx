import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if ((window as any).isCypressRunner) {
  serviceWorker.unregister();
} else {
  serviceWorker.register();
}
