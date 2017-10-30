import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'react-router-redux';

import routes from './routes';
import store from './../store';
import history from './../utils/history';

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>
);

export default Root;
