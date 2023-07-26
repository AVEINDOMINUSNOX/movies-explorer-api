const userRouter = require('express').Router();
const auth = require('../middlewares/auth');
const { getUser, editUser } = require('../controllers/users');
const { validationUserEdit } = require('../middlewares/validationJoiUser');

userRouter.use(auth);
userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', validationUserEdit, editUser);

module.exports = userRouter;
