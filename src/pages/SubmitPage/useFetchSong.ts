import { Song } from '../../definitions';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import useSpotifyAccessToken from '../../hooks/useSpotifyAccessToken';
import { ApolloError } from 'apollo-client';

interface SongQuery {
  song: Song | null;
}

const SONG_QUERY = gql`
  query SongQuery($id: ID!) {
    song(id: $id) @rest(type: "Song", path: "/tracks/{args.id}", endpoint: "spotify") {
      id
      name
      artistName
      albumName
      imageLargeUrl
      imageMediumUrl
      imageSmallUrl
    }
  }
`;

export default function useFetchSong(
  id: string | null
): [Song | null, boolean, string | undefined] {
  const [accessTokenLoading] = useSpotifyAccessToken();
  const { data, loading, error } = useQuery(SONG_QUERY, {
    skip: accessTokenLoading || !id,
    variables: {
      id
    }
  });
  const errorMessage = error && pluckErrorMessage(error);
  const song = data ? data.song : null;
  return [song, loading || accessTokenLoading, errorMessage];
}

/**
 * plucks out error.networkError.result.error.message.
 * if that doesn't exist, falls back to  the default apollo
 * error message.
 */
function pluckErrorMessage(error: ApolloError): string {
  const fallbackErrorMessage = error.message;
  const networkError = error.networkError;
  if (!networkError) return fallbackErrorMessage;
  const result = (networkError as any).result;
  if (!result) return fallbackErrorMessage;
  const err = result.error;
  if (!err) return fallbackErrorMessage;
  return err.message ? err.message : fallbackErrorMessage;
}
