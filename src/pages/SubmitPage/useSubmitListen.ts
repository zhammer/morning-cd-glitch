import gql from 'graphql-tag';
import { ListenFragment } from '../../apollo/fragments';
import { useMutation } from '@apollo/react-hooks';

const SUBMIT_LISTEN_MUTATION = gql`
  mutation SubmitListen($listenInput: ListenInput!) {
    submitListen(input: $listenInput) {
      ...ListenFields
    }
  }
  ${ListenFragment}
`;

const LAST_SUBMIT_QUERY = gql`
  query LastSubmit {
    lastSubmit
  }
`;

export default function useSubmitListen() {
  const [submitListenMutation, { error, loading }] = useMutation(SUBMIT_LISTEN_MUTATION);
  async function submit(name: string, songId: string, note: string) {
    const submitTime = new Date();
    await submitListenMutation({
      variables: {
        listenInput: {
          songId,
          listenerName: name,
          note,
          ianaTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      },
      update: (cache: any) => {
        const submitTimeIsoString = submitTime.toISOString();
        localStorage.setItem('lastSubmit', submitTimeIsoString);
        cache.writeQuery({
          query: LAST_SUBMIT_QUERY,
          data: {
            lastSubmit: submitTimeIsoString
          }
        });
      }
    });
  }
  return [submit, error, loading];
}
