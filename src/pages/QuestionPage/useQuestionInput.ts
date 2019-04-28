import gql from 'graphql-tag';
import useLocalApolloQuery from '../../hooks/useLocalApolloQuery';

interface QuestionInputQueryData {
  questionInput: string;
}

const QUESTION_INPUT_QUERY = gql`
  query QuestionInput {
    questionInput @client
  }
`;

export default function useQuestionInput(): [string, (value: string) => void] {
  const [data, setData] = useLocalApolloQuery<QuestionInputQueryData>(QUESTION_INPUT_QUERY);
  function setQuestionInput(questionInput: string) {
    setData({ questionInput });
  }
  return [data.questionInput, setQuestionInput];
}
