import { Machine, assign, send } from 'xstate';

type Context = {
  coins: number;
};

type Schema = {
  states: {
    idle: {};
    active: {};
    succeeded: {};
    failed: {
      states: {
        hasntAttemptedAgain: {};
        hasAttemptedAgain: {};
      };
    };
  };
};

type Event = { type: 'BUMP' } | { type: 'CHECK_SUCCEEDED' };

export default Machine<Context, Schema, Event>(
  {
    initial: 'idle',
    context: {
      coins: 0
    },
    states: {
      idle: {
        on: {
          BUMP: {
            target: 'active',
            actions: 'incrementCoins'
          }
        }
      },
      active: {
        after: {
          5000: 'failed'
        },
        on: {
          BUMP: {
            actions: ['incrementCoins', send('CHECK_SUCCEEDED')]
          },
          CHECK_SUCCEEDED: {
            target: 'succeeded',
            cond: 'hasTenCoins'
          }
        }
      },
      failed: {
        initial: 'hasntAttemptedAgain',
        states: {
          hasntAttemptedAgain: {
            on: {
              BUMP: {
                target: 'hasAttemptedAgain',
                actions: 'incrementCoins' // just to be true to the game
              }
            }
          },
          hasAttemptedAgain: {
            type: 'final'
          }
        }
      },
      succeeded: {
        type: 'final'
      }
    }
  },
  {
    actions: {
      incrementCoins: assign({ coins: context => context.coins + 1 })
    },
    guards: {
      hasTenCoins: context => context.coins === 10
    }
  }
);
