import { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { getRoute as getRouteFromRoutes, getRouteByPath as getRouteByPathFromRoutes } from '../../libs/helpers/helpers';

import { RoutesContext } from '../../components/RoutesContext';

export type Params = { [key: string]: any };

export const useRouterHelpers = () => {
  const match = useRouteMatch();
  const { routes } = useContext(RoutesContext);

  const getRoute = (name: string, params?: Params): string => getRouteFromRoutes(routes, name, params);

  const getRouteByPath = () => getRouteByPathFromRoutes(routes, match.path);

  const isUrlActive = (urls: string[] | string): boolean => {
    if (Array.isArray(urls)) {
      return urls.filter((url) => match.url === url).length > 0;
    }

    return match.url === urls;
  };

  const isRouteActive = (names: string | string[], defaultParams?: Params): boolean => {
    const { url, params } = match;

    if (Array.isArray(names)) {
      return names.filter((name) => url === getRoute(name, { ...params, ...defaultParams })).length > 0;
    }

    return url === getRoute(names, { ...params, ...defaultParams });
  };

  return {
    getRoute,
    getRouteByPath,
    isUrlActive,
    isRouteActive,
  };
};

// fix rollup error
export default {};
