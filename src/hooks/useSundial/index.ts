import { useMachine } from '@xstate/react';
import { SundialMachine } from './machine';
import { useMemo, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import useLocalApolloQuery from '../useLocalApolloQuery';
import { TimeOfDay } from './types';
import { localDateString, pluckSunlightWindow } from './util';
import { updatePersistedCache } from '../../apollo';

type SundialState = 'calibrating' | TimeOfDay;

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

const SUNDIAL_QUERY = gql`
  query Sundial {
    sundial {
      state
      lastSunrise
    }
  }
`;

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

export default function useSundial() {
  const { client } = useQuery(SUNDIAL_QUERY);
  const [current] = useMachine(
    SundialMachine.withConfig({
      services: {
        fetchSunlightWindows: async () => {
          const response: any = await client.query({
            query: SUNLIGHT_WINDOWS_QUERY,
            variables: getVariables()
          });
          const cachedSunlightWindows = pluckCachedSunlightWindows(client.cache);
          updatePersistedCache(cachedSunlightWindows);
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

  const { state, lastSunrise } = useMemo<SundialInfo>(() => {
    if (current.matches('calibrating')) {
      return { state: 'calibrating', lastSunrise: null };
    }
    const sunlightWindows = current.context.sunlightWindows;
    if (sunlightWindows === undefined) {
      throw new Error(
        `sundial machine ${current} isn't calibrating, but doesn't have sunlightWindows in its context.`
      );
    }
    if (current.matches('beforeSunrise')) {
      return { state: 'beforeSunrise', lastSunrise: sunlightWindows.yesterday.sunrise };
    }
    if (current.matches('day')) {
      return { state: 'day', lastSunrise: sunlightWindows.today.sunrise };
    }
    if (current.matches('afterSunset')) {
      return { state: 'afterSunset', lastSunrise: sunlightWindows.today.sunrise };
    }
    throw new Error();
  }, [current]);
  useEffect(() => {
    client.writeQuery({
      query: SUNDIAL_QUERY,
      data: {
        sundial: {
          state,
          lastSunrise: lastSunrise && lastSunrise.toISOString(),
          __typename: 'Sundial'
        }
      }
    });
  }, [state, client, lastSunrise]);
}

type SundialInfo = {
  state: SundialState;
  lastSunrise: Date | null;
};

/**
 * The gnomon is the part of the sundial that casts a shadow.
 */
export function useGnomon(): [SundialState, string | null] {
  const [data] = useLocalApolloQuery<{
    sundial: { state: SundialState; lastSunrise: string | null };
  }>(SUNDIAL_QUERY);
  return [data.sundial.state, data.sundial.lastSunrise];
}

function pluckCachedSunlightWindows(cache: any): object {
  let cachedSunlightWindows: { [key: string]: {} } = {};
  Object.entries(cache.data.data).forEach(([key, value]) => {
    if (key.startsWith('$ROOT_QUERY.sunlightWindow')) {
      cachedSunlightWindows[key.substring(12)] = value;
    }
  });
  return cachedSunlightWindows;
}
