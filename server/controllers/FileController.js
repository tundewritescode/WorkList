import User from './../models/User';
import fileUpload from './../helpers/fileUpload';

/**
 * @class FileController
 */
class FileController {
  /**
   * Uploads a profile photo
   *
   * @static
   *
   * @param {Object} request - request object
   * @param {Object} response - response object
   *
   * @memberof FileController
   *
   * @returns {void}
   */
  static async uploadAvatar(request, response) {
    try {
      if (!request.files) {
        response.status(400).json({
          error: 'No avatar was uploaded',
        });
      } else {
        const { avatar } = request.files;

        const { public_id, format } = await fileUpload(avatar);

        const {
          _id,
          firstName,
          lastName,
          email
        } = await User.findByIdAndUpdate(
          request.user._id,
          { avatar: `${public_id}.${format}` },
        );

        response.status(200).json({
          user: {
            userId: _id,
            firstName,
            lastName,
            email,
            avatar: `${public_id}.${format}`,
          },
        });
      }
    } catch (error) {
      if (error.http_code === 400) {
        response.status(400).json({
          error: error.message
        });
      } else {
        response.sendStatus(500);
      }
    }
  }
}

export default FileController;
