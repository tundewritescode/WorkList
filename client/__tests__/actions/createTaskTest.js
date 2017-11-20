import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import createTask from './../../actions/createTask';
import { Task } from './../../actions/types';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('createTask', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should create an action to set task to store', () => {
    const data = {
      assignedTo: 'hgfghfhgf fhgf hfg',
      title: 'jhgjhgjhghjgj hgjhgh',
      priority: 'urgent',
    };

    const payload = {
      data
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 201,
        response: data,
      });
    });

    const expectedAction = task => ({
      type: Task.CREATE_TASK_SUCCESS,
      task
    });

    const store = mockStore({
      tasks: []
    });

    return store.dispatch(createTask(payload, '5a0e93f21721b32bbcc99201'))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedAction(payload.task));
      });
  });
});
