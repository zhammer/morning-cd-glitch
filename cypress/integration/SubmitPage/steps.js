/* global cy */
/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.wrap('', { log: false }).as('noteInputValue');
  cy.wrap(false, { log: false }).as('graphqlServerError');
  cy.graphql({ delay: 100 });
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
  cy.fixture('morningcd/accessToken.json').then(({ accessToken }) => {
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

Given('there is a problem with the graphql server', () => {
  cy.wrap(true, { log: false }).as('graphqlServerError');
});

When(`I visit the submit page with the id {string}`, id => {
  cy.visit(`/submit?id=${id}`);
  cy.wrap(id, { log: false }).as('songId');
});

When(`I write the name {string}`, name => {
  cy.wrap(name, { log: false }).as('nameInputValue');
  cy.get('input[data-test=name-input]').type(name);
});

When(`I write the note {string}`, note => {
  cy.wrap(note, { log: false }).as('noteInputValue');
  cy.get('textarea[data-test=note-input]').type(note);
});

When('I wait for the submit to complete', () => {
  // I can't cy.wait on the graphql request using the current mock systen,
  // so we just wait for the browser to redirect to /listens
  cy.location('pathname').should('equal', '/listens');
});

When('I click the submit button', () => {
  cy.get('@graphqlServerError', { log: false }).then(graphqlServerError => {
    cy.get('@songId', { log: false }).then(songId => {
      cy.get('@nameInputValue', { log: false }).then(nameInputValue => {
        cy.get('@noteInputValue', { log: false }).then(noteInputValue => {
          cy.graphqlUpdate({
            Mutation: {
              submitListen: (_, { input }) => {
                if (graphqlServerError) {
                  throw new Error();
                }
                const expectedInput = {
                  ianaTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  songId,
                  listenerName: nameInputValue,
                  note: noteInputValue
                };
                expect(input).to.eql(expectedInput);
              }
            }
          });
        });
      });
    });
  });
  cy.get('button[data-test=submit-button]').click();
});

When(`I click the link with the text {string}`, linkText => {
  cy.get('a')
    .contains(linkText)
    .click();
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

Then(/the submit button is (enabled|disabled)/, enabledOrDisabled => {
  cy.get('button[data-test=submit-button]').should(`be.${enabledOrDisabled}`);
});

Then('the name input is selected', () => {
  cy.focused().should('have.attr', 'data-test', 'name-input');
});

Then(`I see the error text {string}`, text => {
  cy.get('span[data-test=text-error]').should('have.text', text);
});

Then(`I don't see any error text`, () => {
  cy.get('span[data-test=text-error]').should('not.exist');
});

Then(`I see the text {string}`, text => {
  cy.get('span').contains(text);
});
