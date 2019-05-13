/* global cy */
/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.graphql();
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
  cy.fixture('morningcd/accessToken.json').then(({ accessToken }) => {
    cy.route({
      url: '/v1/search?query=Stay Flo&type=track&limit=5',
      response: 'fixture:spotify/stayFloSearch.json',
      onRequest: xhr => {
        expect(xhr.request.headers).to.have.property('authorization', `Bearer ${accessToken}`);
        expect(xhr.url).to.equal(
          'https://api.spotify.com/v1/search?query=Stay Flo&type=track&limit=5'
        );
      }
    });
    cy.route({
      url: '/v1/search?query=something holy paper castles&type=track&limit=5',
      response: 'fixture:spotify/somethingHolyPaperCastlesSearch.json',
      onRequest: xhr => {
        expect(xhr.request.headers).to.have.property('authorization', `Bearer ${accessToken}`);
        expect(xhr.url).to.equal(
          'https://api.spotify.com/v1/search?query=something holy paper castles&type=track&limit=5'
        );
      }
    });
  });
});

Given('I expect the page not to unload', () => {
  cy.on('window:before:unload', event => {
    if (event.target.URL.endsWith('/question')) {
      throw new Error('Expected not to unload the page');
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

When(`I wait {int} milliseconds`, milliseconds => {
  cy.wait(milliseconds);
});

When(`I click the song {string} by {string}`, (name, artist) => {
  cy.get('div[data-test=song]')
    .contains(new RegExp(`${name}.*${artist}`))
    .click();
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

Then('the song question input is selected', () => {
  cy.focused().should('have.attr', 'data-test', 'question-input');
});
