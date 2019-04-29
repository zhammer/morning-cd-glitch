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
      ['4cHr9tKAv2sHQwj79tmCG8', 'whathegirlmuthafuckinwannadoo.json'],
      ['3o9lfY9tbv3S00atFxNki5', 'bigblue.json'],
      ['2gSBJPEjYoj6UhsI25TC8r', 'imissyou.json']
    ];
    fixtureNameById.forEach(([id, filename]) => {
      cy.route({
        url: `/v1/tracks/${id}`,
        response: `fixture:spotify/tracks/${filename}`,
        onRequest: xhr => {
          expect(xhr.request.headers).to.have.property('authorization', `Bearer ${accessToken}`);
          expect(xhr.url).to.equal(`https://api.spotify.com/v1/tracks/${id}`);
        }
      });
    });
    cy.route({
      url: `/v1/tracks/invalid_track_id`,
      response: 'fixture:spotify/tracks/invalidid.json',
      status: 400
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

Then(`I see a field with the label {string}`, labelText => {
  cy.get('div[data-test=field]').contains(labelText);
});

Then(`I see a container with the title {string}`, containerTitle => {
  cy.get('div[data-test=container]').contains('p[data-test=container-title]', containerTitle);
});

Then('the submit button is disabled', () => {
  cy.get('button[data-test=submit-button]').should('be.disabled');
});

Then('the name input is selected', () => {
  cy.focused().should('have.attr', 'data-test', 'name-input');
});

Then(`I see the error text {string}`, text => {
  cy.get('span[data-test=text-error]').should('have.text', text);
});
