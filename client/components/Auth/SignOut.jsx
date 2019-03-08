import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Signs user out
 *
 * @param {Object} props - passed down props
 *
 * @returns {Object} - the SignOUt component
 */
const SignOut = props => (
  <Link to="/" href="/" onClick={props.signOut}>Sign out</Link>
);

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired
};

export default SignOut;
