import styled from '../../custom/styled-components';
import { mobileBreakpoint } from '../../styles/variables';

const Base = styled.div`
  & > label {
    display: block;
  }
  & input,
  & textarea {
    display: block;
  }
`;

const Block = styled(Base)``;

const Inline = styled(Base)`
  display: block;
  & > label {
    margin-bottom: 0.5rem;
    text-align: left;
  }
  & input {
    max-width: 100%;
  }

  @media screen and (min-width: ${mobileBreakpoint}) {
    display: flex;
    align-items: center;
    & > label {
      flex-basis: 0;
      flex-grow: 1;
      margin: 0;
      margin-right: 1.5rem;
      text-align: right;
    }

    & input,
    & textarea {
      flex-basis: 0;
      flex-grow: 5;
    }
  }
`;

export default {
  Block,
  Inline
};
