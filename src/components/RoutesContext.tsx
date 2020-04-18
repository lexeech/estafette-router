import * as React from 'react';

import { Routes } from 'components/CreateRouter/CreateRouter';

export const RoutesContext = React.createContext<{ routes: Routes[] }>({ routes: [] });

export default {};
