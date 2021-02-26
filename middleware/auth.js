const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { UNAUTHORIZED_CODE } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const secret = keys.jwtSecret;

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(UNAUTHORIZED_CODE)
      .send({ success: false, message: 'Authentication Failed!' });
  }
};
