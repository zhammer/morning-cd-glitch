import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import SuperMarioBlockMachine from './machine';
import Icon from '../../../components/Icon';
import {
  BrickBlock,
  CoinContainer,
  Container,
  DoneBlock,
  FireFlowerContainer
} from './SuperMarioBlock.styles';

export default function SuperMarioBlock() {
  const [current, send] = useMachine(SuperMarioBlockMachine, { devTools: true });
  const [bumping, setBumping] = useState(false);
  function handleClick() {
    if (!bumping) {
      send('BUMP');
      setBumping(true);
      setTimeout(() => setBumping(false), 250);
    }
  }
  return (
    <Container
      data-easter='🥚'
      data-test='super-mario-block'
      onClick={handleClick}
      onMouseDown={e => e.preventDefault()}
    >
      {(current.matches('idle') ||
        current.matches('active') ||
        current.matches('failed.hasntBumpedAfterFail')) && (
        <BrickBlock data-test='brick-block' bumping={bumping} />
      )}
      {(current.matches('succeeded') || current.matches('failed.hasBumpedAfterFail')) && (
        <DoneBlock data-test='done-block' />
      )}
      {range(current.context.coins).map(index => (
        <CoinContainer key={index} data-test='coin'>
          <Icon.RetroCoin.a />
          <Icon.RetroCoin.b />
          <Icon.RetroCoin.c />
          <Icon.RetroCoin.d />
        </CoinContainer>
      ))}
      <a
        href='https://github.com/zhammer/morning-cd-8bit/pull/37'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FireFlowerContainer activated={current.matches('succeeded')} data-test='fire-flower'>
          <Icon.FireFlower.a />
          <Icon.FireFlower.b />
          <Icon.FireFlower.c />
          <Icon.FireFlower.d />
        </FireFlowerContainer>
      </a>
    </Container>
  );
}

function range(count: number) {
  return [...Array(count).keys()];
}
