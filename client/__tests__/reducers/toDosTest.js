import expect from 'expect';

import toDos from '../../reducers/toDos';
import { ToDo } from '../../actions/types';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(toDos(undefined, [])).toEqual([]);
  });

  it('should handle CREATE_TODO_SUCCESS', () => {
    expect(toDos([], {
      type: ToDo.CREATE_TODO_SUCCESS,
      toDo: {
        toDoId: 3927492849028434,
        title: 'A new todo'
      }
    })).toEqual([
      {
        toDoId: 3927492849028434,
        title: 'A new todo'
      }
    ]);
  });

  it('should handle GET_TODOS_SUCCESS', () => {
    expect(toDos([], {
      type: ToDo.GET_TODOS_SUCCESS,
      toDos: [
        {
          toDoId: 3927492849028434,
          title: 'A new todo'
        }
      ]
    })).toEqual([
      {
        toDoId: 3927492849028434,
        title: 'A new todo'
      }
    ]);
  });
});
