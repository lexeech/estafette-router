import { useMemo } from 'react';
import { useHistory as useOldHistory } from 'react-router-dom';

import { parseQuery } from '../../libs/helpers/helpers';
import { useRouterHelpers, Params } from '../useRouterHelpers/useRouterHelpers';

export const useHistory = () => {
  const { getRoute } = useRouterHelpers();
  const history = useOldHistory();

  const push = (route: string, params?: Params): void => history.push(getRoute(route, params));

  const queries = useMemo(() => parseQuery<{ [key: string]: any }>(history.location.search), [history.location]);

  return {
    ...history,
    push,
    queries,
  };
};
