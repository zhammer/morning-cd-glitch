import styled, { css } from '../../custom/styled-components';
import { compactBorderImage, compactRoundedCorners } from '../../styles/mixins';

interface TextInputProps {
  mode?: 'success' | 'warning' | 'error';
}

export default styled.input<TextInputProps>`
  ${compactRoundedCorners()};
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 4px;
  background-clip: padding-box;

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
      ${compactBorderImage(color.normal)};
      outline-color: ${color.hover};
    `;
  }}
`;
