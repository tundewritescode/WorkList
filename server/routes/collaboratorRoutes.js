import CollaboratorController from './../controllers/CollaboratorController';

import verifyToken from './../middleware/verifyToken';
import verifyToDo from './../middleware/verifyToDo';

/**
 * Collaborator routes
 *
 * @param {string} versionURL - api versioning
 * @param {function} app - express
 *
 * @returns {void}
 */
const collaboratorRoutes = (versionURL, app) => {
  app.post(
    `${versionURL}/todos/:toDoId/collaborators/`,
    verifyToken,
    verifyToDo,
    CollaboratorController.addCollaborators
  );
};

export default collaboratorRoutes;
