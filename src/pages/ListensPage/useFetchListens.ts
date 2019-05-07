import { Listen } from '../../definitions';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { ListenFragment } from '../../apollo/fragments';
import { useMemo, useState, useCallback } from 'react';
import { useGnomon } from '../../hooks/useSundial';

interface Edge {
  cursor: string;
  listen: Listen;
}

interface ListensQuery {
  allListens: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: Edge[];
    __typename: string;
  };
}

const LISTENS_QUERY = gql`
  query Listens($lastSunrise: DateTime, $before: DateTime) {
    allListens(last: 10, before: $before, after: $lastSunrise) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        listen: node {
          ...ListenFields
        }
      }
    }
  }
  ${ListenFragment}
`;

type UseFetchListensReturn = {
  listens: Listen[];
  loading: boolean;
  fetchMore: () => void;
  hasMore: boolean;
  loadingMore: boolean;
};

export default function useFetchListens(): UseFetchListensReturn {
  const [, lastSunrise] = useGnomon();
  const [beforeCursor] = useState(() => new Date().toISOString());
  const [loadingMore, setLoadingMore] = useState(false);
  const { data, error, loading, fetchMore } = useQuery<ListensQuery>(LISTENS_QUERY, {
    variables: {
      lastSunrise,
      before: beforeCursor
    },
    skip: !lastSunrise
  });
  const [edges, hasMore] = useMemo<[Edge[], boolean]>(() => {
    if (loading || error || !data) return [[], false];
    return [data.allListens.edges, data.allListens.pageInfo.hasPreviousPage];
  }, [data, loading, error]);
  const fetchMoreCallback = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    await fetchMore({
      variables: {
        before: edges[0].cursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.allListens.edges.length) return previousResult;

        const newEdges = fetchMoreResult.allListens.edges;
        const newPageInfo = fetchMoreResult.allListens.pageInfo;
        return {
          allListens: {
            __typename: previousResult.allListens.__typename,
            pageInfo: newPageInfo,
            edges: [...newEdges, ...previousResult.allListens.edges]
          }
        };
      }
    });
    setLoadingMore(false);
  }, [fetchMore, edges, loadingMore]);
  const listens = edges.map(edge => edge.listen);
  return { listens, loading, fetchMore: fetchMoreCallback, loadingMore, hasMore };
}
