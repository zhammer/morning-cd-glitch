import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

/**
 * TYPE DEFS
 */
const typeDefs = gql`
  extend type Query {
    questionInput: String!
  }
`;

/**
 * CACHE
 */
const cache = new InMemoryCache();
const initialData = {
  data: {
    questionInput: ''
  }
};
cache.writeData(initialData);

/**
 * LINK
 */
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'graphql'
});

/**
 * CLIENT
 */
export const client = new ApolloClient({
  cache,
  typeDefs,
  link: httpLink
});
client.onResetStore(async () => {
  cache.writeData(initialData);
});
