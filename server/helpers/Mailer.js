import transporter from './../config/transporter';

/**
 * Mailer
 */
class Mailer {
  /**
   * Sends welcome email to the email provided
   *
   * @param {string} email - email of the receipient
   *
   * @returns {Promise} - promise
   */
  static sendWelcomeMail(email) {
    return transporter.sendMail({
      from: `"Babatunde Adeyemi" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Welcome to WorkList',
      text: 'Hi there! I, Babatunde Adeyemi, welcome you to WorkList!'
    });
  }

  /**
   * Sends a custom email
   *
   * @param {Object} mailOptions - email details
   *
   * @returns {Promise} - promise
   */
  static sendCustomMail(mailOptions) {
    return transporter.sendMail(mailOptions);
  }
}

export default Mailer;
