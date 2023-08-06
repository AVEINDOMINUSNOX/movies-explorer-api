const { NODE_ENV, MONGO_DB } = process.env;

const DB_CONFIG = NODE_ENV === 'production' ? MONGO_DB : 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  DB_CONFIG,
};
