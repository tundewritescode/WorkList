import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import getTasks from './../../actions/getTasks';
import { Task } from './../../actions/types';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('getTasks', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should create an action to set tasks to store', () => {
    const tasks = [
      {
        taskId: '5a0e941a1721b32bbcc99202',
        toDoId: '5a0e93f21721b32bbcc99201',
        assignedTo: 'hgfghfhgf fhgf hfg',
        title: 'jhgjhgjhghjgj hgjhgh',
        priority: 'urgent',
        createdAt: '2017-11-17T07:47:38.135Z',
        dueDate: '2017-11-18T18:07:00.000Z'
      }
    ];

    const payload = {
      tasks
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: payload,
      });
    });

    const expectedAction = tasksPayload => ({
      type: Task.GET_TASKS_SUCCESS,
      tasks: tasksPayload
    });

    const store = mockStore({
      tasks: payload
    });

    return store.dispatch(getTasks('5a0e93f21721b32bbcc99201')).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction(tasks));
    });
  });
});
