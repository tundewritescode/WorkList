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

    const collaborators = await Search.searchAll(Collaborator, { toDoId });

    const refinedCollaborators = collaborators.map(collaborator => ({
      toDoId: collaborator.toDoId,
      collaborator: collaborator.collaboratorId,
      readOnly: collaborator.readOnly,
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
    request.checkBody('readOnly', 'Permission must be a boolean').isBoolean();

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
          const collaborator = await Collaborator({ toDoId, collaboratorId })
            .save();

          const refinedCollaborator = {
            toDoId: collaborator.toDoId,
            collaboratorId: collaborator.collaboratorId,
            readOnly: collaborator.readOnly,
          };

          response.status(201).json({
            collaborator: refinedCollaborator,
          });
        }
      }
    }
  }
}

export default CollaboratorController;
