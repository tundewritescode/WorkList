import axios from 'axios';
import toastr from 'toastr';

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
const createTaskFailure = () => (
  {
    type: Task.CREATE_TASK_FAILURE,
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
      .post(`/api/v1/todos/${toDoId}/tasks`, task);
    dispatch(createTaskSuccess(data.task));
    $('#create-task').modal('close');
    toastr.success('Task created');
  } catch (error) {
    dispatch(createTaskFailure());
    toastr.error(error.response.data.error);
  }
};

export default createTask;
