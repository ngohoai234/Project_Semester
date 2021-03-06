const AppError = require('../utils/appError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const error = new AppError(err.message, 400);

  res.json({
    error,
  });
};
