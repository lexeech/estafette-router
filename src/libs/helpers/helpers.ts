import { Params } from '../../hooks/useRouterHelpers/useRouterHelpers';
import { Routes } from '../../components/CreateRouter/CreateRouter';

export const parseObject = (obj: { [key: string]: any }): string => {
  const str = [];

  for (const p in obj) {
    str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p]) || ''}`);
  }

  return `${str.length > 0 ? '?' : ''}${str.join('&')}`;
};

export function parseQuery<T extends object>(queryString: string): T {
  if (queryString !== '') {
    const query: any = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

    let i = 0;
    for (i; i < pairs.length; i += 1) {
      const pair = pairs[i].split('=');

      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }

    return query;
  }

  return {} as T;
}

export const getRoute = (routes: Routes[], name: string, params?: Params): string => {
  const route = routes.find((item) => item.name === name);

  if (route) {
    let { path } = { ...route };

    if (params) {
      Object.keys(params).map((key) => (path = path.replace(`:${key}`, params[key])));

      return params.query ? `${path}${parseObject(params.query)}` : path;
    }

    return path;
  }

  return '';
};

export const getRouteByPath = (routes: Routes[], path: string): string => {
  const { name = '' } = routes.find((item) => item.path === path) || {};

  return name;
};

export default {};
