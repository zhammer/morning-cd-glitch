import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Song } from '../../definitions';
import { useMemo, useEffect } from 'react';
import useSpotifyAccessToken from '../../hooks/useSpotifyAccessToken';

interface SearchSongsQuery {
  searchSongs: Song[];
}

const SEARCH_SONGS_QUERY = gql`
  query SearchSongsQuery($searchText: String!) {
    searchSongs(query: $searchText)
      @rest(type: "[Song]", path: "/search?{args}&type=track&limit=5", endpoint: "spotify") {
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
  const [accessTokenLoading, refetchAccessToken] = useSpotifyAccessToken();

  const { data: searchSongsData, loading: searchSongsLoading, error, refetch } = useQuery<
    SearchSongsQuery
  >(SEARCH_SONGS_QUERY, {
    variables: { searchText },
    skip: searchText === '' || accessTokenLoading
  });

  useEffect(() => {
    if (error) {
      if (error.networkError && (error.networkError as any).statusCode === 401) {
        refetchAccessToken().then(refetch);
      }
    }
  }, [error]);

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
