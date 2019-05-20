/* global cy */
/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.wrap(['Date']).as('clockOverrides');
});

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
  },
  '1985-03-07': {
    sunriseUtc: '1985-03-07T11:19:20',
    sunsetUtc: '1985-03-07T22:54:28'
  }
};
Given(/it is (before sunrise|day|after sunset|before the next day's sunrise)/, timeOfDay => {
  cy.graphqlUpdate({
    Query: {
      sunlightWindow: (_, args) => sunlightWindows[args.onDate]
    }
  });
  const currentDateString = {
    'before sunrise': 'Tue Mar 05 1985 03:50:00 GMT-0500',
    day: 'Tue Mar 05 1985 16:30:10 GMT-0500',
    'after sunset': 'Tue Mar 05 1985 23:15:40 GMT-0500',
    "before the next day's sunrise": 'Wed Mar 06 1985 03:50:00 GMT-0500'
  }[timeOfDay];
  cy.clock().then(clock => {
    clock.restore();
  });
  cy.get('@clockOverrides').then(clockOverrides => {
    cy.clock(new Date(currentDateString).getTime(), clockOverrides);
  });
});

Given('I have submitted a listen today', () => {
  cy.window().then(window => {
    window.localStorage.setItem('lastSubmit', '1985-03-05T12:15:20');
  });
});

Given('I have not submitted a listen today', () => {
  cy.window().then(window => {
    window.localStorage.removeItem('lastSubmit');
  });
});

Given('the last time I submitted a listen was a few days ago', () => {
  cy.window().then(window => {
    window.localStorage.setItem('lastSubmit', '1985-03-01T12:15:20');
  });
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

Then(`I see the title {string}`, text => {
  cy.get('h2').contains(text);
});

When(/I click the browser (forward|back) button/, direction => {
  cy.go(direction);
});

When(`I type {int} characters`, numCharacters => {
  if (numCharacters > LOREM_IPSUM.length) {
    throw new Error(`Max number of characters is ${LOREM_IPSUM.length}`);
  }
  const text = LOREM_IPSUM.slice(0, numCharacters);
  cy.focused().type(text);
});

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac lectus sed tortor interdum tempus. Proin mi libero, iaculis quis turpis quis, dictum tempus metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vehicula mollis quam quis convallis. Nullam ut metus ut turpis sodales varius. Quisque erat tortor, interdum ut nulla et, posuere eleifend tellus. Praesent ullamcorper, nisi at hendrerit laoreet, tellus enim mollis metus, non consequat lorem nunc ut ante. Cras scelerisque, purus in facilisis consequat, est risus aliquam felis, sed efficitur arcu ex nec elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Integer feugiat massa accumsan lacus consectetur, id tristique mauris ornare. Etiam tincidunt porta metus, et egestas nisi. Aenean molestie leo sed ante lacinia dignissim. Donec ultrices feugiat augue, non lacinia magna mollis eget. Vivamus imperdiet pharetra est, vel commodo odio ullamcorper vitae. Ut lectus leo, interdum sed lacus in, volutpat congue metus. Mauris fermentum justo sit amet euismod aliquam. Phasellus tincidunt libero sed sagittis vehicula. Nulla rhoncus orci eget justo ornare, vel rhoncus leo pretium. Sed ullamcorper, augue quis aliquam commodo, libero risus eleifend purus, tincidunt vehicula massa est at odio. Ut varius congue dui, et fermentum velit dictum nec. Nam tempus interdum scelerisque. Nulla facilisi.`;
