import gql from 'graphql-tag';
import useLocalApolloQuery from '../../hooks/useLocalApolloQuery';

const ABOUT_PAGE_OPEN_QUERY = gql`
  query AboutPageOpen {
    aboutPageOpen
  }
`;
interface AboutPageOpenQuery {
  aboutPageOpen: boolean;
}

export default function useAboutPageOpen(): [boolean, (open: boolean) => void] {
  const [{ aboutPageOpen }, writeQuery] = useLocalApolloQuery<AboutPageOpenQuery>(
    ABOUT_PAGE_OPEN_QUERY
  );
  function setAboutPageOpen(open: boolean) {
    writeQuery({ aboutPageOpen: open });
  }
  return [aboutPageOpen, setAboutPageOpen];
}
