import axios from 'axios';
import toastr from 'toastr';

import { Profile } from './types';
import store from './../store';

/**
 * Create todo success action
 *
 * @param {Object} user - todo details
 *
 * @returns {Object} - action type and payload
 */
const uploadFileSuccesss = user => (
  {
    type: Profile.UPLOAD_FILE_SUCCESS,
    user
  }
);

/**
 * Create todo success action
 *
 * @param {Object} error - todo details
 *
 * @returns {Object} - action type and payload
 */
const uploadFileFailure = () => (
  {
    type: Profile.UPLOAD_FILE_FAILURE,
  }
);

/**
 * Upload file action creator
 *
 * @param {Object} file - file be uploaded
 *
 * @returns {function} - dispatch function
 */
const uploadFile = file => async (dispatch) => {
  try {
    const { data } = await axios.patch('/api/v1/avatar/upload', file);
    const { token } = store.getState().user;
    localStorage.setItem(
      'userData',
      JSON.stringify({ user: data.user, token })
    );
    dispatch(uploadFileSuccesss(data));
    $('#edit-profile').modal('close');
  } catch (error) {
    dispatch(uploadFileFailure());
    toastr.error(error.response.data.error);
  }
};

export default uploadFile;
