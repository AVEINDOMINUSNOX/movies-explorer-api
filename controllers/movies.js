require('dotenv').config();

const DataError = require('../errors/dataError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const Movie = require('../models/movie');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  Movie.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Ошибка! При создании карточки отправлены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Ошибка! Не найден фильм с указанным id');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Внимание! Невозможно удалить чужой фильм');
      }
      Movie.findByIdAndRemove(req.params._id)
        .then(() => res.send({ message: `Фильм ${req.params._id} удален` }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Ошибка! Для удаления фильма отправлены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
