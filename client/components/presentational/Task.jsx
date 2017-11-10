import React from 'react';
import PropTypes from 'prop-types';

const Task = props => (
  <div className={['task', props.priority].join(' ')}>
    <input type="checkbox" className="filled-in" id={props.taskId} />
    <label htmlFor={props.taskId}>{props.title}</label>
    <div className="collaborator">
      <span>Assigned to: {props.assignedTo}</span>
      <span>Priority: {props.priority}</span>
      <span>Due at: {props.dueDate}</span>
    </div>
  </div>
);

Task.propTypes = {
  title: PropTypes.string.isRequired,
  assignedTo: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired
};

export default Task;
