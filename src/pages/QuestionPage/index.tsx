import React from 'react';
import TextInput from '../../components/TextInput';
import Page from '../../components/Page';
import Title from '../../components/Title';
import { QuestionContainer } from './QuestionPage.styles';
import useQuestionInput from './useQuestionInput';
import useSpotifySearch from './useSpotifySearch';

export default function QuestionPage() {
  const [questionInput, setQuestionInput] = useQuestionInput();
  useSpotifySearch('');
  return (
    <Page>
      <Title>What was the first piece of music you listened to this morning?</Title>
      <QuestionContainer>
        <TextInput
          data-test='question-input'
          value={questionInput}
          onChange={e => setQuestionInput(e.target.value)}
        />
      </QuestionContainer>
    </Page>
  );
}
