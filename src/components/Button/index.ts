import styled, { css } from '../../custom/styled-components';
import { compactRoundedCorners } from '../../styles/mixins';
import { borderSize, cursorClickUrl } from '../../styles/variables';

const buttonColorStyles = (
  color: string,
  background: string,
  hoverBackground: string,
  shadow: string
) => css`
  color: ${color};
  background-color: ${background};

  &:enabled {
    &::after {
      box-shadow: inset -4px -4px ${shadow};
    }
  }

  &::after {
    position: absolute;
    top: -${borderSize};
    right: -${borderSize};
    bottom: -${borderSize};
    left: -${borderSize};
    content: '';
  }

  &:hover,
  &:focus {
    text-decoration: none;
    background-color: ${hoverBackground};
    cursor: inhert;

    &:enabled::after {
      box-shadow: inset -6px -6px ${shadow};
    }
  }

  &:active:enabled::after {
    box-shadow: inset 4px 4px ${shadow};
  }
`;

const Base = styled.button`
  ${compactRoundedCorners};

  ${({ theme }) =>
    buttonColorStyles(theme.base, theme.default.normal, theme.default.hover, theme.default.shadow)}

  position: relative;
  display: inline-block;
  padding: 6px 8px;
  margin: ${borderSize};
  text-align: center;
  vertical-align: middle;
  cursor: url(${cursorClickUrl}), pointer;
  user-select: none;

  &:focus {
    outline: 0;
  }
  &::after {
    box-shadow: inset -4px -4px ${props => props.theme.default.shadow};
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:focus {
    color: ${props => props.theme.base};
    cursor: not-allowed;
    background-color: ${props => props.theme.disabled.normal};
    box-shadow: inset -4px -4px ${props => props.theme.disabled.shadow};
    opacity: 0.6;
  }
`;

const Primary = styled(Base)`
  ${({ theme }) =>
    buttonColorStyles(
      theme.background,
      theme.primary.normal,
      theme.primary.hover,
      theme.primary.shadow
    )}
`;

const Success = styled(Base)`
  ${({ theme }) =>
    buttonColorStyles(
      theme.background,
      theme.success.normal,
      theme.success.hover,
      theme.success.shadow
    )}
`;

const Warning = styled(Base)`
  ${({ theme }) =>
    buttonColorStyles(theme.base, theme.warning.normal, theme.warning.hover, theme.warning.shadow)}
`;

const Error = styled(Base)`
  ${({ theme }) =>
    buttonColorStyles(theme.background, theme.error.normal, theme.error.hover, theme.error.shadow)}
`;

export default {
  Primary,
  Success,
  Warning,
  Error
};
