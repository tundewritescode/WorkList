import jwt from 'jsonwebtoken';

import User from './../models/User';

import Search from './../helpers/Search';

/**
 * Verifies token
 *
 * @param {Object} request - request object
 * @param {Object} response - response object
 * @param {Function} next - passes flow of execution to the next middleware
 *
 * @returns {void}
 */
const verifyToken = async (request, response, next) => {
  try {
    const { token } = request.headers;
    if (token) {
      const payload = await jwt.verify(token, process.env.SECRET_KEY);

      const user = await Search.searchById(User, payload.userId);

      if (user) {
        request.user = user;

        next();
      } else {
        response.status(404).json({
          error: 'User does not exist',
        });
      }
    } else {
      response.status(403).json({
        error: 'You are not logged in',
      });
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      response.status(400).json({
        error: 'Token has expired',
      });
    } else {
      response.status(500).json({
        error: 'Oops! Something broke',
      });
    }
  }
};

export default verifyToken;
