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
  const ids = dataTable.rows();
});

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
