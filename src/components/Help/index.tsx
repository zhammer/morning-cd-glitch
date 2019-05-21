import React, { useState } from 'react';
import { CloseButton, HelpButton } from './Help.styles';
import Styleless from '../Styleless';
import useReactRouter from 'use-react-router';

export default function Help() {
  const { location, history } = useReactRouter();
  const onAboutPage = location.pathname === '/about';
  const [startedOnAboutPage] = useState(() => onAboutPage);

  function handleCloseClicked() {
    const from = location.state && location.state.from;
    if (from) {
      history.push(from);
    } else {
      history.push('/');
    }
  }
  return (
    <>
      <CloseButton onClick={handleCloseClicked} on={onAboutPage}>
        X
      </CloseButton>
      <Styleless.Link
        to={{
          pathname: '/about',
          state: { from: { pathname: location.pathname, search: location.search } }
        }}
      >
        <HelpButton on={!onAboutPage} rise={!startedOnAboutPage}>
          ?
        </HelpButton>
      </Styleless.Link>
    </>
  );
}
