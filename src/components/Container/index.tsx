import React from 'react';
import styled, { css } from '../../custom/styled-components';
import { roundedCorners } from '../../styles/mixins';
import { borderSize } from '../../styles/variables';

const Title = styled.p.attrs({ 'data-test': 'container-title' })``;

const Base = styled.div.attrs({ 'data-test': 'container' })<{ containerTitle?: string }>`
  position: relative;
  padding: 1.5rem 2rem;
  border-color: black;
  border-style: solid;
  border-width: 4px;

  ${({ containerTitle, theme }) =>
    containerTitle &&
    containerTitle !== '' &&
    css`
      & > ${Title} {
        display: table;
        padding: 0 0.5rem;
        margin: -1.8rem 0 1rem;
        font-size: 1rem;
        background-color: ${theme.background};
      }
    `}
`;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  containerTitle?: string;
}

function Container({ containerTitle, children, ...rest }: ContainerProps) {
  return (
    <Base containerTitle={containerTitle} {...rest}>
      {containerTitle && containerTitle !== '' && <Title>{containerTitle}</Title>}
      {children}
    </Base>
  );
}

const Square = styled(Container)<{ containerTitle?: string }>``;

const Rounded = styled(Container)<{ containerTitle?: string }>`
  ${roundedCorners(false)};
  padding: 1rem 1.5rem;
  margin: ${borderSize};

  ${({ containerTitle }) =>
    containerTitle &&
    containerTitle !== '' &&
    css`
      & > ${Title} {
        margin-top: -1.5rem;
      }
    `};
`;

export default {
  Rounded,
  Square
};
