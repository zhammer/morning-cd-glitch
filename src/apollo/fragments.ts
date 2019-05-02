import gql from 'graphql-tag';

export const SongFragment = gql`
  fragment SongFields on Song {
    id
    name
    artistName
    albumName
    imageLargeUrl
    imageMediumUrl
    imageSmallUrl
  }
`;

export const ListenFragment = gql`
  fragment ListenFields on Listen {
    id
    listenerName
    listenTimeUtc
    note
    ianaTimezone
    song {
      ...SongFields
    }
  }
  ${SongFragment}
`;
