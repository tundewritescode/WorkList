import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Nav
 *
 * @param {Object} props
 * @returns {Object} - Nav component
 */
class Nav extends Component {
  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  render() {
    return (
      <nav>
        {this.props.children}
      </nav>
    )
  };
}

Nav.propTypes = {
  children: PropTypes.node.isRequired
};

export default Nav;
