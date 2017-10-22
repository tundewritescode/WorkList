import ToDoController from './../controllers/ToDoController';
import TaskController from './../controllers/TaskController';

import verifyToken from './../middleware/verifyToken';

const toDoRoutes = (versionURL, app) => {
  app.get(`${versionURL}/todos`, verifyToken, ToDoController.getToDos);
  app.get(`${versionURL}/todos/:toDoId/tasks`, verifyToken, TaskController.getTasks);
  app.post(`${versionURL}/todos/create`, verifyToken, ToDoController.createToDo);
  app.post(`${versionURL}/todos/:toDoId/tasks/create`, TaskController.createTask);
};

export default toDoRoutes;
