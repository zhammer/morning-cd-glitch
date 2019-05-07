import styled from '../../custom/styled-components';
import { cursorClickUrl } from '../../styles/variables';

export default styled.a`
  text-decoration: inherit;
  color: inherit;
  cursor: url(${cursorClickUrl});
  display: block;

  &:visited {
    text-decoration: inherit;
    color: inhert;
    cursor: url(${cursorClickUrl});
  }
`;
