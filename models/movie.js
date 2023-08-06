const mongoose = require('mongoose');
const validator = require('validator');

const { INCORRECT_URL } = require('../utils/constants');

const cardSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(
        value,
        {
          protocols: ['http', 'https'],
          require_tld: true,
          require_protocol: true,
        },
      ),
      message: INCORRECT_URL,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(
        value,
        {
          protocols: ['http', 'https'],
          require_tld: true,
          require_protocol: true,
        },
      ),
      message: INCORRECT_URL,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(
        value,
        {
          protocols: ['http', 'https'],
          require_tld: true,
          require_protocol: true,
        },
      ),
      message: INCORRECT_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', cardSchema);
