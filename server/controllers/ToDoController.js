import ToDo from './../models/ToDo';

/**
 * @class ToDoController
 */
class ToDoController {
  /**
   * Gets all to-dos
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
  static async getToDos(request, response) {
    try {
      const toDos = await ToDo.find({ ownerId: request.user._id })
        .populate('ownerId', 'firstName lastName');
      const refinedTodos = toDos.map(toDo => ({
        toDoId: toDo._id,
        ownerId: toDo.ownerId,
        title: toDo.title,
      }));

      response.status(200).json({
        toDos: refinedTodos,
      });
    } catch (error) {
      response.sendStatus(500);
    }
  }

  /**
   * Creates a new to-do
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
  static async createToDo(request, response) {
    try {
      request.checkBody('title', 'Title is required').notEmpty().trim();

      const requestErrors = request.validationErrors();

      if (requestErrors) {
        response.status(400).json({
          errors: requestErrors,
        });
      } else {
        request.sanitizeBody('title').escape();

        const {
          _id,
          userId,
          title,
        } = await ToDo({
          title: request.body.title.trim(),
          ownerId: request.user._id,
        }).save();

        const {
          ownerId
        } = await ToDo.findOne({ _id, ownerId: request.user._id })
          .populate('ownerId', 'firstName lastName');

        response.status(201).json({
          toDo: {
            toDoId: _id,
            ownerId,
            userId,
            title,
          }
        });
      }
    } catch (error) {
      response.sendStatus(500);
    }
  }
}

export default ToDoController;
