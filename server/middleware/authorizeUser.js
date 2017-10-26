import ToDo from './../models/ToDo';

/**
 * Authorizes a user if they own a to-do
 *
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @param {Function} next - passes flow of execution to the next middleware
 *
 * @returns {void}
 */
const authorizeUser = async (request, response, next) => {
  try {
    const toDo = await ToDo.findOne({ _id: request.params.toDoId });

    if (toDo) {
      if (toDo.ownerId !== String(request.user._id)) {
        response.status(401).json({
          error: 'You are not authorized'
        });
      } else {
        next();
      }
    } else {
      response.status(400).json({
        error: 'To-do does not exist',
      });
    }
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      response.status(400).json({
        error: 'toDoId is invalid'
      });
    } else {
      response.status(500).json({
        error: 'Oops! Something broke',
      });
    }
  }
};

export default authorizeUser;
