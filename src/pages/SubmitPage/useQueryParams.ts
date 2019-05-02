import useReactRouter from 'use-react-router';
import qs from 'query-string';

export default function useQueryParams() {
  const { location } = useReactRouter();
  return qs.parse(location.search);
}
