import axios from 'axios';

/**
 * Sets axios token for API calls
 *
 * @param {string} token - jwt token
 *
 * @returns {void}
 */
export default (token) => {
  if (token) {
    axios.defaults.headers.common.token = token;
  }
};
