# Installation

With [`yarn`](https://yarnpkg.com/):

```
yarn add estafette-router
```

With [`npm`](https://npmjs.org/):

```
npm install estafette-router
```

# Getting started

Steps:

- Create router
- Create list of routes
- Use Link, Redirect components
- Use useRouterHelpers, useHistory, useParams, useLocation, useRouteMatch hooks
- Use query parameters
- Use [`history`](https://github.com/ReactTraining/history)

#### Create router

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import { CreateRouter } from 'estafette-router';

render(<CreateRouter routes={routes} />, document.getElementById('root'));
```

#### Create list of routes

```jsx
import * as React from 'react';
import { Route } from 'estafette-router';

const IndexPage = (): React.ReactNode => <span>A regular page</span>;

const routes: Route[] = [{ name: 'IndexPage', path: '/', exact: true, component: IndexPage }];
```

#### Use Link, Redirect components

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import { CreateRouter, Link, Redirect, useParams } from 'estafette-router';

const IndexPage = (): React.ReactNode => (
  <div>
    <Link route="ListPage" params={{ page: 1 }}>
      Go to list
    </Link>

    <Link route="ListPage" params={{ page: 12 }}>
      Go to last page
    </Link>
  </div>
);

const ListPage = (): React.ReactNode => {
  const { page } = useParams();

  const totalPages = 10;
  if (page > totalPages) {
    return <Redirect toRoute="ListPage" toParams={{ page: totalPages }} />;
  }

  return <div>A regular list</div>;
};

// create router
render(
  <CreateRouter
    routes={[
      { name: 'IndexPage', path: '/', exact: true, component: IndexPage },
      { name: 'ListPage', path: '/list/:page', exact: true, component: ListPage },
    ]}
  />,
  document.getElementById('root'),
);
```

#### Use useRouterHelpers, useHistory hooks

Note: useParams, useLocation and useRouteMatch are the same as in react-router-dom.

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import { CreateRouter, useParams } from 'estafette-router';

const ListPage = (): React.ReactNode => {
  const { page } = useParams();
  const { push } = useHistory();

  const onEncrease = () => push('ListPage', { page: page + 1 });

  return (
    <div>
      A regular list
      <span onClick={onEncrease}>Encrease page</span>
    </div>
  );
};

// create router
render(
  <CreateRouter routes={[{ name: 'ListPage', path: '/list/:page', exact: true, component: ListPage }]} />,
  document.getElementById('root'),
);
```

#### Use query parameters

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import { CreateRouter, useHistory } from 'estafette-router';

const ListPage = (): React.ReactNode => {
  const { queries } = useHistory();

  const onEncrease = () => push('ListPage', { query: { page: queries.page + 1 } });

  return (
    <div>
      A regular list. Page: {queries.page}
      <span onClick={onEncrease}>Encrease page</span>
    </div>
  );
};

// create router
render(
  <CreateRouter routes={[{ name: 'ListPage', path: '/list', exact: true, component: ListPage }]} />,
  document.getElementById('root'),
);
```

#### Use history

```
yarn add history
```

or

```
npm install history
```

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import { CreateRouter, useHistory } from 'estafette-router';
import { createBrowserHistory } from 'history';

const routes = [{ name: 'Page', path: '/page/:type', component: Page }];

// note that it's outside of component, so you can import it everywhere and use.
export const history = createBrowserHistory < { location: { pathname: string } } > {};

// here you can listen to history changes outside the CreateRouter context
history.listen(() => {
  // here you can redirect to another page outside the CreateRouter context
  history.push(getRoute(routes, 'Page', { type: 'regular', query: { page: 1 } }));
});

const Page = (): React.ReactNode => <div>A regular page</div>;

// create router
render(<CreateRouter routes={routes} history={history} />, document.getElementById('root'));
```
