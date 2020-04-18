import { useHistory as useOldHistory } from 'react-router-dom';
import { useRouterHelpers, Params } from '../useRouterHelpers/useRouterHelpers';

export const useHistory = () => {
  const { getRoute } = useRouterHelpers();
  const history = useOldHistory();

  const push = (route: string, params?: Params): void => history.push(getRoute(route, params));

  return {
    ...history,
    push,
  };
};
