/* global cy Cypress*/
/// <reference types="cypress" />
import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Cypress.on('window:before:load', window => {
  window.fetch = null;
});

beforeEach(() => {
  cy.graphql({
    schema: Cypress.env('GRAPHQL_SCHEMA'),
    endpoint: '/graphql',
    mocks: {
      Date: () => '2018-06-12',
      DateTime: () => '2018-06-11T09:24:32.004423'
    }
  });
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
});

When('I wait for the page to load', () => {
  cy.get('div[data-test=loading-cds-page]').should('not.exist');
});

When('I refresh the page', () => {
  cy.reload();
});

Then(/the browser sent the query "(\w+)" (\d+) times?/, (operationName, numCalls) => {
  cy.graphqlNumCallsByOperationName().then(numCallsByOperationName => {
    expect(numCallsByOperationName).to.have.property(operationName, numCalls);
  });
});
