import styled, { css } from '../../custom/styled-components';
import {
  compactBorderImage,
  compactRoundedCorners,
  coloredCompactBorderImage
} from '../../styles/mixins';

interface InputProps {
  mode?: 'success' | 'warning' | 'error';
}

const baseCss = css<InputProps>`
  ${compactRoundedCorners};
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 4px;
  background-clip: padding-box;
  ${compactBorderImage};

  ${props => {
    if (!props.mode) {
      return;
    }
    const color = {
      success: props.theme.success,
      warning: props.theme.warning,
      error: props.theme.error
    }[props.mode];
    return css`
      outline-color: ${color.hover};
      ${coloredCompactBorderImage(color.normal)};
    `;
  }}
`;

const Text = styled.input<InputProps>`
  ${baseCss};
`;

const TextArea = styled.textarea<InputProps>`
  ${baseCss};
  resize: vertical;
`;

export default {
  Text,
  TextArea
};
