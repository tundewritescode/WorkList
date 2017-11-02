import { combineReducers } from 'redux';
import { routerReducer as route } from 'react-router-redux';

import user from './user';

/**
 * Combines all reducers into one giant reducer
 */
const reducers = combineReducers({
  user,
  route
});

export default reducers;
