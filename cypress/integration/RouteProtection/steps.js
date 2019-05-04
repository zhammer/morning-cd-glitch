/* global cy */
/// <reference types="cypress" />
import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

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

Given('I have submitted a listen today', () => {
  cy.window().then(window => {
    window.localStorage.setItem('lastSubmit', '1985-03-05T12:15:20');
  });
});

Given('the last time I submitted a listen was a few days ago', () => {
  cy.window().then(window => {
    window.localStorage.setItem('lastSubmit', '1985-03-01T12:15:20');
  });
});

Then(`I am still on {string}`, route => {
  cy.location().then(location => {
    expect(`${location.pathname}${location.search}`).to.equal(route);
  });
});
