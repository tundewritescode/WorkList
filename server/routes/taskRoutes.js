import TaskController from './../controllers/TaskController';

import verifyToken from './../middleware/verifyToken';
import authorizeUser from './../middleware/authorizeUser';
import verifyTask from './../middleware/verifyTask';

const taskRoutes = (versionURL, app) => {
  app.get(
    `${versionURL}/todos/:toDoId/tasks`,
    verifyToken, TaskController.getTasks
  );
  app.post(
    `${versionURL}/todos/:toDoId/tasks`,
    verifyToken,
    authorizeUser,
    TaskController.createTask
  );
  app.patch(
    `${versionURL}/todos/:toDoId/tasks/:taskId`,
    verifyToken,
    authorizeUser,
    verifyTask,
    TaskController.updateTask
  );
};

export default taskRoutes;
