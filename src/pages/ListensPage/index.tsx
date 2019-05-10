import React, { useMemo } from 'react';
import Page from '../../components/Page';
import Title from '../../components/Title';
import Listen from './Listen';
import useFetchListens from './useFetchListens';
import List from '../../components/List';
import { useGnomon } from '../../hooks/useSundial';
import usePrevious from '../../hooks/usePrevious';
import { Redirect } from 'react-router';
import VisibilitySensor from 'react-visibility-sensor';
import { LoadingMore } from './ListenPage.styles';

const TITLE_LISTENS_EXIST =
  'Here are the first pieces of music people listened to today, from all over the world.';
const TITLE_NO_LISTENS_EXIST =
  'Nobody posted a listen to morning.cd today. Check back here later tonight. Morning.cd works all around the world, and it’s daytime somewhere.';

export default function ListensPage() {
  const { listens, loading, fetchMore, hasMore, loadingMore } = useFetchListens();
  const [timeOfDay] = useGnomon();
  const previousTimeOfDay = usePrevious(timeOfDay);
  const sunHasRisen = useMemo<boolean>(() => {
    return timeOfDay === 'day' && previousTimeOfDay === 'beforeSunrise';
  }, [timeOfDay, previousTimeOfDay]);

  if (sunHasRisen) return <Redirect to='/question' />;
  return (
    <Page>
      <Title>{listens.length === 0 ? TITLE_NO_LISTENS_EXIST : TITLE_LISTENS_EXIST}</Title>
      {loading ? (
        <div>Loading...</div>
      ) : (
        listens.length > 0 && (
          <>
            <List data-test='listens'>
              {listens.reverse().map(listen => (
                <Listen key={listen.id} listen={listen} />
              ))}
            </List>
            {hasMore && (
              <VisibilitySensor onChange={isVisible => isVisible && fetchMore()}>
                <LoadingMore active={loadingMore}>Loading more...</LoadingMore>
              </VisibilitySensor>
            )}
          </>
        )
      )}
    </Page>
  );
}
