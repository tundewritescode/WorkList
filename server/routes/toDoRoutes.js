import ToDoController from './../controllers/ToDoController';

import verifyToken from './../middleware/verifyToken';

/**
 * Task routes
 *
 * @param {string} versionURL - api versioning
 * @param {function} app - express
 *
 * @returns {void}
 */
const toDoRoutes = (versionURL, app) => {
  app.get(`${versionURL}/todos`, verifyToken, ToDoController.getToDos);
  app.post(
    `${versionURL}/todos`,
    verifyToken,
    ToDoController.createToDo
  );
};

export default toDoRoutes;
