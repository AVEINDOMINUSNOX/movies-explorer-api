const { NODE_ENV, MONGO_DB, PORT_SELECTED } = process.env;

const DB_CONFIG = NODE_ENV === 'production' ? MONGO_DB : 'mongodb://127.0.0.1:27017/bitfilmsdb';

const PORT_CONFIG = NODE_ENV === 'production' ? PORT_SELECTED : 3000;

module.exports = {
  DB_CONFIG,
  PORT_CONFIG,
};
