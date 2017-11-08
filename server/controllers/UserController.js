import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from './../models/User';
import Search from './../helpers/Search';
import mailer from './../helpers/mailer';

/**
 * @class UserController
 */
class UserController {
  /**
   * Registers a new user
   *
   * @static
   *
   * @param {Object} request - request object
   * @param {Object} response - response object
   *
   * @memberof UserController
   *
   * @returns {void}
   */
  static async signUp(request, response) {
    try {
      request.checkBody('firstName', 'Invalid first name').isAlpha();
      request.checkBody('lastName', 'Invalid last name').isAlpha();
      request.checkBody('email', 'Invalid email').isEmail();

      if (!request.body.socialAuth) {
        request.checkBody('password', 'Paswword must be at least 8 characters')
          .isLength({ min: 8 });
        request.checkBody('password', 'Paswword must contain at least one number')
          .matches(/\d/);
      }

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
            user: {
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

          await mailer({
            from: `"Babatunde Adeyemi" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Welcome to WorkList',
            text: 'Hi there! I, Babatunde Adeyemi, welcome you to WorkList!'
          });
        } else {
          response.status(409).json({
            error: `${existingUser.email} already exists`
          });
        }
      }
    } catch (error) {
      response.sendStatus(500);
    }
  }

  /**
   * Signs in a new user
   *
   * @static
   *
   * @param {Object} request - request object
   * @param {Object} response - response object
   *
   * @memberof UserController
   *
   * @returns {void}
   */
  static async signIn(request, response) {
    try {
      request.checkBody('email', 'Email is required').isEmail();

      if (!request.body.socialAuth) {
        request.checkBody('password', 'Password is required').notEmpty();
      }

      const requestErrors = request.validationErrors();

      if (requestErrors) {
        response.status(400).json({
          errors: requestErrors,
        });
      } else {
        const { email } = request.body;
        const existingUser = await Search.searchOne(User, { email });

        if (existingUser) {
          let passwordMatches;
          if (!request.body.socialAuth) {
            passwordMatches = await bcrypt.compare(
              request.body.password,
              existingUser.password
            );
          }

          if (passwordMatches || existingUser.socialAuth) {
            const {
              _id,
              firstName,
              lastName,
              avatar,
            } = existingUser;

            response.status(200).json({
              user: {
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
              error: 'Invalid credentials'
            });
          }
        } else {
          response.status(404).json({
            error: 'User not found'
          });
        }
      }
    } catch (error) {
      response.sendStatus(500);
    }
  }

  /**
   * Updates profile
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {void}
   */
  static async editProfile(request, response) {
    try {
      request.checkBody('firstName', 'Fisrt name is required').notEmpty().trim();
      request.checkBody('lastName', 'Last name is required').notEmpty().trim();

      const requestErrors = request.validationErrors();

      if (requestErrors) {
        response.status(400).json({
          errors: requestErrors,
        });
      } else {
        request.sanitizeBody('firstName').escape();
        request.sanitizeBody('lastName').escape();

        const {
          _id,
          email,
          avatar,
          firstName,
          lastName,
        } = await User.findByIdAndUpdate(
          request.user._id,
          {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
          }
        );

        response.status(200).json({
          userId: _id,
          email,
          avatar,
          firstName,
          lastName,
        });
      }
    } catch (error) {
      response.sendStatus(500);
    }
  }
}

export default UserController;
