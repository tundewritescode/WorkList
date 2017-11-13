import Task from './../models/Task';

import Search from './../helpers/Search';

/**
 * @class TaskController
 */
class TaskController {
  /**
   * Gets all tasks in a to-do
   *
   * @static
   *
   * @param {Object} request - request object
   * @param {Object} response - response object
   *
   * @memberof ToDoController
   *
   * @returns {void}
   */
  static async getTasks(request, response) {
    const { toDoId } = request.params;
    const tasks = await Search.searchAll(Task, { toDoId });

    const refinedTasks = tasks.map(task => ({
      taskId: task._id,
      toDoId: task.toDoId,
      title: task.title,
      priority: task.priority,
      completed: task.completed,
      createdAt: task.createdAt,
      dueDate: task.dueDate,
    }));

    response.status(200).json({
      tasks: refinedTasks,
    });
  }

  /**
     * Creates a task inside a to-do
     *
     * @static
     *
     * @param {Object} request - request object
     * @param {Object} response - response object
     *
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

      const {
        title,
        priority,
        assignedTo,
        dueDate
      } = request.body;
      const { toDoId } = request.params;

      const task = await Task({
        toDoId,
        title,
        priority,
        assignedTo,
        dueDate
      }).save();

      response.status(201).json({
        task: {
          taskId: task._id,
          toDoId: task.toDoId,
          assignedTo: task.assignedTo,
          title: task.title,
          priority: task.priority,
          createdAt: task.createdAt,
          dueDate: task.dueDate,
        }
      });
    }
  }

  /**
   * Edits tasks
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {void}
   */
  static async updateTask(request, response) {
    request.checkBody('completed', 'Completed can only be true or false')
      .isBoolean();

    const requestErrors = request.validationErrors();

    if (requestErrors) {
      response.status(400).json({
        errors: requestErrors
      });
    } else {
      const updatedTask = await Task
        .findByIdAndUpdate(request.params.taskId, request.body);

      const newTask = await Task.findById(updatedTask._id);
      // Don't forget assign
      const task = {
        taskId: newTask._id,
        toDoId: newTask.toDoId,
        title: newTask.title,
        priority: newTask.priority,
        completed: newTask.completed,
        dueDate: newTask.dueDate
      };

      response.status(200).json(task);
    }
  }
}

export default TaskController;
