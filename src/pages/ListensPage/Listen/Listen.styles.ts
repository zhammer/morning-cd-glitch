import styled, { keyframes } from '../../../custom/styled-components';
import Container from '../../../components/Container';
import { cursorClickUrl } from '../../../styles/variables';
import Text from '../../../components/Text';

const blink = keyframes`
  from { border-image-width: 2 }
  to   { border-image-width: unset }
`;

export const ListenContainer = styled(Container.Rounded)`
  &:hover {
    cursor: url(${cursorClickUrl}), auto;
  }
  &:hover,
  &:focus {
    animation: ${blink} 0.5s infinite both steps(2);
  }
`;

export const Note = styled(Text.Primary)`
  font-style: italic;
`;
