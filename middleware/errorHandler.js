function errorHandler(err, req, res, next) {
  // Determine if it's an operational error or a programmer error
  const statusCode = err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Log the error (in dev, include the stack trace)
  if (!isProduction) {
      console.error(err.stack || err.message);
  } else {
      console.error(err.message);
  }

  // Send a normalized error response
  res.status(statusCode).json({
      success: false,
      message: err.message || 'Internal Server Error',
      ...(isProduction ? {} : { stack: err.stack }), // Include stack only in dev
  });
}

module.exports = errorHandler;