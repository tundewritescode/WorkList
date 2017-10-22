import UserController from './../controllers/UserController';

const userRoutes = (versionURL, app) => {
  app.post(`${versionURL}/users/signup`, UserController.signUp);
  app.post(`${versionURL}/users/signin`, UserController.signIn);
};

export default userRoutes;
