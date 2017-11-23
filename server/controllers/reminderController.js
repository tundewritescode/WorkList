import Task from './../models/Task';
import Mailer from './../helpers/Mailer';

/**
 * Reminder Controller
 *
 * @param {Object} request - request object
 * @param {Object} response - response object
 *
 * @returns {void}
 */
const reminderController = async (request, response) => {
  try {
    const tasks = await Task.find({ completed: false }).populate('reminder');

    if (tasks.length) {
      tasks.forEach(async (task) => {
        const {
          title,
          dueDate,
          reminder,
        } = task;
        const { email } = reminder;

        const now = (Date.now() + 3600000);
        const elapsed = (Date.parse(dueDate)) - now;

        if (elapsed <= 0) {
          await Mailer.sendCustomMail({
            from: `"Babatunde Adeyemi" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Reminder!',
            text: `Your task titled "${title}" has passed its deadline`
          });
        } else if (elapsed > 0 && elapsed <= 600000) {
          await Mailer.sendCustomMail({
            from: `"Babatunde Adeyemi" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Reminder!',
            text: `Your task titled "${title}" will expire in less than 10 minutes`
          });
        }
      });
      response.sendStatus(200);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    response.sendStatus(500);
  }
};

export default reminderController;
