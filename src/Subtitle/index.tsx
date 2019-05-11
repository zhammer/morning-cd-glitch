import React from 'react';
import styled from '../custom/styled-components';

const SubtitleContainer = styled.div`
  margin-bottom: 1.75em;
  & > hr {
    border-color: ${props => props.theme.primary.hover};
  }
`;

const SubtitleBody = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

interface SubtitleProps {
  children?: React.ReactNode;
}

export default function Subtitle({ children }: SubtitleProps) {
  return (
    <SubtitleContainer data-test='subtitle'>
      <hr />
      <SubtitleBody>{children}</SubtitleBody>
      <hr />
    </SubtitleContainer>
  );
}
