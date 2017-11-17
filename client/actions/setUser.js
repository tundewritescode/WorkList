import axios from 'axios';

import { Auth } from './types';
import history from './../utils/history';
import setAuthToken from './../utils/setAuthToken';

/**
 * Set user success action
 *
 * @param {Object} user - user details
 *
 * @returns {Object} - action type and payload
 */
const setUserSuccess = user => (
  {
    type: Auth.SET_USER_SUCCESS,
    user
  }
);

/**
 * Set user failure action
 *
 * @param {Object} error - error information
 *
 * @returns {Object} - action type and payload
 */
const setUserFailure = () => (
  {
    type: Auth.SET_USER_FAILURE,
  }
);

/**
 * Set user action creator
 *
 * @param {Object} credentials - user sign in or sign up data
 * @param {string} method - specifies what happens to the supplied credentials
 * @param {string} location - specifies the url to redirect the user to
 *
 * @returns {function} - dispatch function
 */
const setUser = (credentials, method, location = '/dashboard') =>
  async (dispatch) => {
    try {
      if (credentials && method) {
        const { data } =
          await axios.post(`/api/v1/users/${method}`, credentials);
        localStorage.setItem('userData', JSON.stringify(data));
        setAuthToken(data.token);
        dispatch(setUserSuccess(data));
        history.push(location);
      } else if (localStorage.userData) {
        const userData = JSON.parse(localStorage.userData);
        setAuthToken(userData.token);
        dispatch(setUserSuccess(userData));
        history.push('/dashboard');
      } else {
        history.push('/');
      }
    } catch (error) {
      dispatch(setUserFailure());
    }
  };

export default setUser;
