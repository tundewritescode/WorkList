
import { Task } from './../actions/types';

const initialState = [];

/**
 * Tasks reducer
 *
 * @param {Object} state - current state
 * @param {Object} action - contains the action type and the payload
 *
 * @returns {Object} - returns the updated state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case Task.UPDATE_TASK_SUCCESS:
    {
      const taskToUpdate = state.filter(task => task.taskId
        === action.task.taskId)[0];

      const updatedTask = { ...taskToUpdate, ...action.task };

      return state.map((task) => {
        if (task.taskId === updatedTask.taskId) {
          return updatedTask;
        }
        return task;
      });
    }
    case Task.CREATE_TASK_SUCCESS:
      return [...state, action.task];
    case Task.GET_TASKS_SUCCESS:
      return action.tasks;
    default:
      return state;
  }
};
