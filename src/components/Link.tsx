import * as React from 'react';
import { Link as OldLink } from 'react-router-dom';
import { parseObject } from '../libs/helpers/helpers';
import { useRouterHelpers, Params } from '../hooks/useRouterHelpers/useRouterHelpers';

interface Props {
  to?: string;
  route?: string;
  query?: Params;
  params?: Params;
  disabled?: boolean;
  className?: string;
}

export const Link: React.FC<Props> = ({ to, route, query = {}, params = {}, children, disabled, className = '' }) => {
  const { getRoute } = useRouterHelpers();

  // prettier-ignore
  const toLinkParam = React.useMemo(() => route ? getRoute(route, params) : to, [route, to, params]);

  if (disabled) {
    return (
      // eslint-disable-next-line
      <a href="#" className={`disabled-link ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <OldLink
      to={`${toLinkParam || ''}${Object.keys(query).length > 0 ? `${parseObject(query)}` : ''}`}
      className={className}
    >
      {children}
    </OldLink>
  );
};

export default {};
