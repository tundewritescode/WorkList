import ToDoController from './../controllers/ToDoController';

import verifyToken from './../middleware/verifyToken';

const toDoRoutes = (versionURL, app) => {
  app.get(`${versionURL}/todos`, verifyToken, ToDoController.getToDos);
  app.post(
    `${versionURL}/todos`,
    verifyToken,
    ToDoController.createToDo
  );
};

export default toDoRoutes;
