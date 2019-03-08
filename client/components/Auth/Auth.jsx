import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import 'babel-polyfill';

import setUser from './../../actions/setUser';

export default (ComposedComponent) => {
  /**
   * @class Auth
   * @extends {Component}
   */
  class Auth extends Component {
    /**
     * Pre sets the user data to the redux store
     * @memberof Authenticate
     *
     * @returns {void}
     */
    componentWillMount() {
      this.props.setUser(null, null, this.props.pathName);
    }

    /**
     * Renders any child component passed to it
     * @memberof Authenticate
     *
     * @returns {void}
     */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Auth.propTypes = {
    setUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    pathName: PropTypes.string.isRequired
  };

  const mapDispatchToProps = dispatch => (
    bindActionCreators({ setUser }, dispatch)
  );

  const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    pathName: state.route.location.pathname
  });

  return connect(mapStateToProps, mapDispatchToProps)(Auth);
};

