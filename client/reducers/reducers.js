import { combineReducers } from 'redux';
import { routerReducer as route } from 'react-router-redux';

import user from './user';

const reducers = combineReducers({
  user,
  route
});

export default reducers;
