import cloudinary from 'cloudinary';
import fs from 'fs';
import del from 'del';

import './../config/cloudinaryConfig';

/**
 * Uploads file to Cloudinary
 *
 * @param {Object} avatar - file to be upload
 *
 * @returns {Object} - uploaded file information
 */
const fileUpload = async (avatar) => {
  const uploadDir = 'server/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  await avatar.mv(`${uploadDir}/${avatar.name}`);

  const uploadedAvatar = await cloudinary
    .v2.uploader.upload(`${uploadDir}/${avatar.name}`);

  await del(['server/uploads/**']);

  return uploadedAvatar;
};

export default fileUpload;
