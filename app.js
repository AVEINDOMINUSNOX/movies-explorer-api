/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

/* Роуты */
const router = require('./routes');

/* Мидлвары */
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimit');
const handlerError = require('./middlewares/handlerError');
const corsMiddleware = require('./middlewares/corsMiddleware');
const { DB_CONFIG } = require('./utils/config');

/* Ошибки */
const NotFoundError = require('./errors/notFoundError');
const { PAGE_NOT_FOUND } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors());
mongoose.connect(DB_CONFIG);

app.use(express.json());

app.use(requestLogger);
app.use(rateLimiter);
app.use(helmet());

app.use(corsMiddleware);

app.use(router);
app.use('*', () => {
  throw new NotFoundError(PAGE_NOT_FOUND);
});

app.use(errorLogger);

app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
  console.log(`Слушаем ${PORT}`);
});
