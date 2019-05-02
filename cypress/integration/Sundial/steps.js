/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const defaultGraphqlMocks = {
  Date: () => '2018-06-12',
  DateTime: () => '2018-06-11T09:24:32.004423'
};

Cypress.on('window:before:load', window => {
  window.fetch = null;
});

beforeEach(() => {
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
  cy.graphql({
    schema: Cypress.env('GRAPHQL_SCHEMA'),
    endpoint: '/graphql',
    mocks: defaultGraphqlMocks,
    delay: 200
  });
});

Given(`the following sunlight windows`, sunlightWindowTable => {
  const sunlightWindows = sunlightWindowTable.hashes().reduce(
    (current, { date, sunriseUtc, sunsetUtc }) => ({
      ...current,
      [date]: {
        sunriseUtc: `${date}T${sunriseUtc}`,
        sunsetUtc: `${date}T${sunsetUtc}`
      }
    }),
    {}
  );
  cy.then(() => {
    cy.graphqlUpdate({
      Query: () => ({
        sunlightWindow: (_, args) => {
          expect(args.ianaTimezone).to.equal(Intl.DateTimeFormat().resolvedOptions().timeZone);
          return sunlightWindows[args.onDate];
        }
      })
    });
  });
});

Given(`the current datetime is {string}`, datetimeString => {
  const date = new Date(datetimeString);
  cy.clock(date.getTime(), ['Date']);
});

Then('it is before sunrise', () => {
  cy.get('span').contains('beforeSunrise');
});

Then('it is day', () => {
  cy.get('span').contains('day');
});

Then('it is after sunset', () => {
  cy.get('span').contains('afterSunset');
});

Then('it is calibrating', () => {
  cy.get('span').contains('calibrating');
});
