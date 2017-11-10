import axios from 'axios';

import { Task } from './types';

/**
 * Create task success action
 *
 * @param {Object} task - task details
 *
 * @returns {Object} - action type and payload
 */
const createTaskSuccess = task => (
  {
    type: Task.CREATE_TASK_SUCCESS,
    task,
  }
);

/**
 * Create task failure action
 *
 * @param {Object} error - error data to be dispatched
 *
 * @returns {Object} - action type and payload
 */
const createTaskFailure = error => (
  {
    type: Task.CREATE_TASK_FAILURE,
    error,
  }
);

/**
 * Create Task action creator
 *
 * @param {Object} task - task data
 * @param {string} toDoId - targeted todo
 *
 * @returns {function} - dispatch function
 */
const createTask = (task, toDoId) => async (dispatch) => {
  try {
    const { data } = await axios
      .post(`/api/v1/todos/${toDoId}/tasks/create`, task);
    dispatch(createTaskSuccess(data.task));
    $('#create-task').modal('close');
  } catch (error) {
    dispatch(createTaskFailure(error));
  }
};

export default createTask;
