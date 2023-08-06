/* eslint-disable consistent-return */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenError = require('../errors/tokenError');
const { AUTH_REQUIRED } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new TokenError(AUTH_REQUIRED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new TokenError(AUTH_REQUIRED));
  }

  req.user = payload;
  next();
};
