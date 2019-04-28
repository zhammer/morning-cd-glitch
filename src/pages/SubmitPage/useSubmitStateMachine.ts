import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';

type SubmitStateMachineEvent = { type: 'ERROR' } | { type: 'SUBMIT' } | { type: 'SUCCESS' };
interface SubmitStateMachineSchema {
  states: {
    waiting: {};
    submitting: {};
    success: {};
    error: {};
  };
}

const submitStateMachine = Machine<any, SubmitStateMachineSchema, SubmitStateMachineEvent>({
  initial: 'waiting',
  states: {
    waiting: {
      on: {
        SUBMIT: 'submitting'
      }
    },
    submitting: {
      on: {
        ERROR: 'error',
        SUCCESS: 'success'
      }
    },
    success: { type: 'final' },
    error: { type: 'final' }
  }
});

type state = 'waiting' | 'submitting' | 'error' | 'success';
type action = 'SUBMIT' | 'ERROR' | 'SUCCESS';

export default function useSubmitStateMachine(): [state, (action: action) => void] {
  const [current, send] = useMachine(submitStateMachine);
  return [current.value as state, send];
}
