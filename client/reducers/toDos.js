import { ToDo } from './../actions/types';

const initialState = [];

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
