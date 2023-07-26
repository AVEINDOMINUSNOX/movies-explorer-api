const movieRouter = require('express').Router();
const auth = require('../middlewares/auth');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationCreateCard, validationCardId } = require('../middlewares/validationJoiCard');

movieRouter.use(auth);
movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', validationCreateCard, createMovie);
movieRouter.delete('/movies/:_id', validationCardId, deleteMovie);

module.exports = movieRouter;
