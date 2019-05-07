import React from 'react';
import { Listen as ListenInterface } from '../../../definitions';
import { ListenContainer, Note } from './Listen.styles';
import { SongBody } from '../../../components/Song';
import StylelessLink from '../../../components/StylelessLink';
import Balloon from '../../../components/Balloon';
import Text from '../../../components/Text';

interface ListenProps {
  listen: ListenInterface;
}

export default function Listen({ listen }: ListenProps) {
  return (
    <StylelessLink href={`https://open.spotify.com/track/${listen.song.id}`} target='_blank'>
      <ListenContainer
        containerTitle={`${listen.listenerName}·${prettyIanaTimezone(listen.ianaTimezone)}`}
        containerTitleStyle='success'
      >
        <SongBody song={listen.song} />
        {listen.note !== '' && (
          <>
            <br />
            <Note>"{listen.note}"</Note>
          </>
        )}
      </ListenContainer>
    </StylelessLink>
  );
}

function prettyIanaTimezone(ianaTimezone: string) {
  const parts = ianaTimezone.split('/');
  return parts[parts.length - 1].replace(/_/g, ' ');
}
