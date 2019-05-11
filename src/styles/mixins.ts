import { css } from '../custom/styled-components';
import { borderSize } from './variables';

function rgb(hexString: string) {
  const hex = hexString.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

export const borderImage = (color: string) =>
  css`border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="${rgb(
    color
  )}" /></svg>');`;

export const compactBorderImage = css`
  border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="${props =>
    rgb(props.theme.base)}" /></svg>');`;

const borderImageRepeat = css`
  border-image-repeat: stretch;

  // for chrome
  @media all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    border-image-repeat: space;
  }

  // for firefox
  @supports (-moz-appearance: meterbar) {
    border-image-repeat: stretch;
  }
`;

const roundedCornerDefaults = css`
  border-style: solid;
  border-width: ${borderSize};
`;

export const roundedCorners = (isDark: boolean) => css`
  ${roundedCornerDefaults};
  ${borderImageRepeat};

  border-image-slice: 2;
  border-image-width: 2;

  ${compactBorderImage};
  border-image-outset: ${isDark ? 0 : 2};
`;

export const compactRoundedCorners = (isDark: boolean = false) => css`
  ${roundedCornerDefaults};
  ${borderImageRepeat};

  border-image-slice: 2;
  border-image-width: 2;

  ${compactBorderImage};
  border-image-outset: ${isDark ? 0 : 2};
`;
