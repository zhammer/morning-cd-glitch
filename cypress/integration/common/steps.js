/* global cy */
/// <reference types="cypress" />

import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When(`I visit {string}`, path => {
  cy.visit(path);
});

When(`I type {string}`, text => {
  cy.focused().type(text);
});

When('I hit tab', () => {
  cy.focused().tab();
});

When('I type enter to submit', () => {
  cy.get('form').submit();
});

Then(`I am redirected to {string} with the params {string}`, (route, params) => {
  cy.location('pathname').should('eq', route);
  cy.location('search').should('eq', params);
});

Then(`I am redirected to {string}`, route => {
  cy.location('pathname').should('eq', route);
});
