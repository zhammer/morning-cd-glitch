import styled from '../../custom/styled-components';

export default styled.div<{ display: boolean }>`
  ${props => !props.display && 'display: none;'}
`;
