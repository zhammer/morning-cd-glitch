/* global cy Cypress */
import { graphql } from 'graphql';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const defaultMocks = {
  Date: () => '2018-06-12',
  DateTime: () => '2018-06-11T09:24:32.004423'
};

function makeMockGraphqlFetch(endpoint, schema, initialMocks, delay) {
  let currentMocks = { ...initialMocks, ...defaultMocks };
  let numCallsByOperationName = {};
  function updateNumCallsByOperationName(operationName) {
    const numCalls = numCallsByOperationName[operationName] || 0;
    numCallsByOperationName[operationName] = numCalls + 1;
  }
  function updateMocks(newMocks) {
    currentMocks = {
      ...currentMocks,
      ...newMocks
    };
  }
  async function mockGraphqlFetch(input, init) {
    addMockFunctionsToSchema({
      schema,
      mocks: currentMocks
    });

    if (input.indexOf(endpoint) !== -1 && init && init.method === 'POST') {
      const { operationName, query, variables } = JSON.parse(init.body);
      const data = await graphql({
        schema,
        operationName,
        source: query,
        variableValues: variables,
        rootValue: {}
      });
      updateNumCallsByOperationName(operationName);
      await new Promise(resolve => setTimeout(resolve, delay));
      return new Response(JSON.stringify(data));
    }
    throw new Error(`Tried to hit the injected graphql fetch function outside of expected use`);
  }
  return [mockGraphqlFetch, updateMocks, numCallsByOperationName];
}

const defaultOptions = {
  schema: Cypress.env('GRAPHQL_SCHEMA'),
  endpoint: '/graphql',
  mocks: {},
  delay: 0
};

Cypress.Commands.add(
  'graphql',
  ({
    schema: schemaText = Cypress.env('GRAPHQL_SCHEMA'),
    endpoint = '/graphql',
    mocks = {},
    delay = 0
  } = defaultOptions) => {
    const schema = makeExecutableSchema({
      typeDefs: schemaText
    });
    const [mockGraphqlFetch, updateMocks, numCallsByOperationName] = makeMockGraphqlFetch(
      endpoint,
      schema,
      mocks,
      delay
    );
    cy.wrap(updateMocks, { log: false }).as('updateGraphqlMocks');
    cy.wrap(numCallsByOperationName, { log: false }).as('numCallsByOperationName');
    cy.on('window:before:load', window => {
      window.cypressGraphqlFetch = mockGraphqlFetch;
    });
  }
);

Cypress.Commands.add('graphqlUpdate', mocks => {
  cy.get('@updateGraphqlMocks', { log: false }).then(updateGraphqlMocks => {
    updateGraphqlMocks(mocks);
  });
});

Cypress.Commands.add('graphqlNumCallsByOperationName', () => {
  cy.get('@numCallsByOperationName').then(numCallsByOperationName => numCallsByOperationName);
});
