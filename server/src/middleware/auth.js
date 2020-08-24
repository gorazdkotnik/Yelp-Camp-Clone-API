/**
 * * Modules
 * * Imports
 */
const User = require('../models/user');
const sendJsonError = require('../utils/sendJsonError');
const jwt = require('jsonwebtoken');

/**
 * * Main Authentication Middleware
 */
const auth = async (req, res, next) => {
  try {
    // Getting a token from cookies
    const token = req.cookies['auth_token'];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by token and id from decoded token
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    // Pass user and token to req obj and continue
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send(sendJsonError('Please authenticate'));
  }
};

/**
 * * Exports
 */
module.exports = auth;
