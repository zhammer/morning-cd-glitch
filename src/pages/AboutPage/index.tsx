import React from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import Text from '../../components/Text';
import { Body, ShareIcons, SpotifyLink } from './AboutPage.styles';
import Icon from '../../components/Icon';
import Styleless from '../../components/Styleless';

const SHARE_URL = 'https://8bit.morningcd.com';
const SHARE_TEXT = `What was the first piece of music you listened to this morning? ${SHARE_URL}`;

export default function AboutPage() {
  return (
    <Page data-test='about-page'>
      <Title>Morning CD - 8bit!</Title>
      <Body>
        <h3>
          <Text.Primary>#</Text.Primary> About
        </h3>
        <p>
          This is the 8bit remake of <a href='https://morningcd.com'>Morning CD</a>, a website where
          people all around the world can share the first pieces of music they listen to each
          morning to make a daily{' '}
          <SpotifyLink
            href='https://open.spotify.com/user/8fueir54qwc1v07r1cdl3k4rx'
            target='_blank'
          >
            Spotify playlist <Icon.Spotify />
          </SpotifyLink>
          .
        </p>
        <h3>
          <Text.Primary>#</Text.Primary> Share
        </h3>
        <p>
          <ShareIcons>
            <Styleless.a
              style={{ height: '100%' }}
              href={`https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`}
              target='_blank'
            >
              <Icon.Facebook />
            </Styleless.a>
            <Styleless.a
              style={{ height: '100%' }}
              href={`https://twitter.com/intent/tweet?text=${SHARE_TEXT}`}
              target='_blank'
            >
              <Icon.Twitter />
            </Styleless.a>
            <Styleless.a
              style={{ height: '100%' }}
              href={`https://www.linkedin.com/cws/share?url=${SHARE_URL}`}
              target='_blank'
            >
              <Icon.LinkedIn />
            </Styleless.a>
            <Styleless.a
              style={{ height: '100%' }}
              href={`mailto:?subject=What was the first piece of music you listened to this morning?&body=${SHARE_TEXT}`}
            >
              <Icon.Gmail />
            </Styleless.a>
          </ShareIcons>
        </p>
        <h3>
          <Text.Primary>#</Text.Primary> Credits
        </h3>
        <p>
          Morning CD is created by{' '}
          <a href='https://www.linkedin.com/in/zach-hammer/'>Zach Hammer</a>. The idea is inspired
          by{' '}
          <a href='https://twitter.com/jodyavirgan/status/1079027426909450240'>
            Jody Avirgan's tweets
          </a>
          . This 8bit remake is styled with{' '}
          <a href='https://nostalgic-css.github.io/NES.css/'>NES.css</a>.
        </p>
        <h3>
          <Text.Primary>#</Text.Primary> View source
        </h3>
        <p>
          <ShareIcons>
            <Styleless.a
              style={{ height: '100% ' }}
              href='https://github.com/zhammer/morning-cd-8bit'
              target='_blank'
            >
              <Icon.Github />
            </Styleless.a>
            <Styleless.a
              style={{ height: '100% ' }}
              href='https://dashboard.cypress.io/#/projects/d43yi2/runs'
              target='_blank'
            >
              <Icon.Cypress />
            </Styleless.a>
          </ShareIcons>
        </p>
      </Body>
    </Page>
  );
}
