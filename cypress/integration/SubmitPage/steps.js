/// <reference types="cypress" />

import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Cypress.on('window:before:load', window => {
  window.fetch = null;
});

beforeEach(() => {
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
  cy.fixture('morningcd/accesstoken.json').then(({ accessToken }) => {
    const fixtureNameById = [
      ['4cHr9tKAv2sHQwj79tmCG8', 'whathegirlmuthafuckinwannadooTrack.json'],
      ['3o9lfY9tbv3S00atFxNki5', 'bigblueTrack.json'],
      ['2gSBJPEjYoj6UhsI25TC8r', 'imissyouTrack.json']
    ];
    fixtureNameById.forEach(([id, filename]) => {
      cy.route({
        url: `/v1/tracks/${id}`,
        response: `fixture:spotify/${filename}`,
        onRequest: xhr => {
          expect(xhr.request.headers).to.have.property('authorization', `Bearer ${accessToken}`);
          expect(xhr.url).to.equal(`https://api.spotify.com/v1/tracks/${id}`);
        }
      });
    });
  });
});

When(`I visit the submit page with the id {string}`, id => {
  cy.visit(`/submit?id=${id}`);
});

Then(`I see the song {string} by {string} from the album {string}`, (name, artist, album) => {
  cy.get('div[data-test=song]')
    .contains('div[data-test=song]', name)
    .contains('div[data-test=song]', artist)
    .contains('div[data-test=song]', album);
});
