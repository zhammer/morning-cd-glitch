export interface ThemeInterface {
  base: string;
  background: string;
  primary: colorWithStyles;
  success: colorWithStyles;
  warning: colorWithStyles;
  error: colorWithStyles;
  default: colorWithStyles;
  disabled: colorWithStyles;
}

type colorWithStyles = {
  normal: string;
  shadow: string;
  hover: string;
};

const day: ThemeInterface = {
  base: '#000000',
  background: '#ffffff',
  primary: {
    normal: '#209cee',
    shadow: '#006bb3',
    hover: '#108de0'
  },
  success: {
    normal: '#92cc41',
    shadow: '#4aa52e',
    hover: '#76c442'
  },
  warning: {
    normal: '#f7d51d',
    shadow: '#e59400',
    hover: '#f2c409'
  },
  error: {
    normal: '#e76e55',
    shadow: '#8c2022',
    hover: '#ce372b'
  },
  default: {
    normal: '#ffffff',
    shadow: '#adafbc',
    hover: '#e7e7e7'
  },
  disabled: {
    normal: '#d3d3d3',
    shadow: '#adafbc',
    hover: '#d3d3d3'
  }
};

const night: ThemeInterface = {
  ...day,
  base: '#ffffff',
  background: '#000000'
};

export default {
  day,
  night
};
