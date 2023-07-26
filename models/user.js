/* eslint-disable func-names */
/* eslint-disable new-cap */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const dataError = require('../errors/dataError');
const tokenError = require('../errors/tokenError');

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
      message: 'Некоррекный email',
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
        return Promise.reject(new tokenError('Данный пользователь не зарегистрирован'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new dataError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
