import styled, { css } from '../../custom/styled-components';
import { Link } from 'react-router-dom';
import { cursorClickUrl } from '../../styles/variables';

const stylelessStyles = css`
  text-decoration: inherit;
  color: inherit;
  cursor: url(${cursorClickUrl});
  display: block;

  &:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: url(${cursorClickUrl});
  }
`;

const StylelessA = styled.a`
  ${stylelessStyles};
`;

const StylelessLink = styled(Link)`
  ${stylelessStyles};
`;

export default {
  Link: StylelessLink,
  a: StylelessA
};
