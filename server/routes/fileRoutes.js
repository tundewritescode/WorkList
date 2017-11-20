import FileController from './../controllers/FileController';

import verifyToken from './../middleware/verifyToken';

/**
 * File routes
 *
 * @param {string} versionURL - api versioning
 * @param {function} app - express
 *
 * @returns {void}
 */
const fileRoutes = (versionURL, app) => {
  app.patch(
    `${versionURL}/avatar/upload`,
    verifyToken,
    FileController.uploadAvatar,
  );
};

export default fileRoutes;
