import { assign, Machine, send } from 'xstate';
import { SunlightWindows } from '../../definitions';
import { timeOfDay, midnightAfter } from './util';

type Context = {
  sunlightWindows?: SunlightWindows;
};
type Schema = {
  states: {
    calibrating: {};
    beforeSunrise: {
      states: {
        recalibrating: {};
        default: {};
      };
    };
    day: {};
    afterSunset: {};
  };
  services: {
    fetchSunlightWindows: () => Promise<SunlightWindows>;
  };
};
type Event =
  | { type: 'CALIBRATE_TO_BEFORE_SUNRISE' }
  | { type: 'CALIBRATE_TO_AFTER_SUNSET' }
  | { type: 'CALIBRATE_TO_DAY' }
  | { type: 'RECALIBRATED' };

export const SundialMachine = Machine<Context, Schema, Event>({
  initial: 'calibrating',
  id: 'sundial',
  context: {},
  states: {
    calibrating: {
      invoke: {
        src: 'fetchSunlightWindows',
        onDone: {
          actions: [
            assign<any>({
              sunlightWindows: (_: any, event: any) => event.data
            }),
            send((_: any, event: any) => {
              switch (timeOfDay(new Date(), event.data.today)) {
                case 'beforeSunrise':
                  return { type: 'CALIBRATE_TO_BEFORE_SUNRISE' };
                case 'afterSunset':
                  return { type: 'CALIBRATE_TO_AFTER_SUNSET' };
                case 'day':
                  return { type: 'CALIBRATE_TO_DAY' };
                default:
                  throw new Error();
              }
            })
          ]
        }
      },
      on: {
        CALIBRATE_TO_BEFORE_SUNRISE: 'beforeSunrise',
        CALIBRATE_TO_AFTER_SUNSET: 'afterSunset',
        CALIBRATE_TO_DAY: 'day'
      }
    },
    beforeSunrise: {
      initial: 'default',
      states: {
        recalibrating: {
          entry: [
            // temporarily shift over sunlight windows while recalibrating
            assign<Context>({
              sunlightWindows: context => {
                if (!context.sunlightWindows) {
                  throw new Error();
                }
                return {
                  yesterday: context.sunlightWindows.today,
                  today: context.sunlightWindows.tomorrow,
                  tomorrow: context.sunlightWindows.tomorrow
                };
              }
            })
          ],
          invoke: {
            src: 'fetchSunlightWindows',
            onDone: {
              actions: [
                assign<any>({
                  sunlightWindows: (_: any, event: any) => event.data
                }),
                send('RECALIBRATED')
              ]
            }
          },
          on: {
            RECALIBRATED: '#sundial.beforeSunrise.default'
          }
        },
        default: {
          after: [
            {
              delay: context => {
                if (!context.sunlightWindows) {
                  throw new Error();
                }
                return context.sunlightWindows.today.sunrise.getTime() - new Date().getTime();
              },
              target: '#sundial.day'
            }
          ]
        }
      }
    },
    day: {
      after: [
        {
          delay: context => {
            if (!context.sunlightWindows) {
              throw new Error();
            }
            return context.sunlightWindows.today.sunset.getTime() - new Date().getTime();
          },
          target: 'afterSunset'
        }
      ]
    },
    afterSunset: {
      after: [
        {
          delay: context => {
            if (!context.sunlightWindows) {
              throw new Error();
            }
            return (
              midnightAfter(context.sunlightWindows.today.sunset).getTime() - new Date().getTime()
            );
          },
          target: 'beforeSunrise.recalibrating'
        }
      ]
    }
  }
});
