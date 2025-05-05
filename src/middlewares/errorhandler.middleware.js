import ApiError from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || [];
    const stack = err.stack;
    error = ApiError.serverError(statusCode, message, errors, stack);
  }
  res.status(error.statusCode).json({
    success: error.success,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
  });
};
export default errorHandler;
