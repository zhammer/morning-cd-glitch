/* global cy */
/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.server();
  cy.route('/accesstoken', 'fixture:morningcd/accessToken.json');
});

Given('the internet is slow', () => {
  cy.graphql({ delay: 1e10 });
});

Given('time is frozen', () => {
  cy.clock(new Date(), ['setInterval', 'clearInterval']);
});

Then(`the progress bar has the value {int}`, value => {
  cy.get('progress[data-test=progress-bar]').should('have.attr', 'value', `${value}`);
});

Then('the progress bar is blinking', () => {
  cy.get('progress[data-test=progress-bar]').should(`have.css`, 'animation');
});
