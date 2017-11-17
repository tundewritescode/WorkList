import User from './../models/User';
import ToDo from './../models/ToDo';
import Mailer from '../helpers/Mailer';
import Search from './../helpers/Search';

/**
 * @class CollaboratorController
 */
class CollaboratorController {
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
    request.checkBody('collaborator', 'Invalid email').isEmail();

    const requestErrors = request.validationErrors();

    if (requestErrors) {
      response.status(400).json({
        errors: requestErrors,
      });
    } else {
      request.sanitizeBody('collaborator').escape();

      const { collaborator } = request.body;
      const existingUser = await Search.searchOne(User, { email: collaborator });

      if (!existingUser) {
        response.status(400).json({
          error: 'User does not exist',
        });
      } else {
        const collaboratorId = existingUser._id;

        const { currentToDo } = request;

        const existingCollaborator =
          currentToDo.collaborators.find(newCollaborator => (
            String(newCollaborator) === String(collaboratorId)
          ));

        if (existingCollaborator) {
          await Mailer.sendCustomMail({
            from: `"Babatunde Adeyemi" <${process.env.GMAIL_USER}>`,
            to: collaborator,
            subject: 'New Todo!',
            text: 'Hi there! You are now a collaborator on a new todo'
          });

          response.status(409).json({
            error: 'Collaborator is already added',
          });
        } else {
          await ToDo.update(
            { _id: currentToDo._id },
            { $push: { collaborators: collaboratorId } }
          );

          response.status(200).json({
            message: 'Collaborator added'
          });
        }
      }
    }
  }
}

export default CollaboratorController;
