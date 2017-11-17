import Task from './../models/Task';

/**
 * Verifies tasks
 *
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @param {function} next - passed flow of execution to the next middleware
 *
 * @returns {void}
 */
const verifyTask = async (request, response, next) => {
  try {
    const { taskId, toDoId } = request.params;

    const task = await Task.findOne({ _id: taskId, toDoId });

    if (task) {
      next();
    } else {
      response.status(400).json({
        error: 'Task does not exist',
      });
    }
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      response.status(400).json({
        error: 'taskId is ivalid',
      });
    } else {
      response.sendStatus(500);
    }
  }
};

export default verifyTask;
