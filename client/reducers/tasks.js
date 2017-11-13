
import { Task } from './../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case Task.UPDATE_TASK_SUCCESS:
      return state.map((task) => {
        if (task.taskId !== action.task.taskId) {
          return task;
        }
        return {
          ...task,
          completed: action.task.completed
        };
      });
    case Task.CREATE_TASK_SUCCESS:
      return [...state, action.task];
    case Task.GET_TASKS_SUCCESS:
      return action.tasks;
    default:
      return state;
  }
};
