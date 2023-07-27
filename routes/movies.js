const movieRouter = require('express').Router();
const auth = require('../middlewares/auth');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationCreateMovie, validationMovieId } = require('../middlewares/validationJoiMovie');

movieRouter.use(auth);
movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', validationCreateMovie, createMovie);
movieRouter.delete('/movies/:_id', validationMovieId, deleteMovie);

module.exports = movieRouter;
