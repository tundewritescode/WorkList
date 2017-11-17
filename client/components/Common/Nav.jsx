import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Nav
 *
 * @param {Object} props
 * @returns {Object} - Nav component
 */
class Nav extends Component {
  /**
   * @returns {void}
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  /**
   * Renders the Nav Component
   *
   * @returns {Object} - the Nav component
   */
  render() {
    return (
      <nav>
        {this.props.children}
      </nav>
    );
  }
}

Nav.propTypes = {
  children: PropTypes.node.isRequired
};

export default Nav;
