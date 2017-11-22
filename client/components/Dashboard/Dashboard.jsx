import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Nav from './../Common/Nav.jsx';
import Brand from './../Common/Brand.jsx';
import ToDo from './ToDo.jsx';
import Profile from './Profile.jsx';
import ChangeProfile from './ChangeProfile.jsx';
import CreateTask from './CreateTask.jsx';
import AddCollaborator from './AddCollaborator.jsx';
import SignOut from './../Auth/SignOut.jsx';

import addCollaborator from './../../actions/addCollaborator';
import createToDo from './../../actions/createToDo';
import getToDos from './../../actions/getToDos';
import signOut from './../../actions/signOut';

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
  componentDidMount() {
    this.props.getToDos();
  }
  /**
   * Handles onChange event on input fields
   *
   * @param {Object} event - the input field onChange event
   *
   * @memberof Dashboard
   *
   * @returns {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * Handles onSubit event on form submission
   *
   * @param {Object} event - the form onSubmit event
   *
   * @memberof SignUp
   *
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
                  <SignOut signOut={this.props.signOut} />
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
            <li className="show-on-medium-and-down">
              <SignOut signOut={this.props.signOut} />
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
              <div className="col l6 offset-l3 s12">
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
        <AddCollaborator
          key="add-collaborator"
          addCollaborator={this.props.addCollaborator}
        />
      </section>
    );
  }
}

Dashboard.propTypes = {
  createToDo: PropTypes.func.isRequired,
  getToDos: PropTypes.func.isRequired,
  toDos: PropTypes.arrayOf(PropTypes.object).isRequired,
  signOut: PropTypes.func.isRequired,
  addCollaborator: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addCollaborator, createToDo, getToDos, signOut
  }, dispatch)
);

const mapStateToProps = state => (
  {
    toDos: state.toDos
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
