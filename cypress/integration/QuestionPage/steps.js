/// <reference types="cypress" />

import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Cypress.on('window:before:load', window => {
  window.fetch = null;
});

beforeEach(() => {
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
  cy.route({
    url: '/v1/search?query=Stay Flo&type=track&limit=5',
    response: 'fixture:spotify/stayFloSearch.json',
    onRequest: xhr => {
      // can't figure out atm how to check / validate the auth header
      expect(xhr.url).to.equal(
        'https://api.spotify.com/v1/search?query=Stay Flo&type=track&limit=5'
      );
    }
  });
});

When('I visit morning cd', () => {
  cy.visit('/');
});

When('I click the song question input', () => {
  cy.get('input[data-test=question-input]')
    .as('songQuestionInput')
    .click();
});

When(`I type {string}`, text => {
  cy.wait(10); // weird bug fix, sometimes the first char doesnt get typed
  cy.get('@songQuestionInput').type(text);
});

When(`I wait {int} milliseconds`, milliseconds => {
  cy.wait(milliseconds);
});

When(`I click the song {string} by {string}`, (name, artist) => {
  cy.get('div[data-test=song]')
    .contains(new RegExp(`${name}.*${artist}`))
    .click();
});

Then(`I am redirected to {string} with the params {string}`, (route, params) => {
  cy.location('pathname').should('eq', route);
  cy.location('search').should('eq', params);
});

Then(`I see the title {string}`, text => {
  cy.get('h2').contains(text);
});

Then('I see the song question input', () => {
  cy.get('input[data-test=question-input]').should('be.visible');
});

Then(`the song question input form has the text {string}`, text => {
  cy.get('input[data-test=question-input]').should('have.value', text);
});

Then('I see the songs', songsTable => {
  const songs = songsTable.hashes();
  cy.get('div[data-test=songs-container]')
    .children()
    .should('have.length', songs.length)
    .each((songComponent, i) => {
      const song = songs[i];
      cy.wrap(songComponent)
        .find('span[data-test=song-name]')
        .contains(song.name);
      cy.wrap(songComponent)
        .find('span[data-test=song-artist]')
        .contains(song.artist);
      cy.wrap(songComponent)
        .find('span[data-test=song-album]')
        .contains(song.album);
    });
});
