import gql from 'graphql-tag';
import useLocalApolloQuery from '../../hooks/useLocalApolloQuery';
import { useEffect, useMemo } from 'react';

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
  boolean,
  string | null,
  string | null
] {
  const [nameQuery, writeNameQuery] = useLocalApolloQuery<NameInputQueryData>(NAME_INPUT_QUERY);
  const [noteQuery, writeNoteQuery] = useLocalApolloQuery<NoteInputQueryData>(NOTE_INPUT_QUERY);
  const invalidNameError = useMemo(() => {
    if (nameQuery.nameInput.length > 30) return 'Max name length is 20!';
    return null;
  }, [nameQuery]);
  const invalidNoteError = useMemo(() => {
    if (noteQuery.noteInput.length > 100) return 'Max note length is 100!';
    return null;
  }, [noteQuery]);
  const valid = useMemo(() => {
    return invalidNameError === null && invalidNoteError === null && nameQuery.nameInput !== '';
  }, [nameQuery, invalidNameError, invalidNoteError]);

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
    valid,
    invalidNameError,
    invalidNoteError
  ];
}
