import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import setUser from './../../actions/setUser';
import { Auth } from './../../actions/types';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('setUser', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should create an action to set user to store', () => {
    const data = {
      user: {
        userId: '5a0da6a4fe904f0e5fcfcde5',
        firstName: 'johnson',
        lastName: 'chinonso',
        email: 'johnson@gmail.net',
        avatar: 'user.png',
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTBkYTZhNGZlOTA0ZjBlNWZjZmNkZTUiLCJlbWFpbCI6ImpvaG5zb25AZ21haWwubmV0IiwiaWF0IjoxNTEwODQ0MDY5LCJleHAiOjE1MTA5MzA0Njl9.nQsLizr6XxycFBrrL1PF3ggqVSGHj1-YxiwxtoZjw4k'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: data,
      });
    });

    const expectedAction = user => ({
      type: Auth.SET_USER_SUCCESS,
      user
    });

    const store = mockStore({ user: {} });

    return store.dispatch(setUser(data, 'signin')).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction(data));
    });
  });

  it('should create an error action', () => {
    const data = {
      error: 'johnson@gmail.net already exists'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 409,
        response: data
      });
    });

    const expectedAction = () => ({
      type: Auth.SET_USER_FAILURE
    });

    const store = mockStore();

    return store.dispatch(setUser(data, 'signup')).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction(data));
    });
  });
});
