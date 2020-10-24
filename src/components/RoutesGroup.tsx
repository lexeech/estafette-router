import * as React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

import { History } from 'history';

export const RoutesGroup: React.FC<{ history?: History<History.PoorMansUnknown> }> = ({ history, children }) =>
  history ? <Router history={history}>{children}</Router> : <BrowserRouter>{children}</BrowserRouter>;

export default {};
