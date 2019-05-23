import React from 'react';
import { useMachine } from '@xstate/react';
import SuperMarioBlockMachine from './machine';
import Icon from '../../../components/Icon';

export default function SuperMarioBlock() {
  const [current, send] = useMachine(SuperMarioBlockMachine, { devTools: true });
  console.log(current);
  function handleClick() {
    send('BUMP');
  }
  return (
    <div data-easter='🥚' onClick={handleClick}>
      {(current.matches('idle') ||
        current.matches('active') ||
        current.matches('failed.hasntAttemptedAgain')) && <Icon.BrickBlock />}
      {(current.matches('succeeded') || current.matches('failed.hasAttemptedAgain')) && (
        <Icon.DoneBlock />
      )}
    </div>
  );
}
