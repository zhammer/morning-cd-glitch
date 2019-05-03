/* global cy Cypress */
/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Cypress.on('window:before:load', window => {
  window.fetch = null;
});

beforeEach(() => {
  cy.server();
  cy.graphql({
    schema: Cypress.env('GRAPHQL_SCHEMA'),
    endpoint: '/graphql',
    mocks: {
      Date: () => '2018-06-12',
      DateTime: () => '2018-06-11T09:24:32.004423'
    }
  });
});

Given(`I am at {string}`, route => {
  cy.visit(route);
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json').as('accessTokenRequest');
  cy.wait('@accessTokenRequest');
});

When(`I type {string} which initially errors with a 401`, text => {
  cy.route('/accesstoken', 'fixture:morningcd/refreshedAccessToken.json').as('accessTokenRequest');
  cy.route({
    url: '/v1/search?query=something holy paper castles&type=track&limit=5',
    response: 'fixture:spotify/accessTokenExpired.json',
    status: 401
  }).as('spotifySearchRequest');
  cy.focused().type(text);
  cy.wait('@spotifySearchRequest');
  cy.route({
    url: '/v1/search?query=something holy paper castles&type=track&limit=5',
    response: 'fixture:spotify/somethingHolyPaperCastlesSearch.json'
  }).as('spotifySearchRequest');
  cy.wait('@accessTokenRequest');
  cy.wait('@spotifySearchRequest');
});

Then(`I see the song {string} by {string} from the album {string}`, (name, artist, album) => {
  cy.get('div[data-test=song]')
    .contains('div[data-test=song]', name)
    .contains('div[data-test=song]', artist)
    .contains('div[data-test=song]', album);
});
