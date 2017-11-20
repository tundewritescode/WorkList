import React from 'react';
import PropTypes from 'prop-types';

/**
 * Signs user out
 *
 * @param {Object} props - passed down props
 *
 * @returns {Object} - the SignOUt component
 */
const SignOut = props => (
  <a href="/" onClick={props.signOut}>Sign out</a>
);

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default SignOut;
