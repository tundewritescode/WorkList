import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import updateTask from './../../actions/updateTask';

/**
 * Task
 */
class Task extends Component {
  /**
   * Instantials the task class
   */
  constructor(props) {
    super(props);

    this.initialState = {
      completed: this.props.completed
    };

    this.state = this.initialState;
    this.handleCheck = this.handleCheck.bind(this);
  }

  /**
   * Handles check eents
   *
   * @param {Object} event - the input check event
   *
   * @returns {void}
   */
  async handleCheck(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });

    this.props
      .updateTask(this.state, this.props.toDoId, this.props.taskId);
  }

  /**
   * @returns {Object} - the Task component
   */
  render() {
    return (
      <div className={['task', this.props.priority].join(' ')}>
        <input
          type="checkbox"
          name="completed"
          className="filled-in"
          id={this.props.taskId}
          checked={this.props.completed}
          onChange={this.handleCheck}
        />
        <label className={String(this.state.completed)} htmlFor={this.props.taskId}>{this.props.title}</label>
        <div className="collaborator">
          <span>Assigned to: {this.props.assignedTo}</span>
          <span>Priority: {this.props.priority}</span>
          <span>Due at: {this.props.dueDate}</span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ updateTask }, dispatch)
);

Task.propTypes = {
  completed: PropTypes.bool.isRequired,
  updateTask: PropTypes.func.isRequired,
  toDoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  assignedTo: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired
};

export default connect(null, mapDispatchToProps)(Task);
