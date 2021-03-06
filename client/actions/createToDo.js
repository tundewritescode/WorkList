import axios from 'axios';
import toastr from 'toastr';

import { ToDo } from './types';

/**
 * Create todo success action
 *
 * @param {Object} toDo - todo details
 *
 * @returns {Object} - action type and payload
 */
const createToDoSuccess = toDo => (
  {
    type: ToDo.CREATE_TODO_SUCCESS,
    toDo,
  }
);

/**
 * Create todo failure action
 *
 * @param {Object} error - error data to be dispatched
 *
 * @returns {Object} - action type and payload
 */
const createToDoFailure = () => (
  {
    type: ToDo.CREATE_TODO_FAILURE,
  }
);

/**
 * Create todo action creator
 *
 * @param {Object} toDo - todo data
 *
 * @returns {function} - dispatch function
 */
const createToDo = toDo => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/v1/todos', toDo);
    dispatch(createToDoSuccess(data.toDo));
  } catch (error) {
    dispatch(createToDoFailure(error));
    toastr.error(error.response.data.error);
  }
};

export default createToDo;
