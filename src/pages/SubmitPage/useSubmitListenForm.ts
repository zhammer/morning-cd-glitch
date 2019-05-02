import gql from 'graphql-tag';
import useLocalApolloQuery from '../../hooks/useLocalApolloQuery';
import { useEffect } from 'react';

interface NameInputQueryData {
  nameInput: string;
}

const NAME_INPUT_QUERY = gql`
  query NameInput {
    nameInput @client
  }
`;

interface NoteInputQueryData {
  noteInput: string;
}

const NOTE_INPUT_QUERY = gql`
  query NoteInput {
    noteInput @client
  }
`;

export default function useSubmitListenForm(): [
  string,
  string,
  (nameInput: string) => void,
  (noteInput: string) => void,
  boolean
] {
  const [nameQuery, writeNameQuery] = useLocalApolloQuery<NameInputQueryData>(NAME_INPUT_QUERY);
  const [noteQuery, writeNoteQuery] = useLocalApolloQuery<NoteInputQueryData>(NOTE_INPUT_QUERY);

  const valid = nameQuery.nameInput !== '';

  // Clear name & note when form unmounts.
  useEffect(() => {
    return () => {
      writeNameQuery({ nameInput: '' });
      writeNoteQuery({ noteInput: '' });
    };
    // eslint-disable-next-line
  }, []);
  return [
    nameQuery.nameInput,
    noteQuery.noteInput,
    nameInput => writeNameQuery({ nameInput }),
    noteInput => writeNoteQuery({ noteInput }),
    valid
  ];
}
