import { assign, Machine, send } from 'xstate';
import { SunlightWindow, SunlightWindows } from '../../definitions';

type TimeOfDay = 'beforeSunrise' | 'day' | 'afterSunset';

function timeOfDay(time: Date, day: SunlightWindow): TimeOfDay {
  if (time < day.sunrise) {
    return 'beforeSunrise';
  } else if (time > day.sunset) {
    return 'afterSunset';
  } else {
    return 'day';
  }
}

function midnightAfter(datetime: Date): Date {
  var midnight = new Date(datetime);
  midnight.setHours(24, 0, 0, 0);
  return midnight;
}

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
};
type SunlightWindowsEvent = { type: 'SUNLIGHT_WINDOWS'; sunlightWindows: SunlightWindows };
type Event =
  | SunlightWindowsEvent
  | { type: 'CALIBRATE_TO_BEFORE_SUNRISE' }
  | { type: 'CALIBRATE_TO_AFTER_SUNSET' }
  | { type: 'CALIBRATE_TO_DAY' }
  | { type: 'RECALIBRATED' };

function isSunlightWindowsEvent(event: Event): event is SunlightWindowsEvent {
  return event.hasOwnProperty('sunlightWindows');
}

export const SundialMachine = Machine<Context, Schema, Event>({
  initial: 'calibrating',
  id: 'sundial',
  context: {},
  states: {
    calibrating: {
      on: {
        SUNLIGHT_WINDOWS: {
          actions: [
            assign<Context, SunlightWindowsEvent>({
              sunlightWindows: (_, event) => event.sunlightWindows
            }),
            send<Context, Event>((_, event) => {
              if (!isSunlightWindowsEvent(event)) {
                throw new Error();
              }
              switch (timeOfDay(new Date(), event.sunlightWindows.today)) {
                case 'beforeSunrise':
                  return { type: 'CALIBRATE_TO_BEFORE_SUNRISE' };
                case 'afterSunset':
                  return { type: 'CALIBRATE_TO_AFTER_SUNSET' };
                case 'day':
                  return { type: 'CALIBRATE_TO_DAY' };
              }
            })
          ]
        },
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
            }),
            'refetchSunlightWindows'
          ],
          on: {
            SUNLIGHT_WINDOWS: {
              actions: [
                assign<Context, SunlightWindowsEvent>({
                  sunlightWindows: (_, event) => event.sunlightWindows
                }),
                send('RECALIBRATED')
              ]
            },
            RECALIBRATED: 'beforeSunrise.default'
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
              target: 'day'
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
