import React from 'react';
import { Link, useRouterHelpers, useRouteMatch } from 'estafette-router';

export const Page = ({ pageName = 'Page' }) => {
  const { isRouteActive } = useRouterHelpers();
  const match = useRouteMatch();

  console.log(match);

  return (
    <div>
      <ul>
        <li>
          <Link route="IndexPage">{isRouteActive('IndexPage') ? <b>Index</b> : <span>Index</span>}</Link>
        </li>

        <li>
          <Link route="HomePage">{isRouteActive('HomePage') ? <b>Home</b> : <span>Home</span>}</Link>
        </li>

        <li>
          <Link route="AboutPage" params={{ query: { debug: 'true' } }}>
            {isRouteActive('AboutPage') ? <b>About</b> : <span>About</span>}
          </Link>
        </li>
      </ul>

      {pageName}
    </div>
  );
};
