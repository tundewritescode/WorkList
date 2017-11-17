import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';

import { Auth } from './../../actions/types';
import signOut from './../../actions/signOut';

const mockStore = configureMockStore([thunk]);

global.window = {
  location: url => url
};

describe('signOut', () => {
  it('should create a sign out error action', () => {
    const expectedAction = () => ({
      type: Auth.SIGN_OUT_SUCCESS
    });

    const store = mockStore();

    store.dispatch(signOut());
    expect(store.getActions()[0]).toEqual(expectedAction());
  });
});
