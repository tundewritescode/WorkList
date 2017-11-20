import CollaboratorController from './../controllers/CollaboratorController';

import verifyToken from './../middleware/verifyToken';
import authorizeUser from './../middleware/authorizeUser';

/**
 * Collaborator routes
 *
 * @param {string} versionURL - api versioning
 * @param {function} app - express
 *
 * @returns {void}
 */
const collaboratorRoutes = (versionURL, app) => {
  app.get(
    `${versionURL}/todos/:toDoId/collaborators`,
    verifyToken,
    authorizeUser,
    CollaboratorController.getCollaborators
  );
  app.post(
    `${versionURL}/todos/:toDoId/collaborators/`,
    verifyToken,
    authorizeUser,
    CollaboratorController.addCollaborators
  );
};

export default collaboratorRoutes;
