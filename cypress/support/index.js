/* global Cypress */
import './commands';

require('cypress-plugin-tab');

Cypress.on('window:before:load', window => {
  window.fetch = null;
  window.isCypressRunner = true;
});
