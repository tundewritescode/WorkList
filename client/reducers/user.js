import { Auth } from './../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  token: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Auth.SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user,
        token: action.token,
      };
    default:
      return state;
  }
};
