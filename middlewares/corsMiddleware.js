const allowedCors = [
  'http://api.movies.aveindominus.nomoreparties.co',
  'https://api.movies.aveindominus.nomoreparties.co',
  'http://www.api.movies.aveindominus.nomoreparties.co',
  'https://www.api.movies.aveindominus.nomoreparties.co',
  'http://localhost:3000',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://localhost:3001',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
};
