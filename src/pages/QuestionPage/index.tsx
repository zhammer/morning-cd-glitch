import React from 'react';
import TextInput from '../../components/TextInput';
import Page from '../../components/Page';
import Title from '../../components/Title';
import { QuestionContainer, SongsContainer } from './QuestionPage.styles';
import useQuestionInput from './useQuestionInput';
import useSpotifySearch from './useSpotifySearch';
import Song from './Song';
import useConfidentInput from '../../hooks/useConfidentInput';

export default function QuestionPage() {
  const [questionInput, setQuestionInput] = useQuestionInput();
  const [confidentQuestionInput, forceConfident] = useConfidentInput(questionInput, 250);
  const [songs, loading] = useSpotifySearch(confidentQuestionInput);
  return (
    <Page>
      <Title>What was the first piece of music you listened to this morning?</Title>
      <QuestionContainer>
        <TextInput
          data-test='question-input'
          value={questionInput}
          onChange={e => setQuestionInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && forceConfident()}
        />
      </QuestionContainer>
      {loading && <div>Loading...</div>}
      {songs && (
        <SongsContainer data-test='songs-container'>
          {songs.map(song => (
            <Song key={song.id} song={song} />
          ))}
        </SongsContainer>
      )}
    </Page>
  );
}
