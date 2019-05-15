import { useQuery } from '@apollo/react-hooks';

/**
 * Hook for simple reading and writing of a local apollo query.
 * @param query Client apollo query output from a gql tag.
 */
export default function useLocalApolloQuery<T>(query: any): [T, (value: T) => void] {
  const { data, client } = useQuery(query);
  if (data === undefined) {
    throw new Error("Data for a local query shouldn't be undefined");
  }

  function setData(newData: T) {
    client.writeQuery<T>({
      query,
      data: newData
    });
  }

  return [data, setData];
}
