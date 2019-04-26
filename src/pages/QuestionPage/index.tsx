import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import Page from '../../components/Page';
import Title from '../../components/Title';
import { QuestionContainer } from './QuestionPage.styles';

export default function QuestionPage() {
  const [searchText, setSearchText] = useState('');
  return (
    <Page>
      <Title>
        What was the first piece of music you listened to this morning?
      </Title>
      <QuestionContainer>
        <TextInput
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </QuestionContainer>
    </Page>
  );
}
