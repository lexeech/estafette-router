import * as React from 'react';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';

import { CreateRouter, Routes } from 'components/CreateRouter/CreateRouter';

import { Redirect } from './Redirect';

describe('<Redirect />', () => {
  const history = createBrowserHistory({});

  const createRoutes = (routes: Routes[]) => <CreateRouter history={history} routes={routes} />;

  it('redirects to another page', () => {
    history.push('/home-page');

    const component = createRoutes([
      {
        name: 'home',
        path: '/home-page',
        component: () => <Redirect fromRoute="home" toRoute="about" />,
      },
      {
        name: 'about',
        path: '/about-page',
        component: () => <span>about page</span>,
      },
    ]);

    const { getByText } = render(component);

    expect(getByText('about page')).toBeTruthy();
  });
});
