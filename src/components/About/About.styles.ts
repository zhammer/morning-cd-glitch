import styled, { css, keyframes } from '../../custom/styled-components';
import Button from '../Button';

const rise = keyframes`
  from { bottom: -60px; }
`;

interface ToggleButtonProps {
  on: boolean;
}

const baseStyles = css<ToggleButtonProps>`
  transition: transform 0.25s linear;
  transition-delay: ${props => (!props.on ? 0 : 0.25)}s;
  position: fixed;
  right: 2rem;
  bottom: 25px;
  z-index: ${props => (props.on ? 2 : 1)};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
`;

export const HelpButton = styled(Button.Warning)<ToggleButtonProps>`
  ${baseStyles}
  transform: rotate3d(0, 1, 0, ${props => (props.on ? 0 : -90)}deg);
  animation: ${rise} 0.5s 1s ease both;
`;

export const CloseButton = styled(Button.Error)<ToggleButtonProps>`
  ${baseStyles}
  transform: rotate3d(0, 1, 0, ${props => (props.on ? 0 : 90)}deg);
`;
