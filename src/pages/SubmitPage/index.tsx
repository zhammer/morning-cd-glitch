import React from 'react';
import useQueryParams from './useQueryParams';
import Page from '../../components/Page';
import { Redirect } from 'react-router';
import useFetchSong from './useFetchSong';
import Song from '../../components/Song';
import Field from '../../components/Field';
import TextInput from '../../components/TextInput';
import { InputContainer, FormContainer } from './SubmitPage.styles';

export default function SubmitPage() {
  const queryParams = useQueryParams();
  const songId = isString(queryParams.id) ? queryParams.id : null;
  const [song, loading, error] = useFetchSong(songId);

  if (!songId) return <Redirect to='/question' />;
  return (
    <Page>
      {error && <div>{error}</div>}
      {loading && <div>loading..</div>}
      {song && (
        <FormContainer containerTitle='Submit Listen'>
          <Song song={song} />
          <Field.Block>
            <label>
              Your Name
              <InputContainer>
                <TextInput />
              </InputContainer>
            </label>
          </Field.Block>
          <Field.Block>
            <label>
              Note
              <InputContainer>
                <TextInput />
              </InputContainer>
            </label>
          </Field.Block>
        </FormContainer>
      )}
    </Page>
  );
}

function isString(val: any): val is string {
  return typeof val === 'string';
}
