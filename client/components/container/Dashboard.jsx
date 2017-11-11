import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Nav from './../presentational/Nav.jsx';
import Brand from './../presentational/Brand.jsx';
import ToDo from './../presentational/ToDo.jsx';
import Profile from './../container/Profile.jsx';
import ChangeProfile from './../container/ChangeProfile.jsx';
import CreateTask from './CreateTask.jsx';

import createToDo from './../../actions/createToDo';
import getToDos from './../../actions/getToDos';

/**
 * Dashboard
 */
class Dashboard extends Component {
  /**
   *  Initializes the Dashboard class
   */
  constructor() {
    super();

    this.initialState = {
      title: ''
    };

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Preloads all todo
   *
   * @returns {void}
   */
  componentWillMount() {
    this.props.getToDos();
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
    let toDos;
    if (this.props.toDos.length) {
      toDos = this.props.toDos.map(toDo => (
        <ToDo
          key={toDo.toDoId}
          toDoId={toDo.toDoId}
          title={toDo.title}
          owner={`${toDo.ownerId.firstName} ${toDo.ownerId.lastName}`}
        />
      ));
    }
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
                <Profile />
              </div>
            </li>
          </ul>
          <Link
            to="/"
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
                <div className="col s12">
                  <ul className="collapsible" data-collapsible="accordion">
                    {
                      toDos
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChangeProfile key="edit-profile" />
        <CreateTask key="create-task" />
      </section>
    );
  }
}

Dashboard.propTypes = {
  createToDo: PropTypes.func.isRequired,
  getToDos: PropTypes.func.isRequired,
  toDos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ createToDo, getToDos }, dispatch)
);

const mapStateToProps = state => (
  {
    toDos: state.toDos
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
