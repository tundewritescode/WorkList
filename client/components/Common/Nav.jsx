import React from 'react';
import PropTypes from 'prop-types';

/**
 * Nav
 *
 * @param {Object} props
 * @returns {Object} - Nav component
 */
const Nav = props => (
  <nav>
    {props.children}
  </nav>
);

Nav.propTypes = {
  children: PropTypes.node.isRequired
};

export default Nav;
