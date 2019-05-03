import styled, { css, keyframes } from '../../custom/styled-components';
import { compactRoundedCorners } from '../../styles/mixins';
import { ZeroToOneHundred } from './types';

const full = keyframes`
  from { border-image-width: 2 }
  to   { border-image-width: 4 }
`;

interface ProgressProps {
  value: ZeroToOneHundred;
}

const ProgressBar = styled.progress.attrs({ max: 100 })<ProgressProps>`
  ${compactRoundedCorners()};

  width: 100%;
  height: 48px;
  margin: 4px;
  background-color: ${props => props.theme.background};
  appearance: none;

  ${({ value, theme }) => {
    let mode: 'success' | 'warning' | 'error';
    if (value < 30) {
      mode = 'error';
    } else if (value < 60) {
      mode = 'warning';
    } else {
      mode = 'success';
    }
    const color = theme[mode].normal;
    return css`
      &::-webkit-progress-bar {
        background-color: ${theme.background};
      }
      &::-webkit-progress-value {
        background-color: ${color};
      }
      &::-moz-progress-bar {
        background-color: ${color};
      }
      &::-ms-fill {
        background-color: ${color};
        border: none;
      }
    `;
  }};

  ${props =>
    props.value === 100 &&
    css`
      animation: ${full} 0.5s infinite both steps(2) 1s;
    `};
`;

export default ProgressBar;
