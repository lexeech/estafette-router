import * as React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getRoute as getRouteFromRoutes } from './helpers/helpers';
import { RoutesContext } from './components/RoutesContext';

export type Params = { [key: string]: any };

export const useRouterHelpers = () => {
  const match = useRouteMatch();
  const { routes } = React.useContext(RoutesContext);

  const getRoute = (name: string, params?: Params): string => getRouteFromRoutes(routes, name, params);

  const getRouteByPath = (): string => {
    const { name = '' } = routes.find((item) => item.path === match.path) || {};

    return name;
  };

  const isExactRouteActive = (urls: string[] | string): boolean => {
    if (Array.isArray(urls)) {
      return urls.filter((url) => match.url === url).length > 0;
    }

    return match.url === urls;
  };

  const isRouteActive = (urls: string | string[], defaultParams?: Params): boolean => {
    const { url, params } = match;

    if (Array.isArray(urls)) {
      return urls.filter((routeUrl) => url === getRoute(routeUrl, { ...params, ...defaultParams })).length > 0;
    }

    return url === getRoute(urls, { ...params, ...defaultParams });
  };

  return {
    getRoute,
    getRouteByPath,
    isExactRouteActive,
    isRouteActive,
  };
};

// fix rollup error
export default {};
