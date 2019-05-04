/* global cy */
/// <reference types="cypress" />
import { Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.graphql({ delay: 1e3 });
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
});

When('I wait for the page to load', () => {
  cy.get('div[data-test=question-page]');
});

When('I refresh the page', () => {
  cy.reload();
});

When('I leave the page', () => {
  cy.window().then(window => {
    window.location.href = 'about:blank';
    cy.wait(50); // fixes TypeError: Cannot read property 'attributes' of undefined
  });
});

When(`a day goes by`, () => {
  cy.clock().then(clock => {
    clock.restore();
    cy.clock(new Date('Tue Mar 06 1985 13:30:10 GMT-0500').getTime(), ['Date']);
  });
});

Then(/the browser sent the query "(\w+)" (\d+) times?/, (operationName, numCalls) => {
  cy.graphqlNumCallsByOperationName().then(numCallsByOperationName => {
    expect(numCallsByOperationName).to.have.property(operationName, numCalls);
  });
});

Then(/I (don't )see the loading cds page/, dont => {
  const prefix = dont && 'not.';
  cy.get('div[data-test=loading-cds-page]', { timeout: 50 }).should(`${prefix}be.visible`);
});
