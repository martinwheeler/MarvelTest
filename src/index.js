import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './reducers';
import App from './App';

injectTapEventPlugin();

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
