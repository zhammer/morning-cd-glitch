/* global cy Cypress */
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

Given('I am in New York', () => {
  cy.then(() => {
    expect(Intl.DateTimeFormat().resolvedOptions().timeZone).to.equal(
      'America/New_York',
      'These tests only work when the local timezone is America/New_York. Run "TZ=America/New_York {cypress command}"'
    );
  });
});

Given(`these are the sunlight windows for new york`, sunlightWindowTable => {
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

Given(`the current datetime in new york is {string}`, datetimeString => {
  const date = new Date(datetimeString);
  cy.clock(date.getTime(), ['Date', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval']);
});

When(/(\d+) hours? pass(?:es)?/, hours => {
  cy.tick(hours * 60 * 60 * 1000);
});

When('I wait a moment for the sundial to recalibrate', () => {
  cy.wait(250);
});

Then(/the sundial is set to (calibrating|before sunrise|day|after sunset)/, timeOfDay => {
  const camelCaseTimeOfDay = timeOfDay
    .split(' ')
    .reduce((curr, next) => `${curr}${next[0].toUpperCase()}${next.slice(1)}`);
  cy.get(`div[data-time-of-day=${camelCaseTimeOfDay}]`);
});
