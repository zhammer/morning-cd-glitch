import React from 'react';
import { CloseButton, HelpButton } from './AboutToggle.styles';
import useAboutPageOpen from './useAboutPageOpen';

export default function AboutToggle() {
  const [aboutPageOpen, setAboutPageOpen] = useAboutPageOpen();
  return (
    <>
      <CloseButton
        data-test='close-about-page'
        onClick={() => setAboutPageOpen(false)}
        on={aboutPageOpen}
      >
        X
      </CloseButton>
      <HelpButton
        data-test='open-about-page'
        onClick={() => setAboutPageOpen(true)}
        on={!aboutPageOpen}
      >
        ?
      </HelpButton>
    </>
  );
}

export { useAboutPageOpen };
