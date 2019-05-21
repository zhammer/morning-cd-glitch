import styled from '../../custom/styled-components';

export const Body = styled.div`
  margin-top: 1em;
  & > h3 {
    margin-bottom: 0;
  }
`;

export const ShareIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 2em;
  & > * {
    margin-right: 0.5em;
  }
`;

export const SpotifyLink = styled.a`
  color: ${props => props.theme.success.normal};
  &:hover {
    color: ${props => props.theme.success.hover};
  }
  &:visited {
    color: ${props => props.theme.success.shadow};
  }
  & > svg {
    height: 1em;
  }
`;
