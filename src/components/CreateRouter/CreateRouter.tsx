import * as React from 'react';

import { RoutesContext } from 'components/RoutesContext';
import { RoutesGroup } from 'components/RoutesGroup';
import { Route } from 'components/Route';

export interface Routes {
  name: string;
  path: string;
  component: any;
  suspense?: string;
  exact?: boolean;
}

interface CreateRouterProps {
  history?: any;
  routes: Routes[];
  renderSuspense?: React.FC<any>;
}

export const CreateRouter: React.FC<CreateRouterProps> = ({ history, routes }) => (
  <RoutesContext.Provider value={{ routes }}>
    <RoutesGroup history={history}>
      {routes.map(({ name, ...route }) => (
        <Route key={name} {...route} />
      ))}
    </RoutesGroup>
  </RoutesContext.Provider>
);

export default {};
