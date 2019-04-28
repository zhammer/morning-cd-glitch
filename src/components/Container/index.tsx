import React from 'react';
import styled, { css } from '../../custom/styled-components';
import { roundedCorners } from '../../styles/mixins';
import { borderSize } from '../../styles/variables';

const Title = styled.p``;

const Base = styled.div<{ title?: string }>`
  position: relative;
  padding: 1.5rem 2rem;
  border-color: black;
  border-style: solid;
  border-width: 4px;

  ${({ title, theme }) =>
    title &&
    title !== '' &&
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
  title?: string;
}

function Container({ title, children, ...rest }: ContainerProps) {
  return (
    <Base title={title} {...rest}>
      {title && title !== '' && <Title>{title}</Title>}
      {children}
    </Base>
  );
}

const Square = styled(Container)<{ title?: string }>``;

const Rounded = styled(Container)<{ title?: string }>`
  ${roundedCorners(false)};
  padding: 1rem 1.5rem;
  margin: ${borderSize};

  ${({ title }) =>
    title &&
    title !== '' &&
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
