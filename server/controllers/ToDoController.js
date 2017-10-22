import ToDo from './../models/ToDo';

/**
 * @class ToDoController
 */
class ToDoController {
  /**
   * Gets all to-dos
   *
   * @static
   * @param {any} request - request object
   * @param {any} response - response object
   * @memberof ToDoController
   *
   * @returns {void}
   */
  static async getToDos(request, response) {
    try {
      const toDos = await ToDo.find({ ownerId: request.user.userId }, 'title ownerId');

      const refinedTodos = toDos.map(toDo => ({
        toDoId: toDo._id,
        ownerId: toDo.ownerId,
        title: toDo.title,
      }));

      response.status(200).json({
        toDos: refinedTodos,
      });
    } catch (error) {
      response.status(500).json({
        error: 'Oops! Something broke',
      });
    }
  }

  /**
   * Creates a new to-do
   *
   * @static
   * @param {any} request - request object
   * @param {any} response - response object
   * @memberof ToDoController
   *
   * @returns {void}
   */
  static async createToDo(request, response) {
    try {
      request.checkBody('title', 'Tiltle is required').notEmpty().trim();

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
        } = await ToDo({ title: request.body.title.trim(), ownerId: request.user.userId }).save();

        response.status(201).json({
          toDo: {
            toDoId: _id,
            userId,
            title,
          }
        });
      }
    } catch (error) {
      response.status(500).json({
        error: 'Oops! Something broke',
      });
    }
  }
}

export default ToDoController;
