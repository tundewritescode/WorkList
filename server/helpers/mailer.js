import transporter from './../config/transporter';

/**
 * Sends emails based on the provided mailOptions
 *
 * @param {Object} mailOptions - email details
 *
 * @returns {Object} - the response object
 */
const mailer = mailOptions => transporter.sendMail(mailOptions);

export default mailer;
