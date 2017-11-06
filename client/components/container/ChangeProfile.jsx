import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DropZone from 'react-dropzone';
// import FormData from 'form-data';

import uploadFile from './../../actions/uploadFile';
import editProfile from './../../actions/editProfile';

/**
 * @class SignIn
 *
 * @extends {Component}
 */
class ChangeProfile extends Component {
  /**
   * Creates an instance of SignIn.
   *
   * @memberof SignIn
   */
  constructor() {
    super();

    this.initialState = {
      firstName: '',
      lastName: '',
    };

    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * Ensures modals stay active
   *
   * @memberof SignIn
   *
   * @returns {void}
   */
  componentDidMount() {
    // $('.button-collapse').sideNav();
    $('.modal').modal();
  }

  /**
   * Handles files dropped into the dropzone area
   *
   * @param {array} files - files to be uploaded
   *
   * @returns {void}
   */
  async onDrop(files) {
    const formData = new FormData();
    formData.append('avatar', files[0]);

    await this.props.uploadFile(formData);
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
    this.props.editProfile(this.state);
  }

  /**
   * Renders the SignIn component
   *
   * @returns {object} - the jsx component
   */
  render() {
    return (
      <div id="edit-profile" className="modal">
        <div className="modal-content">
          <div className="row">
            <h5 className="center">Edit Profile</h5>
            <form
              onSubmit={this.handleSubmit}
              className="col s12"
            >
              <div className="row">
                <div className="file-field col s12">
                  <DropZone onDrop={this.onDrop}>
                    <p>Drag your files here Or click to upload a photo</p>
                  </DropZone>
                </div>
                <div className="input-field col s12">
                  <input
                    id="credential"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="first-name">First name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="credential"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    type="text"
                    className="validate"
                    required
                  />
                  <label htmlFor="last-name">Last name</label>
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

ChangeProfile.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ uploadFile, editProfile }, dispatch)
);

export default connect(null, mapDispatchToProps)(ChangeProfile);
