import styled from '../../custom/styled-components';
import { compactRoundedCorners } from '../../styles/mixins';
import { cursorClickUrl } from '../../styles/variables';

export const Backdrop = styled.div<{ hidden: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: hsla(0, 0%, 44%, 0.27);
  ${props => props.hidden && 'visibility: hidden;'}
`;

export const Content = styled.div<{ hidden: boolean }>`
  padding: 1.5rem 2rem;
  ${compactRoundedCorners};
  position: fixed;
  display: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.background};
  ${props => props.hidden && 'visibility: hidden;'}
`;

export const CloseButton = styled.button`
  cursor: url(${cursorClickUrl}), auto;
  right: 0;
  top: 0;
  position: absolute;
  background: none;
  border: none;
  transform: scale(0.5);
  padding: 0;
`;
