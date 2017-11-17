import { ToDo } from './../actions/types';

const initialState = [];

/**
 * Todos reducer
 *
 * @param {Object} state - current state
 * @param {Object} action - contains the action type and the paylod
 *
 * @returns {Object} - returns the updated state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ToDo.GET_TODOS_SUCCESS:
      return [...state, ...action.toDos];
    case ToDo.CREATE_TODO_SUCCESS:
      return [action.toDo, ...state];
    default:
      return state;
  }
};
