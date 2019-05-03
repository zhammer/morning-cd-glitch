/* global cy */
/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

When('Snap! *', () => {
  cy.then(() => {
    cy.screenshot();
  });
});

Given('I see the loading cds page', () => {
  cy.get('div[data-test=loading-cds-page]');
});

const sunlightWindows = {
  '1985-03-04': {
    sunriseUtc: '1985-03-04T11:24:05',
    sunsetUtc: '1985-03-04T22:51:08'
  },
  '1985-03-05': {
    sunriseUtc: '1985-03-05T11:22:31',
    sunsetUtc: '1985-03-05T22:52:15'
  },
  '1985-03-06': {
    sunriseUtc: '1985-03-06T11:20:56',
    sunsetUtc: '1985-03-06T22:53:22'
  }
};
Given(/it is (before sunrise|day|after sunset)/, timeOfDay => {
  cy.graphqlUpdate({
    Query: () => ({
      sunlightWindow: (_, args) => sunlightWindows[args.onDate]
    })
  });
  const currentDateString = {
    'before sunrise': 'Tue Mar 05 1985 03:50:00 GMT-0500',
    day: 'Tue Mar 05 1985 13:30:10 GMT-0500',
    'after sunset': 'Tue Mar 05 1985 23:15:40 GMT-0500'
  }[timeOfDay];
  cy.clock().then(clock => {
    clock.restore();
  });
  cy.clock(new Date(currentDateString).getTime(), ['Date']);
});

When(`I visit {string}`, path => {
  cy.visit(path);
});

When(`I type {string}`, text => {
  cy.focused().type(text);
});

When('I hit tab', () => {
  cy.focused().tab();
});

When('I type enter to submit', () => {
  cy.get('form').submit();
});

Then(`I am redirected to {string} with the params {string}`, (route, params) => {
  cy.location('pathname').should('eq', route);
  cy.location('search').should('eq', params);
});

Then(`I am redirected to {string}`, route => {
  cy.location('pathname').should('eq', route);
});
