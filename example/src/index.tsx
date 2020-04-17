import * as React from 'react';
import { render } from 'react-dom';
import { CreateRouter } from 'estafette-router';
import { Page } from './Page';

const routes = [
  { name: 'IndexPage', path: '/', component: Page, exact: true },
  { name: 'HomePage', path: '/home', component: Page },
  { name: 'AboutPage', path: '/about-page', component: Page },
];

render(<CreateRouter routes={routes} />, document.getElementById('root'));
