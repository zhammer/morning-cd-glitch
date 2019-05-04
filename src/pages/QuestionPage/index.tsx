import React, { useState } from 'react';
import Input from '../../components/Input';
import Page from '../../components/Page';
import Title from '../../components/Title';
import { QuestionContainer, SongsContainer } from './QuestionPage.styles';
import useQuestionInput from './useQuestionInput';
import useSpotifySearch from './useSpotifySearch';
import Song from '../../components/Song';
import useConfidentInput from '../../hooks/useConfidentInput';
import { Song as SongInterface } from '../../definitions';
import { Redirect } from 'react-router';
import useFocusOnMount from '../../hooks/useFocusOnMount';
import { useGnomon } from '../../hooks/useSundial';
import useSubmittedAfterLastSunrise from '../../hooks/useSubmittedAfterLastSunrise';

export default function QuestionPage() {
  const [questionInput, setQuestionInput] = useQuestionInput();
  const [confidentQuestionInput, forceConfident] = useConfidentInput(questionInput, 250);
  const [songs, loading] = useSpotifySearch(confidentQuestionInput);
  const [selectedSong, setSelectedSong] = useState<SongInterface | null>(null);
  const focusOnMountProps = useFocusOnMount();
  const [timeOfDay] = useGnomon();
  const submittedListenAfterLastSunrise = useSubmittedAfterLastSunrise();

  if (submittedListenAfterLastSunrise) return <Redirect to='/listens' />;
  if (timeOfDay !== 'day') return <Redirect to='/listens' />;
  if (selectedSong) return <Redirect push to={`/submit?id=${selectedSong.id}`} />;
  return (
    <Page data-test='question-page'>
      <Title>What was the first piece of music you listened to this morning?</Title>
      <QuestionContainer>
        <Input.Text
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
