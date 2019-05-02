import { useMachine } from '@xstate/react';
import { SundialMachine } from './machine';
import { useMemo } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import { SunlightWindow } from '../../definitions';

type SundialState = 'calibrating' | 'beforeSunrise' | 'day' | 'afterSunset';

const SUNLIGHT_WINDOWS_QUERY = gql`
  query SunlightWindows(
    $ianaTimezone: String!
    $yesterdayDate: Date!
    $todayDate: Date!
    $tomorrowDate: Date!
  ) {
    yesterday: sunlightWindow(ianaTimezone: $ianaTimezone, onDate: $yesterdayDate) {
      sunriseUtc
      sunsetUtc
    }
    today: sunlightWindow(ianaTimezone: $ianaTimezone, onDate: $todayDate) {
      sunriseUtc
      sunsetUtc
    }
    tomorrow: sunlightWindow(ianaTimezone: $ianaTimezone, onDate: $tomorrowDate) {
      sunriseUtc
      sunsetUtc
    }
  }
`;

function dateFromUtcString(utcString: string): Date {
  const [dateString, timeString] = utcString.split('T');
  const [fullYear, month, date] = dateString.split('-');
  const [hour, minute, secondString] = timeString.split(':');
  const [second, microsecond] = secondString.split('.');

  const utcDate = Date.UTC(
    parseInt(fullYear),
    parseInt(month) - 1,
    parseInt(date),
    parseInt(hour),
    parseInt(minute),
    parseInt(second),
    microsecond ? parseInt(microsecond) / 1000 : 0
  );
  return new Date(utcDate);
}

function pluckSunlightWindow({
  sunriseUtc,
  sunsetUtc
}: {
  sunriseUtc: string;
  sunsetUtc: string;
}): SunlightWindow {
  return {
    sunrise: dateFromUtcString(sunriseUtc),
    sunset: dateFromUtcString(sunsetUtc)
  };
}

function twoDigits(number: number): string {
  return `0${number}`.slice(-2);
}

function localDateString(date: Date): string {
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;
}

function getVariables() {
  const today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  let tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return {
    todayDate: localDateString(today),
    yesterdayDate: localDateString(yesterday),
    tomorrowDate: localDateString(tomorrow),
    ianaTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

export default function useSundial(): [SundialState] {
  const client = useApolloClient();
  const [current] = useMachine(
    SundialMachine.withConfig({
      services: {
        fetchSunlightWindows: async () => {
          const response: any = await client.query({
            query: SUNLIGHT_WINDOWS_QUERY,
            variables: getVariables()
          });
          const sunlightWindows = {
            yesterday: pluckSunlightWindow(response.data.yesterday),
            today: pluckSunlightWindow(response.data.today),
            tomorrow: pluckSunlightWindow(response.data.tomorrow)
          };
          return sunlightWindows;
        }
      }
    }),
    { devTools: true }
  );

  const state = useMemo<SundialState>(() => {
    if (current.matches('calibrating')) {
      return 'calibrating';
    }
    if (current.matches('beforeSunrise')) {
      return 'beforeSunrise';
    }
    if (current.matches('day')) {
      return 'day';
    }
    if (current.matches('afterSunset')) {
      return 'afterSunset';
    }
    throw new Error();
  }, [current]);

  return [state];
}
