import axios from 'axios';

import { Task } from './types';

/**
 * Update task success aciton
 *
 * @param {Object} task - updated tasks data
 *
 * @returns {Object} - action type and payload
 */
const updateTaskSuccess = task => (
  {
    type: Task.UPDATE_TASK_SUCCESS,
    task,
  }
);

/**
 * Edit profile success aciton
 *
 * @param {Object} error - error message
 *
 * @returns {Object} - action type and payload
 */
const updateTaskFailure = error => (
  {
    type: Task.UPDATE_TASK_FAILURE,
    error,
  }
);

const updateTask = (newTaskData, toDoId, taskId) => async (dispatch) => {
  try {
    const { data } = await axios
      .patch(`/api/v1/todos/${toDoId}/tasks/${taskId}`, newTaskData);
    dispatch(updateTaskSuccess(data));
  } catch (error) {
    dispatch(updateTaskFailure(error));
  }
};

export default updateTask;
