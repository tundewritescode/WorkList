import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Profile
 */
class Profile extends Component {
  /**
   * Renders the Profile component
   *
   * @returns {void}
   */
  render() {
    return [
      <Image
        key="profile"
        cloudName={process.env.CLOUD_NAME}
        publicId={this.props.avatar}
        width="140"
        height="140"
        radius="max"
        crop="scale"
      />,
      <div key="name" className="name">
        <Link
          className="modal-trigger"
          to="#edit-profile"
          href="#edit-profile"
        >{`${this.props.firstName} ${this.props.lastName}`}
        </Link>
      </div>,
    ];
  }
}

Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    avatar: state.user.avatar,
  }
);

export default connect(mapStateToProps)(Profile);
