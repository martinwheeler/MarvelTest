import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducers from './reducers';
import App from './App';

injectTapEventPlugin();

const middleware = routerMiddleware(browserHistory);

const store = createStore(reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(thunk, middleware))
);

ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory} >
      <Route path="/(:type)(/:typeId)" component={App} />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
