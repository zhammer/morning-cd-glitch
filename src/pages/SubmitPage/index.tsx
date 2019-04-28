import React from 'react';
import useQueryParams from './useQueryParams';
import Page from '../../components/Page';
import { Redirect } from 'react-router';
import useFetchSong from './useFetchSong';
import Song from '../../components/Song';

export default function SubmitPage() {
  const queryParams = useQueryParams();
  const songId = isString(queryParams.id) ? queryParams.id : null;
  const [song, loading, error] = useFetchSong(songId);

  if (!songId) return <Redirect to='/question' />;
  return (
    <Page>
      Submit page {songId}
      {error && <div>{error}</div>}
      {loading && <div>loading..</div>}
      {song && <Song song={song} />}
    </Page>
  );
}

function isString(val: any): val is string {
  return typeof val === 'string';
}
