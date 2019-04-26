import styled from '../../custom/styled-components';
import { mobileBreakpoint } from '../../styles/variables';
import { keyframes } from 'styled-components';

const fadein = keyframes`
  from { opacity: 0 }
  to   { opacity: 1 }
`;

const Page = styled.div`
  width: 90%;
  margin: 0 auto;
  animation: ${fadein} 0.25s linear both;
  margin-bottom: 2em;
  padding-top: 2em;

  @media screen and (min-width: ${mobileBreakpoint}) {
    width: 55%;
    padding-top: 5em;
  }
`;

export default Page;
