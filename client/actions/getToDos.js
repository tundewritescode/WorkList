import axios from 'axios';

import { ToDo } from './types';

/**
 * Get todos success action
 *
 * @param {Object} toDos - toDos info to be dispatched
 *
 * @returns {Object} - action type and payload
 */
const getToDosSuccess = toDos => (
  {
    type: ToDo.GET_TODOS_SUCCESS,
    toDos,
  }
);

/**
 * Get todos failure action
 *
 * @param {Object} error - error data to be dispatched
 *
 * @returns {Object} - action type and payload
 */
const getToDosFailure = () => (
  {
    type: ToDo.GET_TODOS_SUCCESS,
  }
);

/**
 * Get todos action creattor
 *
 * @returns {function} - dispatch function
 */
const getToDos = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/todos/');
    dispatch(getToDosSuccess(data.toDos));
  } catch (error) {
    localStorage.clear();
    dispatch(getToDosFailure());
  }
};

export default getToDos;
