/* eslint-disable func-names */
/* eslint-disable new-cap */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const dataError = require('../errors/dataError');
const tokenError = require('../errors/tokenError');

const {
  INCORRECT_EMAIL,
  USER_IS_NOT_REG,
  INCORRECT_EMAIL_OR_PASS,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'длина имени должна быть не менее 2 символов'],
    maxlength: [30, 'длина имени должна быть не более 30 символов'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: INCORRECT_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new tokenError(USER_IS_NOT_REG));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new dataError(INCORRECT_EMAIL_OR_PASS));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
