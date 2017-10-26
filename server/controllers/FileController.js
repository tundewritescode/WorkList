import cloudinary from 'cloudinary';
import fs from 'fs';
import del from 'del';

import User from './../models/User';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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

        const uploadDir = 'server/uploads';

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }

        await avatar.mv(`server/uploads/${avatar.name}`);

        const uploadedAvatar = await cloudinary
          .v2.uploader.upload(`${uploadDir}/${avatar.name}`);

        const { public_id, format } = uploadedAvatar;

        const {
          _id,
          firstName,
          lastName,
          email
        } = await User.findByIdAndUpdate(
          request.user._id,
          { avatar: `${public_id}.${format}` },
        );

        await del(['server/uploads/**']);

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
        response.status(500).json({
          error: 'Oops! Something broke',
        });
      }
    }
  }
}

export default FileController;
