import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from './../models/User';
import './../config/database';

/**
 * @class UserController
 */
class UserController {
  /**
   * Registers a new user
   *
   * @static
   * @param {object} request - request object
   * @param {object} response - response object
   * @memberof UserController
   *
   * @returns {void}
   */
  static async signUp(request, response) {
    try {
      request.checkBody('firstName', 'Invalid first name').isAlpha();
      request.checkBody('lastName', 'Invalid last name').isAlpha();
      request.checkBody('email', 'Invalid email').isEmail();
      request.checkBody('password', 'Paswword must be at least 8 characters')
        .isLength({ min: 8 });
      request.checkBody('password', 'Paswword must contain at least one number')
        .matches(/\d/);

      const requestErrors = request.validationErrors();

      if (requestErrors) {
        response.status(400).json({
          errors: requestErrors,
        });
      } else {
        const existingUser = await User.findOne({ email: request.body.email });

        if (!existingUser) {
          const {
            _id,
            firstName,
            lastName,
            email,
          } = await User(request.body).save();

          response.status(201).json({
            userData: {
              _id,
              firstName,
              lastName,
              email
            },
            token: await jwt.sign(
              { _id, email },
              process.env.SECRET_KEY,
              { expiresIn: '1h' }
            )
          });
        } else {
          response.status(409).json({
            error: `${existingUser.email} already exists`
          });
        }
      }
    } catch (error) {
      response.status(500).json({
        error: 'Oops! Something broke!'
      });
    }
  }
}

export default UserController;
