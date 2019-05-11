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

Given('no listens were submitted today', () => {
  cy.graphqlUpdate({
    Query: {
      allListens: () => ({
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false
        }
      })
    }
  });
});

Given('there are problems with the server', () => {
  cy.graphqlUpdate({
    Query: {
      allListens: () => {
        throw new Error();
      }
    }
  });
});

Given('it is specifically a second before sunrise', () => {
  cy.clock().then(clock => {
    clock.restore();
  });
  cy.clock(new Date('Wed Mar 06 1985 06:20:55 GMT-0500').getTime(), ['Date', 'setTimeout']);
});

When(/I scroll to the (bottom) of the page/, partOfPage => {
  cy.scrollTo(partOfPage);
});

When(`I wait {int} seconds`, seconds => {
  cy.tick(seconds * 1000);
});

When('the page loads', () => {
  cy.get('div[data-test=listens-page]');
});

When(`I click the link with the text {string}`, text => {
  cy.get('a')
    .contains(text)
    .click();
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

Then("I don't see any listens", () => {
  cy.get('div[data-test=listens').should('not.exist');
  cy.get('div[data-test=listen').should('not.exist');
});

Then(`I see the subtitle {string}`, text => {
  cy.get('div[data-test=subtitle]').contains(text);
});

Then(/I (don't )?see the more listens loader/, dont => {
  const prefix = dont ? 'not.' : '';
  cy.get('div[data-test=more-listens-loader]').should(`${prefix}exist`);
});

Then(`I see the error text {string}`, text => {
  cy.get('span[data-test=text-error]').should('have.text', text);
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
