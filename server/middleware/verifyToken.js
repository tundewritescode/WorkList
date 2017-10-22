import jwt from 'jsonwebtoken';

const verifyToken = async (request, response, next) => {
  try {
    const { token } = request.headers;
    if (token) {
      request.user = await jwt.verify(token, process.env.SECRET_KEY);
      next();
    } else {
      response.status(403).json({
        error: 'You are not logged in',
      });
    }
  } catch (error) {
    response.json({
      error: 'Invalid token'
    });
  }
};

export default verifyToken;
