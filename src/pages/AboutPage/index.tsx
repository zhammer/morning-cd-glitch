import React from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import Text from '../../components/Text';

export default function AboutPage() {
  return (
    <Page>
      <Title>Morning CD - 8bit!</Title>
      <h3>
        <Text.Primary>#</Text.Primary> About
      </h3>
      <p>
        This is the 8bit remake of Morning CD, a place where people from around the world can share
        the first piece of music they listen to each morning.
      </p>
      <h3>
        <Text.Primary>#</Text.Primary> Credits
      </h3>
      <p>
        Morning CD is created by Zach Hammer. The idea is inspired by Jody Avirgan's tweets. The
        8bit remake is styled with NES.css.
      </p>
    </Page>
  );
}
