import React, { useState } from 'react';
import useQueryParams from './useQueryParams';
import Page from '../../components/Page';
import { Redirect } from 'react-router';
import useFetchSong from './useFetchSong';
import Song from '../../components/Song';
import Field from '../../components/Field';
import Input from '../../components/Input';
import { InputContainer, FormContainer, SubmitButtonContainer } from './SubmitPage.styles';
import Text from '../../components/Text';
import useFocusOnMount from '../../hooks/useFocusOnMount';
import Button from '../../components/Button';

export default function SubmitPage() {
  const queryParams = useQueryParams();
  const songId = isString(queryParams.id) ? queryParams.id : null;
  const [song, loading, error] = useFetchSong(songId);
  const focusOnMountProps = useFocusOnMount();
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ name, note });
  }

  if (!songId) return <Redirect to='/question' />;
  return (
    <Page>
      {error && <div>{error}</div>}
      {loading && <div>loading..</div>}
      {song && (
        <form onSubmit={handleSubmit}>
          <FormContainer containerTitle='Submit Listen'>
            <Song song={song} />
            <Field.Block>
              <label>
                Your Name
                <InputContainer>
                  <Input.Text
                    value={name}
                    onChange={e => setName(e.target.value)}
                    {...focusOnMountProps}
                  />
                </InputContainer>
              </label>
            </Field.Block>
            <Field.Block>
              <label>
                Note <Text.Disabled>(Optional)</Text.Disabled>
                <InputContainer>
                  <Input.TextArea value={note} onChange={e => setNote(e.target.value)} />
                </InputContainer>
              </label>
            </Field.Block>
            <SubmitButtonContainer>
              <Button.Primary disabled={name === ''} type='submit'>
                Submit
              </Button.Primary>
            </SubmitButtonContainer>
          </FormContainer>
        </form>
      )}
    </Page>
  );
}

function isString(val: any): val is string {
  return typeof val === 'string';
}
