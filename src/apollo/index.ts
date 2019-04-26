import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { Song } from '../definitions';

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

function pluckSong(rawSong: any): Song {
  return {
    id: rawSong.id,
    name: rawSong.name,
    artistName: rawSong.artists[0].name,
    albumName: rawSong.album.name,
    imageLargeUrl: rawSong.album.images[0].url,
    imageMediumUrl: rawSong.album.images[1].url,
    imageSmallUrl: rawSong.album.images[2].url
  };
}
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
    spotify: {
      uri: 'https://api.spotify.com/v1',
      responseTransformer: async (response, typeName) => {
        if (typeName === '[Song!]') {
          const responseJson = await response.json();
          const rawSongs = responseJson.tracks.items;
          return rawSongs.map(pluckSong);
        }
      }
    }
  }
});

const spotifyAuthHeadersLink = new ApolloLink((operation, forward) => {
  if (operation.operationName === 'SearchSongsQuery') {
    const { cache } = operation.getContext();
    const accessToken = cache.data.data.ROOT_QUERY.accessToken;
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
  if (forward) {
    return forward(operation);
  }
  return null;
});

const link = ApolloLink.from([spotifyAuthHeadersLink, restLink, httpLink]);

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
