/* global cy */
/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('it is daytime', () => {
  // hacky solution that sets all daytime windows span the century,
  // so that the current time is definitely in today's sunlight window.
  cy.graphqlUpdate({
    Query: () => ({
      sunlightWindow: (_, args) => ({
        sunriseUtc: '1970-01-01T00:00:00',
        sunsetUtc: '2070-01-01T00:00:00'
      })
    })
  });
});

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
