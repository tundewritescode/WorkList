import Collaborator from './../models/Collaborator';

/**
 * @class CollaboratorController
 */
class CollaboratorController {
  /**
   * Gets all collaborators on a to-do
   *
   * @static
   * @param {Object} request - request object
   * @param {Object} response - response object
   * @memberof CollaboratorController
   *
   * @returns {void}
   */
  static async getCollaborators(request, response) {
    const collaborators = await Collaborator.find({ toDoId: request.params.toDoId });

    const refinedCollaborators = collaborators.map(collaborator => ({
      toDoId: collaborator.toDoId,
      collaborator: collaborator.collaboratorId,
      readOnly: collaborator.readOnly,
    }));

    response.status(200).json({
      collaborators: refinedCollaborators,
    });
  }

  // static async addCollaborators(request, response) {

  // }
}

export default CollaboratorController;
