import styled from '../../custom/styled-components';

export const LoadingMore = styled.div<{ active: boolean }>`
  opacity: ${props => (props.active ? '1' : '0')};
`;
