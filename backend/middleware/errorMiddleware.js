const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  // Check CastError before building response
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  if (process.env.NODE_ENV === 'production') {
    if (statusCode === 500) {
      message = 'Internal server error';
    } else if (statusCode === 401) {
      message = 'Not authorized';
    } else if (statusCode === 404) {
      message = 'Resource not found';
    }
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
