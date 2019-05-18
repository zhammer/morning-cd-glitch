/* global Cypress */
import './commands';

require('cypress-plugin-tab');

Cypress.on('window:before:load', window => {
  window.fetch = null;
});

beforeEach(() => {
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    });
  }
});
