import { Auth } from './types';

/**
 * sign out action
 *
 * @returns {Object} - action type and payload
 */
const signOutSuccess = () => (
  {
    type: Auth.SIGN_OUT_SUCCESS,
  }
);

/**
 * Signs user out
 *
 * @returns {function} - dispatch function
 */
const signOut = () => (dispatch) => {
  localStorage.clear();
  dispatch(signOutSuccess());
};

export default signOut;
