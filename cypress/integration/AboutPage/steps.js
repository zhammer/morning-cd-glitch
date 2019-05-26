/* global cy */
/// <reference types="cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

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

Given('we have the ability to fast forward time', () => {
  cy.wrap(['Date', 'setTimeout', 'clearTimeout']).as('clockOverrides');
});

Then('I see the super mario brick block', () => {
  cy.get('*[data-test=brick-block]').should('be.visible');
});

When(`I click the super mario brick block {int} times`, numberClicks => {
  let click;
  for (click = 0; click < numberClicks; click++) {
    cy.get('*[data-test=brick-block]').click();
    cy.tick(250);
  }
});

When('I click the super mario brick block', () => {
  cy.get('*[data-test=brick-block]').click();
  cy.tick(250);
});

When(`I wait {float} seconds`, seconds => {
  cy.tick(seconds * 1000);
});

Then('I see the done block', () => {
  cy.get('*[data-test=done-block]').should('be.visible');
});

Then(/I (don't )?see the fire flower/, dont => {
  const prefix = dont ? 'not.' : '';
  cy.get('*[data-test=fire-flower]').should(`${prefix}exist`);
});

Then(`the fire flower has the link {string}`, linkText => {
  cy.get('*[data-test=fire-flower')
    .parent()
    .should('have.attr', 'href', linkText);
});
