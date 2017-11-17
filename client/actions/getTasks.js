import axios from 'axios';

import { Task } from './types';

/**
 * Get tasks success action
 *
 * @param {Object} tasks - tasks info to be dispatched
 *
 * @returns {Object} - action type and payload
 */
const getTasksSuccess = tasks => (
  {
    type: Task.GET_TASKS_SUCCESS,
    tasks,
  }
);

/**
 * Get tasks failure action
 *
 * @param {Object} error - error data to be dispatched
 *
 * @returns {Object} - action type and payload
 */
const getTasksFailure = () => (
  {
    type: Task.GET_TASKS_FAILURE,
  }
);


/**
 * Create task action creator
 *
 * @param {string} toDoId - target todo
 *
 * @returns {function} - dispatch function
 */
const getTasks = toDoId => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/v1/todos/${toDoId}/tasks`);
    await localStorage.setItem('toDoId', toDoId);
    dispatch(getTasksSuccess(data.tasks));
  } catch (error) {
    dispatch(getTasksFailure());
  }
};

export default getTasks;
