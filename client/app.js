import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';

import Skeleton from './components/Skeleton';
import GameDetails from './containers/GameDetails';
import GamesList from './containers/GamesList';
import NewAction from './containers/NewAction';
import store from './store';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Skeleton}>
        <IndexRoute component={GamesList}/>
        <Route path="/game/:gid/action/new" component={NewAction}/>
        <Route path="/game/:gid" component={GameDetails}/>
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#app')
);
