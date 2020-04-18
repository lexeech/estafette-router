import * as React from 'react';
import { Redirect as OldRedirect } from 'react-router-dom';
import { useRouterHelpers } from '../hooks/useRouterHelpers/useRouterHelpers';

type Params = { [key: string]: any };

interface Props {
  from?: string;
  to?: string;

  fromRoute?: string;
  fromParams?: Params;
  toRoute?: string;
  toParams?: Params;
}

export const Redirect: React.FC<Props> = ({ from, to, fromRoute, toRoute, fromParams, toParams, ...props }) => {
  const { getRoute } = useRouterHelpers();

  return (
    <OldRedirect
      {...props}
      {...(fromRoute || from ? (fromRoute ? getRoute(fromRoute, fromParams) : from) : {})}
      to={toRoute ? getRoute(toRoute, toParams) || '' : to || ''}
    />
  );
};

export default {};
