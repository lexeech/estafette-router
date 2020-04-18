import * as React from 'react';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';

import { CreateRouter, Routes } from 'components/CreateRouter/CreateRouter';

import { Link } from './Link';

describe('<Link />', () => {
  const history = createBrowserHistory({});

  const createRoute = (route: Routes) => <CreateRouter history={history} routes={[route]} />;

  it('renders link correctly', () => {
    history.push('/home-page');

    const component = createRoute({
      name: 'home',
      path: '/home-page',
      component: () => <Link route="home">home link</Link>,
    });

    const { getByText } = render(component);

    expect((getByText('home link') as HTMLLinkElement).href).toContain('/home-page');
  });

  it('renders link  with params correctly', () => {
    history.push('/home-page/type/1');

    const component = createRoute({
      name: 'home',
      path: '/home-page/type/:type',
      component: () => (
        <Link route="home" params={{ type: 'test-type' }}>
          home link
        </Link>
      ),
    });

    const { getByText } = render(component);

    expect((getByText('home link') as HTMLLinkElement).href).toContain('/home-page/type/test-type');
  });
});
