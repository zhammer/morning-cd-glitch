import gql from 'graphql-tag';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import { useMemo } from 'react';

interface questionInputQueryData {
  questionInput: string;
}

const QUESTION_INPUT_QUERY = gql`
  query QuestionInput {
    questionInput @client
  }
`;

export default function useQuestionInput(): [string, (value: string) => void] {
  const { data } = useQuery<questionInputQueryData>(QUESTION_INPUT_QUERY);
  const questionInput = useMemo(() => (data ? data.questionInput : ''), [data]);
  const apolloClient = useApolloClient();
  function setQuestionInput(value: string) {
    apolloClient.writeQuery({
      query: QUESTION_INPUT_QUERY,
      data: { questionInput: value }
    });
  }
  return [questionInput, setQuestionInput];
}
