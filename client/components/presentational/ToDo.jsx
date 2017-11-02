import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ToDo = props => (
  <div className="col s12 l4">
    <div className="card todo">
      <Link href={props.toDoId} to={props.toDoId}>
        <div className="card-content">
          <span className="card-title">
            {props.title}
          </span>
          <p className="todo-info">
            <i
              className="material-icons todo-info-icon"
            >account_circle
            </i> {props.owner}
          </p>
        </div>
      </Link>
      <div className="card-action">
        <Link to="#edit" href="#edit">
          <i className="material-icons">edit</i>
        </Link>
        <Link to="#delete" href="#delete">
          <i className="material-icons">delete_forever</i>
        </Link>
      </div>
    </div>
  </div>
);

ToDo.propTypes = {
  toDoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
};

export default ToDo;

