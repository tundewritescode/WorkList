import { Auth, Profile } from './../actions/types';

const initialState = {
  isAuthenticated: false,
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
  token: '',
  error: '',
};

/**
 * User reducer
 *
 * @param {Object} state - current state
 * @param {Object} action - contains the action type and the paylod
 *
 * @returns {Object} - returns the updated state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case Auth.SET_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: !!Object.keys(action.user).length,
        userId: action.user.user.userId,
        firstName: action.user.user.firstName,
        lastName: action.user.user.lastName,
        email: action.user.user.email,
        avatar: action.user.user.avatar,
        token: action.user.token
      };
    case Profile.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        avatar: action.user.user.avatar,
      };
    case Profile.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        firstName: action.user.user.firstName,
        lastName: action.user.user.lastName,
      };
    case Auth.SET_USER_FAILURE:
      return {
        ...state,
        error: action.error.response.data.error,
      };
    default:
      return state;
  }
};
