import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import store from './../store';
import history from './../utils/history';
import Auth from './../components/Auth/Auth.jsx';
import SignIn from './../components/Auth/SignIn.jsx';
import SignUp from './../components/Auth/SignUp.jsx';
import Home from './../components/Home/Home.jsx';
import Dashboard from './../components/Dashboard/Dashboard.jsx';
import NotFound from './../components/Miscellaneous/NotFound.jsx';
import Footer from './../components/Common/Footer.jsx';

const Routes = () => (
  <Provider store={store}>
    <div>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Auth(Home)} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/dashboard" component={Auth(Dashboard)} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
      <Footer />
    </div>
  </Provider>
);

export default Routes;
