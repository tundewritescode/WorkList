import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import history from './utils/history';
import reducers from './reducers/reducers';

const store = createStore(
  reducers,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  compose(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
