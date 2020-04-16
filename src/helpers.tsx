import { Params } from './useRouterHelpers';
import { Routes } from './components/CreateRouter';

export const parseObject = (obj: { [key: string]: any }): string => {
  const str = [];

  for (const p in obj) {
    str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p]) || ''}`);
  }

  return `${str.length > 0 ? '?' : ''}${str.join('&')}`;
};

export const getRoute = (routes: Routes[], name: string, params?: Params): string => {
  const route = routes.find(item => item.name === name);

  if (route) {
    let { path } = { ...route };

    if (params) {
      Object.keys(params).map(key => (path = path.replace(`:${key}`, params[key])));

      return params.query ? `${path}${parseObject(params.query)}` : path;
    }

    return path;
  }

  return '';
};

export default {};
