import { css } from '../custom/styled-components';
import { borderSize } from './variables';

function rgb(hexString: string) {
  const hex = hexString.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

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

export const roundedCorners = css`
  ${roundedCornerDefaults};
  ${borderImageRepeat};

  border-image-slice: 2;
  border-image-width: 2;

  ${compactBorderImage};
  border-image-outset: ${props => (props.theme.isNight ? 0 : 2)};
`;

export const compactRoundedCorners = css`
  ${roundedCornerDefaults};
  ${borderImageRepeat};

  border-image-slice: 2;
  border-image-width: 2;

  ${compactBorderImage};
  border-image-outset: ${props => (props.theme.isNight ? 0 : 2)};
`;
