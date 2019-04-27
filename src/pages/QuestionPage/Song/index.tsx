import React from 'react';
import { Song as SongInterface } from '../../../definitions';
import Container from '../../../components/Container';
import Image from '../../../components/Image';
import { Columns, SongInfo } from './Song.styles';

interface SongProps {
  song: SongInterface;
}

export default function Song({ song }: SongProps) {
  return (
    <Container.Rounded>
      <Columns>
        <Image.Pixelated src={song.imageSmallUrl} />
        <SongInfo>
          <span data-test='song-name'>{song.name}</span> ·{' '}
          <span data-test='song-artist'>{song.artistName}</span> ·{' '}
          <span data-test='song-album'>{song.albumName}</span>
        </SongInfo>
      </Columns>
    </Container.Rounded>
  );
}
