import gql from 'graphql-tag';
import { ListenFragment } from '../../apollo/fragments';
import { useMutation } from 'react-apollo-hooks';

const SUBMIT_LISTEN_MUTATION = gql`
  mutation SubmitListen($listenInput: ListenInput!) {
    submitListen(input: $listenInput) {
      ...ListenFields
    }
  }
  ${ListenFragment}
`;

export default function useSubmitListen() {
  const submitListenMutation = useMutation(SUBMIT_LISTEN_MUTATION);
  async function submit(name: string, songId: string, note: string) {
    await submitListenMutation({
      variables: {
        listenInput: {
          songId,
          listenerName: name,
          note,
          ianaTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }
    });
  }
  return [submit];
}
