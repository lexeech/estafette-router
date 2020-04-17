import * as React from 'react';
import { createBrowserHistory } from 'history';
import { render } from '@testing-library/react';
import { useHistory } from './useHistory';
import { CreateRouter, Routes } from '../components/CreateRouter';
import { fireEvent } from '@testing-library/react';

describe('useRouterHelpers()', () => {
  const history = createBrowserHistory({});

  const createRouterComponent = ({ history, routes }: { history: any; routes: Routes[] }) => (
    <CreateRouter history={history} routes={routes} />
  );

  const createRoute = ({ name, path, component }: { name: string; path: string; component: any }) =>
    createRouterComponent({
      history,
      routes: [
        { name: 'test_route', path: '/test/route', component: () => <span>test</span> },
        { name, path, component },
      ],
    });

  it('push()', () => {
    history.push('/home');

    const component = createRoute({
      name: 'home',
      path: '/home',
      component: () => {
        const { push } = useHistory();

        return <span onClick={() => push('test_route')}>click</span>;
      },
    });

    const { getByText } = render(component);

    fireEvent.click(getByText('click'));

    expect(history.location.pathname).toBe('/test/route');
  });
});
