/* global Cypress */
import './commands';

require('cypress-plugin-tab');

Cypress.on('window:before:load', window => {
  window.fetch = null;
});

beforeEach(async () => {
  if (window.navigator && navigator.serviceWorker) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
  }
});
