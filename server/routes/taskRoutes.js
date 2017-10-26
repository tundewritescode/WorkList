import TaskController from './../controllers/TaskController';

import verifyToken from './../middleware/verifyToken';
import authorizeUser from './../middleware/authorizeUser';

const taskRoutes = (versionURL, app) => {
  app.get(
    `${versionURL}/todos/:toDoId/tasks`,
    verifyToken, TaskController.getTasks
  );
  app.post(
    `${versionURL}/todos/:toDoId/tasks/create`,
    verifyToken,
    authorizeUser,
    TaskController.createTask
  );
};

export default taskRoutes;
