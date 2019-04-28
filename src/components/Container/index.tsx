import styled from '../../custom/styled-components';
import { roundedCorners } from '../../styles/mixins';
import { borderSize } from '../../styles/variables';

const Base = styled.div`
  position: relative;
  padding: 1.5rem 2rem;
  border-color: black;
  border-style: solid;
  border-width: 4px;
`;

const Rounded = styled(Base)`
  ${roundedCorners(false)};
  padding: 1rem 1.5rem;
  margin: ${borderSize};
`;

export default {
  Rounded
};
