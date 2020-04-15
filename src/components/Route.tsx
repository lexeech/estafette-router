import * as React from 'react';
import { Route as OldRoute, RouteProps as OldRouteProps, RouteComponentProps } from 'react-router-dom';
import { Routes } from './CreateRouter';

interface RouteProps extends Pick<Routes, Exclude<keyof Routes, 'name'>> {
  renderSuspense?: React.FC<any>;
  component: React.FC<OldRouteProps>;
  render?: (routeProps: RouteComponentProps) => JSX.Element;
}

export const Route: React.FC<RouteProps> = ({ renderSuspense, suspense, component: Component, render, ...route }) => (
  <OldRoute
    {...route}
    render={(routeProps): JSX.Element => (
      <React.Suspense fallback={renderSuspense || <span>Loading ...</span>}>
        {typeof render === 'function' ? render(routeProps) : <Component {...routeProps} />}
      </React.Suspense>
    )}
  />
);

export default {};
