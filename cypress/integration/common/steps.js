/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Then(`I am redirected to {string} with the params {string}`, (route, params) => {
  cy.location('pathname').should('eq', route);
  cy.location('search').should('eq', params);
});

Then(`I am redirected to {string}`, route => {
  cy.location('pathname').should('eq', route);
});
