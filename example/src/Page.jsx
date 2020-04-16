import React from 'react';
import { Link, useRouterHelpers, useHistory } from 'estafette-router';

const LinkText = ({ active, label }) => (active ? <b>{label}</b> : <span>{label}</span>);

export const Page = ({ pageName = 'Page' }) => {
  const history = useHistory();
  const { getRoute, isRouteActive } = useRouterHelpers();

  const onGoHome = () => history.push('HomePage');

  return (
    <div>
      <ul>
        <li>
          <Link route="IndexPage">
            <LinkText active={isRouteActive('IndexPage')} label={`Index (path: ${getRoute('IndexPage')})`} />
          </Link>
        </li>

        <li>
          <Link route="HomePage">
            <LinkText active={isRouteActive('HomePage')} label={`Home (path: ${getRoute('HomePage')})`} />
          </Link>
        </li>

        <li>
          <Link route="AboutPage" params={{ query: { debug: 'true' } }}>
            <LinkText active={isRouteActive('AboutPage')} label={`About (path: ${getRoute('AboutPage')})`} />
          </Link>
        </li>
      </ul>

      {pageName}

      <div>
        <button onClick={onGoHome}>go home</button>
      </div>
    </div>
  );
};
