const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  const response = {
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  };

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    response.message = 'Resource not found';
    res.status(404);
  }

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };