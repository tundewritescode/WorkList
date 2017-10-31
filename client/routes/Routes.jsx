import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import store from './../store';
import history from './../utils/history';
import Home from './../components/presentational/Home.jsx';
import SignUp from './../components/container/SignUp.jsx';
import SignIn from './../components/container/SignIn.jsx';
import Dashboard from './../components/container/Dashboard.jsx';
import NotFound from './../components/presentational/NotFound.jsx';
import Footer from './../components/presentational/Footer.jsx';

const Routes = () => (
  <Provider store={store}>
  <div>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
    <Footer />
    </div>
  </Provider>
);

export default Routes;
