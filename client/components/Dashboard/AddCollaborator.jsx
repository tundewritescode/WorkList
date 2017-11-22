import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Add Collaborator
 */
class AddCollaborator extends Component {
  /**
   * Creates an instance of CreateTask
   */
  constructor() {
    super();

    this.initialState = {
      collaborator: ''
    };

    this.state = this.initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * Ensuers the AddCollaborator modal always renders
   *
   * @returns {void}
   */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
   * Handles the changes in the input field
   *
   * @param {Object} event - the input field onChange event
   *
   * @memberof AddCollaborator
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
 * @memberof AddCollaborator
 *
 * @returns {void}
 */
  handleSubmit(form) {
    form.preventDefault();
    this.props.addCollaborator(this.state, localStorage.toDoId);
    this.setState(this.initialState);
  }

  /**
  * Renders the AddCollaborator component
  *
  * @returns {object} - the jsx component
  */
  render() {
    return (
      <div id="add-collaborator" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Add Collaborator</h5>
            <form
              onSubmit={this.handleSubmit}
              className="col s12"
            >
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="collaborator"
                    name="collaborator"
                    value={this.state.collaborator}
                    type="email"
                    className="validate"
                    required
                    onChange={this.handleChange}
                  />
                  <label htmlFor="title">Collaborator email</label>
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

AddCollaborator.propTypes = {
  addCollaborator: PropTypes.func.isRequired,
};

export default AddCollaborator;
