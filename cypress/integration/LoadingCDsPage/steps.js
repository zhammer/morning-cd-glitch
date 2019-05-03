/* global cy Cypress*/
/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
});

Given('the internet is slow', () => {
  cy.graphql({
    schema: Cypress.env('GRAPHQL_SCHEMA'),
    endpoint: '/graphql',
    mocks: {
      Date: () => '2018-06-12',
      DateTime: () => '2018-06-11T09:24:32.004423'
    },
    delay: 1e10
  });
});

When('some time passes *', () => {});

Then(`the progress bar has the value {int}`, value => {
  cy.get('progress[data-test=progress-bar]').should('have.attr', 'value', `${value}`);
});

Then('the progress bar is blinking', () => {
  cy.get('progress[data-test=progress-bar]').should(`have.css`, 'animation');
});
