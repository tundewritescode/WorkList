import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import shortid from 'shortid-36';

import User from './../models/User';
import Search from './../helpers/Search';
import Mailer from './../helpers/Mailer';

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

          await Mailer.sendWelcomeMail(email);
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

  /**
   * Generates password reset token
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {void}
   */
  static async generatePasswordToken(request, response) {
    try {
      request.checkBody('email', 'Invalid email').isEmail();

      const requestErrors = request.validationErrors();

      if (requestErrors) {
        response.status(400).json({
          errors: requestErrors
        });
      } else {
        const { email } = request.body;
        const existingUser = await Search.searchOne(User, { email });

        if (!existingUser) {
          response.status(404).json({
            error: `${email} doens't exist`
          });
        } else {
          const shortId = shortid.generate();

          const resetToken = await jwt.sign(
            { shortId },
            process.env.SECRET_KEY,
            { expiresIn: process.env.RESET_EXPIRY }
          );

          await User.findByIdAndUpdate(existingUser._id, { shortId });

          await Mailer.sendCustomMail({
            from: `"Babatunde Adeyemi" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: 'Forgot Password',
            text: `Copy this to your browser: ${process.env.HOSTNAME}/resetpassword/${resetToken}`,
            html: `Click <a href="http://${process.env.HOSTNAME}/resetpassword/${resetToken}">here</a> to reset your password`,
          });

          response.status(200).json({
            message: 'Check your email to continue resetting your password',
          });
        }
      }
    } catch (error) {
      response.sendStatus(500);
    }
  }

  /**
   * Saves new password
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {void}
   */
  static async saveNewPassword(request, response) {
    try {
      const { resetToken, newPassword } = request.body;

      if (!resetToken) {
        response.status(400).json({
          error: 'Password reset token is required'
        });
      } else {
        const payload = await jwt.verify(resetToken, process.env.SECRET_KEY);

        const existingUser = await Search.searchOne(
          User,
          { shortId: payload.shortId }
        );

        if (existingUser) {
          await User.findByIdAndUpdate(
            existingUser._id,
            { password: newPassword }
          );

          response.status(200).json({
            message: 'You have successfully changed your password'
          });
        } else {
          response.status(400).json({
            error: 'Invalid password reset token'
          });
        }
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        response.status(400).json({
          error: 'Password reset token has expired',
        });
      } else {
        response.sendStatus(500);
      }
    }
  }
}

export default UserController;
