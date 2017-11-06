import { combineReducers } from 'redux';
import { routerReducer as route } from 'react-router-redux';

import user from './user';
import toDos from './toDos';

/**
 * Combines all reducers into one giant reducer
 */
const reducers = combineReducers({
  user,
  toDos,
  route,
});

export default reducers;
