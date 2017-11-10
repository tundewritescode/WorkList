import { Task } from './../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case Task.CREATE_TASK_SUCCESS:
      return [action.task, ...state];
    case Task.GET_TASKS_SUCCESS:
      return action.tasks;
    default:
      return state;
  }
};
