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
const getToDosFailure = error => (
  {
    type: ToDo.GET_TODOS_SUCCESS,
    error,
  }
);

const getToDos = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/v1/todos/');
    dispatch(getToDosSuccess(data.toDos));
  } catch (error) {
    dispatch(getToDosFailure(error));
  }
};

export default getToDos;
