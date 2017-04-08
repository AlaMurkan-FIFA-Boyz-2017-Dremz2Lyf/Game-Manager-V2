import { Router, browserHistory } from 'react-router';
import React from 'react';

import Home from './components/home';
import App from './components/app';


const routeConfigs = {
  component: App,
  path: '/',
  indexRoute: { component: Home },
  childRoutes: [
    {
      path: 'play/:id',
      getComponent(location, cb) {
        System.import('./components/play_tournament').then(module => cb(null, module.default)).catch(err => cb(err, null));
      }
    }
  ]
};

const Routes = () => (
  <Router history={browserHistory} routes={routeConfigs}/>
);

export { Routes as default };
