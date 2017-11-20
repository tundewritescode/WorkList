import expect from 'expect';

import tasks from '../../reducers/tasks';
import { Task } from '../../actions/types';


describe('tasks reducer', () => {
  it('should return the initial state', () => {
    expect(tasks(undefined, [])).toEqual([]);
  });

  it('should handle CREATE_TASK_SUCCESS', () => {
    expect(tasks([], {
      type: Task.CREATE_TASK_SUCCESS,
      task: {
        taskId: 3924982747,
        title: 'a new task',
        priority: 'normal',
        completed: false
      }
    })).toEqual([
      {
        taskId: 3924982747,
        title: 'a new task',
        priority: 'normal',
        completed: false
      }
    ]);
  });

  it('should handle GET_TASKS_SUCCESS', () => {
    expect(tasks([], {
      type: Task.GET_TASKS_SUCCESS,
      tasks: [
        {
          taskId: 3924982747,
          title: 'a new task',
          priority: 'normal',
          completed: false
        }
      ]
    })).toEqual([
      {
        taskId: 3924982747,
        title: 'a new task',
        priority: 'normal',
        completed: false
      }
    ]);
  });

  it('should handle UPDATE_TASK_SUCCESS', () => {
    expect(tasks([
      {
        taskId: 3924982747,
        title: 'a new task',
        priority: 'normal',
        completed: false
      }
    ], {
      type: Task.UPDATE_TASK_SUCCESS,
      task: {
        taskId: 3924982747,
        title: 'a new task',
        priority: 'normal',
        completed: true
      }
    })).toEqual([
      {
        taskId: 3924982747,
        title: 'a new task',
        priority: 'normal',
        completed: true
      }
    ]);
  });
});
