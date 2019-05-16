import styled from '../../custom/styled-components';
import { mobileBreakpoint } from '../../styles/variables';

const Page = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-top: 2em;

  @media screen and (min-width: ${mobileBreakpoint}) {
    width: 55%;
    padding-top: 5em;
  }
`;

export default Page;
