import React from 'react';
import { CloseButton, HelpButton } from './About.styles';
import useAboutPageOpen from './useAboutPageOpen';

export default function About() {
  const [aboutPageOpen, setAboutPageOpen] = useAboutPageOpen();
  return (
    <>
      <CloseButton onClick={() => setAboutPageOpen(false)} on={aboutPageOpen}>
        X
      </CloseButton>
      <HelpButton onClick={() => setAboutPageOpen(true)} on={!aboutPageOpen}>
        ?
      </HelpButton>
    </>
  );
}
