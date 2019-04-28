import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Song } from '../../definitions';
import { useMemo } from 'react';

interface SpotifyAccessTokenQuery {
  accessToken: string;
}

const SPOTIFY_ACCESS_TOKEN_QUERY = gql`
  query SpotifyAccessToken {
    accessToken @rest(type: "String!", path: "accesstoken", endpoint: "morningCd")
  }
`;

interface SearchSongsQuery {
  searchSongs: Song[];
}

const SEARCH_SONGS_QUERY = gql`
  query SearchSongsQuery($searchText: String!) {
    searchSongs(query: $searchText)
      @rest(type: "[Song!]", path: "/search?{args}&type=track&limit=5", endpoint: "spotify") {
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

export default function useSpotifySearch(searchText: string): [Song[] | undefined, boolean] {
  const { loading: accessTokenLoading } = useQuery<SpotifyAccessTokenQuery>(
    SPOTIFY_ACCESS_TOKEN_QUERY
  );

  const { data: searchSongsData, loading: searchSongsLoading } = useQuery<SearchSongsQuery>(
    SEARCH_SONGS_QUERY,
    {
      variables: { searchText },
      skip: searchText === '' || accessTokenLoading
    }
  );

  const songs = useMemo(() => {
    if (!searchSongsLoading && searchSongsData) {
      return searchSongsData.searchSongs;
    }
    return undefined;
  }, [searchSongsData, searchSongsLoading]);
  const loading = useMemo(() => {
    if (!searchText) {
      return false;
    }
    return searchSongsLoading || accessTokenLoading;
  }, [searchText, searchSongsLoading, accessTokenLoading]);

  return [songs, loading];
}
