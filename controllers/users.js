require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const EmailError = require('../errors/emailError');
const NotFoundError = require('../errors/notFoundError');
const DataError = require('../errors/dataError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.send({
          name: user.name, email: user.email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new EmailError('Внимание! Пользователь с указанным email уже зарегестрирован'));
          } else if (err.name === 'ValidationError') {
            next(new DataError('Ошибка! При создании пользователя отправлены некорректные данные'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(err));
};

const editUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('Ошибка! Пользователь с указанным id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'NotFound') {
        next(new NotFoundError('Ошибка! Пользователь с указанным id не найден'));
      } else if (err.name === 'ValidationError') {
        next(new DataError('Ошибка! Отправлены некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUser,
  createUser,
  editUser,
  login,
};
