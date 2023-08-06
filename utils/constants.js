const URL_REGEX = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const DEFAULT_ERROR = 'Произошла ошибка';
const PAGE_NOT_FOUND = 'Запрашиваемая страница не найдена';
const INCORRECT_URL = 'Некорректный URL';

const INCORRECT_EMAIL = 'Некоррекный email';
const INCORRECT_EMAIL_OR_PASS = 'Некорректные почта или пароль';
const AUTH_REQUIRED = 'Внимание! Требуется авторизация';

const EMAIL_ALREADY_REG = 'Пользователь с данным email уже зарегестрирован';
const USER_IS_NOT_REG = 'Данный пользователь не зарегистрирован';
const USER_NOT_FOUND = 'Пользователь с указанным _id не найден';
const INCORRECT_REG_DATA = 'ОШИБКА! Переданы некорректные данные при создании пользователя';
const INCORRECT_DATA_UPD_PROFILE = 'ОШИБКА! Переданы некорректные данные при обновлении профиля';

const MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден';
const FORBIDDEN_DEL_ELSES_MOVIE = 'Нельзя удалить чужой фильм';
const INCORRECT_DATA_ADD_MOVIE = 'ОШИБКА! Переданы некорректные данные для обавлении фильм';
const INCORRECT_DATA_DEL_MOVIE = 'ОШИБКА! Переданы некорректные данные для удаления фильма';

const SERVER_IS_FALLEN = 'Сервер упал';

module.exports = {
  URL_REGEX,
  DEFAULT_ERROR,
  PAGE_NOT_FOUND,
  INCORRECT_EMAIL,
  INCORRECT_URL,
  INCORRECT_EMAIL_OR_PASS,
  AUTH_REQUIRED,
  EMAIL_ALREADY_REG,
  USER_IS_NOT_REG,
  USER_NOT_FOUND,
  MOVIE_NOT_FOUND,
  FORBIDDEN_DEL_ELSES_MOVIE,
  INCORRECT_DATA_ADD_MOVIE,
  INCORRECT_DATA_DEL_MOVIE,
  INCORRECT_REG_DATA,
  INCORRECT_DATA_UPD_PROFILE,
  SERVER_IS_FALLEN,
};
