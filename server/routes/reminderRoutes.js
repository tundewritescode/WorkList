import reminderController from './../controllers/reminderController';

const reminderRoutes = (versionURL, app) => {
  app.get(`${versionURL}/reminders`, reminderController);
};

export default reminderRoutes;
