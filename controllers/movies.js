require('dotenv').config();

const DataError = require('../errors/dataError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const Movie = require('../models/movie');

const {
  MOVIE_NOT_FOUND,
  INCORRECT_DATA_ADD_MOVIE,
  FORBIDDEN_DEL_ELSES_MOVIE,
  INCORRECT_DATA_DEL_MOVIE,
} = require('../utils/constants');

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
        next(new DataError(INCORRECT_DATA_ADD_MOVIE));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_DEL_ELSES_MOVIE);
      }
      Movie.findByIdAndRemove(req.params._id)
        .then(() => res.send({ message: `Фильм ${req.params._id} удален` }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError(INCORRECT_DATA_DEL_MOVIE));
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
