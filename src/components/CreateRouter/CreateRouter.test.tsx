import * as React from 'react';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';

import { RoutesContext } from 'components/RoutesContext';

import { Routes, CreateRouter } from './CreateRouter';

describe('<CreateRouter />', () => {
  const history = createBrowserHistory({});

  const createRoutes = (routes: Routes[]) => <CreateRouter history={history} routes={routes} />;

  it('renders route', () => {
    history.push('/route-example');

    const component = createRoutes([
      {
        name: 'route-example',
        path: '/route-example',
        component: () => <span>example of route</span>,
      },
    ]);

    const { getByText } = render(component);

    expect(getByText('example of route')).toBeTruthy();
  });

  it("has router's context", () => {
    history.push('/');

    const component = createRoutes([
      {
        name: 'index',
        path: '/',
        component: () => {
          const { routes } = React.useContext(RoutesContext);

          if (Array.isArray(routes) && routes.length === 1 && routes[0].name === 'index' && routes[0].path === '/') {
            return 'has context';
          }

          return 'has no context';
        },
      },
    ]);

    const { getByText } = render(component);

    expect(getByText('has context')).toBeTruthy();
  });
});
