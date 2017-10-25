import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from './../models/User';

import Search from './../helpers/Search';

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
        const { email } = request.body;
        const existingUser = await Search.searchOne(User, { email });

        if (!existingUser) {
          const {
            _id,
            firstName,
            lastName,
            avatar,
          } = await User(request.body).save();

          response.status(201).json({
            userData: {
              userId: _id,
              firstName,
              lastName,
              email,
              avatar,
            },
            token: await jwt.sign(
              { userId: _id, email },
              process.env.SECRET_KEY,
              { expiresIn: process.env.AUTH_EXPIRY }
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

  /**
   * Signs in a new user
   *
   * @static
   * @param {object} request - request object
   * @param {object} response - response object
   * @memberof UserController
   *
   * @returns {void}
   */
  static async signIn(request, response) {
    try {
      request.checkBody('email', 'Email is required').isEmail();
      request.checkBody('password', 'Password is required').notEmpty();

      const requestErrors = request.validationErrors();

      if (requestErrors) {
        response.status(400).json({
          errors: requestErrors,
        });
      } else {
        const { email } = request.body;
        const existingUser = await Search.searchOne(User, { email });

        if (existingUser) {
          const passwordMatches = await bcrypt.compare(
            request.body.password,
            existingUser.password
          );

          const {
            _id,
            firstName,
            lastName,
            avatar,
          } = existingUser;
          if (passwordMatches) {
            response.status(200).json({
              userData: {
                userId: _id,
                firstName,
                lastName,
                email,
                avatar,
              },
              token: await jwt.sign(
                { userId: _id, email },
                process.env.SECRET_KEY,
                { expiresIn: process.env.AUTH_EXPIRY }
              )
            });
          } else {
            response.status(401).json({
              error: 'Username and password do not match'
            });
          }
        } else {
          response.status(404).json({
            error: 'User not found'
          });
        }
      }
    } catch (error) {
      response.status(500).json({
        error: 'Oops! Something broke'
      });
    }
  }
}

export default UserController;
