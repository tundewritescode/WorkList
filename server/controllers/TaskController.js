import Task from './../models/Task';
import User from './../models/User';
import Search from './../helpers/Search';
import Mailer from '../helpers/Mailer';

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
      assignedTo: task.assignedTo,
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

      const { currentToDo } = request;

      const assignee = await Search
        .searchOne(User, { email: request.body.assignedTo });

      if (assignee) {
        const isCollaborator =
          currentToDo.collaborators.find(collaborator => (
            String(collaborator) === String(assignee._id)
          ));

        if (isCollaborator) {
          const {
            title,
            priority,
            dueDate
          } = request.body;
          const { toDoId } = request.params;

          const task = await Task({
            toDoId,
            title,
            priority,
            dueDate,
            assignedTo: `${assignee.firstName} ${assignee.lastName}`,
            reminder: `${assignee._id}`
          }).save();

          await Mailer.sendCustomMail({
            from: `"Babatunde Adeyemi" <${process.env.GMAIL_USER}>`,
            to: assignee.email,
            subject: 'New Task!',
            text: 'Hi there! You have been assigned a new task!'
          });

          response.status(201).json({
            task: {
              toDoId,
              title,
              priority,
              dueDate,
              taskId: task._id,
              completed: task.completed,
              createdAt: task.createdAt,
              assignedTo: task.assignedTo,
            }
          });
        } else {
          response.status(400).json({
            error: 'User does not exist'
          });
        }
      } else {
        response.status(400).json({
          error: 'You can only assign tasks to collaborators'
        });
      }
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
      const updatedTask = await Task.findByIdAndUpdate(
        request.params.taskId,
        request.body,
        { new: true }
      );

      const task = {
        taskId: updatedTask._id,
        toDoId: updatedTask.toDoId,
        title: updatedTask.title,
        priority: updatedTask.priority,
        completed: updatedTask.completed,
        assignedTo: updatedTask.assignedTo,
        dueDate: updatedTask.dueDate
      };

      response.status(200).json(task);
    }
  }
}

export default TaskController;
