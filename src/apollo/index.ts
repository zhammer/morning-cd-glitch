import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

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
  uri: (process.env.REACT_APP_MORNING_CD_API_ENDPOINT || '/') + '/graphql'
});

const restLink = new RestLink({
  endpoints: {
    morningCd: {
      uri: process.env.REACT_APP_MORNING_CD_API_ENDPOINT || '/',
      // this transformer is only made for the accesstoken endpoint
      responseTransformer: async response => {
        const data = await response.json();
        return data.accessToken;
      }
    },
    spotify: 'https://api.spotify.com/v1'
  }
});

const link = ApolloLink.from([restLink, httpLink]);

/**
 * CLIENT
 */
export const client = new ApolloClient({
  cache,
  typeDefs,
  link
});
client.onResetStore(async () => {
  cache.writeData(initialData);
});
