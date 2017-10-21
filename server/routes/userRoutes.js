import UserController from './../controllers/UserController';

const userRoutes = (versionURL, app) => {
  app.post(`${versionURL}/users/signup`, UserController.signUp);
};

export default userRoutes;
