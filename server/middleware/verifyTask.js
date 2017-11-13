import Task from './../models/Task';

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
