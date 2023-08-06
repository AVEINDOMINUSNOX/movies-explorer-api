const router = require('express').Router();
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movieRouter = require('./movies');

const { validationCreateUser, validationLoginUser } = require('../middlewares/validationJoiUser');
const { login, createUser } = require('../controllers/users');

const { SERVER_IS_FALLEN } = require('../utils/constants');

router.post('/signin', validationLoginUser, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);
router.use(userRouter);
router.use(movieRouter);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_IS_FALLEN);
  }, 0);
});
module.exports = router;
