import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import createTask from './../../actions/createTask';

/**
 * @class CreateTask
 */
class CreateTask extends Component {
  /**
   * Creates an instance of CreateTask
   */
  constructor() {
    super();

    this.initialState = {
      title: '',
      priority: '',
      assignedTo: '',
      dueDate: '',
      dueTime: '',
    };

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Ensuers the CreateTask modal always renders
   *
   * @returns {void}
   */
  componentDidMount() {
    $('.modal').modal();
    $('select').material_select();
  }

  /**
   * Handles the changes in the sign in form
   *
   * @param {Object} event - the input field onChange event
   *
   * @memberof SignIn
   *
   * @return {void}
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * Handles sign in form submission
 *
 * @param {any} form
 *
 * @memberof SignIn
 *
 * @returns {void}
 */
  handleSubmit(form) {
    form.preventDefault();
    const formDate = Date.parse(`${this.state.dueDate}T${this.state.dueTime}Z`);
    this.props.createTask({
      ...this.state,
      dueDate: new Date(formDate)
    }, this.props.toDoId);
    this.setState(this.initialState);
  }

  /**
  * Renders the SignIn component
  *
  * @returns {object} - the jsx component
  */
  render() {
    return (
      <div id="create-task" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Create Task</h5>
            <form
              onSubmit={this.handleSubmit}
              className="col s12"
            >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="title">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="assignedTo"
                    name="assignedTo"
                    value={this.state.assignedTo}
                    onChange={this.handleChange}
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="title">Assign to</label>
                </div>

                <div className="input-field col s6">
                  <div className="row">
                    <select name="priority"
                      className="browser-default"
                      value={this.state.priority}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled defaultValue>Priority</option>
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <h6>Set deadline</h6>
                <div className="input-field col s6">
                  <input
                    id="dueDate"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.handleChange}
                    type="date"
                    required
                  />
                </div>
                <div className="input-field col s6">
                  <input
                    id="dueTime"
                    name="dueTime"
                    value={this.state.dueTime}
                    onChange={this.handleChange}
                    type="time"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button
                    className="btn btn-large waves-effect waves-light"
                    type="submit"
                    name="action"
                  >Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  toDoId: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ createTask }, dispatch)
);

export default connect(null, mapDispatchToProps)(CreateTask);
