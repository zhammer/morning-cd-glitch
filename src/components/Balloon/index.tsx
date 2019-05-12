import styled from '../../custom/styled-components';
import { roundedCorners } from '../../styles/mixins';

const Base = styled.div`
  ${roundedCorners};
  position: relative;
  display: inline-block;
  padding: 1rem 1.5rem;
  margin: 8px;
  margin-bottom: 30px;
  background-color: ${props => props.theme.background};

  > :last-child {
    margin-bottom: 0;
  }

  &::before,
  &::after {
    position: absolute;
    content: '';
  }
`;

const FromLeft = styled(Base)`
  &::before,
  &::after {
    left: 2rem;
  }

  &::before {
    bottom: -14px;
    width: 26px;
    height: 10px;
    background-color: ${props => props.theme.background};
    border-right: 4px solid ${props => props.theme.base};
    border-left: 4px solid ${props => props.theme.base};
  }

  &::after {
    bottom: -18px;
    width: 18px;
    height: 4px;
    margin-right: 8px;
    color: ${props => props.theme.base};
    background-color: ${props => props.theme.background};
    box-shadow: -4px 0, 4px 0, -4px 4px ${props => props.theme.background}, 0 4px, -8px 4px,
      -4px 8px, -8px 8px;
  }
`;

const FromRight = styled(Base)`
  &::before,
  &::after {
    right: 2rem;
  }

  &::before {
    bottom: -14px;
    width: 26px;
    height: 10px;
    background-color: ${props => props.theme.background};
    border-right: 4px solid ${props => props.theme.base};
    border-left: 4px solid ${props => props.theme.base};
  }

  &::after {
    bottom: -18px;
    width: 18px;
    height: 4px;
    margin-left: 8px;
    background-color: ${props => props.theme.background};
    box-shadow: -4px 0, 4px 0, 4px 4px ${props => props.theme.background}, 0 4px, 8px 4px, 4px 8px,
      8px 8px;
  }
`;

export default {
  FromRight,
  FromLeft
};
