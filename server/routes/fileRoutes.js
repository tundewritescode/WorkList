import FileController from './../controllers/FileController';

import verifyToken from './../middleware/verifyToken';

const fileRoutes = (versionURL, app) => {
  app.patch(
    `${versionURL}/avatar/upload`,
    verifyToken,
    FileController.uploadAvatar,
  );
};

export default fileRoutes;
