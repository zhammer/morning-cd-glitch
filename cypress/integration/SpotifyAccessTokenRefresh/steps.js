/* global cy */
/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.server();
  cy.graphql();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json').as('accessTokenRequest');
  cy.route({
    url: '/v1/search?query=something holy paper castles&type=track&limit=5',
    response: 'fixture:spotify/somethingHolyPaperCastlesSearch.json'
  }).as('spotifySearchRequest');
});

Given('we have the ability to fast forward time', () => {
  cy.wrap(['Date', 'setTimeout', 'clearTimeout']).as('clockOverrides');
});

When('I visit the question page', () => {
  cy.visit('/question');
  cy.wait('@accessTokenRequest').then(() => {
    cy.route('/accesstoken', 'fixture:morningcd/refreshedAccessToken.json');
  });
});

When('an hour goes by', () => {
  cy.wait(500);
  cy.tick(3.6e6);
});

Then('I send a request to spotify with the refreshed access token', () => {
  cy.tick(1000);
  cy.wait('@spotifySearchRequest').then(xhr => {
    expect(xhr.requestHeaders.authorization).to.equal(
      'Bearer my-refreshed-fake-cypress-access-token'
    );
  });
});

Then(`I see the song {string} by {string} from the album {string}`, (name, artist, album) => {
  cy.get('div[data-test=song]')
    .contains('div[data-test=song]', name)
    .contains('div[data-test=song]', artist)
    .contains('div[data-test=song]', album);
});
