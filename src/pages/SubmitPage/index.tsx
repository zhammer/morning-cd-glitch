import React from 'react';
import useQueryParams from './useQueryParams';
import Page from '../../components/Page';
import { Redirect } from 'react-router';
import useFetchSong from './useFetchSong';
import Song from '../../components/Song';
import Field from '../../components/Field';
import Input from '../../components/Input';
import { InputContainer, FormContainer } from './SubmitPage.styles';
import Text from '../../components/Text';
import useFocusOnMount from '../../hooks/useFocusOnMount';

export default function SubmitPage() {
  const queryParams = useQueryParams();
  const songId = isString(queryParams.id) ? queryParams.id : null;
  const [song, loading, error] = useFetchSong(songId);
  const focusOnMountProps = useFocusOnMount();

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
                <Input.Text {...focusOnMountProps} />
              </InputContainer>
            </label>
          </Field.Block>
          <Field.Block>
            <label>
              Note <Text.Disabled>(Optional)</Text.Disabled>
              <InputContainer>
                <Input.TextArea />
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
