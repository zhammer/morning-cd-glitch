import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import SuperMarioBlockMachine from './machine';
import Icon from '../../../components/Icon';
import { BrickBlock } from './SuperMarioBlock.styles';

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
    <div data-easter='🥚' onClick={handleClick}>
      {(current.matches('idle') ||
        current.matches('active') ||
        current.matches('failed.hasntBumpedAfterFail')) && <BrickBlock bumping={bumping} />}
      {(current.matches('succeeded') || current.matches('failed.hasBumpedAfterFail')) && (
        <Icon.DoneBlock />
      )}
    </div>
  );
}
