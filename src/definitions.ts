export interface Image {
  url: string;
}

export interface Song {
  id: string;
  name: string;
  artistName: string;
  albumName: string;
  imageLargeUrl: string;
  imageMediumUrl: string;
  imageSmallUrl: string;
}

export interface Listen {
  id: string;
  song: Song;
  listenerName: string;
  listenTimeUtc: string;
  note: string | null;
  ianaTimezone: string;
}

export interface SunlightWindow {
  sunrise: Date;
  sunset: Date;
}

export interface SunlightWindows {
  yesterday: SunlightWindow;
  today: SunlightWindow;
  tomorrow: SunlightWindow;
}
