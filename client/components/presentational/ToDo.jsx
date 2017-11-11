import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import getTasks from './../../actions/getTasks';
import Task from './../presentational/Task.jsx';

/**
 * ToDo
 */
class ToDo extends Component {
  /**
   * Initializes the ToDo component
   *
   * @returns {void}
   */
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }
  /**
   * Ensures materialize collapsible always work
   *
   * @returns {void}
   */
  componentDidMount() {
    $('.collapsible').collapsible();
  }

  /**
   * Preloads all tasks in a todo
   *
   * @returns {void}
   */
  handleClick() {
    this.props.getTasks(this.props.toDoId);
  }

  /**
   * Renders the ToDo component
   *
   * @returns {Object} - the ToDo component
   */
  render() {
    let tasks;
    if (this.props.tasks.length) {
      tasks = this.props.tasks.map(task => (
        <Task
          title={task.title}
          priority={task.priority}
          taskId={task.taskId}
          dueDate={task.dueDate}
          assignedTo={task.assignedTo}
          key={task.taskId}
        />
      ));
    }
    return [
      <li
        onMouseDown={this.handleClick}
        onClick={this.handleClick}
      >
        <div className="collapsible-header">{this.props.title}</div>
        <div className="collapsible-body">
          <div className="todDoMeta">
            <p>Todo by: {this.props.owner}</p>
            <span>
              <Link
                to="#create-task"
                href="#create-task"
                className="modal-trigger"
              ><i className="material-icons">create</i>
                &nbsp;Create Task
              </Link>
            </span>
          </div>
          <div className="tasks">
            {tasks}
          </div>
        </div>
      </li>,
    ];
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ getTasks }, dispatch)
);

const mapStateToProps = state => (
  {
    tasks: state.tasks,
  }
);

ToDo.propTypes = {
  toDoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

