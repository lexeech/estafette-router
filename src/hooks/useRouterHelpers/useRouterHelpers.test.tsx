import * as React from 'react';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';

import { CreateRouter, Routes } from 'components/CreateRouter/CreateRouter';

import { useRouterHelpers } from './useRouterHelpers';

describe('useRouterHelpers()', () => {
  const history = createBrowserHistory({});

  const createRoute = (route: Routes) => <CreateRouter history={history} routes={[route]} />;

  describe('getRoute()', () => {
    it('renders <a /> with correct link', () => {
      history.push('/test_a_href');

      const component = createRoute({
        name: 'test_a_href',
        path: '/test_a_href',
        component: () => {
          const { getRoute } = useRouterHelpers();

          return <a href={getRoute('test_a_href')}>test url</a>;
        },
      });

      const { getByText } = render(component);

      expect((getByText('test url') as HTMLLinkElement).href).toContain('/test_a_href');
    });
  });

  describe('getRouteByPath()', () => {
    it("renders correct route's name", () => {
      history.push('/test_route_name');

      const component = createRoute({
        name: 'test_route_name',
        path: '/test_route_name',
        component: () => {
          const { getRouteByPath } = useRouterHelpers();

          return <span>{getRouteByPath()}</span>;
        },
      });

      const { getByText } = render(component);

      expect(getByText('test_route_name')).toBeTruthy();
    });
  });

  describe('isUrlActive()', () => {
    const createComponent = (urls: string | string[]) =>
      createRoute({
        name: 'test_active',
        path: '/test_active',
        component: () => {
          const { isUrlActive } = useRouterHelpers();

          return <span>{isUrlActive(urls) ? 'active' : 'unactive'}</span>;
        },
      });

    it('matches active url from array of urls', () => {
      history.push('/test_active');

      const { getByText } = render(createComponent(['/test_active', '/test_active_1']));

      expect(getByText('active')).toBeTruthy();
    });

    it('matches active url from string', () => {
      history.push('/test_active');

      const { getByText } = render(createComponent('/test_active'));

      expect(getByText('active')).toBeTruthy();
    });

    it('does not match url router from array of urls', () => {
      history.push('/test_active');

      const { getByText } = render(createComponent(['/test_active_5', '/test_active_6']));

      expect(getByText('unactive')).toBeTruthy();
    });

    it('does not match active url from string', () => {
      history.push('/test_active');

      const { getByText } = render(createComponent('/test_active_2'));

      expect(getByText('unactive')).toBeTruthy();
    });
  });

  describe('isRouteActive()', () => {
    const createComponent = (names: string | string[]) =>
      createRoute({
        name: 'test_active',
        path: '/test_active',
        component: () => {
          const { isRouteActive } = useRouterHelpers();

          return <span>{isRouteActive(names) ? 'active' : 'unactive'}</span>;
        },
      });

    it('matches active url from array of names', () => {
      history.push('/test_active');

      const { getByText } = render(createComponent(['test_active', 'test_active_1']));

      expect(getByText('active')).toBeTruthy();
    });

    it('matches active url from name', () => {
      history.push('/test_active');

      const { getByText } = render(createComponent('test_active'));

      expect(getByText('active')).toBeTruthy();
    });

    it('does not match url router from array of names', () => {
      history.push('/test_active');

      const { getByText } = render(createComponent(['test_active_3', 'test_active_4']));

      expect(getByText('unactive')).toBeTruthy();
    });

    it('does not match active url from name', () => {
      history.push('/test_active');

      const { getByText } = render(createComponent('test_active_5'));

      expect(getByText('unactive')).toBeTruthy();
    });
  });
});
