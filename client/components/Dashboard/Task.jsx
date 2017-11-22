import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';

import updateTask from './../../actions/updateTask';

/**
 * Task
 */
class Task extends Component {
  /**
   * Instanstiates the task component
   *
   * @param {Object} props - component properties
   *
   * @returns {void}
   */
  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.completed
    };

    this.handleCheck = this.handleCheck.bind(this);
  }

  /**
   * Handles check eents
   *
   * @param {Object} event - the input check event
   *
   * @returns {void}
   */
  handleCheck() {
    this.setState({
      completed: !this.state.completed
    });

    this.props
      .updateTask(
        { completed: !this.state.completed },
        this.props.toDoId, this.props.taskId
      );
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
          checked={this.props.completed}
          id={this.props.taskId}
          onChange={this.handleCheck}
        />
        <label
          className={String(this.props.completed)}
          htmlFor={this.props.taskId}
        >{this.props.title}
        </label>
        <div className="collaborator">
          <span>Assigned to: {this.props.assignedTo}</span>
          <span>Priority: {this.props.priority}</span>
          <span>Due in:
            &nbsp;<Moment fromNow ago>{this.props.dueDate}</Moment>
          </span>
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
  dueDate: PropTypes.string.isRequired
};

export default connect(null, mapDispatchToProps)(Task);
