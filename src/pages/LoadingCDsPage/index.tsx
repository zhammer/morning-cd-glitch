import React from 'react';
import styled from '../../custom/styled-components';
import ProgressBarLoader from '../../components/ProgressBarLoader';

const FullScreenCenter = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  width: 70%;

  & > span {
    margin-bottom: 0.5em;
  }
`;

export default function LoadingCDsPage() {
  return (
    <FullScreenCenter data-test='loading-cds-page'>
      <ProgressBarContainer>
        <span>Loading CDs...</span>
        <ProgressBarLoader />
      </ProgressBarContainer>
    </FullScreenCenter>
  );
}
