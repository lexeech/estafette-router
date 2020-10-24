import * as React from 'react';
import { render } from 'react-dom';
import { CreateRouter, Link, Redirect, useHistory, useParams } from 'estafette-router';

const IndexPage = (): React.ReactNode => (
  <div>
    <Link route="ListPage" params={{ page: 1 }}>
      Go to list
    </Link>

    <Link route="ListPage" params={{ page: 12, query: { total_pages: 10 } }}>
      Go to last page
    </Link>
  </div>
);

const LIstPage = (): React.ReactNode => {
  const { page } = useParams<{ page: string }>();
  const { queries } = useHistory();

  console.log(queries);

  const totalPages = (queries.total_pages && Number(queries.total_pages)) || 10;
  if (Number(page) > totalPages) {
    return <Redirect toRoute="ListPage" toParams={{ page: totalPages }} />;
  }

  return <div>A regular list</div>;
};

// create router
render(
  <CreateRouter
    routes={[
      { name: 'IndexPage', path: '/', exact: true, component: IndexPage },
      { name: 'ListPage', path: '/list/:page', exact: true, component: LIstPage },
    ]}
  />,
  document.getElementById('root'),
);
