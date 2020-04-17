import * as React from 'react';
import { Route as OldRoute } from 'react-router-dom';
import { Routes } from './CreateRouter';

interface RouteProps extends Pick<Routes, Exclude<keyof Routes, 'name'>> {
  renderSuspense?: React.FC<any>;
  component: React.FC<{ [key: string]: any }>;
  render?: (props: { [key: string]: any }) => JSX.Element;
}

export const Route: React.FC<RouteProps> = ({ renderSuspense, suspense, component: Component, render, ...route }) => (
  <OldRoute
    {...route}
    render={({ history, location, match, ...routeProps }): JSX.Element => {
      console.log(routeProps);

      return (
        <React.Suspense fallback={renderSuspense || <span>Loading ...</span>}>
          {typeof render === 'function' ? render(routeProps) : <Component {...routeProps} />}
        </React.Suspense>
      );
    }}
  />
);

export default {};
