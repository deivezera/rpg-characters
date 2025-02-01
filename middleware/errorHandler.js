function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.error(err.stack || err.message);
  } else {
    console.error(err.message);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(isProduction ? {} : { stack: err.stack }),
  });
}

module.exports = errorHandler;