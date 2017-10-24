import Task from './../models/Task';

/**
 * @class TaskController
 */
class TaskController {
  /**
   * Gets all tasks in a to-do
   *
   * @static
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @memberof ToDoController
   *
   * @returns {void}
   */
  static async getTasks(request, response) {
    const tasks = await Task.find({ toDoId: request.params.toDoId });

    const refinedTasks = tasks.map(task => ({
      taskId: task._id,
      toDoId: task.toDoId,
      title: task.title,
      priority: task.priority,
      completed: task.completed,
      createdAt: task.createdAt,
      dueAt: task.dueAt,
    }));

    response.status(200).json({
      tasks: refinedTasks,
    });
  }

  /**
     * Creates a task inside a to-do
     *
     * @static
     * @param {any} request - request object
     * @param {any} response - response object
     * @memberof ToDoController
     *
     * @returns {void}
     */
  static async createTask(request, response) {
    request.checkBody('title', 'Title is required').notEmpty().trim();
    request.checkBody('priority', 'Priority is required').notEmpty().trim();

    const requestErrors = request.validationErrors();

    if (requestErrors) {
      response.status(400).json({
        errors: requestErrors
      });
    } else {
      request.sanitizeBody('title').escape();
      request.sanitizeBody('priority').escape();

      const { title, priority } = request.body;

      const task = await Task({ toDoId: request.params.toDoId, title, priority }).save();

      response.status(201).json({
        task: {
          taskId: task._id,
          toDoId: task.toDoId,
          title: task.title,
          priority: task.priority,
          createdAt: task.createdAt,
          dueAt: task.dueAt,
        }
      });
    }
  }
}

export default TaskController;
