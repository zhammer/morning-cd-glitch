/* global cy */
/// <reference types="cypress" />
import { When, Then } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.graphql();
  cy.server();
});

When('the about page loads', () => {
  cy.get('div[data-test=about-page]');
});

Then(`I see the header {string}`, text => {
  cy.get('h3').contains(text);
});

Then(`I see a link that includes {string}`, text => {
  cy.get(`a[href*="${text}"]`);
});

Then(`I am at {string}`, route => {
  cy.location().then(location => {
    expect(`${location.pathname}${location.search}`).to.equal(route);
  });
});
