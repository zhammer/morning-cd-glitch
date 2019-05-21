import styled, { css, keyframes } from '../../custom/styled-components';
import Button from '../Button';

const rise = keyframes`
  from { bottom: -60px; }
`;

export const HelpButton = styled(Button.Warning)<{ on: boolean; rise: boolean }>`
  transition: transform 0.25s linear;
  transition-delay: ${props => (!props.on ? 0 : 0.25)}s;
  transform: rotate3d(0, 1, 0, ${props => (props.on ? 0 : -90)}deg);
  position: fixed;
  right: 2rem;
  bottom: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
  ${props =>
    props.rise &&
    css`
      animation: ${rise} 0.5s 1s ease both;
    `};
`;

export const CloseButton = styled(Button.Error)<{ on: boolean }>`
  transition: transform 0.25s linear;
  transition-delay: ${props => (!props.on ? 0 : 0.25)}s;
  transform: rotate3d(0, 1, 0, ${props => (props.on ? 0 : 90)}deg);
  position: fixed;
  right: 2rem;
  bottom: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
`;
