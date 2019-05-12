import styled, { keyframes } from '../../custom/styled-components';
import Button from '../Button';

const rise = keyframes`
  from { bottom: -60px; }
  to   { bottom: 25px;  }
`;

export const HelpButton = styled(Button.Warning)`
  position: fixed;
  right: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.6);
  animation: ${rise} 0.5s 1s ease both;
`;
