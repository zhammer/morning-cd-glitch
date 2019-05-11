/* global cy */
/// <reference types="cypress" />
import { Then } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.graphql();
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
  cy.route({
    url: `/v1/tracks/123`,
    response: 'fixture:spotify/tracks/invalidid.json',
    status: 400
  });
});

Then(`I am still on {string}`, route => {
  cy.location().then(location => {
    expect(`${location.pathname}${location.search}`).to.equal(route);
  });
});
