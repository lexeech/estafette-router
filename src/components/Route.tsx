import * as React from 'react';
import { Route as OldRoute, RouteProps as OldRouteProps } from 'react-router-dom';
import { Routes } from './CreateRouter';

interface RouteProps extends Pick<Routes, Exclude<keyof Routes, 'name'>> {
  renderSuspense?: React.FC<any>;
  component: React.FC<OldRouteProps>;
}

export const Route: React.FC<RouteProps> = ({ renderSuspense, suspense, component: Component, ...route }) => (
  <OldRoute
    {...route}
    render={(routeProps): React.ReactNode => (
      <React.Suspense fallback={renderSuspense || <span>Loading ...</span>}>
        <Component {...routeProps} />
      </React.Suspense>
    )}
  />
);

export default {};
