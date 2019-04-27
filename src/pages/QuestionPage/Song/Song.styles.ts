import styled, { keyframes } from '../../../custom/styled-components';
import Container from '../../../components/Container';

export const Columns = styled.div`
  display: flex;
`;

export const SongInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 0.75em;
`;

const blink = keyframes`
  from { border-image-width: 2 }
  to   { border-image-width: unset }
`;

export const SongContainer = styled(Container.Rounded)`
  &:hover,
  &:focus {
    animation: ${blink} 0.5s infinite both steps(2);
  }
`;
