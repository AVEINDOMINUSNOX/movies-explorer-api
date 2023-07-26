require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');

/* Роуты */
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

/* Контроллеры */
const { login, createUser } = require('./controllers/users');

/* Мидлвары */
const { validationCreateUser, validationLoginUser } = require('./middlewares/validationJoiUser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handlerError = require('./middlewares/handlerError');
const corsMiddleware = require('./middlewares/corsMiddleware');

/* Ошибки */
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use(corsMiddleware);

app.post('/signin', validationLoginUser, login);
app.post('/signup', validationCreateUser, createUser);
app.use(userRouter);
app.use(movieRouter);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT}`);
});
