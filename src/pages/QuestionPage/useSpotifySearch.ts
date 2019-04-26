import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

interface SpotifyAccessTokenQuery {
  accessToken: string;
}

const SPOTIFY_ACCESS_TOKEN_QUERY = gql`
  query SpotifyAccessToken {
    accessToken @rest(type: "String!", path: "accesstoken", endpoint: "morningCd")
  }
`;

export default function useSpotifySearch(searchText: string) {
  const { data: accessTokenData, loading: accessTokenLoading } = useQuery<SpotifyAccessTokenQuery>(
    SPOTIFY_ACCESS_TOKEN_QUERY
  );
  if (!accessTokenLoading && accessTokenData) {
    console.log(accessTokenData.accessToken);
  }
}
