import { Route, IndexRoute } from 'react-router';
import React from 'react';

import Home from './components/home';
import App from './components/app';
import PlayTournament from './components/play_tournament';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='play/:id' component={PlayTournament}/>
  </Route>
);
