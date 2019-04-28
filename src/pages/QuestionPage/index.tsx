import React, { useState } from 'react';
import TextInput from '../../components/TextInput';
import Page from '../../components/Page';
import Title from '../../components/Title';
import { QuestionContainer, SongsContainer } from './QuestionPage.styles';
import useQuestionInput from './useQuestionInput';
import useSpotifySearch from './useSpotifySearch';
import Song from './Song';
import useConfidentInput from '../../hooks/useConfidentInput';
import { Song as SongInterface } from '../../definitions';
import { Redirect } from 'react-router';
import useFocusOnMount from '../../hooks/useFocusOnMount';

export default function QuestionPage() {
  const [questionInput, setQuestionInput] = useQuestionInput();
  const [confidentQuestionInput, forceConfident] = useConfidentInput(questionInput, 250);
  const [songs, loading] = useSpotifySearch(confidentQuestionInput);
  const [selectedSong, setSelectedSong] = useState<SongInterface | null>(null);
  const focusOnMountProps = useFocusOnMount();

  if (selectedSong) return <Redirect push to={`/submit?id=${selectedSong.id}`} />;
  return (
    <Page>
      <Title>What was the first piece of music you listened to this morning?</Title>
      <QuestionContainer>
        <TextInput
          data-test='question-input'
          value={questionInput}
          onChange={e => setQuestionInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && forceConfident()}
          {...focusOnMountProps}
        />
      </QuestionContainer>
      {selectedSong && <div>{JSON.stringify(selectedSong)}</div>}
      {loading && <div>Loading...</div>}
      {songs && (
        <SongsContainer data-test='songs-container'>
          {songs.map(song => (
            <Song key={song.id} song={song} onClick={() => setSelectedSong(song)} />
          ))}
        </SongsContainer>
      )}
    </Page>
  );
}
