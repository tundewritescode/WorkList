import UserController from './../controllers/UserController';
import verifyToken from './../middleware/verifyToken';

/**
 * User routes
 *
 * @param {string} versionURL - api versioning
 * @param {function} app - express
 *
 * @returns {void}
 */
const userRoutes = (versionURL, app) => {
  app.post(`${versionURL}/users/signup`, UserController.signUp);
  app.post(`${versionURL}/users/signin`, UserController.signIn);
  app.patch(
    `${versionURL}/profile/`,
    verifyToken, UserController.editProfile
  );
  app.post(`${versionURL}/users/social-auth`, UserController.socialLogin);
  app.post(`${versionURL}/resetpassword`, UserController.generatePasswordToken);
  app.patch(`${versionURL}/resetpassword`, UserController.saveNewPassword);
};

export default userRoutes;
