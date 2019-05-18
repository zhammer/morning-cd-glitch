import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const SPOTIFY_ACCESS_TOKEN_QUERY = gql`
  query SpotifyAccessToken {
    accessToken @rest(type: "String!", path: "accesstoken", endpoint: "morningCd")
  }
`;

/**
 * Hook that fetches a spotify access token from morningcd.
 * Just returns a loading boolean, as the actual access token
 * is used from the apollo cache in all current use cases.
 */
export default function useSpotifyAccessToken(): [boolean] {
  const { loading } = useQuery(SPOTIFY_ACCESS_TOKEN_QUERY, {
    pollInterval: milliseconds({ minutes: 59 })
  });
  return [loading];
}

function milliseconds({ minutes }: { minutes: number }): number {
  return minutes * 60 * 1000;
}
