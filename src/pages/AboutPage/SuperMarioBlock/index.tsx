import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import SuperMarioBlockMachine from './machine';
import Icon from '../../../components/Icon';
import {
  BrickBlock,
  Coin,
  CoinContainer,
  Container,
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
    <Container data-easter='🥚' onClick={handleClick}>
      {(current.matches('idle') ||
        current.matches('active') ||
        current.matches('failed.hasntBumpedAfterFail')) && <BrickBlock bumping={bumping} />}
      {(current.matches('succeeded') || current.matches('failed.hasBumpedAfterFail')) && (
        <Icon.DoneBlock />
      )}
      {range(current.context.coins).map(index => (
        <CoinContainer key={index}>
          <Coin />
        </CoinContainer>
      ))}
      <FireFlowerContainer activated={current.matches('succeeded')}>
        <Icon.FireFlower.a />
        <Icon.FireFlower.b />
        <Icon.FireFlower.c />
        <Icon.FireFlower.d />
      </FireFlowerContainer>
    </Container>
  );
}

function range(count: number) {
  return [...Array(count).keys()];
}
