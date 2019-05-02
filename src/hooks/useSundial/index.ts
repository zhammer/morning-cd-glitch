import { useMachine } from '@xstate/react';
import { SundialMachine } from './machine';
import { useMemo, useEffect } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from 'react-apollo-hooks';
import useLocalApolloQuery from '../useLocalApolloQuery';
import { TimeOfDay } from './types';
import { localDateString, pluckSunlightWindow } from './util';

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
  useEffect(() => {
    client.writeQuery({
      query: SUNDIAL_QUERY,
      data: {
        sundial: {
          state,
          __typename: 'Sundial'
        }
      }
    });
  }, [state, client]);
}

/**
 * The gnomon is the part of the sundial that casts a shadow.
 */
export function useGnomon(): [SundialState] {
  const [data] = useLocalApolloQuery<{ sundial: { state: SundialState } }>(SUNDIAL_QUERY);
  return [data.sundial.state];
}
