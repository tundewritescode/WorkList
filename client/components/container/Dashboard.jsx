import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Nav from './../presentational/Nav.jsx';
import Brand from './../presentational/Brand.jsx';
import ToDo from './../presentational/ToDo.jsx';
import createToDo from './../../actions/createToDo';

/**
 * Dashboard
 */
class Dashboard extends Component {
  /**
   *  Initializes
   */
  constructor() {
    super();
    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handles onChange event on input fields
   * @param {Object} event - the input field onChange event
   * @memberof Dashboard
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles onSubit event on form submission
   * @param {Object} event - the form onSubmit event
   * @memberof SignUp
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.createToDo(this.state);
    this.setState(this.initialState);
  }

  /**
   * Renders the Dasboard Component
   *
   * @returns {Object} - the dashboard component
   */
  render() {
    return (
      <section className="dashboard">
        <Nav>
          <div className="container-fluid">
            <div className="nav-wrapper">
              <Brand />
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link
                    to="/notifications"
                    href="/notifications"
                  ><i className="material-icons">notifications</i>
                  </Link>
                </li>
                <li>
                  <Link to="/" href="/">Sign out</Link>
                </li>
              </ul>
            </div>
          </div>

          <ul id="slide-out" className="side-nav fixed">
            <li>
              <div className="user-view avatar">
                <Image
                  cloudName="duc7lbtnq"
                  publicId="m8xeafikdw6rujskghd7"
                  width="140"
                  crop="scale"
                />
                <div className="name">
                  <Link to="/heye" href="/heye">Babatunde Adeyemi</Link>
                </div>
              </div>
            </li>
          </ul>
          <Link
            to=""
            href="/"
            data-activates="slide-out"
            className="button-collapse"
          >
            <i className="material-icons">menu</i>
          </Link>
        </Nav>

        <div className="content">
          <div className="row">
            <div className="container-">
              <div className="col l6 offset-l3">
                <div className="row">
                  <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="input-field col s12">
                      <input
                        id="title"
                        type="text"
                        name="title"
                        className="validate"
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                      <label htmlFor="title">Create a todo</label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="container">
              <div className="todos">
                <ToDo toDoId="sdfjsldfjl" title="Are you sick?" owner="Babatunde Adeyemi" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  createToDo: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ createToDo }, dispatch)
);

export default connect(null, mapDispatchToProps)(Dashboard);
