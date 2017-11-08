import UserController from './../controllers/UserController';
import verifyToken from './../middleware/verifyToken';

const userRoutes = (versionURL, app) => {
  app.post(`${versionURL}/users/signup`, UserController.signUp);
  app.post(`${versionURL}/users/signin`, UserController.signIn);
  app.patch(
    `${versionURL}/profile/edit`,
    verifyToken, UserController.editProfile
  );
  app.post(`${versionURL}/resetpassword`, UserController.generatePasswordToken);
  app.patch(`${versionURL}/resetpassword`, UserController.saveNewPassword);
};

export default userRoutes;
