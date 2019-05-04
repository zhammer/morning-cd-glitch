/* global cy Cypress*/
/// <reference types="cypress" />
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

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
  cy.route({
    url: `/v1/tracks/123`,
    response: 'fixture:spotify/tracks/invalidid.json',
    status: 400
  });
});

Given('I have submitted a listen today', () => {
  cy.window().then(window => {
    window.localStorage.setItem('lastSubmit', '1985-03-05T12:15:20');
  });
});

Given('I have last submitted a listen a few days ago', () => {
  cy.window().then(window => {
    window.localStorage.setItem('lastSubmit', '1985-03-01T12:15:20');
  });
});

Then(`I am still on {string}`, route => {
  cy.location().then(location => {
    expect(`${location.pathname}${location.search}`).to.equal(route);
  });
});
