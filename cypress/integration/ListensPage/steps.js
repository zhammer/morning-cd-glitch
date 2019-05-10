/* global cy */
/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.graphql();
});

Given('these tests refer to the following listens', dataTable => {
  const listens = pluckListens(dataTable);
  cy.wrap(listens).as('availableListens');
});

Given(`listens {int}-{int} exist`, (from, to) => {
  cy.get('@availableListens').then(availableListens => {
    const listens = availableListens.filter(listen => listen.id >= from && listen.id <= to);
    cy.graphqlUpdate({
      Query: {
        allListens: (_, { before, after, last }) => {
          const allEdges = listens.map(listen => ({ cursor: listen.listenTimeUtc, node: listen }));
          const edges = allEdges
            .filter(({ cursor }) => cursor < before && cursor > after)
            .slice(-last);
          const hasPreviousPage = edges[0].cursor !== allEdges[0].cursor;
          return {
            edges,
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage
            }
          };
        }
      }
    });
  });
});

Then('I see the listens with the following ids', dataTable => {
  const ids = pluckIds(dataTable);
  cy.get('@availableListens').then(availableListens => {
    const listens = ids.map(id => availableListens.find(listen => listen.id === id));
    cy.get('div[data-test=listens]')
      .children()
      .should('have.length', listens.length)
      .each((listenComponent, index) => {
        const listen = listens[index];
        expect(listenComponent)
          .to.contain(listen.listenerName)
          .and.contain(listen.song.name)
          .and.contain(listen.song.artistName)
          .and.contain(listen.song.albumName)
          .and.contain(listen.expectedIanaTimezoneDisplay);
        if (listen.note !== '') {
          expect(listenComponent).to.contain(listen.note);
        }
      });
  });
});

function pluckIds(dataTable) {
  return dataTable.rows().map(row => row[0]);
}

function pluckListens(dataTable) {
  return dataTable.hashes().map(listenRow => {
    return Object.entries(listenRow).reduce((current, [key, value]) => {
      if (key.startsWith('song.')) {
        const songKey = key.split('.')[1];
        const song = current.song || {};
        return {
          ...current,
          song: {
            ...song,
            [songKey]: value
          }
        };
      } else {
        return {
          ...current,
          [key]: value
        };
      }
    }, {});
  });
}
