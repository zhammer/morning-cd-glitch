/* global cy Cypress*/
/// <reference types="cypress" />

beforeEach(() => {
  cy.graphql({
    schema: Cypress.env('GRAPHQL_SCHEMA'),
    endpoint: '/graphql',
    mocks: {
      Date: () => '2018-06-12',
      DateTime: () => '2018-06-11T09:24:32.004423'
    }
  });
});
