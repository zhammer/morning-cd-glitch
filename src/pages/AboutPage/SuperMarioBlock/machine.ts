import { Machine, assign } from 'xstate';

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
        hasntBumpedAfterFail: {};
        hasBumpedAfterFail: {};
      };
    };
  };
};

type Event = { type: 'BUMP' };

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
          BLOCK_ACTIVE_DURATION: 'failed'
        },
        on: {
          BUMP: [
            {
              target: 'succeeded',
              cond: 'hasTenCoins'
            },
            {
              actions: 'incrementCoins'
            }
          ]
        }
      },
      failed: {
        initial: 'hasntBumpedAfterFail',
        states: {
          hasntBumpedAfterFail: {
            on: {
              BUMP: {
                target: 'hasBumpedAfterFail',
                actions: 'incrementCoins' // just to be true to the game
              }
            }
          },
          hasBumpedAfterFail: {
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
    delays: {
      BLOCK_ACTIVE_DURATION: 7.5e3
    },
    guards: {
      hasTenCoins: context => context.coins === 10
    }
  }
);
