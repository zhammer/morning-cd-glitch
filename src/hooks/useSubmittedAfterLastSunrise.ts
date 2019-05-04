import { useGnomon } from './useSundial';
import useLocalApolloQuery from './useLocalApolloQuery';
import gql from 'graphql-tag';

const LAST_SUBMIT_QUERY = gql`
  query LastSubmit {
    lastSubmit
  }
`;

export default function useSubmittedAfterLastSunrise(): boolean {
  const [, lastSunrise] = useGnomon();
  const [{ lastSubmit }] = useLocalApolloQuery<{ lastSubmit: string | null }>(LAST_SUBMIT_QUERY);
  return Boolean(lastSunrise && lastSubmit && lastSubmit > lastSunrise);
}
