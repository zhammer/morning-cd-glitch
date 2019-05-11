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
import Text from '../../components/Text';
import useSubmittedAfterLastSunrise from '../../hooks/useSubmittedAfterLastSunrise';
import Subtitle from '../../Subtitle';
import { Link } from 'react-router-dom';

type PageState = 'loading' | 'loaded.listensExist' | 'loaded.noListensExist' | 'loaded.error';

const titleByPageState: { [key in PageState]: JSX.Element | string } = {
  loading: 'Loading listens...',
  'loaded.listensExist':
    'Here are the first pieces of music people listened to today, from all over the world.',
  'loaded.noListensExist':
    'Nobody posted a listen to morning.cd today. Check back here later tonight. Morning.cd works all around the world, and it’s daytime somewhere.',
  'loaded.error': <Text.Error>There was an error getting today's listens.</Text.Error>
};

export default function ListensPage() {
  const { listens, loading, fetchMore, hasMore, loadingMore, error } = useFetchListens();
  const [timeOfDay] = useGnomon();
  const previousTimeOfDay = usePrevious(timeOfDay);
  const sunHasRisen = useMemo<boolean>(() => {
    return timeOfDay === 'day' && previousTimeOfDay === 'beforeSunrise';
  }, [timeOfDay, previousTimeOfDay]);
  const pageState = useMemo<PageState>(() => {
    if (error) return 'loaded.error';
    if (loading) return 'loading';
    if (listens.length === 0) return 'loaded.noListensExist';
    return 'loaded.listensExist';
  }, [listens, loading, error]);
  const submittedListenAfterLastSunrise = useSubmittedAfterLastSunrise();

  if (sunHasRisen) return <Redirect to='/question' />;
  return (
    <Page data-test='listens-page'>
      <Title>{titleByPageState[pageState]}</Title>
      {!loading && !submittedListenAfterLastSunrise && (
        <Subtitle>
          {timeOfDay === 'day' ? (
            <>
              <Link to='/question'>
                <Text.Success>Click here</Text.Success>
              </Link>{' '}
              to submit your listen!
            </>
          ) : (
            'You can only submit listens during the day. Come back at sunrise to submit yours!'
          )}
        </Subtitle>
      )}
      {pageState === 'loaded.listensExist' && (
        <>
          <List data-test='listens'>
            {listens.reverse().map(listen => (
              <Listen key={listen.id} listen={listen} />
            ))}
          </List>
          {hasMore && (
            <VisibilitySensor onChange={isVisible => isVisible && fetchMore()}>
              <LoadingMore data-test='more-listens-loader' active={loadingMore}>
                Loading more...
              </LoadingMore>
            </VisibilitySensor>
          )}
        </>
      )}
    </Page>
  );
}
