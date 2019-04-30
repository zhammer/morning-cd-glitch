import { graphql } from 'graphql';
import { makeExecutableSchema, addMockFunctionsToSchema, IMocks } from 'graphql-tools';

Cypress.Commands.add('graphql', ({ schema: schemaText, endpoint, mocks }) => {
  const schema = makeExecutableSchema({
    typeDefs: schemaText
  });
  addMockFunctionsToSchema({
    schema,
    mocks
  });
  cy.on('window:before:load', window => {
    window.cypressGraphqlFetch = async (input, init) => {
      if (input.indexOf(endpoint) !== -1 && init && init.method === 'POST') {
        const { operationName, query, variables } = JSON.parse(init.body);
        const data = await graphql({
          schema,
          operationName,
          source: query,
          variableValues: variables,
          rootValue: {}
        });
        return new Response(JSON.stringify(data));
      }
      throw new Error(`Tried to hit the injected graphql fetch function outside of expected use`);
    };
  });
});

Cypress.Commands.add('graphqlUpdate', ({ mocks }) => {});
