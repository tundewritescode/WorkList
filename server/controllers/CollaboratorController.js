import User from './../models/User';
import Collaborator from './../models/Collaborator';

import Search from './../helpers/Search';

/**
 * @class CollaboratorController
 */
class CollaboratorController {
  /**
   * Gets all collaborators on a to-do
   *
   * @static
   *
   * @param {Object} request - request object
   * @param {Object} response - response object
   *
   * @memberof CollaboratorController
   *
   * @returns {void}
   */
  static async getCollaborators(request, response) {
    const { toDoId } = request.params;

    const collaborators = await Collaborator.find({ toDoId })
      .populate('toDoId', 'title');

    const refinedCollaborators = collaborators.map(collaborator => ({
      toDoId: collaborator.toDoId,
      collaborator: collaborator.collaboratorId,
    }));

    response.status(200).json({
      collaborators: refinedCollaborators,
    });
  }

  /**
   * Add collaborators to a to-do
   *
   * @static
   *
   * @param {Object} request - request object
   * @param {Object} response - request object
   *
   * @memberof CollaboratorController
   *
   * @returns {void}
   */
  static async addCollaborators(request, response) {
    request.checkBody('email', 'Invalid email').isEmail();

    const requestErrors = request.validationErrors();

    if (requestErrors) {
      response.status(400).json({
        errors: requestErrors,
      });
    } else {
      request.sanitizeBody('email').escape();

      const { toDoId } = request.params;
      const { email } = request.body;
      const existingUser = await Search.searchOne(User, { email });

      if (!existingUser) {
        response.status(400).json({
          error: 'User does not exist',
        });
      } else {
        const collaboratorId = existingUser._id;

        const existingCollaborator = await Search.searchOne(
          Collaborator,
          {
            collaboratorId,
            toDoId
          }
        );

        if (existingCollaborator) {
          response.status(409).json({
            error: 'Collaborator is already added',
          });
        } else {
          await Collaborator({ toDoId, collaboratorId })
            .save();

          response.status(200).json({
            message: 'Collaborator added'
          });
        }
      }
    }
  }
}

export default CollaboratorController;
