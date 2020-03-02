import * as React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';

export const RoutesGroup: React.FC<{ history?: any }> = ({ history, children }) =>
  history ? <Router history={history}>{children}</Router> : <BrowserRouter>{children}</BrowserRouter>;

export default {};
