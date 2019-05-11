import React from 'react';
import { Song as SongInterface } from '../../definitions';
import Image from '../Image';
import { Columns, SongInfo, SongContainer } from './Song.styles';

interface SongProps {
  song: SongInterface;
  onClick?: () => void;
}

export default function Song({ song, onClick }: SongProps) {
  return (
    <SongContainer onClick={onClick} data-test='song'>
      <SongBody song={song} />
    </SongContainer>
  );
}

export function SongBody({ song }: SongProps) {
  return (
    <Columns>
      <Image.Pixelated src={song.imageSmallUrl} />
      <SongInfo>
        <span data-test='song-name'>{song.name}</span> ·{' '}
        <span data-test='song-artist'>{song.artistName}</span> ·{' '}
        <span data-test='song-album'>{song.albumName}</span>
      </SongInfo>
    </Columns>
  );
}
